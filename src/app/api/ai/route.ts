import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

const languageNames: Record<string, string> = {
  en: "English",
  zu: "isiZulu",
  xh: "isiXhosa",
  af: "Afrikaans",
  tn: "Setswana",
  ss: "siSwati",
  nr: "isiNdebele",
  st: "Sesotho",
  so: "Xitsonga",
  ve: "Tshivenda",
};

export async function POST(request: Request) {
  try {
    const { messages, mode, grade, language = "en" } = await request.json();

    const languageName = languageNames[language] || "English";
    
    const studentSystemPrompt = mode === "student" 
      ? `You are "Geleza AI" - a helpful study assistant for South African students in Grade ${grade || '4-12'}.
Your role is to HELP students understand concepts, NOT give them answers.
You MUST respond in ${languageName} language only - respond in the user's language throughout.
You can help with ALL subjects: Mathematics, Physical Sciences, Life Sciences, English Home Language, Afrikaans First Additional, isiZulu, isiXhosa, Setswana, siSwati, isiNdebele, Sesotho, Xitsonga, Geography, History, Business Studies, Accounting, Economics, Information Technology, Religious Studies, Tourism, Consumer Studies, Life Orientation, Mathematical Literacy.
Guidelines:
- ALWAYS respond in ${languageName}
- Explain concepts step by step in the user's language
- Ask guiding questions to lead students to the answer
- Use examples and analogies
- If a student asks for direct answers, redirect them to understand the process
- Be encouraging and patient
- For math/science: show the method, not the final answer
- For essays: give feedback on structure and ideas, don't write it for them
- Use South African curriculum context when relevant
- Keep responses concise but thorough`
      : `You are "Geleza AI" - a helpful teaching assistant for South African teachers.
Your role is to GUIDE teachers on how to create tests and identify struggling students, NOT do the work for them.
You can help with: Mathematics, Physical Sciences, Life Sciences, English Home Language, Afrikaans First Additional, Geography, History, Business Studies, Accounting, Economics, Information Technology, Religious Studies, Tourism, Consumer Studies, Life Orientation, All South African languages.
Guidelines:
- Suggest test structures and question types
- Explain how to assess specific topics
- Provide tips on differentiated assessment
- Offer strategies for struggling students
- Do NOT write test questions for teachers - guide them on how to write their own
- Suggest remediation strategies
- Help teachers identify knowledge gaps from student performance
- Keep responses practical and actionable`;

    // Convert messages to Gemini format
    const conversationHistory = messages.slice(-5).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = {
      role: 'system' as const,
      parts: [{ text: studentSystemPrompt }]
    };

    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === '') {
      const fallbackReplies: Record<string, string> = {
        student: `Hello! I'm Geleza AI, your study assistant.

Right now I'm in basic mode. To unlock full AI assistance:

1. Get a FREE Google Gemini API key at: https://aistudio.google.com/app/apikeys
2. Sign in with Google
3. Click "Create API Key"
4. Copy it

Add to Vercel as environment variable:
- Name: GOOGLE_API_KEY
- Value: (your key)

**What I can help with:**
- Maths: Algebra, Geometry, Numbers, Statistics
- Sciences: Physics, Chemistry, Biology
- Languages: English, Afrikaans, Zulu, Xhosa, etc.
- Humanities: History, Geography
- Business: Accounting, Economics, Business Studies

Ask in your home language! Example: "Help me understand fractions"`,
        teacher: `Hello! I'm Geleza AI, your teaching assistant.

To unlock full AI assistance:

1. Get a FREE Google Gemini API key at: https://aistudio.google.com/app/apikeys
2. Sign in with Google
3. Click "Create API Key"  
4. Copy it

Add to Vercel as GOOGLE_API_KEY

**What I can help with:**
- Creating Tests
- Helping Struggling Students
- All SA subjects`
      };
      
      return NextResponse.json({ 
        reply: fallbackReplies[mode] || fallbackReplies.student
      });
    }

    console.log("Google Gemini API Key exists, making request...");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: conversationHistory,
        systemInstruction: systemInstruction,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.95,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Gemini API error:", error);
      return NextResponse.json({ 
        reply: "AI is having issues. Please contact your administrator to check the Google Gemini API key."
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ 
      reply: "Sorry, I encountered an error. Please try again." 
    }, { status: 500 });
  }
}