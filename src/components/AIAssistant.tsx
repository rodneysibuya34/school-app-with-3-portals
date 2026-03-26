"use client";

import { useState } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantProps {
  mode: "student" | "teacher";
  studentName?: string;
  grade?: number;
  onStrugglingAlert?: (studentName: string, topic: string) => void;
}

const studentSystemPrompt = `You are "Geleza AI" - a helpful study assistant for South African students.
Your role is to HELP students understand concepts, NOT give them answers.

Guidelines:
- Explain concepts step by step
- Ask guiding questions to lead students to the answer
- Use examples and analogies
- If a student asks for direct answers, redirect them to understand the process
- Be encouraging and patient
- For math/science: show the method, not the final answer
- For essays: give feedback on structure and ideas, don't write it for them
- Use South African curriculum context when relevant
- Keep responses concise but thorough`;

const teacherSystemPrompt = `You are "Geleza AI" - a helpful teaching assistant for South African teachers.
Your role is to GUIDE teachers on how to create tests and identify struggling students, NOT do the work for them.

Guidelines:
- Suggest test structures and question types
- Explain how to assess specific topics
- Provide tips on differentiated assessment
- Offer strategies for struggling students
- Do NOT write test questions for teachers - guide them on how to write their own
- Suggest remediation strategies
- Help teachers identify knowledge gaps from student performance
- Keep responses practical and actionable`;

const studentTopics = [
  "Mathematics", "Physical Sciences", "Life Sciences", "English", "Geography", 
  "History", "Business Studies", "Accounting", "Economics", "Information Technology"
];

const teacherTopics = [
  "Test Design", "Question Types", "Assessment Strategies", "Differentiated Learning",
  "Remediation", "Student Intervention", "Lesson Planning", "Curriculum Coverage"
];

export default function AIAssistant({ mode, studentName, grade, onStrugglingAlert }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: mode === "student" 
      ? `Hi! I'm Geleza AI. I'm here to help you understand your schoolwork better - not give you answers! Tell me what you're working on and I'll guide you through it.`
      : `Hi! I'm Geleza AI. I'm here to help you with test creation and identifying students who need extra support. How can I help you today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertStudent, setAlertStudent] = useState("");
  const [alertTopic, setAlertTopic] = useState("");

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input, mode);
      const assistantMessage: Message = { id: Date.now() + 1, role: "assistant", content: response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleAlertSubmit = () => {
    if (!alertStudent.trim()) {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: "assistant", 
        content: `Please enter a student name to flag them for support.` 
      }]);
      return;
    }
    if (!alertTopic) {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: "assistant", 
        content: `Please select a topic area to flag this student.` 
      }]);
      return;
    }
    if (onStrugglingAlert) {
      onStrugglingAlert(alertStudent, alertTopic);
      setShowAlertForm(false);
      setAlertStudent("");
      setAlertTopic("");
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: "assistant", 
        content: `I've noted that ${alertStudent} may need support with ${alertTopic}. This will be flagged for your attention.` 
      }]);
    } else {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: "assistant", 
        content: `Student ${alertStudent} flagged for ${alertTopic}. Your teacher will be notified!` 
      }]);
      setShowAlertForm(false);
      setAlertStudent("");
      setAlertTopic("");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 ${
          mode === "student" 
            ? "bg-gradient-to-br from-amber-500 to-orange-500" 
            : "bg-gradient-to-br from-red-500 to-orange-500"
        }`}
      >
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-[#1E293B] rounded-2xl shadow-2xl border border-white/10 flex flex-col z-50 overflow-hidden">
          <div className={`px-4 py-3 flex items-center justify-between ${
            mode === "student" ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-red-500 to-orange-500"
          }`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-semibold text-white">Geleza AI</span>
            </div>
            <div className="flex items-center gap-2">
              {mode === "teacher" && (
                <button
                  onClick={() => setShowAlertForm(!showAlertForm)}
                  className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white hover:bg-white/30 transition-colors"
                >
                  Flag Student
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {showAlertForm && mode === "teacher" && (
            <div className="p-3 bg-red-500/20 border-b border-red-500/30">
              <p className="text-red-300 text-sm mb-2">Flag a struggling student:</p>
              <input
                type="text"
                value={alertStudent}
                onChange={(e) => setAlertStudent(e.target.value)}
                placeholder="Student name"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm mb-2"
              />
              <select
                value={alertTopic}
                onChange={(e) => setAlertTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-white/20 text-white text-sm mb-2"
              >
                <option value="">Select topic area</option>
                {studentTopics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button
                onClick={handleAlertSubmit}
                className="w-full px-3 py-2 bg-red-500 rounded-lg text-white text-sm hover:bg-red-600 transition-colors"
              >
                Add to Watch List
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === "user" 
                    ? "bg-amber-500 text-white rounded-br-md"
                    : "bg-white/10 text-slate-200 rounded-bl-md"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={mode === "student" ? "Ask for help with a topic..." : "Ask about test creation..."}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm hover:bg-amber-600 disabled:opacity-50 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function generateResponse(input: string, mode: "student" | "teacher"): string {
  const lowerInput = input.toLowerCase();

  if (mode === "student") {
    if (lowerInput.includes("answer") || lowerInput.includes("solve") || lowerInput.includes("what is")) {
      return `I won't give you the direct answer, but I can help you figure it out! Let me ask you a few questions:

