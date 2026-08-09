export type GrowthStage = "Nascent" | "Emerging" | "Accelerating" | "Mainstreaming"

export type SignalType = "Search demand" | "Social chatter" | "Review complaints" | "News coverage" | "Community discussion"

export interface EvidenceItem {
  source: "Google Trends" | "Reddit" | "YouTube" | "Reviews" | "News" | "Social chatter" | "Research Reports" | "Public Web"
  note: string
  volume: "Low" | "Medium" | "High"
}

export interface SignalBreakdownItem {
  label: string
  value: number
}

export interface CompetitorInfo {
  name: string
  position: string
  priceRange: string
  strength: string
  complaint: string
}

export interface Opportunity {
  id: string
  title: string
  category: string
  description: string
  score: number
  audience: string
  signalType: SignalType
  city: string
  priceRange: string
  growthStage: GrowthStage
  whyItMatters: string
  targetConsumer: string
  evidenceSummary: string
  evidence: EvidenceItem[]
  signalBreakdown: SignalBreakdownItem[]
  competition: string
  competitors: CompetitorInfo[]
  risks: string[]
  nextExperiment: string
  trend: number[]
  momentum: string
  evidenceCount: number
  consumerSegment: string
  regions: string
  potentialGap: string
  unmetNeeds: string[]
  potentialOpportunity: string
  consumerTension: string
  consumerQuotes: string[]
  scoreBreakdown: { label: string; value: number }[]
  cities: string[]
}

