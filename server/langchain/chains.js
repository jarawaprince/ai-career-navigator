// ✏️ CUSTOMIZE THIS - Advanced LangChain chains for multi-step reasoning

import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';
import { searchVectorStore } from './vectorStore.js';
import { MODEL_CONFIG, SYSTEM_PROMPT } from './config.js';

/**
 * Create a simple chain for career analysis
 */
export async function createCareerAnalysisChain() {
  const model = new ChatOpenAI({
    modelName: MODEL_CONFIG.modelName,
    temperature: MODEL_CONFIG.temperature,
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const template = `${SYSTEM_PROMPT}

You are analyzing a career transition for an Australian worker.

Current Role: {currentRole}
Target Role: {targetRole}
Location: {city}

Based on Australian job market data, provide:
1. AI impact on current role (automation risk)
2. Skills gap analysis
3. 3 potential pathways
4. Realistic timeline

Keep response structured and use Australian context.

Analysis:`;

  const prompt = PromptTemplate.fromTemplate(template);
  
  const chain = new LLMChain({
    llm: model,
    prompt: prompt
  });

  return chain;
}

/**
 * Sequential chain for detailed roadmap generation
 * (Can be extended with multiple steps)
 */
export async function generateDetailedRoadmap(userInput) {
  // Step 1: Extract user context
  const { currentRole, targetRole, city, background } = userInput;

  // Step 2: Search for relevant data
  const query = `${currentRole} to ${targetRole} career transition ${city}`;
  const relevantDocs = await searchVectorStore(query, { k: 8 });

  // Step 3: Generate analysis
  const model = new ChatOpenAI({
    modelName: MODEL_CONFIG.modelName,
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const context = relevantDocs
    .map(doc => doc.pageContent)
    .join('\n\n---\n\n');

  const prompt = `${SYSTEM_PROMPT}

Create a detailed 6-month career roadmap for:
- Current: ${currentRole}
- Target: ${targetRole}
- Location: ${city}
- Background: ${background}

Use this Australian data:
${context}

Provide:
1. AI Impact Analysis
2. Skill Gap (what they have vs need)
3. 3 Pathway Options
4. Month-by-month roadmap with specific Australian courses
5. Salary expectations in AUD
6. Success story reference

Format in clear sections.`;

  const response = await model.invoke(prompt);

  return {
    roadmap: response.content,
    sources: relevantDocs.map(doc => doc.metadata)
  };
}

/**
 * Quick analysis for voice responses
 */
export async function generateVoiceResponse(query, context = {}) {
  const model = new ChatOpenAI({
    modelName: MODEL_CONFIG.modelName,
    temperature: 0.8,
    maxTokens: 500, // Shorter for voice
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `${SYSTEM_PROMPT}

User query (via voice): ${query}
Context: ${JSON.stringify(context)}

Respond conversationally in 30-60 seconds when spoken. Be warm, empathetic, and provide 2-3 key insights. Invite them to see detailed roadmap in chat.

Voice response:`;

  const response = await model.invoke(prompt);
  
  return response.content;
}

export default {
  createCareerAnalysisChain,
  generateDetailedRoadmap,
  generateVoiceResponse
};