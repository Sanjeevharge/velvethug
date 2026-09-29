// src/data/products.js — Velvet Hug Complete Product Catalog & Taxonomy Engine
// Standardized on Velvet Hug Final Classifications:
// A. Mattress Types: Latex, Orthopedic, Memory Foam, Pocket Spring, Hybrid
// B. Price Classifications: Foundation, Signature, Reserve (and Budget)
// C. Sleeper Profile Categories: Kids (10-17 yrs Bounce), Youth (18-35 yrs Fit/Hostel Soft-MedSoft), Adult (35-50 yrs Mild/Mod Pain Med-MedFirm), Senior / Severe Back Pain (Firm), Fit for All (Med-MedFirm), For Big People (MedFirm up to 240kg), Budget
// D. Firmness Levels: Soft, Medium Soft, Medium, Medium Firm, Firm
// E. Sleeper Positions: Side, Stomach, Back, Combination
// F. Find Your Hug Quiz & Multi-Axis Filters

export const FOUNDING_PARTNER_LIMIT = 1000;

// ────────────────────────────────────────────────────────────
// TAXONOMY & CLASSIFICATION CONSTANTS
// ────────────────────────────────────────────────────────────
export const MATTRESS_TYPES = [
  'Latex',
  'Orthopedic',
  'Memory Foam',
  'Pocket Spring',
  'Hybrid'
];

export const PRICE_TIERS = [
  { id: 'foundation', name: 'Foundation', label: 'Foundation (Essential Luxury)', range: '₹15,000 – ₹30,000' },
  { id: 'signature', name: 'Signature', label: 'Signature (Flagship Anatomical)', range: '₹30,000 – ₹55,000' },
  { id: 'reserve', name: 'Reserve', label: 'Reserve (Ultra-Luxe Heritage)', range: '₹55,000+' },
  { id: 'budget', name: 'Budget', label: 'Budget (Accessible Value)', range: 'Under ₹15,000' }
];

export const SLEEPER_PROFILE_CATEGORIES = [
  { id: 'all', label: 'All Profiles', icon: '✨', desc: 'Browse full anatomical range' },
  { id: 'kids', label: 'Kids (10–17 yrs)', icon: '🎈', desc: '10 to 17 years. Bouncy active growth & spinal support.' },
  { id: 'youth', label: 'Youth (18–35 yrs)', icon: '⚡', desc: '18 to 35 years. Fit. No pain. Hostel / Young professional. Soft to Medium Soft.' },
  { id: 'adult', label: 'Adult (35–50 yrs)', icon: '🌿', desc: '35 to 50 years OR Mild to Moderate Pain. Medium to Medium Firm.' },
  { id: 'senior', label: 'Senior / Back Pain', icon: '🩺', desc: 'Senior / Severe Back Pain. High-density Orthopedic Firm.' },
  { id: 'fit-all', label: 'Fit for All', icon: '🌟', desc: 'Universal dual-comfort. Medium to Medium Firm.' },
  { id: 'big-people', label: 'For Big People (Up to 240kg)', icon: '🛡️', desc: 'Heavy-duty reinforced core. Medium Firm. Supports up to 240 kg.' },
  { id: 'budget', label: 'Budget', icon: '🏷️', desc: 'High quality sleep engineering at accessible value.' }
];

export const FIRMNESS_LEVELS = [
  { id: 'soft', name: 'Soft', score: '2-3/10', desc: 'Plush cloud sink' },
  { id: 'medium-soft', name: 'Medium Soft', score: '4/10', desc: 'Gentle contouring with light lift' },
  { id: 'medium', name: 'Medium', score: '5/10', desc: 'Balanced hug & bounce' },
  { id: 'medium-firm', name: 'Medium Firm', score: '6-7/10', desc: 'Targeted lumbar alignment & pushback' },
  { id: 'firm', name: 'Firm', score: '8-9/10', desc: 'Clinical orthopedic spine support' }
];

export const SLEEPER_POSITIONS = [
  { id: 'side', name: 'Side', desc: 'Shoulder and hip pressure relief' },
  { id: 'stomach', name: 'Stomach', desc: 'Even pelvic elevation to prevent sagging' },
  { id: 'back', name: 'Back', desc: 'Neutral cervical and lumbar alignment' },
  { id: 'combination', name: 'Combination', desc: 'Seamless active motion transition' }
];

export const CATEGORIES = {
  mattresses: {
    label: 'Mattresses',
    icon: '🛏️',
    description: 'Engineered for Indian bodies. 5 mattress types, customized for every sleeper profile.',
    subcategories: ['All', 'Latex', 'Orthopedic', 'Memory Foam', 'Pocket Spring', 'Hybrid']
  },
  pillows: {
    label: 'Pillows',
    icon: '🌙',
    description: 'The five sacred minutes before sleep start with the right cervical pillow.',
    subcategories: ['All', 'Memory Foam', 'Latex', 'Microfiber', 'Ortho Cervical', 'Couple']
  },
  cushions: {
    label: 'Cushions',
    icon: '🪑',
    description: 'Seat-to-sleep ergonomic lumbar care that holds you softly.',
    subcategories: ['All', 'Sofa', 'Chair', 'Floor', 'Back Support']
  },
  bolsters: {
    label: 'Bolsters',
    icon: '〰️',
    description: 'The ancient art of full-body hugs reinvented for side and maternity sleep.',
    subcategories: ['All', 'Standard', 'King', 'Pregnancy']
  },
  accessories: {
    label: 'Accessories',
    icon: '✨',
    description: 'Organic bamboo protectors, mulberry silk masks, and botanical mist.',
    subcategories: ['All', 'Mattress Protectors', 'Pillow Covers', 'Bed Sheets', 'Sleep Masks', 'Aromatherapy']
  }
};

// 6 combinable filter axes
export const FILTER_AXES = {
  size: {
    label: 'Size',
    options: ['Single', 'Twin', 'Double', 'Queen', 'XL Queen', 'Super Queen', 'King', 'Super King', 'Kids', 'Bunk', 'Guest room']
  },
  type: {
    label: 'Mattress Type',
    options: ['Latex', 'Orthopedic', 'Memory Foam', 'Pocket Spring', 'Hybrid']
  },
  sleeperProfile: {
    label: 'Sleeper Profile',
    options: ['Kids', 'Youth', 'Adult', 'Senior / Severe Back Pain', 'Fit for All', 'For Big People', 'Budget']
  },
  firmness: {
    label: 'Firmness',
    options: ['Soft', 'Medium Soft', 'Medium', 'Medium Firm', 'Firm']
  },
  tier: {
    label: 'Price Classification',
    options: ['Foundation', 'Signature', 'Reserve', 'Budget']
  },
  weightCapacity: {
    label: 'Weight Capacity',
    options: ['Standard (Under 80 kg)', 'Medium (80–140 kg)', 'Heavy Duty (Up to 240 kg)']
  }
};

export const SIZE_SPECS = {
  Single: 'L 72 / 75 / 78 · W 30',
  Twin: 'L 72 / 75 / 78 · W 36',
  Double: 'L 72 / 75 / 78 · W 48',
  Queen: 'L 72 / 75 / 78 · W 60',
  'XL Queen': 'L 72 / 75 / 78 · W 66',
  'Super Queen': 'L 84 · W 60',
  King: 'L 72 / 75 / 78 · W 72',
  'Super King': 'L 84 · W 72'
};

export const TIERS = [
  { id: 'foundation', name: 'Foundation', line: 'Essential Luxury', height: '6"–8"', href: './mattresses.html?tier=Foundation' },
  { id: 'signature', name: 'Signature', line: 'Flagship Anatomical', height: '8"–10"', href: './mattresses.html?tier=Signature' },
  { id: 'reserve', name: 'Reserve', line: 'Ultra-Luxe Heritage', height: '10"–12"', href: './mattresses.html?tier=Reserve' }
];

export const ACCESSORY_TABS = [
  'All',
  'Mattress Protectors',
  'Travel-Friendly Rollable',
  'Bedsheets',
  'Pillow Covers',
  'Cushion Covers',
  'Comforters'
];

export const MATTRESS_LAYERS = [
  {
    num: 1,
    humanName: 'The Touch',
    material: 'Cover',
    description: 'The first skin of the night — a velvet-woven surface that greets you before anything else does.',
    spec: 'Knit cover · OEKO-TEX®'
  },
  {
    num: 2,
    humanName: 'The Welcome',
    material: 'Foam / Latex',
    description: 'The layer that lets you arrive. Soft enough to receive the day you just lived.',
    spec: 'Comfort layer · 4cm'
  },
  {
    num: 3,
    humanName: 'The Response',
    material: 'Transition Core',
    description: 'It answers the shape you actually sleep in — active anatomical pressure redistribution.',
    spec: 'Dynamic transition · 3cm'
  },
  {
    num: 4,
    humanName: 'The Embrace',
    material: 'Coils / Zoned HR',
    description: 'Individually wrapped pocket coils or 7-zone orthopedic core holding you without motion transfer.',
    spec: 'Zoned support system'
  },
  {
    num: 5,
    humanName: 'The Foundation',
    material: 'Base & Edge Guard',
    description: 'What the whole hug stands on — high-density base with heavy-duty reinforced perimeter.',
    spec: 'Reinforced edge hold · up to 240kg'
  }
];

