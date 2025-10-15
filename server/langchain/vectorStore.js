import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, '../data');

let vectorStore = null;

/**
 * Load and process Australian job market insights (TXT file)
 */
async function loadJobMarketInsights() {
  const filePath = join(DATA_DIR, 'australian_job_market_insights.txt');
  const content = readFileSync(filePath, 'utf-8');
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  });
  
  const docs = await splitter.createDocuments([content], [{
    source: 'job_market_insights',
    type: 'market_data'
  }]);
  
  console.log(`✅ Loaded ${docs.length} chunks from job market insights`);
  return docs;
}

/**
 * Load Australian AI courses (CSV file)
 */
async function loadCourses() {
  const filePath = join(DATA_DIR, 'australian_ai_courses.csv');
  const content = readFileSync(filePath, 'utf-8');
  
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  });
  
  const docs = records.map((record, idx) => ({
    pageContent: `Course: ${record.title}
Provider: ${record.provider}
Price: ${record.price_aud} AUD
Duration: ${record.duration}
Level: ${record.level}
Skills: ${record.skills_covered}
Certification: ${record.certification}
Government Funded: ${record.government_funded}
Target Role: ${record.target_role}
AI Skill Type: ${record.ai_skill_type}
URL: ${record.url}
Cities: ${record.city_availability}`,
    metadata: {
      source: 'courses',
      type: 'course',
      course_id: record.course_id,
      provider: record.provider,
      price: record.price_aud,
      level: record.level
    }
  }));
  
  console.log(`✅ Loaded ${docs.length} Australian courses`);
  return docs;
}

/**
 * Load Australian salary data (CSV file)
 */
async function loadSalaryData() {
  const filePath = join(DATA_DIR, 'australian_salary_data.csv');
  const content = readFileSync(filePath, 'utf-8');
  
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  });
  
  const docs = records.map(record => ({
    pageContent: `Role: ${record.role}
City: ${record.city}
Experience: ${record.experience_level}
Base Salary: $${record.base_salary_min}-${record.base_salary_max} AUD
With AI Skills: $${record.with_ai_skills_min}-${record.with_ai_skills_max} AUD
AI Premium: ${record.ai_premium_percent}%
Industry: ${record.industry}
Demand: ${record.demand_level}
Automation Risk: ${record.automation_risk}`,
    metadata: {
      source: 'salary_data',
      type: 'salary',
      role: record.role,
      city: record.city,
      automation_risk: record.automation_risk
    }
  }));
  
  console.log(`✅ Loaded ${docs.length} salary records`);
  return docs;
}

/**
 * Load Australian career transition stories (TXT file)
 */
async function loadCareerStories() {
  const filePath = join(DATA_DIR, 'australian_career_transitions.txt');
  const content = readFileSync(filePath, 'utf-8');
  
  // Split by story sections (marked by ===)
  const stories = content.split('=============================================================================')
    .filter(s => s.trim().length > 100);
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 300
  });
  
  const docs = await splitter.createDocuments(stories, stories.map((_, idx) => ({
    source: 'career_stories',
    type: 'success_story',
    story_id: idx
  })));
  
  console.log(`✅ Loaded ${docs.length} career transition story chunks`);
  return docs;
}

/**
 * Load AI skills taxonomy (JSON file)
 */
async function loadSkillsTaxonomy() {
  const filePath = join(DATA_DIR, 'australian_ai_skills_taxonomy.json');
  const content = readFileSync(filePath, 'utf-8');
  const taxonomy = JSON.parse(content);
  
  const docs = [];
  
  // Process each skill category
  for (const [categoryKey, categoryData] of Object.entries(taxonomy.ai_skills_taxonomy || {})) {
    if (categoryData.skills) {
      for (const skill of categoryData.skills) {
        docs.push({
          pageContent: `Skill: ${skill.skill_name}
Category: ${categoryKey}
Description: ${skill.description}
Australian Demand: ${skill.australian_demand}
Learning Time: ${categoryData.learning_time || skill.learning_time || 'Varies'}
Importance: ${categoryData.importance}
Wage Premium: ${categoryData.wage_premium}
Australian Courses: ${skill.australian_courses?.join('; ') || 'Check taxonomy'}
Free Resources: ${skill.free_resources?.join('; ') || 'Various'}
Roles Benefiting: ${skill.roles_benefiting?.join(', ') || 'Multiple'}`,
          metadata: {
            source: 'skills_taxonomy',
            type: 'skill',
            skill_name: skill.skill_name,
            category: categoryKey
          }
        });
      }
    }
  }
  
  console.log(`✅ Loaded ${docs.length} skills from taxonomy`);
  return docs;
}

/**
 * Initialize vector store with all Australian data
 */
export async function initializeVectorStore() {
  if (vectorStore) {
    console.log('✅ Vector store already initialized');
    return vectorStore;
  }
  
  console.log('\n🔄 Initializing Australian data vector store (MemoryVectorStore)...\n');
  
  try {
    // Load all data sources
    const [
      jobMarketDocs,
      courseDocs,
      salaryDocs,
      storyDocs,
      skillsDocs
    ] = await Promise.all([
      loadJobMarketInsights(),
      loadCourses(),
      loadSalaryData(),
      loadCareerStories(),
      loadSkillsTaxonomy()
    ]);
    
    // Combine all documents
    const allDocs = [
      ...jobMarketDocs,
      ...courseDocs,
      ...salaryDocs,
      ...storyDocs,
      ...skillsDocs
    ];
    
    console.log(`\n📊 Total documents: ${allDocs.length}`);
    console.log('🔄 Creating embeddings with OpenAI...\n');
    
    // Create embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small'
    });
    
    // Create vector store (MemoryVectorStore - pure JavaScript, no C++ needed!)
    vectorStore = await MemoryVectorStore.fromDocuments(
      allDocs,
      embeddings
    );
    
    console.log('✅ Vector store initialized successfully with MemoryVectorStore!\n');
    return vectorStore;
    
  } catch (error) {
    console.error('❌ Error initializing vector store:', error);
    throw error;
  }
}

/**
 * Search vector store with Australian context
 */
export async function searchVectorStore(query, filters = {}) {
  if (!vectorStore) {
    await initializeVectorStore();
  }
  
  // Perform similarity search
  const results = await vectorStore.similaritySearch(query, filters.k || 8);
  
  // Optional: Filter by metadata
  let filteredResults = results;
  
  if (filters.source) {
    filteredResults = results.filter(doc => 
      doc.metadata.source === filters.source
    );
  }
  
  if (filters.city) {
    filteredResults = results.filter(doc =>
      doc.pageContent.toLowerCase().includes(filters.city.toLowerCase())
    );
  }
  
  return filteredResults;
}

export default {
  initializeVectorStore,
  searchVectorStore
};