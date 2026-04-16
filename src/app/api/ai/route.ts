import { NextResponse } from "next/server";

interface TopicItem {
  keywords: string[];
  subject: string;
  responseEn: string;
  responseZu: string;
}

const knowledgeBase: TopicItem[] = [
  // ==================== MATHEMATICS ====================
  { keywords: ["algebra", "equation", "solve", "x", "variable", "linear", "expression"], subject: "Mathematics", responseEn: "ALGEBRA: Whatever you do to ONE side, do to the OTHER. Example: x + 7 = 12, subtract 7: x = 5. Solve: 2x + 3 = 11, subtract 3: 2x = 8, divide by 2: x = 4", responseZu: "ALGEBRA: Wenzani ngakunye ngakunye. x + 7 = 12, susa u-7: x = 5" },
  { keywords: ["fraction", "numerator", "denominator", "divide", "half", "quarter", "third"], subject: "Mathematics", responseEn: "FRACTIONS: Numerator (top) = parts you have, Denominator (bottom) = total parts. Add: keep denominator same, add numerators. Multiply: multiply top x top, bottom x bottom. 1/2 x 2/3 = 2/6 = 1/3", responseZu: "IFRACTION: Numerator = phezulu, Denominator = phezansi" },
  { keywords: ["percentage", "percent", "vat", "discount", "increase"], subject: "Mathematics", responseEn: "PERCENTAGES: 20% of R80 = 20/100 x 80 = R16. Increase by 10%: multiply by 1.10. Decrease by 20%: multiply by 0.80. Find percentage: part/whole x 100", responseZu: "AMAPHESENTI: 20% ka-R80 = R16" },
  { keywords: ["triangle", "angle", "geometry", "area", "perimeter", "circle", "square"], subject: "Mathematics", responseEn: "GEOMETRY: Triangle angles = 180 degrees. Area triangle = 1/2 x base x height. Circle: Area = pi x r squared, Circumference = 2pi x r. Pythagoras: a squared + b squared = c squared", responseZu: "GEOMETRY: Triangle angles = 180 degrees" },
  { keywords: ["number", "prime", "composite", "factor", "multiple", "lcm", "hcf", "gcd"], subject: "Mathematics", responseEn: "NUMBER THEORY: Prime = only 1 and itself (2,3,5,7,11,13,17,19,23,29). HCF = biggest common factor. LCM = smallest both divide into. Factors of 12: 1,2,3,4,6,12", responseZu: "INOMBOLO: I-PRIME engeyona" },
  { keywords: ["ratio", "proportion", "rate", "scale"], subject: "Mathematics", responseEn: "RATIO: a:b = a/b. Simplify by dividing by common factor. 6:9 simplifies to 2:3. Direct proportion: more = more. Inverse proportion: more = less time", responseZu: "RATIO: Qathanisa izinto" },
  { keywords: ["statistics", "mean", "median", "mode", "range", "graph", "bar", "histogram"], subject: "Mathematics", responseEn: "STATISTICS: Mean = sum/count. Median = middle (order first). Mode = most frequent. Range = max - min. Plot: bar graph, histogram, line graph", responseZu: "STATISTICS: Mean, Median, Mode, Range" },
  { keywords: ["sequences", "arithmetic", "geometric", "pattern"], subject: "Mathematics", responseEn: "SEQUENCES: Arithmetic = add same number (2,5,8,+3). Geometric = multiply same number (2,6,18,x3). Find nth term: a + (n-1)d", responseZu: "AMASES: Arithmetic, Geometric" },
  { keywords: ["finance", "interest", "loan", "instalment", "simple", "compound"], subject: "Mathematics", responseEn: "FINANCE: Simple interest = P x R x T / 100. Compound interest = P(1+R/100)^T. Hire purchase = deposit + instalments. Profit = selling - cost", responseZu: "IMALI: Isilingo esilula, esibonelo" },
  // ==================== PHYSICAL SCIENCES ====================
  { keywords: ["photosynthesis", "plant", "leaf", "chlorophyll", "glucose", "oxygen"], subject: "Physical Sciences", responseEn: "PHOTOSYNTHESIS: CO2 + H2O + Light energy -> C6H12O6 + O2. Needs: CO2, H2O, sunlight, chlorophyll. In chloroplasts (leaves). Products: glucose (food) + oxygen (released)", responseZu: "PHOTOSYNTHESIS: CO2 + H2O + Ukukhanya -> Glucose + O2" },
  { keywords: ["atom", "molecule", "element", "compound", "periodic", "proton", "neutron", "electron"], subject: "Physical Sciences", responseEn: "ATOMIC STRUCTURE: Proton (+), Neutron (0), Electron (-). Nucleus at center. Atomic number = protons. Mass number = protons + neutrons. Isotopes = same proton, different neutron", responseZu: "AMA-ATOM: Proton (+), Neutron (0), Electron (-)" },
  { keywords: ["force", "gravity", "newton", "mass", "weight", "motion", "friction"], subject: "Physical Sciences", responseEn: "FORCES: Newtons 1st: object stays still/moving unless force acts. 2nd: F = ma. 3rd: action = opposite reaction. Weight = mass x 9.8m/s2. Gravity pulls down", responseZu: "AMA-FORCES: F = ma (Force = mass x acceleration)" },
  { keywords: ["wave", "frequency", "wavelength", "amplitude", "sound", "light", "electromagnetic"], subject: "Physical Sciences", responseEn: "WAVES: Wavelength (lambda) = distance peak to peak. Frequency (f) = waves per second (Hertz). Amplitude = height (energy). v = f x lambda. Sound needs medium, light does not", responseZu: "AMA-WAVES: Wavelength, Frequency, Amplitude" },
  { keywords: ["acid", "base", "ph", "indicator", "salt", "neutral"], subject: "Physical Sciences", responseEn: "ACIDS AND BASES: pH scale 0-14. pH 0-6 = acid (H+), pH 7 = neutral, pH 8-14 = base (OH-). Indicators: litmus, phenolphthalein. Acid + Base = Salt + Water", responseZu: "AMA-ACIDS: pH 0-14" },
  { keywords: ["electric", "circuit", "voltage", "current", "resistance", "ohm", "parallel", "series"], subject: "Physical Sciences", responseEn: "ELECTRICITY: V = IR (Ohms law). Series: current same, voltages add. Parallel: voltage same, currents add. Power = VI. Energy = Power x time", responseZu: "STROM: V = IR (umthetho we-Ohm)" },
  { keywords: ["matter", "solid", "liquid", "gas", "state", "change", "boiling", "melting"], subject: "Physical Sciences", responseEn: "MATTER: Solid -> Liquid = melt (heat). Liquid -> Gas = boil (heat). Gas -> Liquid = condense. Solid -> Gas = sublime. Particles move faster when heated", responseZu: "AMATTER: I-solid, Amanzi, I-gas" },
  { keywords: ["momentum", "impulse", "conservation", "collision"], subject: "Physical Sciences", responseEn: "MOMENTUM: p = mv (mass x velocity). Conservation: total momentum before = total momentum after. Impulse = change in momentum", responseZu: "UMZUKU: p = mv" },
  // ==================== LIFE SCIENCES ====================
  { keywords: ["cell", "mitochondria", "nucleus", "membrane", "organelles", "cytoplasm"], subject: "Life Sciences", responseEn: "CELL STRUCTURE: Nucleus = control, has DNA. Mitochondria = energy (ATP). Membrane = controls entry/exit. Ribosomes = make proteins. Chloroplast = photosynthesis (plant). Plant vs animal cell", responseZu: "ISELE: Nucleus, Mitochondria, Membrane" },
  { keywords: ["dna", "rna", "gene", "genetics", "chromosome", "heredity"], subject: "Life Sciences", responseEn: "DNA GENETICS: DNA in nucleus has genes (traits). DNA = double helix. Gene = section of DNA. Chromosome = DNA wrapped around proteins. 46 chromosomes in humans. Dominant vs recessive", responseZu: "DNA: I-gene, I-chromosome" },
  { keywords: ["ecosystem", "food chain", "food web", "producer", "consumer", "decomposer", "energy"], subject: "Life Sciences", responseEn: "ECOSYSTEM: Sun -> Producer -> Primary Consumer -> Secondary -> Tertiary. Trophic levels: energy decreases 10% each level. Decomposers recycle nutrients", responseZu: "EKOSISTEMU: Food chain" },
  { keywords: ["enzyme", "substrate", "catalyst", "lock", "key", "digestion"], subject: "Life Sciences", responseEn: "ENZYMES: Biological catalysts. Lock and key: substrate fits into active site. Optimum temperature ~37C. Denatured = permanently damaged by heat/acid", responseZu: "AMA-ENZAYIMU: I-catalyst" },
  { keywords: ["respiratory", "lungs", "breathing", "gas", "exchange", "oxygen"], subject: "Life Sciences", responseEn: "RESPIRATORY: Oxygen enters alveoli, diffuses into blood. CO2 diffuses out. Diaphragm contracts = inhale. Ribs expand = inhale. Gas exchange in alveoli", responseZu: "UKUPULULA: Amaphaphu" },
  { keywords: ["circulatory", "heart", "blood", "vein", "artery", "pulse"], subject: "Life Sciences", responseEn: "CIRCULATORY: Heart pumps blood. Arteries carry blood AWAY from heart (oxygenated). Veins carry TOWARD heart (deoxygenated). 4 chambers: 2 atria, 2 ventricles", responseZu: "UKUSONDA: Inhliziyo" },
  // ==================== GEOGRAPHY ====================
  { keywords: ["climate", "weather", "temperature", "season", "tropical", "temperate"], subject: "Geography", responseEn: "CLIMATE: Weather = daily short-term. Climate = long-term average. Factors: latitude, altitude, ocean currents, wind. SA: temperate with seasons. Mediterranean: Western Cape", responseZu: "AMA-KLIMA: I-weather, I-climate" },
  { keywords: ["plate", "tectonic", "earthquake", "volcano", "mountain", "crust", "mantle"], subject: "Geography", responseEn: "TECTONICS: Earths crust = plates floating on mantle. Move 1-10cm/year. Plate boundaries: convergent (collision), divergent (separate), transform (slide). Earthquakes at boundaries", responseZu: "PLATES: Tectonic" },
  { keywords: ["weathering", "erosion", "deposition", "river", "wind", " glaciation"], subject: "Geography", responseEn: "WEATHERING/EROSION: Physical = freeze-thaw. Chemical = rain. Biological = roots. Erosion: water (rivers), wind (deserts), ice (glaciers). Deposition when water slows", responseZu: "UKU-LIMALIKA" },
  { keywords: ["map", "topographic", "contour", "scale", "legend", "direction"], subject: "Geography", responseEn: "MAP READING: Contour lines show height - close together = steep, far apart = gentle. Scale = ratio. Cardinal directions: N, S, E, W. 4 figure grid reference", responseZu: "AMA-MAP: Contour, Scale" },
  // ==================== HISTORY ====================
  { keywords: ["south africa", "apartheid", "mandela", "freedom", "1994", "democracy"], subject: "History", responseEn: "SA HISTORY: 1948 Apartheid starts. 1960 Sharpeville Massacre. 1976 Soweto Uprising. 1990 Mandela freed. 1994 first democratic election. 1996 Constitution. Truth and Reconciliation Commission", responseZu: "SA: 1948 Apartheid, 1994" },
  { keywords: ["world war", "world war 1", "world war 2", "ww1", "ww2", "holocaust"], subject: "History", responseEn: "WORLD WARS: WWI 1914-1918: assassination triggered it. Trench warfare. Treaty of Versailles. WWII 1939-1945: Hitler, Mussolini, Japan. Holocaust: 6 million Jews. Atomic bombs end it", responseZu: "WWI ne WW2" },
  { keywords: ["cold war", "soviet", "russia", "communism", "capitalism"], subject: "History", responseEn: "COLD WAR: USA vs Soviet Union (1945-1991). No direct fighting. Capitalism (free markets) vs Communism (state control). Cuban Missile Crisis. Ends with USSR collapse 1991", responseZu: "COLD WAR: USA ne Russia" },
  { keywords: ["medieval", "feudal", "king", "knight", "castle"], subject: "History", responseEn: "MEDIEVAL: Feudal system - lords own land, serfs work it. Monarchs with absolute power. Knights in armor. Castles for defense. Roman Catholic Church powerful", responseZu: "MEDIEVAL" },
  // ==================== ENGLISH ====================
  { keywords: ["essay", "writing", "paragraph", "introduction", "conclusion", "topic sentence"], subject: "English", responseEn: "ESSAY WRITING: Introduction: hook, background, thesis. Body: 3-5 paragraphs with topic sentence, evidence, explanation, link. Conclusion: restate thesis, summarize, final thought", responseZu: "UKUBHALA: Intro, Body, Conclusion" },
  { keywords: ["poetry", "poem", "rhyme", "simile", "metaphor", "personification", "alliteration"], subject: "English", responseEn: "POETRY TERMS: Rhyme (end sounds). Simile (like/as). Metaphor (direct). Personification (human traits to things). Alliteration (same start sound). Onomatopoeia (sounds like things). Tone, mood, imagery", responseZu: "AMA-POEM: Rhyme, Simile, Metaphor" },
  { keywords: ["novel", "book", "character", "plot", "theme", "setting", "narrator"], subject: "English", responseEn: "NOVEL ANALYSIS: Characters: protagonist, antagonist. Plot: exposition, rising action, climax, falling action, denouement. Themes: main message. Setting: time and place. Narrator: first/third person", responseZu: "INCWADI: Characters, Plot, Theme" },
  { keywords: ["grammar", "tense", "subject", "verb", "object", "sentence"], subject: "English", responseEn: "GRAMMAR: Tenses: Past, Present, Future. Subject + Verb + Object. Parts of speech: noun, verb, adjective, adverb, preposition, conjunction. Active vs Passive voice", responseZu: "GRAMMAR: Tenses, Parts of speech" },
  { keywords: ["comprehension", "summary", "reading", "question"], subject: "English", responseEn: "COMPREHENSION: Read twice. Underline key words. Answer in full sentences. Use YOUR OWN WORDS. Summary = main ideas shortened. Point evidence explain", responseZu: "UKUBUBA" },
  // ==================== BUSINESS STUDIES ====================
  { keywords: ["business", "entrepreneur", "profit", "loss", "cost", "budget"], subject: "Business Studies", responseEn: "BUSINESS: Entrepreneur starts business, takes risk. Costs: Fixed (rent, salaries), Variable (materials). Profit = Revenue - Costs. Loss = Costs > Revenue. Budget = income - expenses", responseZu: "BIZINISI: Profit, Loss, Costs" },
  { keywords: ["marketing", "advertising", "brand", "target", "market", "customer", "promotion"], subject: "Business Studies", responseEn: "MARKETING: 4 Ps: Product (what sell), Price (how much), Place (where), Promotion (how find). Target market = ideal customers. Digital marketing: social media, SEO, email", responseZu: "MAKETING: Product, Price, Place" },
  { keywords: ["management", "planning", "organising", "leading", "controlling"], subject: "Business Studies", responseEn: "MANAGEMENT FUNCTIONS: Planning (set goals), Organising (allocate resources), Leading (motivate), Controlling (monitor progress). Business plan essential", responseZu: "UKULAWULA" },
  { keywords: ["business plan", "feasibility", "viability", "startup"], subject: "Business Studies", responseEn: "BUSINESS PLAN: Executive summary. Company description. Market analysis. Marketing strategy. Financial projections.SWOT analysis: Strengths, Weaknesses, Opportunities, Threats", responseZu: "PLAN YEBIZINISI" },
  // ==================== ACCOUNTING ====================
  { keywords: ["accounting", "debit", "credit", "ledger", "balance", "transaction"], subject: "Accounting", responseEn: "ACCOUNTING: Assets (what own) = Liabilities (what owe) + Capital (your investment). Debit (left): increases assets. Credit (right): increases liabilities/income. Trial balance: Debits = Credits", responseZu: "UKUBALEKA: Assets, Liabilities, Capital" },
  { keywords: ["balance sheet", "statement", "financial", "income", "position"], subject: "Accounting", responseEn: "FINANCIAL STATEMENTS: Balance Sheet (assets, liabilities, capital at date). Income Statement (revenue, expenses, profit/loss for period). Cash flow statement", responseZu: "UKUBALEKA: Balance Sheet" },
  { keywords: ["vat", "tax", "sars", "turnover", "output", "input"], subject: "Accounting", responseEn: "VAT (Value Added Tax): 15% in SA. Output VAT (on sales) - Input VAT (on purchases) = payable to SARS. Registered if turnover > R1 million. Tax returns monthly", responseZu: "VAT: 15% eM.A." },
  // ==================== ECONOMICS ====================
  { keywords: ["economics", "supply", "demand", "price", "scarcity", "equilibrium"], subject: "Economics", responseEn: "ECONOMICS: Scarcity = unlimited wants, limited resources. Supply curve: slope up (more price = more supply). Demand curve: slope down (more price = less demand). Equilibrium = where supply = demand", responseZu: "EKONOMICS: Supply, Demand" },
  { keywords: ["gdp", "gdp", "growth", "development", "gdp"], subject: "Economics", responseEn: "GDP: Gross Domestic Product = value of all goods/services produced in country per year. GDP growth = economy expanding. GDP per capita = GDP divided by population. Development = improving living standards", responseZu: "GD: Igross" },
  { keywords: ["unemployment", "poverty", "inequality", "distribution"], subject: "Economics", responseEn: "SOCIAL ISSUES: Unemployment = people without jobs seeking work. Poverty = income below minimum. Inequality = gap between rich and poor. Government solutions: jobs, grants, training", responseZu: "UKUSWELA IMISOCO" },
  // ==================== LIFE ORIENTATION ====================
  { keywords: ["life orientation", "health", "nutrition", "diet", "exercise", "wellness"], subject: "Life Orientation", responseEn: "HEALTH: Eat from all food groups: starch (energy), protein (muscles), fruits/vegetables (vitamins), dairy (calcium), fats (energy). Water: 8 glasses daily. Exercise: 30 min moderate daily", responseZu: "IMPILO: Ukudla, Amanzi, Ukwenza umshini" },
  { keywords: ["hiv", "aids", "tuberculosis", "tb", "sexually", "transmitted"], subject: "Life Orientation", responseEn: "STIs AND HIV: HIV spreads through blood, sexual contact, mother to child. No cure but ARV treatment allows normal life. Prevent: condoms, abstinence, faithfulness. Test regularly at clinic", responseZu: "HIV: Thwala ucansi, lula" },
  { keywords: ["relationships", "respect", "consent", "communication", "boundaries"], subject: "Life Orientation", responseEn: "HEALTHY RELATIONSHIPS: Respect = treat others as you want. Consent = always ask permission. Healthy communication = talk about feelings. Set boundaries and respect them. Support systems important", responseZu: "UBUDLELE" },
  { keywords: ["career", "careers", "job", "work", "career choices", "subject choices"], subject: "Life Orientation", responseEn: "CAREER PLANNING: Know your interests and strengths. Research careers: ask adults, internet. Subject choices should align with career goals. Further study: university, TVET, college. Job shadowing helps", responseZu: "INKONDO: Ukukhetha" },
  { keywords: ["study skills", "exam", "memory", "concentration", "notes"], subject: "Life Orientation", responseEn: "STUDY TECHNIKS: Active recall (test yourself). Spaced repetition. SQ3R: Survey, Question, Read, Recite, Review. Notes: use keywords. Past papers = best practice. Sleep 8 hours before exam", responseZu: "UKUFUNDA: I-technique" },
  // ==================== INFO TECHNOLOGY ====================
  { keywords: ["computer", "hardware", "input", "output", "cpu", "memory", "mouse", "keyboard"], subject: "Information Technology", responseEn: "HARDWARE: Input (mouse, keyboard, scanner). Processing (CPU = control, arithmetic, logic). Storage (hard drive, memory). Output (monitor, printer)", responseZu: "I-COMPUTER: Input, Processing, Output" },
  { keywords: ["software", "application", "system", "windows", "microsoft", "word"], subject: "Information Technology", responseEn: "SOFTWARE: System (Windows, Linux, MacOS) makes hardware work. Application (MS Word, Excel, PowerPoint). Programming: Python, HTML, Java. Always legally licensed", responseZu: "ISOFTWARE" },
  { keywords: ["internet", "www", "browser", "search", "email", "protocol"], subject: "Information Technology", responseEn: "INTERNET: WWW = World Wide Web. Browser = Chrome, Firefox, Edge. URL = website address. Search engines find info. Email = electronic mail. Protocol = rules for communication", responseZu: "INTERNET" },
  { keywords: ["html", "coding", "programming", "python", "javascript", "code"], subject: "Information Technology", responseEn: "CODING: HTML = web pages structure. Python = popular beginner language. JavaScript = interactive websites. CSS = styling. Tags: html, head, body, p, img. Always save with correct extension", responseZu: "UKUBHALELA" },
  // ==================== HOME LANGUAGES ====================
  { keywords: ["zulu", "isizulu", "zululand", "kwa"], subject: "isiZulu", responseEn: "ISIZULU: Learn vocabulary daily. Build sentences: Subject + Word + Object. Use present tense (-a), past tense (-e). Practice speaking. Watch Zulu shows. Read Zulu books", responseZu: "ISIZULU: Funda amawadi nsuku zonke" },
  { keywords: ["xhosas", "isixhosa", "xhosa"], subject: "isiXhosa", responseEn: "ISIXHOSA: Click sounds (q, x, c). Noun classes: abantu, izinto, amatshayana. Build vocabulary daily. Practice with fluent speakers. Read newspapers", responseZu: "ISIXHOSA: Funda daily" },
  { keywords: ["afrikaans", "afrikaans"], subject: "Afrikaans", responseEn: "AFRIKAANS: Similar to English in many ways. Learn: die (the), n (a), n (one). Verb at end of sentence. Words like: gaan (going), het (have), is (is)", responseZu: "AFRIKAANS" },
  { keywords: ["sesotho", "sotho", "south"], subject: "Sesotho", responseEn: "SESOTHO: Uses vowel sounds heavily. Noun prefixes: mo (person), se (thing). Learn basic greetings: dumela (hello), re (we). Practice with mother tongue speakers", responseZu: "SESOTHO" },
  // ==================== TECHNICAL ====================
  { keywords: ["technical", "engineering", "drawing", "egd", "projection", "first", "third"], subject: "Technical Studies", responseEn: "ENGINEERING GRAPHICS: First angle projection = object on right draws left. Third angle = object on left draws right. Scale: full size, reduced, enlarged. Line types: visible, hidden, center", responseZu: "TECHNICAL: Drawing" },
  { keywords: ["cat", "computer applications", "applications", "excel", "access", "powerpoint"], subject: "Computer Applications Technology", responseEn: "CAT: Excel = spreadsheets, formulas, charts. Access = databases, queries. PowerPoint = presentations. Word = documents. Learn keyboard shortcuts. Practice with past papers", responseZu: "CAT: Excel, Word, PowerPoint" },
  // ==================== ARTS ====================
  { keywords: ["visual arts", "art", "drawing", "painting", "design", "elements"], subject: "Visual Arts", responseEn: "VISUAL ARTS: Elements of design: line, shape, form, color, texture, space, value. Principles: balance, contrast, emphasis, rhythm. Techniques: shading, layering, mixing", responseZu: "UBONO" },
  { keywords: ["music", "note", "rhythm", "melody", "chord", "scale"], subject: "Music", responseEn: "MUSIC: Notes: whole, half, quarter, eighth. Time signature: top = beats per bar, bottom = note value. Treble clef for higher notes. Major scale = whole-half-whole pattern", responseZu: "UMCULO" },
  { keywords: ["drama", "theatre", "act", "stage", "performance", "script"], subject: "Dramatic Arts", responseEn: "DRAMA: Script has acts and scenes. Stage directions: upstage (back), downstage (front). Voice: pace, pitch, volume. Body: posture, gesture, movement. Ensemble = group work", responseZu: "DRAMA" },
  // ==================== OTHER ====================
  { keywords: ["consumer", "consumer studies", "food", "nutrition", "meal"], subject: "Consumer Studies", responseEn: "CONSUMER STUDIES: Food groups: starch (energy), protein (build), fat (reserve energy), fruit/veg (vitamins). Meal planning: balance, variety, cultural foods. Food safety and hygiene", responseZu: "UKUDLA" },
  { keywords: ["tourism", "travel", "attraction", "destination", "service"], subject: "Tourism", responseEn: "TOURISM: Sectors: travel, accommodation, attractions. Why people travel: leisure, business, visits. Local attractions: Kruger, Table Mountain, Drakensberg. Customer service key", responseZu: "UKUYA" },
  { keywords: ["religion", "religious", "faith", "belief", "church", "temple"], subject: "Religious Studies", responseEn: "RELIGION: World religions: Christianity, Islam, Judaism, Hinduism, Buddhism, African traditional. Similarities: worship, sacred texts, moral codes. Different beliefs about God/creation", responseZu: "INKOLO" },
  { keywords: ["physical education", "pe", "sport", "fitness", "training", "coach"], subject: "Physical Education", responseEn: "PHYSICAL EDUCATION: Components: speed, strength, endurance, flexibility, coordination. Skill-related: balance, reaction time. Exercise: warm up, main activity, cool down. Sports rules and techniques", responseZu: "UKWENZELA" }
];