export const FABRIC_FEATURES = [
  { icon: '🌿', title: 'Tencel™ Certified', desc: 'OEKO-TEX® certified. Naturally sourced. No harsh chemicals touch your skin.' },
  { icon: '❄️', title: 'CoolSync™ Tech', desc: 'Phase-change gel micro-capsules regulate bed temp within ±1.5°C of your body.' },
  { icon: '🛡️', title: 'ProShield Anti-Microbial', desc: 'Silver-ion treatment eliminates 99.8% of dust mites and bacteria.' },
  { icon: '💧', title: 'HydraWick™ Layer', desc: 'Moisture drawn away in under 4 seconds. Wake dry, always.' }
];

// ────────────────────────────────────────────────────────────
// PRODUCT MASTER CATALOG (10 Flagship Mattresses & Ecosystem)
// ────────────────────────────────────────────────────────────
export const PRODUCTS = [
  // ── 1. HYBRID ADAPTIVE (Fit for All & Adult) ──────────────
  {
    id: 'vh-m001',
    category: 'mattresses',
    name: 'Elara Cloud Hybrid',
    mattressType: 'Hybrid',
    collection: 'Signature',
    tagline: 'For those who treat sleep as a ceremony.',
    sleeperProfile: 'Fit for All',
    sleeperProfileDesc: 'Universal dual-comfort for every sleep position.',
    targetAgeGroup: 'Adult (35–50 yrs)',
    backPainLevel: 'Mild to Moderate Pain',
    maxWeightKg: 180,
    sizes: ['Single', 'Double', 'Queen', 'King'],
    materials: ['Hybrid', 'Latex', 'Pocket Spring'],
    firmness: 'Medium Firm',
    firmnessScore: 6,
    positions: ['Side', 'Back', 'Combination'],
    packaging: ['Box-Packed', 'Flat-Packed'],
    basePrice: 28000,
    mrp: 38000,
    discount: 26,
    emi: '₹933/mo × 30 months',
    badge: 'bestseller',
    badgeLabel: 'Most Popular',
    tags: ['hybrid', 'fit-for-all', 'bestseller', 'zero-motion', 'cooling'],
    rating: 4.9,
    reviews: 1240,
    doctorRecommended: true,
    height: 20,
    thicknessInch: 8,
    sleepNeeds: ['Fit for All', 'Couples / Zero Motion', 'Side Sleeper', 'Back & Spine Pain'],
    trialDays: 100,
    warranty: '10 years',
    has3D: true,
    image: '/src/assets/images/mattress_hybrid_luxury.jpg',
    description: 'Dual-comfort hybrid design combining 100% natural Sri Lankan latex and independent pocket springs. Zero motion transfer, breathable bamboo-velvet cover, and 5-zone anatomical contouring.',
    features: ['Hybrid pocket spring + natural latex', 'Zero motion transfer for couples', 'Adaptive 5-zone contouring', 'Breathable CoolSync cover', '100-night risk-free trial']
  },

  // ── 2. 7-ZONE ORTHOPEDIC (Senior & Severe Back Pain) ──────
  {
    id: 'vh-m002',
    category: 'mattresses',
    name: 'Serenity Ortho Spine-Align',
    mattressType: 'Orthopedic',
    collection: 'Signature',
    tagline: 'Prescribed by spine doctors. Engineered for zero morning stiffness.',
    sleeperProfile: 'Senior / Severe Back Pain',
    sleeperProfileDesc: 'Clinical 7-zone firm support for chronic back, neck & lumbar pain.',
    targetAgeGroup: 'Senior (50+ yrs)',
    backPainLevel: 'Severe Back Pain',
    maxWeightKg: 200,
    sizes: ['Single', 'Double', 'Queen', 'King', 'Super King'],
    materials: ['Orthopedic', 'Memory Foam', 'Rebonded Foam'],
    firmness: 'Firm',
    firmnessScore: 8,
    positions: ['Back', 'Side'],
    packaging: ['Flat-Packed', 'Box-Packed'],
    basePrice: 32000,
    mrp: 44000,
    discount: 27,
    emi: '₹1066/mo × 30 months',
    badge: 'ortho',
    badgeLabel: 'Doctor Certified',
    tags: ['orthopedic', 'severe-back-pain', 'senior', 'doctor-certified', 'firm'],
    rating: 4.9,
    reviews: 3120,
    doctorRecommended: true,
    height: 20,
    thicknessInch: 8,
    sleepNeeds: ['Back & Spine Pain', 'Doctor Certified Ortho', 'Senior Citizen Spine Support'],
    trialDays: 100,
    warranty: '12 years',
    has3D: true,
    image: '/src/assets/images/mattress_orthopedic_spine.jpg',
    description: 'Clinical 7-zone orthopedic mattress designed in partnership with AIIMS physiotherapists. Calibrated high-density rebonded foam and pressure-relieving transition foam align the lumbar spine in zero-gravity posture.',
    features: ['7-zone anatomical spine zoning', 'Physiotherapist & Ortho certified', 'High-density lumbar core', 'Zero sagging guarantee', 'OEKO-TEX certified anti-allergenic']
  },

  // ── 3. NASA MEMORY FOAM (Youth & Fit Sleeper) ─────────────
  {
    id: 'vh-m003',
    category: 'mattresses',
    name: 'Aura Cloud Memory Foam',
    mattressType: 'Memory Foam',
    collection: 'Foundation',
    tagline: 'Light, responsive pressure-relief for active young bodies.',
    sleeperProfile: 'Youth',
    sleeperProfileDesc: '18 to 35 years. Fit. No pain. Hostel & young professional. Soft to Medium Soft.',
    targetAgeGroup: 'Youth (18–35 yrs)',
    backPainLevel: 'No Pain / Fit',
    maxWeightKg: 150,
    sizes: ['Single', 'Twin', 'Double', 'Queen', 'King'],
    materials: ['Memory Foam', 'PU Foam'],
    firmness: 'Medium Soft',
    firmnessScore: 4,
    positions: ['Side', 'Stomach', 'Combination'],
    packaging: ['Rollable', 'Box-Packed'],
    basePrice: 19500,
    mrp: 26000,
    discount: 25,
    emi: '₹650/mo × 30 months',
    badge: 'new',
    badgeLabel: 'Youth Edition',
    tags: ['memory-foam', 'youth', 'soft-medium-soft', 'hostel-friendly', 'cooling-gel'],
    rating: 4.8,
    reviews: 870,
    doctorRecommended: false,
    height: 15,
    thicknessInch: 6,
    sleepNeeds: ['Side Sleeper', 'Hot Sleeper', 'Youth & Hostel'],
    trialDays: 100,
    warranty: '10 years',
    has3D: true,
    image: '/src/assets/images/mattress_memory_foam.jpg',
    description: 'Open-cell cooling gel memory foam that cradles shoulders and hips without heat buildup. Perfect for students, young professionals, and active sleepers seeking soft-to-medium-soft recovery.',
    features: ['CoolSync™ open-cell memory foam', 'Pressure-relief without heat trap', 'Compact rollable box delivery', 'Breathable zip-off cover', 'Anti-dust-mite sanitized']
  },

  // ── 4. 100% NATURAL LATEX (Reserve Organic Luxury) ────────
  {
    id: 'vh-m004',
    category: 'mattresses',
    name: 'Luminary Organic Latex Reserve',
    mattressType: 'Latex',
    collection: 'Reserve',
    tagline: 'Pure botanical harvest. Hand-poured in Sri Lanka for generational luxury.',
    sleeperProfile: 'Fit for All',
    sleeperProfileDesc: 'Organic botanical luxury with natural bouncy lift.',
    targetAgeGroup: 'Adult (35–50 yrs)',
    backPainLevel: 'No Pain / Fit',
    maxWeightKg: 200,
    sizes: ['Queen', 'XL Queen', 'King', 'Super King'],
    materials: ['Latex'],
    firmness: 'Medium Soft',
    firmnessScore: 4.5,
    positions: ['Side', 'Back', 'Stomach', 'Combination'],
    packaging: ['Flat-Packed'],
    basePrice: 54000,
    mrp: 72000,
    discount: 25,
    emi: '₹1800/mo × 30 months',
    badge: 'luxury',
    badgeLabel: '100% Organic',
    tags: ['latex', 'organic', 'reserve', 'hot-sleeper', 'luxury'],
    rating: 4.9,
    reviews: 480,
    doctorRecommended: true,
    height: 25,
    thicknessInch: 10,
    sleepNeeds: ['Hot Sleeper', '100% Natural Latex', 'Couples / Zero Motion'],
    trialDays: 120,
    warranty: '15 years',
    has3D: true,
    image: '/src/assets/images/mattress_latex_luxury.jpg',
    description: '100% certified organic Dunlop latex from sustainable tree harvest. Natural hypoallergenic resilience, 200+ pincore aeration channels, and organic cotton-wool casing.',
    features: ['GOLS certified organic natural latex', 'Naturally cooling micro-pin ventilation', 'Chemical-free & zero VOCs', 'Reversible dual-sided feel', '15-year master craftsmanship warranty']
  },

  // ── 5. KIDS ACTIVE BOUNCE (Kids 10–17 Years) ───────────────
  {
    id: 'vh-m005',
    category: 'mattresses',
    name: 'Little Dreamers Active Bounce',
    mattressType: 'Orthopedic',
    collection: 'Foundation',
    tagline: 'Bouncy, safe, and pediatrician-approved for growing spines.',
    sleeperProfile: 'Kids',
    sleeperProfileDesc: '10 to 17 years. Bouncy active growth support & spinal alignment.',
    targetAgeGroup: 'Kids (10–17 yrs)',
    backPainLevel: 'No Pain / Fit',
    maxWeightKg: 90,
    sizes: ['Kids', 'Bunk', 'Single', 'Twin'],
    materials: ['Orthopedic', 'Pocket Spring', 'Coir (Coconut Fibre)'],
    firmness: 'Medium',
    firmnessScore: 5,
    positions: ['Side', 'Back', 'Stomach', 'Combination'],
    packaging: ['Box-Packed', 'Flat-Packed'],
    basePrice: 9800,
    mrp: 13500,
    discount: 27,
    emi: '₹326/mo × 30 months',
    badge: 'kids',
    badgeLabel: 'Kids 10–17',
    tags: ['kids', 'bounce', 'growth-support', 'pediatrician-approved'],
    rating: 4.8,
    reviews: 890,
    doctorRecommended: true,
    height: 15,
    thicknessInch: 6,
    sleepNeeds: ['Kids Spinal Support', 'Hypoallergenic'],
    trialDays: 100,
    warranty: '7 years',
    has3D: false,
    image: '/src/assets/images/mattress_kids.jpg',
    description: 'Pediatrician formulated with dynamic bounce pocket springs and breathable natural coir. Keeps posture upright during growth spurts while offering the fun, resilient bounce kids love.',
    features: ['Pediatrician posture approval', 'Active growth bounce spring core', '100% waterproof spill-resistant cover', 'Hypoallergenic OEKO-TEX certified', 'Safe rounded edge construction']
  },

  // ── 6. BESPOKE GRAND RESERVE (Ultra-Luxe Heritage) ────────
  {
    id: 'vh-m006',
    category: 'mattresses',
    name: 'Bespoke Grand Reserve Royal',
    mattressType: 'Hybrid',
    collection: 'Reserve',
    tagline: 'Every body is different. Yours should sleep differently too.',
    sleeperProfile: 'Fit for All',
    sleeperProfileDesc: 'Tailor-crafted dual firmness zones with white-glove staging.',
    targetAgeGroup: 'Adult (35–50 yrs)',
    backPainLevel: 'Mild to Moderate Pain',
    maxWeightKg: 240,
    sizes: ['Queen', 'XL Queen', 'King', 'Super King'],
    materials: ['Hybrid', 'Latex', 'Pocket Spring'],
    firmness: 'Medium Firm',
    firmnessScore: 6.5,
    positions: ['Side', 'Back', 'Combination'],
    packaging: ['Flat-Packed'],
    basePrice: 89000,
    mrp: 119000,
    discount: 25,
    emi: '₹2966/mo × 30 months',
    badge: 'luxury',
    badgeLabel: 'Masterpiece',
    tags: ['bespoke', 'reserve', 'luxury', 'custom-crafted', 'doctor-certified'],
    rating: 5.0,
    reviews: 96,
    doctorRecommended: true,
    height: 30,
    thicknessInch: 12,
    sleepNeeds: ['Custom Body-Mapped', 'Back & Spine Pain', 'Doctor Certified Ortho'],
    trialDays: 120,
    warranty: '20 years',
    has3D: true,
    image: '/src/assets/images/mattress_bespoke.jpg',
    description: 'The pinnacle of Velvet Hug sleep engineering. 12-inch multi-layered hybrid with gold-quilted damask velvet, individually encased titanium coils, and dual-zone customizable firmness.',
    features: ['Dedicated sleep scientist consultation', 'Dual-side personalized firmness', 'Titanium zoned pocket coils', 'White-glove doorstep bedroom assembly', '20-year royal warranty']
  },

  // ── 7. FOR BIG PEOPLE HEAVY DUTY (Supports up to 240kg) ───
  {
    id: 'vh-m007',
    category: 'mattresses',
    name: 'Titan Ortho-Robust Heavy Duty',
    mattressType: 'Hybrid',
    collection: 'Signature',
    tagline: 'High-resilience heavy-duty support engineered for up to 240 kg.',
    sleeperProfile: 'For Big People',
    sleeperProfileDesc: 'Medium Firm. Supports an overall sleeper weight of up to 240 kg without sagging.',
    targetAgeGroup: 'Adult (35–50 yrs)',
    backPainLevel: 'Mild to Moderate Pain',
    maxWeightKg: 240,
    sizes: ['Double', 'Queen', 'XL Queen', 'King', 'Super King'],
    materials: ['Hybrid', 'Orthopedic', 'Pocket Spring'],
    firmness: 'Medium Firm',
    firmnessScore: 7,
    positions: ['Back', 'Side', 'Combination'],
    packaging: ['Flat-Packed', 'Box-Packed'],
    basePrice: 38000,
    mrp: 52000,
    discount: 27,
    emi: '₹1266/mo × 30 months',
    badge: 'bestseller',
    badgeLabel: 'Up to 240 kg',
    tags: ['for-big-people', 'heavy-duty', '240kg-support', 'reinforced-edge', 'hybrid'],
    rating: 4.9,
    reviews: 740,
    doctorRecommended: true,
    height: 25,
    thicknessInch: 10,
    sleepNeeds: ['For Big People (Up to 240kg)', 'Back & Spine Pain', 'Couples / Zero Motion'],
    trialDays: 100,
    warranty: '15 years',
    has3D: true,
    image: '/src/assets/images/mattress_titan_heavy_duty.jpg',
    description: 'Engineered specifically for plus-size sleepers, couples, and individuals requiring structural reinforcement. High-gauge pocket springs, high-density transition foam, and quad-perimeter edge support.',
    features: ['Guaranteed 240 kg total sleeper support', 'Reinforced perimeter Anti-Roll edge guards', 'High-tensile steel pocket springs', 'Breathable temperature-regulating core', '15-year non-sag structural warranty']
  },

  // ── 8. ADULT DUAL-COMFORT (35–50 yrs / Mild Pain) ─────────
  {
    id: 'vh-m008',
    category: 'mattresses',
    name: 'TheraSpine Clinical Dual-Firm',
    mattressType: 'Orthopedic',
    collection: 'Foundation',
    tagline: 'Reversible firmness for evolving lumbar support and pain recovery.',
    sleeperProfile: 'Adult',
    sleeperProfileDesc: '35 to 50 years OR Mild to Moderate Pain. Medium to Medium Firm.',
    targetAgeGroup: 'Adult (35–50 yrs)',
    backPainLevel: 'Mild to Moderate Pain',
    maxWeightKg: 190,
    sizes: ['Single', 'Double', 'Queen', 'King'],
    materials: ['Orthopedic', 'Rebonded Foam', 'Memory Foam'],
    firmness: 'Medium Firm',
    firmnessScore: 6.5,
    positions: ['Back', 'Side'],
    packaging: ['Flat-Packed'],
    basePrice: 22000,
    mrp: 29500,
    discount: 25,
    emi: '₹733/mo × 30 months',
    badge: 'ortho',
    badgeLabel: 'Reversible',
    tags: ['adult', 'mild-pain', 'orthopedic', 'reversible', 'foundation'],
    rating: 4.8,
    reviews: 1540,
    doctorRecommended: true,
    height: 20,
    thicknessInch: 8,
    sleepNeeds: ['Back & Spine Pain', 'Doctor Certified Ortho'],
    trialDays: 100,
    warranty: '10 years',
    has3D: true,
    image: '/src/assets/images/mattress_orthopedic_spine.jpg',
    description: 'Reversible orthopedic mattress offering Medium-Firm anatomical support on Side A and Orthopedic Firm alignment on Side B. Perfect for adults managing work-from-home back stiffness.',
    features: ['Reversible dual-sided firmness', '70D high-density orthopedic core', 'Cooling bamboo knit fabric', 'Posture correction alignment', '10-year warranty']
  },

  // ── 9. ZERO-MOTION POCKET SPRING (Couples & Peaceful REM) ──
  {
    id: 'vh-m009',
    category: 'mattresses',
    name: 'Zenith Zero-Motion Pocket Spring',
    mattressType: 'Pocket Spring',
    collection: 'Signature',
    tagline: 'Your partner tosses. You never feel a ripple.',
    sleeperProfile: 'Fit for All',
    sleeperProfileDesc: 'Isolated pocket coil technology for undisturbed deep sleep.',
    targetAgeGroup: 'Youth (18–35 yrs)',
    backPainLevel: 'No Pain / Fit',
    maxWeightKg: 180,
    sizes: ['Single', 'Double', 'Queen', 'King'],
    materials: ['Pocket Spring', 'Memory Foam'],
    firmness: 'Medium',
    firmnessScore: 5,
    positions: ['Side', 'Back', 'Combination'],
    packaging: ['Box-Packed', 'Flat-Packed'],
    basePrice: 26000,
    mrp: 35000,
    discount: 26,
    emi: '₹866/mo × 30 months',
    badge: 'bestseller',
    badgeLabel: 'Couples Pick',
    tags: ['pocket-spring', 'zero-motion', 'couples', 'medium-firmness', 'signature'],
    rating: 4.8,
    reviews: 1820,
    doctorRecommended: false,
    height: 20,
    thicknessInch: 8,
    sleepNeeds: ['Couples / Zero Motion', 'Side Sleeper'],
    trialDays: 100,
    warranty: '10 years',
    has3D: true,
    image: '/src/assets/images/mattress_pocket_spring.jpg',
    description: 'Over 800 individually encapsulated pocket springs adapt independently to your body curves. Prevents partner disturbance while delivering gentle contouring plush comfort.',
    features: ['800+ independent pocket springs', 'Zero motion transfer technology', 'Plush euro-top comfort cushioning', 'Reinforced side sitting perimeter', '100-night trial']
  },

  // ── 10. BUDGET VALUE COMFORT (High Value Essentials) ──────
  {
    id: 'vh-m010',
    category: 'mattresses',
    name: 'Velvet Essential Budget Ortho',
    mattressType: 'Orthopedic',
    collection: 'Budget',
    tagline: 'Ergonomic spine protection at direct-from-lab value pricing.',
    sleeperProfile: 'Budget',
    sleeperProfileDesc: 'High-density orthopedic support at accessible direct-to-consumer value.',
    targetAgeGroup: 'Adult (35–50 yrs)',
    backPainLevel: 'Mild to Moderate Pain',
    maxWeightKg: 140,
    sizes: ['Single', 'Double', 'Queen', 'King'],
    materials: ['Orthopedic', 'PU Foam', 'Coir (Coconut Fibre)'],
    firmness: 'Medium Firm',
    firmnessScore: 6,
    positions: ['Back', 'Side', 'Combination'],
    packaging: ['Flat-Packed', 'Box-Packed'],
    basePrice: 11500,
    mrp: 15500,
    discount: 26,
    emi: '₹383/mo × 30 months',
    badge: 'budget',
    badgeLabel: 'Best Value',
    tags: ['budget', 'value', 'orthopedic', 'coir', 'accessible'],
    rating: 4.7,
    reviews: 2150,
    doctorRecommended: true,
    height: 15,
    thicknessInch: 6,
    sleepNeeds: ['Budget', 'Back & Spine Pain'],
    trialDays: 100,
    warranty: '5 years',
    has3D: false,
    image: '/src/assets/images/mattress_kids.jpg',
    description: 'High-density bonded core layered with natural rubberized coir and soft quilted jacquard. Direct factory-to-doorstep pricing makes clinical back support accessible to everyone.',
    features: ['Direct factory value pricing', 'High-density bonded posture core', 'Breathable natural coir layer', 'Hypoallergenic jacquard fabric', '5-year warranty']
  },

  // ── PILLOWS ─────────────────────────────────────────────────
  {
    id: 'vh-p001',
    category: 'pillows',
    name: 'Cloud Cradle Memory Pillow',
    collection: 'Signature',
    tagline: 'The pillow that remembers how you sleep.',
    sizes: ['Standard', 'Queen'],
    materials: ['Memory Foam'],
    firmness: 'Medium Soft',
    firmnessScore: 4,
    packaging: ['Standard Delivery', 'Gifting Box'],
    basePrice: 1800,
    mrp: 2400,
    discount: 25,
    emi: null,
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    tags: ['memory-foam', 'cooling', 'side-sleeper'],
    rating: 4.7,
    reviews: 1890,
    doctorRecommended: false,
    image: '/src/assets/images/pillow_memory.jpg',
    description: 'Contoured slow-recovery memory foam. Side sleeper or back sleeper, it cradles your neck seamlessly.',
    features: ['Contoured shape', 'CoolSync gel layer', 'Washable cover', 'Height adjustable', 'Hypoallergenic']
  },
  {
    id: 'vh-p002',
    category: 'pillows',
    name: 'Ortho Cervical Pro Neck Support',
    collection: 'Signature',
    tagline: 'For necks that have carried too much for too long.',
    sizes: ['Standard'],
    materials: ['Memory Foam', 'Orthopedic'],
    firmness: 'Firm',
    firmnessScore: 8,
    packaging: ['Standard Delivery'],
    basePrice: 2400,
    mrp: 3200,
    discount: 25,
    emi: null,
    badge: 'ortho',
    badgeLabel: 'Doctor Choice',
    tags: ['cervical', 'ortho', 'neck-pain'],
    rating: 4.8,
    reviews: 2240,
    doctorRecommended: true,
    image: '/src/assets/images/pillow_cervical.jpg',
    description: 'Cervical curve engineered by physiotherapists. Dual lobes for neck traction and cervical spine relief.',
    features: ['Dual-height lobes', 'Memory foam', 'Physiotherapist designed', 'Non-slip base', 'Breathable bamboo cover']
  },
  {
    id: 'vh-p003',
    category: 'pillows',
    name: 'Natural Organic Latex Bliss Pillow',
    collection: 'Reserve',
    tagline: 'Natural. Springy. Timeless.',
    sizes: ['Standard', 'Queen'],
    materials: ['Latex'],
    firmness: 'Medium Firm',
    firmnessScore: 5.5,
    packaging: ['Standard Delivery', 'Gifting Box'],
    basePrice: 3200,
    mrp: 4400,
    discount: 27,
    emi: null,
    badge: 'luxury',
    badgeLabel: '100% Organic',
    tags: ['latex', 'natural', 'eco'],
    rating: 4.9,
    reviews: 540,
    doctorRecommended: true,
    image: '/src/assets/images/pillow_latex.jpg',
    description: 'Micro-pin ventilated organic natural latex fill. Instant responsive bounce with hypoallergenic organic cover.',
    features: ['Organic natural latex', 'Micro-pin ventilated', 'Anti-dust-mite', 'GOLS certified', 'Washable cotton casing']
  },
  {
    id: 'vh-p004',
    category: 'pillows',
    name: "Couple's Dual-Zone Harmony Pillow",
    collection: 'Signature',
    tagline: 'One pillow. Two sides. Zero compromise.',
    sizes: ['King'],
    materials: ['Memory Foam'],
    firmness: 'Medium',
    firmnessScore: 5,
    packaging: ['Gifting Box'],
    basePrice: 4200,
    mrp: 5600,
    discount: 25,
    emi: null,
    badge: 'bestseller',
    badgeLabel: 'Couples Pick',
    tags: ['couples', 'king', 'memory-foam'],
    rating: 4.8,
    reviews: 380,
    doctorRecommended: false,
    image: '/src/assets/images/pillow_couple.jpg',
    description: 'Dual-zone king pillow. Firm on one side, soft on the other with central divider for harmonious sleep.',
    features: ['Dual-zone firmness', 'King size', 'Embroidered divider', 'Washable cover', 'Gift ready']
  },

  // ── CUSHIONS ────────────────────────────────────────────────
  {
    id: 'vh-c001',
    category: 'cushions',
    name: 'Throne Ergonomic Lumbar Cushion',
    collection: 'Foundation',
    tagline: 'For the 9 hours you sit before the 8 hours you sleep.',
    sizes: ['Small (35×35)', 'Standard (45×45)', 'Large (55×55)'],
    materials: ['Memory Foam'],
    firmness: 'Medium Firm',
    firmnessScore: 6,
    packaging: ['Standard Delivery'],
    basePrice: 1200,
    mrp: 1600,
    discount: 25,
    emi: null,
    badge: 'bestseller',
    badgeLabel: 'WFH Favourite',
    tags: ['lumbar', 'office', 'ergonomic'],
    rating: 4.7,
    reviews: 2100,
    doctorRecommended: true,
    image: '/src/assets/images/cushion_lumbar.jpg',
    description: 'Lumbar S-curve arch engineered from 500+ posture scans. High-density memory foam prevents desk slouching.',
    features: ['Lumbar S-curve design', 'Memory foam', 'Non-slip base', 'Washable velvet cover', 'Chair strap attachment']
  },
  {
    id: 'vh-c002',
    category: 'cushions',
    name: 'Velvet Living Room Sofa Nest',
    collection: 'Signature',
    tagline: 'Because your sofa deserves to feel like a hug.',
    sizes: ['Standard (45×45)', 'Large (55×55)'],
    materials: ['PU Foam'],
    firmness: 'Medium Soft',
    firmnessScore: 4,
    packaging: ['Gifting Box', 'Standard Delivery'],
    basePrice: 1800,
    mrp: 2400,
    discount: 25,
    emi: null,
    badge: 'new',
    badgeLabel: 'Gift Favourite',
    tags: ['sofa', 'decorative', 'velvet'],
    rating: 4.6,
    reviews: 670,
    doctorRecommended: false,
    image: '/src/assets/images/cushion_sofa.jpg',
    description: 'Deep midnight blue velvet outer with shape-retaining resilient core. Set of 2 matching cushions.',
    features: ['Midnight velvet cover', 'HR foam fill', 'Hidden zip', 'Shape-retaining', 'Set of 2']
  },

  // ── BOLSTERS ────────────────────────────────────────────────
  {
    id: 'vh-b001',
    category: 'bolsters',
    name: 'The Sacred Embrace Sleep Bolster',
    collection: 'Signature',
    tagline: 'The ancient art of full-body hugs reimagined.',
    sizes: ['Standard (72×15)', 'King (78×18)'],
    materials: ['Memory Foam'],
    firmness: 'Medium Soft',
    firmnessScore: 4,
    packaging: ['Standard Delivery', 'Gifting Box'],
    basePrice: 1600,
    mrp: 2200,
    discount: 27,
    emi: null,
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    tags: ['bolster', 'side-sleeper', 'body-support'],
    rating: 4.8,
    reviews: 1450,
    doctorRecommended: false,
    image: '/src/assets/images/bolster_embrace.jpg',
    description: 'Long cylindrical memory foam bolster. Aligns hips and knees for side sleepers in sacred comfort.',
    features: ['Full-length body support', 'Memory foam core', 'Removable velvet cover', 'Side sleeper hip relief', 'Hypoallergenic']
  },
  {
    id: 'vh-b002',
    category: 'bolsters',
    name: 'Mama Hold Full-Body Maternity Bolster',
    collection: 'Signature',
    tagline: 'Every position supported. Every night of the journey.',
    sizes: ['Standard (140×25 U-shape)'],
    materials: ['Memory Foam'],
    firmness: 'Soft',
    firmnessScore: 3,
    packaging: ['Gifting Box'],
    basePrice: 3200,
    mrp: 4200,
    discount: 24,
    emi: null,
    badge: 'ortho',
    badgeLabel: 'Maternity Choice',
    tags: ['pregnancy', 'maternity', 'u-shape'],
    rating: 4.9,
    reviews: 290,
    doctorRecommended: true,
    image: '/src/assets/images/bolster_pregnancy.jpg',
    description: 'U-shaped anatomical body support. Supports belly, back, and knees simultaneously throughout maternity.',
    features: ['U-shape full body', 'Gynaecologist approved', 'Washable cover', 'Temperature-neutral', 'Hypoallergenic']
  },

  // ── ACCESSORIES ─────────────────────────────────────────────
  {
    id: 'vh-a001',
    category: 'accessories',
    name: 'ArmourShield Bamboo Mattress Protector',
    collection: 'Foundation',
    tagline: 'What protects your mattress, protects your investment.',
    sizes: ['Single', 'Double', 'Queen', 'King'],
    materials: ['Microfiber'],
    firmness: null,
    basePrice: 1100,
    mrp: 1500,
    discount: 27,
    emi: null,
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    tags: ['protector', 'waterproof', 'essential'],
    rating: 4.7,
    reviews: 4200,
    doctorRecommended: false,
    image: '/src/assets/images/acc_protector.jpg',
    description: '100% waterproof noiseless membrane. Deep skirt fit for up to 14" mattresses.',
    features: ['100% waterproof', 'Noiseless', 'Elastic all around', 'Machine washable', 'OEKO-TEX certified']
  },
  {
    id: 'vh-a002',
    category: 'accessories',
    name: 'Midnight Velvet Pillowcase Pair',
    collection: 'Signature',
    tagline: 'The first touch of the night.',
    sizes: ['Standard (43×73cm)', 'Queen (50×76cm)'],
    materials: ['Microfiber'],
    firmness: null,
    basePrice: 780,
    mrp: 1100,
    discount: 29,
    emi: null,
    badge: 'new',
    badgeLabel: 'New',
    tags: ['pillowcase', 'velvet', 'silk-like'],
    rating: 4.7,
    reviews: 1100,
    doctorRecommended: false,
    image: '/src/assets/images/acc_pillowcase.jpg',
    description: 'Satin-finish microfiber in signature Midnight Blue. Reduces hair friction and preserves moisture.',
    features: ['Satin-smooth surface', 'Hair-friendly', 'Moisture retaining', 'Set of 2', 'Colour-fast']
  },
  {
    id: 'vh-a003',
    category: 'accessories',
    name: 'Velvet Hug 3D Contoured Sleep Mask',
    collection: 'Foundation',
    tagline: 'Darkness, on your terms.',
    sizes: ['One Size'],
    materials: ['Microfiber'],
    firmness: null,
    basePrice: 490,
    mrp: 690,
    discount: 29,
    emi: null,
    badge: 'bestseller',
    badgeLabel: 'Gift Pick',
    tags: ['sleep-mask', 'travel', 'gift'],
    rating: 4.6,
    reviews: 2800,
    doctorRecommended: false,
    image: '/src/assets/images/acc_mask.jpg',
    description: 'Zero eye pressure 3D eye cavities. 100% light blockout with adjustable strap.',
    features: ['3D contoured', 'Zero eye pressure', 'Lavender infused', 'Adjustable strap', 'Travel pouch included']
  },
  {
    id: 'vh-a004',
    category: 'accessories',
    name: 'Dream Diffuser & Lavender Mist Set',
    collection: 'Signature',
    tagline: 'Scent the last waking breath.',
    sizes: ['One Size'],
    materials: ['Ceramic'],
    firmness: null,
    basePrice: 1600,
    mrp: 2200,
    discount: 27,
    emi: null,
    badge: 'new',
    badgeLabel: 'Aromatherapy',
    tags: ['aromatherapy', 'diffuser', 'wellness'],
    rating: 4.8,
    reviews: 560,
    doctorRecommended: false,
    image: '/src/assets/images/acc_diffuser.jpg',
    description: 'Cold-mist ultrasonic ceramic diffuser with French lavender and chamomile botanical oils.',
    features: ['Cold mist ultrasonic', '4 timer modes', 'Ceramic housing', 'LED ambient nightlight', 'Organic essential oil bottle']
  }
];

