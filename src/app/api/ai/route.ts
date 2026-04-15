import { NextResponse } from "next/server";

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

interface KnowledgeItem {
  keywords: string[];
  topic: string;
  responseEn: string;
  responseZu: string;
}

const knowledgeBase: KnowledgeItem[] = [
  {
    keywords: ["algebra", "equation", "solve", "x", "variable", "linear"],
    topic: "Algebra",
    responseEn: "ALGEBRA BASICS:\n\nTo solve equations, remember: whatever you do to one side, do to the other!\n\nExample: x + 5 = 10\nSubtract 5 from both sides: x = 10 - 5\nAnswer: x = 5\n\nTIPS:\n- Get x alone by doing opposite operations\n- If it is +5, subtract 5\n- If it is x2, divide by 2\n- Always check your answer",
    responseZu: "ALGEBRA:\n\nUkuze usonde inkinga, khumbula: noma ungenza ini engakani enye ingaphandla, wenze omo!\n\nIsibonelo: x + 5 = 10\nSusa u-5 eduze nobozizonke: x = 10 - 5"
  },
  {
    keywords: ["fraction", "numerator", "denominator", "divide", "half", "quarter"],
    topic: "Fractions",
    responseEn: "FRACTIONS BASICS:\n\nNUMERATOR = top number (parts you have)\nDENOMINATOR = bottom number (total parts)\n\nExample: 3/4\n- Numerator 3 = you have 3 parts\n- Denominator 4 = total 4 parts\n\nAdd fractions with SAME denominator:\n3/4 + 1/4 = (3+1)/4 = 4/4 = 1",
    responseZu: "IFRACTIYA:\n\nNUMERATOR = inani elisezuleni\nDENOMINATOR = inani elisezansi"
  },
  {
    keywords: ["percentage", "percent", "discount", "interest"],
    topic: "Percentages",
    responseEn: "PERCENTAGES:\n\nPercentage means per 100\n\n20 percent = 20/100 = 0.2\n\nCalculate 20% of R80:\n20/100 x R80 = R16\n\nCommon percentages:\n- 10% = divide by 10\n- 20% = divide by 5\n- 25% = divide by 4\n- 50% = divide by 2",
    responseZu: "AMAPHESENTI:\n\n20% yegama = R80\n20/100 x R80 = R16"
  },
  {
    keywords: ["photosynthesis", "plant", "leaf", "sunlight"],
    topic: "Photosynthesis",
    responseEn: "PHOTOSYNTHESIS - How Plants Make Food:\n\nWhat plants need:\n1. Carbon dioxide (CO2) from air\n2. Water (H2O) from roots\n3. Sunlight (for energy)\n4. Chlorophyll (green pigment)\n\nWhat plants produce:\n- Glucose (food/sugar)\n- Oxygen (O2) released\n\nWhere it happens: In LEAVES\n\nWhy important:\n- Plants make their own food\n- We breathe the oxygen produced",
    responseZu: "PHOTOSYNTHESIS:\n\nOkudinga izindoda:\n1. I-carbon dioxide\n2. A-manzi\n3. Ukukhanya\n4. I-chlorophyll\n\nOkukhaduza:\n- A-Glucose\n- I-Oxygen"
  },
  {
    keywords: ["atom", "molecule", "element", "compound", "periodic"],
    topic: "Atoms",
    responseEn: "ATOMS AND ELEMENTS:\n\nATOM = smallest unit of matter\nMOLECULE = atoms joined together\nELEMENT = one type of atom\nCOMPOUND = different atoms combined\n\nExamples:\n- O2 = Oxygen molecule (2 oxygen atoms)\n- H2O = Water compound (2 hydrogen + 1 oxygen)\n- NaCl = Salt (sodium + chlorine)\n\nPeriodic Table:\n- Groups = similar properties\n- Periods = energy levels",
    responseZu: "AMA-ATOM NE-ELEMENTS:\n\nATOM = i-units encane kakhulu\nMOLECULE = ama-atom axhumene\nELEMENT = uhlobo olulodwa lwangomuzi"
  },
  {
    keywords: ["gravity", "force", "newton", "mass", "weight", "motion"],
    topic: "Forces",
    responseEn: "FORCES AND MOTION:\n\nNewtons Laws:\n1. Objects stay still or keep moving unless force acts on them\n2. F = ma (Force = mass x acceleration)\n3. Every action has equal, opposite reaction\n\nTypes of forces:\n- Gravity (pulls down)\n- Friction (slows down)\n- Magnetic (attracts metals)\n\nWeight = mass x gravity\nOn Earth, g = 9.8 m/s2",
    responseZu: "AMA-FORCES:\n\nW = mass x gravity"
  },
  {
    keywords: ["essay", "writing", "paragraph", "introduction", "conclusion"],
    topic: "Essay",
    responseEn: "ESSAY STRUCTURE:\n\n1. INTRODUCTION\n   - Hook (interesting sentence)\n   - Background info\n   - Thesis statement (main argument)\n\n2. BODY PARAGRAPHS (3-5)\n   - Topic sentence\n   - Evidence/example\n   - Explanation\n   - Transition\n\n3. CONCLUSION\n   - Restate thesis\n   - Summary of points\n   - Final thought\n\nTips:\n- Always plan first\n- 5 paragraphs minimum\n- Use linking words",
    responseZu: "UKUBHALA ESSAY:\n\n1. UKUNGENELA\n2. IMIZU EBHODENI\n3. ISIQUTHO"
  },
  {
    keywords: ["history", "south africa", "apartheid", "mandela", "freedom"],
    topic: "SA History",
    responseEn: "SOUTH AFRICAN HISTORY - Key Events:\n\n1652 - Dutch Settlement begins\n1910 - Union of South Africa\n1948 - Apartheid begins (National Party wins)\n1990 - Mandela released from prison\n1994 - First democratic elections\n1996 - Constitution adopted\n\nKey Figures:\n- Nelson Mandela (first black president)\n- Desmond Tutu (human rights)\n- Steve Biko (Black Consciousness)\n- Oliver Tambo (ANC leader)",
    responseZu: "INKULUMO KAMZANSI:\n\n1948 - Apartheid iqala\n1990 - Mandela ukhululwa ejele\n1994 - Amavoti okwanelanga"
  },
  {
    keywords: ["poetry", "poem", "rhyme", "simile", "metaphor"],
    topic: "Poetry",
    responseEn: "POETRY TERMS:\n\nRHYME = words that sound similar at end\n- Cat, hat, bat = rhyme\n\nSIMILE = like/as comparison\n- Busy as a bee (uses like/as)\n\n\nMETAPHOR = direct comparison\n- The world is a stage (no like/as)\n\n\nPERSONIFICATION = human traits to non-human\n- The wind whispered\n\nALLITERATION = same sound at start\n- Lovely, lush lawn\n\nHow to analyze:\n1. Read twice\n2. Who is speaking?\n3. What mood?\n4. Find devices",
    responseZu: "I-POETRY:\n\nRHYME = amawadi afanayo\nSIMILE = njeng\nMETAPHOR = ithuluzi"
  },
  {
    keywords: ["triangle", "angle", "right", "obtuse", "acute"],
    topic: "Geometry",
    responseEn: "TRIANGLES:\n\nTypes:\n1. EQUILATERAL - all sides equal\n2. ISOSCELES - two sides equal\n3. SCALENE - no equal sides\n\nAngles:\n- ACUTE: less than 90 degrees\n- RIGHT: exactly 90 degrees\n- OBTUSE: more than 90 degrees\n\nTriangle angles ALWAYS add to 180 degrees\n\nArea = 1/2 x base x height",
    responseZu: "AMA-TRI-GON:\n\n- ISOSCELES - amaC amabili ane\n- SCALENE - awenelanga\n\nama-Angel:\n- ACUTE\n- RIGHT\n- OBTUSE"
  }
];

