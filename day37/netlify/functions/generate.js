// netlify/functions/generate.js
//
// This function is the ONLY place that talks to Gemini.
// The API key lives here as an environment variable (GEMINI_API_KEY),
// set in the Netlify dashboard — never shipped to the browser.
//
// Frontend calls: POST /.netlify/functions/generate
// Body: { systemInstruction: string, prompt: string, schema: object, model?: string }
// Response: { result: <raw text from Gemini, expected to be JSON string> }

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server is missing GEMINI_API_KEY. Set it under Site settings > Environment variables in Netlify, then redeploy.' })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { systemInstruction, prompt, schema, model } = payload;
  if (!systemInstruction || !prompt || !schema) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing systemInstruction, prompt, or schema' }) };
  }

  const modelName = model || 'gemini-flash-latest';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.9,
          maxOutputTokens: 8192,
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 429) {
        return { statusCode: 429, headers, body: JSON.stringify({ error: "Gemini's free-tier rate limit was hit — likely a few people generating at once. Wait about a minute and try again." }) };
      }
      const msg = data?.error?.message || `Gemini API error (${res.status})`;
      return { statusCode: res.status, headers, body: JSON.stringify({ error: msg }) };
    }

    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts || [];
    const text = parts.filter(p => !p.thought).map(p => p.text || '').join('');

    if (!text) {
      const blockReason = data?.promptFeedback?.blockReason;
      const finishReason = candidate?.finishReason;
      const diag = blockReason
        ? `Blocked by safety filter (${blockReason}).`
        : finishReason
          ? `Model stopped with reason: ${finishReason}. This can mean it ran out of output tokens or hit a content filter.`
          : 'No usable content in the response.';
      return { statusCode: 502, headers, body: JSON.stringify({ error: `Gemini returned an empty response. ${diag}` }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ result: text }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Unknown server error' }) };
  }
};