// ────────────────────────────────────────────────────────────
// FIND YOUR HUG: 5 CRITERIA DIAGNOSTIC QUIZ
// 1. Age group
// 2. Back pain, if any
// 3. Overall weight of sleeper(s)
// 4. Firmness preference
// 5. Price range
// ────────────────────────────────────────────────────────────
export const SLEEP_QUIZ = [
  {
    id: 'q_age',
    category: 'age',
    question: '1. What is your age group?',
    sub: 'Spinal density and bone alignment needs change across life stages.',
    options: [
      { id: 'kids', label: 'Kids (10 to 17 years)', sub: 'Active growth spurts & playful bounce needed', profile: 'Kids' },
      { id: 'youth', label: 'Youth (18 to 35 years)', sub: 'Fit, agile, hostel or young professional', profile: 'Youth' },
      { id: 'adult', label: 'Adult (35 to 50 years)', sub: 'Workday posture stress & lumbar care', profile: 'Adult' },
      { id: 'senior', label: 'Senior (50+ years)', sub: 'Joint care & maximum orthopedic stability', profile: 'Senior / Severe Back Pain' }
    ]
  },
  {
    id: 'q_pain',
    category: 'backpain',
    question: '2. Do you experience any back or neck pain?',
    sub: 'Let our clinical spine algorithms match the right zoning.',
    options: [
      { id: 'no_pain', label: 'No Pain / Fit', sub: 'Wake up fresh, general comfort focus', painLevel: 'No Pain / Fit' },
      { id: 'mild_pain', label: 'Mild to Moderate Pain', sub: 'Occasional morning stiffness or lower back fatigue', painLevel: 'Mild to Moderate Pain' },
      { id: 'severe_pain', label: 'Severe Back Pain / Slip Disc', sub: 'Chronic ache, doctor-recommended firm support needed', painLevel: 'Severe Back Pain' }
    ]
  },
  {
    id: 'q_weight',
    category: 'weight',
    question: '3. What is the overall weight of the sleeper(s)?',
    sub: 'Ensures zero sagging and appropriate coil compression.',
    options: [
      { id: 'standard', label: 'Under 80 kg (Standard)', sub: 'Single sleeper / light build', weightCategory: 'Standard (Under 80 kg)' },
      { id: 'medium', label: '80 to 140 kg (Medium / Couple)', sub: 'Average build or standard couple weight', weightCategory: 'Medium (80–140 kg)' },
      { id: 'heavy', label: '140 to 240 kg (For Big People)', sub: 'Reinforced heavy-duty core required', weightCategory: 'Heavy Duty (Up to 240 kg)' }
    ]
  },
  {
    id: 'q_firmness',
    category: 'firmness',
    question: '4. What is your firmness preference?',
    sub: 'From plush cloud sink to clinical orthopedic pushback.',
    options: [
      { id: 'soft', label: 'Soft (Plush Cloud)', sub: 'Deep sink & gentle hug', firmness: 'Soft' },
      { id: 'medium_soft', label: 'Medium Soft', sub: 'Contouring with gentle cushion', firmness: 'Medium Soft' },
      { id: 'medium', label: 'Medium (Balanced)', sub: 'Equal parts hug and responsive bounce', firmness: 'Medium' },
      { id: 'medium_firm', label: 'Medium Firm (Recommended)', sub: 'Targeted lumbar pushback & spinal neutrality', firmness: 'Medium Firm' },
      { id: 'firm', label: 'Firm (Orthopedic)', sub: 'Zero sag, high-density orthopedic alignment', firmness: 'Firm' }
    ]
  },
  {
    id: 'q_price',
    category: 'price',
    question: '5. What is your preferred price classification?',
    sub: 'Every Velvet Hug mattress includes our 100-Night Risk-Free Trial.',
    options: [
      { id: 'budget', label: 'Budget (Under ₹15,000)', sub: 'Direct-from-lab essential value', tier: 'Budget' },
      { id: 'foundation', label: 'Foundation (₹15,000 – ₹30,000)', sub: 'Essential luxury & everyday ergonomic care', tier: 'Foundation' },
      { id: 'signature', label: 'Signature (₹30,000 – ₹55,000)', sub: 'Flagship 5-layer anatomical engineering', tier: 'Signature' },
      { id: 'reserve', label: 'Reserve (₹55,000 and Above)', sub: '100% Organic Latex & Handcrafted Royal Heritage', tier: 'Reserve' }
    ]
  }
];