export const opportunities: Opportunity[] = [
  {
    id: "affordable-functional-nutrition",
    title: "Affordable Functional Nutrition",
    category: "Food & Beverage",
    description:
      "Consumers want nutrition products that offer functional benefits — energy, gut health, immunity — at price points accessible for daily use, not just occasional supplementation.",
    score: 84,
    audience: "Health-conscious urban consumers, 22-35",
    signalType: "Search demand",
    city: "Ahmedabad",
    priceRange: "₹100 – ₹500",
    growthStage: "Emerging",
    whyItMatters:
      "Functional nutrition is moving from a niche supplement category into everyday food choices. Consumers increasingly want health benefits embedded in familiar formats rather than as separate pills or powders.",
    targetConsumer:
      "Urban Gen Z and Millennials aged 22-35 who are health-conscious but price-sensitive, looking for daily nutrition solutions that fit into their existing routines.",
    evidenceSummary:
      "Search volume for functional food terms has grown consistently, paired with recurring complaints about premium pricing in the category.",
    evidence: [
      { source: "Google Trends", note: "'functional food India' and 'gut health snack' searches up 52% over 6 months", volume: "High" },
      { source: "Reddit", note: "r/IndianFood and fitness communities requesting affordable daily nutrition options", volume: "Medium" },
      { source: "Reviews", note: "Common complaint: 'great product but can't afford it every day'", volume: "High" },
      { source: "YouTube", note: "Health creators comparing cost-effectiveness of nutrition products", volume: "Medium" },
    ],
    signalBreakdown: [
      { label: "Search intent", value: 82 },
      { label: "Price sensitivity signal", value: 88 },
      { label: "Repeat purchase intent", value: 74 },
      { label: "Regional spread", value: 68 },
    ],
    competition:
      "Premium brands dominate with products priced above ₹200/serving. Limited options combining functional benefits with accessible pricing.",
    competitors: [
      { name: "Yoga Bar", position: "Premium functional snacking", priceRange: "₹80-150/unit", strength: "Strong brand recognition", complaint: "Too expensive for daily use" },
      { name: "The Whole Truth", position: "Clean-label nutrition", priceRange: "₹100-200/unit", strength: "Trust through transparency", complaint: "Limited accessibility outside metros" },
      { name: "True Elements", position: "Health-first breakfast", priceRange: "₹150-400/pack", strength: "Wide retail presence", complaint: "Taste not always appealing" },
      { name: "Protinex", position: "Traditional protein supplement", priceRange: "₹300-600/can", strength: "Legacy trust", complaint: "Feels medicinal, not food" },
    ],
    risks: [
      "Margin pressure at lower price points without scale",
      "Functional benefit claims require careful substantiation",
      "Consumer education needed on daily vs occasional use",
    ],
    nextExperiment:
      "Run a 100-person concept validation study in Ahmedabad and Pune before investing in product development.",
    trend: [22, 28, 31, 40, 46, 55, 63, 71],
    momentum: "+36%",
    evidenceCount: 127,
    consumerSegment: "Urban Gen Z & Millennials",
    regions: "Tier 1 + selected Tier 2 cities",
    potentialGap: "Strong demand but limited accessible options that combine real functional benefits with daily-use pricing.",
    unmetNeeds: ["Affordability for daily use", "Taste that feels like food, not medicine", "Convenient formats for on-the-go", "Clear functional benefit communication"],
    potentialOpportunity: "A brand that offers genuine functional nutrition in familiar Indian food formats — think fortified chilla mix, probiotic lassi, or immunity-boosted chikki — at sub-₹50 per serving price points.",
    consumerTension: "Consumers want to be healthier every day, but functional nutrition products feel like an expensive, occasional luxury rather than an everyday habit.",
    consumerQuotes: [
      "I know I should eat better but these health bars cost more than my lunch.",
      "Why can't someone make a protein snack that actually tastes Indian?",
      "I tried the imported ones but at ₹150 per bar, it's just not sustainable daily.",
      "My mom's homemade laddoos are more nutritious than most of these expensive brands.",
    ],
    scoreBreakdown: [
      { label: "Demand Momentum", value: 88 },
      { label: "Consumer Pain", value: 82 },
      { label: "Market Gap", value: 79 },
      { label: "Competition", value: 71 },
      { label: "Signal Diversity", value: 91 },
    ],
    cities: ["Ahmedabad", "Mumbai", "Bengaluru", "Delhi", "Pune", "Surat"],
  },
  {
    id: "protein-snacks-indian-taste",
    title: "Protein Snacks Designed Around Indian Taste Preferences",
    category: "Food & Beverage",
    description:
      "Demand is rising for protein bars and snacks that embrace Indian flavors like masala, chatpata, and traditional mithai profiles rather than copying Western flavor profiles.",
    score: 87,
    audience: "Gym-going young professionals, 22-34, Tier-2 cities",
    signalType: "Search demand",
    city: "Ahmedabad",
    priceRange: "₹30 – ₹150",
    growthStage: "Accelerating",
    whyItMatters:
      "Protein-fortified snacking is moving from a metro fitness niche into everyday Tier-2 grocery baskets, but most products still taste Western, leaving a massive gap for culturally aligned formats.",
    targetConsumer:
      "Working professionals aged 22-34 in Tier-2 cities who train regularly but find imported protein snacks alien in taste and too expensive for daily consumption.",
    evidenceSummary:
      "Search volume for 'protein snacks Indian flavour' has grown steadily, paired with recurring complaints on taste profiles of existing products.",
    evidence: [
      { source: "Google Trends", note: "'protein snacks under 50 rupees' up 64% over 6 months", volume: "High" },
      { source: "Reddit", note: "r/IndianFitness threads asking for desi-flavoured protein alternatives", volume: "Medium" },
      { source: "Reviews", note: "Common complaint: 'good protein but tastes like cardboard'", volume: "High" },
      { source: "YouTube", note: "Fitness creators comparing cost-per-gram of protein across brands", volume: "Medium" },
    ],
    signalBreakdown: [
      { label: "Search intent", value: 82 },
      { label: "Price sensitivity signal", value: 91 },
      { label: "Repeat purchase intent", value: 74 },
      { label: "Regional spread", value: 68 },
    ],
    competition:
      "Dominated by premium D2C brands with Western flavour profiles; limited regional players addressing Indian taste at accessible price points.",
    competitors: [
      { name: "Yoga Bar", position: "Premium protein bars", priceRange: "₹80-150/unit", strength: "Strong brand", complaint: "Western flavours, expensive" },
      { name: "The Whole Truth", position: "Clean-label bars", priceRange: "₹100-180/unit", strength: "Transparency", complaint: "Limited Indian flavours" },
      { name: "RiteBite Max", position: "Sports nutrition bars", priceRange: "₹50-120/unit", strength: "Mass distribution", complaint: "Artificial taste" },
      { name: "Local namkeen makers", position: "Traditional snacks", priceRange: "₹20-50/unit", strength: "Familiar taste", complaint: "No protein focus" },
    ],
    risks: [
      "Margin pressure at lower price points without scale",
      "Taste and texture trade-offs at reduced cost",
      "Cold-chain-free distribution needed for Tier-2 reach",
    ],
    nextExperiment:
      "Run a limited SKU test in Ahmedabad and Surat kirana stores at ₹40 price point with masala and chatpata variants, tracking repeat purchase within 30 days.",
    trend: [22, 28, 31, 40, 46, 55, 63, 71],
    momentum: "+42%",
    evidenceCount: 143,
    consumerSegment: "Fitness-conscious Tier-2 youth",
    regions: "Tier 2 cities (Ahmedabad, Surat, Jaipur)",
    potentialGap: "No credible protein snack brand has cracked Indian taste profiles at accessible pricing.",
    unmetNeeds: ["Indian flavour profiles", "Affordable daily-use pricing", "Credible protein content", "Available in kirana stores"],
    potentialOpportunity: "A protein snack brand built from the ground up around Indian taste — think protein-packed mathri, sattu bars, or masala protein puffs — distributed through kirana networks.",
    consumerTension: "Fitness-conscious consumers want protein snacks but feel alienated by Western-tasting, overpriced options that don't fit their palate or budget.",
    consumerQuotes: [
      "I want my protein snack to taste like something my mom would approve of.",
      "Why do all protein bars taste like chocolate? I want chatpata!",
      "At ₹150 per bar, I'd rather eat paneer for protein.",
      "None of these brands understand that I want namkeen, not a candy bar.",
    ],
    scoreBreakdown: [
      { label: "Demand Momentum", value: 92 },
      { label: "Consumer Pain", value: 85 },
      { label: "Market Gap", value: 88 },
      { label: "Competition", value: 78 },
      { label: "Signal Diversity", value: 86 },
    ],
    cities: ["Ahmedabad", "Surat", "Jaipur", "Indore", "Lucknow"],
  },
  {
    id: "premium-beauty-tier2",
    title: "Premium Beauty for Tier-2 Affluent Consumers",
    category: "Beauty & Personal Care",
    description:
      "Affluent consumers in Tier-2 cities are research-led and increasingly willing to pay premium prices for skincare, but lack access to the same product range and expertise available in metros.",
    score: 91,
    audience: "Affluent women, 24-38, Tier-2 cities",
    signalType: "Review complaints",
    city: "Mumbai",
    priceRange: "₹500 – ₹2,500",
    growthStage: "Accelerating",
    whyItMatters:
      "The premium beauty market has long been metro-centric, but rising incomes and digital exposure in Tier-2 cities are creating a new, underserved consumer segment with willingness to pay but limited access.",
    targetConsumer:
      "Women aged 24-38 in Tier-2 cities who follow beauty content from metro influencers, research ingredients extensively, but can't easily access premium brands locally.",
    evidenceSummary:
      "Cross-referenced spikes in dermatology-adjacent search terms from Tier-2 locations with recurring negative reviews citing availability and guidance gaps.",
    evidence: [
      { source: "Google Trends", note: "'best serum for Indian skin' searches from Tier-2 cities up 58% YoY", volume: "High" },
      { source: "Reddit", note: "r/SkincareAddictsIndia threads from Tier-2 users asking about product access", volume: "High" },
      { source: "Reviews", note: "Repeated mentions of delivery delays and limited shade ranges for Tier-2 areas", volume: "High" },
      { source: "News", note: "Industry press coverage on Tier-2 beauty market potential", volume: "Low" },
    ],
    signalBreakdown: [
      { label: "Complaint density", value: 88 },
      { label: "Unmet formulation need", value: 85 },
      { label: "Willingness to pay", value: 82 },
      { label: "Community engagement", value: 79 },
    ],
    competition:
      "Minimalist and Foxtale cover general skincare; few brands explicitly serve Tier-2 with premium positioning plus local accessibility.",
    competitors: [
      { name: "Minimalist", position: "Ingredient-led affordable skincare", priceRange: "₹300-800", strength: "Science-backed positioning", complaint: "Limited offline presence in Tier-2" },
      { name: "Foxtale", position: "Clinical skincare", priceRange: "₹400-1,200", strength: "Efficacy claims", complaint: "Shade matching difficult without in-person trial" },
      { name: "Dot & Key", position: "Trendy skincare", priceRange: "₹300-900", strength: "Instagram appeal", complaint: "Efficacy questioned" },
      { name: "Nykaa Private Label", position: "Platform-backed beauty", priceRange: "₹200-800", strength: "Distribution", complaint: "Generic formulations" },
    ],
    risks: [
      "Last-mile delivery cost in Tier-2 is higher",
      "Efficacy proof needed to earn trust in a skeptical category",
      "Crowded influencer marketing landscape raises CAC",
    ],
    nextExperiment:
      "Launch a curated 5-SKU starter kit with virtual skin consultation for Tier-2 consumers and track conversion and repeat rates over 90 days.",
    trend: [30, 34, 41, 47, 53, 62, 74, 85],
    momentum: "+31%",
    evidenceCount: 156,
    consumerSegment: "Affluent Tier-2 women",
    regions: "Tier 2 cities (Ahmedabad, Surat, Jaipur, Lucknow, Indore)",
    potentialGap: "High willingness to pay but limited local access, guidance, and shade matching for premium skincare in Tier-2.",
    unmetNeeds: ["Local access to premium products", "Virtual/remote skin consultation", "Shade matching without in-person stores", "Curated routines vs overwhelming choice"],
    potentialOpportunity: "A premium skincare brand or platform designed for Tier-2 distribution — combining virtual consultation, curated starter kits, and reliable delivery.",
    consumerTension: "Tier-2 consumers are as beauty-savvy as metro consumers thanks to social media, but feel like second-class citizens when it comes to product access and expert guidance.",
    consumerQuotes: [
      "I watch the same beauty YouTubers as anyone in Mumbai but half the products aren't available here.",
      "I ordered a serum that took 12 days to arrive. By then I'd lost interest.",
      "I want expert advice but there's no dermatologist in my area who knows these brands.",
      "Just because I live in a smaller city doesn't mean I want cheaper products.",
    ],
    scoreBreakdown: [
      { label: "Demand Momentum", value: 86 },
      { label: "Consumer Pain", value: 91 },
      { label: "Market Gap", value: 88 },
      { label: "Competition", value: 82 },
      { label: "Signal Diversity", value: 90 },
    ],
    cities: ["Ahmedabad", "Surat", "Jaipur", "Lucknow", "Indore", "Chandigarh"],
  },
  {
    id: "healthy-indian-breakfast",
    title: "Convenient Healthy Indian Breakfast",
    category: "Health & Wellness",
    description:
      "Time-starved professionals want breakfast that combines convenience with genuine health benefits — but in familiar Indian formats like poha, upma, or idli rather than Western cereal.",
    score: 78,
    audience: "Working professionals, 25-40, metro and Tier-1 cities",
    signalType: "Search demand",
    city: "Bengaluru",
    priceRange: "₹50 – ₹200",
    growthStage: "Emerging",
    whyItMatters:
      "Morning routines are compressing, and consumers increasingly want breakfast that multitasks as a functional health product — but in culturally familiar formats, not imported cereal boxes.",
    targetConsumer:
      "Working professionals aged 25-40 in metro cities who skip or rush breakfast and are open to healthy, on-the-go Indian formats.",
    evidenceSummary:
      "Rising search interest in 'healthy Indian breakfast ready to eat' correlates with growing YouTube content around functional breakfast hacks.",
    evidence: [
      { source: "Google Trends", note: "'healthy instant poha' and '5 minute Indian breakfast' searches up 45%", volume: "Medium" },
      { source: "YouTube", note: "Office breakfast hack videos with Indian recipes gaining consistent views", volume: "Medium" },
      { source: "Social chatter", note: "Instagram reels around healthy dosa batter and instant upma gaining traction", volume: "High" },
    ],
    signalBreakdown: [
      { label: "Convenience demand", value: 80 },
      { label: "Functional benefit interest", value: 72 },
      { label: "Category switching intent", value: 61 },
      { label: "Price elasticity", value: 65 },
    ],
    competition:
      "ID Fresh and MTR lead ready-to-eat Indian breakfast; gap remains in protein-fortified, health-forward versions.",
    competitors: [
      { name: "ID Fresh", position: "Fresh Indian breakfast", priceRange: "₹30-100", strength: "Fresh format, wide distribution", complaint: "Short shelf life" },
      { name: "MTR", position: "Ready-to-eat meals", priceRange: "₹40-120", strength: "Trust, heritage", complaint: "Feels processed" },
      { name: "True Elements", position: "Health-first breakfast", priceRange: "₹150-400", strength: "Health positioning", complaint: "Not Indian enough" },
      { name: "Yoga Bar", position: "Muesli & cereal", priceRange: "₹250-500", strength: "Brand", complaint: "Too Western" },
    ],
    risks: [
      "Shelf life constraints for fresh functional ingredients",
      "Education needed on functional benefit claims",
      "Habit formation is slow in breakfast category",
    ],
    nextExperiment:
      "Pilot a protein-fortified instant poha and upma kit in Bengaluru with three functional variants.",
    trend: [18, 21, 25, 29, 33, 38, 44, 49],
    momentum: "+28%",
    evidenceCount: 89,
    consumerSegment: "Metro working professionals",
    regions: "Metro + Tier 1 cities",
    potentialGap: "No brand owns 'healthy + Indian + instant' in the breakfast space.",
    unmetNeeds: ["Indian-format healthy breakfast", "Sub-5-minute preparation", "Functional nutrition (protein, fiber)", "Affordable daily pricing"],
    potentialOpportunity: "Protein-fortified, fiber-rich instant Indian breakfast formats — poha, upma, chilla — in single-serve packets with sub-5-minute prep.",
    consumerTension: "Professionals skip breakfast because nothing available is simultaneously quick, healthy, affordable, AND feels like real Indian food.",
    consumerQuotes: [
      "Oats for breakfast every day? I'd rather skip than eat that again.",
      "I want something healthy but my body wants poha, not granola.",
      "5 minutes is all I have. But I refuse to eat another protein bar for breakfast.",
    ],
    scoreBreakdown: [
      { label: "Demand Momentum", value: 76 },
      { label: "Consumer Pain", value: 80 },
      { label: "Market Gap", value: 82 },
      { label: "Competition", value: 68 },
      { label: "Signal Diversity", value: 72 },
    ],
    cities: ["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad"],
  },
  {
    id: "specialized-personal-care",
    title: "Specialized Personal Care for Specific Consumer Needs",
    category: "Beauty & Personal Care",
    description:
      "Consumers dealing with specific concerns — oily scalp in humid climates, post-acne hyperpigmentation, body odor in tropical heat — want targeted solutions, not generic products.",
    score: 81,
    audience: "Students and young professionals, 18-30, coastal cities",
    signalType: "Review complaints",
    city: "Surat",
    priceRange: "₹150 – ₹800",
    growthStage: "Accelerating",
    whyItMatters:
      "Personal care is fragmenting from broad categories into specific, climate-aware and skin-tone-aware niches. Consumers are increasingly rejecting one-size-fits-all products.",
    targetConsumer:
      "Students and early-career professionals aged 18-30 in humid coastal cities dealing with climate-specific personal care challenges.",
    evidenceSummary:
      "Repeated review complaints about generic products being 'too drying' or 'not suitable for my skin type' point to a gap for specialized, condition-specific alternatives.",
    evidence: [
      { source: "Reviews", note: "'Works but too harsh for daily use' is a top complaint theme across scalp care", volume: "High" },
      { source: "Reddit", note: "r/IndianSkincareAddicts discussing scalp care and body care routines", volume: "Medium" },
      { source: "Google Trends", note: "'anti hairfall shampoo for humid weather' and similar searches rising steadily", volume: "Medium" },
    ],
    signalBreakdown: [
      { label: "Complaint frequency", value: 84 },
      { label: "Price sensitivity", value: 88 },
      { label: "Repeat use intent", value: 70 },
      { label: "Regional concentration", value: 66 },
    ],
    competition:
      "Mamaearth and WOW lead affordable natural positioning; gap for climate-specific, dermat-style formulations at mass pricing.",
    competitors: [
      { name: "Mamaearth", position: "Natural personal care", priceRange: "₹200-600", strength: "Trust, distribution", complaint: "Generic formulations" },
      { name: "WOW Skin Science", position: "Natural premium", priceRange: "₹300-800", strength: "Premium feel", complaint: "Not climate-specific" },
      { name: "Cetaphil", position: "Dermatologist-recommended", priceRange: "₹400-1000", strength: "Clinical trust", complaint: "Expensive, not India-specific" },
    ],
    risks: [
      "Natural ingredient claims require substantiation",
      "Highly fragmented, low-loyalty category",
      "Retail shelf space dominated by legacy FMCG brands",
    ],
    nextExperiment:
      "Test a single climate-specific scalp care SKU in Surat and Kochi general trade stores with in-store sampling.",
    trend: [20, 24, 27, 33, 38, 45, 52, 58],
    momentum: "+24%",
    evidenceCount: 112,
    consumerSegment: "Climate-affected youth",
    regions: "Coastal and humid cities",
    potentialGap: "No brand positions itself as 'personal care designed for Indian climate and skin conditions.'",
    unmetNeeds: ["Climate-specific formulations", "Affordable dermat-quality", "Condition-specific products", "Suitable for Indian skin tones"],
    potentialOpportunity: "A personal care brand that formulates specifically for Indian climate conditions — humidity-resistant, melanin-aware, and tropically tested.",
    consumerTension: "Consumers in humid Indian cities feel that global skincare brands don't understand their specific climate and skin challenges.",
    consumerQuotes: [
      "Every 'universal' shampoo makes my scalp worse in Mumbai's humidity.",
      "I need something that works for MY skin in THIS climate, not a product tested in Europe.",
      "Dark marks are my biggest concern but every product is designed for lighter skin tones.",
    ],
    scoreBreakdown: [
      { label: "Demand Momentum", value: 78 },
      { label: "Consumer Pain", value: 86 },
      { label: "Market Gap", value: 80 },
      { label: "Competition", value: 74 },
      { label: "Signal Diversity", value: 82 },
    ],
    cities: ["Surat", "Mumbai", "Kochi", "Chennai", "Ahmedabad"],
  },
  {
    id: "premium-accessible-entry-packs",
    title: "Premium Products with Accessible Entry Packs",
    category: "Food & Beverage",
    description:
      "Consumers want to try premium products but are hesitant at full price. Brands offering accessible entry packs — sachets, trial sizes, starter kits — see significantly higher trial and conversion rates.",
    score: 83,
    audience: "Dual-income households, 28-45, metro and Tier-2 cities",
    signalType: "Community discussion",
    city: "Pune",
    priceRange: "₹30 – ₹150 (entry packs)",
    growthStage: "Emerging",
    whyItMatters:
      "Premiumization is a major trend across Indian consumer categories, but the gap between aspiration and trial is real. Sachet and entry-pack strategies reduce risk and accelerate trial.",
    targetConsumer:
      "Aspirational consumers across income levels who want to try premium but need a low-risk entry point.",
    evidenceSummary:
      "Community discussion consistently highlights price as the barrier to trial, with consumers explicitly requesting smaller pack sizes of premium products.",
    evidence: [
      { source: "Social chatter", note: "Consumer groups asking 'why don't they sell a small version to try first?'", volume: "High" },
      { source: "Reviews", note: "'Love the product but the full-size price is too risky for first purchase'", volume: "Medium" },
      { source: "YouTube", note: "Creator unboxing and trial-size content driving interest", volume: "Medium" },
      { source: "Research Reports", note: "BCG research highlights sachet strategy as key to premiumization in India", volume: "Low" },
    ],
    signalBreakdown: [
      { label: "Trust gap", value: 79 },
      { label: "Convenience demand", value: 85 },
      { label: "Health positioning interest", value: 76 },
      { label: "Price acceptance", value: 68 },
    ],
    competition:
      "Few premium brands have deliberately designed their entry strategy around accessible trial formats for Indian consumers.",
    competitors: [
      { name: "ITC Fabelle", position: "Premium chocolate", priceRange: "₹150-500", strength: "Brand prestige", complaint: "No affordable trial size" },
      { name: "Sleepy Owl", position: "Premium cold brew", priceRange: "₹80-300", strength: "Lifestyle brand", complaint: "Sachet would help trial" },
      { name: "Blue Tokai", position: "Specialty coffee", priceRange: "₹300-800", strength: "Quality", complaint: "Entry price too high" },
    ],
    risks: [
      "Margin dilution from small pack sizes",
      "Cannibalizing full-size sales",
      "Perception of cheapening the brand",
    ],
    nextExperiment:
      "Launch ₹49 trial packs of 3 premium food products in Pune with clear upsell path to full-size, tracking conversion rate over 6 weeks.",
    trend: [16, 19, 23, 28, 34, 39, 45, 50],
    momentum: "+22%",
    evidenceCount: 98,
    consumerSegment: "Aspirational cross-income consumers",
    regions: "Metro + Tier 2",
    potentialGap: "Premiumization intent is high but trial barriers remain. Few brands have a deliberate entry-pack strategy.",
    unmetNeeds: ["Low-risk trial at affordable price", "Clear upgrade path", "Same quality as full-size", "Easy local availability"],
    potentialOpportunity: "A platform or strategy that helps premium brands create ₹30-100 entry packs with built-in upgrade mechanics.",
    consumerTension: "Consumers aspire to premium products but the full-size price feels too risky for a first purchase, especially in unfamiliar categories.",
    consumerQuotes: [
      "I want to try it but what if I don't like it? ₹800 wasted.",
      "If they had a ₹50 trial size I would have bought it immediately.",
      "I always buy the smallest pack first to test. Why don't more brands offer this?",
    ],
    scoreBreakdown: [
      { label: "Demand Momentum", value: 80 },
      { label: "Consumer Pain", value: 78 },
      { label: "Market Gap", value: 85 },
      { label: "Competition", value: 76 },
      { label: "Signal Diversity", value: 83 },
    ],
    cities: ["Pune", "Mumbai", "Delhi", "Bengaluru", "Ahmedabad"],
  },
]

