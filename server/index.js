// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import chatRouter from './routes/chat.js';

// Load environment variables
dotenv.config({ path: '../.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Simple request logger ---
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// --- Health check endpoint ---
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'AI-Proof Career Navigator API — Australian Edition 🇦🇺',
    timestamp: new Date().toISOString(),
  });
});

// --- Main API route ---

// Add this BEFORE app.use('/api/chat', chatRouter);
app.use('/api/chat', (req, res, next) => {
  console.log('📨 Chat request received:', {
    body: req.body,
    method: req.method,
    headers: req.headers
  });
  next();
});

app.use('/api/chat', chatRouter);

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log('\n🚀 AI-Proof Career Navigator Server');
  console.log('🇦🇺 Australian Edition');
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
  console.log(`💬 Chat API: http://localhost:${PORT}/api/chat`);
  console.log("Loaded key:", process.env.OPENAI_API_KEY ? "✅ Found" : "❌ Missing");
});

export default app;