// Doctor panel
export const DOCTORS = [
  { name: 'Dr. Priya Nair', specialty: 'Physiotherapist, AIIMS', rating: 4.9, says: 'The Serenity Ortho is the closest I have seen a consumer mattress get to clinical spinal alignment.' },
  { name: 'Dr. Arjun Mehta', specialty: 'Sleep Medicine & Ortho, Fortis', rating: 4.8, says: 'For back pain sufferers and big sleepers, the Titan and Elara Cloud provide unmatched zoned pushback.' },
  { name: 'Dr. Sunita Rao', specialty: 'Paediatrician, Apollo Hospitals', rating: 5.0, says: 'Little Dreamers is the only consumer kids mattress I recommend without hesitation for 10–17 year growth.' }
];

export const MOCK_FOUNDING_PARTNERS = [
  { num: 1, name: 'Arjun S.', city: 'Bangalore', story: null },
  { num: 7, name: 'Meena R.', city: 'Chennai', story: 'Finally slept through the night.' },
  { num: 23, name: 'Vikram P.', city: 'Mumbai', story: null },
  { num: 45, name: 'Priya K.', city: 'Hyderabad', story: 'Back pain gone in two weeks.' },
  { num: 88, name: 'Rahul T.', city: 'Delhi', story: null },
  { num: 102, name: 'Ananya M.', city: 'Pune', story: 'My husband stopped snoring. Miracle.' },
  { num: 145, name: 'Suresh L.', city: 'Kochi', story: null },
  { num: 212, name: 'Kavitha N.', city: 'Ahmedabad', story: null },
  { num: 303, name: 'Dev B.', city: 'Jaipur', story: 'Worth every rupee.' },
  { num: 347, name: 'Rohini V.', city: 'Mysore', story: null },
];