export interface Category {
  id: string
  name: string
  trend: "up" | "flat" | "down"
  activeOpportunities: number
  painPoint: string
  signalMomentum: string
  avgScore: number
  fastestSubcategory: string
  topCity: string
  themes: string[]
  topCities: string[]
}

export const categories: Category[] = [
  {
    id: "food-beverage",
    name: "Food & Beverage",
    trend: "up",
    activeOpportunities: 14,
    painPoint: "Consumers distrust preservative-heavy convenience food",
    signalMomentum: "+32%",
    avgScore: 81,
    fastestSubcategory: "Protein Snacks",
    topCity: "Ahmedabad",
    themes: ["Affordable functional nutrition", "Indian-flavour protein snacks", "Premium accessible entry packs", "Clean-label ready meals"],
    topCities: ["Ahmedabad", "Mumbai", "Pune", "Delhi", "Bengaluru"],
  },
  {
    id: "beauty-personal-care",
    name: "Beauty & Personal Care",
    trend: "up",
    activeOpportunities: 19,
    painPoint: "Global formulations don't suit Indian skin and humidity",
    signalMomentum: "+28%",
    avgScore: 84,
    fastestSubcategory: "Clinical Skincare",
    topCity: "Mumbai",
    themes: ["Efficacy-led skincare", "Scalp care", "Accessible premium beauty", "Personalized routines"],
    topCities: ["Mumbai", "Bengaluru", "Delhi", "Ahmedabad", "Pune"],
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    trend: "up",
    activeOpportunities: 11,
    painPoint: "Functional benefits are hard to fit into rushed routines",
    signalMomentum: "+24%",
    avgScore: 76,
    fastestSubcategory: "Functional Breakfast",
    topCity: "Bengaluru",
    themes: ["Convenient healthy breakfast", "Gut health solutions", "Sleep and stress management", "Preventive wellness"],
    topCities: ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Pune"],
  },
  {
    id: "fitness-nutrition",
    name: "Fitness & Nutrition",
    trend: "up",
    activeOpportunities: 12,
    painPoint: "Imported supplements are priced out of daily use",
    signalMomentum: "+34%",
    avgScore: 79,
    fastestSubcategory: "Affordable Protein",
    topCity: "Delhi",
    themes: ["Budget supplements", "Plant-based protein", "Performance nutrition", "Recovery products"],
    topCities: ["Delhi", "Mumbai", "Bengaluru", "Ahmedabad", "Pune"],
  },
  {
    id: "fashion-lifestyle",
    name: "Fashion & Lifestyle",
    trend: "flat",
    activeOpportunities: 8,
    painPoint: "Sizing inconsistency drives high return rates",
    signalMomentum: "+8%",
    avgScore: 68,
    fastestSubcategory: "Sustainable Fashion",
    topCity: "Delhi",
    themes: ["Sustainable fashion", "Size-inclusive design", "Workwear for Indian climate", "Regional fashion"],
    topCities: ["Delhi", "Mumbai", "Bengaluru", "Jaipur", "Ahmedabad"],
  },
  {
    id: "home-living",
    name: "Home & Living",
    trend: "up",
    activeOpportunities: 6,
    painPoint: "Compact-home buyers want multi-use, space-saving products",
    signalMomentum: "+18%",
    avgScore: 72,
    fastestSubcategory: "Space-Saving Furniture",
    topCity: "Mumbai",
    themes: ["Compact living solutions", "Air quality improvement", "Smart home basics", "Sustainable home products"],
    topCities: ["Mumbai", "Bengaluru", "Pune", "Delhi", "Hyderabad"],
  },
  {
    id: "pet-care",
    name: "Pet Care",
    trend: "up",
    activeOpportunities: 7,
    painPoint: "Premium nutrition is hard to access outside metros",
    signalMomentum: "+26%",
    avgScore: 74,
    fastestSubcategory: "Tier-2 Pet Nutrition",
    topCity: "Jaipur",
    themes: ["Premium pet nutrition for Tier-2", "Pet wellness services", "Pet grooming products", "Pet insurance"],
    topCities: ["Jaipur", "Pune", "Bengaluru", "Mumbai", "Ahmedabad"],
  },
  {
    id: "baby-family",
    name: "Baby & Family",
    trend: "flat",
    activeOpportunities: 5,
    painPoint: "Parents want fewer, more trustworthy product claims",
    signalMomentum: "+12%",
    avgScore: 71,
    fastestSubcategory: "Clean Baby Food",
    topCity: "Bengaluru",
    themes: ["Clean-label baby food", "Postpartum wellness", "Child nutrition", "Family health packs"],
    topCities: ["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad"],
  },
]

