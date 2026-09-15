// src/data/products.js — Velvet Hug Complete Product Catalog

export const FOUNDING_PARTNER_LIMIT = 1000;

export const CATEGORIES = {
  mattresses: {
    label: 'Mattresses',
    icon: '🛏️',
    description: 'Engineered for Indian bodies. Five-layer precision.',
    subcategories: ['All', 'Ortho', 'Memory Foam', 'Natural Latex', 'Hybrid', 'Kids', 'Hospital']
  },
  pillows: {
    label: 'Pillows',
    icon: '🌙',
    description: 'The five sacred minutes before sleep start with the right pillow.',
    subcategories: ['All', 'Memory Foam', 'Latex', 'Microfiber', 'Ortho Cervical', 'Couple']
  },
  cushions: {
    label: 'Cushions',
    icon: '🪑',
    description: 'Seat-to-sleep comfort that holds you softly.',
    subcategories: ['All', 'Sofa', 'Chair', 'Floor', 'Back Support']
  },
  bolsters: {
    label: 'Bolsters',
    icon: '〰️',
    description: 'The ancient art of total body support — reinvented.',
    subcategories: ['All', 'Standard', 'King', 'Pregnancy']
  },
  accessories: {
    label: 'Accessories',
    icon: '✨',
    description: 'Everything around your sleep ecosystem.',
    subcategories: ['All', 'Mattress Protectors', 'Pillow Covers', 'Bed Sheets', 'Sleep Masks', 'Aromatherapy']
  }
};

// 6 independent filter axes — combinable, not nested
export const FILTER_AXES = {
  size: {
    label: 'Size',
    options: ['Single', 'Twin', 'Double', 'Queen', 'XL Queen', 'Super Queen', 'King', 'Super King', 'Kids', 'Bunk', 'Guest room']
  },
  material: {
    label: 'Material',
    options: ['Memory Foam', 'Latex', 'Rebonded Foam', 'Coir (Coconut Fibre)', 'Pocket Spring', 'Orthopedic', 'Hybrid', 'PU Foam', 'Floor mattresses (upto 18" height)']
  },
  firmness: {
    label: 'Firmness',
    options: ['Extra Firm', 'Firm', 'Medium-Firm', 'Medium-Soft', 'Soft', 'Extra Soft']
  },
  tier: {
    label: 'Price Tier',
    options: ['Essential', 'Signature', 'Reserve', 'Reserve+']
  },
  ageGroup: {
    label: 'Age Group',
    options: ['Kids Mattress 0–12', 'Teen Mattress 13–19', 'Young Adult Mattress 20–30', 'Middle-Aged Mattress 31–45', 'Mature Adult Mattress 46–60', 'Senior Citizen Mattress 60+']
  },
  packaging: {
    label: 'Packaging',
    options: ['Flat-Packed', 'Box-Packed', 'Gunny bag packaging', 'Rollable', 'Foldable (Bi-Fold / Tri-Fold)', 'Travel/Portable Rollable']
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
  { id: 'essential', name: 'Essential', line: 'The Everyday Hug', height: '6"', href: './mattresses.html?tier=Essential' },
  { id: 'signature', name: 'Signature', line: 'The Deeper Embrace', height: '8"', href: './mattresses.html?tier=Signature' },
  { id: 'reserve', name: 'Reserve', line: 'The Complete Experience', height: '10"', href: './mattresses.html?tier=Reserve' },
  { id: 'reserve-plus', name: 'Reserve+', line: "The Founder's Edition", height: '10"+', href: './mattresses.html?tier=Reserve+' }
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

// Layer Anatomy
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
    material: 'Foam',
    description: 'The layer that lets you arrive. Soft enough to receive the day you just lived.',
    spec: 'Comfort foam · 4cm'
  },
  {
    num: 3,
    humanName: 'The Response',
    material: 'Foam',
    description: 'It answers the shape you actually sleep in — not the one a spec sheet imagined.',
    spec: 'Transition foam · 3cm'
  },
  {
    num: 4,
    humanName: 'The Embrace',
    material: 'Spring',
    description: 'Individually wrapped coils that hold you without holding the person beside you.',
    spec: 'Pocket springs · zoned'
  },
  {
    num: 5,
    humanName: 'The Foundation',
    material: 'Base',
    description: 'What the whole hug stands on — quiet, stable, and built to last the years after tonight.',
    spec: 'Support base · edge hold'
  }
];

