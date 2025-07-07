import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache for fallback tips
const fallbackTips = [
  "Stay focused on your goals and avoid distractions.",
  "Take breaks regularly to maintain productivity.",
  "Prioritize tasks to manage your time effectively.",
  "Maintain a positive mindset to overcome challenges.",
  "Set clear and achievable goals for success.",
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const category = req.query.category || 'general';

    let promptBase = "Give me a smart, concise tip related to productivity, mindset, or success.";
    if (category === 'productivity') {
      promptBase = "Give me a smart, concise tip related to productivity.";
    } else if (category === 'mindset') {
      promptBase = "Give me a smart, concise tip related to mindset.";
    } else if (category === 'business') {
      promptBase = "Give me a smart, concise tip related to business.";
    } else if (category === 'general') {
      promptBase = "Give me a smart, concise tip related to productivity, mindset, or success.";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: promptBase }],
      max_tokens: 50,
      temperature: 0.7,
    });

    const tip = completion.choices[0].message.content.trim();

    // Add tip to fallback cache (simple rotation)
    if (!fallbackTips.includes(tip)) {
      fallbackTips.shift();
      fallbackTips.push(tip);
    }

    res.status(200).json({ tip, fromCache: false });
  } catch (error) {
    console.error("OpenAI API error:", error);

    // Return a random cached tip as fallback
    const randomTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
    res.status(200).json({ tip: randomTip, fromCache: true });
  }
}