export interface City {
  id: string
  name: string
  interestLevel: "Very high" | "High" | "Moderate"
  activeCategories: number
  risingSignals: number
  tier: "Tier-1" | "Tier-2"
  signalVolume: number
  momentum: string
  topCategory: string
  opportunityCount: number
  emergingNeeds: string[]
  consumerBehavior: string
  topOpportunities: string[]
}

export const cities: City[] = [
  { id: "mumbai", name: "Mumbai", interestLevel: "Very high", activeCategories: 8, risingSignals: 34, tier: "Tier-1", signalVolume: 2840, momentum: "+28%", topCategory: "Beauty & Personal Care", opportunityCount: 18, emergingNeeds: ["Premium skincare", "Healthy ready meals", "Compact living"], consumerBehavior: "Research-heavy, brand-conscious, willing to pay premium", topOpportunities: ["Premium Beauty", "Healthy Ready Meals", "Space-saving Home"] },
  { id: "delhi", name: "Delhi", interestLevel: "Very high", activeCategories: 8, risingSignals: 31, tier: "Tier-1", signalVolume: 2620, momentum: "+25%", topCategory: "Fashion & Lifestyle", opportunityCount: 16, emergingNeeds: ["Air quality products", "Fitness nutrition", "Sustainable fashion"], consumerBehavior: "Trend-following, price-aware, brand-loyal", topOpportunities: ["Fitness Nutrition", "Sustainable Fashion", "Air Quality"] },
  { id: "bengaluru", name: "Bengaluru", interestLevel: "Very high", activeCategories: 7, risingSignals: 29, tier: "Tier-1", signalVolume: 2380, momentum: "+31%", topCategory: "Health & Wellness", opportunityCount: 15, emergingNeeds: ["Functional breakfast", "Wellness tech", "Pet care"], consumerBehavior: "Tech-savvy, health-conscious, early adopter", topOpportunities: ["Healthy Breakfast", "Wellness Tech", "Premium Pet Care"] },
  { id: "hyderabad", name: "Hyderabad", interestLevel: "High", activeCategories: 6, risingSignals: 23, tier: "Tier-1", signalVolume: 1940, momentum: "+22%", topCategory: "Food & Beverage", opportunityCount: 12, emergingNeeds: ["Regional food innovation", "Beauty for Indian skin", "Home wellness"], consumerBehavior: "Value-conscious, quality-seeking, regional pride", topOpportunities: ["Regional Food", "Skincare", "Home Wellness"] },
  { id: "pune", name: "Pune", interestLevel: "High", activeCategories: 6, risingSignals: 24, tier: "Tier-1", signalVolume: 2010, momentum: "+26%", topCategory: "Food & Beverage", opportunityCount: 14, emergingNeeds: ["Clean-label food", "Fitness products", "Pet wellness"], consumerBehavior: "Health-focused, student influence, experimental", topOpportunities: ["Clean-label Food", "Fitness", "Pet Wellness"] },
  { id: "ahmedabad", name: "Ahmedabad", interestLevel: "High", activeCategories: 6, risingSignals: 22, tier: "Tier-2", signalVolume: 1840, momentum: "+23%", topCategory: "Food & Beverage", opportunityCount: 14, emergingNeeds: ["Affordable protein", "Premium beauty access", "Functional nutrition"], consumerBehavior: "Value-seeking, entrepreneurial, brand-curious", topOpportunities: ["Protein Snacks", "Premium Beauty", "Functional Nutrition"] },
  { id: "surat", name: "Surat", interestLevel: "High", activeCategories: 5, risingSignals: 20, tier: "Tier-2", signalVolume: 1680, momentum: "+27%", topCategory: "Beauty & Personal Care", opportunityCount: 11, emergingNeeds: ["Scalp care for humidity", "Affordable beauty", "Fitness nutrition"], consumerBehavior: "Aspirational, youth-driven, digitally engaged", topOpportunities: ["Scalp Care", "Beauty Access", "Protein Snacks"] },
  { id: "jaipur", name: "Jaipur", interestLevel: "Moderate", activeCategories: 5, risingSignals: 17, tier: "Tier-2", signalVolume: 1420, momentum: "+19%", topCategory: "Pet Care", opportunityCount: 9, emergingNeeds: ["Premium pet nutrition", "Heritage beauty products", "Health foods"], consumerBehavior: "Traditional with modern aspirations, growing digital adoption", topOpportunities: ["Pet Nutrition", "Heritage Beauty", "Health Foods"] },
  { id: "lucknow", name: "Lucknow", interestLevel: "Moderate", activeCategories: 4, risingSignals: 14, tier: "Tier-2", signalVolume: 1180, momentum: "+16%", topCategory: "Food & Beverage", opportunityCount: 7, emergingNeeds: ["Regional food innovation", "Personal care", "Baby products"], consumerBehavior: "Culturally rooted, growing metro-aspiration", topOpportunities: ["Regional Food", "Personal Care", "Baby Products"] },
  { id: "indore", name: "Indore", interestLevel: "Moderate", activeCategories: 4, risingSignals: 13, tier: "Tier-2", signalVolume: 1090, momentum: "+18%", topCategory: "Food & Beverage", opportunityCount: 6, emergingNeeds: ["Street food innovation", "Fitness products", "Skincare"], consumerBehavior: "Food-focused, experimental, value-conscious", topOpportunities: ["Street Food", "Fitness", "Skincare"] },
  { id: "chandigarh", name: "Chandigarh", interestLevel: "Moderate", activeCategories: 4, risingSignals: 12, tier: "Tier-2", signalVolume: 1010, momentum: "+15%", topCategory: "Fitness & Nutrition", opportunityCount: 5, emergingNeeds: ["Fitness nutrition", "Premium grooming", "Wellness products"], consumerBehavior: "Fitness-conscious, quality-seeking, brand-aware", topOpportunities: ["Fitness Nutrition", "Premium Grooming", "Wellness"] },
  { id: "kochi", name: "Kochi", interestLevel: "Moderate", activeCategories: 4, risingSignals: 11, tier: "Tier-2", signalVolume: 920, momentum: "+14%", topCategory: "Health & Wellness", opportunityCount: 5, emergingNeeds: ["Ayurvedic wellness", "Scalp and hair care", "Organic food"], consumerBehavior: "Health-aware, Ayurveda-inclined, quality-focused", topOpportunities: ["Ayurvedic Wellness", "Hair Care", "Organic Food"] },
]