export const INITIAL_PARTNER_COUNT = 348;

export const ACTIVE_PROMOS = [
  {
    id: 'founding',
    tag: 'FOUNDING EXCLUSIVE',
    message: 'First 1,000 Sleep Partners — 348 claimed, get 15% lifetime price lock',
    coupon: 'FOUNDING15',
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    image: null
  }
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

export function getProductsByCategory(category, filters = {}) {
  let products = PRODUCTS.filter(p => {
    if (category === 'accessories') {
      return p.category === 'accessories' || p.category === 'pillows' || p.category === 'cushions' || p.category === 'bolsters';
    }
    return p.category === category;
  });
  if (filters.size?.length) products = products.filter(p => p.sizes?.some(s => filters.size.includes(s)));
  if (filters.type?.length) products = products.filter(p => filters.type.includes(p.mattressType));
  if (filters.sleeperProfile?.length) products = products.filter(p => filters.sleeperProfile.includes(p.sleeperProfile));
  if (filters.firmness?.length) products = products.filter(p => filters.firmness.includes(p.firmness));
  if (filters.tier?.length) products = products.filter(p => filters.tier.includes(p.collection));
  return products;
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    (p.mattressType && p.mattressType.toLowerCase().includes(q)) ||
    (p.sleeperProfile && p.sleeperProfile.toLowerCase().includes(q)) ||
    p.description?.toLowerCase().includes(q) ||
    p.tags?.some(t => t.includes(q)) ||
    p.collection?.toLowerCase().includes(q) ||
    p.category.includes(q)
  );
}

