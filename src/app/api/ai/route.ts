import { NextResponse } from "next/server";

interface TopicItem {
  keywords: string[];
  subject: string;
  responseEn: string;
  responseZu: string;
}

const knowledgeBase: TopicItem[] = [
  // MATHEMATICS
  { keywords: ["algebra", "equation", "solve", "x", "variable", "linear"], subject: "Mathematics", responseEn: "ALGEBRA: Whatever you do to ONE side, do to the OTHER. Example: x + 7 = 12, subtract 7: x = 5", responseZu: "ALGEBRA: Wenzani ngakunye ngakunye. x + 7 = 12, susa u-7: x = 5" },
  { keywords: ["fraction", "numerator", "denominator", "divide", "half"], subject: "Mathematics", responseEn: "FRACTIONS: Numerator (top) = parts you have, Denominator (bottom) = total parts. 1/2 + 1/4 = 2/4 + 1/4 = 3/4", responseZu: "IFRACTION: Numerator = phezulu, Denominator = phezansi" },
  { keywords: ["percentage", "percent", "vat", "discount"], subject: "Mathematics", responseEn: "PERCENTAGES: 20% of R80 = 20/100 x 80 = R16. 10% = divide by 10, 25% = divide by 4", responseZu: "AMAPHESENTI: 20% ka-R80 = R16" },
  { keywords: ["triangle", "angle", "geometry", "area", "perimeter"], subject: "Mathematics", responseEn: "GEOMETRY: All triangle angles = 180 degrees. Area = 1/2 x base x height. Types: Equilateral, Isosceles, Scalene", responseZu: "GEOMETRY: Wonke amaAngle = nge-180. Isidingo: Equilateral, Isosceles, Scalene" },
  { keywords: ["number", "prime", "factor", "multiple", "lcm", "hcf"], subject: "Mathematics", responseEn: "PRIME NUMBERS: Only divisible by 1 and itself. 2,3,5,7,11,13,17,19,23,29", responseZu: "I-PRIME: Yadlulelwa nge-1 nangeso" },
  { keywords: ["ratio", "proportion", "rate"], subject: "Mathematics", responseEn: "RATIO: Compares quantities. a:b means a/b. Simplify by dividing by common factor", responseZu: "RATIO: Qathanisa izinto" },
  { keywords: ["statistics", "mean", "median", "mode", "range", "graph"], subject: "Mathematics", responseEn: "STATISTICS: Mean = sum/count, Median = middle, Mode = most frequent, Range = max - min", responseZu: "STATISTICS: Mean = qaka/hlulela" },
  // PHYSICAL SCIENCES
  { keywords: ["photosynthesis", "plant", "leaf", "chlorophyll"], subject: "Physical Sciences", responseEn: "PHOTOSYNTHESIS: CO2 + H2O + Light = Glucose + O2. Needs: CO2, H2O, Sunlight, Chlorophyll", responseZu: "PHOTOSYNTHESIS: Dinga CO2, H2O, Ukukhanya, Chlorophyll" },
  { keywords: ["atom", "molecule", "element", "compound", "periodic"], subject: "Physical Sciences", responseEn: "ATOMS: Proton (positive), Neutron (neutral), Electron (negative). Element = one type of atom", responseZu: "AMA-ATOM: Proton, Neutron, Electron" },
  { keywords: ["force", "gravity", "newton", "mass", "weight", "motion"], subject: "Physical Sciences", responseEn: "FORCES: F = ma (Force = mass x acceleration). Weight = mass x 9.8. Newtons 3 laws", responseZu: "AMA-FORCES: F = ma, W = mass x 9.8" },
  { keywords: ["wave", "frequency", "sound", "light"], subject: "Physical Sciences", responseEn: "WAVES: Wavelength (distance), Amplitude (height), Frequency (waves/sec). Sound needs medium", responseZu: "AMA-WAVES: Wavelength, Amplitude" },
  { keywords: ["acid", "base", "ph", "indicator", "salt"], subject: "Physical Sciences", responseEn: "ACIDS/BASES: pH 0-6 = Acidic, 7 = Neutral, 8-14 = Basic. Acid + Base = Salt + Water", responseZu: "AMA-ACIDS: pH 0-6 Acid, 7 Neutral, 8-14 Basic" },
  // LIFE SCIENCES
  { keywords: ["cell", "mitochondria", "nucleus", "membrane"], subject: "Life Sciences", responseEn: "CELL: Membrane (entrance), Nucleus (control), Mitochondria (energy), Ribosomes (proteins)", responseZu: "ISELE: Membrane, Nucleus, Mitochondria" },
  { keywords: ["dna", "rna", "gene", "genetics", "chromosome"], subject: "Life Sciences", responseEn: "DNA: Contains genetic code, in nucleus. Genes = sections of DNA. Humans have 46 chromosomes", responseZu: "DNA: Igene laphakathi" },
  { keywords: ["ecosystem", "food chain", "producer", "consumer"], subject: "Life Sciences", responseEn: "ECOSYSTEM: Sun -> Producer -> Primary Consumer -> Secondary Consumer. 10% energy transfers", responseZu: "EKOSISTEMU: Imvela -> Umveli -> Umdayi" },
  // HISTORY
  { keywords: ["south africa", "apartheid", "mandela", "freedom", "1994"], subject: "History", responseEn: "SA HISTORY: 1948 Apartheid begins, 1976 Soweto Uprising, 1990 Mandela released, 1994 first democratic election", responseZu: "SA: 1948 Apartheid, 1990 Mandela khululwa" },
  { keywords: ["world war", "world war 1", "world war 2", "ww2"], subject: "History", responseEn: "WW1: 1914-1918, WW2: 1939-1945. Causes, major battles, end with atomic bombs", responseZu: "WW1 ne WW2" },
  // GEOGRAPHY
  { keywords: ["climate", "weather", "temperature", "season"], subject: "Geography", responseEn: "CLIMATE: Weather = daily conditions, Climate = long-term average. Types: Tropical, Temperate, Arid, Polar", responseZu: "AMA-KLIMA: I-Weather nsuku zonke" },
  { keywords: ["plate", "tectonic", "earthquake", "volcano"], subject: "Geography", responseEn: "PLATE TECTONICS: Earths crust moves on mantle. Plates move 1-10cm/year. Causes earthquakes, volcanoes", responseZu: "PLATES: Crust ihamba pare" },
  // ENGLISH
  { keywords: ["essay", "writing", "paragraph", "introduction", "conclusion"], subject: "English", responseEn: "ESSAY: Introduction (hook, thesis), Body (3-5 paragraphs), Conclusion (restate, summarize)", responseZu: "ESSAY: Ukungenela, Imizu, Isiqutho" },
  { keywords: ["poetry", "poem", "rhyme", "simile", "metaphor"], subject: "English", responseEn: "POETRY: Rhyme (similar sounds), Simile (like/as), Metaphor (direct), Personification (human traits)", responseZu: "AMA-POEM: Rhyme, Simile, Metaphor" },
  { keywords: ["novel", "book", "character", "plot", "theme"], subject: "English", responseEn: "NOVEL: Characters (protagonist, antagonist), Plot (exposition, rising action, climax, conclusion), Themes", responseZu: "INCWADI: Abalingani, Plot, Imqo" },
  // BUSINESS
  { keywords: ["business", "entrepreneur", "profit", "loss", "cost"], subject: "Business Studies", responseEn: "BUSINESS: Entrepreneur takes risk for profit. Fixed costs (rent) + Variable costs = Total cost", responseZu: "BIZINISI: Ungayibona uyasebenza" },
  { keywords: ["marketing", "advertising", "brand", "target"], subject: "Business Studies", responseEn: "MARKETING: Product, Price, Place, Promotion. Target market = who your customers are", responseZu: "MAKETING: Product, Price, Place" },
  // ACCOUNTING
  { keywords: ["accounting", "debit", "credit", "ledger"], subject: "Accounting", responseEn: "ACCOUNTING: Assets = Liabilities + Capital. Debit increases assets, Credit decreases assets", responseZu: "UKUBALEKA: Debit yandisa assets" },
  // ECONOMICS
  { keywords: ["economics", "supply", "demand", "price", "scarcity"], subject: "Economics", responseEn: "ECONOMICS: Unlimited wants vs Limited resources = Scarcity. Supply meets demand at equilibrium price", responseZu: "EKONOMICS: Supply idibana demand" },
  // LIFE ORIENTATION
  { keywords: ["life orientation", "health", "nutrition", "diet", "exercise"], subject: "Life Orientation", responseEn: "HEALTH: Eat balance (protein, carbs, fats, vitamins). Drink 8 glasses water daily. Exercise 30 min/day", responseZu: "IMPILO: Dla okulinganayo, Amanzi 8 glasses" },
  { keywords: ["hiv", "aids", "relationships"], subject: "Life Orientation", responseEn: "HIV/AIDS: No cure but treatment available. Prevent: condoms, safe sex, test regularly", responseZu: "HIV: Thwala ucansi, lula" },
  // IT
  { keywords: ["computer", "software", "hardware", "internet", "coding"], subject: "IT", responseEn: "IT: Hardware (input, output, CPU), Software (Windows, Word), Internet (TCP/IP browsers)", responseZu: "IT: Hardware, Software" }
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
    const { messages, mode, grade, language = "en" } = await request.json();
    const latestMessage = messages[messages.length - 1]?.content || "";
    const matchedResponse = findBestResponse(latestMessage);
    
    if (matchedResponse) {
      return NextResponse.json({ reply: matchedResponse });
    }
    
    const reply = `Hello! I am Geleza AI - your study helper.

MATHEMATICS: Algebra, Fractions, Percentages, Geometry, Statistics, Ratios, Number Theory

PHYSICS: Photosynthesis, Atoms, Forces, Waves, Acids & Bases

BIOLOGY: Cells, DNA, Genetics, Ecosystems

HISTORY: SA History, World Wars

GEOGRAPHY: Climate, Plate Tectonics

ENGLISH: Essay Writing, Poetry, Novels

BUSINESS: Business Basics, Marketing

ACCOUNTING: Debits & Credits

ECONOMICS: Supply & Demand

LIFE O: Health, Nutrition, HIV/AIDS

IT: Computer Basics

Ask me anything! Try: Help with algebra, Explain photosynthesis`;

    
    return NextResponse.json({ reply });
    
  } catch (error) {
    return NextResponse.json({ reply: "Sorry, error. Try again." }, { status: 500 });
  }
}