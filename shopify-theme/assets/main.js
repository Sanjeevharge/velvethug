(function() {
  "use strict";
  const CATEGORIES = {};
  const PRODUCTS = [
    // ── 1. HYBRID ADAPTIVE (Fit for All & Adult) ──────────────
    {
      id: "vh-m001",
      category: "mattresses",
      name: "Elara Cloud Hybrid",
      mattressType: "Hybrid",
      collection: "Signature",
      tagline: "For those who treat sleep as a ceremony.",
      sleeperProfile: "Fit for All",
      sleeperProfileDesc: "Universal dual-comfort for every sleep position.",
      targetAgeGroup: "Adult (35–50 yrs)",
      backPainLevel: "Mild to Moderate Pain",
      maxWeightKg: 180,
      sizes: ["Single", "Double", "Queen", "King"],
      materials: ["Hybrid", "Latex", "Pocket Spring"],
      firmness: "Medium Firm",
      firmnessScore: 6,
      positions: ["Side", "Back", "Combination"],
      packaging: ["Box-Packed", "Flat-Packed"],
      basePrice: 28e3,
      mrp: 38e3,
      discount: 26,
      emi: "₹933/mo × 30 months",
      badge: "bestseller",
      badgeLabel: "Most Popular",
      tags: ["hybrid", "fit-for-all", "bestseller", "zero-motion", "cooling"],
      rating: 4.9,
      reviews: 1240,
      doctorRecommended: true,
      height: 20,
      thicknessInch: 8,
      sleepNeeds: ["Fit for All", "Couples / Zero Motion", "Side Sleeper", "Back & Spine Pain"],
      trialDays: 100,
      warranty: "10 years",
      has3D: true,
      image: "/src/assets/images/mattress_hybrid_luxury.jpg",
      description: "Dual-comfort hybrid design combining 100% natural Sri Lankan latex and independent pocket springs. Zero motion transfer, breathable bamboo-velvet cover, and 5-zone anatomical contouring.",
      features: ["Hybrid pocket spring + natural latex", "Zero motion transfer for couples", "Adaptive 5-zone contouring", "Breathable CoolSync cover", "100-night risk-free trial"]
    },
    // ── 2. 7-ZONE ORTHOPEDIC (Senior & Severe Back Pain) ──────
    {
      id: "vh-m002",
      category: "mattresses",
      name: "Serenity Ortho Spine-Align",
      mattressType: "Orthopedic",
      collection: "Signature",
      tagline: "Prescribed by spine doctors. Engineered for zero morning stiffness.",
      sleeperProfile: "Senior / Severe Back Pain",
      sleeperProfileDesc: "Clinical 7-zone firm support for chronic back, neck & lumbar pain.",
      targetAgeGroup: "Senior (50+ yrs)",
      backPainLevel: "Severe Back Pain",
      maxWeightKg: 200,
      sizes: ["Single", "Double", "Queen", "King", "Super King"],
      materials: ["Orthopedic", "Memory Foam", "Rebonded Foam"],
      firmness: "Firm",
      firmnessScore: 8,
      positions: ["Back", "Side"],
      packaging: ["Flat-Packed", "Box-Packed"],
      basePrice: 32e3,
      mrp: 44e3,
      discount: 27,
      emi: "₹1066/mo × 30 months",
      badge: "ortho",
      badgeLabel: "Doctor Certified",
      tags: ["orthopedic", "severe-back-pain", "senior", "doctor-certified", "firm"],
      rating: 4.9,
      reviews: 3120,
      doctorRecommended: true,
      height: 20,
      thicknessInch: 8,
      sleepNeeds: ["Back & Spine Pain", "Doctor Certified Ortho", "Senior Citizen Spine Support"],
      trialDays: 100,
      warranty: "12 years",
      has3D: true,
      image: "/src/assets/images/mattress_orthopedic_spine.jpg",
      description: "Clinical 7-zone orthopedic mattress designed in partnership with AIIMS physiotherapists. Calibrated high-density rebonded foam and pressure-relieving transition foam align the lumbar spine in zero-gravity posture.",
      features: ["7-zone anatomical spine zoning", "Physiotherapist & Ortho certified", "High-density lumbar core", "Zero sagging guarantee", "OEKO-TEX certified anti-allergenic"]
    },
    // ── 3. NASA MEMORY FOAM (Youth & Fit Sleeper) ─────────────
    {
      id: "vh-m003",
      category: "mattresses",
      name: "Aura Cloud Memory Foam",
      mattressType: "Memory Foam",
      collection: "Foundation",
      tagline: "Light, responsive pressure-relief for active young bodies.",
      sleeperProfile: "Youth",
      sleeperProfileDesc: "18 to 35 years. Fit. No pain. Hostel & young professional. Soft to Medium Soft.",
      targetAgeGroup: "Youth (18–35 yrs)",
      backPainLevel: "No Pain / Fit",
      maxWeightKg: 150,
      sizes: ["Single", "Twin", "Double", "Queen", "King"],
      materials: ["Memory Foam", "PU Foam"],
      firmness: "Medium Soft",
      firmnessScore: 4,
      positions: ["Side", "Stomach", "Combination"],
      packaging: ["Rollable", "Box-Packed"],
      basePrice: 19500,
      mrp: 26e3,
      discount: 25,
      emi: "₹650/mo × 30 months",
      badge: "new",
      badgeLabel: "Youth Edition",
      tags: ["memory-foam", "youth", "soft-medium-soft", "hostel-friendly", "cooling-gel"],
      rating: 4.8,
      reviews: 870,
      doctorRecommended: false,
      height: 15,
      thicknessInch: 6,
      sleepNeeds: ["Side Sleeper", "Hot Sleeper", "Youth & Hostel"],
      trialDays: 100,
      warranty: "10 years",
      has3D: true,
      image: "/src/assets/images/mattress_memory_foam.jpg",
      description: "Open-cell cooling gel memory foam that cradles shoulders and hips without heat buildup. Perfect for students, young professionals, and active sleepers seeking soft-to-medium-soft recovery.",
      features: ["CoolSync™ open-cell memory foam", "Pressure-relief without heat trap", "Compact rollable box delivery", "Breathable zip-off cover", "Anti-dust-mite sanitized"]
    },
    // ── 4. 100% NATURAL LATEX (Reserve Organic Luxury) ────────
    {
      id: "vh-m004",
      category: "mattresses",
      name: "Luminary Organic Latex Reserve",
      mattressType: "Latex",
      collection: "Reserve",
      tagline: "Pure botanical harvest. Hand-poured in Sri Lanka for generational luxury.",
      sleeperProfile: "Fit for All",
      sleeperProfileDesc: "Organic botanical luxury with natural bouncy lift.",
      targetAgeGroup: "Adult (35–50 yrs)",
      backPainLevel: "No Pain / Fit",
      maxWeightKg: 200,
      sizes: ["Queen", "XL Queen", "King", "Super King"],
      materials: ["Latex"],
      firmness: "Medium Soft",
      firmnessScore: 4.5,
      positions: ["Side", "Back", "Stomach", "Combination"],
      packaging: ["Flat-Packed"],
      basePrice: 54e3,
      mrp: 72e3,
      discount: 25,
      emi: "₹1800/mo × 30 months",
      badge: "luxury",
      badgeLabel: "100% Organic",
      tags: ["latex", "organic", "reserve", "hot-sleeper", "luxury"],
      rating: 4.9,
      reviews: 480,
      doctorRecommended: true,
      height: 25,
      thicknessInch: 10,
      sleepNeeds: ["Hot Sleeper", "100% Natural Latex", "Couples / Zero Motion"],
      trialDays: 120,
      warranty: "15 years",
      has3D: true,
      image: "/src/assets/images/mattress_latex_luxury.jpg",
      description: "100% certified organic Dunlop latex from sustainable tree harvest. Natural hypoallergenic resilience, 200+ pincore aeration channels, and organic cotton-wool casing.",
      features: ["GOLS certified organic natural latex", "Naturally cooling micro-pin ventilation", "Chemical-free & zero VOCs", "Reversible dual-sided feel", "15-year master craftsmanship warranty"]
    },
    // ── 5. KIDS ACTIVE BOUNCE (Kids 10–17 Years) ───────────────
    {
      id: "vh-m005",
      category: "mattresses",
      name: "Little Dreamers Active Bounce",
      mattressType: "Orthopedic",
      collection: "Foundation",
      tagline: "Bouncy, safe, and pediatrician-approved for growing spines.",
      sleeperProfile: "Kids",
      sleeperProfileDesc: "10 to 17 years. Bouncy active growth support & spinal alignment.",
      targetAgeGroup: "Kids (10–17 yrs)",
      backPainLevel: "No Pain / Fit",
      maxWeightKg: 90,
      sizes: ["Kids", "Bunk", "Single", "Twin"],
      materials: ["Orthopedic", "Pocket Spring", "Coir (Coconut Fibre)"],
      firmness: "Medium",
      firmnessScore: 5,
      positions: ["Side", "Back", "Stomach", "Combination"],
      packaging: ["Box-Packed", "Flat-Packed"],
      basePrice: 9800,
      mrp: 13500,
      discount: 27,
      emi: "₹326/mo × 30 months",
      badge: "kids",
      badgeLabel: "Kids 10–17",
      tags: ["kids", "bounce", "growth-support", "pediatrician-approved"],
      rating: 4.8,
      reviews: 890,
      doctorRecommended: true,
      height: 15,
      thicknessInch: 6,
      sleepNeeds: ["Kids Spinal Support", "Hypoallergenic"],
      trialDays: 100,
      warranty: "7 years",
      has3D: false,
      image: "/src/assets/images/mattress_kids.jpg",
      description: "Pediatrician formulated with dynamic bounce pocket springs and breathable natural coir. Keeps posture upright during growth spurts while offering the fun, resilient bounce kids love.",
      features: ["Pediatrician posture approval", "Active growth bounce spring core", "100% waterproof spill-resistant cover", "Hypoallergenic OEKO-TEX certified", "Safe rounded edge construction"]
    },
    // ── 6. BESPOKE GRAND RESERVE (Ultra-Luxe Heritage) ────────
    {
      id: "vh-m006",
      category: "mattresses",
      name: "Bespoke Grand Reserve Royal",
      mattressType: "Hybrid",
      collection: "Reserve",
      tagline: "Every body is different. Yours should sleep differently too.",
      sleeperProfile: "Fit for All",
      sleeperProfileDesc: "Tailor-crafted dual firmness zones with white-glove staging.",
      targetAgeGroup: "Adult (35–50 yrs)",
      backPainLevel: "Mild to Moderate Pain",
      maxWeightKg: 240,
      sizes: ["Queen", "XL Queen", "King", "Super King"],
      materials: ["Hybrid", "Latex", "Pocket Spring"],
      firmness: "Medium Firm",
      firmnessScore: 6.5,
      positions: ["Side", "Back", "Combination"],
      packaging: ["Flat-Packed"],
      basePrice: 89e3,
      mrp: 119e3,
      discount: 25,
      emi: "₹2966/mo × 30 months",
      badge: "luxury",
      badgeLabel: "Masterpiece",
      tags: ["bespoke", "reserve", "luxury", "custom-crafted", "doctor-certified"],
      rating: 5,
      reviews: 96,
      doctorRecommended: true,
      height: 30,
      thicknessInch: 12,
      sleepNeeds: ["Custom Body-Mapped", "Back & Spine Pain", "Doctor Certified Ortho"],
      trialDays: 120,
      warranty: "20 years",
      has3D: true,
      image: "/src/assets/images/mattress_bespoke.jpg",
      description: "The pinnacle of Velvet Hug sleep engineering. 12-inch multi-layered hybrid with gold-quilted damask velvet, individually encased titanium coils, and dual-zone customizable firmness.",
      features: ["Dedicated sleep scientist consultation", "Dual-side personalized firmness", "Titanium zoned pocket coils", "White-glove doorstep bedroom assembly", "20-year royal warranty"]
    },
    // ── 7. FOR BIG PEOPLE HEAVY DUTY (Supports up to 240kg) ───
    {
      id: "vh-m007",
      category: "mattresses",
      name: "Titan Ortho-Robust Heavy Duty",
      mattressType: "Hybrid",
      collection: "Signature",
      tagline: "High-resilience heavy-duty support engineered for up to 240 kg.",
      sleeperProfile: "For Big People",
      sleeperProfileDesc: "Medium Firm. Supports an overall sleeper weight of up to 240 kg without sagging.",
      targetAgeGroup: "Adult (35–50 yrs)",
      backPainLevel: "Mild to Moderate Pain",
      maxWeightKg: 240,
      sizes: ["Double", "Queen", "XL Queen", "King", "Super King"],
      materials: ["Hybrid", "Orthopedic", "Pocket Spring"],
      firmness: "Medium Firm",
      firmnessScore: 7,
      positions: ["Back", "Side", "Combination"],
      packaging: ["Flat-Packed", "Box-Packed"],
      basePrice: 38e3,
      mrp: 52e3,
      discount: 27,
      emi: "₹1266/mo × 30 months",
      badge: "bestseller",
      badgeLabel: "Up to 240 kg",
      tags: ["for-big-people", "heavy-duty", "240kg-support", "reinforced-edge", "hybrid"],
      rating: 4.9,
      reviews: 740,
      doctorRecommended: true,
      height: 25,
      thicknessInch: 10,
      sleepNeeds: ["For Big People (Up to 240kg)", "Back & Spine Pain", "Couples / Zero Motion"],
      trialDays: 100,
      warranty: "15 years",
      has3D: true,
      image: "/src/assets/images/mattress_titan_heavy_duty.jpg",
      description: "Engineered specifically for plus-size sleepers, couples, and individuals requiring structural reinforcement. High-gauge pocket springs, high-density transition foam, and quad-perimeter edge support.",
      features: ["Guaranteed 240 kg total sleeper support", "Reinforced perimeter Anti-Roll edge guards", "High-tensile steel pocket springs", "Breathable temperature-regulating core", "15-year non-sag structural warranty"]
    },
    // ── 8. ADULT DUAL-COMFORT (35–50 yrs / Mild Pain) ─────────
    {
      id: "vh-m008",
      category: "mattresses",
      name: "TheraSpine Clinical Dual-Firm",
      mattressType: "Orthopedic",
      collection: "Foundation",
      tagline: "Reversible firmness for evolving lumbar support and pain recovery.",
      sleeperProfile: "Adult",
      sleeperProfileDesc: "35 to 50 years OR Mild to Moderate Pain. Medium to Medium Firm.",
      targetAgeGroup: "Adult (35–50 yrs)",
      backPainLevel: "Mild to Moderate Pain",
      maxWeightKg: 190,
      sizes: ["Single", "Double", "Queen", "King"],
      materials: ["Orthopedic", "Rebonded Foam", "Memory Foam"],
      firmness: "Medium Firm",
      firmnessScore: 6.5,
      positions: ["Back", "Side"],
      packaging: ["Flat-Packed"],
      basePrice: 22e3,
      mrp: 29500,
      discount: 25,
      emi: "₹733/mo × 30 months",
      badge: "ortho",
      badgeLabel: "Reversible",
      tags: ["adult", "mild-pain", "orthopedic", "reversible", "foundation"],
      rating: 4.8,
      reviews: 1540,
      doctorRecommended: true,
      height: 20,
      thicknessInch: 8,
      sleepNeeds: ["Back & Spine Pain", "Doctor Certified Ortho"],
      trialDays: 100,
      warranty: "10 years",
      has3D: true,
      image: "/src/assets/images/mattress_orthopedic_spine.jpg",
      description: "Reversible orthopedic mattress offering Medium-Firm anatomical support on Side A and Orthopedic Firm alignment on Side B. Perfect for adults managing work-from-home back stiffness.",
      features: ["Reversible dual-sided firmness", "70D high-density orthopedic core", "Cooling bamboo knit fabric", "Posture correction alignment", "10-year warranty"]
    },
    // ── 9. ZERO-MOTION POCKET SPRING (Couples & Peaceful REM) ──
    {
      id: "vh-m009",
      category: "mattresses",
      name: "Zenith Zero-Motion Pocket Spring",
      mattressType: "Pocket Spring",
      collection: "Signature",
      tagline: "Your partner tosses. You never feel a ripple.",
      sleeperProfile: "Fit for All",
      sleeperProfileDesc: "Isolated pocket coil technology for undisturbed deep sleep.",
      targetAgeGroup: "Youth (18–35 yrs)",
      backPainLevel: "No Pain / Fit",
      maxWeightKg: 180,
      sizes: ["Single", "Double", "Queen", "King"],
      materials: ["Pocket Spring", "Memory Foam"],
      firmness: "Medium",
      firmnessScore: 5,
      positions: ["Side", "Back", "Combination"],
      packaging: ["Box-Packed", "Flat-Packed"],
      basePrice: 26e3,
      mrp: 35e3,
      discount: 26,
      emi: "₹866/mo × 30 months",
      badge: "bestseller",
      badgeLabel: "Couples Pick",
      tags: ["pocket-spring", "zero-motion", "couples", "medium-firmness", "signature"],
      rating: 4.8,
      reviews: 1820,
      doctorRecommended: false,
      height: 20,
      thicknessInch: 8,
      sleepNeeds: ["Couples / Zero Motion", "Side Sleeper"],
      trialDays: 100,
      warranty: "10 years",
      has3D: true,
      image: "/src/assets/images/mattress_pocket_spring.jpg",
      description: "Over 800 individually encapsulated pocket springs adapt independently to your body curves. Prevents partner disturbance while delivering gentle contouring plush comfort.",
      features: ["800+ independent pocket springs", "Zero motion transfer technology", "Plush euro-top comfort cushioning", "Reinforced side sitting perimeter", "100-night trial"]
    },
    // ── 10. BUDGET VALUE COMFORT (High Value Essentials) ──────
    {
      id: "vh-m010",
      category: "mattresses",
      name: "Velvet Essential Budget Ortho",
      mattressType: "Orthopedic",
      collection: "Budget",
      tagline: "Ergonomic spine protection at direct-from-lab value pricing.",
      sleeperProfile: "Budget",
      sleeperProfileDesc: "High-density orthopedic support at accessible direct-to-consumer value.",
      targetAgeGroup: "Adult (35–50 yrs)",
      backPainLevel: "Mild to Moderate Pain",
      maxWeightKg: 140,
      sizes: ["Single", "Double", "Queen", "King"],
      materials: ["Orthopedic", "PU Foam", "Coir (Coconut Fibre)"],
      firmness: "Medium Firm",
      firmnessScore: 6,
      positions: ["Back", "Side", "Combination"],
      packaging: ["Flat-Packed", "Box-Packed"],
      basePrice: 11500,
      mrp: 15500,
      discount: 26,
      emi: "₹383/mo × 30 months",
      badge: "budget",
      badgeLabel: "Best Value",
      tags: ["budget", "value", "orthopedic", "coir", "accessible"],
      rating: 4.7,
      reviews: 2150,
      doctorRecommended: true,
      height: 15,
      thicknessInch: 6,
      sleepNeeds: ["Budget", "Back & Spine Pain"],
      trialDays: 100,
      warranty: "5 years",
      has3D: false,
      image: "/src/assets/images/mattress_kids.jpg",
      description: "High-density bonded core layered with natural rubberized coir and soft quilted jacquard. Direct factory-to-doorstep pricing makes clinical back support accessible to everyone.",
      features: ["Direct factory value pricing", "High-density bonded posture core", "Breathable natural coir layer", "Hypoallergenic jacquard fabric", "5-year warranty"]
    },
    // ── PILLOWS ─────────────────────────────────────────────────
    {
      id: "vh-p001",
      category: "pillows",
      name: "Cloud Cradle Memory Pillow",
      collection: "Signature",
      tagline: "The pillow that remembers how you sleep.",
      sizes: ["Standard", "Queen"],
      materials: ["Memory Foam"],
      firmness: "Medium Soft",
      firmnessScore: 4,
      packaging: ["Standard Delivery", "Gifting Box"],
      basePrice: 1800,
      mrp: 2400,
      discount: 25,
      emi: null,
      badge: "bestseller",
      badgeLabel: "Best Seller",
      tags: ["memory-foam", "cooling", "side-sleeper"],
      rating: 4.7,
      reviews: 1890,
      doctorRecommended: false,
      image: "/src/assets/images/pillow_memory.jpg",
      description: "Contoured slow-recovery memory foam. Side sleeper or back sleeper, it cradles your neck seamlessly.",
      features: ["Contoured shape", "CoolSync gel layer", "Washable cover", "Height adjustable", "Hypoallergenic"]
    },
    {
      id: "vh-p002",
      category: "pillows",
      name: "Ortho Cervical Pro Neck Support",
      collection: "Signature",
      tagline: "For necks that have carried too much for too long.",
      sizes: ["Standard"],
      materials: ["Memory Foam", "Orthopedic"],
      firmness: "Firm",
      firmnessScore: 8,
      packaging: ["Standard Delivery"],
      basePrice: 2400,
      mrp: 3200,
      discount: 25,
      emi: null,
      badge: "ortho",
      badgeLabel: "Doctor Choice",
      tags: ["cervical", "ortho", "neck-pain"],
      rating: 4.8,
      reviews: 2240,
      doctorRecommended: true,
      image: "/src/assets/images/pillow_cervical.jpg",
      description: "Cervical curve engineered by physiotherapists. Dual lobes for neck traction and cervical spine relief.",
      features: ["Dual-height lobes", "Memory foam", "Physiotherapist designed", "Non-slip base", "Breathable bamboo cover"]
    },
    {
      id: "vh-p003",
      category: "pillows",
      name: "Natural Organic Latex Bliss Pillow",
      collection: "Reserve",
      tagline: "Natural. Springy. Timeless.",
      sizes: ["Standard", "Queen"],
      materials: ["Latex"],
      firmness: "Medium Firm",
      firmnessScore: 5.5,
      packaging: ["Standard Delivery", "Gifting Box"],
      basePrice: 3200,
      mrp: 4400,
      discount: 27,
      emi: null,
      badge: "luxury",
      badgeLabel: "100% Organic",
      tags: ["latex", "natural", "eco"],
      rating: 4.9,
      reviews: 540,
      doctorRecommended: true,
      image: "/src/assets/images/pillow_latex.jpg",
      description: "Micro-pin ventilated organic natural latex fill. Instant responsive bounce with hypoallergenic organic cover.",
      features: ["Organic natural latex", "Micro-pin ventilated", "Anti-dust-mite", "GOLS certified", "Washable cotton casing"]
    },
    {
      id: "vh-p004",
      category: "pillows",
      name: "Couple's Dual-Zone Harmony Pillow",
      collection: "Signature",
      tagline: "One pillow. Two sides. Zero compromise.",
      sizes: ["King"],
      materials: ["Memory Foam"],
      firmness: "Medium",
      firmnessScore: 5,
      packaging: ["Gifting Box"],
      basePrice: 4200,
      mrp: 5600,
      discount: 25,
      emi: null,
      badge: "bestseller",
      badgeLabel: "Couples Pick",
      tags: ["couples", "king", "memory-foam"],
      rating: 4.8,
      reviews: 380,
      doctorRecommended: false,
      image: "/src/assets/images/pillow_couple.jpg",
      description: "Dual-zone king pillow. Firm on one side, soft on the other with central divider for harmonious sleep.",
      features: ["Dual-zone firmness", "King size", "Embroidered divider", "Washable cover", "Gift ready"]
    },
    // ── CUSHIONS ────────────────────────────────────────────────
    {
      id: "vh-c001",
      category: "cushions",
      name: "Throne Ergonomic Lumbar Cushion",
      collection: "Foundation",
      tagline: "For the 9 hours you sit before the 8 hours you sleep.",
      sizes: ["Small (35×35)", "Standard (45×45)", "Large (55×55)"],
      materials: ["Memory Foam"],
      firmness: "Medium Firm",
      firmnessScore: 6,
      packaging: ["Standard Delivery"],
      basePrice: 1200,
      mrp: 1600,
      discount: 25,
      emi: null,
      badge: "bestseller",
      badgeLabel: "WFH Favourite",
      tags: ["lumbar", "office", "ergonomic"],
      rating: 4.7,
      reviews: 2100,
      doctorRecommended: true,
      image: "/src/assets/images/cushion_lumbar.jpg",
      description: "Lumbar S-curve arch engineered from 500+ posture scans. High-density memory foam prevents desk slouching.",
      features: ["Lumbar S-curve design", "Memory foam", "Non-slip base", "Washable velvet cover", "Chair strap attachment"]
    },
    {
      id: "vh-c002",
      category: "cushions",
      name: "Velvet Living Room Sofa Nest",
      collection: "Signature",
      tagline: "Because your sofa deserves to feel like a hug.",
      sizes: ["Standard (45×45)", "Large (55×55)"],
      materials: ["PU Foam"],
      firmness: "Medium Soft",
      firmnessScore: 4,
      packaging: ["Gifting Box", "Standard Delivery"],
      basePrice: 1800,
      mrp: 2400,
      discount: 25,
      emi: null,
      badge: "new",
      badgeLabel: "Gift Favourite",
      tags: ["sofa", "decorative", "velvet"],
      rating: 4.6,
      reviews: 670,
      doctorRecommended: false,
      image: "/src/assets/images/cushion_sofa.jpg",
      description: "Deep midnight blue velvet outer with shape-retaining resilient core. Set of 2 matching cushions.",
      features: ["Midnight velvet cover", "HR foam fill", "Hidden zip", "Shape-retaining", "Set of 2"]
    },
    // ── BOLSTERS ────────────────────────────────────────────────
    {
      id: "vh-b001",
      category: "bolsters",
      name: "The Sacred Embrace Sleep Bolster",
      collection: "Signature",
      tagline: "The ancient art of full-body hugs reimagined.",
      sizes: ["Standard (72×15)", "King (78×18)"],
      materials: ["Memory Foam"],
      firmness: "Medium Soft",
      firmnessScore: 4,
      packaging: ["Standard Delivery", "Gifting Box"],
      basePrice: 1600,
      mrp: 2200,
      discount: 27,
      emi: null,
      badge: "bestseller",
      badgeLabel: "Best Seller",
      tags: ["bolster", "side-sleeper", "body-support"],
      rating: 4.8,
      reviews: 1450,
      doctorRecommended: false,
      image: "/src/assets/images/bolster_embrace.jpg",
      description: "Long cylindrical memory foam bolster. Aligns hips and knees for side sleepers in sacred comfort.",
      features: ["Full-length body support", "Memory foam core", "Removable velvet cover", "Side sleeper hip relief", "Hypoallergenic"]
    },
    {
      id: "vh-b002",
      category: "bolsters",
      name: "Mama Hold Full-Body Maternity Bolster",
      collection: "Signature",
      tagline: "Every position supported. Every night of the journey.",
      sizes: ["Standard (140×25 U-shape)"],
      materials: ["Memory Foam"],
      firmness: "Soft",
      firmnessScore: 3,
      packaging: ["Gifting Box"],
      basePrice: 3200,
      mrp: 4200,
      discount: 24,
      emi: null,
      badge: "ortho",
      badgeLabel: "Maternity Choice",
      tags: ["pregnancy", "maternity", "u-shape"],
      rating: 4.9,
      reviews: 290,
      doctorRecommended: true,
      image: "/src/assets/images/bolster_pregnancy.jpg",
      description: "U-shaped anatomical body support. Supports belly, back, and knees simultaneously throughout maternity.",
      features: ["U-shape full body", "Gynaecologist approved", "Washable cover", "Temperature-neutral", "Hypoallergenic"]
    },
    // ── ACCESSORIES ─────────────────────────────────────────────
    {
      id: "vh-a001",
      category: "accessories",
      name: "ArmourShield Bamboo Mattress Protector",
      collection: "Foundation",
      tagline: "What protects your mattress, protects your investment.",
      sizes: ["Single", "Double", "Queen", "King"],
      materials: ["Microfiber"],
      firmness: null,
      basePrice: 1100,
      mrp: 1500,
      discount: 27,
      emi: null,
      badge: "bestseller",
      badgeLabel: "Best Seller",
      tags: ["protector", "waterproof", "essential"],
      rating: 4.7,
      reviews: 4200,
      doctorRecommended: false,
      image: "/src/assets/images/acc_protector.jpg",
      description: '100% waterproof noiseless membrane. Deep skirt fit for up to 14" mattresses.',
      features: ["100% waterproof", "Noiseless", "Elastic all around", "Machine washable", "OEKO-TEX certified"]
    },
    {
      id: "vh-a002",
      category: "accessories",
      name: "Midnight Velvet Pillowcase Pair",
      collection: "Signature",
      tagline: "The first touch of the night.",
      sizes: ["Standard (43×73cm)", "Queen (50×76cm)"],
      materials: ["Microfiber"],
      firmness: null,
      basePrice: 780,
      mrp: 1100,
      discount: 29,
      emi: null,
      badge: "new",
      badgeLabel: "New",
      tags: ["pillowcase", "velvet", "silk-like"],
      rating: 4.7,
      reviews: 1100,
      doctorRecommended: false,
      image: "/src/assets/images/acc_pillowcase.jpg",
      description: "Satin-finish microfiber in signature Midnight Blue. Reduces hair friction and preserves moisture.",
      features: ["Satin-smooth surface", "Hair-friendly", "Moisture retaining", "Set of 2", "Colour-fast"]
    },
    {
      id: "vh-a003",
      category: "accessories",
      name: "Velvet Hug 3D Contoured Sleep Mask",
      collection: "Foundation",
      tagline: "Darkness, on your terms.",
      sizes: ["One Size"],
      materials: ["Microfiber"],
      firmness: null,
      basePrice: 490,
      mrp: 690,
      discount: 29,
      emi: null,
      badge: "bestseller",
      badgeLabel: "Gift Pick",
      tags: ["sleep-mask", "travel", "gift"],
      rating: 4.6,
      reviews: 2800,
      doctorRecommended: false,
      image: "/src/assets/images/acc_mask.jpg",
      description: "Zero eye pressure 3D eye cavities. 100% light blockout with adjustable strap.",
      features: ["3D contoured", "Zero eye pressure", "Lavender infused", "Adjustable strap", "Travel pouch included"]
    },
    {
      id: "vh-a004",
      category: "accessories",
      name: "Dream Diffuser & Lavender Mist Set",
      collection: "Signature",
      tagline: "Scent the last waking breath.",
      sizes: ["One Size"],
      materials: ["Ceramic"],
      firmness: null,
      basePrice: 1600,
      mrp: 2200,
      discount: 27,
      emi: null,
      badge: "new",
      badgeLabel: "Aromatherapy",
      tags: ["aromatherapy", "diffuser", "wellness"],
      rating: 4.8,
      reviews: 560,
      doctorRecommended: false,
      image: "/src/assets/images/acc_diffuser.jpg",
      description: "Cold-mist ultrasonic ceramic diffuser with French lavender and chamomile botanical oils.",
      features: ["Cold mist ultrasonic", "4 timer modes", "Ceramic housing", "LED ambient nightlight", "Organic essential oil bottle"]
    }
  ];
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "What is your primary sleeping position?",
      subtitle: "Your sleep position dictates the angle of your lumbar spine and pressure zones.",
      options: [
        {
          id: "side",
          label: "Side Sleeper",
          desc: "Need contouring around shoulders and hips to keep spine straight",
          icon: "user-check",
          points: { Reserve: 3, ReservePlus: 3, Signature: 2, Essential: 0 }
        },
        {
          id: "back",
          label: "Back Sleeper",
          desc: "Need gentle lumbar curve support without sagging into the bed",
          icon: "arrow-up",
          points: { Signature: 3, Essential: 2, Reserve: 2, ReservePlus: 1 }
        },
        {
          id: "stomach",
          label: "Stomach Sleeper",
          desc: "Need firmer support to prevent hyperextension of lower back",
          icon: "compass",
          points: { Essential: 3, Signature: 2, Reserve: 1, ReservePlus: 0 }
        },
        {
          id: "combo",
          label: "Combination (Toss & Turn)",
          desc: "Need responsive elasticity and zero partner motion transfer",
          icon: "refresh-cw",
          points: { Reserve: 3, ReservePlus: 3, Signature: 2, Essential: 1 }
        }
      ]
    },
    {
      id: 2,
      question: "Do you experience any of these sleep discomforts?",
      subtitle: "Select your most noticeable issue when you wake up in the morning.",
      options: [
        {
          id: "lower-back",
          label: "Lower Back & Lumbar Ache",
          desc: "Waking up with morning stiffness or disc pressure",
          icon: "activity",
          points: { ReservePlus: 3, Signature: 3, Essential: 1, Reserve: 2 }
        },
        {
          id: "partner-motion",
          label: "Disturbed by Partner Tossing",
          desc: "Every movement wakes you from deep REM sleep",
          icon: "users",
          points: { Reserve: 4, ReservePlus: 4, Signature: 1, Essential: 0 }
        },
        {
          id: "sleep-hot",
          label: "Sleeping Hot & Sweating",
          desc: "Trapped body heat in humid or warm weather",
          icon: "sun",
          points: { ReservePlus: 3, Reserve: 3, Signature: 2, Essential: 1 }
        },
        {
          id: "no-pain",
          label: "No Pain — Seeking Pure Luxury & Health",
          desc: "Upgrading to a hotel-grade five-star sleep sanctuary",
          icon: "star",
          points: { ReservePlus: 4, Reserve: 3, Signature: 2, Essential: 1 }
        }
      ]
    },
    {
      id: 3,
      question: "What feel do you naturally prefer in a mattress?",
      subtitle: "From a deep sinking velvet hug to firm orthopedic pushback.",
      options: [
        {
          id: "plush-soft",
          label: "Plush & Cloud-Like (3-4/10)",
          desc: "Cradling embrace with gentle sinking softness",
          icon: "cloud",
          points: { ReservePlus: 3, Reserve: 2, Signature: 1, Essential: 0 }
        },
        {
          id: "medium-firm",
          label: "Medium Firm — The Golden Equilibrium (6-7/10)",
          desc: "85% of people sleep best here — soft top with deep support",
          icon: "check-circle",
          points: { Signature: 3, Reserve: 3, ReservePlus: 2, Essential: 2 }
        },
        {
          id: "ortho-firm",
          label: "Ortho Firm (8-9/10)",
          desc: "Solid, rigid surface for strong orthopedic spinal discipline",
          icon: "shield",
          points: { Essential: 3, Signature: 2, Reserve: 0, ReservePlus: 0 }
        }
      ]
    },
    {
      id: 4,
      question: "Who will be sleeping on this mattress?",
      subtitle: "Helps calculate weight distribution and edge durability requirements.",
      options: [
        {
          id: "couple",
          label: "Two Adults (Couple)",
          desc: "Requires zero-motion isolation and reinforced edge sitting support",
          icon: "heart",
          points: { Reserve: 3, ReservePlus: 3, Signature: 1, Essential: 0 }
        },
        {
          id: "single-adult",
          label: "Single Adult / Professional",
          desc: "Personalized muscle recovery and everyday ergonomic vitality",
          icon: "user",
          points: { Signature: 3, Essential: 2, Reserve: 2, ReservePlus: 1 }
        },
        {
          id: "parents-seniors",
          label: "Elderly Parents / Seniors (60+)",
          desc: "Doctor-certified joint relief and easy edge egress",
          icon: "feather",
          points: { Signature: 3, Essential: 3, Reserve: 1, ReservePlus: 1 }
        },
        {
          id: "kids-teens",
          label: "Kids or Teenagers",
          desc: "Spine growth support with hygienic hypoallergenic materials",
          icon: "smile",
          points: { Essential: 3, Signature: 2, Reserve: 0, ReservePlus: 0 }
        }
      ]
    }
  ];
  function calculateQuizRecommendation(answers) {
    const scores = {
      Essential: 0,
      Signature: 0,
      Reserve: 0,
      ReservePlus: 0
    };
    answers.forEach((ans, index) => {
      const question = QUIZ_QUESTIONS[index];
      if (!question) return;
      const option = question.options.find((o) => o.id === ans);
      if (option && option.points) {
        Object.keys(option.points).forEach((tier) => {
          scores[tier] += option.points[tier];
        });
      }
    });
    let highestTier = "Signature";
    let maxScore = -1;
    Object.keys(scores).forEach((tier) => {
      if (scores[tier] > maxScore) {
        maxScore = scores[tier];
        highestTier = tier;
      }
    });
    const tierDetails = {
      ReservePlus: {
        tierName: `Reserve+ — The Founder's Edition (12")`,
        productId: "vh-reserve-plus",
        price: "₹58,999",
        mrp: "₹84,999",
        discount: "30% OFF Festive Deal",
        whyRecommended: 'Based on your desire for zero motion disturbance, luxurious pressure relief, and ultimate temperature cooling, the 12" Reserve+ with 7-Zone Microcoils and Organic Latex is your definitive sleep companion.',
        doctorNote: 'Dr. Alok Verma says: "The Reserve+ provides maximum spinal decompression and REM cycle continuity."'
      },
      Reserve: {
        tierName: 'Reserve — The Complete Experience (10")',
        productId: "vh-reserve-10",
        price: "₹38,999",
        mrp: "₹54,999",
        discount: "29% OFF Festive Deal",
        whyRecommended: "Your profile matches the perfect balance of independent pocket springs and natural latex elasticity. Zero partner disturbance with cooling bamboo airflow.",
        doctorNote: 'Dr. Manan Vora says: "Ideal for active individuals and couples seeking joint relief and ergonomic spinal posture."'
      },
      Signature: {
        tierName: 'Signature — The Deeper Embrace (8")',
        productId: "vh-signature-8",
        price: "₹24,999",
        mrp: "₹35,999",
        discount: "30% OFF Festive Deal",
        whyRecommended: "The dual-layer Natural Latex + Adaptive Memory Foam provides balanced contouring and healthy spinal alignment for back & side sleepers alike.",
        doctorNote: "Recommended for everyday posture protection and morning energy."
      },
      Essential: {
        tierName: 'Essential — The Everyday Hug (6")',
        productId: "vh-essential-6",
        price: "₹12,999",
        mrp: "₹18,999",
        discount: "31% OFF Everyday Deal",
        whyRecommended: "High-density orthopedic Aerocell foam gives you reliable anti-sag firm support at an unbeatable value. Lightweight and easy to set up.",
        doctorNote: "A solid, durable orthopedic foundation recommended for healthy spinal discipline."
      }
    };
    return tierDetails[highestTier] || tierDetails.Signature;
  }
  class MattressVisualizer3D {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      this.options = options;
      this.isExploded = false;
      this.autoRotate = true;
      this.activeLayerIndex = 0;
      this.currentMattress = options.mattress || null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.layersGroup = null;
      this.layerMeshes = [];
      this.targetLayerPositions = [];
      this.isMouseDown = false;
      this.prevMouseX = 0;
      this.prevMouseY = 0;
      this.targetRotationY = 0.5;
      this.targetRotationX = 0.35;
      this.init();
    }
    init() {
      if (typeof THREE === "undefined") {
        console.warn("Three.js not loaded. Loading fallback canvas...");
        this.renderFallback();
        return;
      }
      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 480;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1e3);
      this.camera.position.set(0, 4.2, 8.8);
      this.camera.lookAt(0, 0, 0);
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.container.innerHTML = "";
      this.container.appendChild(this.renderer.domElement);
      const ambientLight = new THREE.AmbientLight(16777215, 1.2);
      this.scene.add(ambientLight);
      const dirLight1 = new THREE.DirectionalLight(16777215, 1.4);
      dirLight1.position.set(5, 12, 8);
      dirLight1.castShadow = true;
      this.scene.add(dirLight1);
      const purpleFillLight = new THREE.DirectionalLight(14538494, 0.8);
      purpleFillLight.position.set(-6, 2, -6);
      this.scene.add(purpleFillLight);
      const softPointLight = new THREE.PointLight(8141549, 0.8, 12);
      softPointLight.position.set(0, 4, 3);
      this.scene.add(softPointLight);
      this.createMattressLayers();
      this.bindEvents();
      this.animate();
    }
    createMattressLayers() {
      if (this.layersGroup) {
        this.scene.remove(this.layersGroup);
      }
      this.layersGroup = new THREE.Group();
      this.layerMeshes = [];
      this.targetLayerPositions = [];
      const matWidth = 5.2;
      const matLength = 4.2;
      const layerDefs = [
        {
          name: "Top Quilted Cool-Touch Damask",
          height: 0.28,
          color: 16777215,
          roughness: 0.25,
          metalness: 0.05,
          yBase: 0.8,
          yExploded: 1.9,
          desc: "Belgian silk-infused quilted fabric with diamond thermoregulation"
        },
        {
          name: "100% Organic Natural Pin-Core Latex",
          height: 0.45,
          color: 16710083,
          roughness: 0.6,
          metalness: 0.02,
          yBase: 0.45,
          yExploded: 1.1,
          desc: "Sri Lankan organic latex with hundreds of microscopic breathing channels"
        },
        {
          name: "Cryo-Gel Adaptive Memory Foam",
          height: 0.4,
          color: 10980346,
          roughness: 0.45,
          metalness: 0.1,
          yBase: 0.05,
          yExploded: 0.3,
          desc: "Thermoreactive adaptive purple memory foam for lumbar pressure contouring"
        },
        {
          name: "7-Zone Pocket Coil Spring Core",
          height: 0.7,
          color: 7041664,
          roughness: 0.2,
          metalness: 0.85,
          yBase: -0.5,
          yExploded: -0.6,
          isCoilGrid: true,
          desc: "1200+ individually encased tempered carbon steel coils for zero partner motion"
        },
        {
          name: "High-Density Orthopedic Foundation",
          height: 0.5,
          color: 3868516,
          roughness: 0.7,
          metalness: 0.1,
          yBase: -1.1,
          yExploded: -1.6,
          desc: "Deep royal purple high-resilience Aerocell anti-sag foundation"
        }
      ];
      layerDefs.forEach((def, index) => {
        let mesh;
        if (def.isCoilGrid) {
          mesh = new THREE.Group();
          const coilGeo = new THREE.CylinderGeometry(0.14, 0.14, def.height, 12);
          const coilMat = new THREE.MeshStandardMaterial({
            color: def.color,
            metalness: def.metalness,
            roughness: def.roughness
          });
          for (let x = -2.2; x <= 2.2; x += 0.45) {
            for (let z = -1.7; z <= 1.7; z += 0.45) {
              const coil = new THREE.Mesh(coilGeo, coilMat);
              coil.position.set(x, 0, z);
              mesh.add(coil);
            }
          }
        } else {
          const geometry = new THREE.BoxGeometry(matWidth, def.height, matLength, 8, 4, 8);
          const material = new THREE.MeshStandardMaterial({
            color: def.color,
            roughness: def.roughness,
            metalness: def.metalness
          });
          mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
        mesh.position.y = def.yBase;
        mesh.userData = { ...def, index };
        this.layersGroup.add(mesh);
        this.layerMeshes.push(mesh);
        this.targetLayerPositions.push({
          base: def.yBase,
          exploded: def.yExploded
        });
      });
      this.scene.add(this.layersGroup);
    }
    setExplodedMode(exploded) {
      this.isExploded = exploded;
    }
    setAutoRotate(auto) {
      this.autoRotate = auto;
    }
    bindEvents() {
      const el = this.renderer.domElement;
      el.addEventListener("mousedown", (e) => {
        this.isMouseDown = true;
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;
      });
      window.addEventListener("mouseup", () => {
        this.isMouseDown = false;
      });
      window.addEventListener("mousemove", (e) => {
        if (!this.isMouseDown) return;
        const deltaX = e.clientX - this.prevMouseX;
        const deltaY = e.clientY - this.prevMouseY;
        this.targetRotationY += deltaX * 8e-3;
        this.targetRotationX += deltaY * 8e-3;
        this.targetRotationX = Math.max(-0.5, Math.min(0.9, this.targetRotationX));
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;
      });
      el.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          this.isMouseDown = true;
          this.prevMouseX = e.touches[0].clientX;
          this.prevMouseY = e.touches[0].clientY;
        }
      });
      window.addEventListener("touchend", () => {
        this.isMouseDown = false;
      });
      window.addEventListener("touchmove", (e) => {
        if (!this.isMouseDown || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - this.prevMouseX;
        const deltaY = e.touches[0].clientY - this.prevMouseY;
        this.targetRotationY += deltaX * 8e-3;
        this.targetRotationX += deltaY * 8e-3;
        this.prevMouseX = e.touches[0].clientX;
        this.prevMouseY = e.touches[0].clientY;
      });
      window.addEventListener("resize", () => {
        if (!this.container || !this.renderer || !this.camera) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      });
    }
    animate() {
      requestAnimationFrame(() => this.animate());
      if (this.autoRotate && !this.isMouseDown) {
        this.targetRotationY += 25e-4;
      }
      if (this.layersGroup) {
        this.layersGroup.rotation.y += (this.targetRotationY - this.layersGroup.rotation.y) * 0.08;
        this.layersGroup.rotation.x += (this.targetRotationX - this.layersGroup.rotation.x) * 0.08;
        this.layerMeshes.forEach((mesh, idx) => {
          const targetY = this.isExploded ? this.targetLayerPositions[idx].exploded : this.targetLayerPositions[idx].base;
          mesh.position.y += (targetY - mesh.position.y) * 0.12;
        });
      }
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
    renderFallback() {
      this.container.innerHTML = `
      <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
        <img src="/images/crosssection-layers.jpg" style="width:100%; height:100%; object-fit:cover;" alt="3D Anatomical Layers">
      </div>
    `;
    }
  }
  const FILTER_OPTIONS = {
    sizes: [
      { id: "Single", label: "Single (72x36)" },
      { id: "Double", label: "Double (72x48)" },
      { id: "Queen", label: "Queen (78x60)" },
      { id: "King", label: "King (78x72)" }
    ],
    materials: [
      { id: "Organic Latex", label: "100% Hevea Latex" },
      { id: "Pocket Springs", label: "7-Zone Pocket Springs" },
      { id: "Memory Foam", label: "Adaptive Gel Memory Foam" },
      { id: "Orthopedic Aerocell", label: "High-Density Ortho Foam" }
    ],
    firmness: [
      { id: "Soft", label: "Soft (Cloud)" },
      { id: "Medium Soft", label: "Medium Soft" },
      { id: "Medium", label: "Medium (Balanced)" },
      { id: "Medium Firm", label: "Medium Firm (Spine Care)" },
      { id: "Firm", label: "Firm (Ortho)" }
    ],
    tiers: [
      { id: "Foundation", label: 'Foundation (6"-8")' },
      { id: "Signature", label: 'Signature (8"-10")' },
      { id: "Reserve", label: 'Reserve (10"-12")' }
    ],
    ageGroups: [
      { id: "Youth", label: "Youth & Young Adults" },
      { id: "Adults", label: "Working Professionals" },
      { id: "Seniors", label: "Seniors & Joint Care" }
    ],
    packaging: [
      { id: "Bed-in-a-Box", label: "Compressed Bed-in-a-Box" },
      { id: "Flat-Packed", label: "Full Luxury Flat Delivery" }
    ]
  };
  const FESTIVAL_PROMOS = [
    {
      id: "festive-40",
      title: "Festive Grand Launch Offer",
      code: "FESTIVE40",
      discount: "40% OFF",
      subtitle: "Flat 40% OFF on all Reserve & Signature mattresses + 2 Free Pillows",
      isActive: true,
      endsAt: Date.now() + 864e5 * 3
    }
  ];
  const FOUNDING_PARTNERS_DATA = {
    currentCount: 848
  };
  const REST_AMBASSADORS_TIERS = [
    { referralsNeeded: "1 Referral", tier: "Silver Rest Ambassador", reward: "₹2,000 Cash Reward", perk: "Custom referral discount code + Velvet Hug Bamboo Pillow." },
    { referralsNeeded: "3 Referrals", tier: "Gold Rest Ambassador", reward: "₹7,500 Cash Reward", perk: "VIP early access to new collections + Organic Cotton Bedding Set." },
    { referralsNeeded: "5+ Referrals", tier: "Platinum Sleep Luminary", reward: "₹15,000 Cash Reward", perk: "15% lifetime brand commission + Founder Circle badge." }
  ];
  const state = {
    activeCategory: "all",
    filters: {
      sizes: [],
      materials: [],
      firmness: [],
      tiers: [],
      ageGroups: [],
      packaging: []
    },
    compareList: [],
    cart: [
      {
        product: PRODUCTS[0],
        // Reserve+ Default
        size: 'Queen (78" x 60")',
        thickness: "12 Inches",
        quantity: 1
      }
    ],
    appliedCoupon: null,
    activePromo: FESTIVAL_PROMOS[0],
    quizCurrentStep: 0,
    quizAnswers: [],
    visualizerInstance: null,
    activePDPProduct: null,
    checkoutStep: 1,
    checkoutData: {
      name: "Sanjeev Kumar",
      phone: "9876543210",
      email: "sanjeev@example.com",
      address: "Flat 402, Royal Palms Heights, Indiranagar",
      pincode: "560038",
      city: "Bengaluru",
      state: "Karnataka",
      paymentMethod: "upi",
      emiTenure: 12
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    initPromoBanner();
    initSearchEngine();
    initCategories();
    initFilterControls();
    renderProducts();
    init3DVisualizer();
    initPDPModal();
    initQuiz();
    initDoctorConsult();
    initFoundingCounter();
    initAmbassadors();
    initB2BPortals();
    initCartDrawer();
    initCheckoutFlow();
    initCompareDrawer();
    initCustomSizeModal();
    initWhatsAppWidget();
  });
  function initPromoBanner() {
    const bannerWrap = document.getElementById("promoTopbar");
    if (!bannerWrap) return;
    const promo = state.activePromo;
    if (!promo || false) {
      bannerWrap.style.display = "none";
      return;
    }
    function updateCountdown() {
      const end = new Date(promo.endDate).getTime();
      const now = (/* @__PURE__ */ new Date()).getTime();
      const diff = end - now;
      if (diff <= 0) {
        const timerEl2 = document.getElementById("promoCountdown");
        if (timerEl2) timerEl2.textContent = "Offer Expiring Soon";
        return;
      }
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
      const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
      const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
      const timerEl = document.getElementById("promoCountdown");
      if (timerEl) {
        timerEl.innerHTML = `${days}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1e3);
    window.copyPromoCoupon = function(code) {
      navigator.clipboard.writeText(code);
      applyCouponCode(code);
      showToast(`Coupon "${code}" applied. 40% Festive Discount active.`);
    };
    window.closePromoBanner = function() {
      bannerWrap.style.display = "none";
    };
  }
  function initSearchEngine() {
    window.openSearchModal = function() {
      const modal = document.getElementById("searchModal");
      if (modal) {
        modal.classList.add("active");
        const input = document.getElementById("searchModalInput");
        if (input) {
          input.focus();
          searchProducts(input.value);
        }
      }
    };
    window.closeSearchModal = function() {
      const modal = document.getElementById("searchModal");
      if (modal) modal.classList.remove("active");
    };
    window.searchProducts = function(query) {
      const container = document.getElementById("searchResultsContainer");
      if (!container) return;
      const q = (query || "").toLowerCase().trim();
      if (!q) {
        const popular = PRODUCTS.slice(0, 4);
        container.innerHTML = popular.map((p) => renderSearchResultItem(p)).join("");
        return;
      }
      const results = PRODUCTS.filter((p) => {
        return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.materials && p.materials.some((m) => m.toLowerCase().includes(q)) || p.tier && p.tier.toLowerCase().includes(q) || p.firmness && p.firmness.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      });
      if (results.length === 0) {
        container.innerHTML = `
        <div style="text-align:center; padding:30px; color:#786C8D;">
          <p>No mattresses matching "<strong>${query}</strong>"</p>
          <button class="btn btn-outline" style="margin-top:10px;" onclick="searchProducts('')">View All Models</button>
        </div>
      `;
        return;
      }
      container.innerHTML = results.map((p) => renderSearchResultItem(p)).join("");
    };
    function renderSearchResultItem(product) {
      return `
      <div class="search-result-item" onclick="openProductDetail('${product.id}'); closeSearchModal();">
        <img src="${product.heroImage}" class="search-result-img" alt="${product.title}" />
        <div>
          <h4 style="font-size:0.95rem; margin-bottom:2px; color:var(--purple-950);">${product.title}</h4>
          <div style="font-size:0.78rem; color:var(--purple-600);">${product.height || "Luxury Profile"} · ${product.firmness}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:700; color:var(--purple-950); font-size:1.05rem;">₹${product.price.toLocaleString("en-IN")}</div>
          <span class="badge-purple" style="font-size:0.65rem;">View</span>
        </div>
      </div>
    `;
    }
  }
  function initCategories() {
    const coreGrid = document.getElementById("coreCategoriesGrid");
    const accGrid = document.getElementById("accCategoriesGrid");
    if (coreGrid) {
      coreGrid.innerHTML = CATEGORIES.CORE.map((cat) => `
      <div class="category-card" onclick="filterByCategory('${cat.id}')">
        <div class="category-card-icon">
          ${getCategorySVG(cat.icon)}
        </div>
        <h4 class="category-card-title">${cat.name}</h4>
        <span class="category-card-count">${cat.desc}</span>
      </div>
    `).join("");
    }
    if (accGrid) {
      accGrid.innerHTML = CATEGORIES.ACCESSORIES.map((acc) => `
      <div class="category-card" onclick="filterByCategory('${acc.slug}')">
        <div class="category-card-icon" style="width:44px; height:44px;">
          ${getCategorySVG(acc.icon)}
        </div>
        <h5 class="category-card-title" style="font-size:0.92rem;">${acc.name}</h5>
        <span class="category-card-count">${acc.count} Items</span>
      </div>
    `).join("");
    }
    window.filterByCategory = function(catId) {
      state.activeCategory = catId;
      const catTitle = document.getElementById("catalogHeading");
      if (catTitle) {
        catTitle.textContent = catId === "all" ? "All Sleep Products" : `Category: ${catId.replace("-", " ").toUpperCase()}`;
      }
      renderProducts();
      const catalogEl = document.getElementById("productsSection");
      if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
    };
  }
  function getCategorySVG(iconName) {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>`;
  }
  function initFilterControls() {
    const filterContainer = document.getElementById("filterAxesGrid");
    if (!filterContainer) return;
    filterContainer.innerHTML = `
    <!-- Axis 1: Size -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>1. Size Profile</span>
        <button class="custom-size-btn" onclick="openCustomSizeModal()">Custom Size Calculator</button>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.sizes.map((s) => `
          <button class="filter-chip ${state.filters.sizes.includes(s.id) ? "active" : ""}" 
                  onclick="toggleFilter('sizes', '${s.id}', this)">
            ${s.label}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Axis 2: Material -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>2. Material Composition</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.materials.map((m) => `
          <button class="filter-chip ${state.filters.materials.includes(m.id) ? "active" : ""}" 
                  onclick="toggleFilter('materials', '${m.id}', this)">
            ${m.label}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Axis 3: Firmness -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>3. Firmness Rating</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.firmness.map((f) => `
          <button class="filter-chip ${state.filters.firmness.includes(f.id) ? "active" : ""}" 
                  onclick="toggleFilter('firmness', '${f.id}', this)">
            ${f.label}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Axis 4: Product Tier / Height -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>4. Product Tier</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.tiers.map((t) => `
          <button class="filter-chip ${state.filters.tiers.includes(t.id) ? "active" : ""}" 
                  onclick="toggleFilter('tiers', '${t.id}', this)">
            ${t.label}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Axis 5: Age Group -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>5. Life Stage</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.ageGroups.map((a) => `
          <button class="filter-chip ${state.filters.ageGroups.includes(a.id) ? "active" : ""}" 
                  onclick="toggleFilter('ageGroups', '${a.id}', this)">
            ${a.label}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Axis 6: Packaging -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>6. Delivery Packaging</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.packaging.map((p) => `
          <button class="filter-chip ${state.filters.packaging.includes(p.id) ? "active" : ""}" 
                  onclick="toggleFilter('packaging', '${p.id}', this)">
            ${p.label}
          </button>
        `).join("")}
      </div>
    </div>
  `;
    window.toggleFilter = function(axis, value, buttonEl) {
      const list = state.filters[axis];
      const index = list.indexOf(value);
      if (index > -1) {
        list.splice(index, 1);
        buttonEl.classList.remove("active");
      } else {
        list.push(value);
        buttonEl.classList.add("active");
      }
      renderProducts();
    };
    window.clearAllFilters = function() {
      state.activeCategory = "all";
      Object.keys(state.filters).forEach((k) => state.filters[k] = []);
      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      renderProducts();
    };
  }
  function renderProducts() {
    const container = document.getElementById("productsGridContainer");
    const countEl = document.getElementById("filteredCountBadge");
    if (!container) return;
    const filtered = PRODUCTS.filter((p) => {
      if (state.activeCategory !== "all") {
        if (p.category !== state.activeCategory && p.accessoryType !== state.activeCategory) {
          return false;
        }
      }
      if (state.filters.sizes.length > 0) {
        if (!p.sizes || !p.sizes.some((s) => state.filters.sizes.includes(s))) return false;
      }
      if (state.filters.materials.length > 0) {
        if (!p.materials || !p.materials.some((m) => state.filters.materials.includes(m))) return false;
      }
      if (state.filters.firmness.length > 0) {
        if (!state.filters.firmness.includes(p.firmness)) return false;
      }
      if (state.filters.tiers.length > 0) {
        if (!state.filters.tiers.includes(p.tier)) return false;
      }
      if (state.filters.ageGroups.length > 0) {
        if (!p.ageGroups || !p.ageGroups.some((a) => state.filters.ageGroups.includes(a))) return false;
      }
      if (state.filters.packaging.length > 0) {
        if (!p.packaging || !p.packaging.some((pkg) => state.filters.packaging.includes(pkg))) return false;
      }
      return true;
    });
    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} Models`;
    }
    if (filtered.length === 0) {
      container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; background:var(--purple-50); border-radius:16px; border:1px solid var(--purple-200);">
        <h3 style="margin-bottom:12px; color:var(--purple-950);">No exact mattress matched all selected criteria</h3>
        <p style="margin-bottom:24px; color:var(--text-secondary);">Try clearing one or two filter criteria or consult our spine specialist on WhatsApp.</p>
        <button class="btn btn-primary" onclick="clearAllFilters()">Reset All Filters</button>
      </div>
    `;
      return;
    }
    container.innerHTML = filtered.map((product) => {
      const isCompared = state.compareList.some((c) => c.id === product.id);
      const emiMonthly = Math.round(product.price / 12).toLocaleString("en-IN");
      return `
      <div class="product-card" id="card-${product.id}">
        <div class="card-badge-container">
          ${product.badge ? `<span class="badge-purple-solid">${product.badge}</span>` : ""}
          ${product.isFestivalDeal ? `<span class="badge-purple">Festive Special</span>` : ""}
        </div>

        <div class="product-card-media" onclick="openProductDetail('${product.id}')">
          <img src="${product.heroImage}" alt="${product.title}" loading="lazy" />
          <button class="card-floating-3d-btn" onclick="event.stopPropagation(); inspectIn3D('${product.id}')">
            <span>3D Layer View</span>
          </button>
        </div>

        <div class="product-card-body">
          <div class="card-tier-height">
            <span>${product.height ? `${product.height} Height` : "Velvet Hug"}</span>
            <span>★ ${product.rating} (${product.reviewCount})</span>
          </div>

          <h3 class="card-product-title" onclick="openProductDetail('${product.id}')">${product.title}</h3>
          
          ${product.firmnessScore ? `
            <div class="card-firmness-meter">
              <div class="meter-header">
                <span>Firmness: <strong>${product.firmness}</strong></span>
                <span>${product.firmnessScore}/10</span>
              </div>
              <div class="meter-bar-track">
                <div class="meter-bar-fill" style="width: ${product.firmnessScore * 10}%"></div>
              </div>
            </div>
          ` : ""}

          ${product.doctorEndorsement && product.doctorEndorsement.endorsed ? `
            <div class="card-doctor-pill" onclick="openDoctorModal('${product.id}')">
              <span>Doctor Endorsed · Consult on WhatsApp</span>
            </div>
          ` : ""}

          <div class="card-price-row">
            <span class="card-current-price">₹${product.price.toLocaleString("en-IN")}</span>
            <span class="card-original-price">₹${product.originalPrice.toLocaleString("en-IN")}</span>
            <span class="card-discount-tag">${product.discountPercentage}% OFF</span>
          </div>

          <div class="card-emi-text">
            No Cost EMI from <strong>₹${emiMonthly}/mo</strong> · 100 Nights Trial
          </div>

          <div class="card-footer-actions">
            <label class="compare-checkbox-label" title="Compare side by side">
              <input type="checkbox" ${isCompared ? "checked" : ""} onchange="toggleCompareItem('${product.id}', this.checked)" />
              <span>Compare</span>
            </label>
            <button class="btn btn-primary" onclick="quickAddToCart('${product.id}')">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    `;
    }).join("");
  }
  function initPDPModal() {
    window.openProductDetail = function(productId) {
      var _a;
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      state.activePDPProduct = product;
      const modal = document.getElementById("pdpModal");
      const body = document.getElementById("pdpModalBody");
      if (!modal || !body) return;
      const emiMonthly = Math.round(product.price / 12).toLocaleString("en-IN");
      body.innerHTML = `
      <div class="pdp-modal-content">
        <button class="modal-close-icon" onclick="closeProductDetail()">&times;</button>
        
        <!-- Left: Visuals & 3D -->
        <div>
          <div class="pdp-gallery-main">
            <img id="pdpMainImage" src="${product.heroImage}" alt="${product.title}" />
          </div>
          <div style="display:flex; gap:10px; margin-bottom:16px;">
            <button class="btn btn-secondary" style="width:100%; padding:10px;" onclick="closeProductDetail(); inspectIn3D('${product.id}');">
              Inspect 3D Anatomical Layers
            </button>
          </div>

          ${((_a = product.doctorEndorsement) == null ? void 0 : _a.endorsed) ? `
            <div style="background:var(--accent-emerald-light); border:1px solid rgba(5,150,105,0.25); border-radius:10px; padding:14px; margin-top:14px;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; color:var(--accent-emerald); font-weight:700; font-size:0.85rem;">
                <span>Clinical Recommendation · ${product.doctorEndorsement.doctorName}</span>
              </div>
              <p style="font-size:0.8rem; color:#2E1065; font-style:italic; margin-bottom:8px;">
                "${product.doctorEndorsement.quote}"
              </p>
              <button class="btn btn-whatsapp" style="width:100%; padding:8px; font-size:0.8rem;" onclick="openDoctorModal('${product.id}')">
                Ask Dr. Verma on WhatsApp
              </button>
            </div>
          ` : ""}
        </div>

        <!-- Right: Specs & Purchasing -->
        <div>
          <div class="card-badge-container" style="position:static; margin-bottom:8px;">
            ${product.badge ? `<span class="badge-purple-solid">${product.badge}</span>` : ""}
            <span class="badge-emerald">100 Nights Trial</span>
          </div>

          <h2 style="font-size:1.6rem; color:var(--purple-950); margin-bottom:4px;">${product.title}</h2>
          <div style="color:var(--purple-600); font-size:0.85rem; margin-bottom:12px; font-weight:600;">${product.tagline || ""}</div>

          <div class="card-price-row" style="margin-bottom:12px;">
            <span class="card-current-price" style="font-size:1.6rem;">₹${product.price.toLocaleString("en-IN")}</span>
            <span class="card-original-price" style="font-size:1.1rem;">₹${product.originalPrice.toLocaleString("en-IN")}</span>
            <span class="card-discount-tag" style="font-size:0.9rem;">${product.discountPercentage}% OFF</span>
          </div>

          <!-- Dimension Selector -->
          <div class="pdp-option-group">
            <div class="pdp-option-title">
              <span>Select Dimension:</span>
              <a href="javascript:void(0)" onclick="openCustomSizeModal()" style="color:var(--purple-700); font-size:0.78rem; text-decoration:underline;">Custom Dimensions?</a>
            </div>
            <div class="pdp-size-chips">
              ${(product.sizes || ['Queen (78" x 60")']).map((s, i) => `
                <button class="pdp-chip-btn ${i === 0 ? "active" : ""}" onclick="selectPDPSize(this, '${s}')">${s}</button>
              `).join("")}
            </div>
          </div>

          <!-- Delivery PIN Code Checker -->
          <div style="background:var(--purple-50); padding:12px; border-radius:8px; border:1px solid var(--purple-100); margin-bottom:16px;">
            <div style="font-size:0.78rem; color:var(--purple-950); font-weight:600; margin-bottom:4px;">Check Express Delivery (19,000+ PIN Codes):</div>
            <div style="display:flex; gap:6px;">
              <input type="text" id="pdpPincodeInput" placeholder="Enter PIN (e.g. 560038)" value="560038" maxlength="6" style="padding:6px 10px; font-size:0.82rem; flex-grow:1;" />
              <button class="btn btn-outline" style="padding:6px 12px; font-size:0.78rem;" onclick="checkPDPPincode()">Verify</button>
            </div>
            <div id="pdpPincodeStatus" style="font-size:0.75rem; color:var(--accent-emerald); margin-top:4px;">
              Free Express Delivery in 3 Days to Bengaluru (560038)
            </div>
          </div>

          <!-- No-Cost EMI Card -->
          <div style="background:var(--purple-50); border:1px solid var(--purple-200); border-radius:8px; padding:10px 14px; margin-bottom:20px;">
            <div style="font-size:0.82rem; font-weight:700; color:var(--purple-900); margin-bottom:2px;">No Cost EMI Available</div>
            <div style="font-size:0.78rem; color:var(--text-secondary);">
              From <strong>₹${emiMonthly}/month</strong> on HDFC, ICICI, SBI & Bajaj Finserv cards.
            </div>
          </div>

          <!-- Actions -->
          <div style="display:flex; gap:10px;">
            <button class="btn btn-secondary" style="flex:1; padding:12px;" onclick="quickAddToCart('${product.id}'); closeProductDetail();">
              Add to Bag
            </button>
            <button class="btn btn-primary" style="flex:1; padding:12px;" onclick="quickBuyNow('${product.id}')">
              Instant Buy Now
            </button>
          </div>
        </div>
      </div>
    `;
      modal.classList.add("active");
    };
    window.closeProductDetail = function() {
      const modal = document.getElementById("pdpModal");
      if (modal) modal.classList.remove("active");
    };
    window.selectPDPSize = function(btn, size) {
      document.querySelectorAll(".pdp-chip-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      showToast(`Selected size: ${size}`);
    };
    window.checkPDPPincode = function() {
      const input = document.getElementById("pdpPincodeInput");
      const status = document.getElementById("pdpPincodeStatus");
      if (!input || !status) return;
      if (input.value.trim().length === 6) {
        status.innerHTML = `<span style="color:var(--accent-emerald);">Free Express Delivery in 3-4 Days to PIN ${input.value}</span>`;
      } else {
        status.innerHTML = `<span style="color:#DC2626;">Please enter a valid 6-digit PIN code</span>`;
      }
    };
    window.quickBuyNow = function(productId) {
      quickAddToCart(productId);
      closeProductDetail();
      closeCartDrawer();
      openCheckoutModal();
    };
  }
  function init3DVisualizer() {
    const canvasEl = document.getElementById("mattress3dCanvas");
    if (!canvasEl) return;
    state.visualizerInstance = new MattressVisualizer3D("mattress3dCanvas", {
      mattress: PRODUCTS[0]
    });
    window.set3DViewMode = function(mode) {
      document.querySelectorAll(".btn-view-mode").forEach((b) => b.classList.remove("active"));
      if (event && event.currentTarget) event.currentTarget.classList.add("active");
      if (state.visualizerInstance) {
        if (mode === "exploded") {
          state.visualizerInstance.setExplodedMode(true);
        } else {
          state.visualizerInstance.setExplodedMode(false);
        }
      }
    };
    window.toggle3DRotation = function() {
      const btn = document.getElementById("btnToggleRotate");
      if (state.visualizerInstance) {
        const newState = !state.visualizerInstance.autoRotate;
        state.visualizerInstance.setAutoRotate(newState);
        if (btn) btn.classList.toggle("active", newState);
      }
    };
    window.inspectIn3D = function(productId) {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      const vizSection = document.getElementById("3dVisualizerSection");
      if (vizSection) {
        vizSection.scrollIntoView({ behavior: "smooth" });
        if (state.visualizerInstance) {
          state.visualizerInstance.setExplodedMode(true);
        }
        showToast(`Inspecting ${product.title} in 3D exploded view.`);
      }
    };
  }
  function initQuiz() {
    window.openQuizModal = function() {
      state.quizCurrentStep = 0;
      state.quizAnswers = [];
      const modal = document.getElementById("quizModal");
      if (modal) modal.classList.add("active");
      renderQuizStep();
    };
    window.closeQuizModal = function() {
      const modal = document.getElementById("quizModal");
      if (modal) modal.classList.remove("active");
    };
    function renderQuizStep() {
      const content = document.getElementById("quizModalBody");
      if (!content) return;
      if (state.quizCurrentStep >= QUIZ_QUESTIONS.length) {
        const recommendation = calculateQuizRecommendation(state.quizAnswers);
        const product = PRODUCTS.find((p) => p.id === recommendation.productId) || PRODUCTS[0];
        content.innerHTML = `
        <div style="text-align:center; padding:10px 0;">
          <span class="badge-purple-solid" style="margin-bottom:12px;">Diagnostic Complete</span>
          <h2 style="font-size:1.8rem; color:var(--purple-950); margin-bottom:6px;">Your Ideal Match: ${recommendation.tierName}</h2>
          <p style="color:var(--text-secondary); margin-bottom:20px; font-size:0.95rem;">${recommendation.whyRecommended}</p>
          
          <div style="background:var(--purple-50); border:1px solid var(--purple-200); border-radius:12px; padding:16px; display:flex; gap:16px; align-items:center; text-align:left; margin-bottom:20px;">
            <img src="${product.heroImage}" style="width:100px; height:85px; object-fit:cover; border-radius:8px;" />
            <div>
              <h4 style="font-size:1.05rem; color:var(--purple-950); margin-bottom:2px;">${product.title}</h4>
              <div style="color:var(--purple-800); font-weight:800; font-size:1.1rem; margin-bottom:4px;">₹${product.price.toLocaleString("en-IN")} <span style="font-size:0.8rem; color:#786C8D; text-decoration:line-through;">₹${product.originalPrice.toLocaleString("en-IN")}</span></div>
              <p style="font-size:0.75rem; color:var(--purple-700);">${recommendation.doctorNote}</p>
            </div>
          </div>

          <div style="display:flex; gap:10px; justify-content:center;">
            <button class="btn btn-primary" onclick="quickAddToCart('${product.id}'); closeQuizModal();">
              Add to Bag (₹${product.price.toLocaleString("en-IN")})
            </button>
            <button class="btn btn-outline" onclick="openQuizModal()">Retake Diagnostic</button>
          </div>
        </div>
      `;
        return;
      }
      const q = QUIZ_QUESTIONS[state.quizCurrentStep];
      const progressPercent = (state.quizCurrentStep + 1) / QUIZ_QUESTIONS.length * 100;
      content.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <span style="font-size:0.78rem; color:var(--purple-700); font-weight:700;">QUESTION ${state.quizCurrentStep + 1} OF ${QUIZ_QUESTIONS.length}</span>
        <span style="font-size:0.78rem; color:var(--text-muted);">Haute Sleep Science</span>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
      </div>

      <h3 style="font-size:1.35rem; color:var(--purple-950); margin-bottom:4px;">${q.question}</h3>
      <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:16px;">${q.subtitle}</p>

      <div class="quiz-options-list">
        ${q.options.map((opt) => `
          <div class="quiz-option-card" onclick="selectQuizOption('${opt.id}')">
            <span class="quiz-option-title">${opt.label}</span>
            <span class="quiz-option-sub">${opt.desc}</span>
          </div>
        `).join("")}
      </div>
    `;
    }
    window.selectQuizOption = function(optionId) {
      state.quizAnswers[state.quizCurrentStep] = optionId;
      state.quizCurrentStep++;
      renderQuizStep();
    };
  }
  function initDoctorConsult() {
    window.openDoctorModal = function(productId) {
      var _a;
      const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
      const modal = document.getElementById("doctorModal");
      if (!modal) return;
      document.getElementById("doctorProductTitle").textContent = product.title;
      document.getElementById("doctorQuoteText").textContent = ((_a = product.doctorEndorsement) == null ? void 0 : _a.quote) || "Velvet Hug ergonomic mattress ensures maximum spinal decompression during sleep.";
      const message = encodeURIComponent(`Hello Dr. Alok Verma, I am exploring the Velvet Hug "${product.title}" on velvethug.in for my back posture. Could you advise if this is suitable for my sleep needs?`);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${message}`;
      document.getElementById("btnDoctorWhatsApp").onclick = function() {
        window.open(whatsappUrl, "_blank");
      };
      modal.classList.add("active");
    };
    window.closeDoctorModal = function() {
      const modal = document.getElementById("doctorModal");
      if (modal) modal.classList.remove("active");
    };
  }
  function initFoundingCounter() {
    const counterEl = document.getElementById("foundingPartnerCount");
    if (counterEl) {
      let current = 0;
      const target = FOUNDING_PARTNERS_DATA.currentCount;
      const interval = setInterval(() => {
        current += Math.ceil((target - current) / 10);
        counterEl.textContent = `${current} / 1,000`;
        if (current >= target) {
          counterEl.textContent = `${target} / 1,000 Claimed`;
          clearInterval(interval);
        }
      }, 40);
    }
    window.applyFoundingPartner = function() {
      showToast("Application received for Founding Sleep Partner Circle (#848).");
    };
  }
  function initAmbassadors() {
    const container = document.getElementById("ambassadorsGrid");
    if (!container) return;
    container.innerHTML = REST_AMBASSADORS_TIERS.map((t) => `
    <div style="background:#FFFFFF; border:1px solid var(--purple-100); border-radius:12px; padding:22px; display:flex; flex-direction:column; box-shadow:var(--shadow-card);">
      <div style="margin-bottom:12px;">
        <span class="badge-purple">${t.referralsNeeded}</span>
        <h4 style="margin-top:8px; font-size:1.1rem; color:var(--purple-950);">${t.tier}</h4>
      </div>
      <div style="font-size:1.05rem; font-weight:700; color:var(--purple-800); margin:8px 0 4px;">${t.reward}</div>
      <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:16px;">${t.perk}</p>
      <button class="btn btn-outline" style="margin-top:auto; width:100%;" onclick="openReferralModal()">
        Join Ambassador Circle
      </button>
    </div>
  `).join("");
    window.openReferralModal = function() {
      const code = "HUG" + Math.floor(1e3 + Math.random() * 9e3);
      const link = `https://velvethug.in?ref=${code}`;
      const shareText = encodeURIComponent(`I upgraded to Velvet Hug ergonomic mattress. Use my referral link for an extra ₹2,000 discount: ${link}`);
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank");
    };
  }
  function initB2BPortals() {
    window.openCorporateGiftingModal = function() {
      const modal = document.getElementById("corporateGiftingModal");
      if (modal) modal.classList.add("active");
    };
    window.closeCorporateGiftingModal = function() {
      const modal = document.getElementById("corporateGiftingModal");
      if (modal) modal.classList.remove("active");
    };
    window.submitB2BQuote = function(e) {
      if (e) e.preventDefault();
      showToast("Corporate quotation inquiry received. A Sleep Executive will respond within 2 hours.");
      closeCorporateGiftingModal();
    };
  }
  function initCartDrawer() {
    window.openCartDrawer = function() {
      renderCart();
      const backdrop = document.getElementById("cartDrawerBackdrop");
      if (backdrop) backdrop.classList.add("open");
    };
    window.closeCartDrawer = function() {
      const backdrop = document.getElementById("cartDrawerBackdrop");
      if (backdrop) backdrop.classList.remove("open");
    };
    window.quickAddToCart = function(productId) {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      const existing = state.cart.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({
          product,
          size: 'Queen (78" x 60")',
          thickness: product.height || "8 Inches",
          quantity: 1
        });
      }
      updateCartBadge();
      openCartDrawer();
      showToast(`Added ${product.title} to bag`);
    };
    window.updateCartQuantity = function(productId, change) {
      const item = state.cart.find((i) => i.product.id === productId);
      if (!item) return;
      item.quantity += change;
      if (item.quantity <= 0) {
        state.cart = state.cart.filter((i) => i.product.id !== productId);
      }
      renderCart();
      updateCartBadge();
    };
    window.applyCartCoupon = function() {
      const input = document.getElementById("cartCouponInput");
      if (!input) return;
      const code = input.value.trim().toUpperCase();
      if (code === "FESTIVE40" || code === "MONSOON15") {
        applyCouponCode2(code);
        showToast(`Coupon ${code} applied successfully!`);
      } else {
        showToast('Invalid coupon code. Try "FESTIVE40"');
      }
    };
    function applyCouponCode2(code) {
      state.appliedCoupon = code;
      renderCart();
    }
    function updateCartBadge() {
      const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
      const badge = document.getElementById("cartBadgeCount");
      if (badge) badge.textContent = count;
    }
    function renderCart() {
      const container = document.getElementById("cartItemsContainer");
      const totalEl = document.getElementById("cartTotalDisplay");
      const emiEl = document.getElementById("cartEmiDisplay");
      const discountRow = document.getElementById("cartDiscountRow");
      if (!container) return;
      if (state.cart.length === 0) {
        container.innerHTML = `
        <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
          <p style="font-size:1rem; margin-bottom:14px;">Your Velvet Hug bag is empty</p>
          <button class="btn btn-primary" onclick="closeCartDrawer()">Explore Mattresses</button>
        </div>
      `;
        if (totalEl) totalEl.textContent = "₹0";
        if (emiEl) emiEl.textContent = "₹0/mo";
        return;
      }
      let subtotal = 0;
      container.innerHTML = state.cart.map((item) => {
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;
        return `
        <div class="cart-item-row">
          <img src="${item.product.heroImage}" class="cart-item-img" alt="${item.product.title}" />
          <div>
            <h4 class="cart-item-title">${item.product.title}</h4>
            <div class="cart-item-meta">${item.size} · 10-Yr Warranty</div>
            <div class="cart-item-price">₹${itemTotal.toLocaleString("en-IN")}</div>
          </div>
          <div style="display:flex; align-items:center; gap:6px; background:#FFFFFF; border:1px solid var(--purple-200); padding:2px 6px; border-radius:4px;">
            <button onclick="updateCartQuantity('${item.product.id}', -1)" style="background:transparent; color:var(--purple-950); font-weight:700; font-size:0.9rem;">-</button>
            <span style="font-weight:700; font-size:0.85rem;">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.product.id}', 1)" style="background:transparent; color:var(--purple-950); font-weight:700; font-size:0.9rem;">+</button>
          </div>
        </div>
      `;
      }).join("");
      let discount = 0;
      if (state.appliedCoupon === "FESTIVE40") {
        discount = Math.round(subtotal * 0.4);
      } else if (state.appliedCoupon === "MONSOON15") {
        discount = Math.round(subtotal * 0.15);
      }
      const finalTotal = Math.max(0, subtotal - discount);
      if (discountRow) {
        if (discount > 0) {
          discountRow.style.display = "flex";
          discountRow.innerHTML = `
          <span>Festive Savings (${state.appliedCoupon})</span>
          <span style="color:var(--accent-emerald);">-₹${discount.toLocaleString("en-IN")}</span>
        `;
        } else {
          discountRow.style.display = "none";
        }
      }
      if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString("en-IN")}`;
      if (emiEl) emiEl.textContent = `₹${Math.round(finalTotal / 12).toLocaleString("en-IN")}/mo`;
    }
    window.checkPinCode = function() {
      const input = document.getElementById("cartPincodeInput");
      const status = document.getElementById("pincodeStatus");
      if (!input || !status) return;
      const val = input.value.trim();
      if (val.length === 6 && !isNaN(val)) {
        status.innerHTML = `<span style="color:var(--accent-emerald);">Free Express White-Glove Delivery to ${val} in 3-4 Days</span>`;
      } else {
        status.innerHTML = `<span style="color:#DC2626;">Please enter a valid 6-digit Indian PIN code</span>`;
      }
    };
    updateCartBadge();
  }
  function initCheckoutFlow() {
    window.openCheckoutModal = function() {
      closeCartDrawer();
      state.checkoutStep = 1;
      const modal = document.getElementById("checkoutModal");
      if (modal) modal.classList.add("active");
      renderCheckoutStep();
    };
    window.closeCheckoutModal = function() {
      const modal = document.getElementById("checkoutModal");
      if (modal) modal.classList.remove("active");
    };
    function renderCheckoutStep() {
      const body = document.getElementById("checkoutModalBody");
      if (!body) return;
      let subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      let discount = state.appliedCoupon === "FESTIVE40" ? Math.round(subtotal * 0.4) : state.appliedCoupon === "MONSOON15" ? Math.round(subtotal * 0.15) : 0;
      let finalTotal = Math.max(0, subtotal - discount);
      if (state.checkoutStep === 1) {
        body.innerHTML = `
        <div class="checkout-steps-bar">
          <div class="checkout-step-pill active"><span class="checkout-step-num">1</span> Shipping Details</div>
          <div class="checkout-step-pill"><span class="checkout-step-num">2</span> Payment & EMI</div>
          <div class="checkout-step-pill"><span class="checkout-step-num">3</span> Confirmation</div>
        </div>

        <h3 style="font-size:1.3rem; color:var(--purple-950); margin-bottom:16px;">Delivery & Installation Address</h3>
        
        <form onsubmit="proceedToPaymentStep(event)" style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Full Name</label>
              <input type="text" id="chkName" required value="${state.checkoutData.name}" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Mobile Number</label>
              <input type="tel" id="chkPhone" required value="${state.checkoutData.phone}" maxlength="10" style="width:100%;" />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Email Address</label>
              <input type="email" id="chkEmail" required value="${state.checkoutData.email}" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">6-Digit PIN Code</label>
              <input type="text" id="chkPin" required value="${state.checkoutData.pincode}" maxlength="6" style="width:100%;" />
            </div>
          </div>

          <div>
            <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Street Address / Apartment</label>
            <input type="text" id="chkAddr" required value="${state.checkoutData.address}" style="width:100%;" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">City</label>
              <input type="text" id="chkCity" required value="${state.checkoutData.city}" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">State</label>
              <input type="text" id="chkState" required value="${state.checkoutData.state}" style="width:100%;" />
            </div>
          </div>

          <div style="background:var(--purple-50); padding:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
            <div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Total Payable:</div>
              <div style="font-size:1.2rem; font-weight:800; color:var(--purple-950);">₹${finalTotal.toLocaleString("en-IN")}</div>
            </div>
            <button type="submit" class="btn btn-primary">
              Continue to Payment →
            </button>
          </div>
        </form>
      `;
      } else if (state.checkoutStep === 2) {
        body.innerHTML = `
        <div class="checkout-steps-bar">
          <div class="checkout-step-pill"><span class="checkout-step-num">✓</span> Shipping</div>
          <div class="checkout-step-pill active"><span class="checkout-step-num">2</span> Payment & EMI</div>
          <div class="checkout-step-pill"><span class="checkout-step-num">3</span> Confirmation</div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:16px;">
          <h3 style="font-size:1.3rem; color:var(--purple-950); margin:0;">Razorpay Secure Payment</h3>
          <span style="font-size:1.15rem; font-weight:800; color:var(--purple-800);">₹${finalTotal.toLocaleString("en-IN")}</span>
        </div>

        <div class="payment-tab-selector">
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === "upi" ? "active" : ""}" onclick="selectPaymentMethod('upi')">
            UPI / QR
          </button>
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === "card" ? "active" : ""}" onclick="selectPaymentMethod('card')">
            Cards & EMI
          </button>
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === "netbanking" ? "active" : ""}" onclick="selectPaymentMethod('netbanking')">
            NetBanking
          </button>
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === "cod" ? "active" : ""}" onclick="selectPaymentMethod('cod')">
            Cash on Delivery
          </button>
        </div>

        <div id="paymentMethodFormContainer">
          ${renderPaymentMethodContent(finalTotal)}
        </div>
      `;
      } else if (state.checkoutStep === 3) {
        const orderId = "VH-IN-" + Math.floor(1e5 + Math.random() * 9e5);
        body.innerHTML = `
        <div class="order-success-card">
          <div class="success-check-circle">✓</div>
          <span class="badge-purple-solid">Order Confirmed</span>
          <h2 style="font-size:1.8rem; color:var(--purple-950); margin:10px 0 4px;">Thank you, ${state.checkoutData.name}</h2>
          <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:18px;">
            Your order <strong>#${orderId}</strong> has been received and scheduled for handcrafted fabrication.
          </p>

          <div style="background:var(--purple-50); border:1px solid var(--purple-200); border-radius:12px; padding:18px; text-align:left; max-width:520px; margin:0 auto 20px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.85rem;">
              <span style="color:var(--text-muted);">Delivery Address:</span>
              <span style="color:var(--purple-950); font-weight:600;">${state.checkoutData.address}, ${state.checkoutData.city}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.85rem;">
              <span style="color:var(--text-muted);">Payment Method:</span>
              <span style="color:var(--purple-800); font-weight:700;">${state.checkoutData.paymentMethod.toUpperCase()} (₹${finalTotal.toLocaleString("en-IN")})</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-muted);">Estimated Delivery:</span>
              <span style="color:var(--accent-emerald); font-weight:700;">3-4 Days Express White-Glove</span>
            </div>
          </div>

          <div style="display:flex; gap:10px; justify-content:center;">
            <button class="btn btn-whatsapp" onclick="simulateWhatsAppAlert('${orderId}')">
              Receive WhatsApp Tracking Updates
            </button>
            <button class="btn btn-primary" onclick="closeCheckoutModal()">
              Continue Shopping
            </button>
          </div>
        </div>
      `;
        if (typeof confetti === "function") {
          confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        }
      }
    }
    function renderPaymentMethodContent(finalTotal) {
      if (state.checkoutData.paymentMethod === "upi") {
        return `
        <div style="text-align:center; padding:10px 0;">
          <div class="upi-qr-box">
            <div style="font-weight:700; font-size:0.95rem; margin-bottom:6px; color:var(--purple-950);">Scan UPI QR Code</div>
            <div style="background:var(--purple-950); width:130px; height:130px; margin:0 auto 10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; border-radius:6px; font-size:0.75rem;">
              [ UPI QR ]
            </div>
            <div style="font-size:0.72rem; color:var(--text-muted);">GPay · PhonePe · Paytm · BHIM</div>
          </div>

          <button class="btn btn-primary" style="width:100%; max-width:340px; padding:12px;" onclick="completeSimulatedOrder()">
            Simulate Instant UPI Approval (₹${finalTotal.toLocaleString("en-IN")})
          </button>
        </div>
      `;
      } else if (state.checkoutData.paymentMethod === "card") {
        return `
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div>
            <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Card Number</label>
            <input type="text" value="4532 •••• •••• 8842" style="width:100%;" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Expiry (MM/YY)</label>
              <input type="text" value="08/29" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">CVV</label>
              <input type="password" value="882" style="width:100%;" />
            </div>
          </div>

          <div style="background:var(--purple-50); border:1px solid var(--purple-200); padding:10px; border-radius:8px;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--purple-950); margin-bottom:4px;">No-Cost EMI Plan:</div>
            <select onchange="updateEMITenure(this.value)" style="width:100%; font-size:0.82rem;">
              <option value="12">12 Months (0% Interest) — ₹${Math.round(finalTotal / 12).toLocaleString("en-IN")}/mo (HDFC / ICICI)</option>
              <option value="6">6 Months (0% Interest) — ₹${Math.round(finalTotal / 6).toLocaleString("en-IN")}/mo (SBI)</option>
              <option value="3">3 Months (0% Interest) — ₹${Math.round(finalTotal / 3).toLocaleString("en-IN")}/mo (Bajaj Finserv)</option>
            </select>
          </div>

          <button class="btn btn-primary" style="width:100%; padding:12px; margin-top:6px;" onclick="completeSimulatedOrder()">
            Authorize Card Payment (₹${finalTotal.toLocaleString("en-IN")})
          </button>
        </div>
      `;
      } else if (state.checkoutData.paymentMethod === "cod") {
        return `
        <div style="text-align:center; padding:16px 0;">
          <h4 style="font-size:1.05rem; color:var(--purple-950); margin-bottom:4px;">Cash / UPI on Delivery</h4>
          <p style="font-size:0.82rem; color:var(--text-secondary); max-width:380px; margin:0 auto 16px;">
            Pay with cash or scan the courier executive's UPI QR code upon arrival at your doorstep.
          </p>
          <button class="btn btn-primary" style="width:100%; max-width:340px; padding:12px;" onclick="completeSimulatedOrder()">
            Confirm Order with Cash on Delivery
          </button>
        </div>
      `;
      } else {
        return `
        <div style="text-align:center; padding:16px 0;">
          <h4 style="font-size:1.05rem; color:var(--purple-950); margin-bottom:12px;">Select NetBanking Institution:</h4>
          <select style="width:100%; max-width:340px; margin-bottom:16px; font-size:0.85rem;">
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>State Bank of India</option>
            <option>Axis Bank</option>
            <option>Kotak Mahindra Bank</option>
          </select>
          <button class="btn btn-primary" style="width:100%; max-width:340px; padding:12px;" onclick="completeSimulatedOrder()">
            Proceed to Bank Gateway
          </button>
        </div>
      `;
      }
    }
    window.proceedToPaymentStep = function(e) {
      if (e) e.preventDefault();
      state.checkoutData.name = document.getElementById("chkName").value;
      state.checkoutData.phone = document.getElementById("chkPhone").value;
      state.checkoutData.email = document.getElementById("chkEmail").value;
      state.checkoutData.pincode = document.getElementById("chkPin").value;
      state.checkoutData.address = document.getElementById("chkAddr").value;
      state.checkoutData.city = document.getElementById("chkCity").value;
      state.checkoutData.state = document.getElementById("chkState").value;
      state.checkoutStep = 2;
      renderCheckoutStep();
    };
    window.selectPaymentMethod = function(method) {
      state.checkoutData.paymentMethod = method;
      renderCheckoutStep();
    };
    window.updateEMITenure = function(tenure) {
      state.checkoutData.emiTenure = parseInt(tenure) || 12;
    };
    window.completeSimulatedOrder = function() {
      state.checkoutStep = 3;
      renderCheckoutStep();
    };
    window.simulateWhatsAppAlert = function(orderId) {
      const text = encodeURIComponent(`Hi Velvet Hug, please send tracking updates for order #${orderId} to my WhatsApp.`);
      window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, "_blank");
    };
  }
  function initCompareDrawer() {
    window.toggleCompareItem = function(productId, isChecked) {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      if (isChecked) {
        if (state.compareList.length >= 4) {
          showToast("You can compare up to 4 mattresses at a time.");
          return;
        }
        if (!state.compareList.some((p) => p.id === productId)) {
          state.compareList.push(product);
        }
      } else {
        state.compareList = state.compareList.filter((p) => p.id !== productId);
      }
      updateCompareFloatingBar();
    };
    function updateCompareFloatingBar() {
      const bar = document.getElementById("compareFloatingBar");
      const text = document.getElementById("compareBarText");
      if (!bar || !text) return;
      if (state.compareList.length > 0) {
        bar.classList.add("visible");
        text.textContent = `Compare (${state.compareList.length}) Mattresses`;
      } else {
        bar.classList.remove("visible");
      }
    }
    window.openCompareModal = function() {
      const modal = document.getElementById("compareModal");
      const body = document.getElementById("compareModalTableContainer");
      if (!modal || !body) return;
      if (state.compareList.length < 2) {
        showToast("Select at least 2 mattresses to compare.");
        return;
      }
      body.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th>Specification</th>
            ${state.compareList.map((p) => `
              <th style="min-width:180px;">
                <div style="font-size:0.95rem; color:var(--purple-950); margin-bottom:2px;">${p.title}</div>
                <div style="color:var(--purple-800); font-size:1.05rem; font-weight:800;">₹${p.price.toLocaleString("en-IN")}</div>
              </th>
            `).join("")}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Profile Height</strong></td>
            ${state.compareList.map((p) => `<td>${p.height || "8 Inches"}</td>`).join("")}
          </tr>
          <tr>
            <td><strong>Firmness & Rating</strong></td>
            ${state.compareList.map((p) => `<td>${p.firmness} (${p.firmnessScore}/10)</td>`).join("")}
          </tr>
          <tr>
            <td><strong>Core Materials</strong></td>
            ${state.compareList.map((p) => `<td>${p.materials ? p.materials.join(" + ") : "Hybrid"}</td>`).join("")}
          </tr>
          <tr>
            <td><strong>Motion Isolation</strong></td>
            ${state.compareList.map((p) => `<td>${p.tier === "ReservePlus" || p.tier === "Reserve" ? "Zero Partner Motion" : "High Isolation"}</td>`).join("")}
          </tr>
          <tr>
            <td><strong>Spine Support Alignment</strong></td>
            ${state.compareList.map((p) => {
        var _a;
        return `<td>${((_a = p.doctorEndorsement) == null ? void 0 : _a.endorsed) ? "Doctor Endorsed" : "5-Zone Ergonomic"}</td>`;
      }).join("")}
          </tr>
          <tr>
            <td><strong>In-Home Trial</strong></td>
            ${state.compareList.map((p) => `<td>100 Nights Risk-Free</td>`).join("")}
          </tr>
          <tr>
            <td><strong>Warranty</strong></td>
            ${state.compareList.map((p) => {
        var _a;
        return `<td>${((_a = p.specs) == null ? void 0 : _a.warranty) || "10 Years"}</td>`;
      }).join("")}
          </tr>
          <tr>
            <td><strong>Action</strong></td>
            ${state.compareList.map((p) => `
              <td>
                <button class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="quickAddToCart('${p.id}')">
                  Add to Bag
                </button>
              </td>
            `).join("")}
          </tr>
        </tbody>
      </table>
    `;
      modal.classList.add("active");
    };
    window.closeCompareModal = function() {
      const modal = document.getElementById("compareModal");
      if (modal) modal.classList.remove("active");
    };
  }
  function initCustomSizeModal() {
    window.openCustomSizeModal = function() {
      const modal = document.getElementById("customSizeModal");
      if (modal) modal.classList.add("active");
    };
    window.closeCustomSizeModal = function() {
      const modal = document.getElementById("customSizeModal");
      if (modal) modal.classList.remove("active");
    };
    window.calculateCustomSizePrice = function() {
      const length = parseFloat(document.getElementById("customLengthInput").value) || 78;
      const width = parseFloat(document.getElementById("customWidthInput").value) || 60;
      const height = parseFloat(document.getElementById("customHeightInput").value) || 8;
      const sqInches = length * width;
      const estimatedPrice = Math.round(sqInches * 4.8 * (height / 8) / 100) * 100;
      const display = document.getElementById("customSizeEstimatedPrice");
      if (display) {
        display.textContent = `₹${estimatedPrice.toLocaleString("en-IN")}`;
      }
    };
  }
  function initWhatsAppWidget() {
    window.openGeneralWhatsApp = function() {
      const text = encodeURIComponent("Hello Velvet Hug! I would like sleep assistance regarding your mattresses on velvethug.in.");
      window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, "_blank");
    };
    window.openStorySubmissionWhatsApp = function() {
      const text = encodeURIComponent("Hello Velvet Hug! I would like to submit my Velvet Hug mattress video/photo story for the Rest Rewards.");
      window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, "_blank");
    };
  }
  function showToast(message) {
    let toast = document.getElementById("globalToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "globalToast";
      toast.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: var(--purple-950);
      border: 1px solid var(--purple-400);
      color: #FFFFFF;
      padding: 10px 22px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(40,12,61,0.3);
      z-index: 9999;
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-20px)";
    }, 3200);
  }
})();