export function formatPrice(num) {
  return '₹' + Number(num || 0).toLocaleString('en-IN');
}

export const EMI_BANKS = [
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    logo: '🏦',
    tag: 'Popular',
    tenures: [
      { months: 3, annualRate: 14, isNoCost: true, minAmount: 3000 },
      { months: 6, annualRate: 14, isNoCost: true, minAmount: 5000 },
      { months: 9, annualRate: 15, isNoCost: true, minAmount: 10000 },
      { months: 12, annualRate: 15, isNoCost: true, minAmount: 12000 },
      { months: 18, annualRate: 15.5, isNoCost: false, minAmount: 15000 },
      { months: 24, annualRate: 16, isNoCost: false, minAmount: 20000 },
      { months: 30, annualRate: 16, isNoCost: false, minAmount: 25000 }
    ]
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    logo: '🏦',
    tag: 'Instant Approval',
    tenures: [
      { months: 3, annualRate: 13.5, isNoCost: true, minAmount: 3000 },
      { months: 6, annualRate: 14, isNoCost: true, minAmount: 5000 },
      { months: 9, annualRate: 14.5, isNoCost: true, minAmount: 10000 },
      { months: 12, annualRate: 15, isNoCost: true, minAmount: 12000 },
      { months: 18, annualRate: 15.5, isNoCost: false, minAmount: 15000 },
      { months: 24, annualRate: 16, isNoCost: false, minAmount: 20000 }
    ]
  },
  {
    id: 'sbi',
    name: 'State Bank of India',
    logo: '🏦',
    tag: 'Govt / PSU',
    tenures: [
      { months: 3, annualRate: 14, isNoCost: true, minAmount: 3000 },
      { months: 6, annualRate: 14, isNoCost: true, minAmount: 5000 },
      { months: 9, annualRate: 14.5, isNoCost: true, minAmount: 10000 },
      { months: 12, annualRate: 15, isNoCost: true, minAmount: 12000 },
      { months: 18, annualRate: 15, isNoCost: false, minAmount: 15000 },
      { months: 24, annualRate: 15.5, isNoCost: false, minAmount: 20000 }
    ]
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    logo: '🏦',
    tag: 'Cashback Offers',
    tenures: [
      { months: 3, annualRate: 14, isNoCost: true, minAmount: 3000 },
      { months: 6, annualRate: 14, isNoCost: true, minAmount: 5000 },
      { months: 9, annualRate: 15, isNoCost: true, minAmount: 10000 },
      { months: 12, annualRate: 15, isNoCost: true, minAmount: 12000 },
      { months: 18, annualRate: 15.5, isNoCost: false, minAmount: 15000 },
      { months: 24, annualRate: 16, isNoCost: false, minAmount: 20000 }
    ]
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra',
    logo: '🏦',
    tag: 'Zero Processing Fee',
    tenures: [
      { months: 3, annualRate: 14, isNoCost: true, minAmount: 3000 },
      { months: 6, annualRate: 14, isNoCost: true, minAmount: 5000 },
      { months: 9, annualRate: 15, isNoCost: true, minAmount: 10000 },
      { months: 12, annualRate: 15, isNoCost: true, minAmount: 12000 },
      { months: 18, annualRate: 16, isNoCost: false, minAmount: 15000 }
    ]
  }
];

export const EMI_FINTECH_PARTNERS = [
  {
    id: 'bajaj',
    name: 'Bajaj Finserv Insta EMI Card',
    logo: '⚡',
    type: 'Cardless EMI',
    tag: 'No Credit Card Needed',
    desc: 'Instant pre-approved limit up to ₹2,00,000. 0% Interest & ₹0 down payment.',
    tenures: [3, 6, 9, 12, 18, 24]
  },
  {
    id: 'snapmint',
    name: 'Snapmint Pay-in-3',
    logo: '💳',
    type: 'Debit Card / UPI EMI',
    tag: 'Instant Aadhaar / PAN',
    desc: 'Split your purchase into 3 equal monthly payments with zero credit history required.',
    tenures: [3, 6]
  },
  {
    id: 'axio',
    name: 'Axio (formerly Capital Float)',
    logo: '📱',
    type: 'Pay Later & Flexible EMI',
    tag: 'Pre-Approved on Mobile',
    desc: 'Shop in 1-tap using OTP verification on your mobile number. Up to 12 months EMI.',
    tenures: [3, 6, 9, 12]
  },
  {
    id: 'zest',
    name: 'ZestMoney / Razorpay Affordability',
    logo: '✨',
    type: 'Digital Credit',
    tag: '100% Digital KYC',
    desc: 'Instant paperless approval in under 60 seconds. Wide bank network integration.',
    tenures: [3, 6, 9, 12]
  }
];

export function calculateEMI(principal, annualRatePercent, months) {
  if (annualRatePercent === 0 || !annualRatePercent) {
    return Math.round(principal / months);
  }
  const r = annualRatePercent / 12 / 100;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(emi);
}