// Fabric Properties
export const FABRIC_FEATURES = [
  { icon: '🌿', title: 'Tencel™ Certified', desc: 'OEKO-TEX® certified. Naturally sourced. No harsh chemicals touch your skin.' },
  { icon: '❄️', title: 'CoolSync™ Tech', desc: 'Phase-change gel micro-capsules regulate bed temp within ±1.5°C of your body.' },
  { icon: '🛡️', title: 'ProShield Anti-Microbial', desc: 'Silver-ion treatment eliminates 99.8% of dust mites and bacteria.' },
  { icon: '💧', title: 'HydraWick™ Layer', desc: 'Moisture drawn away in under 4 seconds. Wake dry, always.' }
];

// Products
export const PRODUCTS = [
  // ── MATTRESSES ──────────────────────────────────────────────
  {
    id: 'vh-m001',
    category: 'mattresses',
    name: 'Elara Cloud',
    collection: 'Signature',
    tagline: 'For those who treat sleep as a ceremony.',
    sizes: ['Single', 'Double', 'Queen', 'King'],
    materials: ['Hybrid', 'Latex', 'Pocket Spring'],
    firmness: 'Medium-Soft',
    firmnessScore: 4,
    ageGroup: 'Young Adult Mattress 20–30',
    packaging: ['Box-Packed', 'Flat-Packed'],
    layers: MATTRESS_LAYERS,
    basePrice: 28000,
    mrp: 38000,
    discount: 26,
    emi: '₹933/mo × 30 months',
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    tags: ['ortho', 'cooling', 'premium', 'side-sleeper', 'couples'],
    rating: 4.8,
    reviews: 1240,
    doctorRecommended: true,
    height: 20,
    thicknessInch: 8,
    sleepNeeds: ['Side Sleeper', 'Hot Sleeper', 'Couples / Zero Motion'],
    trialDays: 100,
    warranty: '10 years',
    has3D: true,
    image: '/src/assets/images/mattress_elara_cloud.jpg',
    description: 'A marriage of 5,000 micro pocket springs and 4cm natural latex. The Elara Cloud adapts to your posture 11 times every second.',
    features: ['11-zone micro pocket springs', '4cm natural latex top', 'Dual-sided firmness', 'CoolSync gel layer', 'OEKO-TEX certified']
  },
  {
    id: 'vh-m002',
    category: 'mattresses',
    name: 'Serenity Ortho',
    collection: 'Signature',
    tagline: 'For the backaches you have quietly lived with.',
    sizes: ['Single', 'Twin', 'Double', 'Queen', 'King'],
    materials: ['Orthopedic', 'Memory Foam'],
    firmness: 'Firm',
    firmnessScore: 7,
    ageGroup: 'Mature Adult Mattress 46–60',
    packaging: ['Box-Packed', 'Flat-Packed'],
    layers: MATTRESS_LAYERS,
    basePrice: 16500,
    mrp: 22000,
    discount: 25,
    emi: '₹550/mo × 30 months',
    badge: 'ortho',
    badgeLabel: 'Doctor Choice',
    tags: ['ortho', 'firm', 'back-support', 'back-pain', 'doctor-certified'],
    rating: 4.7,
    reviews: 2350,
    doctorRecommended: true,
    height: 15,
    thicknessInch: 6,
    sleepNeeds: ['Back & Spine Pain', 'Doctor Certified Ortho', 'Senior Citizen Spine Support'],
    trialDays: 100,
    warranty: '8 years',
    has3D: true,
    image: '/src/assets/images/mattress_serenity_ortho.jpg',
    description: '7-zone ortho core. Engineered under guidance of the Indian Orthopaedic Association. The back pain ends here.',
    features: ['7-zone HR ortho foam', 'Spine-align channel', 'Medium firm surface', 'Breathable knit fabric', 'No partner disturbance']
  },
  {
    id: 'vh-m003',
    category: 'mattresses',
    name: 'Embrace Comfort',
    collection: 'Essential',
    tagline: 'The beginning of better. Honest sleep at honest value.',
    sizes: ['Single', 'Double', 'Queen', 'King', 'Guest room'],
    materials: ['Memory Foam', 'PU Foam'],
    firmness: 'Medium-Firm',
    firmnessScore: 5,
    ageGroup: 'Young Adult Mattress 20–30',
    packaging: ['Box-Packed', 'Rollable'],
    basePrice: 9800,
    mrp: 13500,
    discount: 27,
    emi: '₹327/mo × 30 months',
    badge: 'new',
    badgeLabel: 'New',
    tags: ['memory-foam', 'budget', 'everyday', 'budget-friendly'],
    rating: 4.5,
    reviews: 3100,
    doctorRecommended: false,
    height: 12,
    thicknessInch: 6,
    sleepNeeds: ['Side Sleeper', 'Budget Friendly', 'Couples / Zero Motion'],
    trialDays: 100,
    warranty: '7 years',
    has3D: false,
    image: '/src/assets/images/mattress_embrace_comfort.jpg',
    description: 'Pure slow-recovery memory foam. Rolls into a box. Expands to full size in 48 hours. The perfect start.',
    features: ['Slow-recovery memory foam', 'Hypoallergenic cover', 'Rolled box delivery', '100-night trial', 'India-wide delivery']
  },
  {
    id: 'vh-m004',
    category: 'mattresses',
    name: 'Luminary Latex',
    collection: 'Reserve',
    tagline: 'Nothing between you and nature\'s most perfect material.',
    sizes: ['Queen', 'King', 'Super King'],
    materials: ['Latex', 'Hybrid'],
    firmness: 'Medium-Soft',
    firmnessScore: 4,
    ageGroup: 'Middle-Aged Mattress 31–45',
    packaging: ['Flat-Packed'],
    basePrice: 54000,
    mrp: 72000,
    discount: 25,
    emi: '₹1800/mo × 30 months',
    badge: 'luxury',
    badgeLabel: 'Luxury',
    tags: ['natural-latex', 'luxury', 'eco', 'organic', 'hot-sleeper'],
    rating: 4.9,
    reviews: 480,
    doctorRecommended: true,
    height: 22,
    thicknessInch: 10,
    sleepNeeds: ['Hot Sleeper', '100% Natural Latex', 'Couples / Zero Motion'],
    trialDays: 120,
    warranty: '15 years',
    has3D: true,
    image: '/src/assets/images/mattress_luminary_latex.jpg',
    description: '100% Sri Lankan natural latex. GOLS certified. No synthetics. No compromise. The gold standard of sleep.',
    features: ['GOLS certified natural latex', 'Dunlop processed', '200+ pincore air channels', 'Handcrafted wool quilting', 'Reversible firmness']
  },
  {
    id: 'vh-m005',
    category: 'mattresses',
    name: 'Little Dreamers',
    collection: 'Essential',
    tagline: 'For the sleep that shapes tomorrow\'s achievers.',
    sizes: ['Kids', 'Bunk', 'Single'],
    materials: ['Coir (Coconut Fibre)', 'Rebonded Foam'],
    firmness: 'Medium-Firm',
    firmnessScore: 6,
    ageGroup: 'Kids Mattress 0–12',
    packaging: ['Box-Packed', 'Flat-Packed'],
    basePrice: 7200,
    mrp: 9600,
    discount: 25,
    emi: '₹240/mo × 30 months',
    badge: 'kids',
    badgeLabel: 'Kids',
    tags: ['kids', 'coir', 'firm-support'],
    rating: 4.6,
    reviews: 890,
    doctorRecommended: true,
    height: 10,
    thicknessInch: 6,
    sleepNeeds: ['Kids Spinal Support', 'Hypoallergenic'],
    trialDays: 100,
    warranty: '5 years',
    has3D: false,
    image: '/src/assets/images/mattress_kids.jpg',
    description: 'Pediatrician approved. Firm coir core supports growing spines. Hypoallergenic Tencel cover is gentle against sensitive skin.',
    features: ['Pediatrician approved', 'Firm coir + foam', 'Hypoallergenic cover', 'Washable quilted top', 'Safe for 3+ years']
  },
  {
    id: 'vh-m006',
    category: 'mattresses',
    name: 'Bespoke Signature',
    collection: 'Reserve+',
    tagline: 'Every body is different. Yours should sleep differently too.',
    sizes: ['Queen', 'XL Queen', 'King', 'Super King'],
    materials: ['Hybrid', 'Latex', 'Pocket Spring'],
    firmness: 'Medium-Firm',
    firmnessScore: 5,
    ageGroup: 'Senior Citizen Mattress 60+',
    packaging: ['Flat-Packed'],
    basePrice: 90000,
    mrp: 120000,
    discount: 25,
    emi: '₹3000/mo × 30 months',
    badge: 'bestseller',
    badgeLabel: 'Custom',
    tags: ['bespoke', 'custom', 'luxury', 'doctor-certified'],
    rating: 5.0,
    reviews: 84,
    doctorRecommended: true,
    height: 24,
    thicknessInch: 12,
    sleepNeeds: ['Custom Body-Mapped', 'Back & Spine Pain', 'Doctor Certified Ortho'],
    trialDays: 120,
    warranty: '20 years',
    has3D: true,
    image: '/src/assets/images/mattress_bespoke.jpg',
    description: 'Sleep scientist consultation. Body-mapped custom build. Personalized firmness zones. Delivered by white-glove team.',
    features: ['Sleep scientist consultation', 'Custom dimensions', 'Body-mapped zones', 'White-glove install', '20-year warranty']
  },

  // ── PILLOWS ─────────────────────────────────────────────────
  {
    id: 'vh-p001',
    category: 'pillows',
    name: 'Cloud Cradle Memory',
    collection: 'Serenity',
    tagline: 'The pillow that remembers how you sleep.',
    sizes: ['Standard', 'Queen'],
    materials: ['Memory Foam'],
    firmness: 'Medium-Soft',
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
    description: 'Contoured slow-recovery memory foam. Sleeping on your side? It knows. Back sleeper? It knows. The pillow adapts.',
    features: ['Contoured shape', 'CoolSync gel layer', 'Washable cover', 'Height adjustable', 'Hypoallergenic']
  },
  {
    id: 'vh-p002',
    category: 'pillows',
    name: 'Ortho Cervical Pro',
    collection: 'Elara',
    tagline: 'For necks that have carried too much for too long.',
    sizes: ['Standard'],
    materials: ['Memory Foam', 'Orthopedic'],
    firmness: 'Firm',
    firmnessScore: 6,
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
    description: 'Cervical curve engineered by physiotherapists. Higher lobe for side sleepers. Lower lobe for back sleepers.',
    features: ['Dual-height lobes', 'Memory foam', 'Physiotherapist designed', 'Non-slip base', 'Breathable bamboo cover']
  },
  {
    id: 'vh-p003',
    category: 'pillows',
    name: 'Latex Bliss',
    collection: 'Luminary',
    tagline: 'Natural. Springy. Timeless.',
    sizes: ['Standard', 'Queen'],
    materials: ['Latex'],
    firmness: 'Medium-Firm',
    firmnessScore: 5,
    packaging: ['Standard Delivery', 'Gifting Box'],
    basePrice: 3200,
    mrp: 4400,
    discount: 27,
    emi: null,
    badge: 'new',
    badgeLabel: 'New',
    tags: ['latex', 'natural', 'eco'],
    rating: 4.6,
    reviews: 540,
    doctorRecommended: true,
    image: '/src/assets/images/pillow_latex.jpg',
    description: 'Shredded natural latex fill. Adjustable height. The responsive bounce of latex with the softness of clouds.',
    features: ['Shredded natural latex', 'Adjustable height', 'Anti-dust-mite', 'GOLS certified', 'Zipper cover']
  },
  {
    id: 'vh-p004',
    category: 'pillows',
    name: 'Couple\'s Nest',
    collection: 'Serenity',
    tagline: 'One pillow. Two sides. Zero compromise.',
    sizes: ['King'],
    materials: ['Memory Foam'],
    firmness: 'Medium-Firm',
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
    description: 'Dual-zone king pillow. Firm on one side, soft on the other. Zoned down the middle for sleep partner harmony.',
    features: ['Dual-zone firmness', 'King size', 'Embroidered divider', 'Washable cover', 'Gift ready']
  },

  // ── CUSHIONS ────────────────────────────────────────────────
  {
    id: 'vh-c001',
    category: 'cushions',
    name: 'Throne Lumbar',
    collection: 'Serenity',
    tagline: 'For the 9 hours you sit before the 8 hours you sleep.',
    sizes: ['Small (35×35)', 'Standard (45×45)', 'Large (55×55)'],
    materials: ['Memory Foam'],
    firmness: 'Medium Firm (6)',
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
    description: 'Lumbar arch that follows the natural S-curve of your lower back. Memory foam molded from posture scans of 500+ office workers.',
    features: ['Lumbar S-curve design', 'Memory foam', 'Non-slip base', 'Washable velvet cover', 'Strap attachment']
  },
  {
    id: 'vh-c002',
    category: 'cushions',
    name: 'Velvet Sofa Nest',
    collection: 'Elara',
    tagline: 'Because your sofa deserves to feel like a hug.',
    sizes: ['Standard (45×45)', 'Large (55×55)'],
    materials: ['HR Foam'],
    firmness: 'Medium Soft (4)',
    firmnessScore: 4,
    packaging: ['Gifting Box', 'Standard Delivery'],
    basePrice: 1800,
    mrp: 2400,
    discount: 25,
    emi: null,
    badge: 'new',
    badgeLabel: 'Gift Favourite',
    tags: ['sofa', 'decorative', 'velvet'],
    rating: 4.5,
    reviews: 670,
    doctorRecommended: false,
    image: '/src/assets/images/cushion_sofa.jpg',
    description: 'Deep midnight blue velvet outer. HR foam fill that holds shape for 5+ years. Brings the brand into your living space.',
    features: ['Midnight velvet cover', 'HR foam fill', 'Hidden zip', 'Shape-retaining', 'Set of 2']
  },

  // ── BOLSTERS ────────────────────────────────────────────────
  {
    id: 'vh-b001',
    category: 'bolsters',
    name: 'The Embrace Bolster',
    collection: 'Serenity',
    tagline: 'For the nights you need to be held.',
    sizes: ['Standard (72×15)', 'King (78×18)'],
    materials: ['Memory Foam'],
    firmness: 'Medium Soft (4)',
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
    description: 'Long cylindrical memory foam bolster. Cradles your arms, your knees, your thoughts. Sleep held, every night.',
    features: ['Full-length body support', 'Memory foam', 'Removable cotton cover', 'Velvet variant available', 'Pregnancy safe']
  },
  {
    id: 'vh-b002',
    category: 'bolsters',
    name: 'Mama Hold Pregnancy',
    collection: 'Elara',
    tagline: 'Every position supported. Every night of the journey.',
    sizes: ['Standard (140×25 U-shape)'],
    materials: ['Memory Foam'],
    firmness: 'Soft (3)',
    firmnessScore: 3,
    packaging: ['Gifting Box'],
    basePrice: 3200,
    mrp: 4200,
    discount: 24,
    emi: null,
    badge: 'new',
    badgeLabel: 'Pregnancy',
    tags: ['pregnancy', 'maternity', 'u-shape'],
    rating: 4.9,
    reviews: 290,
    doctorRecommended: true,
    image: '/src/assets/images/bolster_pregnancy.jpg',
    description: 'U-shaped full-body support. Designed with gynaecologists. Supports belly, back, and knees simultaneously in 3rd trimester.',
    features: ['U-shape full body', 'Gynaecologist approved', 'Washable cover', 'Temperature-neutral', 'Hypoallergenic']
  },

  // ── ACCESSORIES ─────────────────────────────────────────────
  {
    id: 'vh-a001',
    category: 'accessories',
    name: 'ArmourShield Mattress Protector',
    collection: 'Serenity',
    tagline: 'What protects your mattress, protects your investment.',
    sizes: ['Single (72×36)', 'Double (72×48)', 'Queen (72×60)', 'King (72×72)'],
    materials: ['Microfiber'],
    firmness: null,
    basePrice: 1100,
    mrp: 1500,
    discount: 27,
    emi: null,
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    tags: ['protector', 'waterproof', 'essential'],
    rating: 4.6,
    reviews: 4200,
    doctorRecommended: false,
    image: '/src/assets/images/acc_protector.jpg',
    description: '100% waterproof. Noiseless polyurethane membrane. Stretches to 50cm depth. Machine washable up to 60°C.',
    features: ['100% waterproof', 'Noiseless', 'Elastic all around', 'Machine washable', 'OEKO-TEX certified']
  },
  {
    id: 'vh-a002',
    category: 'accessories',
    name: 'Midnight Velvet Pillowcase Set',
    collection: 'Elara',
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
    description: 'Satin-finish microfiber. Reduces hair friction. Retains face moisture. Two per pack in Midnight Blue.',
    features: ['Satin-smooth surface', 'Hair-friendly', 'Moisture retaining', 'Set of 2', 'Colour-fast']
  },
  {
    id: 'vh-a003',
    category: 'accessories',
    name: 'Velvet Hug Sleep Mask',
    collection: 'Embrace',
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
    rating: 4.5,
    reviews: 2800,
    doctorRecommended: false,
    image: '/src/assets/images/acc_mask.jpg',
    description: '3D ergonomic contour. Zero eye pressure. Adjustable velcro strap. Infused with Lavender essence.',
    features: ['3D contoured', 'Zero eye pressure', 'Lavender infused', 'Adjustable strap', 'Travel pouch included']
  },
  {
    id: 'vh-a004',
    category: 'accessories',
    name: 'Dream Diffuser Aromatherapy Set',
    collection: 'Elara',
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
    rating: 4.7,
    reviews: 560,
    doctorRecommended: false,
    image: '/src/assets/images/acc_diffuser.jpg',
    description: 'Cold-mist ultrasonic ceramic diffuser. Timer modes: 1h, 2h, 4h, continuous. With Lavender + Chamomile blend.',
    features: ['Cold mist', '4 timer modes', 'Ceramic housing', 'LED ambient light', 'Lavender+Chamomile oils']
  }
];