1. What do you already know about this topic?
2. Have you tried any approach? Where did you get stuck?
3. What formula or concept do you think might be relevant?

Tell me your thoughts and I'll guide you through the next steps!`;
    }

    if (lowerInput.includes("math") || lowerInput.includes("equation") || lowerInput.includes("calculate")) {
      return `For math problems, I can help you understand the approach. 

Instead of just giving you the answer, let's work through it together:

1. First, identify what's being asked
2. What information do you have?
3. Which formula or method applies here?

Show me what you've tried so far, and I'll point you in the right direction!`;
    }

    if (lowerInput.includes("essay") || lowerInput.includes("write") || lowerInput.includes("paragraph")) {
      return `For essay writing, I can help you with structure and ideas, not write it for you!

Let's plan it out:
1. What's your main argument/thesis?
2. What 3-4 supporting points will you use?
3. How will you conclude?

Once you have your outline, I can give feedback on making your writing stronger. What's your topic?`;
    }

    if (lowerInput.includes("confused") || lowerInput.includes("don't understand") || lowerInput.includes("help")) {
      return `No problem! Let's break this down together.

What specific part is confusing you?
- Is it a new concept?
- A formula you don't get?
- How to apply something?

Tell me what you're working on and I'll explain it in a different way!`;
    }

    return `I'm here to help you understand your work better! 

Tell me:
- What subject are you working on?
- What's the specific topic?
- What part is tricky for you?

I'll guide you through it step by step without giving you the answers directly - that way you'll actually learn! 📚`;
  }

  // Teacher mode responses
  if (lowerInput.includes("test") || lowerInput.includes("question") || lowerInput.includes("quiz")) {
    return `Great question about test creation! Here's how I can help:

**Instead of writing questions for you**, let me guide your process:

1. **What topic are you testing?** 
2. **What's your objective?** (knowledge recall, application, analysis?)
3. **How many questions?** and **what types?** (MCQ, short answer, essay?)

Once you decide the structure, I can give you tips on:
- How to write effective MCQ options
- What makes a good short answer question
- How to balance difficulty levels

What subject and topic are you planning?`;
  }

  if (lowerInput.includes("struggling") || lowerInput.includes("weak") || lowerInput.includes("behind")) {
    return `Identifying struggling students early is so important! Here are signs to look for:

**Academic indicators:**
- Consistently incomplete assignments
- Scores below 50% on assessments
- Missing concepts that build on each other

**Intervention strategies:**
- Small group remediation during class
- One-on-one check-ins
- Peer tutoring pairs
- Modified assignments

Would you like to flag specific students for monitoring? I can help you track who might need extra support!`;
  }

  if (lowerInput.includes("teach") || lowerInput.includes("lesson") || lowerInput.includes("explain")) {
    return `I'm not here to teach for you, but I can help you plan!

**Tips for effective teaching:**
1. Start with what students already know
2. Use real-world examples from SA context
3. Check understanding before moving on
4. Let students explain concepts to each other

What topic are you planning to teach? I can suggest engagement strategies!`;
  }

  return `I'm here to support your teaching! Here's how:

**I can help you with:**
- Test/assessment design guidance
- Identifying struggling students
- Teaching strategies and tips
- Differentiation ideas

**I won't do your work, but I'll guide you through it!**

What do you need help with today?`;
}