export const RETURN_POLICY_DETAILS = {
  trialDays: 100,
  breakInDays: 30,
  mattressCoverage: '100-Night Risk-Free Trial with 100% money-back guarantee',
  accessoriesCoverage: '15-Day Hassle-Free Replacement for pillows, protectors & cushions',
  reverseLogisticsFee: 0,
  charityDonation: true,
  steps: [
    {
      step: 1,
      title: 'Sleep on it for 30 Nights',
      desc: 'Your spine takes 3 to 4 weeks to adjust from your old bed to anatomical 5-layer zoned support.'
    },
    {
      step: 2,
      title: 'Initiate in 1-Click',
      desc: 'If still not in love within 100 nights, tap "Initiate Return" in your account or chat with us on WhatsApp.'
    },
    {
      step: 3,
      title: 'Free White-Glove Pickup',
      desc: 'Our logistics team collects the mattress from your bedroom at zero reverse freight cost.'
    },
    {
      step: 4,
      title: '100% Refund / Sanitary Donation',
      desc: 'Full refund credited in 5–7 bank days. Returned units are sanitized and donated to orphanages, never resold.'
    }
  ],
  faqs: [
    {
      q: 'Why do you recommend sleeping for 30 nights before returning?',
      a: 'Musculoskeletal adaptation requires time. When transitioning to ergonomic zoned support, your back muscles actively recalibrate. 96% of customers report deep, pain-free sleep by night 30.'
    },
    {
      q: 'Are there any hidden pickup or restocking fees?',
      a: 'None whatsoever. Velvet Hug covers 100% of reverse logistics costs across 19,000+ Indian PIN codes.'
    },
    {
      q: 'What happens to returned mattresses? Are they repackaged?',
      a: 'Never. Repackaging used mattresses violates our strict clinical hygiene charter. Every returned mattress is sanitized and donated to partner orphanages.'
    },
    {
      q: 'Can I exchange for a different firmness level instead of a refund?',
      a: 'Yes! We offer a 1-time complimentary firmness exchange during the 100-night window.'
    }
  ]
};

export const CHENNAI_ORIGIN_WAREHOUSE = {
  name: 'Velvet Hug Central Mother Warehouse & Sleep Lab',
  location: 'Sriperumbudur / Guindy Mega Fulfillment Center, Chennai, Tamil Nadu',
  city: 'Chennai',
  state: 'Tamil Nadu',
  pincode: '600032'
};

export const PINCODE_ZONES = [
  {
    prefixRange: [[600001, 600132], [603001, 603306], [631501, 631604]],
    regionName: 'Chennai Metropolitan & Kanchipuram / Chengalpattu',
    state: 'Tamil Nadu',
    hub: 'Velvet Hug Central Mother Hub (Chennai Guindy & Sriperumbudur)',
    speedTag: '⚡ Same-Day / Next-Day Delivery',
    deliveryDaysMin: 0,
    deliveryDaysMax: 1,
    partner: 'Velvet Hug Direct White-Glove Fleet (Chennai Unit)',
    vanType: 'Eco Electric Delivery Van #01–#06 (Chennai)',
    freeUnboxing: true,
    codAvailable: true,
    trialEligible: true,
    sameDayCutoff: '14:00',
    specialNote: 'Direct local dispatch from Chennai Mother Warehouse. Order before 2:00 PM for Same-Day Evening Delivery.'
  },
  {
    prefixRange: [
      [601001, 643999],
      [560001, 560110],
      [500001, 500099],
      [682001, 682042],
      [695001, 695043],
      [570001, 570030],
      [520001, 520015],
      [530001, 530052]
    ],
    regionName: 'Tamil Nadu State & South Express Corridor (BLR, HYD, Kerala, AP)',
    state: 'South India',
    hub: 'Velvet Hug South Express Corridor (Direct from Chennai Mother Hub)',
    speedTag: '🚚 Fast 1–2 Days Delivery',
    deliveryDaysMin: 1,
    deliveryDaysMax: 2,
    partner: 'Velvet Hug South Express / BlueDart Priority',
    vanType: 'Dedicated South Regional Cargo Unit',
    freeUnboxing: true,
    codAvailable: true,
    trialEligible: true,
    sameDayCutoff: '16:00',
    specialNote: 'Direct line-haul transit from Chennai Warehouse. Includes scheduled doorstep room placement.'
  },
  {
    prefixRange: [[400001, 400104], [410001, 412999], [380001, 380060], [403001, 403806]],
    regionName: 'Mumbai, Pune, Ahmedabad & Goa Metros',
    state: 'Western India',
    hub: 'Velvet Hug West Air Corridor (Air Dispatched from Chennai Airport Hub)',
    speedTag: '🚚 Guaranteed Delivery in 2–3 Days',
    deliveryDaysMin: 2,
    deliveryDaysMax: 3,
    partner: 'BlueDart Air Express / Delhivery Express',
    vanType: 'Dedicated Air Cargo Priority Unit',
    freeUnboxing: true,
    codAvailable: true,
    trialEligible: true,
    sameDayCutoff: '15:00',
    specialNote: 'Air cargo dispatched direct from Chennai. Free room placement & packaging recycling included.'
  },
  {
    prefixRange: [[110001, 110096], [122001, 122052], [201001, 201318], [302001, 302039], [160001, 160055], [226001, 226030]],
    regionName: 'Delhi-NCR, Gurgaon, Noida, Jaipur, Chandigarh & Lucknow',
    state: 'Northern India',
    hub: 'Velvet Hug North Air Corridor (Air Dispatched from Chennai Airport Hub)',
    speedTag: '🚚 Guaranteed Delivery in 2–3 Days',
    deliveryDaysMin: 2,
    deliveryDaysMax: 3,
    partner: 'BlueDart Express Air / Delhivery Prime',
    vanType: 'Express Climate-Controlled Flight Unit',
    freeUnboxing: true,
    codAvailable: true,
    trialEligible: true,
    sameDayCutoff: '15:00',
    specialNote: 'Priority flight shipment from Chennai Mother Hub with real-time GPS tracking & doorstep unboxing.'
  },
  {
    prefixRange: [[700001, 700160], [751001, 751030], [800001, 800030], [781001, 781040]],
    regionName: 'Kolkata, Bhubaneswar, Patna & Guwahati Metros',
    state: 'East & North-East India',
    hub: 'Velvet Hug East Air & Coastal Hub (Dispatched from Chennai)',
    speedTag: '📦 Delivery in 3–4 Days',
    deliveryDaysMin: 3,
    deliveryDaysMax: 4,
    partner: 'Delhivery Air Cargo / BlueDart Express',
    vanType: 'Express Cargo Transit',
    freeUnboxing: true,
    codAvailable: true,
    trialEligible: true,
    sameDayCutoff: '14:00',
    specialNote: 'Direct express flight from Chennai with 100% transit insurance & pre-delivery calling.'
  }
];

export function checkPincodeDelivery(pincodeInput) {
  const pinStr = String(pincodeInput || '').trim().replace(/D/g, '');
  if (!pinStr || pinStr.length !== 6) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit Indian postal pincode (e.g. 600028, 560001, 400001, 110001).'
    };
  }

  const pinNum = parseInt(pinStr, 10);
  let matchedZone = null;

  for (const zone of PINCODE_ZONES) {
    for (const [min, max] of zone.prefixRange) {
      if (pinNum >= min && pinNum <= max) {
        matchedZone = zone;
        break;
      }
    }
    if (matchedZone) break;
  }

  if (!matchedZone) {
    matchedZone = {
      regionName: `Pan-India Delivery (PIN ${pinStr})`,
      state: 'India',
      hub: 'Velvet Hug Central Mother Hub, Chennai (National Network)',
      speedTag: '🚚 Delivery in 4–6 Business Days',
      deliveryDaysMin: 4,
      deliveryDaysMax: 6,
      partner: 'Delhivery Express Surface & BlueDart Air Cargo',
      vanType: 'Pan-India Insured Express Transit',
      freeUnboxing: true,
      codAvailable: true,
      trialEligible: true,
      sameDayCutoff: '13:00',
      specialNote: 'Directly shipped from Chennai Mother Warehouse with zero transit risk and 100-night trial guarantee.'
    };
  }

  const now = new Date();
  const deliveryMinDate = new Date(now);
  deliveryMinDate.setDate(now.getDate() + matchedZone.deliveryDaysMin);
  const deliveryMaxDate = new Date(now);
  deliveryMaxDate.setDate(now.getDate() + matchedZone.deliveryDaysMax);

  const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  let dateText = '';
  if (matchedZone.deliveryDaysMin === 0) {
    const isBeforeCutoff = now.getHours() < 14;
    dateText = isBeforeCutoff 
      ? `Today by 8:00 PM (${deliveryMinDate.toLocaleDateString('en-IN', dateOptions)})`
      : `Tomorrow (${deliveryMaxDate.toLocaleDateString('en-IN', dateOptions)})`;
  } else if (matchedZone.deliveryDaysMin === matchedZone.deliveryDaysMax) {
    dateText = `${deliveryMinDate.toLocaleDateString('en-IN', dateOptions)}`;
  } else {
    dateText = `${deliveryMinDate.toLocaleDateString('en-IN', dateOptions)} – ${deliveryMaxDate.toLocaleDateString('en-IN', dateOptions)}`;
  }

  return {
    valid: true,
    pincode: pinStr,
    region: matchedZone.regionName,
    speedTag: matchedZone.speedTag,
    estimatedDateText: dateText,
    partner: matchedZone.partner,
    hub: matchedZone.hub,
    originWarehouse: CHENNAI_ORIGIN_WAREHOUSE.name + ' (' + CHENNAI_ORIGIN_WAREHOUSE.city + ')',
    freeUnboxing: matchedZone.freeUnboxing,
    codAvailable: matchedZone.codAvailable,
    trialEligible: matchedZone.trialEligible,
    specialNote: matchedZone.specialNote
  };
}

