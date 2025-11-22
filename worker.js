export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle API routes first
    if (url.pathname === '/api/analyze' && request.method === 'POST') {
      try {
        const { image, type } = await request.json();

        if (!env.GEMINI_API_KEY) {
          return new Response('Gemini API Key not configured', { status: 500 });
        }

        let prompt = "Analyze this image of a person on a video call.";
        if (type === 'professional') {
          prompt += " Focus on professional appearance, attire, and grooming. Give 3 concise, constructive tips to look more professional.";
        } else if (type === 'lighting') {
          prompt += " Focus strictly on lighting. Is it too dark? Too bright? Backlit? Give 3 specific tips to improve the lighting.";
        } else if (type === 'background') {
          prompt += " Focus on the background. Is it cluttered? Distracting? Give 3 tips to make the background better for a video call.";
        } else if (type === 'casual') {
          prompt += " Give a fun, casual vibe check. How does the person come across? Friendly? Cool? Give a short, fun critique.";
        }

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${env.GEMINI_API_KEY}`;

        const geminiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inline_data: { mime_type: "image/jpeg", data: image } }
              ]
            }]
          })
        });

        const data = await geminiResponse.json();

        if (!geminiResponse.ok) {
          console.error("Gemini API Error:", data);
          return new Response(`Gemini Error: ${data.error?.message || 'Unknown'}`, { status: 500 });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback generated.";
        return new Response(text, { headers: { 'Content-Type': 'text/plain' } });

      } catch (err) {
        return new Response(`Server Error: ${err.message}`, { status: 500 });
      }
    }

    // Static Asset Handling
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !url.pathname.includes('.')) {
      const indexRequest = new Request(new URL('/index.html', url.origin), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    if (response.status === 404) {
      return new Response('Not Found', { status: 404 });
    }

    const newResponse = new Response(response.body, response);
    const headers = newResponse.headers;

    if (url.pathname === '/' || url.pathname === '/index.html') {
      headers.set('Cache-Control', 'no-store');
      headers.set('Content-Type', 'text/html; charset=UTF-8');
    } else if (!headers.has('Cache-Control')) {
      headers.set('Cache-Control', 'public, max-age=3600');
    }

    return newResponse;
  }
};
