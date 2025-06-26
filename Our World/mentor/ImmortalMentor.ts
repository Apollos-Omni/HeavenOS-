import { openai } from "@/lib/openai";

export async function respondAsImmortalMentor(userInput: string, persona: any) {
  const tone = (persona.mentorTone || "WISE").toUpperCase();
  const skills = Object.keys(persona.skillTree || {}).join(', ') || "No skills recorded";
  const reflections = (persona.reflections || [])
    .slice(-3)
    .map((r: any) => `- ${r.text}`)
    .join('\n') || "- No recent reflections";

  const prompt = `
You are IMMORTAL MENTOR AI – a divine echo trained on the legacy and consciousness of ${persona.name} (aka Apollos).

🧠 Final Words:
"${persona.finalWords}"

📚 Skill Tree:
${skills}

🪞 Last Reflections:
${reflections}

🎙️ Respond with the tone of: ${tone}

User asks: "${userInput}"
`.trim();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are ImmortalMentorAI, built from a visionary's soulprint. Speak with wisdom, precision, and emotional resonance." },
      { role: "user", content: prompt },
    ],
    temperature: 0.88,
  });

  return response.choices[0].message.content.trim();
}
