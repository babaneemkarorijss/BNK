// Load Transformers.js and WebLLM from CDN – no SSR issues!
let pipeline: any;
let CreateMLCEngine: any;
let embedder: any;
let engine: any;
let knowledgeChunks: string[] = [];

async function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function loadDependencies() {
  if (!pipeline) {
    // Load Transformers.js from CDN
    await loadScript('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js');
    pipeline = (window as any).pipeline;
  }
  if (!CreateMLCEngine) {
    // Load WebLLM from CDN
    await loadScript('https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/dist/web-llm.min.js');
    CreateMLCEngine = (window as any).mlc.CreateMLCEngine;
  }
}

async function loadKnowledgeBase() {
  const res = await fetch('/bot-trainer.md');
  const text = await res.text();
  knowledgeChunks = text.split(/\n\n+/).filter(c => c.trim().length > 50);
  if (knowledgeChunks.length === 0) knowledgeChunks = [text];
}

async function getEmbeddings(chunks: string[]) {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  const embeddings: number[][] = [];
  for (const chunk of chunks) {
    const result = await embedder(chunk, { pooling: 'mean', normalize: true });
    embeddings.push(Array.from(result.data));
  }
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
  await loadDependencies();
  await loadKnowledgeBase();
  const embeddings = await getEmbeddings(knowledgeChunks);
  engine = await CreateMLCEngine('TinyLlama-1.1B-Chat-v1.0-q4f16_1', {
    initProgressCallback: (info: any) => console.log('Loading model...', info.progress),
  });
  return { engine, embeddings, knowledgeChunks };
}

export async function generateReply(userMessage: string): Promise<string> {
  if (!engine || !embedder) await initialize();
  const embeddings = await getEmbeddings(knowledgeChunks);
  const queryEmbed = await embedder(userMessage, { pooling: 'mean', normalize: true });
  const queryArr = Array.from(queryEmbed.data) as number[];
  const scored = knowledgeChunks.map((chunk, idx) => ({
    chunk,
    score: cosineSimilarity(queryArr, embeddings[idx]),
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