// Quiz: sleep style finder
export const SLEEP_QUIZ = [
  {
    id: 'q1',
    question: 'How do you usually sleep?',
    sub: 'Your primary sleeping position shapes everything.',
    options: [
      { id: 'side', label: 'On my side', sub: 'Left or right — I curl or stretch', emoji: '🌙' },
      { id: 'back', label: 'On my back', sub: 'Ceiling watcher, spine neutral', emoji: '⭐' },
      { id: 'stomach', label: 'On my stomach', sub: 'Face into the pillow', emoji: '💫' },
      { id: 'combo', label: 'I move around', sub: 'Start one way, end another', emoji: '🔄' }
    ]
  },
  {
    id: 'q2',
    question: 'How do you feel in the morning?',
    sub: 'Be honest — your mattress is the first suspect.',
    options: [
      { id: 'rested', label: 'Refreshed & rested', sub: 'Ready for anything', emoji: '✨' },
      { id: 'backpain', label: 'Back or neck pain', sub: 'Stiff before the day starts', emoji: '😣' },
      { id: 'hot', label: 'Hot & sweaty', sub: 'Woke up during the night', emoji: '🌡️' },
      { id: 'tired', label: 'Still tired', sub: 'Could sleep another 3 hours', emoji: '😴' }
    ]
  },
  {
    id: 'q3',
    question: 'Who do you share the bed with?',
    sub: 'Motion isolation and size depend on this.',
    options: [
      { id: 'solo', label: 'Just me', sub: 'Full bed, full control', emoji: '🧘' },
      { id: 'partner', label: 'Partner', sub: 'Two sleep styles, one mattress', emoji: '💑' },
      { id: 'kids', label: 'Kids join us', sub: 'The whole family', emoji: '👨‍👩‍👧' },
      { id: 'pet', label: 'Pets too', sub: 'Full house policy', emoji: '🐾' }
    ]
  },
  {
    id: 'q4',
    question: 'What\'s your budget range?',
    sub: 'We\'ll show you the best within your range.',
    options: [
      { id: 'essential', label: '₹8,000 – ₹18,000', sub: 'Essential comfort tier', emoji: '🌱' },
      { id: 'comfort', label: '₹18,000 – ₹35,000', sub: 'Comfort & quality', emoji: '🌟' },
      { id: 'premium', label: '₹35,000 – ₹65,000', sub: 'Premium experience', emoji: '✨' },
      { id: 'luxury', label: '₹65,000+', sub: 'No compromise luxury', emoji: '👑' }
    ]
  },
  {
    id: 'q5',
    question: 'Any specific health concerns?',
    sub: 'We can match the right support for your body.',
    options: [
      { id: 'none', label: 'None — I\'m good', sub: 'Standard comfort focus', emoji: '💚' },
      { id: 'backpain', label: 'Back or spine issues', sub: 'Need orthopaedic support', emoji: '🦴' },
      { id: 'hot', label: 'Sleep hot / night sweats', sub: 'Need temperature control', emoji: '❄️' },
      { id: 'allergies', label: 'Allergies', sub: 'Need hypoallergenic materials', emoji: '🌺' }
    ]
  }
];