export interface EvidenceSource {
  id: string
  name: string
  contributes: string
  example: string
  volume: "Low" | "Medium" | "High"
  freshness: string
  coverage: string
  reliability: string
  signalContribution: string
}

export const evidenceSources: EvidenceSource[] = [
  {
    id: "google-trends",
    name: "Google Trends",
    contributes: "Surfaces rising and declining search intent for products, ingredients, and problems at scale.",
    example: "'protein snacks under 50 rupees' search volume up 64% over 6 months",
    volume: "High",
    freshness: "Updated daily",
    coverage: "Pan-India with city-level breakdown",
    reliability: "High — direct consumer intent",
    signalContribution: "32%",
  },
  {
    id: "reddit",
    name: "Reddit",
    contributes: "Captures unfiltered consumer discussion, comparisons, and requests for recommendations.",
    example: "r/IndianFitness thread requesting budget alternatives to imported protein bars",
    volume: "Medium",
    freshness: "Updated hourly",
    coverage: "Urban, English-speaking, digitally native",
    reliability: "Medium — self-selecting audience",
    signalContribution: "18%",
  },
  {
    id: "youtube",
    name: "YouTube",
    contributes: "Reveals how creators and comments frame product comparisons and category education.",
    example: "Fitness creator comparing cost-per-gram of protein across 8 Indian brands",
    volume: "Medium",
    freshness: "Updated daily",
    coverage: "Pan-India, multi-language",
    reliability: "Medium — creator-influenced",
    signalContribution: "15%",
  },
  {
    id: "reviews",
    name: "Consumer Reviews",
    contributes: "Surfaces recurring complaint clusters around price, taste, packaging, and usability.",
    example: "'Good protein but too pricey for daily use' appears across 40+ product reviews",
    volume: "High",
    freshness: "Updated daily",
    coverage: "Product-level, post-purchase",
    reliability: "High — purchase-verified",
    signalContribution: "22%",
  },
  {
    id: "news",
    name: "News",
    contributes: "Adds macro context such as category growth, regulation, and regional adoption trends.",
    example: "Regional press coverage of rising pet adoption in Tier-2 cities",
    volume: "Low",
    freshness: "Updated weekly",
    coverage: "National and regional publications",
    reliability: "High — editorial oversight",
    signalContribution: "5%",
  },
  {
    id: "social-chatter",
    name: "Public Web",
    contributes: "Tracks organic conversation volume and sentiment across Instagram, Facebook, X, and forums.",
    example: "Working-parent Facebook groups discussing healthy dinner shortcuts",
    volume: "High",
    freshness: "Updated hourly",
    coverage: "Social platforms, broad demographic",
    reliability: "Medium — noise-heavy",
    signalContribution: "6%",
  },
  {
    id: "research-reports",
    name: "Research Reports",
    contributes: "Provides structured market intelligence, consumer segmentation, and trend analysis from reputed research firms.",
    example: "BCG 2026 report on connected commerce growth and AI-assisted consumer journeys in India",
    volume: "Low",
    freshness: "Updated quarterly",
    coverage: "Category-level, macro trends",
    reliability: "Very High — professional research",
    signalContribution: "2%",
  },
]

