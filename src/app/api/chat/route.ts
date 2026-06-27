import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY2 || process.env.GROQ_API_KEY || '';
const GROQ_MODEL = 'llama3-8b-8192';
const PUTER_AI_URL = 'https://api.puter.com/ai/chat';
const POLLINATIONS_URL = 'https://text.pollinations.ai/';
const HF_FREE_MODEL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';
const OPENROUTER_FREE_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function callGroq(messages: { role: string; content: string }[]) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({ model: GROQ_MODEL, messages, temperature: 0.9, max_tokens: 300 }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callPuter(messages: { role: string; content: string }[]) {
  const res = await fetch(PUTER_AI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error(`Puter ${res.status}`);
  const text = await res.text();
  try { const json = JSON.parse(text); return json?.message?.content || json?.reply || text; } catch { return text; }
}

async function callPollinations(messages: { role: string; content: string }[]) {
  const systemMsg = messages.find(m => m.role === 'system')?.content || '';
  const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
  const prompt = `${systemMsg}\n\nUser: ${lastUserMsg}\nAssistant:`;
  const res = await fetch(`${POLLINATIONS_URL}${encodeURIComponent(prompt)}`);
  if (!res.ok) throw new Error(`Pollinations ${res.status}`);
  return (await res.text()).trim();
}

async function callHuggingFace(messages: { role: string; content: string }[]) {
  const systemMsg = messages.find(m => m.role === 'system')?.content || '';
  const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
  const prompt = `<s>[INST] ${systemMsg}\n\nUser: ${lastUserMsg} [/INST]`;
  const res = await fetch(HF_FREE_MODEL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: prompt }),
  });
  if (!res.ok) throw new Error(`HF ${res.status}`);
  const data = await res.json();
  // Response may be array of generated text
  const text = Array.isArray(data) ? data[0].generated_text : data.generated_text || '';
  // Extract assistant's reply after the prompt
  const reply = text.split('[/INST]').pop()?.trim() || '';
  return reply;
}

async function callOpenRouter(messages: { role: string; content: string }[]) {
  // Use free model: "google/gemini-2.0-flash-thinking:free" or "microsoft/phi-3-mini-128k-instruct:free"
  const res = await fetch(OPENROUTER_FREE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-or-v1-free', // Placeholder – many free models don't require real key
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-thinking:free',
      messages,
      temperature: 0.9,
      max_tokens: 300,
    }),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    // 1. Groq
    if (GROQ_API_KEY) {
      try { const reply = await callGroq(messages); return NextResponse.json({ reply, source: 'groq' }); } catch (e) { console.warn('Groq failed:', e); }
    }

    // 2. Puter.js
    try { const reply = await callPuter(messages); if (reply?.trim()) return NextResponse.json({ reply, source: 'puter' }); } catch (e) { console.warn('Puter failed:', e); }

    // 3. Pollinations.ai
    try { const reply = await callPollinations(messages); if (reply?.trim()) return NextResponse.json({ reply, source: 'pollinations' }); } catch (e) { console.warn('Pollinations failed:', e); }

    // 4. Hugging Face (free inference, no token)
    try { const reply = await callHuggingFace(messages); if (reply?.trim()) return NextResponse.json({ reply, source: 'huggingface' }); } catch (e) { console.warn('HuggingFace failed:', e); }

    // 5. OpenRouter free tier
    try { const reply = await callOpenRouter(messages); if (reply?.trim()) return NextResponse.json({ reply, source: 'openrouter' }); } catch (e) { console.warn('OpenRouter failed:', e); }

    // 6. Static fallback
    return NextResponse.json({
      reply: 'Ram Ram! Abhi seva mein thoda delay ho raha hai. Kripya thodi der baad punah prayas karein. Jai Baba!',
      source: 'static-fallback',
    });
  } catch {
    return NextResponse.json({
      reply: 'Ram Ram! Kuch technical kathinai aa gayi. Aap apna prashna fir se likhen. Jai Neem Karori Baba!',
      source: 'error',
    });
  }
}