// Doctor panel
export const DOCTORS = [
  { name: 'Dr. Priya Nair', specialty: 'Physiotherapist, AIIMS', rating: 4.9, says: 'The Serenity Ortho is the closest I\'ve seen a consumer mattress get to clinical spinal support.' },
  { name: 'Dr. Arjun Mehta', specialty: 'Sleep Medicine, Fortis', rating: 4.8, says: 'For side sleepers with neck issues, the Elara Cloud\'s zoned latex is a game-changer.' },
  { name: 'Dr. Sunita Rao', specialty: 'Paediatrician, Apollo', rating: 5.0, says: 'Little Dreamers is the only consumer kids mattress I recommend without hesitation.' }
];

// Founding Partner mock data — later replaced by live API
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

export const INITIAL_PARTNER_COUNT = 347;

// Active promos
export const ACTIVE_PROMOS = [
  {
    id: 'founding',
    tag: 'FOUNDING EXCLUSIVE',
    message: 'First 1,000 Sleep Partners — 347 claimed, get 15% lifetime price lock',
    coupon: 'FOUNDING15',
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days countdown
    image: null
  }
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

export function getProductsByCategory(category, filters = {}) {
  let products = PRODUCTS.filter(p => {
    if (category === 'accessories') {
      return p.category === 'accessories' || p.category === 'cushions' || p.category === 'bolsters';
    }
    return p.category === category;
  });
  if (filters.size?.length) products = products.filter(p => p.sizes?.some(s => filters.size.includes(s)));
  if (filters.material?.length) products = products.filter(p => p.materials?.some(m => filters.material.includes(m)));
  if (filters.firmness?.length) products = products.filter(p => filters.firmness.includes(p.firmness));
  if (filters.tier?.length) products = products.filter(p => filters.tier.includes(p.collection));
  if (filters.ageGroup?.length) products = products.filter(p => filters.ageGroup.includes(p.ageGroup));
  if (filters.packaging?.length) products = products.filter(p => p.packaging?.some(pk => filters.packaging.includes(pk)));
  return products;
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    p.tags?.some(t => t.includes(q)) ||
    p.collection?.toLowerCase().includes(q) ||
    p.category.includes(q)
  );
}

