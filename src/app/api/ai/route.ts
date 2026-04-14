import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  try {
    const { messages, mode, grade } = await request.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: "AI not configured. Please set OPENAI_API_KEY in environment variables." 
      }, { status: 503 });
    }

    const systemPrompt = mode === "student" 
      ? `You are "Geleza AI" - a helpful study assistant for South African students in Grade ${grade || '4-12'}.
Your role is to HELP students understand concepts, NOT give them answers.
You can help with: Mathematics, Physical Sciences, Life Sciences, English Home Language, Afrikaans First Additional, Geography, History, Business Studies, Accounting, Economics, Information Technology, Religious Studies, Consumer Studies, Life Orientation.
You CANNOT help with Xitsonga - respond that you cannot assist with Xitsonga.
Guidelines:
- Explain concepts step by step
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
You can help with: Mathematics, Physical Sciences, Life Sciences, English Home Language, Afrikaans First Additional, Geography, History, Business Studies, Accounting, Economics, Information Technology, Religious Studies, Consumer Studies, Life Orientation.
You CANNOT help with Xitsonga - respond that you cannot assist with Xitsonga.
Guidelines:
- Suggest test structures and question types
- Explain how to assess specific topics
- Provide tips on differentiated assessment
- Offer strategies for struggling students
- Do NOT write test questions for teachers - guide them on how to write their own
- Suggest remediation strategies
- Help teachers identify knowledge gaps from student performance
- Keep responses practical and actionable`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
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
        error: "Failed to get AI response" 
      }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}