function findBestResponse(userMessage: string, language: string): string {
  const msg = userMessage.toLowerCase();
  const isZulu = language === 'zu';
  
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (msg.includes(keyword)) {
        return isZulu ? item.responseZu : item.responseEn;
      }
    }
  }
  
  return "";
}

export async function POST(request: Request) {
  try {
    const { messages, mode, grade, language = "en" } = await request.json();
    
    const latestMessage = messages[messages.length - 1]?.content || "";
    
    console.log("Processing message:", latestMessage, "language:", language);
    
    const matchedResponse = findBestResponse(latestMessage, language);
    
    if (matchedResponse) {
      return NextResponse.json({ reply: matchedResponse });
    }
    
    const defaultStudentEn = `Hello! I am Geleza AI - your study assistant.

I can help with:

MATHEMATICS
- Algebra (equations, solving for x)
- Fractions, percentages
- Geometry (triangles, angles)

SCIENCES  
- Photosynthesis
- Atoms and elements
- Forces and motion

ENGLISH
- Essay writing
- Poetry analysis
- Vocabulary

HISTORY
- South African history
- Key events and figures

Ask me in your language!
Try: Help me with algebra or Explain photosynthesis`;

    const defaultStudentZu = `Sawubona! Ngingu Geleza AI - usizo lwakho lokufunda.

Ngingasiza:

MATHEMATICS
- Algebra
- Fractions
- Geometry

SCIENCE
- Photosynthesis
- Ama-atoms

UKUBHALA
- Essays
- Ama-poems

Ngicele ngesizulu!
Zama: Nganginika algebra`;

    const defaultTeacherEn = `Hello! I am Geleza AI - your teaching assistant.

I can help with:

CREATING TESTS
- Multiple choice questions
- Short answer questions
- Essay topics

HELPING STRUGGLING STUDENTS
- Intervention strategies
- Differentiation tips
- Assessment tips

SUBJECTS
- Mathematics
- Sciences
- Languages

Ask me anything!`;

    const defaultTeacherZu = `Sawubona! Ngingu Geleza AI - usizo lwakho lwokufundisa.

Ngingasiza:

UKUQULETA AMA-TEST
- Imibuzo enezingane

UKUSESA ABAFUNDI
- amaStrategy`;

    const reply = mode === 'teacher' 
      ? (language === 'zu' ? defaultTeacherZu : defaultTeacherEn)
      : (language === 'zu' ? defaultStudentZu : defaultStudentEn);
      
    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json({ 
      reply: "Sorry, I encountered an error. Please try again." 
    }, { status: 500 });
  }
}