// ────────────────────────────────────────────────────────────
// MATTRESS MULTI-AXIS FILTER SCHEMA (Finalized Taxonomy)
// ────────────────────────────────────────────────────────────
export const MATTRESS_FILTER_SCHEMA = {
  sleeperProfiles: [
    { id: 'all', label: 'All Mattresses', icon: 'all' },
    { id: 'kids', label: 'Kids (10–17 yrs)', icon: 'kids' },
    { id: 'youth', label: 'Youth (18–35 yrs)', icon: 'youth' },
    { id: 'adult', label: 'Adult (35–50 yrs)', icon: 'adult' },
    { id: 'senior', label: 'Senior / Back Pain', icon: 'senior' },
    { id: 'fit-all', label: 'Fit for All', icon: 'fit' },
    { id: 'big-people', label: 'For Big People (Up to 240kg)', icon: 'heavy' },
    { id: 'budget', label: 'Budget', icon: 'budget' }
  ],
  types: [
    { key: 'Latex', label: '1. Natural Latex' },
    { key: 'Orthopedic', label: '2. Orthopedic Spine-Align' },
    { key: 'Memory Foam', label: '3. NASA Memory Foam' },
    { key: 'Pocket Spring', label: '4. Zero-Motion Pocket Spring' },
    { key: 'Hybrid', label: '5. Adaptive Hybrid' }
  ],
  priceTiers: [
    { id: 'Foundation', label: 'Foundation (₹15,000 – ₹30,000)' },
    { id: 'Signature', label: 'Signature (₹30,000 – ₹55,000)' },
    { id: 'Reserve', label: 'Reserve (₹55,000+)' },
    { id: 'Budget', label: 'Budget (Under ₹15,000)' }
  ],
  firmnessLevels: [
    { key: 'Soft', label: '1. Soft (Plush)' },
    { key: 'Medium Soft', label: '2. Medium Soft' },
    { key: 'Medium', label: '3. Medium (Balanced)' },
    { key: 'Medium Firm', label: '4. Medium Firm' },
    { key: 'Firm', label: '5. Firm (Orthopedic)' }
  ],
  sizes: ['Single', 'Twin', 'Double', 'Queen', 'XL Queen', 'Super Queen', 'King', 'Super King', 'Kids'],
  thicknessInches: [6, 8, 10, 12]
};

export function filterAndSortMattresses(products, filters = {}, sortOption = 'recommended') {
  let list = products.filter(p => p.category === 'mattresses');

  // 1. Sleeper Profile Preset Filter
  if (filters.preset && filters.preset !== 'all') {
    if (filters.preset === 'kids') list = list.filter(p => p.sleeperProfile === 'Kids' || p.targetAgeGroup?.includes('Kids'));
    else if (filters.preset === 'youth') list = list.filter(p => p.sleeperProfile === 'Youth' || p.targetAgeGroup?.includes('Youth'));
    else if (filters.preset === 'adult') list = list.filter(p => p.sleeperProfile === 'Adult' || p.targetAgeGroup?.includes('Adult'));
    else if (filters.preset === 'senior') list = list.filter(p => p.sleeperProfile?.includes('Senior') || p.backPainLevel === 'Severe Back Pain' || p.firmness === 'Firm');
    else if (filters.preset === 'fit-all') list = list.filter(p => p.sleeperProfile === 'Fit for All');
    else if (filters.preset === 'big-people') list = list.filter(p => p.sleeperProfile === 'For Big People' || p.maxWeightKg >= 240);
    else if (filters.preset === 'budget') list = list.filter(p => p.sleeperProfile === 'Budget' || p.collection === 'Budget' || p.basePrice <= 15000);
  }

  // 2. Mattress Type Filter
  if (filters.types?.length) {
    list = list.filter(p => filters.types.includes(p.mattressType) || p.materials?.some(m => filters.types.includes(m)));
  }

  // 3. Price Tier Filter
  if (filters.tiers?.length) {
    list = list.filter(p => filters.tiers.includes(p.collection));
  }

  // 4. Firmness Filter
  if (filters.firmness?.length) {
    list = list.filter(p => filters.firmness.includes(p.firmness));
  }

  // 5. Sizes Filter
  if (filters.sizes?.length) {
    list = list.filter(p => p.sizes?.some(s => filters.sizes.includes(s)));
  }

  // 6. Thickness Filter
  if (filters.thickness?.length) {
    list = list.filter(p => filters.thickness.includes(p.thicknessInch));
  }

  // 7. Max Price Filter
  if (filters.maxPrice) {
    list = list.filter(p => p.basePrice <= filters.maxPrice);
  }

  // 8. Sorting
  if (sortOption === 'price-low') {
    list.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortOption === 'price-high') {
    list.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortOption === 'rating') {
    list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  } else if (sortOption === 'firmness-soft') {
    list.sort((a, b) => (a.firmnessScore || 5) - (b.firmnessScore || 5));
  } else if (sortOption === 'firmness-firm') {
    list.sort((a, b) => (b.firmnessScore || 5) - (a.firmnessScore || 5));
  } else {
    list.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0) || b.rating - a.rating);
  }

  return list;
}

export function diagnoseSleepQuiz(answers = {}) {
  const mattresses = PRODUCTS.filter(p => p.category === 'mattresses');
  
  const age = answers.q_age || answers.age || answers.q1;
  const pain = answers.q_pain || answers.backpain || answers.q2;
  const weight = answers.q_weight || answers.weight || answers.q3;
  const firmness = answers.q_firmness || answers.firmness || answers.q4;
  const price = answers.q_price || answers.price || answers.q5;

  const scored = mattresses.map(p => {
    let score = 50;
    let matchReasons = [];

    // 1. Weight Evaluation (Heavy sleeper up to 240kg takes top priority)
    if (weight === 'heavy') {
      if (p.id === 'vh-m007' || p.sleeperProfile === 'For Big People' || p.maxWeightKg >= 240) {
        score += 45;
        matchReasons.push('Heavy-duty reinforced titanium coil core supporting up to 240 kg.');
      } else if (p.firmness === 'Firm' || p.firmness === 'Medium Firm') {
        score += 15;
      } else {
        score -= 25;
      }
    } else if (weight === 'medium') {
      if (p.mattressType === 'Hybrid' || p.mattressType === 'Pocket Spring' || p.sleeperProfile === 'Fit for All') {
        score += 20;
        matchReasons.push('Zero partner motion transfer & balanced weight distribution.');
      }
    }

    // 2. Age Group Evaluation
    if (age === 'kids') {
      if (p.id === 'vh-m005' || p.sleeperProfile === 'Kids') {
        score += 40;
        matchReasons.push('Dynamic active bounce & spinal growth support for ages 10–17.');
      } else if (p.firmness === 'Medium' || p.firmness === 'Medium Soft') {
        score += 10;
      }
    } else if (age === 'youth') {
      if (p.sleeperProfile === 'Youth' || p.id === 'vh-m003' || p.id === 'vh-m009') {
        score += 30;
        matchReasons.push('Plush contouring & high-energy pressure relief for active youth.');
      }
    } else if (age === 'adult') {
      if (p.sleeperProfile === 'Adult' || p.id === 'vh-m001' || p.id === 'vh-m002') {
        score += 25;
        matchReasons.push('Ergonomic 5-zone spine neutrality for workday posture relief.');
      }
    } else if (age === 'senior') {
      if (p.sleeperProfile?.includes('Senior') || p.firmness === 'Firm' || p.id === 'vh-m002' || p.id === 'vh-m008') {
        score += 35;
        matchReasons.push('Clinical firm orthopedic pushback with zero sink for easy movement.');
      }
    }

    // 3. Back Pain Evaluation
    if (pain === 'severe_pain' || pain === 'severe') {
      if (p.doctorRecommended || p.backPainLevel === 'Severe Back Pain' || p.firmness === 'Firm') {
        score += 35;
        matchReasons.push('Doctor-certified orthopedic spinal alignment prevents nerve compression.');
      } else if (p.firmness === 'Soft') {
        score -= 30;
      }
    } else if (pain === 'mild_pain' || pain === 'mild') {
      if (p.firmness === 'Medium Firm' || p.doctorRecommended) {
        score += 25;
        matchReasons.push('Medium-Firm lumbar contouring alleviates morning stiffness.');
      }
    }

    // 4. Firmness Preference Alignment
    const firmKeyMap = {
      'soft': 'Soft',
      'medium_soft': 'Medium Soft',
      'medium': 'Medium',
      'medium_firm': 'Medium Firm',
      'firm': 'Firm'
    };
    const targetFirm = firmKeyMap[firmness] || firmness;
    if (targetFirm && p.firmness === targetFirm) {
      score += 25;
      matchReasons.push(`Exact firmness match: ${p.firmness}.`);
    }

    // 5. Price Tier Alignment
    const priceMap = {
      'budget': 'Budget',
      'foundation': 'Foundation',
      'signature': 'Signature',
      'reserve': 'Reserve'
    };
    const targetTier = priceMap[price] || price;
    if (targetTier && (p.collection === targetTier || (targetTier === 'Budget' && p.basePrice <= 15000))) {
      score += 20;
      matchReasons.push(`Matches your ${targetTier} budget tier.`);
    }

    return {
      product: p,
      score: Math.min(99, Math.max(60, score)),
      reason: matchReasons.slice(0, 2).join(' ') || 'Clinically engineered for restorative posture.'
    };
  });

  scored.sort((a, b) => b.score - a.score || b.product.rating - a.product.rating);
  return scored.slice(0, 3);
}
