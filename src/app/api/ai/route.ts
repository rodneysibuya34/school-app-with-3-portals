import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

    if (!OPENAI_API_KEY) {
      const fallbackReplies: Record<string, string> = {
        student: `Hello! I'm Geleza AI, your study assistant.

Right now I'm in basic mode - I can help guide your learning in these South African languages:
• English (English)
• isiZulu (Zulu)
• isiXhosa (Xhosa)
• Afrikaans 
• Setswana
• siSwati (Swati)
• isiNdebele (Ndebele)
• Sesotho
• Xitsonga
• Tshivenda

**What I can help with:**
-Maths: Algebra, Geometry, Numbers, Statistics
-Sciences: Physics, Chemistry, Biology
-Languages: English, Afrikaans, Zulu, Xhosa, etc.
-Humanities: History, Geography
-Business: Accounting, Economics, Business Studies

**How to get more help:**
Ask me in your home language! Example: "Help me understand fractions" or "Explain photosynthesis"

To unlock full AI assistance, please contact your school administrator to set up the AI.`,
        teacher: `Hello! I'm Geleza AI, your teaching assistant.

Right now I'm in basic mode - I can help with:

**Creating Tests:**
- Suggest question types for your subject
- Explain assessment strategies
- Help identify common learner mistakes

** Helping Struggling Students:**
- Suggest intervention strategies
- Recommend remediation approaches
- Guide on differentiated teaching

**Subjects I know:**
- Mathematics, Physical Sciences, Life Sciences
- English Home Language, Afrikaans First Additional
- All SA Home Languages (Zulu, Xhosa, etc.)
- Geography, History, Business Studies, Accounting

**How to get more help:**
Ask me in English! Example: "How do I assess algebraic expressions?"

To unlock full AI assistance, please contact administrator to set up OpenAI.`
      };
      
      return NextResponse.json({ 
        reply: fallbackReplies[mode] || fallbackReplies.student
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: studentSystemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI error:", error);
      return NextResponse.json({ 
        reply: "Sorry, I encountered an error. Please try again." 
      });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ 
      reply: "Sorry, I encountered an error. Please try again." 
    }, { status: 500 });
  }
}