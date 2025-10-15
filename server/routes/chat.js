import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
import { initializeVectorStore, searchVectorStore } from '../langchain/vectorStore.js';
import { 
  SYSTEM_PROMPT, 
  CHAT_PROMPT_TEMPLATE,
  MODEL_CONFIG 
} from '../langchain/config.js';

const router = express.Router();

// Initialize vector store on server startup
let isVectorStoreReady = false;

(async () => {
  try {
    console.log('🔄 Initializing vector store on startup...');
    await initializeVectorStore();
    isVectorStoreReady = true;
    console.log('✅ Vector store ready for queries!\n');
  } catch (error) {
    console.error('❌ Failed to initialize vector store:');
    console.error(error.response?.data || error.message || error);
  }
})();


/**
 * POST /api/chat
 * Main chat endpoint for career guidance
 */
router.post('/', async (req, res) => {
  try {
    const { message, context = {} } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!isVectorStoreReady) {
      return res.status(503).json({ 
        error: 'Vector store is still initializing. Please wait a moment and try again.' 
      });
    }

    console.log(`\n💬 Received query: "${message.substring(0, 50)}..."`);
    console.log(`📍 Context:`, context);

    // Step 1: Search vector store for relevant information
    console.log('🔍 Searching Australian data...');
    const relevantDocs = await searchVectorStore(message, { k: 8 });
    
    console.log(`✅ Found ${relevantDocs.length} relevant documents`);
    
    // Combine retrieved context
    const retrievedContext = relevantDocs
      .map((doc, idx) => `[Document ${idx + 1}]\n${doc.pageContent}`)
      .join('\n\n---\n\n');

    // Step 2: Build prompt with context
    const userContext = `
Current Role: ${context.currentRole || 'Not specified'}
Target Role: ${context.targetRole || 'Not specified'}
Location: ${context.city || 'Australia'}
Background: ${context.background || 'Not specified'}
Concerns: ${context.concerns || 'General career guidance'}
    `.trim();

    const prompt = CHAT_PROMPT_TEMPLATE
      .replace('{currentRole}', context.currentRole || 'Not specified')
      .replace('{targetRole}', context.targetRole || 'Not specified')
      .replace('{city}', context.city || 'Australia')
      .replace('{background}', context.background || 'Not specified')
      .replace('{concerns}', context.concerns || 'General career guidance');

    const fullPrompt = `${SYSTEM_PROMPT}

---

${prompt}

---

**Retrieved Australian Data:**

${retrievedContext}

---

**User Query:** ${message}

**Instructions:** Based on the Australian data provided above, create a comprehensive, personalized career roadmap. Use specific Australian courses, salary data, and success stories from the retrieved context. Always cite sources and use AUD currency.`;

    // Step 3: Call OpenAI with retrieved context
    console.log('🤖 Generating response with GPT-4o-mini...');
    
    const model = new ChatOpenAI({
      modelName: MODEL_CONFIG.modelName,
      temperature: MODEL_CONFIG.temperature,
      maxTokens: MODEL_CONFIG.maxTokens,
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    const response = await model.invoke(fullPrompt);
    
    console.log('✅ Response generated successfully\n');

    // Return response
    res.json({
      response: response.content,
      sources: relevantDocs.map(doc => ({
        source: doc.metadata.source,
        type: doc.metadata.type
      })),
      context: userContext
    });

  } catch (error) {
  console.error('❌ Error in chat endpoint:');
  console.error(error.response?.data || error.message || error);

  res.status(500).json({ 
    error: 'Failed to process request',
    details: error.response?.data || error.message || 'Unknown error'
  });
}
});

/**
 * GET /api/chat/health
 * Check if vector store is ready
 */
router.get('/health', (req, res) => {
  res.json({
    vectorStoreReady: isVectorStoreReady,
    status: isVectorStoreReady ? 'ready' : 'initializing'
  });
});

export default router;