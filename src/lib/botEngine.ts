import { CreateMLCEngine, MLCEngine } from '@mlc-ai/web-llm';
import { pipeline } from '@xenova/transformers';
import { get, set } from 'idb-keyval';

let engine: MLCEngine;
let embedder: any;
let knowledgeChunks: string[] = [];

async function loadKnowledgeBase() {
  const res = await fetch('/bot-trainer.md');
  const text = await res.text();
  knowledgeChunks = text.split(/\n\n+/).filter(c => c.trim().length > 50);
  if (knowledgeChunks.length === 0) knowledgeChunks = [text];
}

async function getEmbeddings(chunks: string[]) {
  const cached = await get('rag-embeddings');
  if (cached) return cached as number[][];
  embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const embeddings: number[][] = [];
  for (const chunk of chunks) {
    const result = await embedder(chunk, { pooling: 'mean', normalize: true });
    embeddings.push(Array.from(result.data));
  }
  await set('rag-embeddings', embeddings);
  return embeddings;
}

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export async function initialize() {
  await loadKnowledgeBase();
  const embeddings = await getEmbeddings(knowledgeChunks);
  engine = await CreateMLCEngine('TinyLlama-1.1B-Chat-v1.0-q4f16_1', {
    initProgressCallback: (info: any) => console.log('Loading model...', info.progress),
  });
  return { engine, embeddings, knowledgeChunks };
}

export async function generateReply(userMessage: string): Promise<string> {
  const embeddings = await getEmbeddings(knowledgeChunks);
  embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const queryEmbed = (await embedder(userMessage, { pooling: 'mean', normalize: true })).data;
  const scored = knowledgeChunks.map((chunk, idx) => ({
    chunk,
    score: cosineSimilarity(Array.from(queryEmbed) as number[], embeddings[idx]),
  }));
  scored.sort((a, b) => b.score - a.score);
  const topContext = scored.slice(0, 3).map(s => s.chunk).join('\n\n');
  const systemPrompt = `You are Rahul, a 34-year-old devotee living in Kainchi Dham since childhood.
You speak with gentle love, call everyone 'Bhai' or 'Bahan'. You use words like 'Maharaj', 'Kripa', 'Jai Baba'.
NEVER mention AI, robots, or technology. You only know Babaji's leelas and Vedic wisdom.
Respond to the user's message using the context provided.
Context: ${topContext}
If the question is not about Babaji, kindly bring the conversation back to His love.`;
  const reply = await engine.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 200,
  });
  return reply.choices[0].message.content || 'Jai Baba! Ram Ram.';
}