export interface SavedInsight {
  id: string
  opportunityId: string
  note: string
  tags: string[]
  status: "Watchlist" | "Researching" | "Validated" | "Rejected"
  savedAt: string
  type: "opportunity" | "signal" | "brief"
}

export const savedInsights: SavedInsight[] = [
  {
    id: "s1",
    opportunityId: "premium-beauty-tier2",
    note: "Strong complaint density and clear formulation gap. Worth a founder call this quarter.",
    tags: ["skincare", "high-score", "tier-2"],
    status: "Researching",
    savedAt: "2 days ago",
    type: "opportunity",
  },
  {
    id: "s2",
    opportunityId: "protein-snacks-indian-taste",
    note: "Margin question needs resolving before we commit — flagging for the ops team to review unit economics.",
    tags: ["food", "price-sensitive"],
    status: "Watchlist",
    savedAt: "4 days ago",
    type: "opportunity",
  },
  {
    id: "s3",
    opportunityId: "healthy-indian-breakfast",
    note: "Keep an eye on functional breakfast data next quarter before moving forward.",
    tags: ["health", "breakfast"],
    status: "Watchlist",
    savedAt: "1 week ago",
    type: "opportunity",
  },
  {
    id: "s4",
    opportunityId: "affordable-functional-nutrition",
    note: "Trust gap around pricing is the real opportunity. Move this into deeper consumer research.",
    tags: ["food", "functional"],
    status: "Researching",
    savedAt: "1 week ago",
    type: "opportunity",
  },
  {
    id: "s5",
    opportunityId: "protein-snacks-indian-taste",
    note: "Research brief generated for protein snacks — Indian taste preferences.",
    tags: ["food", "research-brief"],
    status: "Researching",
    savedAt: "3 days ago",
    type: "brief",
  },
  {
    id: "s6",
    opportunityId: "premium-beauty-tier2",
    note: "Signal: Tier-2 beauty searches increased 31% — cross-reference with access gap data.",
    tags: ["beauty", "signal"],
    status: "Watchlist",
    savedAt: "5 days ago",
    type: "signal",
  },
]

export const weeklySignals = [
  { label: "Affordable Functional Nutrition", change: "+42%", category: "Food & Beverage", sources: "Reddit · Search · Reviews", description: "Growing demand for daily-use nutrition products at accessible price points." },
  { label: "Premium Beauty in Tier-2 Cities", change: "+31%", category: "Beauty & Personal Care", sources: "Search · YouTube · Reviews", description: "Affluent Tier-2 consumers seeking premium skincare with better local access." },
  { label: "Indian-Flavour Protein Snacks", change: "+27%", category: "Food & Beverage", sources: "Reddit · YouTube · Search", description: "Protein snack demand shifting toward familiar Indian taste profiles." },
  { label: "Climate-Specific Personal Care", change: "+24%", category: "Beauty & Personal Care", sources: "Reviews · Reddit · Search", description: "Consumers in humid cities seeking formulations for their specific climate." },
  { label: "Healthy Indian Breakfast Formats", change: "+22%", category: "Health & Wellness", sources: "YouTube · Social · Search", description: "Working professionals seeking convenient but culturally familiar healthy breakfast." },
]

export const dashboardTrend = [
  { week: "W1", opportunities: 42 },
  { week: "W2", opportunities: 48 },
  { week: "W3", opportunities: 51 },
  { week: "W4", opportunities: 57 },
  { week: "W5", opportunities: 63 },
  { week: "W6", opportunities: 68 },
  { week: "W7", opportunities: 74 },
  { week: "W8", opportunities: 81 },
]

// Weekly signal chart data
export interface SignalChartPoint {
  day: string
  signals: number
  topCategory: string
  topCity: string
}