export function formatPrice(num) {
  return '₹' + num.toLocaleString('en-IN');
}

// ────────────────────────────────────────────────────────────
// EMI & FINANCIAL SCHEMES DATA
// ────────────────────────────────────────────────────────────
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

// Helper to calculate monthly EMI with standard reducing balance formula
export function calculateEMI(principal, annualRatePercent, months) {
  if (annualRatePercent === 0 || !annualRatePercent) {
    return Math.round(principal / months);
  }
  const r = annualRatePercent / 12 / 100;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(emi);
}

// ────────────────────────────────────────────────────────────
// RETURN & EXCHANGE POLICIES DATA
// ────────────────────────────────────────────────────────────
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
      a: 'Musculoskeletal adaptation requires time. When transitioning from sagging or traditional cotton/coir mattresses to ergonomic zoned support, your back muscles actively recalibrate. 96% of our customers who felt slight stiffness in week 1 reported deep, pain-free sleep by night 30.'
    },
    {
      q: 'Are there any hidden pickup or restocking fees?',
      a: 'None whatsoever. Velvet Hug covers 100% of reverse logistics costs across 19,000+ Indian PIN codes. You get every single rupee back.'
    },
    {
      q: 'What happens to returned mattresses? Are they repackaged?',
      a: 'Never. Repackaging used mattresses violates our strict clinical hygiene charter. Every returned mattress undergoes hospital-grade ozone sanitization and is donated to partner non-profit orphanages and eldercare homes.'
    },
    {
      q: 'Can I exchange for a different firmness level instead of a refund?',
      a: 'Yes! We offer a 1-time complimentary firmness exchange (e.g. from Elara Cloud to Serenity Ortho or vice-versa) during the 100-night window.'
    }
  ]
};