const allSubjects = [
  // Primary School Subjects (Grades 1-7)
  "English Home Language",
  "Afrikaans First Additional Language",
  "isiZulu First Additional Language", 
  "Mathematics",
  "Life Skills (Grades 1-6)",
  "Life Orientation (Grade 7)",
  "Natural Sciences and Technology",
  "Social Sciences",
  "Creative Arts",
  "Physical Education",
  "Religious Education",
  
  // High School Subjects (Grades 8-12)
  // Languages
  "English Home Language",
  "Afrikaans First Additional Language",
  "Afrikaans Second Additional Language",
  "isiZulu Home Language",
  "isiZulu First Additional Language",
  "isiXhosa Home Language",
  "isiXhosa First Additional Language",
  "Sesotho Home Language",
  "Sesotho First Additional Language",
  "Setswana Home Language",
  "Setswana First Additional Language",
  "siSwati Home Language",
  "siSwati First Additional Language",
  "isiNdebele Home Language",
  "isiNdebele First Additional Language",
  "Xitsonga Home Language",
  "Xitsonga First Additional Language",
  "Tshivenda Home Language",
  "Tshivenda First Additional Language",
  
  // Compulsory Subjects
  "Mathematics",
  "Mathematical Literacy",
  "Life Orientation",
  
  // electives - Sciences
  "Physical Sciences",
  "Life Sciences",
  "Technical Sciences",
  
  // electives - Technical
  "Engineering Graphics and Design",
  "Computer Applications Technology",
  "Information Technology",
  
  // electives - Business
  "Accounting",
  "Business Studies",
  "Economics",
  "Consumer Studies",
  
  // electives - Humanities
  "Geography",
  "History",
  "Religion Studies",
  "Tourism",
  
  // electives - Arts
  "Visual Arts",
  "Music",
  "Dramatic Arts"
];

function findBestResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (msg.includes(keyword)) {
        return item.responseEn;
      }
    }
  }
  return "";
}

export async function POST(request: Request) {
  try {
    const { messages, mode, grade, language = "en", action } = await request.json();
    
    // If asking for subjects list
    if (action === "getSubjects") {
      return NextResponse.json({ subjects: allSubjects });
    }
    
    const latestMessage = messages[messages.length - 1]?.content || "";
    const matchedResponse = findBestResponse(latestMessage);
    
    if (matchedResponse) {
      return NextResponse.json({ reply: matchedResponse });
    }
    
    const reply = `Hello! I am Geleza AI - your study helper.

I can help with:

MATHEMATICS: Algebra, Fractions, Percentages, Geometry, Statistics, Finance, Number Theory

PHYSICAL SCIENCES: Photosynthesis, Atoms, Forces, Waves, Acids/Bases, Electricity, Matter

LIFE SCIENCES: Cells, DNA, Genetics, Ecosystems, Enzymes, Respiration, Circulation

HISTORY: SA History (Apartheid to Democracy), World Wars, Cold War, Medieval

GEOGRAPHY: Climate, Weather, Plate Tectonics, Weathering, Map Reading

ENGLISH: Essay Writing, Poetry, Novels, Grammar, Comprehension

BUSINESS: Entrepreneurship, Marketing, Management, Business Plans

ACCOUNTING: Debits/Credits, Balance Sheets, VAT

ECONOMICS: Supply/Demand, GDP, Unemployment

LIFE ORIENTATION: Health, HIV/AIDS, Relationships, Careers, Study Skills

IT: Hardware, Software, Internet, Coding (HTML, Python)

HOME LANGUAGES: Zulu, Xhosa, Afrikaans, Sotho

TECHNICAL: Engineering Graphics, CAT

ARTS: Visual Arts, Music, Drama

OTHER: Consumer Studies, Tourism, Religion Studies, PE

Ask me anything! Try: Explain algebra, What is DNA, Help with essay`;

    return NextResponse.json({ reply });
    
  } catch (error) {
    return NextResponse.json({ reply: "Sorry, error. Try again." }, { status: 500 });
  }
}