export const signalChartData: Record<string, SignalChartPoint[]> = {
  "This Week": [
    { day: "Mon", signals: 1120, topCategory: "Food & Beverage", topCity: "Mumbai" },
    { day: "Tue", signals: 1280, topCategory: "Beauty & Personal Care", topCity: "Delhi" },
    { day: "Wed", signals: 1410, topCategory: "Health & Wellness", topCity: "Bengaluru" },
    { day: "Thu", signals: 1620, topCategory: "Food & Beverage", topCity: "Ahmedabad" },
    { day: "Fri", signals: 1890, topCategory: "Beauty & Personal Care", topCity: "Mumbai" },
    { day: "Sat", signals: 2040, topCategory: "Beauty & Personal Care", topCity: "Bengaluru" },
    { day: "Sun", signals: 2180, topCategory: "Food & Beverage", topCity: "Pune" },
  ],
  "Last Week": [
    { day: "Mon", signals: 980, topCategory: "Food & Beverage", topCity: "Delhi" },
    { day: "Tue", signals: 1100, topCategory: "Health & Wellness", topCity: "Mumbai" },
    { day: "Wed", signals: 1250, topCategory: "Beauty & Personal Care", topCity: "Bengaluru" },
    { day: "Thu", signals: 1380, topCategory: "Food & Beverage", topCity: "Pune" },
    { day: "Fri", signals: 1540, topCategory: "Beauty & Personal Care", topCity: "Ahmedabad" },
    { day: "Sat", signals: 1720, topCategory: "Food & Beverage", topCity: "Mumbai" },
    { day: "Sun", signals: 1860, topCategory: "Health & Wellness", topCity: "Delhi" },
  ],
  "4 Weeks": [
    { day: "W1", signals: 6840, topCategory: "Food & Beverage", topCity: "Mumbai" },
    { day: "W2", signals: 7320, topCategory: "Beauty & Personal Care", topCity: "Delhi" },
    { day: "W3", signals: 8100, topCategory: "Health & Wellness", topCity: "Bengaluru" },
    { day: "W4", signals: 8642, topCategory: "Food & Beverage", topCity: "Ahmedabad" },
  ],
  "12 Weeks": [
    { day: "W1", signals: 4200, topCategory: "Food & Beverage", topCity: "Mumbai" },
    { day: "W2", signals: 4580, topCategory: "Beauty & Personal Care", topCity: "Delhi" },
    { day: "W3", signals: 4900, topCategory: "Health & Wellness", topCity: "Bengaluru" },
    { day: "W4", signals: 5340, topCategory: "Food & Beverage", topCity: "Pune" },
    { day: "W5", signals: 5680, topCategory: "Beauty & Personal Care", topCity: "Mumbai" },
    { day: "W6", signals: 6100, topCategory: "Food & Beverage", topCity: "Ahmedabad" },
    { day: "W7", signals: 6480, topCategory: "Health & Wellness", topCity: "Delhi" },
    { day: "W8", signals: 6840, topCategory: "Beauty & Personal Care", topCity: "Bengaluru" },
    { day: "W9", signals: 7320, topCategory: "Food & Beverage", topCity: "Mumbai" },
    { day: "W10", signals: 7800, topCategory: "Health & Wellness", topCity: "Pune" },
    { day: "W11", signals: 8100, topCategory: "Beauty & Personal Care", topCity: "Ahmedabad" },
    { day: "W12", signals: 8642, topCategory: "Food & Beverage", topCity: "Delhi" },
  ],
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  summary?: string
  insights?: string[]
  confidence?: "High" | "Medium" | "Low"
  categories?: string[]
  nextSteps?: string[]
  sources?: string[]
  opportunities?: {
    title: string
    score: number
    momentum: string
    whyInteresting: string
    gap: string
    signals: string[]
  }[]
  researchContext?: string
  whyMatters?: string[]
}

export const sampleConversation: ChatMessage[] = []

export const suggestedPrompts = [
  "What consumer needs are emerging in Indian beauty?",
  "Find food opportunities with rising demand.",
  "Which Tier-2 cities show strong consumer momentum?",
  "What are consumers complaining about in skincare?",
  "Find underserved Gen Z consumer segments.",
  "What product gaps are appearing in health & wellness?",
  "Which categories are accelerating this month?",
  "Show opportunities with low competition.",
  "Find emerging premiumization opportunities.",
  "What consumer behaviors are changing fastest?",
  "Which opportunities are growing but still under-served?",
  "Compare food vs beauty opportunity momentum.",
]

