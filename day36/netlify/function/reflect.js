// netlify/functions/reflect.js
//
// This function runs on Netlify's server, not in the browser.
// It reads GEMINI_API_KEY from Netlify's environment variables
// (Site settings -> Environment variables) so the key is never
// exposed to anyone visiting the page.

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "GEMINI_API_KEY is not set in Netlify environment variables." })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (err) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const scores = payload.scores || {};
  const topTwo = Array.isArray(payload.topTwo) ? payload.topTwo : [];
  const mode = payload.mode === "stress" ? "stress" : "calm";

  const prompt = buildPrompt(scores, topTwo, mode);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(function () { controller.abort(); }, 12000);

    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 220 }
        }),
        signal: controller.signal
      }
    );
    clearTimeout(timeout);

    if (!resp.ok) {
      const errText = await resp.text();
      return { statusCode: resp.status, headers, body: JSON.stringify({ error: errText }) };
    }

    const data = await resp.json();
    const text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
        ? data.candidates[0].content.parts[0].text.trim()
        : "";

    return { statusCode: 200, headers, body: JSON.stringify({ text: text }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || "Request failed" }) };
  }
};

function buildPrompt(scores, topTwo, mode) {
  const breakdown = Object.keys(scores)
    .map(function (k) { return k + ": " + scores[k] + "%"; })
    .join(", ");

  return [
    "You are writing one short reflective paragraph for a self-reflection app called Cognitive Pattern Explorer.",
    "This is NOT a clinical or diagnostic tool. Never mention mental health conditions, disorders, or diagnoses.",
    "Never use absolute labels like 'you are X'. Always use reflective, tentative language such as 'you tend to', 'this suggests', 'you often'.",
    "The person just completed a playful, game-like set of scenarios about how they think and decide. Their session lens was: " + mode + ".",
    "Their blended pattern breakdown (percentages across five tendencies) is: " + breakdown + ".",
    "Their two strongest tendencies are: " + topTwo.join(" and ") + ".",
    "Write exactly 3 to 4 warm, calm, encouraging sentences, second person ('you'), that reflect on this blend as a whole (not just the top one).",
    "Do not give advice, instructions, or numbered lists. Do not use clinical or judgmental words. End on an affirming, curious note.",
    "Output only the paragraph, no title, no quotation marks."
  ].join(" ");
}
