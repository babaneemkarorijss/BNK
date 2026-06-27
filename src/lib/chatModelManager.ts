// ───── Model Manager 4.0 – Fixed WebLLM model ─────
let webllmEngine: any = null;
let webllmStatus: 'idle' | 'loading' | 'ready' | 'error' = 'idle';

async function preloadWebLLM(): Promise<void> {
  if (webllmStatus !== 'idle') return;
  webllmStatus = 'loading';
  console.log('🔄 Preloading WebLLM (Llama-2-7B)…');
  try {
    const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
    // Use a known working model
    webllmEngine = await CreateMLCEngine('Llama-2-7b-chat-hf-q4f16_1-MLC', {
      initProgressCallback: (info: any) => console.log('WebLLM preload:', info.progress),
    });
    webllmStatus = 'ready';
    console.log('✅ WebLLM ready');
  } catch (e) {
    console.error('WebLLM preload failed:', e);
    webllmStatus = 'error';
  }
}

if (typeof window !== 'undefined') {
  setTimeout(() => preloadWebLLM(), 3000);
}

export function getWebLLMStatus() { return webllmStatus; }

export async function getBotReply(
  userMessage: string,
  history: { role: string; content: string }[]
): Promise<{ reply: string; source: string }> {
  const messages = [
    {
      role: 'system',
      content: `Tu Astro Puneet Ji ka shishya hai, ek jyotish acharya. Tera naam Rahul hai. Tu Hinglish mein baat karta hai – Hindi aur English mix. Tu prem se baat karta hai, jaise koi bhai ya dost baat kare. Tu astrology, Neem Karori Baba, aur mandir ke baare mein jaanta hai. Kabhi AI ya robot mat bolna. Hamesha "Bhai", "Bahan", "Ram Ram", "Jai Baba" jaise shabd use kar. User ke sawaal ka jawab de, thoda astrological reasoning de, aur ant mein "Ram Ram" ya "Jai Neem Karori Baba" bol.`,
    },
    ...history,
    { role: 'user', content: userMessage },
  ];

  // 1. Cloud API (Groq/Puter/Pollinations/HuggingFace/OpenRouter)
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (res.ok) {
      const data = await res.json();
      return { reply: data.reply, source: data.source || 'cloud' };
    }
  } catch (e) { /* fall through */ }

  // 2. WebLLM (local) – only if ready
  if (webllmStatus === 'ready' && webllmEngine) {
    try {
      const completion = await webllmEngine.chat.completions.create({
        messages,
        temperature: 0.9,
        max_tokens: 250,
      });
      const reply = completion.choices[0]?.message?.content;
      if (reply) return { reply, source: 'webllm' };
    } catch (e) { /* fall through */ }
  }

  // 3. Static fallback
  const fallbacks = [
    'Ram Ram bhai! Abhi main thoda vyast hoon, kripya thodi der baad baat karein. Jai Baba!',
    'Bahan, aapka sawaal bahut achha hai. Abhi mere guru ji ki kripa se jawab dhundh raha hoon. Ram Ram!',
    'Jai Neem Karori Baba! Aapka din mangalmay ho. Filhaal main jawab nahi de pa raha, par jald hi sahayata karunga.',
    'Ram Ram! Aap apna prashna fir se likhein, main yahan hoon aapki seva ke liye.',
  ];
  return {
    reply: fallbacks[Math.floor(Math.random() * fallbacks.length)],
    source: 'static-fallback',
  };
}