// Mock chatbot response generator
export function generateMockResponse(userMessage: string): ChatMessage {
  const lowerMsg = userMessage.toLowerCase()

  if (lowerMsg.includes("beauty") || lowerMsg.includes("skincare") || lowerMsg.includes("skin")) {
    return {
      role: "assistant",
      content: "",
      summary: "I found 3 notable opportunity areas in Indian beauty and personal care.",
      opportunities: [
        {
          title: "Accessible Clinical Skincare",
          score: 86,
          momentum: "+34%",
          whyInteresting: "Consumers are increasingly researching efficacy and ingredients before purchasing, creating demand for dermatologist-grade products at non-premium pricing.",
          gap: "High interest in clinical efficacy, but consumers remain price sensitive.",
          signals: ["Search behavior", "Consumer discussions", "Product reviews"],
        },
        {
          title: "Specialized Hair Care for Humid Climates",
          score: 81,
          momentum: "+24%",
          whyInteresting: "Oily scalp and hair fall complaints are among the most consistent grievances in coastal cities, yet effective solutions remain in premium salon pricing.",
          gap: "Climate-specific formulations barely exist at mass price points.",
          signals: ["Review complaints", "Reddit discussions", "Search trends"],
        },
        {
          title: "Premium Beauty Access for Tier-2",
          score: 91,
          momentum: "+31%",
          whyInteresting: "Affluent Tier-2 consumers follow the same beauty content as metro consumers but lack access to premium products and expert guidance.",
          gap: "Willingness to pay exists but local availability and consultation are missing.",
          signals: ["Search from Tier-2 locations", "Community discussions", "Delivery complaints"],
        },
      ],
      confidence: "High",
      categories: ["Beauty & Personal Care"],
      whyMatters: [
        "Beauty is the highest-signal category this month with 19 active opportunities.",
        "Tier-2 beauty demand is growing faster than Tier-1, representing an access-driven opportunity.",
        "Clinical skincare is moving from niche to mainstream, accelerated by social media education.",
      ],
      nextSteps: [
        "Validate willingness to pay with a focused consumer study.",
        "Review the full opportunity cards for evidence breakdown.",
        "Compare signal strength across beauty sub-categories.",
      ],
      sources: ["Google Trends", "Reddit", "Reviews", "YouTube"],
      researchContext: "BCG 2026 research highlights the increasing importance of research-led purchase journeys, where consumers investigate ingredients and reviews before purchasing beauty products.",
    }
  }

  if (lowerMsg.includes("food") || lowerMsg.includes("snack") || lowerMsg.includes("protein") || lowerMsg.includes("nutrition")) {
    return {
      role: "assistant",
      content: "",
      summary: "I found 2 strong food opportunities with rising demand signals.",
      opportunities: [
        {
          title: "Indian-Flavour Protein Snacks",
          score: 87,
          momentum: "+42%",
          whyInteresting: "Protein snacking is moving into Tier-2 cities, but consumers reject Western flavour profiles. Strong signal for masala, chatpata, and traditional formats.",
          gap: "No credible protein snack brand has cracked Indian taste at accessible pricing.",
          signals: ["Search demand", "Reddit discussions", "YouTube content"],
        },
        {
          title: "Affordable Functional Nutrition",
          score: 84,
          momentum: "+36%",
          whyInteresting: "Consumers want daily nutrition benefits embedded in familiar food formats, not as expensive supplements.",
          gap: "Strong demand but limited accessible options combining real benefits with daily-use pricing.",
          signals: ["Search trends", "Review complaints", "Social media"],
        },
      ],
      confidence: "High",
      categories: ["Food & Beverage"],
      whyMatters: [
        "Food & Beverage has 14 active opportunities and the second-highest signal momentum.",
        "Price sensitivity is the dominant signal — consumers want affordable daily-use products.",
        "Indian taste preference is a massive unaddressed gap in protein snacking.",
      ],
      nextSteps: [
        "Compare signal breakdowns for both opportunities side by side.",
        "Run a limited retail pilot in Ahmedabad to test taste-price hypothesis.",
      ],
      sources: ["Google Trends", "Reddit", "Reviews", "YouTube"],
    }
  }

  if (lowerMsg.includes("tier-2") || lowerMsg.includes("tier 2") || lowerMsg.includes("city") || lowerMsg.includes("cities") || lowerMsg.includes("gujarat") || lowerMsg.includes("ahmedabad") || lowerMsg.includes("surat")) {
    return {
      role: "assistant",
      content: "",
      summary: "Looking at Tier-2 cities specifically, the strongest consumer momentum appears in Ahmedabad and Surat.",
      insights: [
        "Ahmedabad shows +23% signal growth this month, led by Food & Beverage and Beauty categories.",
        "Surat is growing fastest among Tier-2 cities at +27%, driven primarily by beauty and personal care demand.",
        "Both cities show strong 'access gap' signals — consumers want premium products but can't easily get them locally.",
        "The entrepreneurial culture in Gujarat makes it an ideal market for pilot launches.",
      ],
      confidence: "High",
      categories: ["Food & Beverage", "Beauty & Personal Care"],
      nextSteps: [
        "Explore the Ahmedabad and Surat city profiles for detailed breakdowns.",
        "Cross-reference with category-level data to identify the strongest entry point.",
      ],
      sources: ["Google Trends", "Social chatter", "Reviews"],
    }
  }

  if (lowerMsg.includes("complain") || lowerMsg.includes("pain") || lowerMsg.includes("problem") || lowerMsg.includes("frustrat")) {
    return {
      role: "assistant",
      content: "",
      summary: "The most prominent consumer complaints cluster around three themes: price-value mismatch, formulation unsuitability, and access limitations.",
      insights: [
        "Price complaints are highest in Food & Nutrition: consumers feel functional products are too expensive for daily use.",
        "Formulation complaints dominate Beauty: global products don't suit Indian skin, climate, and pigmentation.",
        "Access complaints are growing fastest: Tier-2 consumers can't get the same product range as metro shoppers.",
        "Trust complaints appear across categories: consumers want clearer, more honest ingredient labeling.",
      ],
      confidence: "High",
      categories: ["Beauty & Personal Care", "Food & Beverage", "Health & Wellness"],
      nextSteps: [
        "Explore the Evidence page for detailed source breakdowns.",
        "Focus on complaint-to-opportunity conversion in Beauty — it has the highest signal density.",
      ],
      sources: ["Reviews", "Reddit", "Social chatter"],
    }
  }

  if (lowerMsg.includes("gen z") || lowerMsg.includes("millennial") || lowerMsg.includes("young") || lowerMsg.includes("youth")) {
    return {
      role: "assistant",
      content: "",
      summary: "Gen Z and young Millennial consumers in India show the strongest unmet demand signals across beauty, nutrition, and fitness categories.",
      insights: [
        "18-28 age group shows the highest research intensity — they investigate ingredients, reviews, and alternatives before purchasing.",
        "Affordability is the #1 barrier: this segment wants premium-quality products at accessible price points.",
        "Social media heavily influences their purchase decisions, but they're also the most skeptical of paid endorsements.",
        "They value authenticity and 'Indian-ness' — there's growing pushback against Western-branded products that don't feel culturally relevant.",
      ],
      confidence: "Medium",
      categories: ["Beauty & Personal Care", "Fitness & Nutrition", "Food & Beverage"],
      nextSteps: [
        "Review beauty opportunities targeting 18-30 age group.",
        "Cross-reference with Tier-2 data — Gen Z purchasing power is growing faster in smaller cities.",
      ],
      sources: ["Reddit", "YouTube", "Social chatter", "Google Trends"],
    }
  }

  if (lowerMsg.includes("compare") || lowerMsg.includes("vs") || lowerMsg.includes("versus")) {
    return {
      role: "assistant",
      content: "",
      summary: "Comparing the two categories you're interested in — here's how the momentum and opportunity landscape differs.",
      insights: [
        "Beauty & Personal Care has higher average scores (84 vs 81) but also more competition.",
        "Food & Beverage has faster-growing demand signals (+32% vs +28%) and larger price-sensitivity gaps.",
        "Beauty opportunities tend to be margin-rich but require education and trust-building.",
        "Food opportunities have faster trial cycles but face tighter margin constraints.",
      ],
      confidence: "Medium",
      categories: ["Food & Beverage", "Beauty & Personal Care"],
      nextSteps: [
        "View the full category comparison on the Categories page.",
        "If speed-to-market matters, Food has faster validation cycles.",
      ],
      sources: ["Google Trends", "Reviews", "Reddit"],
    }
  }

  // Default fallback response
  return {
    role: "assistant",
    content: "",
    summary:
      "Based on current signal data, the strongest matching pattern shows a rising need combining search demand growth with recurring review complaints — a pattern that typically indicates an underserved gap.",
    insights: [
      "Signal strength has increased consistently over the past 6-8 weeks.",
      "Consumer language points to price and formulation concerns rather than awareness gaps.",
      "Regional concentration suggests a focused pilot city is more efficient than a national launch.",
    ],
    confidence: "Medium",
    categories: ["Food & Beverage", "Beauty & Personal Care"],
    nextSteps: [
      "Open the closest matching opportunity card for full evidence detail.",
      "Narrow filters by city or price range to refine the shortlist.",
    ],
    sources: ["Google Trends", "Reviews", "Reddit"],
  }
}

// Notifications
export interface AppNotification {
  id: string
  message: string
  time: string
  read: boolean
  type: "signal" | "opportunity" | "digest" | "alert"
}

export const mockNotifications: AppNotification[] = [
  { id: "n1", message: "Protein snack signals increased 18% this week.", time: "2 hours ago", read: false, type: "signal" },
  { id: "n2", message: "Ahmedabad beauty signals crossed your alert threshold.", time: "5 hours ago", read: false, type: "alert" },
  { id: "n3", message: "3 new opportunities match your saved categories.", time: "1 day ago", read: false, type: "opportunity" },
  { id: "n4", message: "Your weekly India Consumer Pulse is ready.", time: "2 days ago", read: true, type: "digest" },
  { id: "n5", message: "New high-confidence opportunity detected in Health & Wellness.", time: "3 days ago", read: true, type: "opportunity" },
  { id: "n6", message: "Tier-2 pet care signals showing unusual momentum.", time: "4 days ago", read: true, type: "signal" },
]

// Conversation histories for chatbot sidebar
export interface ConversationHistory {
  id: string
  title: string
  time: string
  preview: string
}

export const conversationHistories: ConversationHistory[] = [
  { id: "c1", title: "Beauty opportunities", time: "Today", preview: "Explored emerging beauty signals..." },
  { id: "c2", title: "Protein category", time: "Yesterday", preview: "Analyzed protein snack demand..." },
  { id: "c3", title: "Tier-2 city analysis", time: "3 days ago", preview: "Compared Ahmedabad and Surat..." },
  { id: "c4", title: "Gen Z opportunities", time: "1 week ago", preview: "Found underserved Gen Z segments..." },
]

export function getOpportunityById(id: string) {
  return opportunities.find((o) => o.id === id)
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id)
}

export function getCityById(id: string) {
  return cities.find((c) => c.id === id)
}