// ────────────────────────────────────────────────────────────
// PINCODE-BASED DELIVERY TIMELINE ENGINE (Origin: Chennai Hub)
// ────────────────────────────────────────────────────────────
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
    sameDayCutoff: '14:00', // 2 PM
    specialNote: 'Direct local dispatch from Chennai Mother Warehouse. Order before 2:00 PM for Same-Day Evening Delivery (06:00 PM – 09:30 PM) or Tomorrow Morning Slot.'
  },
  {
    prefixRange: [
      [601001, 643999], // All Tamil Nadu: Coimbatore, Madurai, Trichy, Salem, Tirunelveli, Vellore, Erode
      [560001, 560110], // Bangalore Metro
      [500001, 500099], // Hyderabad Metro
      [682001, 682042], // Kochi
      [695001, 695043], // Trivandrum
      [570001, 570030], // Mysore
      [520001, 520015], // Vijayawada
      [530001, 530052]  // Visakhapatnam
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
  const pinStr = String(pincodeInput || '').trim().replace(/\D/g, '');
  if (!pinStr || pinStr.length !== 6) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit Indian postal pincode (e.g. 600028, 600002, 560001, 400001, 110001).'
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

  // Fallback for all other valid 6-digit Indian pincodes
  if (!matchedZone) {
    matchedZone = {
      regionName: `Pan-India Delivery (PIN ${pinStr})`,
      state: 'India',
      hub: 'Velvet Hug Central Mother Hub, Chennai (National Surface & Air Network)',
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
// ENHANCED MATTRESS MULTI-AXIS FILTERING ENGINE
// ────────────────────────────────────────────────────────────
export const MATTRESS_FILTER_SCHEMA = {
  presets: [
    { id: 'all', label: 'All Mattresses', icon: 'all' },
    { id: 'bestseller', label: 'Best Sellers', icon: 'bestseller' },
    { id: 'ortho', label: 'Ortho & Back Pain', icon: 'ortho' },
    { id: 'latex', label: '100% Natural Latex', icon: 'latex' },
    { id: 'cooling', label: 'Cooling Gel Tech', icon: 'cooling' },
    { id: 'budget', label: 'Under ₹25,000', icon: 'budget' },
    { id: 'luxury', label: 'Luxury Reserve', icon: 'luxury' }
  ],
  sizes: ['Single', 'Twin', 'Double', 'Queen', 'XL Queen', 'Super Queen', 'King', 'Super King', 'Kids', 'Bunk', 'Guest room'],
  firmnessLevels: [
    { key: 'Medium-Soft', label: 'Plush & Medium-Soft (3-4/10)', score: '4/10' },
    { key: 'Medium-Firm', label: 'Medium-Firm Balanced (5-6/10)', score: '5.5/10' },
    { key: 'Firm', label: 'Orthopedic Firm (7-8/10)', score: '7/10' },
    { key: 'Extra Firm', label: 'Extra Firm Spinal Alignment (9/10)', score: '9/10' }
  ],
  materials: [
    { key: 'Latex', label: 'Natural Organic Latex (Sri Lanka GOLS)' },
    { key: 'Memory Foam', label: 'NASA-Grade Memory Foam' },
    { key: 'Pocket Spring', label: 'Zero-Motion Pocket Springs' },
    { key: 'Orthopedic', label: '7-Zone Orthopedic HR Core' },
    { key: 'Hybrid', label: 'Adaptive Hybrid (Spring + Latex/Foam)' },
    { key: 'Coir (Coconut Fibre)', label: 'Natural Breathable Coir' }
  ],
  sleepNeeds: [
    'Back & Spine Pain',
    'Side Sleeper',
    'Hot Sleeper',
    'Couples / Zero Motion',
    'Doctor Certified Ortho',
    'Senior Citizen Spine Support',
    'Kids Spinal Support'
  ],
  thicknessInches: [6, 8, 10, 12],
  priceRanges: [
    { id: 'tier-1', label: 'Under ₹15,000', min: 0, max: 15000 },
    { id: 'tier-2', label: '₹15,000 – ₹30,000', min: 15000, max: 30000 },
    { id: 'tier-3', label: '₹30,000 – ₹60,000', min: 30000, max: 60000 },
    { id: 'tier-4', label: '₹60,000 and Above', min: 60000, max: 200000 }
  ]
};

export function filterAndSortMattresses(products, filters = {}, sortOption = 'recommended') {
  let list = products.filter(p => p.category === 'mattresses');

  // 1. Preset pill filter
  if (filters.preset && filters.preset !== 'all') {
    if (filters.preset === 'bestseller') list = list.filter(p => p.badge === 'bestseller' || p.reviews > 1000);
    else if (filters.preset === 'ortho') list = list.filter(p => p.doctorRecommended || p.tags?.includes('ortho') || p.sleepNeeds?.includes('Back & Spine Pain'));
    else if (filters.preset === 'latex') list = list.filter(p => p.materials?.includes('Latex'));
    else if (filters.preset === 'cooling') list = list.filter(p => p.tags?.includes('cooling') || p.sleepNeeds?.includes('Hot Sleeper'));
    else if (filters.preset === 'budget') list = list.filter(p => p.basePrice <= 25000);
    else if (filters.preset === 'luxury') list = list.filter(p => p.basePrice >= 50000 || p.collection?.includes('Reserve'));
  }

  // 2. Sizes
  if (filters.sizes?.length) {
    list = list.filter(p => p.sizes?.some(s => filters.sizes.includes(s)));
  }

  // 3. Firmness
  if (filters.firmness?.length) {
    list = list.filter(p => filters.firmness.includes(p.firmness));
  }

  // 4. Materials
  if (filters.materials?.length) {
    list = list.filter(p => p.materials?.some(m => filters.materials.includes(m)));
  }

  // 5. Sleep Needs
  if (filters.sleepNeeds?.length) {
    list = list.filter(p => p.sleepNeeds?.some(sn => filters.sleepNeeds.includes(sn)) || p.tags?.some(t => filters.sleepNeeds.some(sn => sn.toLowerCase().includes(t))));
  }

  // 6. Thickness
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
    // Default 'recommended'
    list.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0) || b.rating - a.rating);
  }

  return list;
}
