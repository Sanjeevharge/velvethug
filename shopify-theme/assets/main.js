(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();const Ot=1e3,zt={mattresses:{label:"Mattresses",icon:"🛏️",description:"Engineered for Indian bodies. 5 mattress types, customized for every sleeper profile.",subcategories:["All","Latex","Orthopedic","Memory Foam","Pocket Spring","Hybrid"]},pillows:{label:"Pillows",icon:"🌙",description:"The five sacred minutes before sleep start with the right cervical pillow.",subcategories:["All","Memory Foam","Latex","Microfiber","Ortho Cervical","Couple"]},cushions:{label:"Cushions",icon:"🪑",description:"Seat-to-sleep ergonomic lumbar care that holds you softly.",subcategories:["All","Sofa","Chair","Floor","Back Support"]},bolsters:{label:"Bolsters",icon:"〰️",description:"The ancient art of full-body hugs reinvented for side and maternity sleep.",subcategories:["All","Standard","King","Pregnancy"]},accessories:{label:"Accessories",icon:"✨",description:"Organic bamboo protectors, mulberry silk masks, and botanical mist.",subcategories:["All","Mattress Protectors","Pillow Covers","Bed Sheets","Sleep Masks","Aromatherapy"]}},It=[{num:1,humanName:"The Touch",material:"Cover",description:"The first skin of the night — a velvet-woven surface that greets you before anything else does.",spec:"Knit cover · OEKO-TEX®"},{num:2,humanName:"The Welcome",material:"Foam / Latex",description:"The layer that lets you arrive. Soft enough to receive the day you just lived.",spec:"Comfort layer · 4cm"},{num:3,humanName:"The Response",material:"Transition Core",description:"It answers the shape you actually sleep in — active anatomical pressure redistribution.",spec:"Dynamic transition · 3cm"},{num:4,humanName:"The Embrace",material:"Coils / Zoned HR",description:"Individually wrapped pocket coils or 7-zone orthopedic core holding you without motion transfer.",spec:"Zoned support system"},{num:5,humanName:"The Foundation",material:"Base & Edge Guard",description:"What the whole hug stands on — high-density base with heavy-duty reinforced perimeter.",spec:"Reinforced edge hold · up to 240kg"}],B=[{id:"vh-m001",category:"mattresses",name:"Elara Cloud Hybrid",mattressType:"Hybrid",collection:"Signature",tagline:"For those who treat sleep as a ceremony.",sleeperProfile:"Fit for All",sleeperProfileDesc:"Universal dual-comfort for every sleep position.",targetAgeGroup:"Adult (35–50 yrs)",backPainLevel:"Mild to Moderate Pain",maxWeightKg:180,sizes:["Single","Double","Queen","King"],materials:["Hybrid","Latex","Pocket Spring"],firmness:"Medium Firm",firmnessScore:6,positions:["Side","Back","Combination"],packaging:["Box-Packed","Flat-Packed"],basePrice:28e3,mrp:38e3,discount:26,emi:"₹933/mo × 30 months",badge:"bestseller",badgeLabel:"Most Popular",tags:["hybrid","fit-for-all","bestseller","zero-motion","cooling"],rating:4.9,reviews:1240,doctorRecommended:!0,height:20,thicknessInch:8,sleepNeeds:["Fit for All","Couples / Zero Motion","Side Sleeper","Back & Spine Pain"],trialDays:100,warranty:"10 years",has3D:!0,image:"/src/assets/images/mattress_hybrid_luxury.jpg",description:"Dual-comfort hybrid design combining 100% natural Sri Lankan latex and independent pocket springs. Zero motion transfer, breathable bamboo-velvet cover, and 5-zone anatomical contouring.",features:["Hybrid pocket spring + natural latex","Zero motion transfer for couples","Adaptive 5-zone contouring","Breathable CoolSync cover","100-night risk-free trial"]},{id:"vh-m002",category:"mattresses",name:"Serenity Ortho Spine-Align",mattressType:"Orthopedic",collection:"Signature",tagline:"Prescribed by spine doctors. Engineered for zero morning stiffness.",sleeperProfile:"Senior / Severe Back Pain",sleeperProfileDesc:"Clinical 7-zone firm support for chronic back, neck & lumbar pain.",targetAgeGroup:"Senior (50+ yrs)",backPainLevel:"Severe Back Pain",maxWeightKg:200,sizes:["Single","Double","Queen","King","Super King"],materials:["Orthopedic","Memory Foam","Rebonded Foam"],firmness:"Firm",firmnessScore:8,positions:["Back","Side"],packaging:["Flat-Packed","Box-Packed"],basePrice:32e3,mrp:44e3,discount:27,emi:"₹1066/mo × 30 months",badge:"ortho",badgeLabel:"Doctor Certified",tags:["orthopedic","severe-back-pain","senior","doctor-certified","firm"],rating:4.9,reviews:3120,doctorRecommended:!0,height:20,thicknessInch:8,sleepNeeds:["Back & Spine Pain","Doctor Certified Ortho","Senior Citizen Spine Support"],trialDays:100,warranty:"12 years",has3D:!0,image:"/src/assets/images/mattress_orthopedic_spine.jpg",description:"Clinical 7-zone orthopedic mattress designed in partnership with AIIMS physiotherapists. Calibrated high-density rebonded foam and pressure-relieving transition foam align the lumbar spine in zero-gravity posture.",features:["7-zone anatomical spine zoning","Physiotherapist & Ortho certified","High-density lumbar core","Zero sagging guarantee","OEKO-TEX certified anti-allergenic"]},{id:"vh-m003",category:"mattresses",name:"Aura Cloud Memory Foam",mattressType:"Memory Foam",collection:"Foundation",tagline:"Light, responsive pressure-relief for active young bodies.",sleeperProfile:"Youth",sleeperProfileDesc:"18 to 35 years. Fit. No pain. Hostel & young professional. Soft to Medium Soft.",targetAgeGroup:"Youth (18–35 yrs)",backPainLevel:"No Pain / Fit",maxWeightKg:150,sizes:["Single","Twin","Double","Queen","King"],materials:["Memory Foam","PU Foam"],firmness:"Medium Soft",firmnessScore:4,positions:["Side","Stomach","Combination"],packaging:["Rollable","Box-Packed"],basePrice:19500,mrp:26e3,discount:25,emi:"₹650/mo × 30 months",badge:"new",badgeLabel:"Youth Edition",tags:["memory-foam","youth","soft-medium-soft","hostel-friendly","cooling-gel"],rating:4.8,reviews:870,doctorRecommended:!1,height:15,thicknessInch:6,sleepNeeds:["Side Sleeper","Hot Sleeper","Youth & Hostel"],trialDays:100,warranty:"10 years",has3D:!0,image:"/src/assets/images/mattress_memory_foam.jpg",description:"Open-cell cooling gel memory foam that cradles shoulders and hips without heat buildup. Perfect for students, young professionals, and active sleepers seeking soft-to-medium-soft recovery.",features:["CoolSync™ open-cell memory foam","Pressure-relief without heat trap","Compact rollable box delivery","Breathable zip-off cover","Anti-dust-mite sanitized"]},{id:"vh-m004",category:"mattresses",name:"Luminary Organic Latex Reserve",mattressType:"Latex",collection:"Reserve",tagline:"Pure botanical harvest. Hand-poured in Sri Lanka for generational luxury.",sleeperProfile:"Fit for All",sleeperProfileDesc:"Organic botanical luxury with natural bouncy lift.",targetAgeGroup:"Adult (35–50 yrs)",backPainLevel:"No Pain / Fit",maxWeightKg:200,sizes:["Queen","XL Queen","King","Super King"],materials:["Latex"],firmness:"Medium Soft",firmnessScore:4.5,positions:["Side","Back","Stomach","Combination"],packaging:["Flat-Packed"],basePrice:54e3,mrp:72e3,discount:25,emi:"₹1800/mo × 30 months",badge:"luxury",badgeLabel:"100% Organic",tags:["latex","organic","reserve","hot-sleeper","luxury"],rating:4.9,reviews:480,doctorRecommended:!0,height:25,thicknessInch:10,sleepNeeds:["Hot Sleeper","100% Natural Latex","Couples / Zero Motion"],trialDays:120,warranty:"15 years",has3D:!0,image:"/src/assets/images/mattress_latex_luxury.jpg",description:"100% certified organic Dunlop latex from sustainable tree harvest. Natural hypoallergenic resilience, 200+ pincore aeration channels, and organic cotton-wool casing.",features:["GOLS certified organic natural latex","Naturally cooling micro-pin ventilation","Chemical-free & zero VOCs","Reversible dual-sided feel","15-year master craftsmanship warranty"]},{id:"vh-m005",category:"mattresses",name:"Little Dreamers Active Bounce",mattressType:"Orthopedic",collection:"Foundation",tagline:"Bouncy, safe, and pediatrician-approved for growing spines.",sleeperProfile:"Kids",sleeperProfileDesc:"10 to 17 years. Bouncy active growth support & spinal alignment.",targetAgeGroup:"Kids (10–17 yrs)",backPainLevel:"No Pain / Fit",maxWeightKg:90,sizes:["Kids","Bunk","Single","Twin"],materials:["Orthopedic","Pocket Spring","Coir (Coconut Fibre)"],firmness:"Medium",firmnessScore:5,positions:["Side","Back","Stomach","Combination"],packaging:["Box-Packed","Flat-Packed"],basePrice:9800,mrp:13500,discount:27,emi:"₹326/mo × 30 months",badge:"kids",badgeLabel:"Kids 10–17",tags:["kids","bounce","growth-support","pediatrician-approved"],rating:4.8,reviews:890,doctorRecommended:!0,height:15,thicknessInch:6,sleepNeeds:["Kids Spinal Support","Hypoallergenic"],trialDays:100,warranty:"7 years",has3D:!1,image:"/src/assets/images/mattress_kids.jpg",description:"Pediatrician formulated with dynamic bounce pocket springs and breathable natural coir. Keeps posture upright during growth spurts while offering the fun, resilient bounce kids love.",features:["Pediatrician posture approval","Active growth bounce spring core","100% waterproof spill-resistant cover","Hypoallergenic OEKO-TEX certified","Safe rounded edge construction"]},{id:"vh-m006",category:"mattresses",name:"Bespoke Grand Reserve Royal",mattressType:"Hybrid",collection:"Reserve",tagline:"Every body is different. Yours should sleep differently too.",sleeperProfile:"Fit for All",sleeperProfileDesc:"Tailor-crafted dual firmness zones with white-glove staging.",targetAgeGroup:"Adult (35–50 yrs)",backPainLevel:"Mild to Moderate Pain",maxWeightKg:240,sizes:["Queen","XL Queen","King","Super King"],materials:["Hybrid","Latex","Pocket Spring"],firmness:"Medium Firm",firmnessScore:6.5,positions:["Side","Back","Combination"],packaging:["Flat-Packed"],basePrice:89e3,mrp:119e3,discount:25,emi:"₹2966/mo × 30 months",badge:"luxury",badgeLabel:"Masterpiece",tags:["bespoke","reserve","luxury","custom-crafted","doctor-certified"],rating:5,reviews:96,doctorRecommended:!0,height:30,thicknessInch:12,sleepNeeds:["Custom Body-Mapped","Back & Spine Pain","Doctor Certified Ortho"],trialDays:120,warranty:"20 years",has3D:!0,image:"/src/assets/images/mattress_bespoke.jpg",description:"The pinnacle of Velvet Hug sleep engineering. 12-inch multi-layered hybrid with gold-quilted damask velvet, individually encased titanium coils, and dual-zone customizable firmness.",features:["Dedicated sleep scientist consultation","Dual-side personalized firmness","Titanium zoned pocket coils","White-glove doorstep bedroom assembly","20-year royal warranty"]},{id:"vh-m007",category:"mattresses",name:"Titan Ortho-Robust Heavy Duty",mattressType:"Hybrid",collection:"Signature",tagline:"High-resilience heavy-duty support engineered for up to 240 kg.",sleeperProfile:"For Big People",sleeperProfileDesc:"Medium Firm. Supports an overall sleeper weight of up to 240 kg without sagging.",targetAgeGroup:"Adult (35–50 yrs)",backPainLevel:"Mild to Moderate Pain",maxWeightKg:240,sizes:["Double","Queen","XL Queen","King","Super King"],materials:["Hybrid","Orthopedic","Pocket Spring"],firmness:"Medium Firm",firmnessScore:7,positions:["Back","Side","Combination"],packaging:["Flat-Packed","Box-Packed"],basePrice:38e3,mrp:52e3,discount:27,emi:"₹1266/mo × 30 months",badge:"bestseller",badgeLabel:"Up to 240 kg",tags:["for-big-people","heavy-duty","240kg-support","reinforced-edge","hybrid"],rating:4.9,reviews:740,doctorRecommended:!0,height:25,thicknessInch:10,sleepNeeds:["For Big People (Up to 240kg)","Back & Spine Pain","Couples / Zero Motion"],trialDays:100,warranty:"15 years",has3D:!0,image:"/src/assets/images/mattress_titan_heavy_duty.jpg",description:"Engineered specifically for plus-size sleepers, couples, and individuals requiring structural reinforcement. High-gauge pocket springs, high-density transition foam, and quad-perimeter edge support.",features:["Guaranteed 240 kg total sleeper support","Reinforced perimeter Anti-Roll edge guards","High-tensile steel pocket springs","Breathable temperature-regulating core","15-year non-sag structural warranty"]},{id:"vh-m008",category:"mattresses",name:"TheraSpine Clinical Dual-Firm",mattressType:"Orthopedic",collection:"Foundation",tagline:"Reversible firmness for evolving lumbar support and pain recovery.",sleeperProfile:"Adult",sleeperProfileDesc:"35 to 50 years OR Mild to Moderate Pain. Medium to Medium Firm.",targetAgeGroup:"Adult (35–50 yrs)",backPainLevel:"Mild to Moderate Pain",maxWeightKg:190,sizes:["Single","Double","Queen","King"],materials:["Orthopedic","Rebonded Foam","Memory Foam"],firmness:"Medium Firm",firmnessScore:6.5,positions:["Back","Side"],packaging:["Flat-Packed"],basePrice:22e3,mrp:29500,discount:25,emi:"₹733/mo × 30 months",badge:"ortho",badgeLabel:"Reversible",tags:["adult","mild-pain","orthopedic","reversible","foundation"],rating:4.8,reviews:1540,doctorRecommended:!0,height:20,thicknessInch:8,sleepNeeds:["Back & Spine Pain","Doctor Certified Ortho"],trialDays:100,warranty:"10 years",has3D:!0,image:"/src/assets/images/mattress_orthopedic_spine.jpg",description:"Reversible orthopedic mattress offering Medium-Firm anatomical support on Side A and Orthopedic Firm alignment on Side B. Perfect for adults managing work-from-home back stiffness.",features:["Reversible dual-sided firmness","70D high-density orthopedic core","Cooling bamboo knit fabric","Posture correction alignment","10-year warranty"]},{id:"vh-m009",category:"mattresses",name:"Zenith Zero-Motion Pocket Spring",mattressType:"Pocket Spring",collection:"Signature",tagline:"Your partner tosses. You never feel a ripple.",sleeperProfile:"Fit for All",sleeperProfileDesc:"Isolated pocket coil technology for undisturbed deep sleep.",targetAgeGroup:"Youth (18–35 yrs)",backPainLevel:"No Pain / Fit",maxWeightKg:180,sizes:["Single","Double","Queen","King"],materials:["Pocket Spring","Memory Foam"],firmness:"Medium",firmnessScore:5,positions:["Side","Back","Combination"],packaging:["Box-Packed","Flat-Packed"],basePrice:26e3,mrp:35e3,discount:26,emi:"₹866/mo × 30 months",badge:"bestseller",badgeLabel:"Couples Pick",tags:["pocket-spring","zero-motion","couples","medium-firmness","signature"],rating:4.8,reviews:1820,doctorRecommended:!1,height:20,thicknessInch:8,sleepNeeds:["Couples / Zero Motion","Side Sleeper"],trialDays:100,warranty:"10 years",has3D:!0,image:"/src/assets/images/mattress_pocket_spring.jpg",description:"Over 800 individually encapsulated pocket springs adapt independently to your body curves. Prevents partner disturbance while delivering gentle contouring plush comfort.",features:["800+ independent pocket springs","Zero motion transfer technology","Plush euro-top comfort cushioning","Reinforced side sitting perimeter","100-night trial"]},{id:"vh-m010",category:"mattresses",name:"Velvet Essential Budget Ortho",mattressType:"Orthopedic",collection:"Budget",tagline:"Ergonomic spine protection at direct-from-lab value pricing.",sleeperProfile:"Budget",sleeperProfileDesc:"High-density orthopedic support at accessible direct-to-consumer value.",targetAgeGroup:"Adult (35–50 yrs)",backPainLevel:"Mild to Moderate Pain",maxWeightKg:140,sizes:["Single","Double","Queen","King"],materials:["Orthopedic","PU Foam","Coir (Coconut Fibre)"],firmness:"Medium Firm",firmnessScore:6,positions:["Back","Side","Combination"],packaging:["Flat-Packed","Box-Packed"],basePrice:11500,mrp:15500,discount:26,emi:"₹383/mo × 30 months",badge:"budget",badgeLabel:"Best Value",tags:["budget","value","orthopedic","coir","accessible"],rating:4.7,reviews:2150,doctorRecommended:!0,height:15,thicknessInch:6,sleepNeeds:["Budget","Back & Spine Pain"],trialDays:100,warranty:"5 years",has3D:!1,image:"/src/assets/images/mattress_kids.jpg",description:"High-density bonded core layered with natural rubberized coir and soft quilted jacquard. Direct factory-to-doorstep pricing makes clinical back support accessible to everyone.",features:["Direct factory value pricing","High-density bonded posture core","Breathable natural coir layer","Hypoallergenic jacquard fabric","5-year warranty"]},{id:"vh-p001",category:"pillows",name:"Cloud Cradle Memory Pillow",collection:"Signature",tagline:"The pillow that remembers how you sleep.",sizes:["Standard","Queen"],materials:["Memory Foam"],firmness:"Medium Soft",firmnessScore:4,packaging:["Standard Delivery","Gifting Box"],basePrice:1800,mrp:2400,discount:25,emi:null,badge:"bestseller",badgeLabel:"Best Seller",tags:["memory-foam","cooling","side-sleeper"],rating:4.7,reviews:1890,doctorRecommended:!1,image:"/src/assets/images/pillow_memory.jpg",description:"Contoured slow-recovery memory foam. Side sleeper or back sleeper, it cradles your neck seamlessly.",features:["Contoured shape","CoolSync gel layer","Washable cover","Height adjustable","Hypoallergenic"]},{id:"vh-p002",category:"pillows",name:"Ortho Cervical Pro Neck Support",collection:"Signature",tagline:"For necks that have carried too much for too long.",sizes:["Standard"],materials:["Memory Foam","Orthopedic"],firmness:"Firm",firmnessScore:8,packaging:["Standard Delivery"],basePrice:2400,mrp:3200,discount:25,emi:null,badge:"ortho",badgeLabel:"Doctor Choice",tags:["cervical","ortho","neck-pain"],rating:4.8,reviews:2240,doctorRecommended:!0,image:"/src/assets/images/pillow_cervical.jpg",description:"Cervical curve engineered by physiotherapists. Dual lobes for neck traction and cervical spine relief.",features:["Dual-height lobes","Memory foam","Physiotherapist designed","Non-slip base","Breathable bamboo cover"]},{id:"vh-p003",category:"pillows",name:"Natural Organic Latex Bliss Pillow",collection:"Reserve",tagline:"Natural. Springy. Timeless.",sizes:["Standard","Queen"],materials:["Latex"],firmness:"Medium Firm",firmnessScore:5.5,packaging:["Standard Delivery","Gifting Box"],basePrice:3200,mrp:4400,discount:27,emi:null,badge:"luxury",badgeLabel:"100% Organic",tags:["latex","natural","eco"],rating:4.9,reviews:540,doctorRecommended:!0,image:"/src/assets/images/pillow_latex.jpg",description:"Micro-pin ventilated organic natural latex fill. Instant responsive bounce with hypoallergenic organic cover.",features:["Organic natural latex","Micro-pin ventilated","Anti-dust-mite","GOLS certified","Washable cotton casing"]},{id:"vh-p004",category:"pillows",name:"Couple's Dual-Zone Harmony Pillow",collection:"Signature",tagline:"One pillow. Two sides. Zero compromise.",sizes:["King"],materials:["Memory Foam"],firmness:"Medium",firmnessScore:5,packaging:["Gifting Box"],basePrice:4200,mrp:5600,discount:25,emi:null,badge:"bestseller",badgeLabel:"Couples Pick",tags:["couples","king","memory-foam"],rating:4.8,reviews:380,doctorRecommended:!1,image:"/src/assets/images/pillow_couple.jpg",description:"Dual-zone king pillow. Firm on one side, soft on the other with central divider for harmonious sleep.",features:["Dual-zone firmness","King size","Embroidered divider","Washable cover","Gift ready"]},{id:"vh-c001",category:"cushions",name:"Throne Ergonomic Lumbar Cushion",collection:"Foundation",tagline:"For the 9 hours you sit before the 8 hours you sleep.",sizes:["Small (35×35)","Standard (45×45)","Large (55×55)"],materials:["Memory Foam"],firmness:"Medium Firm",firmnessScore:6,packaging:["Standard Delivery"],basePrice:1200,mrp:1600,discount:25,emi:null,badge:"bestseller",badgeLabel:"WFH Favourite",tags:["lumbar","office","ergonomic"],rating:4.7,reviews:2100,doctorRecommended:!0,image:"/src/assets/images/cushion_lumbar.jpg",description:"Lumbar S-curve arch engineered from 500+ posture scans. High-density memory foam prevents desk slouching.",features:["Lumbar S-curve design","Memory foam","Non-slip base","Washable velvet cover","Chair strap attachment"]},{id:"vh-c002",category:"cushions",name:"Velvet Living Room Sofa Nest",collection:"Signature",tagline:"Because your sofa deserves to feel like a hug.",sizes:["Standard (45×45)","Large (55×55)"],materials:["PU Foam"],firmness:"Medium Soft",firmnessScore:4,packaging:["Gifting Box","Standard Delivery"],basePrice:1800,mrp:2400,discount:25,emi:null,badge:"new",badgeLabel:"Gift Favourite",tags:["sofa","decorative","velvet"],rating:4.6,reviews:670,doctorRecommended:!1,image:"/src/assets/images/cushion_sofa.jpg",description:"Deep midnight blue velvet outer with shape-retaining resilient core. Set of 2 matching cushions.",features:["Midnight velvet cover","HR foam fill","Hidden zip","Shape-retaining","Set of 2"]},{id:"vh-b001",category:"bolsters",name:"The Sacred Embrace Sleep Bolster",collection:"Signature",tagline:"The ancient art of full-body hugs reimagined.",sizes:["Standard (72×15)","King (78×18)"],materials:["Memory Foam"],firmness:"Medium Soft",firmnessScore:4,packaging:["Standard Delivery","Gifting Box"],basePrice:1600,mrp:2200,discount:27,emi:null,badge:"bestseller",badgeLabel:"Best Seller",tags:["bolster","side-sleeper","body-support"],rating:4.8,reviews:1450,doctorRecommended:!1,image:"/src/assets/images/bolster_embrace.jpg",description:"Long cylindrical memory foam bolster. Aligns hips and knees for side sleepers in sacred comfort.",features:["Full-length body support","Memory foam core","Removable velvet cover","Side sleeper hip relief","Hypoallergenic"]},{id:"vh-b002",category:"bolsters",name:"Mama Hold Full-Body Maternity Bolster",collection:"Signature",tagline:"Every position supported. Every night of the journey.",sizes:["Standard (140×25 U-shape)"],materials:["Memory Foam"],firmness:"Soft",firmnessScore:3,packaging:["Gifting Box"],basePrice:3200,mrp:4200,discount:24,emi:null,badge:"ortho",badgeLabel:"Maternity Choice",tags:["pregnancy","maternity","u-shape"],rating:4.9,reviews:290,doctorRecommended:!0,image:"/src/assets/images/bolster_pregnancy.jpg",description:"U-shaped anatomical body support. Supports belly, back, and knees simultaneously throughout maternity.",features:["U-shape full body","Gynaecologist approved","Washable cover","Temperature-neutral","Hypoallergenic"]},{id:"vh-a001",category:"accessories",name:"ArmourShield Bamboo Mattress Protector",collection:"Foundation",tagline:"What protects your mattress, protects your investment.",sizes:["Single","Double","Queen","King"],materials:["Microfiber"],firmness:null,basePrice:1100,mrp:1500,discount:27,emi:null,badge:"bestseller",badgeLabel:"Best Seller",tags:["protector","waterproof","essential"],rating:4.7,reviews:4200,doctorRecommended:!1,image:"/src/assets/images/acc_protector.jpg",description:'100% waterproof noiseless membrane. Deep skirt fit for up to 14" mattresses.',features:["100% waterproof","Noiseless","Elastic all around","Machine washable","OEKO-TEX certified"]},{id:"vh-a002",category:"accessories",name:"Midnight Velvet Pillowcase Pair",collection:"Signature",tagline:"The first touch of the night.",sizes:["Standard (43×73cm)","Queen (50×76cm)"],materials:["Microfiber"],firmness:null,basePrice:780,mrp:1100,discount:29,emi:null,badge:"new",badgeLabel:"New",tags:["pillowcase","velvet","silk-like"],rating:4.7,reviews:1100,doctorRecommended:!1,image:"/src/assets/images/acc_pillowcase.jpg",description:"Satin-finish microfiber in signature Midnight Blue. Reduces hair friction and preserves moisture.",features:["Satin-smooth surface","Hair-friendly","Moisture retaining","Set of 2","Colour-fast"]},{id:"vh-a003",category:"accessories",name:"Velvet Hug 3D Contoured Sleep Mask",collection:"Foundation",tagline:"Darkness, on your terms.",sizes:["One Size"],materials:["Microfiber"],firmness:null,basePrice:490,mrp:690,discount:29,emi:null,badge:"bestseller",badgeLabel:"Gift Pick",tags:["sleep-mask","travel","gift"],rating:4.6,reviews:2800,doctorRecommended:!1,image:"/src/assets/images/acc_mask.jpg",description:"Zero eye pressure 3D eye cavities. 100% light blockout with adjustable strap.",features:["3D contoured","Zero eye pressure","Lavender infused","Adjustable strap","Travel pouch included"]},{id:"vh-a004",category:"accessories",name:"Dream Diffuser & Lavender Mist Set",collection:"Signature",tagline:"Scent the last waking breath.",sizes:["One Size"],materials:["Ceramic"],firmness:null,basePrice:1600,mrp:2200,discount:27,emi:null,badge:"new",badgeLabel:"Aromatherapy",tags:["aromatherapy","diffuser","wellness"],rating:4.8,reviews:560,doctorRecommended:!1,image:"/src/assets/images/acc_diffuser.jpg",description:"Cold-mist ultrasonic ceramic diffuser with French lavender and chamomile botanical oils.",features:["Cold mist ultrasonic","4 timer modes","Ceramic housing","LED ambient nightlight","Organic essential oil bottle"]}],he=[{id:"q_age",category:"age",question:"1. What is your age group?",sub:"Spinal density and bone alignment needs change across life stages.",options:[{id:"kids",label:"Kids (10 to 17 years)",sub:"Active growth spurts & playful bounce needed",profile:"Kids"},{id:"youth",label:"Youth (18 to 35 years)",sub:"Fit, agile, hostel or young professional",profile:"Youth"},{id:"adult",label:"Adult (35 to 50 years)",sub:"Workday posture stress & lumbar care",profile:"Adult"},{id:"senior",label:"Senior (50+ years)",sub:"Joint care & maximum orthopedic stability",profile:"Senior / Severe Back Pain"}]},{id:"q_pain",category:"backpain",question:"2. Do you experience any back or neck pain?",sub:"Let our clinical spine algorithms match the right zoning.",options:[{id:"no_pain",label:"No Pain / Fit",sub:"Wake up fresh, general comfort focus",painLevel:"No Pain / Fit"},{id:"mild_pain",label:"Mild to Moderate Pain",sub:"Occasional morning stiffness or lower back fatigue",painLevel:"Mild to Moderate Pain"},{id:"severe_pain",label:"Severe Back Pain / Slip Disc",sub:"Chronic ache, doctor-recommended firm support needed",painLevel:"Severe Back Pain"}]},{id:"q_weight",category:"weight",question:"3. What is the overall weight of the sleeper(s)?",sub:"Ensures zero sagging and appropriate coil compression.",options:[{id:"standard",label:"Under 80 kg (Standard)",sub:"Single sleeper / light build",weightCategory:"Standard (Under 80 kg)"},{id:"medium",label:"80 to 140 kg (Medium / Couple)",sub:"Average build or standard couple weight",weightCategory:"Medium (80–140 kg)"},{id:"heavy",label:"140 to 240 kg (For Big People)",sub:"Reinforced heavy-duty core required",weightCategory:"Heavy Duty (Up to 240 kg)"}]},{id:"q_firmness",category:"firmness",question:"4. What is your firmness preference?",sub:"From plush cloud sink to clinical orthopedic pushback.",options:[{id:"soft",label:"Soft (Plush Cloud)",sub:"Deep sink & gentle hug",firmness:"Soft"},{id:"medium_soft",label:"Medium Soft",sub:"Contouring with gentle cushion",firmness:"Medium Soft"},{id:"medium",label:"Medium (Balanced)",sub:"Equal parts hug and responsive bounce",firmness:"Medium"},{id:"medium_firm",label:"Medium Firm (Recommended)",sub:"Targeted lumbar pushback & spinal neutrality",firmness:"Medium Firm"},{id:"firm",label:"Firm (Orthopedic)",sub:"Zero sag, high-density orthopedic alignment",firmness:"Firm"}]},{id:"q_price",category:"price",question:"5. What is your preferred price classification?",sub:"Every Velvet Hug mattress includes our 100-Night Risk-Free Trial.",options:[{id:"budget",label:"Budget (Under ₹15,000)",sub:"Direct-from-lab essential value",tier:"Budget"},{id:"foundation",label:"Foundation (₹15,000 – ₹30,000)",sub:"Essential luxury & everyday ergonomic care",tier:"Foundation"},{id:"signature",label:"Signature (₹30,000 – ₹55,000)",sub:"Flagship 5-layer anatomical engineering",tier:"Signature"},{id:"reserve",label:"Reserve (₹55,000 and Above)",sub:"100% Organic Latex & Handcrafted Royal Heritage",tier:"Reserve"}]}],Re=[{name:"Dr. Priya Nair",specialty:"Physiotherapist, AIIMS",rating:4.9,says:"The Serenity Ortho is the closest I have seen a consumer mattress get to clinical spinal alignment."},{name:"Dr. Arjun Mehta",specialty:"Sleep Medicine & Ortho, Fortis",rating:4.8,says:"For back pain sufferers and big sleepers, the Titan and Elara Cloud provide unmatched zoned pushback."},{name:"Dr. Sunita Rao",specialty:"Paediatrician, Apollo Hospitals",rating:5,says:"Little Dreamers is the only consumer kids mattress I recommend without hesitation for 10–17 year growth."}],Rt=[{num:1,name:"Arjun S.",city:"Bangalore",story:null},{num:7,name:"Meena R.",city:"Chennai",story:"Finally slept through the night."},{num:23,name:"Vikram P.",city:"Mumbai",story:null},{num:45,name:"Priya K.",city:"Hyderabad",story:"Back pain gone in two weeks."},{num:88,name:"Rahul T.",city:"Delhi",story:null},{num:102,name:"Ananya M.",city:"Pune",story:"My husband stopped snoring. Miracle."},{num:145,name:"Suresh L.",city:"Kochi",story:null},{num:212,name:"Kavitha N.",city:"Ahmedabad",story:null},{num:303,name:"Dev B.",city:"Jaipur",story:"Worth every rupee."},{num:347,name:"Rohini V.",city:"Mysore",story:null}],Bt=348,j=[{id:"founding",tag:"FOUNDING EXCLUSIVE",message:"First 1,000 Sleep Partners — 348 claimed, get 15% lifetime price lock",coupon:"FOUNDING15",endsAt:new Date(Date.now()+5*24*60*60*1e3),image:null}];function re(e){return B.find(t=>t.id===e)||null}function We(e,t={}){var n,s,r,l,c;let i=B.filter(d=>e==="accessories"?d.category==="accessories"||d.category==="pillows"||d.category==="cushions"||d.category==="bolsters":d.category===e);return(n=t.size)!=null&&n.length&&(i=i.filter(d=>{var u;return(u=d.sizes)==null?void 0:u.some(p=>t.size.includes(p))})),(s=t.type)!=null&&s.length&&(i=i.filter(d=>t.type.includes(d.mattressType))),(r=t.sleeperProfile)!=null&&r.length&&(i=i.filter(d=>t.sleeperProfile.includes(d.sleeperProfile))),(l=t.firmness)!=null&&l.length&&(i=i.filter(d=>t.firmness.includes(d.firmness))),(c=t.tier)!=null&&c.length&&(i=i.filter(d=>t.tier.includes(d.collection))),i}function Be(e){const t=e.toLowerCase();return B.filter(i=>{var n,s,r;return i.name.toLowerCase().includes(t)||i.tagline.toLowerCase().includes(t)||i.mattressType&&i.mattressType.toLowerCase().includes(t)||i.sleeperProfile&&i.sleeperProfile.toLowerCase().includes(t)||((n=i.description)==null?void 0:n.toLowerCase().includes(t))||((s=i.tags)==null?void 0:s.some(l=>l.includes(t)))||((r=i.collection)==null?void 0:r.toLowerCase().includes(t))||i.category.includes(t)})}function S(e){return"₹"+Number(e||0).toLocaleString("en-IN")}const O=[{id:"hdfc",name:"HDFC Bank",logo:"🏦",tag:"Popular",tenures:[{months:3,annualRate:14,isNoCost:!0,minAmount:3e3},{months:6,annualRate:14,isNoCost:!0,minAmount:5e3},{months:9,annualRate:15,isNoCost:!0,minAmount:1e4},{months:12,annualRate:15,isNoCost:!0,minAmount:12e3},{months:18,annualRate:15.5,isNoCost:!1,minAmount:15e3},{months:24,annualRate:16,isNoCost:!1,minAmount:2e4},{months:30,annualRate:16,isNoCost:!1,minAmount:25e3}]},{id:"icici",name:"ICICI Bank",logo:"🏦",tag:"Instant Approval",tenures:[{months:3,annualRate:13.5,isNoCost:!0,minAmount:3e3},{months:6,annualRate:14,isNoCost:!0,minAmount:5e3},{months:9,annualRate:14.5,isNoCost:!0,minAmount:1e4},{months:12,annualRate:15,isNoCost:!0,minAmount:12e3},{months:18,annualRate:15.5,isNoCost:!1,minAmount:15e3},{months:24,annualRate:16,isNoCost:!1,minAmount:2e4}]},{id:"sbi",name:"State Bank of India",logo:"🏦",tag:"Govt / PSU",tenures:[{months:3,annualRate:14,isNoCost:!0,minAmount:3e3},{months:6,annualRate:14,isNoCost:!0,minAmount:5e3},{months:9,annualRate:14.5,isNoCost:!0,minAmount:1e4},{months:12,annualRate:15,isNoCost:!0,minAmount:12e3},{months:18,annualRate:15,isNoCost:!1,minAmount:15e3},{months:24,annualRate:15.5,isNoCost:!1,minAmount:2e4}]},{id:"axis",name:"Axis Bank",logo:"🏦",tag:"Cashback Offers",tenures:[{months:3,annualRate:14,isNoCost:!0,minAmount:3e3},{months:6,annualRate:14,isNoCost:!0,minAmount:5e3},{months:9,annualRate:15,isNoCost:!0,minAmount:1e4},{months:12,annualRate:15,isNoCost:!0,minAmount:12e3},{months:18,annualRate:15.5,isNoCost:!1,minAmount:15e3},{months:24,annualRate:16,isNoCost:!1,minAmount:2e4}]},{id:"kotak",name:"Kotak Mahindra",logo:"🏦",tag:"Zero Processing Fee",tenures:[{months:3,annualRate:14,isNoCost:!0,minAmount:3e3},{months:6,annualRate:14,isNoCost:!0,minAmount:5e3},{months:9,annualRate:15,isNoCost:!0,minAmount:1e4},{months:12,annualRate:15,isNoCost:!0,minAmount:12e3},{months:18,annualRate:16,isNoCost:!1,minAmount:15e3}]}],Nt=[{id:"bajaj",name:"Bajaj Finserv Insta EMI Card",logo:"⚡",type:"Cardless EMI",tag:"No Credit Card Needed",desc:"Instant pre-approved limit up to ₹2,00,000. 0% Interest & ₹0 down payment.",tenures:[3,6,9,12,18,24]},{id:"snapmint",name:"Snapmint Pay-in-3",logo:"💳",type:"Debit Card / UPI EMI",tag:"Instant Aadhaar / PAN",desc:"Split your purchase into 3 equal monthly payments with zero credit history required.",tenures:[3,6]},{id:"axio",name:"Axio (formerly Capital Float)",logo:"📱",type:"Pay Later & Flexible EMI",tag:"Pre-Approved on Mobile",desc:"Shop in 1-tap using OTP verification on your mobile number. Up to 12 months EMI.",tenures:[3,6,9,12]},{id:"zest",name:"ZestMoney / Razorpay Affordability",logo:"✨",type:"Digital Credit",tag:"100% Digital KYC",desc:"Instant paperless approval in under 60 seconds. Wide bank network integration.",tenures:[3,6,9,12]}];function ae(e,t,i){if(t===0||!t)return Math.round(e/i);const n=t/12/100,s=e*n*Math.pow(1+n,i)/(Math.pow(1+n,i)-1);return Math.round(s)}const Ne={name:"Velvet Hug Central Mother Warehouse & Sleep Lab",city:"Chennai"},qt=[{prefixRange:[[600001,600132],[603001,603306],[631501,631604]],regionName:"Chennai Metropolitan & Kanchipuram / Chengalpattu",state:"Tamil Nadu",hub:"Velvet Hug Central Mother Hub (Chennai Guindy & Sriperumbudur)",speedTag:"⚡ Same-Day / Next-Day Delivery",deliveryDaysMin:0,deliveryDaysMax:1,partner:"Velvet Hug Direct White-Glove Fleet (Chennai Unit)",vanType:"Eco Electric Delivery Van #01–#06 (Chennai)",freeUnboxing:!0,codAvailable:!0,trialEligible:!0,sameDayCutoff:"14:00",specialNote:"Direct local dispatch from Chennai Mother Warehouse. Order before 2:00 PM for Same-Day Evening Delivery."},{prefixRange:[[601001,643999],[560001,560110],[500001,500099],[682001,682042],[695001,695043],[570001,570030],[520001,520015],[530001,530052]],regionName:"Tamil Nadu State & South Express Corridor (BLR, HYD, Kerala, AP)",state:"South India",hub:"Velvet Hug South Express Corridor (Direct from Chennai Mother Hub)",speedTag:"🚚 Fast 1–2 Days Delivery",deliveryDaysMin:1,deliveryDaysMax:2,partner:"Velvet Hug South Express / BlueDart Priority",vanType:"Dedicated South Regional Cargo Unit",freeUnboxing:!0,codAvailable:!0,trialEligible:!0,sameDayCutoff:"16:00",specialNote:"Direct line-haul transit from Chennai Warehouse. Includes scheduled doorstep room placement."},{prefixRange:[[400001,400104],[410001,412999],[380001,380060],[403001,403806]],regionName:"Mumbai, Pune, Ahmedabad & Goa Metros",state:"Western India",hub:"Velvet Hug West Air Corridor (Air Dispatched from Chennai Airport Hub)",speedTag:"🚚 Guaranteed Delivery in 2–3 Days",deliveryDaysMin:2,deliveryDaysMax:3,partner:"BlueDart Air Express / Delhivery Express",vanType:"Dedicated Air Cargo Priority Unit",freeUnboxing:!0,codAvailable:!0,trialEligible:!0,sameDayCutoff:"15:00",specialNote:"Air cargo dispatched direct from Chennai. Free room placement & packaging recycling included."},{prefixRange:[[110001,110096],[122001,122052],[201001,201318],[302001,302039],[160001,160055],[226001,226030]],regionName:"Delhi-NCR, Gurgaon, Noida, Jaipur, Chandigarh & Lucknow",state:"Northern India",hub:"Velvet Hug North Air Corridor (Air Dispatched from Chennai Airport Hub)",speedTag:"🚚 Guaranteed Delivery in 2–3 Days",deliveryDaysMin:2,deliveryDaysMax:3,partner:"BlueDart Express Air / Delhivery Prime",vanType:"Express Climate-Controlled Flight Unit",freeUnboxing:!0,codAvailable:!0,trialEligible:!0,sameDayCutoff:"15:00",specialNote:"Priority flight shipment from Chennai Mother Hub with real-time GPS tracking & doorstep unboxing."},{prefixRange:[[700001,700160],[751001,751030],[800001,800030],[781001,781040]],regionName:"Kolkata, Bhubaneswar, Patna & Guwahati Metros",state:"East & North-East India",hub:"Velvet Hug East Air & Coastal Hub (Dispatched from Chennai)",speedTag:"📦 Delivery in 3–4 Days",deliveryDaysMin:3,deliveryDaysMax:4,partner:"Delhivery Air Cargo / BlueDart Express",vanType:"Express Cargo Transit",freeUnboxing:!0,codAvailable:!0,trialEligible:!0,sameDayCutoff:"14:00",specialNote:"Direct express flight from Chennai with 100% transit insurance & pre-delivery calling."}];function Ke(e){const t=String(e||"").trim().replace(/D/g,"");if(!t||t.length!==6)return{valid:!1,message:"Please enter a valid 6-digit Indian postal pincode (e.g. 600028, 560001, 400001, 110001)."};const i=parseInt(t,10);let n=null;for(const u of qt){for(const[p,m]of u.prefixRange)if(i>=p&&i<=m){n=u;break}if(n)break}n||(n={regionName:`Pan-India Delivery (PIN ${t})`,state:"India",hub:"Velvet Hug Central Mother Hub, Chennai (National Network)",speedTag:"🚚 Delivery in 4–6 Business Days",deliveryDaysMin:4,deliveryDaysMax:6,partner:"Delhivery Express Surface & BlueDart Air Cargo",vanType:"Pan-India Insured Express Transit",freeUnboxing:!0,codAvailable:!0,trialEligible:!0,sameDayCutoff:"13:00",specialNote:"Directly shipped from Chennai Mother Warehouse with zero transit risk and 100-night trial guarantee."});const s=new Date,r=new Date(s);r.setDate(s.getDate()+n.deliveryDaysMin);const l=new Date(s);l.setDate(s.getDate()+n.deliveryDaysMax);const c={weekday:"short",day:"numeric",month:"short"};let d="";return n.deliveryDaysMin===0?d=s.getHours()<14?`Today by 8:00 PM (${r.toLocaleDateString("en-IN",c)})`:`Tomorrow (${l.toLocaleDateString("en-IN",c)})`:n.deliveryDaysMin===n.deliveryDaysMax?d=`${r.toLocaleDateString("en-IN",c)}`:d=`${r.toLocaleDateString("en-IN",c)} – ${l.toLocaleDateString("en-IN",c)}`,{valid:!0,pincode:t,region:n.regionName,speedTag:n.speedTag,estimatedDateText:d,partner:n.partner,hub:n.hub,originWarehouse:Ne.name+" ("+Ne.city+")",freeUnboxing:n.freeUnboxing,codAvailable:n.codAvailable,trialEligible:n.trialEligible,specialNote:n.specialNote}}const Qe={sleeperProfiles:[{id:"all",label:"All Mattresses",icon:"all"},{id:"kids",label:"Kids (10–17 yrs)",icon:"kids"},{id:"youth",label:"Youth (18–35 yrs)",icon:"youth"},{id:"adult",label:"Adult (35–50 yrs)",icon:"adult"},{id:"senior",label:"Senior / Back Pain",icon:"senior"},{id:"fit-all",label:"Fit for All",icon:"fit"},{id:"big-people",label:"For Big People (Up to 240kg)",icon:"heavy"},{id:"budget",label:"Budget",icon:"budget"}],types:[{key:"Latex",label:"1. Natural Latex"},{key:"Orthopedic",label:"2. Orthopedic Spine-Align"},{key:"Memory Foam",label:"3. NASA Memory Foam"},{key:"Pocket Spring",label:"4. Zero-Motion Pocket Spring"},{key:"Hybrid",label:"5. Adaptive Hybrid"}],priceTiers:[{id:"Foundation",label:"Foundation (₹15,000 – ₹30,000)"},{id:"Signature",label:"Signature (₹30,000 – ₹55,000)"},{id:"Reserve",label:"Reserve (₹55,000+)"},{id:"Budget",label:"Budget (Under ₹15,000)"}],firmnessLevels:[{key:"Soft",label:"1. Soft (Plush)"},{key:"Medium Soft",label:"2. Medium Soft"},{key:"Medium",label:"3. Medium (Balanced)"},{key:"Medium Firm",label:"4. Medium Firm"},{key:"Firm",label:"5. Firm (Orthopedic)"}],sizes:["Single","Twin","Double","Queen","XL Queen","Super Queen","King","Super King","Kids"]};function Ht(e,t={},i="recommended"){var s,r,l,c,d;let n=e.filter(u=>u.category==="mattresses");return t.preset&&t.preset!=="all"&&(t.preset==="kids"?n=n.filter(u=>{var p;return u.sleeperProfile==="Kids"||((p=u.targetAgeGroup)==null?void 0:p.includes("Kids"))}):t.preset==="youth"?n=n.filter(u=>{var p;return u.sleeperProfile==="Youth"||((p=u.targetAgeGroup)==null?void 0:p.includes("Youth"))}):t.preset==="adult"?n=n.filter(u=>{var p;return u.sleeperProfile==="Adult"||((p=u.targetAgeGroup)==null?void 0:p.includes("Adult"))}):t.preset==="senior"?n=n.filter(u=>{var p;return((p=u.sleeperProfile)==null?void 0:p.includes("Senior"))||u.backPainLevel==="Severe Back Pain"||u.firmness==="Firm"}):t.preset==="fit-all"?n=n.filter(u=>u.sleeperProfile==="Fit for All"):t.preset==="big-people"?n=n.filter(u=>u.sleeperProfile==="For Big People"||u.maxWeightKg>=240):t.preset==="budget"&&(n=n.filter(u=>u.sleeperProfile==="Budget"||u.collection==="Budget"||u.basePrice<=15e3))),(s=t.types)!=null&&s.length&&(n=n.filter(u=>{var p;return t.types.includes(u.mattressType)||((p=u.materials)==null?void 0:p.some(m=>t.types.includes(m)))})),(r=t.tiers)!=null&&r.length&&(n=n.filter(u=>t.tiers.includes(u.collection))),(l=t.firmness)!=null&&l.length&&(n=n.filter(u=>t.firmness.includes(u.firmness))),(c=t.sizes)!=null&&c.length&&(n=n.filter(u=>{var p;return(p=u.sizes)==null?void 0:p.some(m=>t.sizes.includes(m))})),(d=t.thickness)!=null&&d.length&&(n=n.filter(u=>t.thickness.includes(u.thicknessInch))),t.maxPrice&&(n=n.filter(u=>u.basePrice<=t.maxPrice)),i==="price-low"?n.sort((u,p)=>u.basePrice-p.basePrice):i==="price-high"?n.sort((u,p)=>p.basePrice-u.basePrice):i==="rating"?n.sort((u,p)=>p.rating-u.rating||p.reviews-u.reviews):i==="firmness-soft"?n.sort((u,p)=>(u.firmnessScore||5)-(p.firmnessScore||5)):i==="firmness-firm"?n.sort((u,p)=>(p.firmnessScore||5)-(u.firmnessScore||5)):n.sort((u,p)=>(p.badge==="bestseller"?1:0)-(u.badge==="bestseller"?1:0)||p.rating-u.rating),n}function _t(e={}){const t=B.filter(d=>d.category==="mattresses"),i=e.q_age||e.age||e.q1,n=e.q_pain||e.backpain||e.q2,s=e.q_weight||e.weight||e.q3,r=e.q_firmness||e.firmness||e.q4,l=e.q_price||e.price||e.q5,c=t.map(d=>{var y;let u=50,p=[];s==="heavy"?d.id==="vh-m007"||d.sleeperProfile==="For Big People"||d.maxWeightKg>=240?(u+=45,p.push("Heavy-duty reinforced titanium coil core supporting up to 240 kg.")):d.firmness==="Firm"||d.firmness==="Medium Firm"?u+=15:u-=25:s==="medium"&&(d.mattressType==="Hybrid"||d.mattressType==="Pocket Spring"||d.sleeperProfile==="Fit for All")&&(u+=20,p.push("Zero partner motion transfer & balanced weight distribution.")),i==="kids"?d.id==="vh-m005"||d.sleeperProfile==="Kids"?(u+=40,p.push("Dynamic active bounce & spinal growth support for ages 10–17.")):(d.firmness==="Medium"||d.firmness==="Medium Soft")&&(u+=10):i==="youth"?(d.sleeperProfile==="Youth"||d.id==="vh-m003"||d.id==="vh-m009")&&(u+=30,p.push("Plush contouring & high-energy pressure relief for active youth.")):i==="adult"?(d.sleeperProfile==="Adult"||d.id==="vh-m001"||d.id==="vh-m002")&&(u+=25,p.push("Ergonomic 5-zone spine neutrality for workday posture relief.")):i==="senior"&&((y=d.sleeperProfile)!=null&&y.includes("Senior")||d.firmness==="Firm"||d.id==="vh-m002"||d.id==="vh-m008")&&(u+=35,p.push("Clinical firm orthopedic pushback with zero sink for easy movement.")),n==="severe_pain"||n==="severe"?d.doctorRecommended||d.backPainLevel==="Severe Back Pain"||d.firmness==="Firm"?(u+=35,p.push("Doctor-certified orthopedic spinal alignment prevents nerve compression.")):d.firmness==="Soft"&&(u-=30):(n==="mild_pain"||n==="mild")&&(d.firmness==="Medium Firm"||d.doctorRecommended)&&(u+=25,p.push("Medium-Firm lumbar contouring alleviates morning stiffness."));const h={soft:"Soft",medium_soft:"Medium Soft",medium:"Medium",medium_firm:"Medium Firm",firm:"Firm"}[r]||r;h&&d.firmness===h&&(u+=25,p.push(`Exact firmness match: ${d.firmness}.`));const g={budget:"Budget",foundation:"Foundation",signature:"Signature",reserve:"Reserve"}[l]||l;return g&&(d.collection===g||g==="Budget"&&d.basePrice<=15e3)&&(u+=20,p.push(`Matches your ${g} budget tier.`)),{product:d,score:Math.min(99,Math.max(60,u)),reason:p.slice(0,2).join(" ")||"Clinically engineered for restorative posture."}});return c.sort((d,u)=>u.score-d.score||u.product.rating-d.product.rating),c.slice(0,3)}const Ye="vh_returns_data",jt=[];function Se(){try{const e=localStorage.getItem(Ye);if(e)return JSON.parse(e)}catch{}return jt}function Je(e){try{localStorage.setItem(Ye,JSON.stringify(e))}catch{}}const Vt=window.location.origin;class Gt{constructor(){this.token=this.getCookie("vh_sess_tok")||null,this.adminToken=this.getCookie("vh_admin_tok")||null}getCookie(t){const n=`; ${document.cookie}`.split(`; ${t}=`);return n.length===2?n.pop().split(";").shift():null}setCookie(t,i,n=30){const s=new Date;s.setTime(s.getTime()+n*24*60*60*1e3),document.cookie=`${t}=${i};expires=${s.toUTCString()};path=/;SameSite=Strict`}deleteCookie(t){document.cookie=`${t}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`}async request(t,i={}){const n=`${Vt}${t}`,s={"Content-Type":"application/json",...i.headers};this.token&&!s.Authorization&&(s.Authorization=`Bearer ${this.token}`),this.adminToken&&t.startsWith("/api/company")&&(s.Authorization=`Bearer ${this.adminToken}`);const r=typeof AbortController<"u"?new AbortController:null,l=r?setTimeout(()=>r.abort(),i.timeout||5e3):null,c={...i,headers:s,signal:i.signal||(r?r.signal:void 0)},d=performance.now();try{const u=await fetch(n,c);l&&clearTimeout(l);const p=(performance.now()-d).toFixed(2),m=await u.text();let h;try{h=m?JSON.parse(m):{}}catch{throw new Error(u.ok?"Backend returned an invalid response.":`Backend unavailable (HTTP ${u.status}). Start the backend with npm run server.`)}if(!u.ok){if(u.status===401&&t==="/api/user/session")return{success:!1,error:"Session expired or not logged in"};throw new Error(h.error||`HTTP ${u.status}: Failed to fetch from backend`)}return h._clientLatencyMs=p,h}catch(u){throw console.error(`[API Error] ${i.method||"GET"} ${t}:`,u.message),u}}async health(){return this.request("/api/health")}async getProducts(t={}){const i=new URLSearchParams(t).toString();return this.request(`/api/catalog/products${i?"?"+i:""}`)}async getProduct(t){return this.request(`/api/catalog/products/${encodeURIComponent(t)}`)}async getCategories(){return this.request("/api/catalog/categories")}async getDoctors(){return this.request("/api/catalog/doctors")}async getPromos(){return this.request("/api/catalog/promos")}async getQuizQuestions(){return this.request("/api/catalog/quiz")}async getFoundingPartnerStats(){return this.request("/api/catalog/founding-count")}async sendOtp(t){return this.request("/api/user/auth/send-otp",{method:"POST",body:JSON.stringify(t)})}async verifyOtp(t){const i=await this.request("/api/user/auth/verify-otp",{method:"POST",body:JSON.stringify(t)});return i.token&&(this.token=i.token,this.setCookie("vh_sess_tok",i.token)),i}async loginOrRegister(t){const i=await this.request("/api/user/auth/login-or-register",{method:"POST",body:JSON.stringify(t)});return i.token&&(this.token=i.token,this.setCookie("vh_sess_tok",i.token)),i}async getSession(){return this.token?this.request("/api/user/session"):{success:!1,error:"Not authenticated"}}async updateProfile(t){return this.request("/api/user/profile",{method:"PATCH",body:JSON.stringify(t)})}async getAddresses(){return this.request("/api/user/addresses")}async addAddress(t){return this.request("/api/user/addresses",{method:"POST",body:JSON.stringify(t)})}async deleteAddress(t){return this.request(`/api/user/addresses/${t}`,{method:"DELETE"})}async setDefaultAddress(t){return this.request(`/api/user/addresses/${t}/default`,{method:"PATCH"})}logout(){this.token=null,this.deleteCookie("vh_sess_tok")}async getCart(t){return this.request(`/api/user/cart?sessionId=${encodeURIComponent(t)}`)}async addToCart(t){return this.request("/api/user/cart",{method:"POST",body:JSON.stringify(t)})}async removeCartItem(t){return this.request(`/api/user/cart/${t}`,{method:"DELETE"})}async clearCart(t){return this.request(`/api/user/cart?sessionId=${encodeURIComponent(t)}`,{method:"DELETE"})}async checkout(t){return this.request("/api/user/checkout",{method:"POST",body:JSON.stringify(t)})}async getUserOrders(t={}){const i=new URLSearchParams(t).toString();return this.request(`/api/user/orders${i?"?"+i:""}`)}async submitReturn(t){return this.request("/api/user/returns",{method:"POST",body:JSON.stringify(t)})}async submitQuizDiagnosis(t){return this.request("/api/user/quiz/submit",{method:"POST",body:JSON.stringify(t)})}async companyLogin(t,i,n){const s=await this.request("/api/company/auth/login",{method:"POST",body:JSON.stringify({email:t,password:i,twoFactorCode:n})});return s.token&&(this.adminToken=s.token,this.setCookie("vh_admin_tok",s.token)),s}async getCompanyStats(){return this.request("/api/company/stats")}async getCompanyInventory(){return this.request("/api/company/inventory")}async updateCompanyInventory(t,i){return this.request(`/api/company/inventory/${t}`,{method:"PATCH",body:JSON.stringify(i)})}async getCompanyOrders(){return this.request("/api/company/orders")}async updateCompanyOrderStatus(t,i){return this.request(`/api/company/orders/${t}/status`,{method:"PATCH",body:JSON.stringify(i)})}async getCompanyReturns(){return this.request("/api/company/returns")}async updateCompanyReturnStatus(t,i){return this.request(`/api/company/returns/${t}`,{method:"PATCH",body:JSON.stringify(i)})}async getCompanyAuditLogs(){return this.request("/api/company/audit-logs")}async createCompanySku(t){return this.request("/api/company/inventory",{method:"POST",body:JSON.stringify(t)})}async deleteCompanySku(t){return this.request(`/api/company/inventory/${encodeURIComponent(t)}`,{method:"DELETE"})}async resetUsersData(){return this.request("/api/system/reset-users",{method:"POST"})}async resetCompanyData(){return this.request("/api/system/reset-company",{method:"POST"})}async fullSystemReset(){return this.request("/api/system/full-reset",{method:"POST"})}async getShopifyStatus(){return this.request("/api/shopify/status")}async exportShopifyCatalog(){return this.request("/api/shopify/export-catalog")}}const k=new Gt;typeof window<"u"&&(window.vhApi=k);const qe={rain:{label:"Rain",generate(e){const t=[],i=e.sampleRate*3,n=e.createBuffer(1,i,e.sampleRate),s=n.getChannelData(0);for(let m=0;m<i;m++)s[m]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=n,r.loop=!0;const l=e.createBiquadFilter();l.type="bandpass",l.frequency.value=1e3,l.Q.value=.3;const c=e.createGain();c.gain.value=.18,r.connect(l),l.connect(c),c.connect(e.destination),r.start();const d=e.createOscillator();d.type="sine",d.frequency.value=60;const u=e.createGain();u.gain.value=0,d.connect(u),u.connect(e.destination),d.start();function p(){const m=8e3+Math.random()*2e4;setTimeout(()=>{const h=e.currentTime;u.gain.setValueAtTime(0,h),u.gain.linearRampToValueAtTime(.05,h+.5),u.gain.linearRampToValueAtTime(0,h+3),p()},m)}return p(),t.push(r,d),{nodes:t,gainNodes:[c,u]}}},ocean:{label:"Ocean",generate(e){const t=[],i=e.sampleRate*4,n=e.createBuffer(1,i,e.sampleRate),s=n.getChannelData(0);for(let p=0;p<i;p++)s[p]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=n,r.loop=!0;const l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=400;const c=e.createGain();c.gain.value=.15;const d=e.createOscillator();d.type="sine",d.frequency.value=.12;const u=e.createGain();return u.gain.value=.08,d.connect(u),u.connect(c.gain),r.connect(l),l.connect(c),c.connect(e.destination),r.start(),d.start(),t.push(r,d),{nodes:t,gainNodes:[c,u]}}},forest:{label:"Forest",generate(e){const t=[],i=e.createGain();i.gain.value=.08,i.connect(e.destination);const n=e.createBuffer(1,e.sampleRate*2,e.sampleRate),s=n.getChannelData(0);for(let d=0;d<s.length;d++)s[d]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=n,r.loop=!0;const l=e.createBiquadFilter();l.type="bandpass",l.frequency.value=200,l.Q.value=.5,r.connect(l),l.connect(i),r.start();function c(){const d=e.createOscillator();d.type="sine",d.frequency.value=1800+Math.random()*800;const u=e.createGain();u.gain.value=0,d.connect(u),u.connect(e.destination),d.start();const p=e.currentTime;u.gain.setValueAtTime(0,p),u.gain.linearRampToValueAtTime(.04,p+.05),u.gain.exponentialRampToValueAtTime(.001,p+.4),d.stop(p+.5),setTimeout(c,1500+Math.random()*4e3)}return c(),t.push(r),{nodes:t,gainNodes:[i]}}},fireplace:{label:"Fireplace",generate(e){const t=[],i=e.sampleRate*2,n=e.createBuffer(1,i,e.sampleRate),s=n.getChannelData(0);for(let u=0;u<i;u++)s[u]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=n,r.loop=!0;const l=e.createBiquadFilter();l.type="bandpass",l.frequency.value=800,l.Q.value=.2;const c=e.createGain();c.gain.value=.12,r.connect(l),l.connect(c),c.connect(e.destination),r.start();function d(){const u=e.createBuffer(1,2048,e.sampleRate),p=u.getChannelData(0);for(let f=0;f<p.length;f++)p[f]=(Math.random()*2-1)*Math.exp(-f/400);const m=e.createBufferSource();m.buffer=u;const h=e.createGain();h.gain.value=.6,m.connect(h),h.connect(e.destination),m.start(),setTimeout(d,800+Math.random()*3e3)}return d(),t.push(r),{nodes:t,gainNodes:[c]}}},breathing:{label:"Breathe",generate(e){const t=e.createGain();t.gain.value=0,t.connect(e.destination);const i=e.createOscillator();i.type="sine",i.frequency.value=80;const n=e.createBiquadFilter();n.type="lowpass",n.frequency.value=200,i.connect(n),n.connect(t),i.start();function s(){const r=e.currentTime;t.gain.setValueAtTime(0,r),t.gain.linearRampToValueAtTime(.06,r+4),t.gain.setValueAtTime(.03,r+4),t.gain.setValueAtTime(.03,r+11),t.gain.linearRampToValueAtTime(0,r+19),setTimeout(s,22e3)}return s(),{nodes:[i],gainNodes:[t]}}}};class Ut{constructor(){this.ctx=null,this.active=null,this.activeLabel=null,this.activeHandles=null,this._masterGain=null}_initCtx(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this._masterGain=this.ctx.createGain(),this._masterGain.gain.value=1,this._masterGain.connect(this.ctx.destination)),this.ctx.state==="suspended"&&this.ctx.resume()}async play(t){if(this._initCtx(),this.active===t)return this.stop(),!1;this.stop();const i=qe[t];return i?(this.activeHandles=i.generate(this.ctx),this.active=t,this.activeLabel=i.label,!0):!1}stop(){if(this.activeHandles){try{this.activeHandles.nodes.forEach(t=>{try{t.stop()}catch{}}),this.activeHandles.gainNodes.forEach(t=>{try{t.gain.setValueAtTime(0,this.ctx.currentTime)}catch{}})}catch{}this.activeHandles=null}this.active=null,this.activeLabel=null}get isPlaying(){return!!this.active}get currentPreset(){return this.active}get presets(){return qe}}const Wt=new Ut;function R(e){if(!e)return"";if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))return e;if(typeof window<"u"&&window.SHOPIFY_CDN){const t=e.split("/").pop().split("?")[0];return window.SHOPIFY_CDN+t}return e}typeof window<"u"&&(window.resolveAssetUrl=R);const Q="vh_user_data",Ze="vh_cart_data",Xe="vh_founding_count",He="vh_backend_session";function F(){let e=localStorage.getItem(He);return e||(e=`guest_${crypto.randomUUID?crypto.randomUUID():`${Date.now()}_${Math.random().toString(36).slice(2)}`}`,localStorage.setItem(He,e)),e}function Z(e=[]){return e.map(t=>{const i=re(t.productId)||{id:t.productId,name:t.name,basePrice:t.unitPrice,image:t.image,category:t.category};return{id:t.id,product:i,productId:t.productId,size:t.size,qty:t.quantity,price:t.unitPrice}})}function Kt(e){return{...e,date:e.created_at?new Date(e.created_at).toLocaleDateString("en-IN"):"Just now",total:Number(e.total_amount??e.total??e.amount??0),amount:Number(e.total_amount??e.total??e.amount??0),status:e.order_status||e.status||"confirmed",trackingId:e.tracking_number||e.trackingId,address:e.delivery_address||e.address||"Registered Address",items:(e.items||[]).map(t=>({...t,name:t.productName||t.product_name||t.name,qty:t.quantity||t.qty||1}))}}async function et(){var t;if(!((t=a.user)!=null&&t.id)||!k.token)return[];const e=await k.getUserOrders({customerId:a.user.id});if(!(e!=null&&e.success))throw new Error((e==null?void 0:e.error)||"Unable to load orders");return a.user.orders=(e.data||[]).map(Kt),A(a.user),a.user.orders}async function Qt(){var e,t,i,n,s;try{const r=await Promise.allSettled([k.getProducts(),k.getPromos(),k.getQuizQuestions(),k.getCart(F()),k.getSession()]),l=((e=r[0])==null?void 0:e.status)==="fulfilled"?r[0].value:null,c=((t=r[1])==null?void 0:t.status)==="fulfilled"?r[1].value:null,d=((i=r[2])==null?void 0:i.status)==="fulfilled"?r[2].value:null,u=((n=r[3])==null?void 0:n.status)==="fulfilled"?r[3].value:null,p=((s=r[4])==null?void 0:s.status)==="fulfilled"?r[4].value:null;return l!=null&&l.success&&Array.isArray(l.data)&&l.data.length&&B.splice(0,B.length,...l.data),c!=null&&c.success&&Array.isArray(c.data)&&c.data.length&&j.splice(0,j.length,...c.data.map(m=>({...m,coupon:m.code||m.coupon,message:m.description||m.message,endsAt:m.end_date?new Date(m.end_date):null}))),d!=null&&d.success&&Array.isArray(d.data)&&d.data.length&&he.splice(0,he.length,...d.data),u!=null&&u.success&&(a.cart=Z(u.items)),p!=null&&p.success&&p.customer&&(a.user=p.customer),!0}catch(r){return console.warn("[Velvet Hug] Backend hydration notice:",r.message),!1}}function tt(){try{const e=localStorage.getItem(Q);if(e){const n=JSON.parse(e);n&&(n.name==="Arjun Sharma"||n.email==="arjun.sharma@gmail.com"||n.phone==="9876543210"||n.phone==="+91 98765 43210"||n.referralCode==="VELVET-ARJUN212")&&localStorage.removeItem(Q)}const t=localStorage.getItem("vh_registered_users");if(t){const n=JSON.parse(t);let s=!1;for(const r of Object.keys(n)){const l=n[r];l&&(l.name==="Arjun Sharma"||l.email==="arjun.sharma@gmail.com"||l.phone==="9876543210"||l.phone==="+91 98765 43210"||l.referralCode==="VELVET-ARJUN212")&&(delete n[r],s=!0)}s&&localStorage.setItem("vh_registered_users",JSON.stringify(n))}const i=localStorage.getItem("vh_admin_store_v1");if(i){const n=JSON.parse(i);if(n.orders&&Array.isArray(n.orders)){const s=n.orders.filter(r=>r.customer!=="Arjun Sharma"&&r.email!=="arjun.sharma@gmail.com"&&r.phone!=="+91 9876543210"&&r.phone!=="+91 98765 43210");s.length!==n.orders.length&&(n.orders=s,localStorage.setItem("vh_admin_store_v1",JSON.stringify(n)))}}}catch{}}tt();function Yt(){tt();try{const e=localStorage.getItem(Q);if(e){const t=JSON.parse(e);return t&&(t.name==="Arjun Sharma"||t.email==="arjun.sharma@gmail.com"||t.phone==="9876543210"||t.phone==="+91 98765 43210"||t.referralCode==="VELVET-ARJUN212")?(localStorage.removeItem(Q),null):t}}catch{}return null}function A(e){try{e?localStorage.setItem(Q,JSON.stringify(e)):localStorage.removeItem(Q)}catch{}}function Jt(){try{const e=localStorage.getItem(Ze);if(e)return JSON.parse(e)}catch{}return[]}function V(e){try{localStorage.setItem(Ze,JSON.stringify(e||[]))}catch{}}function Zt(){try{const e=localStorage.getItem(Xe);if(e)return parseInt(e,10)}catch{}return Bt}function Xt(e){try{localStorage.setItem(Xe,e.toString())}catch{}}const a={currentPage:"home",cart:Jt(),compareList:[],filters:{size:[],material:[],firmness:[],tier:[],ageGroup:[],packaging:[]},mattressFilters:{preset:"all",sizes:[],firmness:[],materials:[],sleepNeeds:[],thickness:[],maxPrice:null},mattressSort:"recommended",rememberedPincode:localStorage.getItem("vh_checked_pincode")||"600028",activeCategory:"mattresses",activeAccSubTab:"All",foundingCount:Zt(),promoIndex:0,quizAnswers:{},quizStep:0,user:k.token?Yt():null,searchQuery:"",pdpProduct:null,checkoutStep:"details",paymentMethod:"upi",activeAccountTab:"overview",appliedCoupon:null,signupChannel:"phone",loginChannel:"phone",modalSignupChannel:"phone",modalLoginChannel:"phone",pendingSignup:null,pendingLogin:null,otpTimerSecs:45};function o(e,t=document){return t.querySelector(e)}function T(e,t=document){return[...t.querySelectorAll(e)]}window.qs=o;window.qsa=T;function z(e){return{Single:.65,Twin:.7,Double:.85,Queen:1,"XL Queen":1.08,"Super Queen":1.15,King:1.22,"Super King":1.35,Kids:.6,Bunk:.72,"Guest room":.8,Standard:1}[e]??1}function v(e,t=2800){const i=o("#globalToast");i&&(i.textContent=e,i.classList.add("show"),clearTimeout(a._toastTimer),a._toastTimer=setTimeout(()=>i.classList.remove("show"),t))}function E(e,t=!0){if(e||(e="home"),(e==="pillows"||e==="cushions"||e==="bolsters")&&(a.activeAccSubTab=e==="pillows"?"Pillows":e==="cushions"?"Cushions":"Bolsters",e="accessories"),e===a.currentPage){e==="account"&&I(),["mattresses","pillows","accessories"].includes(e)&&_(e),e==="emi"&&we(),e==="returns"&&Ge();return}a.currentPage=e,t&&history.pushState({page:e},"",e==="home"?"/":`/${e}`),T(".page-view").forEach(n=>{n.classList.remove("active"),n.style.display="none"});const i=o(`#view-${e}`);if(i)i.classList.add("active"),i.style.display="block";else{const n=o("#view-home");n&&(n.classList.add("active"),n.style.display="block")}e==="home"?window._resumeHeroCarousel&&window._resumeHeroCarousel():window._pauseHeroCarousel&&window._pauseHeroCarousel(),["mattresses","pillows","accessories"].includes(e)&&(a.activeCategory=e,_(e)),e==="account"&&I(),e==="emi"&&we(),e==="returns"&&Ge(),T(".nav-link").forEach(n=>{n.classList.toggle("active",n.dataset.page===e)}),T(".mobile-nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.mobilePage===e)}),window.scrollTo(0,0)}function it(){const e=window.location.pathname.replace(/^\/+|\/+$/g,"").toLowerCase();if(e.includes("mattress"))return"mattresses";if(e.includes("pillow"))return"pillows";if(e.includes("cushion"))return"cushions";if(e.includes("bolster"))return"bolsters";if(e.includes("accessories"))return"accessories";if(e.includes("account"))return"account";if(e.includes("emi"))return"emi";if(e.includes("returns")||e.includes("warranty")||e.includes("care")||e.includes("repair"))return"returns";if(e.includes("quiz"))return"quiz";if(e.includes("compare"))return"compare";const t=window.location.hash.replace("#","").toLowerCase();if(t.includes("mattress"))return"mattresses";if(t.includes("pillow"))return"pillows";if(t.includes("cushion"))return"cushions";if(t.includes("bolster"))return"bolsters";if(t.includes("accessories"))return"accessories";if(t.includes("account"))return"account";if(t.includes("emi"))return"emi";if(t.includes("returns")||t.includes("warranty"))return"returns";const n=new URLSearchParams(window.location.search).get("page");return n||"home"}window.addEventListener("popstate",e=>{var i;const t=((i=e.state)==null?void 0:i.page)||it();E(t,!1)});function ei(){document.addEventListener("click",e=>{var s,r,l;const t=e.target.closest("a");if(!t)return;const i=t.getAttribute("href");if(!i||i.startsWith("http")||i.startsWith("//")||i.startsWith("mailto:")||i.startsWith("tel:")||i.startsWith("#")||i.startsWith("/api")||i.startsWith("/admin")||i.startsWith("/inspector")||i.startsWith("/images")||i.startsWith("/src")||i.endsWith(".xml")||i.endsWith(".jpg")||i.endsWith(".png")||t.target==="_blank"||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();const n=i.replace(/^\/+|\/+$/g,"")||"home";if(n==="privacy-policy"){(s=window.openPrivacyPolicyModal)==null||s.call(window);return}if(n==="terms"){(r=window.openTermsModal)==null||r.call(window);return}if(n==="quiz"){(l=window.openQuiz)==null||l.call(window);return}E(n,!0)})}window.navigateTo=E;window.goToPage=E;let ge=null;function ti(){ge&&clearInterval(ge);function e(){var h;const t=Date.now(),i=((h=j[0])!=null&&h.endsAt?new Date(j[0].endsAt).getTime():0)||t+(3*86400+14*3600+22*60)*1e3,n=Math.max(0,i-t),s=Math.floor(n/864e5),r=Math.floor(n%864e5/36e5),l=Math.floor(n%36e5/6e4),c=Math.floor(n%6e4/1e3),d=f=>String(f).padStart(2,"0"),u=s>0?`${d(s)}d ${d(r)}h ${d(l)}m`:`${d(r)}h ${d(l)}m ${d(c)}s`,p=o("#promoCountdown");p&&(p.textContent=u);const m=o("#promoAdCountdown");m&&(m.textContent=u)}e(),ge=setInterval(e,1e3)}function ii(){var n,s;const e=o("#promoBanner");if(!e||!j.length)return;let t=0;function i(){const r=j[t],l=o("#promoMessage",e),c=o("#promoTag",e),d=o("#promoCoupon",e);l&&(l.textContent=r.message),c&&(c.textContent=r.tag),d&&(d.textContent=r.coupon)}i(),ti(),setInterval(()=>{t=(t+1)%j.length,i()},6e3),(n=o("#promoCoupon",e))==null||n.addEventListener("click",()=>{var r,l;(l=navigator.clipboard)==null||l.writeText(((r=j[t])==null?void 0:r.coupon)||"FOUNDING15").catch(()=>{}),v("🎉 Coupon code copied!")}),(s=o("#promoCloseBt"))==null||s.addEventListener("click",()=>{e.style.display="none"})}function ni(){const e=o("#foundingCounterNum"),t=o("#foundingProgressFill"),i=o("#foundingCounterLabel"),n=o("#promoMessage");if(!e)return;function s(l){a.foundingCount=l,Xt(a.foundingCount),e&&(e.textContent=a.foundingCount.toLocaleString("en-IN"));const c=Math.min(100,Math.round(a.foundingCount/1e3*100));if(t&&(t.style.width=c+"%"),i)if(a.foundingCount>=1e3)i.textContent=`All 1,000 Founding spots claimed! Now welcoming Sleep Partner #${a.foundingCount+1}`;else{const d=1e3-a.foundingCount;i.textContent=`${d} Founding spots remaining of 1,000`}n&&(a.foundingCount<=1e3?n.textContent=`First 1,000 Sleep Partners — 15% Lifetime Price Lock (${a.foundingCount} Claimed)`:n.textContent=`Over ${a.foundingCount.toLocaleString("en-IN")} Rested Sleep Partners Across India — Code FOUNDING15`)}s(a.foundingCount);function r(){const l=25e3+Math.random()*4e4;setTimeout(()=>{s(a.foundingCount+1),r()},l)}r()}function oi(){document.addEventListener("click",e=>{const t=e.target.closest("[data-page]");if(t){e.preventDefault();const s=t.dataset.page;s&&E(s);return}const i=e.target.closest("[data-navigate-category]");if(i){e.preventDefault();const s=i.dataset.navigateCategory;s&&(dt(),E(s));return}if(e.target.closest(".brand-logo")){e.preventDefault(),E("home");return}})}function si(){document.addEventListener("click",async e=>{const t=e.target.closest("[data-sound]");if(!t)return;const i=t.dataset.sound,n=await Wt.play(i);T("[data-sound]").forEach(s=>{s.dataset.sound===i?s.classList.toggle("active",n):s.classList.remove("active")}),v(n?`🎵 Ambient sound: ${i.toUpperCase()} playing`:"🔇 Ambient sound paused")})}function nt(){const e=o("#searchModal"),t=o("#searchInput");e&&(e.classList.add("active"),setTimeout(()=>t==null?void 0:t.focus(),100))}function ve(){var e;(e=o("#searchModal"))==null||e.classList.remove("active")}window.openSearch=nt;window.closeSearch=ve;function ai(){var n,s;const e=o("#searchModal"),t=o("#searchInput"),i=o("#searchResults");(n=o("#headerSearchBtn"))==null||n.addEventListener("click",nt),(s=o("#searchModalClose"))==null||s.addEventListener("click",ve),e==null||e.addEventListener("click",r=>{r.target===e&&ve()}),t==null||t.addEventListener("input",r=>{const l=r.target.value.trim();if(!l){i&&(i.innerHTML="");return}const c=Be(l);_e(c,i)}),T(".search-quick-tag").forEach(r=>{r.addEventListener("click",()=>{if(t){t.value=r.textContent.trim();const l=Be(t.value);_e(l,i)}})}),window.addEventListener("keydown",r=>{var l,c,d,u,p,m,h,f,g,y,x,b,w,P,M;if(r.key==="Escape"){(l=window.closeSearch)==null||l.call(window),(c=window.closeCart)==null||c.call(window),(d=window.closePDP)==null||d.call(window),(u=window.closeQuiz)==null||u.call(window),(p=window.closeCheckout)==null||p.call(window),(m=window.closeAccountModal)==null||m.call(window),(h=window.closeLoginModal)==null||h.call(window),(f=window.closePromoAd)==null||f.call(window),(g=window.closeEmiModal)==null||g.call(window),(y=window.closeReturnRequestModal)==null||y.call(window),(x=window.closeSubmitStoryModal)==null||x.call(window),(b=window.closeOrderReviewModal)==null||b.call(window),(w=window.closeCorporateInquiry)==null||w.call(window),(P=window.closePrivacyPolicyModal)==null||P.call(window),(M=window.closeTermsModal)==null||M.call(window),T(".modal-backdrop.active, .cart-drawer-backdrop.active, .promo-modal-backdrop.active").forEach(L=>{L.classList.remove("active","open"),(L.style.display==="flex"||L.style.display==="block")&&(L.style.display="none")}),document.body.style.overflow="";return}(r.metaKey||r.ctrlKey)&&r.key.toLowerCase()==="k"&&(r.preventDefault(),e==null||e.classList.add("active"),setTimeout(()=>t==null?void 0:t.focus(),100))})}function _e(e,t){if(t){if(!e.length){t.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted);">No products found matching your search.</div>';return}t.innerHTML=e.map(i=>`
    <div class="search-result-item" onclick="openPDP(getProductById('${i.id}'));document.getElementById('searchModal').classList.remove('active');">
      <img src="${R(i.image)}" alt="${i.name}" class="search-result-img" onerror="this.style.display='none'">
      <div style="flex:1;">
        <div style="font-family:var(--font-serif);font-weight:600;color:var(--midnight-blue);">${i.name}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${i.collection||""} · ${i.category}</div>
        <div style="font-size:0.84rem;font-weight:700;color:var(--midnight-blue);margin-top:2px;">${S(i.basePrice)} <span style="text-decoration:line-through;color:var(--text-muted);font-weight:400;font-size:0.76rem;">${S(i.mrp)}</span></div>
      </div>
      <span class="badge badge-founding" style="font-size:0.65rem;">View</span>
    </div>
  `).join("")}}function ri(){var e,t,i,n;D(),(e=o("#cartBtn"))==null||e.addEventListener("click",ue),(t=o("#cartDrawerClose"))==null||t.addEventListener("click",Y),(i=o("#cartDrawerBackdrop"))==null||i.addEventListener("click",s=>{s.target===o("#cartDrawerBackdrop")&&Y()}),(n=o("#checkoutBtn"))==null||n.addEventListener("click",()=>{if(a.cart.length===0){v("Your cart is empty. Please add items to proceed.");return}Oe()})}function ue(){G();const e=o("#cartDrawerBackdrop");e&&(e.style.display="flex",e.classList.add("active","open"))}function Y(){const e=o("#cartDrawerBackdrop");e&&(e.classList.remove("active","open"),e.style.display="none")}async function ke(){const e=await k.getCart(F());e!=null&&e.success&&(a.cart=Z(e.items),D(),G())}async function pe(e,t="Standard",i=1,n=null){const s=re(e);if(!s)return;const r=n!==null?n:Math.round(s.basePrice*z(t));try{await k.addToCart({sessionId:F(),productId:e,size:t,quantity:i}),await ke()}catch(l){const c=a.cart.findIndex(d=>d.product.id===e&&d.size===t);c>-1?a.cart[c].qty+=i:a.cart.push({product:s,size:t,qty:i,price:r}),V(a.cart),console.warn("[Cart] Backend add failed; local fallback used:",l.message)}D(),v(`✓ Added "${s.name}" (${t}) to cart!`),ue()}async function ot(e){const t=a.cart[e];try{if(t!=null&&t.id)await k.removeCartItem(t.id);else throw new Error("Cart item is not persisted yet");await ke()}catch(i){a.cart.splice(e,1),V(a.cart),D(),G(),console.warn("[Cart] Backend removal failed; local fallback used:",i.message)}}async function li(e,t){if(a.cart[e].qty+=t,a.cart[e].qty<=0)await ot(e);else try{await k.clearCart(F());for(const i of a.cart)await k.addToCart({sessionId:F(),productId:i.product.id,size:i.size,quantity:i.qty});await ke()}catch(i){V(a.cart),G(),D(),console.warn("[Cart] Backend quantity update failed; local fallback used:",i.message)}}function st(){try{const e=localStorage.getItem("vh_wishlist");return e?JSON.parse(e):[]}catch{return[]}}function je(e){try{localStorage.setItem("vh_wishlist",JSON.stringify(e))}catch{}}window.toggleWishlist=function(e,t){let i=st();i.includes(e)?(i=i.filter(s=>s!==e),je(i),t&&t.classList.remove("active"),v("Removed from Sleep Wishlist")):(i.push(e),je(i),t&&t.classList.add("active"),v("❤️ Saved to Sleep Wishlist"))};window.isWishlisted=function(e){return st().includes(e)};function D(){const e=a.cart.reduce((n,s)=>n+s.qty,0),t=o("#cartBadge"),i=o("#mobileCartBadge");t&&(t.textContent=e,t.style.transform="scale(1.3)",setTimeout(()=>{t.style.transform="scale(1)"},200)),i&&(i.textContent=e,i.style.display=e>0?"inline-flex":"none")}function Pe(){return a.cart.reduce((e,t)=>e+(t.price??t.product.basePrice)*t.qty,0)}function G(){const e=o("#cartItemsScroll"),t=o("#cartTotal");if(e){if(a.cart.length===0){e.innerHTML=`
      <div style="padding:48px 24px;text-align:center;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:12px;">🛒</div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;color:var(--midnight-blue);margin-bottom:6px;">Your cart is empty</div>
        <p style="font-size:0.84rem;margin-bottom:16px;">Explore our handcrafted mattresses & pillows.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCart();goToPage('mattresses')">Shop Mattresses</button>
      </div>`,t&&(t.textContent="₹0");return}e.innerHTML=a.cart.map((i,n)=>`
    <div class="cart-item-row">
      <img src="${R(i.product.image)}" alt="${i.product.name}" class="cart-item-thumb" onerror="this.style.display='none'">
      <div class="cart-item-info">
        <div class="cart-item-title">${i.product.name}</div>
        <div class="cart-item-meta">${i.size} · ${S(i.price??i.product.basePrice)}</div>
        <div class="cart-item-actions">
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQty(${n}, -1)">−</button>
            <span class="qty-num">${i.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${n}, 1)">+</button>
          </div>
          <button class="remove-cart-item-btn" onclick="removeFromCart(${n})">Remove</button>
        </div>
      </div>
      <div style="font-weight:700;font-size:0.95rem;color:var(--midnight-blue);">
        ${S((i.price??i.product.basePrice)*i.qty)}
      </div>
    </div>
  `).join(""),t&&(t.textContent=S(Pe()))}}window.addToCart=pe;window.removeFromCart=ot;window.updateCartQty=li;window.closeCart=Y;window.openCart=ue;window._openCartReal=ue;window._closeCartReal=Y;window.updateCardPrice=function(e,t,i){const n=e.value,s=z(n),r=e.closest("[data-product-id]");if(!r)return;const l=r.querySelector(".card-size-price"),c=r.querySelector(".card-size-mrp");l&&(l.textContent=S(Math.round(t*s))),c&&(c.textContent=S(Math.round(i*s)))};function ci(){var e,t,i,n;(e=o("#compareBtn"))==null||e.addEventListener("click",ct),(t=o("#compareModalClose"))==null||t.addEventListener("click",le),(i=o("#compareModalBackdrop"))==null||i.addEventListener("click",s=>{s.target===o("#compareModalBackdrop")&&le()}),(n=o("#clearCompareBtn"))==null||n.addEventListener("click",lt)}function at(e){const t=a.compareList.indexOf(e);if(t>-1)a.compareList.splice(t,1);else{if(a.compareList.length>=3){v("You can compare up to 3 products at a time");return}a.compareList.push(e)}rt()}function rt(){const e=o("#compareBar"),t=o("#compareBarCount");if(!e)return;a.compareList&&a.compareList.length>0?(e.classList.add("visible"),e.style.display="flex"):(e.classList.remove("visible"),e.style.display="none"),t&&(t.textContent=a.compareList?a.compareList.length:0),T(".compare-checkbox").forEach(n=>{n.checked=a.compareList&&a.compareList.includes(n.dataset.productId)})}function lt(){a.compareList=[],rt(),le()}function ct(){var e;if(!a.compareList.length){v("Select products to compare first");return}di(),(e=o("#compareModalBackdrop"))==null||e.classList.add("active")}function le(){var e;(e=o("#compareModalBackdrop"))==null||e.classList.remove("active")}function di(){const e=a.compareList.map(n=>re(n)).filter(Boolean),t=o("#compareTableBody");if(!t||!e.length)return;const i=[["Product",n=>`<strong style="font-family:var(--font-serif);font-size:1.05rem;">${n.name}</strong><br><span style="color:var(--text-muted);font-size:0.75rem;">${n.collection||""}</span>`],["Price",n=>`<strong style="color:var(--midnight-blue);">${S(n.basePrice)}</strong> <span style="text-decoration:line-through;color:var(--text-muted);font-size:0.75rem;">${S(n.mrp)}</span>`],["Firmness",n=>`${n.firmness||"Medium"} (${n.firmnessScore?n.firmnessScore+"/8":"—"})`],["Height",n=>n.height?`${n.height} cm`:"—"],["Materials",n=>(n.materials||[]).join(", ")],["Doctor Approved",n=>n.doctorRecommended?"✅ Yes (Physio Validated)":"Standard Comfort"],["Trial & Warranty",n=>`${n.trialDays||100} Nights · ${n.warranty||"10 Years"}`],["Action",n=>`<button class="btn btn-primary btn-sm" onclick="closeCompareModal();openPDP(getProductById('${n.id}'))">View Details</button>`]];t.innerHTML=i.map(([n,s])=>`
    <tr>
      <th>${n}</th>
      ${e.map(r=>`<td>${s(r)}</td>`).join("")}
    </tr>
  `).join("")}window.toggleCompare=at;window.clearCompare=lt;window.openCompareModal=ct;window.closeCompareModal=le;function se(e){if(!e)return;a.pdpProduct=e,a.selectedPDPSize=e.sizes&&e.sizes.length>0?e.sizes[0]:"Standard",vi(e);const t=o("#pdpModal");t&&(t.style.display="flex",t.classList.add("active"),t.scrollTo(0,0)),document.body.style.overflow="hidden"}function Ce(){const e=o("#pdpModal");e&&(e.classList.remove("active"),e.style.display="none"),a.pdpProduct=null,document.body.style.overflow=""}function ui(e){if(!e||!a.pdpProduct)return;const t=e.getAttribute("data-size");a.selectedPDPSize=t,T(".pdp-chip-btn",o("#pdpSizeChips")||document).forEach(y=>y.classList.remove("active")),e.classList.add("active");const n=z(t),s=a.pdpProduct.basePrice,r=a.pdpProduct.mrp,l=Math.round(s*n),c=Math.round(r*n),d=c-l,u=a.pdpProduct.discount||(c>0?Math.round(d/c*100):0),p=Math.round(l/12),m=o("#pdpCurrentPrice"),h=o("#pdpMrpPrice"),f=o("#pdpSaveText"),g=o("#pdpEmiMonthlyVal");m&&(m.textContent=S(l)),h&&(h.textContent=S(c)),f&&(f.textContent=`Save ${S(d)} (${u}% off)`),g&&(g.textContent=`₹${p.toLocaleString("en-IN")}/mo`)}function pi(){if(!a.pdpProduct)return;const e=a.selectedPDPSize||a.pdpProduct.sizes&&a.pdpProduct.sizes[0]||"Standard",t=z(e),i=Math.round(a.pdpProduct.basePrice*t),n=`${a.pdpProduct.name} (${e})`;$t(i,n)}function mi(){if(!a.pdpProduct)return;const e=a.selectedPDPSize||a.pdpProduct.sizes&&a.pdpProduct.sizes[0]||"Standard",t=z(e),i=Math.round(a.pdpProduct.basePrice*t);pe(a.pdpProduct.id,e,1,i),Ce()}async function gi(){if(a.pdpProduct){const e=a.selectedPDPSize||a.pdpProduct.sizes&&a.pdpProduct.sizes[0]||"Standard",t=z(e),i=Math.round(a.pdpProduct.basePrice*t);await pe(a.pdpProduct.id,e,1,i)}Ce(),Y(),Oe()}function fi(){const e=o("#pdpPolicyDetails"),t=o("#pdpPolicyChevron");if(!e)return;const i=e.style.display==="none"||!e.style.display;e.style.display=i?"block":"none",t&&(t.textContent=i?"▲":"▼")}window.openPDP=se;window.closePDP=Ce;window.selectPDPSize=ui;window.openEmiModalForCurrentPDP=pi;window.addToCartFromPDP=mi;window.openCheckoutDirect=gi;window.togglePdpPolicy=fi;function U(e){return e?String(e).replace(/[<>&'"]/g,t=>{switch(t){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case"'":return"&apos;";case'"':return"&quot;"}}):""}function hi(e){const t=e.name||"Velvet Hug Mattress",i=e.tagline||"Engineered for Indian bodies",n=e.firmness||"Medium Firm",s=(e.materials||["Natural Latex","Pocket Spring"]).join(" · "),r=e.thicknessInch?`${e.thicknessInch}" Deep Profile`:"Ergonomic Architecture",l=e.warranty||"10 Years",c=e.trialDays?`${e.trialDays}-Night Trial`:"100-Night Trial",d=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1B1425"/>
        <stop offset="50%" stop-color="#2D1E3A"/>
        <stop offset="100%" stop-color="#0F0A18"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37"/>
        <stop offset="50%" stop-color="#F3E5AB"/>
        <stop offset="100%" stop-color="#AA771C"/>
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="600" fill="url(#bgGrad)" rx="16"/>
    <rect x="20" y="20" width="760" height="560" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.4" rx="12"/>
    <rect x="26" y="26" width="748" height="548" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" rx="8"/>

    <!-- Brand Header -->
    <text x="50" y="70" fill="url(#goldGrad)" font-family="Cinzel, Georgia, serif" font-size="13" font-weight="700" letter-spacing="4">VELVET HUG™ ARCHITECTURAL SPECIFICATION</text>
    
    <!-- Product Title -->
    <text x="50" y="120" fill="#FFFFFF" font-family="Cinzel, Georgia, serif" font-size="28" font-weight="700">${U(t)}</text>
    <text x="50" y="150" fill="#D4AF37" font-family="Georgia, serif" font-style="italic" font-size="16">"${U(i)}"</text>

    <!-- Divider Line -->
    <line x1="50" y1="175" x2="750" y2="175" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.3"/>

    <!-- Speciality Grid Cards -->
    <rect x="50" y="200" width="335" height="105" fill="#FFFFFF" fill-opacity="0.04" stroke="#D4AF37" stroke-opacity="0.25" rx="8"/>
    <text x="70" y="232" fill="#F3E5AB" font-family="system-ui, sans-serif" font-size="14" font-weight="700">✦ 7-Zone Spinal Alignment</text>
    <text x="70" y="258" fill="#D1D5DB" font-family="system-ui, sans-serif" font-size="12">Differential support for head, lumbar &amp; pelvis.</text>
    <text x="70" y="280" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Zero morning stiffness &amp; optimal posture.</text>

    <rect x="415" y="200" width="335" height="105" fill="#FFFFFF" fill-opacity="0.04" stroke="#D4AF37" stroke-opacity="0.25" rx="8"/>
    <text x="435" y="232" fill="#F3E5AB" font-family="system-ui, sans-serif" font-size="14" font-weight="700">✦ Premium Material Composition</text>
    <text x="435" y="258" fill="#D1D5DB" font-family="system-ui, sans-serif" font-size="12">${U(s)}</text>
    <text x="435" y="280" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Hypoallergenic · OEKO-TEX® Certified</text>

    <rect x="50" y="325" width="335" height="105" fill="#FFFFFF" fill-opacity="0.04" stroke="#D4AF37" stroke-opacity="0.25" rx="8"/>
    <text x="70" y="357" fill="#F3E5AB" font-family="system-ui, sans-serif" font-size="14" font-weight="700">✦ Zero Partner Disturbance</text>
    <text x="70" y="383" fill="#D1D5DB" font-family="system-ui, sans-serif" font-size="12">Independent localized motion damping.</text>
    <text x="70" y="405" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Aero-Breeze Open-Cell cooling technology.</text>

    <rect x="415" y="325" width="335" height="105" fill="#FFFFFF" fill-opacity="0.04" stroke="#D4AF37" stroke-opacity="0.25" rx="8"/>
    <text x="435" y="357" fill="#F3E5AB" font-family="system-ui, sans-serif" font-size="14" font-weight="700">✦ Doctor &amp; Lab Endorsed</text>
    <text x="435" y="383" fill="#D1D5DB" font-family="system-ui, sans-serif" font-size="12">Prescribed for spinal de-stressing &amp; joint care.</text>
    <text x="435" y="405" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Reinforced Edge Guard · Tested up to 240kg.</text>

    <!-- Footer Stats Ribbon -->
    <rect x="50" y="455" width="700" height="85" fill="#120A1C" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.3" rx="8"/>
    
    <text x="100" y="490" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">FIRMNESS</text>
    <text x="100" y="515" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">${U(n)}</text>
    
    <line x1="180" y1="470" x2="180" y2="525" stroke="#FFFFFF" stroke-opacity="0.1"/>

    <text x="260" y="490" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">THICKNESS</text>
    <text x="260" y="515" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">${U(r)}</text>

    <line x1="340" y1="470" x2="340" y2="525" stroke="#FFFFFF" stroke-opacity="0.1"/>

    <text x="430" y="490" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">BEDROOM TRIAL</text>
    <text x="430" y="515" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">${U(c)}</text>

    <line x1="520" y1="470" x2="520" y2="525" stroke="#FFFFFF" stroke-opacity="0.1"/>

    <text x="610" y="490" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">WARRANTY</text>
    <text x="610" y="515" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">${U(l)}</text>
  </svg>`;return"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(d)}let K=0,W=[];window.switchPDPImage=function(e){if(!W||!W.length)return;K=(e+W.length)%W.length;const t=o("#pdpMainImg");t&&W[K]&&(t.classList.remove("fade-in"),t.offsetWidth,t.src=W[K],t.classList.add("fade-in")),T(".pdp-thumb-btn").forEach((i,n)=>{i.classList.toggle("active",n===K)})};window.pdpGalleryPrev=function(){window.switchPDPImage(K-1)};window.pdpGalleryNext=function(){window.switchPDPImage(K+1)};function vi(e){const t=o("#pdpContent");if(!t)return;const i=e.mrp&&e.mrp>e.basePrice?e.mrp-e.basePrice:0,n=e.discount||(e.mrp>e.basePrice?Math.round((e.mrp-e.basePrice)/e.mrp*100):0),s=e.image||"./src/assets/images/mattress_hybrid_luxury.jpg";let r="./src/assets/images/mattress_crosssection_8inch.jpg";(e.thicknessInch&&e.thicknessInch<=6||e.id&&e.id.includes("6"))&&(r="./src/assets/images/mattress_crosssection_6inch.jpg");const l=hi(e);K=0,W=[R(s),R(r),R(l)],t.innerHTML=`
    <button class="modal-close-icon" onclick="closePDP()">✕</button>
    
    <!-- Left: Media & Anatomy -->
    <div>
      <div class="pdp-gallery-container">
        <div class="pdp-gallery-main" id="pdpGalleryMain">
          <img id="pdpMainImg" src="${s}" alt="${e.name}"
               onerror="this.src='./src/assets/logo.jpeg'">
          <button type="button" class="pdp-nav-arrow pdp-nav-prev" aria-label="Previous Image" onclick="window.pdpGalleryPrev()" title="Previous Image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button type="button" class="pdp-nav-arrow pdp-nav-next" aria-label="Next Image" onclick="window.pdpGalleryNext()" title="Next Image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        
        <div class="pdp-thumbnail-row" id="pdpThumbnailRow">
          <button type="button" class="pdp-thumb-btn active" data-img-idx="0" onclick="window.switchPDPImage(0)">
            <div class="pdp-thumb-img-wrap">
              <img src="${s}" alt="Mattress View">
            </div>
            <span class="pdp-thumb-label">Mattress</span>
          </button>
          
          <button type="button" class="pdp-thumb-btn" data-img-idx="1" onclick="window.switchPDPImage(1)">
            <div class="pdp-thumb-img-wrap">
              <img src="${r}" alt="3D Cross Section">
            </div>
            <span class="pdp-thumb-label">3D Cross Section</span>
          </button>
          
          <button type="button" class="pdp-thumb-btn" data-img-idx="2" onclick="window.switchPDPImage(2)">
            <div class="pdp-thumb-img-wrap">
              <img src="${l}" alt="Speciality Specs">
            </div>
            <span class="pdp-thumb-label">Speciality Specs</span>
          </button>
        </div>
      </div>
      
      <div style="margin-top:20px;">
        <div style="font-family:var(--font-serif);font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:10px;">The 5 Precision Layers</div>
        ${(e.layers||It).map(c=>`
          <div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(76,63,94,0.08);">
            <div style="width:26px;height:26px;border-radius:50%;background:var(--champagne-gold-light);border:1px solid var(--champagne-gold-border);display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:0.75rem;font-weight:700;color:var(--champagne-gold);flex-shrink:0;">${c.num}</div>
            <div>
              <div style="font-family:var(--font-serif);font-size:0.88rem;font-weight:600;color:var(--text-primary);">${c.humanName} <span style="font-size:0.74rem;font-weight:400;color:var(--text-muted);">· ${c.spec}</span></div>
              <div style="font-size:0.78rem;color:var(--text-secondary);">${c.description||c.material}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    
    <!-- Right: Purchase Config -->
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span class="badge ${Ae(e.badge)}">${e.badgeLabel||""}</span>
        ${e.doctorRecommended?'<span class="badge badge-new" style="display:inline-flex;align-items:center;gap:4px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg> Doctor Recommended</span>':""}
      </div>
      <h2 style="font-family:var(--font-serif);font-size:1.7rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;letter-spacing:-0.02em;">${e.name}</h2>
      <p style="font-family:var(--font-serif);font-style:italic;color:var(--text-secondary);margin-bottom:14px;">"${e.tagline}"</p>
      
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;">
        <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">
          <span style="font-size:1.7rem;font-weight:800;color:var(--text-primary);" id="pdpCurrentPrice">${S(e.basePrice)}</span>
          <span style="color:var(--text-muted);text-decoration:line-through;font-size:1rem;" id="pdpMrpPrice">${S(e.mrp)}</span>
          <span style="color:var(--accent-emerald);font-weight:700;font-size:0.86rem;" id="pdpSaveText">${i>0?`Save ${S(i)} (${n}% off)`:""}</span>
        </div>
        <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;cursor:pointer;display:flex;align-items:center;gap:6px;" id="pdpEmiText" onclick="window.openEmiModalForCurrentPDP()">
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="display:inline-block;vertical-align:-2px;margin-right:2px;"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> No-cost EMI from <strong style="color:var(--midnight-blue);" id="pdpEmiMonthlyVal">₹${Math.round(e.basePrice/12).toLocaleString("en-IN")}/mo</strong></span>
          <span style="color:var(--champagne-gold);font-weight:700;text-decoration:underline;">View All Plans →</span>
        </div>
      </div>
      
      <!-- Size Selector -->
      <div style="margin-bottom:16px;">
        <label class="form-label">Select Size</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;" id="pdpSizeChips">
          ${(e.sizes||["Single","Double","Queen","King"]).map((c,d)=>`
            <button class="pdp-chip-btn ${d===0?"active":""}" data-size="${c}" onclick="selectPDPSize(this)">${c}</button>
          `).join("")}
        </div>
      </div>
      
      <!-- Firmness -->
      ${e.firmnessScore?`
      <div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <label class="form-label" style="margin-bottom:0;">Firmness</label>
          <span style="font-size:0.82rem;font-weight:700;color:var(--midnight-blue);">${e.firmness} (${e.firmnessScore}/10)</span>
        </div>
        <div class="meter-bar-track firmness-track">
          <div class="meter-bar-fill" style="width:${e.firmnessScore*10}%;height:100%;background:linear-gradient(90deg,var(--muted-violet),var(--midnight-blue));border-radius:999px;"></div>
          <div class="firmness-thumb" style="left:${e.firmnessScore*10}%;"></div>
        </div>
      </div>`:""}
      
      <!-- Action Buttons -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">
        <button class="btn btn-gold btn-lg btn-block" onclick="addToCartFromPDP()">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart
        </button>
        <button class="btn btn-outline btn-lg btn-block" onclick="openCheckoutDirect()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Instant Buy Now
        </button>
      </div>
      
      <!-- Pincode Delivery Check -->
      <div style="margin-top:16px;">
        <label class="form-label" style="font-size:0.82rem;font-weight:700;color:var(--midnight-blue);display:flex;align-items:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Check Delivery Speed &amp; White-Glove Installation (Dispatched from Chennai Hub)
        </label>
        <div style="display:flex;gap:8px;">
          <input class="form-input" placeholder="Enter 6-digit Indian Pincode (e.g. 600028)" maxlength="6" id="pdpPincodeInput" value="${a.rememberedPincode||"600028"}" style="flex:1;">
          <button class="btn btn-outline btn-sm" onclick="window.checkPincodeDeliveryUI(document.getElementById('pdpPincodeInput').value, 'pdpPincodeResult')">Check Speed</button>
        </div>
        <div id="pdpPincodeResult" style="margin-top:6px;"></div>
      </div>

      <!-- 100-Night Trial & Returns Accordion -->
      <div class="pdp-policy-box">
        <div class="pdp-policy-header" onclick="window.togglePdpPolicy()">
          <span style="font-weight:700;color:var(--midnight-blue);font-size:0.84rem;display:flex;align-items:center;gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg> 100-Night Risk-Free Sleep Trial &amp; 10-Yr Warranty
          </span>
          <span id="pdpPolicyChevron" style="font-size:0.8rem;color:var(--text-muted);">▼</span>
        </div>
        <div id="pdpPolicyDetails" class="pdp-policy-body" style="display:none;">
          • <strong>100 Nights at Home:</strong> Sleep for 30 nights to let your spine adapt. Full refund if not in love.<br>
          • <strong>Zero Reverse Shipping Fees:</strong> 100% free white-glove reverse pickup from your bedroom.<br>
          • <strong>1-Time Firmness Exchange:</strong> Switch to softer or firmer feel free of charge anytime.<br>
          <a href="/returns" onclick="closePDP();goToPage('returns');return false;" style="color:var(--champagne-gold);font-weight:700;margin-top:4px;display:inline-block;">Read Full 100-Night Return Terms →</a>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{window.checkPincodeDeliveryUI(a.rememberedPincode||"600028","pdpPincodeResult")},50)}window.checkPincodeDeliveryUI=function(e,t){const i=o(`#${t}`);if(!i)return;const n=Ke(e);if(!n.valid){i.innerHTML=`<div style="color:#EF4444;font-size:0.8rem;padding:6px 0;display:flex;align-items:center;gap:6px;"><span>⚠️</span> ${n.message}</div>`;return}if(localStorage.setItem("vh_checked_pincode",n.pincode),a.rememberedPincode=n.pincode,t==="cartPincodeResult"){i.innerHTML=`
      <div class="cart-pincode-compact-pill">
        <div style="display:flex;align-items:center;gap:6px;min-width:0;">
          <span style="color:#10B981;font-size:0.85rem;">⚡</span>
          <span style="font-size:0.78rem;color:#0F172A;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            Est. Arrival: <strong style="color:#059669;">${n.estimatedDateText}</strong>
          </span>
        </div>
        <span style="font-size:0.72rem;background:#F1F5F9;color:#475569;padding:2px 6px;border-radius:4px;font-weight:600;flex-shrink:0;">
          PIN ${n.pincode}
        </span>
      </div>
    `;return}i.innerHTML=`
    <div class="pincode-card-rich">
      <div class="pincode-header-row">
        <span class="pincode-speed-badge">⚡ ${n.speedTag}</span>
        <span class="pincode-region-badge">PIN: <strong>${n.pincode}</strong> (${n.region})</span>
      </div>
      
      <div class="pincode-eta-row">
        <span class="pincode-eta-label">Estimated Arrival:</span>
        <span class="pincode-eta-date">${n.estimatedDateText}</span>
      </div>

      <div class="pincode-logistics-box">
        <div class="pincode-logistics-line">
          <span class="logistics-icon">🚚</span>
          <span>Fulfilled via <strong>${n.partner}</strong></span>
        </div>
        <div class="pincode-logistics-line">
          <span class="logistics-icon">🏭</span>
          <span>Origin Hub: <strong>${n.originWarehouse||"Velvet Hug Central Mother Warehouse & Sleep Lab (Chennai)"}</strong></span>
        </div>
        <div class="pincode-logistics-note">
          ${n.specialNote}
        </div>
      </div>

      <div class="pincode-feature-grid">
        <div class="pincode-feature-chip"><span>✓</span> Free White-Glove Room Unboxing</div>
        <div class="pincode-feature-chip"><span>✓</span> 100-Night Risk-Free Trial</div>
        <div class="pincode-feature-chip"><span>✓</span> Zero Reverse Shipping Fee</div>
        ${n.codAvailable?'<div class="pincode-feature-chip"><span>✓</span> COD Available</div>':""}
      </div>
    </div>
  `};a.activeFilterPopover=null;a.filterPopoverLeft=null;window.toggleFilterPopover=function(e,t){if(t){t.stopPropagation();const i=t.currentTarget;if(i){const n=i.closest(".filter-dropdowns-card");if(n){const s=i.getBoundingClientRect(),r=n.getBoundingClientRect();a.filterPopoverLeft=Math.max(10,s.left-r.left)}}}a.activeFilterPopover=a.activeFilterPopover===e?null:e,N()};window.applyAndClosePopover=function(){a.activeFilterPopover=null,N()};window.resetFilterAxis=function(e){a.mattressFilters=a.mattressFilters||{},a.mattressFilters[e]=[],e==="budget"&&(a.mattressFilters.tiers=[],a.mattressFilters.maxPrice=null),N()};document.addEventListener("click",e=>{a.activeFilterPopover&&!e.target.closest(".filter-popover-menu")&&!e.target.closest(".filter-dropdown-trigger")&&(a.activeFilterPopover=null,N())});function N(){var u,p,m,h;const e=o("#mattressFiltersContainer");if(!e)return;const t=Qe,i=a.mattressFilters||{preset:"all",types:[],tiers:[],firmness:[],sizes:[],maxPrice:null},n=()=>{const f=i.firmness||[];if(f.length===0)return"Firmness Level";if(f.length===1){const g={Soft:"1","Medium Soft":"2",Medium:"3","Medium Firm":"4",Firm:"5"};return`Firmness Level: ${f[0]} (${g[f[0]]||"1"})`}return`Firmness Level: ${f.length} selected`},s=()=>{const f=i.sizes||[];return f.length===0?"Mattress Size":f.length===1?`Size: ${f[0]}`:`Size: ${f.length} selected`},r=()=>{const f=i.tiers||[];return f.length===1?`Budget: ${f[0]}`:f.length>1?`Budget: ${f.length} selected`:i.maxPrice?`Under ${S(i.maxPrice)}`:"Budget & Price"},l=()=>{const f=i.types||[];return f.length===0?"Material & Type":f.length===1?`Material: ${f[0]}`:`Material: ${f.length} selected`},c=a.activeFilterPopover,d=a.filterPopoverLeft!==null?`${a.filterPopoverLeft}px`:"18px";e.innerHTML=`
    <div class="mattress-filters-wrap">
      <!-- 1. SLEEPER PROFILE ROW -->
      <div class="sleeper-profile-bar" role="tablist" aria-label="Sleeper Profile Views">
        <span class="sleeper-profile-label">SLEEPER PROFILE:</span>
        ${t.sleeperProfiles.filter(f=>f.id!=="fit-all"&&f.id!=="budget").map(f=>{const g=(i.preset||"all")===f.id;let y=f.label;return f.id==="kids"&&(y="Kids & Teens"),f.id==="youth"&&(y="Youth (18–35)"),f.id==="adult"&&(y="Adult (35–50)"),f.id==="senior"&&(y="Senior / Back Pain"),f.id==="big-people"&&(y="Heavy Weight (Up to 240kg)"),`
            <button type="button" class="sleeper-pill-btn ${g?"active":""}" onclick="window.setMattressPreset('${f.id}')">
              ${y}
            </button>
          `}).join("")}
      </div>

      <!-- 2. MAIN FILTER DROPDOWNS CARD -->
      <div class="filter-dropdowns-card">
        <div class="filter-dropdowns-group">
          <!-- Firmness Dropdown Trigger -->
          <button type="button" class="filter-dropdown-trigger ${((u=i.firmness)==null?void 0:u.length)>0?"has-selection":""} ${c==="firmness"?"active-popover":""}" onclick="window.toggleFilterPopover('firmness', event)">
            <span>${n()}</span>
            <span class="arrow-icon">∨</span>
          </button>

          <!-- Mattress Size Dropdown Trigger -->
          <button type="button" class="filter-dropdown-trigger ${((p=i.sizes)==null?void 0:p.length)>0?"has-selection":""} ${c==="sizes"?"active-popover":""}" onclick="window.toggleFilterPopover('sizes', event)">
            <span>${s()}</span>
            <span class="arrow-icon">∨</span>
          </button>

          <!-- Budget & Price Dropdown Trigger -->
          <button type="button" class="filter-dropdown-trigger ${((m=i.tiers)==null?void 0:m.length)>0||i.maxPrice?"has-selection":""} ${c==="budget"?"active-popover":""}" onclick="window.toggleFilterPopover('budget', event)">
            <span>${r()}</span>
            <span class="arrow-icon">∨</span>
          </button>

          <!-- Material & Type Dropdown Trigger -->
          <button type="button" class="filter-dropdown-trigger ${((h=i.types)==null?void 0:h.length)>0?"has-selection":""} ${c==="types"?"active-popover":""}" onclick="window.toggleFilterPopover('types', event)">
            <span>${l()}</span>
            <span class="arrow-icon">∨</span>
          </button>
        </div>

        <button type="button" class="filter-clear-all-link" onclick="window.resetMattressFilters()">Clear All</button>

        <!-- 3. ACTIVE FLOATING POPOVER -->
        ${c==="firmness"?`
          <div class="filter-popover-menu" style="left:${d};" onclick="event.stopPropagation();">
            <div class="popover-header-title">SELECT FIRMNESS</div>
            <div class="popover-options-list">
              ${t.firmnessLevels.map(f=>{var y;const g=(y=i.firmness)==null?void 0:y.includes(f.key);return`
                  <label class="popover-option-row ${g?"checked-row":""}">
                    <span>${f.label}</span>
                    <input type="checkbox" class="popover-checkbox" ${g?"checked":""} onchange="window.toggleMattressFilterOption('firmness', '${f.key}')">
                  </label>
                `}).join("")}
            </div>
            <div class="popover-footer-actions">
              <button type="button" class="popover-reset-btn" onclick="window.resetFilterAxis('firmness')">Reset</button>
              <button type="button" class="popover-apply-btn" onclick="window.applyAndClosePopover()">Apply</button>
            </div>
          </div>
        `:""}

        ${c==="sizes"?`
          <div class="filter-popover-menu" style="left:${d};" onclick="event.stopPropagation();">
            <div class="popover-header-title">SELECT SIZE</div>
            <div class="popover-options-list">
              ${t.sizes.map(f=>{var y;const g=(y=i.sizes)==null?void 0:y.includes(f);return`
                  <label class="popover-option-row ${g?"checked-row":""}">
                    <span>${f}</span>
                    <input type="checkbox" class="popover-checkbox" ${g?"checked":""} onchange="window.toggleMattressFilterOption('sizes', '${f}')">
                  </label>
                `}).join("")}
            </div>
            <div class="popover-footer-actions">
              <button type="button" class="popover-reset-btn" onclick="window.resetFilterAxis('sizes')">Reset</button>
              <button type="button" class="popover-apply-btn" onclick="window.applyAndClosePopover()">Apply</button>
            </div>
          </div>
        `:""}

        ${c==="budget"?`
          <div class="filter-popover-menu" style="left:${d};" onclick="event.stopPropagation();">
            <div class="popover-header-title">SELECT PRICE TIER</div>
            <div class="popover-options-list">
              ${t.priceTiers.map(f=>{var y;const g=(y=i.tiers)==null?void 0:y.includes(f.id);return`
                  <label class="popover-option-row ${g?"checked-row":""}">
                    <span>${f.label}</span>
                    <input type="checkbox" class="popover-checkbox" ${g?"checked":""} onchange="window.toggleMattressFilterOption('tiers', '${f.id}')">
                  </label>
                `}).join("")}
            </div>
            <div style="margin-top:14px;padding-top:10px;border-top:1px solid #F1F5F9;">
              <div style="font-size:0.75rem;font-weight:700;color:#64748B;display:flex;justify-content:space-between;margin-bottom:6px;">
                <span>MAX BUDGET</span>
                <span style="color:#0F172A;">${i.maxPrice?S(i.maxPrice):"Any Price"}</span>
              </div>
              <input type="range" min="7000" max="120000" step="1000" value="${i.maxPrice||12e4}" style="width:100%;accent-color:#4F46E5;cursor:pointer;" oninput="window.setMattressMaxPrice(this.value)">
            </div>
            <div class="popover-footer-actions">
              <button type="button" class="popover-reset-btn" onclick="window.resetFilterAxis('budget')">Reset</button>
              <button type="button" class="popover-apply-btn" onclick="window.applyAndClosePopover()">Apply</button>
            </div>
          </div>
        `:""}

        ${c==="types"?`
          <div class="filter-popover-menu" style="left:${d};" onclick="event.stopPropagation();">
            <div class="popover-header-title">SELECT MATERIAL &amp; TYPE</div>
            <div class="popover-options-list">
              ${t.types.map(f=>{var y;const g=(y=i.types)==null?void 0:y.includes(f.key);return`
                  <label class="popover-option-row ${g?"checked-row":""}">
                    <span>${f.label}</span>
                    <input type="checkbox" class="popover-checkbox" ${g?"checked":""} onchange="window.toggleMattressFilterOption('types', '${f.key}')">
                  </label>
                `}).join("")}
            </div>
            <div class="popover-footer-actions">
              <button type="button" class="popover-reset-btn" onclick="window.resetFilterAxis('types')">Reset</button>
              <button type="button" class="popover-apply-btn" onclick="window.applyAndClosePopover()">Apply</button>
            </div>
          </div>
        `:""}
      </div>
    </div>
  `,Me()}function Me(){var s,r,l,c,d,u,p,m,h,f;const e=Ht(B,a.mattressFilters,a.mattressSort),t=B.filter(g=>g.category==="mattresses").length,i=o("#mattressActiveChipsRow");if(i){const g=a.mattressFilters||{};if(g.preset&&g.preset!=="all"||((s=g.types)==null?void 0:s.length)||((r=g.tiers)==null?void 0:r.length)||((l=g.firmness)==null?void 0:l.length)||((c=g.sizes)==null?void 0:c.length)||((d=g.thickness)==null?void 0:d.length)||g.maxPrice){i.style.display="block";let x=`<div class="active-filters-chips-bar">
        <span class="filter-results-counter">Showing <strong>${e.length}</strong> of ${t} Mattresses</span>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-left:auto;">`;if(g.preset&&g.preset!=="all"){const b=Qe.sleeperProfiles.find(w=>w.id===g.preset);x+=`<button type="button" class="active-chip-tag" onclick="window.setMattressPreset('all')">Profile: ${(b==null?void 0:b.label)||g.preset} ✕</button>`}(u=g.types)==null||u.forEach(b=>{x+=`<button type="button" class="active-chip-tag" onclick="window.toggleMattressFilterOption('types', '${b}')">Type: ${b} ✕</button>`}),(p=g.tiers)==null||p.forEach(b=>{x+=`<button type="button" class="active-chip-tag" onclick="window.toggleMattressFilterOption('tiers', '${b}')">Tier: ${b} ✕</button>`}),(m=g.firmness)==null||m.forEach(b=>{x+=`<button type="button" class="active-chip-tag" onclick="window.toggleMattressFilterOption('firmness', '${b}')">Firmness: ${b} ✕</button>`}),(h=g.sizes)==null||h.forEach(b=>{x+=`<button type="button" class="active-chip-tag" onclick="window.toggleMattressFilterOption('sizes', '${b}')">Size: ${b} ✕</button>`}),(f=g.thickness)==null||f.forEach(b=>{x+=`<button type="button" class="active-chip-tag" onclick="window.toggleMattressFilterOption('thickness', ${b})">Thickness: ${b}" ✕</button>`}),g.maxPrice&&(x+=`<button type="button" class="active-chip-tag" onclick="window.setMattressMaxPrice(null)">Under ${S(g.maxPrice)} ✕</button>`),x+='<button type="button" class="clear-filters-btn" style="margin-left:6px;" onclick="window.resetMattressFilters()">Clear All</button></div></div>',i.innerHTML=x}else i.style.display="none",i.innerHTML=""}const n=o("#mattressProductsGrid")||o("#view-mattresses .products-grid");n&&$e(e,n)}window.setMattressPreset=function(e){a.mattressFilters=a.mattressFilters||{},a.mattressFilters.preset=e,N()};window.setMattressSort=function(e){a.mattressSort=e,Me()};window.toggleMattressFilterOption=function(e,t){a.mattressFilters=a.mattressFilters||{},a.mattressFilters[e]=a.mattressFilters[e]||[];const i=a.mattressFilters[e].indexOf(t);i>-1?a.mattressFilters[e].splice(i,1):a.mattressFilters[e].push(t),N()};window.setMattressMaxPrice=function(e){a.mattressFilters=a.mattressFilters||{};const t=parseInt(e,10);a.mattressFilters.maxPrice=t&&t<12e4?t:null;const i=o("#filterPriceDisplay");i&&(i.textContent=a.mattressFilters.maxPrice?S(a.mattressFilters.maxPrice):"Any Price"),Me()};window.resetMattressFilters=function(){a.mattressFilters={preset:"all",types:[],tiers:[],firmness:[],sizes:[],thickness:[],maxPrice:null},a.mattressSort="recommended",N()};function yi(e){e==="mattresses"&&N()}function dt(){window.resetMattressFilters()}window.clearFilterAxis=function(e){a.mattressFilters[e]=[],N()};window.resetFilters=dt;function bi(){const e=o("#scrollProgressBar"),t=o("#floatingBackToTop"),i=o(".site-header");let n=!1;function s(){n||(n=!0,requestAnimationFrame(()=>{const l=window.scrollY||document.documentElement.scrollTop,c=document.documentElement.scrollHeight-window.innerHeight;if(e&&c>0){const d=l/c*100;e.style.width=`${Math.min(100,Math.max(0,d))}%`}t&&(l>260?t.classList.add("visible"):t.classList.remove("visible")),i&&(l>30?i.classList.add("scrolled-elevated"):i.classList.remove("scrolled-elevated")),n=!1}))}window.addEventListener("scroll",s,{passive:!0}),s(),t&&t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const r=new IntersectionObserver(l=>{l.forEach(c=>{c.isIntersecting&&(c.target.querySelectorAll(".counter-animate").forEach(Ve),c.target.classList.contains("counter-animate")&&Ve(c.target),r.unobserve(c.target))})},{threshold:.1});if(T(".counter-animate").forEach(l=>r.observe(l)),window.matchMedia&&window.matchMedia("(pointer: fine)").matches){let l=!1;document.addEventListener("mousemove",c=>{const d=c.target.closest(".card-interactive-tilt, .partner-honor-chip, .soundscape-floating-pill");d&&(l||(l=!0,requestAnimationFrame(()=>{const u=d.getBoundingClientRect(),p=c.clientX-u.left,m=c.clientY-u.top,h=u.width/2,f=u.height/2,g=(m-f)/f*-4,y=(p-h)/h*4;d.style.transform=`perspective(800px) rotateX(${g.toFixed(1)}deg) rotateY(${y.toFixed(1)}deg) translateY(-2px)`,l=!1})))},{passive:!0}),document.addEventListener("mouseleave",c=>{const d=c.target.closest(".card-interactive-tilt, .partner-honor-chip, .soundscape-floating-pill");d&&(d.style.transform="perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)")},!0)}}function Ve(e){if(e.dataset.animated==="true")return;e.dataset.animated="true";const t=parseInt(e.dataset.target||e.textContent.replace(/\D/g,""),10);if(!t||isNaN(t))return;const i=e.dataset.suffix||"",n=e.dataset.prefix||"",s=1200,r=0,l=performance.now();function c(d){const u=Math.min((d-l)/s,1),p=1-Math.pow(1-u,3),m=Math.round(r+(t-r)*p);e.textContent=`${n}${m.toLocaleString("en-IN")}${i}`,u<1&&requestAnimationFrame(c)}requestAnimationFrame(c)}function $e(e,t){if(!e.length){t.innerHTML=`
      <div style="grid-column:1/-1;text-align:center;padding:48px 24px;color:var(--text-muted);">
        <div style="font-size:2.5rem;margin-bottom:12px;">🔍</div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;color:var(--midnight-blue);margin-bottom:6px;">No products match all selected filters</div>
        <p style="font-size:0.84rem;margin-bottom:14px;">Try clearing one of the 6 filter axes to see more options.</p>
        <button class="btn btn-outline btn-sm" onclick="resetFilters();renderCategoryPage(state.activeCategory)">Clear All Filters</button>
      </div>`;return}t.innerHTML=e.map(i=>wi(i)).join(""),t.querySelectorAll("[data-product-id]").forEach(i=>{var l,c,d,u,p,m;const n=i.dataset.productId,s=re(n);(l=i.querySelector(".card-product-title"))==null||l.addEventListener("click",()=>{s&&se(s)}),(c=i.querySelector(".product-card-media"))==null||c.addEventListener("click",h=>{!h.target.classList.contains("card-floating-3d-btn")&&s&&se(s)}),(d=i.querySelector(".add-to-cart-btn"))==null||d.addEventListener("click",h=>{var x;h.stopPropagation();const f=i.querySelector(".size-quick-select"),g=(f==null?void 0:f.value)||((x=s==null?void 0:s.sizes)==null?void 0:x[0])||"Standard",y=Math.round(((s==null?void 0:s.basePrice)||0)*z(g));pe(n,g,1,y)});const r=i.querySelector(".compare-checkbox");r==null||r.addEventListener("change",h=>{h.stopPropagation(),at(n)}),(u=i.querySelector(".card-floating-3d-btn"))==null||u.addEventListener("click",h=>{h.stopPropagation(),s&&se(s)}),(p=i.querySelector(".card-view-btn"))==null||p.addEventListener("click",h=>{h.stopPropagation(),s&&se(s)}),(m=i.querySelector(".card-doctor-pill"))==null||m.addEventListener("click",h=>{h.stopPropagation(),Et(n)})})}function wi(e){var t,i,n,s;return`
    <article class="product-card" data-product-id="${e.id}">
      <div class="card-badge-container">
        ${e.badgeLabel?`<span class="badge ${Ae(e.badge)}">${e.badgeLabel}</span>`:""}
        ${e.doctorRecommended?'<span class="badge badge-new" style="font-size:0.64rem;display:inline-flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg> Dr. Rec</span>':""}
      </div>
      
      <div class="product-card-media">
        <img src="${R(e.image)}" alt="${e.name}"
             onerror="if(window.SHOPIFY_CDN){this.src=window.SHOPIFY_CDN+'logo.jpeg';}else{this.src='./src/assets/logo.jpeg';}">
        ${e.has3D?'<button class="card-floating-3d-btn">⟳ 3D View</button>':""}
      </div>
      
      <div class="product-card-body">
        <div class="card-tier-height">
          <span>${e.collection||""}</span>
          ${e.height?`<span>${e.height}cm height</span>`:""}
        </div>
        <h3 class="card-product-title">${e.name}</h3>
        
        ${e.firmnessScore?`
        <div class="card-firmness-meter">
          <div class="meter-header"><span>Firmness</span><span style="font-weight:700;color:var(--midnight-blue);">${e.firmness} (${e.firmnessScore}/10)</span></div>
          <div class="meter-bar-track firmness-track"><div class="meter-bar-fill" style="width:${e.firmnessScore*10}%"></div><div class="firmness-thumb" style="left:${e.firmnessScore*10}%;"></div></div>
        </div>`:""}
        
        ${e.doctorRecommended?`
        <div class="card-doctor-pill" style="cursor:pointer;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-1px;margin-right:4px;"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg> Recommended by Sleep Doctors
        </div>`:""}
        
        ${((t=e.sizes)==null?void 0:t.length)>1?`
        <div style="margin-bottom:10px;">
          <select class="form-input size-quick-select" style="padding:6px 10px;font-size:0.78rem;"
            onchange="updateCardPrice(this, ${e.basePrice}, ${e.mrp})">
            ${e.sizes.map(r=>`<option value="${r}">${r} — ${S(Math.round(e.basePrice*z(r)))}</option>`).join("")}
          </select>
        </div>`:""}
        
        <div class="card-price-row">
          <span class="card-current-price card-size-price">${S(Math.round(e.basePrice*z(((i=e.sizes)==null?void 0:i[0])||"Queen")))}</span>
          <span class="card-original-price card-size-mrp">${S(Math.round(e.mrp*z(((n=e.sizes)==null?void 0:n[0])||"Queen")))}</span>
          <span class="card-discount-tag">${e.discount}% off</span>
        </div>
        ${e.emi?`<div class="card-emi-text" style="cursor:pointer;" onclick="event.stopPropagation();window.openEmiModal(${e.basePrice}, '${e.name.replace(/'/g,"\\'")}')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="display:inline-block;vertical-align:-2px;margin-right:3px;"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> No-Cost EMI: <strong>${e.emi}</strong> <span style="color:var(--champagne-gold);font-weight:700;">(Plans →)</span></div>`:'<div style="height:16px;"></div>'}
        
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <span class="stars">${"★".repeat(Math.round(e.rating))}</span>
          <span class="rating-text">${e.rating} (${(s=e.reviews)==null?void 0:s.toLocaleString("en-IN")})</span>
        </div>
        
        <div class="card-footer-actions">
          <label class="compare-checkbox-label">
            <input type="checkbox" class="compare-checkbox" data-product-id="${e.id}" style="width:14px;height:14px;accent-color:var(--midnight-blue);">
            Compare
          </label>
          <button class="btn btn-primary btn-sm add-to-cart-btn">Add to Cart</button>
        </div>
        <button class="btn btn-outline btn-sm btn-block card-view-btn" style="margin-top:6px;">View Details</button>
      </div>
    </article>`}function Ae(e){return{bestseller:"badge-bestsel",sale:"badge-sale",new:"badge-new",ortho:"badge-new",luxury:"badge-founding",kids:"badge-bestsel"}[e]||"badge-bestsel"}function _(e){const t=zt[e];if(!t)return;const i=o(`#view-${e} .page-hero-title`),n=o(`#view-${e} .page-hero-subtitle`);i&&(i.textContent=t.label),n&&(n.textContent=t.description),e==="mattresses"&&yi(e);const s=o(`#view-${e} .products-grid`);if(s){const r=We(e,e==="mattresses"?a.filters:{});$e(r,s)}e==="accessories"&&xi()}function xi(){const e=o("#accSubTabs");if(!e)return;const t=["All Accessories","Pillows","Cushions","Bolsters","Mattress Protectors","Pillow Covers","Sleep Sanctuary"];a.activeAccSubTab||(a.activeAccSubTab="All Accessories"),e.innerHTML=t.map(n=>`
    <button class="acc-sub-tab ${n===a.activeAccSubTab?"active":""}" data-subtab="${n}">${n}</button>
  `).join("");function i(n){a.activeAccSubTab=n,e.querySelectorAll(".acc-sub-tab").forEach(r=>{r.classList.toggle("active",r.dataset.subtab===n)});const s=o("#view-accessories .products-grid");if(s){let r=We("accessories",{});n==="Pillows"?r=r.filter(l=>{var c;return l.category==="pillows"||((c=l.tags)==null?void 0:c.includes("pillow"))}):n==="Cushions"?r=r.filter(l=>{var c;return l.category==="cushions"||((c=l.tags)==null?void 0:c.includes("cushion"))}):n==="Bolsters"?r=r.filter(l=>{var c;return l.category==="bolsters"||((c=l.tags)==null?void 0:c.includes("bolster"))}):n==="Mattress Protectors"?r=r.filter(l=>{var c;return(c=l.tags)==null?void 0:c.includes("protector")}):n==="Pillow Covers"?r=r.filter(l=>{var c;return((c=l.tags)==null?void 0:c.includes("pillowcase"))||l.category==="pillows"}):n==="Sleep Sanctuary"&&(r=r.filter(l=>{var c,d;return((c=l.tags)==null?void 0:c.includes("aromatherapy"))||((d=l.tags)==null?void 0:d.includes("sleep-mask"))})),$e(r,s)}}e.querySelectorAll(".acc-sub-tab").forEach(n=>{n.addEventListener("click",()=>i(n.dataset.subtab))}),i(a.activeAccSubTab)}let oe=null;function me(e="signupOtpTimer"){oe&&clearInterval(oe),a.otpTimerSecs=45;const t=o(`#${e}`);t&&(t.textContent=`00:${a.otpTimerSecs.toString().padStart(2,"0")}`),oe=setInterval(()=>{a.otpTimerSecs--;const i=o(`#${e}`);i&&(i.textContent=`00:${Math.max(0,a.otpTimerSecs).toString().padStart(2,"0")}`),a.otpTimerSecs<=0&&(clearInterval(oe),oe=null)},1e3)}function q(){const e=o("#accountBtn");e&&(a.user?(e.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span style="position:absolute;top:3px;right:3px;width:8px;height:8px;border-radius:50%;background:#10B981;box-shadow:0 0 0 2px var(--bg-surface, #141F3D);" title="Logged in as ${a.user.name}"></span>
    `,e.title=`Signed in: ${a.user.name} (#${a.user.foundingNumber||"Sleep Partner"})`):(e.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',e.title="My Account & Profile"))}function ut(e){var i,n;const t=e==="signup";(i=o("#guestTabSignUp"))==null||i.classList.toggle("active",t),(n=o("#guestTabLogin"))==null||n.classList.toggle("active",!t),o("#guestSignUpContainer")&&(o("#guestSignUpContainer").style.display=t?"block":"none"),o("#guestLoginContainer")&&(o("#guestLoginContainer").style.display=t?"none":"block")}function Te(e){var i,n;const t=e==="signup";(i=o("#modalTabSignUp"))==null||i.classList.toggle("active",t),(n=o("#modalTabLogin"))==null||n.classList.toggle("active",!t),o("#modalSignUpContainer")&&(o("#modalSignUpContainer").style.display=t?"block":"none"),o("#modalLoginContainer")&&(o("#modalLoginContainer").style.display=t?"none":"block")}function Si(e){var n,s;a.signupChannel=e,(n=o("#signupChanPhoneCard"))==null||n.classList.toggle("active",e==="phone"),(s=o("#signupChanEmailCard"))==null||s.classList.toggle("active",e==="email");const t=o("#signupChanPhone"),i=o("#signupChanEmail");t&&(t.checked=e==="phone"),i&&(i.checked=e==="email")}function ki(e){var n,s;a.loginChannel=e,(n=o("#loginChanPhoneCard"))==null||n.classList.toggle("active",e==="phone"),(s=o("#loginChanEmailCard"))==null||s.classList.toggle("active",e==="email");const t=o("#loginChanPhone"),i=o("#loginChanEmail");t&&(t.checked=e==="phone"),i&&(i.checked=e==="email")}function Pi(e){var n,s;a.modalSignupChannel=e,(n=o("#modalSignupChanPhoneCard"))==null||n.classList.toggle("active",e==="phone"),(s=o("#modalSignupChanEmailCard"))==null||s.classList.toggle("active",e==="email");const t=o("#modalSignupChanPhone"),i=o("#modalSignupChanEmail");t&&(t.checked=e==="phone"),i&&(i.checked=e==="email")}function Ci(e){var n,s;a.modalLoginChannel=e,(n=o("#modalLoginChanPhoneCard"))==null||n.classList.toggle("active",e==="phone"),(s=o("#modalLoginChanEmailCard"))==null||s.classList.toggle("active",e==="email");const t=o("#modalLoginChanPhone"),i=o("#modalLoginChanEmail");t&&(t.checked=e==="phone"),i&&(i.checked=e==="email")}async function Mi(){var u,p,m,h,f,g,y,x,b,w,P,M,L,X,ee;const e=(p=(u=o("#guestSignupName"))==null?void 0:u.value)==null?void 0:p.trim(),t=(h=(m=o("#guestSignupPhone"))==null?void 0:m.value)==null?void 0:h.trim(),i=(g=(f=o("#guestSignupEmail"))==null?void 0:f.value)==null?void 0:g.trim(),n=(x=(y=o("#guestSignupAddrLine"))==null?void 0:y.value)==null?void 0:x.trim(),s=(w=(b=o("#guestSignupAddrCity"))==null?void 0:b.value)==null?void 0:w.trim(),r=(M=(P=o("#guestSignupAddrState"))==null?void 0:P.value)==null?void 0:M.trim(),l=(X=(L=o("#guestSignupAddrPin"))==null?void 0:L.value)==null?void 0:X.trim(),c=a.signupChannel||"phone";if(!e){v("Please enter your full name");return}if(!t||t.length<10){v("Please enter a valid 10-digit mobile number");return}if(!i||!i.includes("@")){v("Please enter a valid email address");return}if(!n||!s||!l){v("Please fill in your complete delivery address");return}const d=c==="phone"?t:i;try{const $=o("#guestSignupSubmitBtn");$&&($.disabled=!0,$.textContent="Sending OTP...");const te=await k.sendOtp({channel:c,identifier:d,name:e,email:i,phone:t,purpose:"signup"});a.simulatedOtp=te.code||Math.floor(1e3+Math.random()*9e3).toString(),a.pendingSignup={name:e,phone:t,email:i,address:{line:n,city:s,state:r,pincode:l,isDefault:!0,tag:"Home"},channel:c,identifier:d},o("#guestSignupForm")&&(o("#guestSignupForm").style.display="none"),o("#guestSignupOtpStep")&&(o("#guestSignupOtpStep").style.display="block");const ie=o("#guestSignupOtpTargetText");ie&&(ie.textContent=c==="phone"?`+91 ${t.slice(0,5)} •••••`:i),o("#signupSimulatedCode")&&(o("#signupSimulatedCode").textContent=a.simulatedOtp),["signupOtp1","signupOtp2","signupOtp3","signupOtp4"].forEach(ne=>{o(`#${ne}`)&&(o(`#${ne}`).value="")}),(ee=o("#signupOtp1"))==null||ee.focus(),me("signupOtpTimer"),v(te.message||`Verification code sent via ${c==="phone"?"SMS":"Email"}`)}catch($){v(`Error: ${$.message}`)}finally{const $=o("#guestSignupSubmitBtn");$&&($.disabled=!1,$.textContent="Get Verification OTP & Create Account →")}}function $i(){o("#signupOtp1")&&(o("#signupOtp1").value="1"),o("#signupOtp2")&&(o("#signupOtp2").value="2"),o("#signupOtp3")&&(o("#signupOtp3").value="3"),o("#signupOtp4")&&(o("#signupOtp4").value="4")}function pt(){o("#guestSignupOtpStep")&&(o("#guestSignupOtpStep").style.display="none"),o("#guestSignupForm")&&(o("#guestSignupForm").style.display="flex")}async function Ai(){var i,n,s,r,l,c,d,u;const e=[((n=(i=o("#signupOtp1"))==null?void 0:i.value)==null?void 0:n.trim())||"",((r=(s=o("#signupOtp2"))==null?void 0:s.value)==null?void 0:r.trim())||"",((c=(l=o("#signupOtp3"))==null?void 0:l.value)==null?void 0:c.trim())||"",((u=(d=o("#signupOtp4"))==null?void 0:d.value)==null?void 0:u.trim())||""].join("");if(e.length<4){v("Please enter the complete 4-digit OTP");return}const t=a.pendingSignup;if(!t){v("Signup session expired. Please enter details again."),pt();return}try{const p=o("#guestSignupVerifyBtn");p&&(p.disabled=!0,p.textContent="Verifying...");const m=await k.verifyOtp({channel:t.channel,identifier:t.identifier,code:e,name:t.name,email:t.email,phone:t.phone,address:t.address,purpose:"signup",sessionId:F()});a.user=m.customer,m.cart&&Array.isArray(m.cart.items)&&(a.cart=Z(m.cart.items),V(a.cart),G(),D()),A(a.user),q(),I(),v(`✓ Welcome to Velvet Hug, ${a.user.name}!`)}catch(p){v(`Verification failed: ${p.message}`)}finally{const p=o("#guestSignupVerifyBtn");p&&(p.disabled=!1,p.textContent="Verify OTP & Enter Sleep Partner Hub →")}}async function Ti(){var i,n,s;const e=(n=(i=o("#guestLoginIdentifier"))==null?void 0:i.value)==null?void 0:n.trim(),t=a.loginChannel||(e&&e.includes("@")?"email":"phone");if(!e){v("Please enter your registered mobile number or email");return}if(t==="phone"&&e.replace(/\D/g,"").length<10){v("Please enter a valid 10-digit mobile number");return}if(t==="email"&&!e.includes("@")){v("Please enter a valid email address");return}try{const r=o("#guestLoginSubmitBtn");r&&(r.disabled=!0,r.textContent="Sending OTP...");const l=await k.sendOtp({channel:t,identifier:e,purpose:"login"});if(l.exists===!1){v("No registered account found with this "+t+". Switching to Sign Up!"),ut("signup"),t==="phone"&&o("#guestSignupPhone")&&(o("#guestSignupPhone").value=e.replace(/\D/g,"").slice(-10)),t==="email"&&o("#guestSignupEmail")&&(o("#guestSignupEmail").value=e);return}a.simulatedOtp=l.code||Math.floor(1e3+Math.random()*9e3).toString(),a.pendingLogin={channel:t,identifier:e},o("#guestLoginForm")&&(o("#guestLoginForm").style.display="none"),o("#guestLoginOtpStep")&&(o("#guestLoginOtpStep").style.display="block");const c=o("#guestLoginOtpTargetText");c&&(c.textContent=t==="phone"?`+91 ${e.slice(0,5)} •••••`:e),o("#loginSimulatedCode")&&(o("#loginSimulatedCode").textContent=a.simulatedOtp),["loginOtp1","loginOtp2","loginOtp3","loginOtp4"].forEach(d=>{o(`#${d}`)&&(o(`#${d}`).value="")}),(s=o("#loginOtp1"))==null||s.focus(),me("loginOtpTimer"),v(l.message||`Verification code sent via ${t==="phone"?"SMS":"Email"}`)}catch(r){v(`Error: ${r.message}`)}finally{const r=o("#guestLoginSubmitBtn");r&&(r.disabled=!1,r.textContent="Send Verification Code →")}}function Li(){const e="";o("#loginOtp1")&&(o("#loginOtp1").value=e[0]||"1"),o("#loginOtp2")&&(o("#loginOtp2").value=e[1]||"2"),o("#loginOtp3")&&(o("#loginOtp3").value=e[2]||"3"),o("#loginOtp4")&&(o("#loginOtp4").value=e[3]||"4")}function mt(){o("#guestLoginOtpStep")&&(o("#guestLoginOtpStep").style.display="none"),o("#guestLoginForm")&&(o("#guestLoginForm").style.display="flex")}async function Ei(){var i,n,s,r,l,c,d,u;const e=[((n=(i=o("#loginOtp1"))==null?void 0:i.value)==null?void 0:n.trim())||"",((r=(s=o("#loginOtp2"))==null?void 0:s.value)==null?void 0:r.trim())||"",((c=(l=o("#loginOtp3"))==null?void 0:l.value)==null?void 0:c.trim())||"",((u=(d=o("#loginOtp4"))==null?void 0:d.value)==null?void 0:u.trim())||""].join("");if(e.length<4){v("Please enter the complete 4-digit OTP");return}const t=a.pendingLogin;if(!t){v("Login session expired. Please try again."),mt();return}try{const p=o("#guestLoginVerifyBtn");p&&(p.disabled=!0,p.textContent="Verifying...");const m=await k.verifyOtp({channel:t.channel,identifier:t.identifier,code:e,purpose:"login",sessionId:F()});a.user=m.customer,m.cart&&Array.isArray(m.cart.items)&&(a.cart=Z(m.cart.items),V(a.cart),G(),D()),A(a.user),q(),I(),v(`✓ Welcome back, ${a.user.name}!`)}catch(p){v(`Verification failed: ${p.message}`)}finally{const p=o("#guestLoginVerifyBtn");p&&(p.disabled=!1,p.textContent="Verify & Access My Account →")}}async function Fi(){var u,p,m,h,f,g,y,x,b,w,P,M,L,X,ee;const e=(p=(u=o("#modalSignupName"))==null?void 0:u.value)==null?void 0:p.trim(),t=(h=(m=o("#modalSignupPhone"))==null?void 0:m.value)==null?void 0:h.trim(),i=(g=(f=o("#modalSignupEmail"))==null?void 0:f.value)==null?void 0:g.trim(),n=(x=(y=o("#modalSignupAddrLine"))==null?void 0:y.value)==null?void 0:x.trim(),s=(w=(b=o("#modalSignupAddrCity"))==null?void 0:b.value)==null?void 0:w.trim(),r=(M=(P=o("#modalSignupAddrState"))==null?void 0:P.value)==null?void 0:M.trim(),l=(X=(L=o("#modalSignupAddrPin"))==null?void 0:L.value)==null?void 0:X.trim(),c=a.modalSignupChannel||"phone";if(!e){v("Please enter your full name");return}if(!t||t.length<10){v("Please enter a valid 10-digit mobile number");return}if(!i||!i.includes("@")){v("Please enter a valid email address");return}if(!n||!s||!l){v("Please fill in your delivery address");return}const d=c==="phone"?t:i;try{const $=o("#modalSignupSubmitBtn");$&&($.disabled=!0,$.textContent="Sending OTP...");const te=await k.sendOtp({channel:c,identifier:d,name:e,email:i,phone:t,purpose:"signup"});a.simulatedOtp=te.code||Math.floor(1e3+Math.random()*9e3).toString(),a.pendingSignup={name:e,phone:t,email:i,address:{line:n,city:s,state:r,pincode:l,isDefault:!0,tag:"Home"},channel:c,identifier:d},o("#modalSignupForm")&&(o("#modalSignupForm").style.display="none"),o("#modalSignupOtpStep")&&(o("#modalSignupOtpStep").style.display="block");const ie=o("#modalSignupOtpTargetText");ie&&(ie.textContent=c==="phone"?`+91 ${t.slice(0,5)} •••••`:i),o("#modalSignupSimulatedCode")&&(o("#modalSignupSimulatedCode").textContent=a.simulatedOtp),["modalSignupOtp1","modalSignupOtp2","modalSignupOtp3","modalSignupOtp4"].forEach(ne=>{o(`#${ne}`)&&(o(`#${ne}`).value="")}),(ee=o("#modalSignupOtp1"))==null||ee.focus(),me("modalSignupOtpTimer"),v(te.message||`Verification code sent via ${c==="phone"?"SMS":"Email"}`)}catch($){v(`Error: ${$.message}`)}finally{const $=o("#modalSignupSubmitBtn");$&&($.disabled=!1,$.textContent="Get Verification OTP & Create Account →")}}function Di(){const e="";o("#modalSignupOtp1")&&(o("#modalSignupOtp1").value=e[0]||"1"),o("#modalSignupOtp2")&&(o("#modalSignupOtp2").value=e[1]||"2"),o("#modalSignupOtp3")&&(o("#modalSignupOtp3").value=e[2]||"3"),o("#modalSignupOtp4")&&(o("#modalSignupOtp4").value=e[3]||"4")}function Le(){o("#modalSignupOtpStep")&&(o("#modalSignupOtpStep").style.display="none"),o("#modalSignupForm")&&(o("#modalSignupForm").style.display="flex")}async function Oi(){var i,n,s,r,l,c,d,u,p;const e=[((n=(i=o("#modalSignupOtp1"))==null?void 0:i.value)==null?void 0:n.trim())||"",((r=(s=o("#modalSignupOtp2"))==null?void 0:s.value)==null?void 0:r.trim())||"",((c=(l=o("#modalSignupOtp3"))==null?void 0:l.value)==null?void 0:c.trim())||"",((u=(d=o("#modalSignupOtp4"))==null?void 0:d.value)==null?void 0:u.trim())||""].join("");if(e.length<4){v("Please enter the complete 4-digit OTP");return}const t=a.pendingSignup;if(!t){v("Signup session expired. Please try again."),Le();return}try{const m=o("#modalSignupVerifyBtn");m&&(m.disabled=!0,m.textContent="Verifying...");const h=await k.verifyOtp({channel:t.channel,identifier:t.identifier,code:e,name:t.name,email:t.email,phone:t.phone,address:t.address,purpose:"signup",sessionId:F()});a.user=h.customer,h.cart&&Array.isArray(h.cart.items)&&(a.cart=Z(h.cart.items),V(a.cart),G(),D()),A(a.user),q(),(p=o("#loginModal"))==null||p.classList.remove("active"),I(),E("account"),v(`✓ Welcome to Velvet Hug, ${a.user.name}!`)}catch(m){v(`Verification failed: ${m.message}`)}finally{const m=o("#modalSignupVerifyBtn");m&&(m.disabled=!1,m.textContent="Verify OTP & Enter Sleep Partner Hub →")}}async function zi(){var i,n,s;const e=(n=(i=o("#modalLoginIdentifier"))==null?void 0:i.value)==null?void 0:n.trim(),t=a.modalLoginChannel||(e&&e.includes("@")?"email":"phone");if(!e){v("Please enter your registered mobile number or email");return}if(t==="phone"&&e.replace(/\D/g,"").length<10){v("Please enter a valid 10-digit mobile number");return}if(t==="email"&&!e.includes("@")){v("Please enter a valid email address");return}try{const r=o("#modalLoginSubmitBtn");r&&(r.disabled=!0,r.textContent="Sending OTP...");const l=await k.sendOtp({channel:t,identifier:e,purpose:"login"});if(l.exists===!1){v("No registered account found with this "+t+". Switching to Sign Up!"),Te("signup"),t==="phone"&&o("#modalSignupPhone")&&(o("#modalSignupPhone").value=e.replace(/\D/g,"").slice(-10)),t==="email"&&o("#modalSignupEmail")&&(o("#modalSignupEmail").value=e);return}a.simulatedOtp=l.code||Math.floor(1e3+Math.random()*9e3).toString(),a.pendingLogin={channel:t,identifier:e},o("#modalLoginForm")&&(o("#modalLoginForm").style.display="none"),o("#modalLoginOtpStep")&&(o("#modalLoginOtpStep").style.display="block");const c=o("#modalLoginOtpTargetText");c&&(c.textContent=t==="phone"?`+91 ${e.slice(0,5)} •••••`:e),o("#modalLoginSimulatedCode")&&(o("#modalLoginSimulatedCode").textContent=a.simulatedOtp),["modalLoginOtp1","modalLoginOtp2","modalLoginOtp3","modalLoginOtp4"].forEach(d=>{o(`#${d}`)&&(o(`#${d}`).value="")}),(s=o("#modalLoginOtp1"))==null||s.focus(),me("modalLoginOtpTimer"),v(l.message||`Verification code sent via ${t==="phone"?"SMS":"Email"}`)}catch(r){v(`Error: ${r.message}`)}finally{const r=o("#modalLoginSubmitBtn");r&&(r.disabled=!1,r.textContent="Send Verification Code →")}}function Ii(){const e="";o("#modalLoginOtp1")&&(o("#modalLoginOtp1").value=e[0]||"1"),o("#modalLoginOtp2")&&(o("#modalLoginOtp2").value=e[1]||"2"),o("#modalLoginOtp3")&&(o("#modalLoginOtp3").value=e[2]||"3"),o("#modalLoginOtp4")&&(o("#modalLoginOtp4").value=e[3]||"4")}function Ee(){o("#modalLoginOtpStep")&&(o("#modalLoginOtpStep").style.display="none"),o("#modalLoginForm")&&(o("#modalLoginForm").style.display="flex")}async function Ri(){var i,n,s,r,l,c,d,u,p;const e=[((n=(i=o("#modalLoginOtp1"))==null?void 0:i.value)==null?void 0:n.trim())||"",((r=(s=o("#modalLoginOtp2"))==null?void 0:s.value)==null?void 0:r.trim())||"",((c=(l=o("#modalLoginOtp3"))==null?void 0:l.value)==null?void 0:c.trim())||"",((u=(d=o("#modalLoginOtp4"))==null?void 0:d.value)==null?void 0:u.trim())||""].join("");if(e.length<4){v("Please enter the complete 4-digit OTP");return}const t=a.pendingLogin;if(!t){v("Login session expired. Please try again."),Ee();return}try{const m=o("#modalLoginVerifyBtn");m&&(m.disabled=!0,m.textContent="Verifying...");const h=await k.verifyOtp({channel:t.channel,identifier:t.identifier,code:e,purpose:"login",sessionId:F()});a.user=h.customer,h.cart&&Array.isArray(h.cart.items)&&(a.cart=Z(h.cart.items),V(a.cart),G(),D()),A(a.user),q(),(p=o("#loginModal"))==null||p.classList.remove("active"),I(),E("account"),v(`✓ Welcome back, ${a.user.name}!`)}catch(m){v(`Verification failed: ${m.message}`)}finally{const m=o("#modalLoginVerifyBtn");m&&(m.disabled=!1,m.textContent="Verify & Access My Account →")}}function Bi(){var e,t;(e=o("#accountBtn"))==null||e.addEventListener("click",()=>{E("account")}),(t=o("#loginModalClose"))==null||t.addEventListener("click",()=>{var i;(i=o("#loginModal"))==null||i.classList.remove("active")}),["signupOtp","loginOtp","modalSignupOtp","modalLoginOtp"].forEach(i=>{[1,2,3,4].forEach(n=>{var s,r;(s=o(`#${i}${n}`))==null||s.addEventListener("input",l=>{var c;l.target.value.length===1&&n<4&&((c=o(`#${i}${n+1}`))==null||c.focus())}),(r=o(`#${i}${n}`))==null||r.addEventListener("keydown",l=>{var c;l.key==="Backspace"&&!l.target.value&&n>1&&((c=o(`#${i}${n-1}`))==null||c.focus())})})}),q()}function gt(){var e;Te("signup"),Le(),Ee(),(e=o("#loginModal"))==null||e.classList.add("active")}function Ni(){var e;(e=o("#loginModal"))==null||e.classList.remove("active")}function qi(){k.logout(),a.user=null,a.pendingLogin=null,a.pendingSignup=null,A(null),q(),ft(),I(),v("Signed out successfully")}window.openLoginModal=gt;window.closeLoginModal=Ni;window.logoutUser=qi;window.switchGuestAuthTab=ut;window.switchModalAuthTab=Te;window.selectSignupOtpChannel=Si;window.selectLoginOtpChannel=ki;window.selectModalSignupOtpChannel=Pi;window.selectModalLoginOtpChannel=Ci;window.handleGuestSignupSendOtp=Mi;window.autofillSignupOtp=$i;window.backToSignupForm=pt;window.handleGuestSignupVerifyOtp=Ai;window.handleGuestLoginSendOtp=Ti;window.autofillLoginOtp=Li;window.backToLoginForm=mt;window.handleGuestLoginVerifyOtp=Ei;window.handleModalSignupSendOtp=Fi;window.autofillModalSignupOtp=Di;window.backToModalSignupForm=Le;window.handleModalSignupVerifyOtp=Oi;window.handleModalLoginSendOtp=zi;window.autofillModalLoginOtp=Ii;window.backToModalLoginForm=Ee;window.handleModalLoginVerifyOtp=Ri;window.updateHeaderUserUI=q;window.state=a;function Hi(){var e;if(!a.user){gt();return}Fe(),(e=o("#accountModal"))==null||e.classList.add("active")}function ft(){var e;(e=o("#accountModal"))==null||e.classList.remove("active")}function Fe(){var l;const e=o("#accountDashboardContent");if(!e||!a.user)return;const t=a.user,i=t.foundingNumber||t.partnerNumber;let n='<span class="badge-chip sleep-partner">🌙 Sleep Partner</span>';i&&(i<=1e3?n=`<span class="badge-chip founding">🏅 Founding Sleep Partner #${String(i).padStart(3,"0")}</span>`:n=`<span class="badge-chip sleep-partner">🌙 Sleep Partner #${i}</span>`);const s=t.isAmbassador||t.referralStats&&t.referralStats.count>0?'<span class="badge-chip ambassador">🌿 Rest Ambassador</span>':"",r='<span class="badge-chip sleep-partner">⚡ VIP First Access</span>';e.innerHTML=`
    <button class="modal-close-icon" onclick="document.getElementById('accountModal').classList.remove('active')">✕</button>
    
    <!-- Profile Header -->
    <div class="account-profile-header">
      <div class="account-user-meta">
        <div class="account-user-avatar">${t.avatar||t.name[0]||"V"}</div>
        <div>
          <div style="font-family:var(--font-serif);font-size:1.35rem;font-weight:700;color:var(--text-primary);">${t.name}</div>
          <div style="font-size:0.82rem;color:var(--text-muted);">${[t.email,t.phone?`+91 ${t.phone}`:""].filter(Boolean).join(" · ")}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="logoutUser()">Sign Out</button>
    </div>
    
    <!-- Multiple Badges Side-by-Side -->
    <div class="account-badges-row">
      ${n}
      ${s}
      ${r}
    </div>
    
    <!-- Nav Tabs -->
    <div class="account-nav-tabs">
      <button class="account-nav-tab ${a.activeAccountTab==="overview"?"active":""}" onclick="switchAccountTab('overview')">Overview</button>
      <button class="account-nav-tab ${a.activeAccountTab==="orders"?"active":""}" onclick="switchAccountTab('orders')">Orders &amp; Live Tracking (${((l=t.orders)==null?void 0:l.length)||0})</button>
      <button class="account-nav-tab ${a.activeAccountTab==="referrals"?"active":""}" onclick="switchAccountTab('referrals')">Rest Ambassador Referrals</button>
      <button class="account-nav-tab ${a.activeAccountTab==="addresses"?"active":""}" onclick="switchAccountTab('addresses')">Saved Addresses</button>
      <button class="account-nav-tab ${a.activeAccountTab==="wishlist"?"active":""}" onclick="switchAccountTab('wishlist')">Wishlist</button>
    </div>
    
    <!-- Tab Content -->
    <div id="accountTabContent">
      ${De()}
    </div>
  `}function _i(e){a.activeAccountTab=e,Fe()}function De(){var t,i,n,s,r;const e=a.user;return e?a.activeAccountTab==="overview"?`
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:20px;">
        <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-md);padding:24px;">
          <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Founding Partner Recognition</div>
          <p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.6;margin-bottom:18px;">
            As Founding Partner <strong>#${e.foundingNumber||212}</strong>, your price lock gives you an automatic <strong>15% fixed discount</strong> on all purchases.
          </p>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-gold btn-sm" onclick="openCertificateModal()">🏅 View Official Certificate</button>
            <button class="btn btn-outline btn-sm" onclick="switchAccountTab('referrals')">Refer &amp; Earn</button>
          </div>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="referral-stat-box" style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);">
            <div style="font-size:1.6rem;font-weight:800;color:var(--midnight-blue);">${((t=e.orders)==null?void 0:t.length)||0}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Active Orders</div>
          </div>
          <div class="referral-stat-box" style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);">
            <div style="font-size:1.6rem;font-weight:800;color:var(--accent-emerald);">₹${(((i=e.referralStats)==null?void 0:i.earned)||0).toLocaleString("en-IN")}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Rewards Earned</div>
          </div>
          <div class="referral-stat-box" style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);grid-column:1/-1;">
            <div style="font-size:0.76rem;color:var(--text-muted);margin-bottom:4px;">YOUR REFERRAL LINK</div>
            <div style="font-family:monospace;font-size:0.88rem;color:var(--midnight-blue);font-weight:700;">velvethug.in/ref/${e.referralCode}</div>
          </div>
        </div>
      </div>
    `:a.activeAccountTab==="orders"?!e.orders||e.orders.length===0?`
        <div style="text-align:center;padding:40px;color:var(--text-muted);">
          <div style="font-size:2.5rem;margin-bottom:10px;">📦</div>
          <div style="font-family:var(--font-serif);font-size:1.1rem;color:var(--midnight-blue);margin-bottom:6px;">No orders yet</div>
          <p style="font-size:0.84rem;margin-bottom:16px;">Your handcrafted sleep system awaits.</p>
          <button class="btn btn-primary btn-sm" onclick="closeAccountModal();goToPage('mattresses')">Explore Mattresses</button>
        </div>
      `:e.orders.map(l=>{l.step>=4||l.status;const c=l.items&&l.items[0]?l.items[0].name.replace(/'/g,"\\'"):"Velvet Hug Sleep System";return`
      <div class="order-card">
        <div class="order-card-header">
          <div>
            <span style="font-family:var(--font-serif);font-weight:700;color:var(--midnight-blue);font-size:1rem;">Order #${l.id}</span>
            <span style="font-size:0.78rem;color:var(--text-muted);margin-left:8px;">Placed on ${l.date}</span>
          </div>
          <div>
            <span class="badge badge-founding" style="font-size:0.72rem;">${l.status}</span>
            <span style="font-weight:700;color:var(--midnight-blue);margin-left:10px;">${S(l.total)}</span>
          </div>
        </div>
        
        <!-- Interactive Tracking Stepper -->
        <div class="tracking-stepper">
          <div class="tracking-step ${l.step>=1?"completed":""}">
            <div class="tracking-dot">✓</div>
            <div class="tracking-label">Order Placed</div>
          </div>
          <div class="tracking-step ${l.step>=2?"completed":""}">
            <div class="tracking-dot">✓</div>
            <div class="tracking-label">Crafted in Lab</div>
          </div>
          <div class="tracking-step ${l.step>=3?l.step===3?"current":"completed":""}">
            <div class="tracking-dot">${l.step===3?"🚚":"✓"}</div>
            <div class="tracking-label">White-Glove Dispatched</div>
          </div>
          <div class="tracking-step ${l.step>=4?"completed":""}">
            <div class="tracking-dot">🏡</div>
            <div class="tracking-label">Delivered &amp; Held</div>
          </div>
        </div>
        
        <div style="font-size:0.8rem;color:var(--text-secondary);background:#fff;padding:12px;border-radius:var(--radius-xs);margin-top:12px;">
          <strong>Items:</strong> ${(l.items||[]).map(d=>`${d.name} × ${d.qty}`).join(", ")}<br>
          <strong>Delivery to:</strong> ${l.address}<br>
          <strong>Live Tracking:</strong> <span style="font-family:monospace;color:var(--midnight-blue);font-weight:700;">${l.trackingId}</span>
        </div>

        <div style="margin-top:12px;padding-top:10px;border-top:1px dashed rgba(76,63,94,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            ${l.hasReviewed?`
              <span style="color:var(--accent-emerald);font-size:0.84rem;font-weight:700;">✓ Verified Review Submitted &amp; Recorded</span>
            `:`
              <button class="btn btn-gold btn-sm" onclick="window.openOrderReviewModal('${l.id}', '${c}')">
                ★ Write a Doctor / Sleeper Review
              </button>
            `}
          </div>
        </div>
      </div>
    `}).join(""):a.activeAccountTab==="referrals"?`
      <div class="referral-hero-card">
        <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--champagne-gold);margin-bottom:4px;">Rest Ambassador Program</div>
        <h3 style="font-family:var(--font-serif);font-size:1.4rem;margin-bottom:8px;">Hold someone's sleep. Earn ₹1,000 for each friend.</h3>
        <p style="font-size:0.86rem;color:rgba(255,255,255,0.75);margin-bottom:16px;">
          When your friends purchase using your link, they get <strong>10% off</strong> and you earn <strong>₹1,000 cash reward</strong>.
        </p>
        <div class="referral-link-box">
          <input class="form-input" value="https://velvethug.in/ref/${e.referralCode}" readonly style="background:transparent;border:none;color:#fff;font-size:0.85rem;font-family:monospace;" id="refLinkInput">
          <button class="btn btn-gold btn-sm" onclick="
            navigator.clipboard.writeText('https://velvethug.in/ref/${e.referralCode}');
            toast('✓ Referral link copied to clipboard!');
          ">Copy Link</button>
        </div>
      </div>
      
      <div class="referral-stats-grid">
        <div class="referral-stat-box" style="background:var(--bg-secondary);">
          <div style="font-size:1.8rem;font-weight:800;color:var(--midnight-blue);">${((n=e.referralStats)==null?void 0:n.count)||0}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);">Friends Referred</div>
        </div>
        <div class="referral-stat-box" style="background:var(--bg-secondary);">
          <div style="font-size:1.8rem;font-weight:800;color:var(--accent-emerald);">₹${(((s=e.referralStats)==null?void 0:s.earned)||0).toLocaleString("en-IN")}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);">Rewards Paid</div>
        </div>
        <div class="referral-stat-box" style="background:var(--bg-secondary);">
          <div style="font-size:1.8rem;font-weight:800;color:var(--muted-violet);">₹${(((r=e.referralStats)==null?void 0:r.pending)||0).toLocaleString("en-IN")}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);">Rewards in Trial</div>
        </div>
      </div>
      
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap;">
        <a href="https://wa.me/?text=Hey!%20I%20got%20the%20Velvet%20Hug%20mattress%20and%20it%20has%20transformed%20my%20sleep.%20Get%2010%25%20off%20with%20my%20link:%20https://velvethug.in/ref/${e.referralCode}" target="_blank" class="btn btn-primary btn-sm">
          Share to WhatsApp 💬
        </a>
      </div>
    `:a.activeAccountTab==="addresses"?`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
        ${(e.addresses||[]).map(l=>`
          <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-sm);padding:18px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span class="badge badge-founding" style="font-size:0.68rem;">${l.tag||"Address"}</span>
              ${l.isDefault?'<span style="font-size:0.72rem;color:var(--accent-emerald);font-weight:700;">Default</span>':""}
            </div>
            <div style="font-weight:700;color:var(--midnight-blue);margin-bottom:4px;">${l.name}</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.5;">${l.line}<br>${l.city}, ${l.state||""} - ${l.pincode}<br>Phone: ${l.phone}</div>
          </div>
        `).join("")}
      </div>
    `:a.activeAccountTab==="wishlist"?`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${B.slice(0,2).map(l=>`
          <div style="display:flex;gap:12px;background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);border-radius:var(--radius-sm);padding:12px;align-items:center;">
            <img src="${R(l.image)}" style="width:70px;height:60px;object-fit:cover;border-radius:4px;" onerror="this.style.display='none'">
            <div style="flex:1;">
              <div style="font-family:var(--font-serif);font-weight:600;font-size:0.92rem;color:var(--midnight-blue);">${l.name}</div>
              <div style="font-size:0.84rem;font-weight:700;color:var(--midnight-blue);">${S(l.basePrice)}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="addToCart('${l.id}');closeAccountModal();">Add</button>
          </div>
        `).join("")}
      </div>
    `:"":""}window.openAccountModal=Hi;window.closeAccountModal=ft;window.switchAccountTab=_i;let ce="orders";function I(){var u,p;const e=o("#accountPageGuest"),t=o("#accountPageLoggedIn"),i=o("#accountPageTitle"),n=o("#accountPageSubtitle");if(!a.user){e&&(e.style.display="block"),t&&(t.style.display="none"),i&&(i.textContent="Sleep Partner Hub"),n&&(n.textContent="Your orders, profile and all things Velvet Hug.");return}e&&(e.style.display="none"),t&&(t.style.display="block");const s=a.user;if(i&&(i.textContent=s.name||"Sleep Partner"),n){const m=[s.email,s.phone?`+91 ${s.phone}`:""].filter(Boolean);n.textContent=m.length?m.join(" · "):"Sleep Partner Account"}const r=o("#acctAvatar");r&&(r.textContent=s.avatar||((p=(u=s.name)==null?void 0:u[0])==null?void 0:p.toUpperCase())||"V");const l=o("#acctName");l&&(l.textContent=s.name||"Sleep Partner");const c=o("#acctContact");if(c){const m=[s.email,s.phone?`+91 ${s.phone}`:""].filter(Boolean);c.textContent=m.length?m.join(" · "):"—"}const d=o("#acctBadges");if(d){let m="";const h=s.foundingNumber||s.partnerNumber;h?h<=1e3?m+=`<span class="badge badge-founding">🏅 Founding Sleep Partner #${String(h).padStart(3,"0")}</span>`:m+=`<span class="badge badge-founding">🏅 Sleep Partner #${h}</span>`:m+='<span class="badge badge-founding">🌙 Sleep Partner</span>',(s.isAmbassador||s.referralStats&&s.referralStats.count>0)&&(m+='<span class="badge badge-new" style="margin-left:6px;">🌿 Rest Ambassador</span>'),d.innerHTML=m}J(),ce==="orders"&&k.token&&s.id&&et().then(()=>J()).catch(m=>console.warn("[Account] Order refresh failed:",m.message))}function ht(e){var t,i;ce=e,(t=o("#acctTabOrders"))==null||t.classList.toggle("active",e==="orders"),(i=o("#acctTabProfile"))==null||i.classList.toggle("active",e==="profile"),J()}function J(){var i,n,s;const e=o("#accountPageTabContent");if(!e||!a.user)return;const t=a.user;if(ce==="orders"){if(!t.orders||t.orders.length===0){e.innerHTML=`
        <div style="text-align:center;padding:60px 0;">
          <div style="font-size:3.5rem;margin-bottom:16px;">📦</div>
          <div style="font-family:var(--font-serif);font-size:1.3rem;color:var(--midnight-blue);margin-bottom:8px;">No orders yet</div>
          <p style="color:var(--text-muted);margin-bottom:24px;">Your handcrafted sleep system awaits.</p>
          <button class="btn btn-gold btn-lg" onclick="goToPage('mattresses')">Explore Mattresses →</button>
        </div>`;return}e.innerHTML=t.orders.map(r=>{const l=r.deliveryStatus||r.status||"Order Placed",c=l==="Delivered"?4:l==="Dispatched"?3:l==="Crafted in Lab"?2:1;return`
      <div class="order-card" style="margin-bottom:20px;background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-md);padding:20px;">
        <div class="order-card-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(76,63,94,0.08);padding-bottom:12px;margin-bottom:14px;">
          <div>
            <span style="font-family:var(--font-serif);font-weight:700;color:var(--midnight-blue);font-size:1.05rem;">Order #${r.id}</span>
            <span style="font-size:0.78rem;color:var(--text-muted);margin-left:8px;">Ordered on ${r.date}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="badge badge-founding" style="font-size:0.72rem;">${l}</span>
            <span style="font-weight:700;color:var(--midnight-blue);font-size:1.05rem;">${S(r.total||r.amount)}</span>
          </div>
        </div>

        <!-- Dynamic 4-Step Tracking Stepper -->
        <div class="tracking-stepper">
          <div class="tracking-step ${c>=1?"completed":""}">
            <div class="tracking-dot">✓</div><div class="tracking-label">Order Placed</div>
          </div>
          <div class="tracking-step ${c>=2?"completed":""}">
            <div class="tracking-dot">${c>=2?"✓":"2"}</div><div class="tracking-label">Crafted in Lab</div>
          </div>
          <div class="tracking-step ${c>=3?"completed":""}">
            <div class="tracking-dot">${c>=3?"✓":"3"}</div><div class="tracking-label">Dispatched</div>
          </div>
          <div class="tracking-step ${c>=4?"completed":""}">
            <div class="tracking-dot">${c>=4?"✓":"4"}</div><div class="tracking-label">Delivered</div>
          </div>
        </div>

        <!-- Order Items & Delivery Details -->
        <div style="font-size:0.82rem;color:var(--text-secondary);background:var(--bg-secondary);padding:14px;border-radius:var(--radius-sm);margin-top:14px;">
          <div style="margin-bottom:4px;"><strong>Items:</strong> ${(r.items||[]).map(d=>typeof d=="string"?d:`${d.name} × ${d.qty}`).join(", ")}</div>
          <div style="margin-bottom:4px;"><strong>Delivery Address:</strong> ${r.address}</div>
          <div><strong>Tracking Reference:</strong> <span style="font-family:monospace;font-weight:700;color:var(--midnight-blue);">${r.trackingId||"VH-TRK-99021"}</span></div>

          ${r.timeline&&r.timeline.length>0?`
            <div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(76,63,94,0.1);">
              <div style="font-weight:700;font-size:0.78rem;color:var(--midnight-blue);margin-bottom:6px;">Milestone History &amp; Timestamps:</div>
              ${r.timeline.map(d=>`
                <div style="font-size:0.75rem;display:flex;justify-content:space-between;padding:3px 0;color:var(--text-secondary);">
                  <span>• <strong>${d.stage}</strong>: ${d.note}</span>
                  <span style="color:var(--text-muted);">${d.timestamp}</span>
                </div>
              `).join("")}
            </div>
          `:""}

          <!-- 100-Night Trial & Renewal Actions -->
          <div style="display:flex;gap:10px;margin-top:14px;padding-top:12px;border-top:1px dashed rgba(76,63,94,0.15);flex-wrap:wrap;">
            <button class="btn btn-outline btn-sm" onclick="window.openReturnRequestModal()">🌙 100-Night Return / Exchange</button>
          </div>
        </div>
      </div>
    `}).join("")+`
      <!-- Active Return Tickets with Live Super Admin Sync & Photo Evidence Upload -->
      ${(()=>{const r=Se(),l=(t.returnTickets||[]).map(c=>{const d=r.find(u=>u.rmaId===c.rmaId);return d?{...c,...d}:c});return l.length?`
          <div style="margin-top:28px;background:var(--bg-surface);border:1px solid rgba(76,63,94,0.14);border-radius:var(--radius-md);padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
              <h4 style="font-family:var(--font-serif);font-size:1.15rem;color:var(--midnight-blue);margin:0;">Active Return &amp; Exchange Tickets</h4>
              <span style="font-size:0.75rem;color:var(--text-muted);">Syncing live with Super Admin Portal</span>
            </div>
            ${l.map(c=>`
              <div style="background:var(--bg-secondary);padding:16px;border-radius:var(--radius-sm);margin-bottom:14px;border-left:4px solid var(--champagne-gold);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:8px;">
                  <strong style="font-family:monospace;font-size:0.92rem;color:var(--midnight-blue);">${c.rmaId}</strong>
                  <span class="badge ${(c.status||"").includes("Completed")?"badge-founding":(c.status||"").includes("Approved")?"badge-new":(c.status||"").includes("Evidence")||(c.status||"").includes("Assigned")?"badge-founding":"badge-new"}">${c.status}</span>
                </div>
                <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:4px;">
                  Item: <strong>${c.item||"Velvet Hug Dual-Comfort Mattress"}</strong> · Type: <strong>${c.type||"Exchange"}</strong> · Reason: ${c.reason||"Comfort preference"}
                </div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
                  Pickup Address: ${c.pickupAddress||c.address||"Registered Address"} · Slot: ${c.slot||"Pending Dispatch"}
                </div>
                ${c.evidenceUrl?`
                  <div style="margin-top:8px;font-size:0.75rem;">
                    <a href="${c.evidenceUrl}" target="_blank" style="color:var(--champagne-gold);text-decoration:underline;">📷 View Inspection Photo Evidence</a>
                  </div>
                `:""}
              </div>
            `).join("")}
          </div>
        `:""})()}
    `}else ce==="profile"&&(e.innerHTML=`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <!-- Personal Details -->
        <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;">
          <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:16px;">Personal Details</div>
          <div style="margin-bottom:14px;">
            <label class="form-label">Full Name</label>
            <input class="form-input" id="profileName" value="${t.name||""}" placeholder="Your Name">
          </div>
          <div style="margin-bottom:14px;">
            <label class="form-label">Email Address</label>
            <input class="form-input" id="profileEmail" value="${t.email||""}" placeholder="your@email.com">
          </div>
          <div style="margin-bottom:20px;">
            <label class="form-label">Phone Number (+91)</label>
            <input class="form-input" id="profilePhone" value="${t.phone||""}" placeholder="10-digit mobile number">
          </div>
          <button class="btn btn-primary btn-sm" onclick="saveProfileDetails()">Save Changes</button>
        </div>

        <!-- Saved Addresses -->
        <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;">
          <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:16px;">Saved Addresses</div>
          <div id="profileAddressList">
            ${(t.addresses||[]).map((r,l)=>`
              <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);border-radius:var(--radius-sm);padding:14px;margin-bottom:10px;position:relative;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span class="badge badge-founding" style="font-size:0.65rem;">${r.tag}</span>
                  ${r.isDefault?'<span style="font-size:0.72rem;color:var(--accent-emerald);font-weight:700;">Default</span>':`<button class="btn btn-outline btn-sm" style="font-size:0.68rem;padding:2px 8px;" onclick="setDefaultAddress(${l})">Set Default</button>`}
                </div>
                <div style="font-weight:700;color:var(--midnight-blue);font-size:0.9rem;">${r.name}</div>
                <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">${r.line}<br>${r.city}, ${r.state} - ${r.pincode}<br>📞 ${r.phone}</div>
                <button onclick="deleteAddress(${l})" style="position:absolute;top:10px;right:10px;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.75rem;">✕ Remove</button>
              </div>
            `).join("")}
          </div>
          <div style="border-top:1px solid rgba(76,63,94,0.08);padding-top:14px;margin-top:14px;">
            <div style="font-size:0.82rem;font-weight:600;color:var(--midnight-blue);margin-bottom:10px;">Add New Address</div>
            <input class="form-input" id="newAddrTag" placeholder="Label (Home / Office)" style="margin-bottom:6px;">
            <input class="form-input" id="newAddrLine" placeholder="Street address" style="margin-bottom:6px;">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px;">
              <input class="form-input" id="newAddrCity" placeholder="City">
              <input class="form-input" id="newAddrState" placeholder="State">
              <input class="form-input" id="newAddrPin" placeholder="Pincode" maxlength="6">
            </div>
            <button class="btn btn-outline btn-sm" onclick="addNewAddress()">+ Save Address</button>
          </div>
        </div>

      </div>

      <!-- Sleep Partner Status Card -->
      ${t.isFounding?`
      <div style="background:linear-gradient(135deg,var(--midnight-blue),var(--muted-violet));border-radius:var(--radius-lg);padding:24px;margin-top:24px;color:#FDFBF7;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
        <div>
          <div style="font-size:0.78rem;letter-spacing:0.1em;opacity:0.7;margin-bottom:4px;">FOUNDING SLEEP PARTNER</div>
          <div style="font-family:var(--font-serif);font-size:2rem;font-weight:700;">#${t.foundingNumber}</div>
          <div style="font-size:0.84rem;opacity:0.75;margin-top:4px;">15% lifetime price lock · VIP first access</div>
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-gold btn-sm" onclick="openCertificateModal()">🏅 Certificate</button>
          <button class="btn btn-outline-light btn-sm" onclick="switchAccountPageTab('orders')">View Orders</button>
        </div>
      </div>`:""}

      <!-- Referral Panel -->
      <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;margin-top:24px;">
        <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:8px;">🤝 Rest Ambassador - Refer &amp; Earn</div>
        <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:14px;">Share your link. Earn ₹1,000 for every friend who buys.</p>
        <div style="display:flex;gap:8px;margin-bottom:12px;">
          <input class="form-input" value="https://velvethug.in/ref/${t.referralCode}" readonly style="font-family:monospace;font-size:0.82rem;">
          <button class="btn btn-gold btn-sm" onclick="navigator.clipboard?.writeText('https://velvethug.in/ref/${t.referralCode}');toast('✓ Link copied!')">Copy</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
          <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
            <div style="font-size:1.4rem;font-weight:800;color:var(--midnight-blue);">${((i=t.referralStats)==null?void 0:i.count)||0}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Friends Referred</div>
          </div>
          <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
            <div style="font-size:1.4rem;font-weight:800;color:var(--accent-emerald);">₹${(((n=t.referralStats)==null?void 0:n.earned)||0).toLocaleString("en-IN")}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Earned</div>
          </div>
          <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
            <div style="font-size:1.4rem;font-weight:800;color:var(--muted-violet);">₹${(((s=t.referralStats)==null?void 0:s.pending)||0).toLocaleString("en-IN")}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">In Trial</div>
          </div>
        </div>
      </div>
    `)}async function ji(){var n,s,r,l,c,d;if(!a.user)return;const e=(s=(n=o("#profileName"))==null?void 0:n.value)==null?void 0:s.trim(),t=(l=(r=o("#profileEmail"))==null?void 0:r.value)==null?void 0:l.trim(),i=(d=(c=o("#profilePhone"))==null?void 0:c.value)==null?void 0:d.trim();if(!e){v("Name cannot be empty");return}try{const u=await k.updateProfile({name:e,email:t,phone:i});u!=null&&u.success&&u.customer?a.user={...a.user,...u.customer}:(a.user.name=e,a.user.email=t,a.user.phone=i,a.user.avatar=e[0].toUpperCase()),A(a.user),q(),I(),v("✓ Profile updated successfully in database!")}catch(u){v(`Update failed: ${u.message}`)}}async function Vi(){var r,l,c,d,u,p,m,h,f,g,y;if(!a.user)return;const e=((l=(r=o("#newAddrTag"))==null?void 0:r.value)==null?void 0:l.trim())||"Home",t=(d=(c=o("#newAddrLine"))==null?void 0:c.value)==null?void 0:d.trim(),i=(p=(u=o("#newAddrCity"))==null?void 0:u.value)==null?void 0:p.trim(),n=(h=(m=o("#newAddrState"))==null?void 0:m.value)==null?void 0:h.trim(),s=(g=(f=o("#newAddrPin"))==null?void 0:f.value)==null?void 0:g.trim();if(!t||!i||!s){v("Please fill address, city and pincode");return}try{const x=await k.addAddress({tag:e,name:a.user.name,phone:a.user.phone,line:t,city:i,state:n,pincode:s,isDefault:!((y=a.user.addresses)!=null&&y.length)});x!=null&&x.success&&Array.isArray(x.addresses)?a.user.addresses=x.addresses:(a.user.addresses=a.user.addresses||[],a.user.addresses.push({id:`a${Date.now()}`,tag:e,name:a.user.name,phone:`+91 ${a.user.phone}`,line:t,city:i,state:n,pincode:s,isDefault:a.user.addresses.length===0})),A(a.user),J(),v("✓ Address saved in database!")}catch(x){v(`Error saving address: ${x.message}`)}}async function Gi(e){var i;if(!((i=a.user)!=null&&i.addresses))return;const t=a.user.addresses[e];try{if(t!=null&&t.id){const n=await k.deleteAddress(t.id);n!=null&&n.success&&Array.isArray(n.addresses)?a.user.addresses=n.addresses:a.user.addresses.splice(e,1)}else a.user.addresses.splice(e,1);a.user.addresses.length&&!a.user.addresses.some(n=>n.isDefault)&&(a.user.addresses[0].isDefault=!0),A(a.user),J(),v("Address removed")}catch(n){v(`Error deleting address: ${n.message}`)}}async function Ui(e){var i;if(!((i=a.user)!=null&&i.addresses))return;const t=a.user.addresses[e];try{if(t!=null&&t.id){const n=await k.setDefaultAddress(t.id);n!=null&&n.success&&Array.isArray(n.addresses)?a.user.addresses=n.addresses:a.user.addresses.forEach((s,r)=>s.isDefault=r===e)}else a.user.addresses.forEach((n,s)=>n.isDefault=s===e);A(a.user),J(),v("✓ Default address updated")}catch(n){v(`Error updating default address: ${n.message}`)}}window.switchAccountPageTab=ht;window.saveProfileDetails=ji;window.addNewAddress=Vi;window.deleteAddress=Gi;window.setDefaultAddress=Ui;function Wi(){var c;const e=a.user||{name:"Sleep Partner",foundingNumber:212},t=o("#certificateContent");if(!t)return;const i=e.foundingNumber||212,n=i<=1e3,s=n?"Founding Sleep Partner":"Sleep Partner",r=n?`#${String(i).padStart(3,"0")}`:`#${i}`,l=n?"As one of the first 1,000 customers to trust Velvet Hug with their rest, this numbered status and 15% lifetime price lock are permanently tied to your name.":"Honoured member of the Velvet Hug sleep community. Thank you for resting with us.";t.innerHTML=`
    <button class="modal-close-icon" onclick="document.getElementById('certificateModal').classList.remove('active')">&times;</button>
    <div class="certificate-seal">🏅</div>
    <div style="font-size:0.75rem;letter-spacing:0.18em;font-weight:700;color:var(--muted-violet);text-transform:uppercase;margin-bottom:8px;">Certificate of Honour</div>
    <h2 style="font-family:var(--font-serif);font-size:1.8rem;color:var(--midnight-blue);margin-bottom:8px;">${s}</h2>
    <div style="font-family:var(--font-serif);font-size:2.8rem;font-weight:700;color:var(--midnight-blue);margin:8px 0;">${r}</div>
    <p style="font-family:var(--font-serif);font-style:italic;font-size:1.1rem;color:var(--muted-violet);margin-bottom:16px;">
      Awarded to <strong>${e.name}</strong>
    </p>
    <p style="font-size:0.84rem;color:var(--text-secondary);max-width:440px;margin:0 auto 24px;line-height:1.6;">
      ${l}
    </p>
    <div style="display:flex;justify-content:space-around;border-top:1px solid rgba(76,63,94,0.15);padding-top:16px;margin-bottom:24px;font-size:0.75rem;color:var(--text-muted);">
      <div>Verified by<br><strong style="color:var(--midnight-blue);">Velvet Hug Sleep Labs</strong></div>
      <div>Issued<br><strong style="color:var(--midnight-blue);">Batch 2026</strong></div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;">
      <button class="btn btn-gold btn-sm" onclick="window.print();toast('🖨️ Printing certificate...')">Print / Save PDF</button>
      <button class="btn btn-outline btn-sm" onclick="navigator.clipboard?.writeText(window.location.href);toast('Badge link copied for sharing!')">Share Badge</button>
    </div>
  `,(c=o("#certificateModal"))==null||c.classList.add("active")}window.openCertificateModal=Wi;function Ki(){var e,t;(e=o("#checkoutModalClose"))==null||e.addEventListener("click",ye),(t=o("#checkoutModalBackdrop"))==null||t.addEventListener("click",i=>{i.target===o("#checkoutModalBackdrop")&&ye()})}function Oe(){var e;Y(),a.checkoutStep="details",H(),(e=o("#checkoutModalBackdrop"))==null||e.classList.add("active")}function ye(){var e;(e=o("#checkoutModalBackdrop"))==null||e.classList.remove("active")}function vt(e){a.paymentMethod=e,H()}window.setPaymentMethod=vt;function yt(){try{const e=localStorage.getItem("vh_admin_store_v1");if(e){const t=JSON.parse(e);if(t.coupons&&t.coupons.length>0)return t.coupons.filter(i=>i.status==="Active")}}catch{}return[{code:"DIWALI30",discountPct:30,maxDiscount:1e4,minOrder:15e3},{code:"FOUNDING15",discountPct:15,maxDiscount:15e3,minOrder:1e4},{code:"FOUNDING",discountPct:15,maxDiscount:15e3,minOrder:1e4},{code:"REST10",discountPct:10,maxDiscount:5e3,minOrder:5e3}]}function H(){var d,u,p,m,h,f,g,y,x,b;const e=o("#checkoutContent");if(!e)return;const t=Pe(),i=(d=a.user)==null?void 0:d.isFounding,n=yt();let s=null;a.appliedCoupon&&(s=n.find(w=>w.code.toUpperCase()===a.appliedCoupon.toUpperCase()));let r=0;if(i)r=Math.round(t*.15);else if(s){const w=Math.round(t*(s.discountPct/100));r=Math.min(w,s.maxDiscount||1e4)}const l=Math.max(0,t-r),c=`
    <div class="checkout-steps-bar">
      <div class="checkout-step-pill ${a.checkoutStep==="details"?"active":""}">
        <div class="checkout-step-num">1</div> Delivery Details
      </div>
      <div style="flex-grow:1;height:1px;background:rgba(76,63,94,0.1);margin:0 8px;align-self:center;"></div>
      <div class="checkout-step-pill ${a.checkoutStep==="payment"?"active":""}">
        <div class="checkout-step-num">2</div> Secure Payment
      </div>
      <div style="flex-grow:1;height:1px;background:rgba(76,63,94,0.1);margin:0 8px;align-self:center;"></div>
      <div class="checkout-step-pill ${a.checkoutStep==="success"?"active":""}">
        <div class="checkout-step-num">✓</div> Order Confirmed
      </div>
    </div>`;if(a.checkoutStep==="details"){const w=a.user;e.innerHTML=`
      ${c}
      <h3 style="font-family:var(--font-serif);font-size:1.3rem;color:var(--midnight-blue);margin-bottom:16px;">Delivery Details</h3>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div><label class="form-label">Full Name</label><input class="form-input" id="coName" value="${(w==null?void 0:w.name)||""}" placeholder="Your Full Name"></div>
        <div><label class="form-label">Phone Number (+91)</label><input class="form-input" id="coPhone" value="${(w==null?void 0:w.phone)||""}" placeholder="10-digit mobile number"></div>
      </div>
      <div style="margin-bottom:12px;"><label class="form-label">Email for Order & Digital Badge</label><input class="form-input" id="coEmail" value="${(w==null?void 0:w.email)||""}" placeholder="your.email@example.com"></div>
      <div style="margin-bottom:12px;"><label class="form-label">Complete Street Address</label><input class="form-input" id="coAddress" value="${((p=(u=w==null?void 0:w.addresses)==null?void 0:u[0])==null?void 0:p.line)||""}" placeholder="House / Flat No, Building, Street"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:8px;">
        <div><label class="form-label">City</label><input class="form-input" id="coCity" value="${((h=(m=w==null?void 0:w.addresses)==null?void 0:m[0])==null?void 0:h.city)||"Chennai"}" placeholder="Chennai"></div>
        <div><label class="form-label">State</label><input class="form-input" id="coState" value="${((g=(f=w==null?void 0:w.addresses)==null?void 0:f[0])==null?void 0:g.state)||"Tamil Nadu"}" placeholder="Tamil Nadu"></div>
        <div><label class="form-label">Pincode</label><input class="form-input" id="coPin" value="${((x=(y=w==null?void 0:w.addresses)==null?void 0:y[0])==null?void 0:x.pincode)||a.rememberedPincode||"600028"}" placeholder="600028" oninput="window.updateCheckoutPincodeSpeed(this.value)"></div>
      </div>
      <div id="checkoutPincodeSpeedBadge" style="margin-bottom:14px;">
        <span style="font-size:0.78rem;color:#059669;font-weight:700;display:inline-flex;align-items:center;gap:5px;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:4px;">
          ⚡ Same-Day / Next-Day Delivery &amp; Free White-Glove Unboxing Active (Dispatched from Chennai Mother Hub)
        </span>
      </div>
      
      <!-- Order Summary -->
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:16px;margin-bottom:18px;">
        <div style="font-weight:700;margin-bottom:8px;color:var(--midnight-blue);">Order Summary (${a.cart.length} items)</div>
        ${a.cart.map(P=>`
          <div style="display:flex;justify-content:space-between;font-size:0.84rem;padding:4px 0;color:var(--text-secondary);">
            <span>${P.product.name} × ${P.qty} (${P.size})</span>
            <span>${S(P.product.basePrice*P.qty)}</span>
          </div>
        `).join("")}
        <div style="border-top:1px solid rgba(76,63,94,0.1);margin-top:8px;padding-top:8px;display:flex;justify-content:space-between;font-weight:800;font-size:1rem;color:var(--midnight-blue);">
          <span>Subtotal</span><span>${S(t)}</span>
        </div>
      </div>
      
      <button class="btn btn-primary btn-lg btn-block" id="proceedToPaymentBtn" onclick="proceedToPayment()">
        Proceed to Payment (${S(l)}) →
      </button>
    `}else if(a.checkoutStep==="payment")e.innerHTML=`
      ${c}
      <h3 style="font-family:var(--font-serif);font-size:1.3rem;color:var(--midnight-blue);margin-bottom:16px;">Choose Payment Mode</h3>
      
      <!-- Payment Method Selector -->
      <div class="payment-tab-selector">
        <button class="payment-tab-btn ${a.paymentMethod==="upi"?"active":""}" onclick="setPaymentMethod('upi')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
          <span>UPI / QR</span>
        </button>
        <button class="payment-tab-btn ${a.paymentMethod==="emi"?"active":""}" onclick="setPaymentMethod('emi')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <span>No-Cost EMI</span>
        </button>
        <button class="payment-tab-btn ${a.paymentMethod==="card"?"active":""}" onclick="setPaymentMethod('card')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <span>Cards</span>
        </button>
        <button class="payment-tab-btn ${a.paymentMethod==="netbanking"?"active":""}" onclick="setPaymentMethod('netbanking')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/></svg>
          <span>Net Banking</span>
        </button>
        <button class="payment-tab-btn ${a.paymentMethod==="cod"?"active":""}" onclick="setPaymentMethod('cod')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          <span>COD</span>
        </button>
      </div>
      
      <!-- Payment Panel Details -->
      ${Qi(l)}
      
      <!-- Price Lock & Coupon -->
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;">
        ${i?`
          <div style="display:flex;justify-content:space-between;color:var(--accent-emerald);font-weight:700;font-size:0.84rem;margin-bottom:6px;">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              <span>Founding Sleep Partner Price Lock (15% Off)</span>
            </span>
            <span>− ${S(r)}</span>
          </div>
        `:`
          <div style="display:flex;gap:8px;margin-bottom:6px;">
            <input class="form-input" placeholder="Enter Coupon Code" value="${a.appliedCoupon||""}" id="coCouponInput" style="flex:1;text-transform:uppercase;">
            <button class="btn btn-outline btn-sm" onclick="applyCheckoutCoupon()">Apply</button>
          </div>
          ${s?`
            <div style="display:flex;justify-content:space-between;color:var(--accent-emerald);font-weight:700;font-size:0.82rem;margin-bottom:6px;">
              <span>✓ Coupon Applied: ${s.code} (${s.discountPct}% OFF)</span>
              <span>− ${S(r)}</span>
            </div>
          `:`
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
              <span style="font-size:0.72rem;color:var(--text-muted);align-self:center;">Available:</span>
              ${n.map(w=>`
                <button type="button" onclick="applyDirectCoupon('${w.code}')" style="font-size:0.72rem;background:var(--bg-surface);border:1px dashed var(--champagne-gold);padding:3px 8px;border-radius:4px;font-weight:700;color:var(--text-primary);cursor:pointer;">
                  🏷️ ${w.code} (${w.discountPct}% OFF)
                </button>
              `).join("")}
            </div>
          `}
        `}
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.15rem;color:var(--midnight-blue);border-top:1px solid rgba(76,63,94,0.1);padding-top:8px;">
          <span>Total Payable</span>
          <span>${S(l)}</span>
        </div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;display:flex;align-items:center;gap:4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
        </div>
      </div>
      
      <div style="display:flex;gap:10px;">
        <button class="btn btn-outline btn-sm" onclick="backToCheckoutDetails()">← Back</button>
        <button class="btn btn-gold btn-lg btn-block" onclick="executePaymentGateway(${l})" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Authorize &amp; Pay ${S(l)}</span>
        </button>
      </div>
    `;else if(a.checkoutStep==="success"){const w=a.foundingCount<=Ot,P=((b=a.user)==null?void 0:b.foundingNumber)||(w?a.foundingCount:null),M=`VH-${Math.floor(1e5+Math.random()*9e5)}`;e.innerHTML=`
      ${c}
      <div style="text-align:center;padding:12px 0;">
        <div class="success-check-circle">✓</div>
        <h2 style="font-family:var(--font-serif);font-size:1.8rem;color:var(--midnight-blue);margin-bottom:6px;">Payment Successful!</h2>
        <p style="color:var(--text-secondary);font-family:var(--font-serif);font-style:italic;margin-bottom:20px;">
          "Sleep isn't where the day ends. It is where tomorrow begins."
        </p>
        
        <!-- Founding Sleep Partner Recognition -->
        <div style="background:var(--champagne-gold-light);border:2px solid var(--champagne-gold-border);border-radius:var(--radius-md);padding:20px;max-width:380px;margin:0 auto 20px;">
          <div style="font-size:0.75rem;font-weight:700;letter-spacing:0.12em;color:var(--muted-violet);text-transform:uppercase;margin-bottom:4px;display:flex;align-items:center;justify-content:center;gap:6px;">
            ${P?`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              <span>Founding Sleep Partner</span>
            `:`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              <span>Verified Sleep Partner</span>
            `}
          </div>
          <div style="font-family:var(--font-serif);font-size:2.2rem;font-weight:700;color:var(--midnight-blue);">
            ${P?`#${P}`:"Sleep Partner"}
          </div>
          <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
            Your status and order are permanently registered.
          </div>
          <button class="btn btn-gold btn-sm" style="margin-top:12px;display:inline-flex;align-items:center;gap:6px;" onclick="closeCheckout();openCertificateModal();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            <span>View Official Certificate</span>
          </button>
        </div>
        
        <div style="font-size:0.84rem;color:var(--text-muted);margin-bottom:20px;">
          Order ID: <strong style="color:var(--midnight-blue);">${M}</strong> · White-Glove delivery in 3–5 days
        </div>
        
        <div style="display:flex;flex-direction:column;gap:10px;max-width:300px;margin:0 auto;">
          <button class="btn btn-primary btn-block" onclick="closeCheckout();navigateTo('account');switchAccountPageTab('orders');">
            View Live Tracking in Account →
          </button>
          <button class="btn btn-outline btn-block" onclick="closeCheckout();goToPage('home')">
            Return to Home
          </button>
        </div>
      </div>
    `}}function Qi(e){if(a.paymentMethod==="upi")return`
      <div class="upi-qr-container">
        <div class="upi-qr-box">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--midnight-blue)">
            <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v4h-4v-4z"/>
          </svg>
          <span style="font-size:0.65rem;color:var(--muted-violet);font-weight:700;margin-top:4px;">UPI QR Code</span>
        </div>
        <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:8px;">Scan with any UPI App or click to approve:</div>
        <div class="upi-apps-row">
          <span class="upi-app-chip" onclick="toast('GPay Intent Triggered')">Google Pay</span>
          <span class="upi-app-chip" onclick="toast('PhonePe Intent Triggered')">PhonePe</span>
          <span class="upi-app-chip" onclick="toast('Paytm Intent Triggered')">Paytm</span>
          <span class="upi-app-chip" onclick="toast('BHIM Intent Triggered')">BHIM</span>
        </div>
      </div>
    `;if(a.paymentMethod==="emi"){const t=a.checkoutEmiBank||"hdfc",i=O.find(s=>s.id===t)||O[0],n=t==="bajaj"?[3,6,9,12,18,24].map(s=>({months:s,isNoCost:!0,annualRate:0})):i.tenures;return`
      <div style="background:#fff;border:1px solid rgba(76,63,94,0.15);border-radius:var(--radius-sm);padding:18px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <div style="font-size:0.84rem;font-weight:700;color:var(--midnight-blue);">1. Select Bank / Issuer:</div>
          <span class="emi-badge-nocost">0% Processing Fee</span>
        </div>
        <div class="emi-bank-tabs-row" style="margin-bottom:14px;">
          ${O.map(s=>`
            <button type="button" class="emi-bank-tab-btn ${s.id===t?"active":""}" onclick="window.setCheckoutEmiBank('${s.id}')">
              <span>${s.logo}</span> <span>${s.name}</span>
            </button>
          `).join("")}
          <button type="button" class="emi-bank-tab-btn ${t==="bajaj"?"active":""}" onclick="window.setCheckoutEmiBank('bajaj')">
            <span>⚡</span> <span>Bajaj Finserv Insta Card</span>
          </button>
        </div>

        <div style="font-size:0.8rem;font-weight:700;color:var(--midnight-blue);margin-bottom:8px;">2. Select Tenure Plan:</div>
        <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;margin-bottom:16px;">
          ${n.map((s,r)=>{const l=s.isNoCost?Math.round(e/s.months):ae(e,s.annualRate,s.months),c=a.checkoutEmiTenure?a.checkoutEmiTenure===s.months:r===1;return`
              <label style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid ${c?"var(--champagne-gold)":"rgba(76,63,94,0.12)"};background:${c?"var(--champagne-gold-light)":"var(--bg-surface)"};border-radius:6px;cursor:pointer;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <input type="radio" name="coEmiTenure" value="${s.months}" ${c?"checked":""} onchange="window.setCheckoutEmiTenure(${s.months})">
                  <div>
                    <strong style="color:var(--midnight-blue);font-size:0.88rem;">${s.months} Months</strong>
                    ${s.isNoCost?'<span class="emi-badge-nocost" style="margin-left:6px;">No Cost EMI</span>':`<span style="font-size:0.72rem;color:var(--text-muted);margin-left:6px;">(${s.annualRate}% p.a.)</span>`}
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:800;color:var(--midnight-blue);font-size:0.95rem;">₹${l.toLocaleString("en-IN")}/mo</div>
                  <div style="font-size:0.72rem;color:var(--text-muted);">Total: ₹${(l*s.months).toLocaleString("en-IN")}</div>
                </div>
              </label>
            `}).join("")}
        </div>

        <div>
          <label class="form-label">${t==="bajaj"?"Bajaj Finserv 16-Digit Card / Registered Mobile":"Credit / Debit Card Number for EMI"}</label>
          <input class="form-input" placeholder="${t==="bajaj"?"4030 •••• •••• 9921":"4242 •••• •••• 4242"}" id="pgEmiCardNum" value="${t==="bajaj"?"4030 8901 2345 9921":"4242 8901 2345 6789"}">
        </div>
      </div>
    `}else{if(a.paymentMethod==="card")return`
      <div style="background:#fff;border:1px solid rgba(76,63,94,0.15);border-radius:var(--radius-sm);padding:18px;margin-bottom:16px;">
        <div style="margin-bottom:12px;">
          <label class="form-label">Card Number</label>
          <input class="form-input" placeholder="4242 •••• •••• 4242" id="pgCardNum" value="4242 8901 2345 6789">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div><label class="form-label">Expiry</label><input class="form-input" placeholder="MM / YY" value="12/28"></div>
          <div><label class="form-label">CVV</label><input class="form-input" type="password" maxlength="3" placeholder="•••" value="888"></div>
        </div>
      </div>
    `;if(a.paymentMethod==="netbanking")return`
      <div class="bank-grid">
        <button class="bank-option-btn active">HDFC Bank</button>
        <button class="bank-option-btn">ICICI Bank</button>
        <button class="bank-option-btn">SBI</button>
        <button class="bank-option-btn">Axis Bank</button>
        <button class="bank-option-btn">Kotak</button>
        <button class="bank-option-btn">Other Banks</button>
      </div>
    `;if(a.paymentMethod==="cod")return`
      <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.15);padding:16px;border-radius:var(--radius-sm);margin-bottom:16px;font-size:0.84rem;color:var(--text-secondary);">
        📦 <strong>Cash on Delivery:</strong> Free white-glove setup. Pay via Cash or UPI at your doorstep upon unboxing.
      </div>
    `}}window.setCheckoutEmiBank=function(e){var i;a.checkoutEmiBank=e;const t=O.find(n=>n.id===e);a.checkoutEmiTenure=e==="bajaj"?6:((i=t==null?void 0:t.tenures[1])==null?void 0:i.months)||6,H()};window.setCheckoutEmiTenure=function(e){a.checkoutEmiTenure=e,H()};window.updateCheckoutPincodeSpeed=function(e){const t=o("#checkoutPincodeSpeedBadge");if(!t)return;const i=Ke(e);i.valid?t.innerHTML=`
      <span style="font-size:0.78rem;color:#059669;font-weight:700;display:inline-flex;align-items:center;gap:5px;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:4px;">
        ⚡ ${i.speedTag} (${i.estimatedDateText}) · Fulfilled via ${i.partner}
      </span>
    `:t.innerHTML='<span style="font-size:0.75rem;color:var(--text-muted);">Enter valid 6-digit pincode for delivery timeline</span>'};function Yi(e){if(a.paymentMethod==="card"||a.paymentMethod==="emi"){bt(e);return}wt()}function bt(e){var i;const t=o("#bankOtpContent");t&&(t.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(76,63,94,0.1);">
      <div style="font-family:var(--font-serif);font-weight:700;color:var(--midnight-blue);">🔒 3D Secure 2.0 Auth</div>
      <div style="font-weight:700;color:var(--midnight-blue);">${S(e)}</div>
    </div>
    <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:14px;">
      A one-time password has been sent to your bank-registered mobile number.
    </p>
    <div style="margin-bottom:16px;">
      <label class="form-label">Enter Bank OTP</label>
      <input class="form-input" id="bankOtpInput" value="8942" style="font-size:1.2rem;letter-spacing:0.2em;text-align:center;">
    </div>
    <button class="btn btn-primary btn-block" onclick="
      document.getElementById('bankOtpModal').classList.remove('active');
      completeOrderProcess(${e});
    ">Authorize & Complete Payment →</button>
  `,(i=o("#bankOtpModal"))==null||i.classList.add("active"))}async function wt(e){var r,l,c,d,u,p,m,h,f,g,y,x;const t=((l=(r=o("#coName"))==null?void 0:r.value)==null?void 0:l.trim())||((c=a.user)==null?void 0:c.name)||"",i=((u=(d=o("#coPhone"))==null?void 0:d.value)==null?void 0:u.trim())||((p=a.user)==null?void 0:p.phone)||"",n=((h=(m=o("#coEmail"))==null?void 0:m.value)==null?void 0:h.trim())||((f=a.user)==null?void 0:f.email)||"",s=((y=(g=o("#coAddress"))==null?void 0:g.value)==null?void 0:y.trim())||"Bangalore";if(!t||!i){v("Please enter your name and phone number before payment.");return}try{const b=await k.loginOrRegister({name:t,email:n||void 0,phone:i,isFounding:!0});b!=null&&b.customer&&(a.user=b.customer);const w=await k.checkout({customerId:(x=a.user)==null?void 0:x.id,customerName:t,customerEmail:n,customerPhone:i,deliveryAddress:s,paymentMethod:a.paymentMethod,couponUsed:a.appliedCoupon,sessionId:F(),items:a.cart.map(P=>({productId:P.product.id,size:P.size,quantity:P.qty}))});if(!(w!=null&&w.success))throw new Error((w==null?void 0:w.error)||"Checkout failed");a.user={...a.user,lastOrder:w.data},await et(),A(a.user),a.cart=[],V(a.cart),q(),D(),a.checkoutStep="success",H(),v(`🎉 Order ${w.data.orderId} confirmed and saved securely.`)}catch(b){console.error("[Checkout]",b),v(`Checkout failed: ${b.message}`)}}function Ji(){var s,r,l,c,d,u,p,m,h,f,g,y,x;const e=o("#coName"),t=o("#coPhone"),i=((s=e==null?void 0:e.value)==null?void 0:s.trim())||((r=a.user)==null?void 0:r.name)||"",n=((l=t==null?void 0:t.value)==null?void 0:l.trim())||((c=a.user)==null?void 0:c.phone)||"";if(!i||!n||n.length<10){v("Please enter your full name and 10-digit mobile number");return}if(a.user){a.user.name=i,a.user.phone=n;const b=(u=(d=o("#coAddress"))==null?void 0:d.value)==null?void 0:u.trim(),w=(m=(p=o("#coCity"))==null?void 0:p.value)==null?void 0:m.trim(),P=(f=(h=o("#coState"))==null?void 0:h.value)==null?void 0:f.trim(),M=(y=(g=o("#coPin"))==null?void 0:g.value)==null?void 0:y.trim();b&&!((x=a.user.addresses)!=null&&x.length)&&(a.user.addresses=[{id:"a1",tag:"Home",name:i,phone:n,line:b,city:w||"Bangalore",state:P||"Karnataka",pincode:M||"560001",isDefault:!0}]),A(a.user)}a.checkoutStep="payment",H()}function Zi(){a.checkoutStep="details",H()}function xt(e){var r,l;const t=(l=e||((r=o("#coCouponInput"))==null?void 0:r.value))==null?void 0:l.trim().toUpperCase();if(!t)return;const i=Pe(),n=yt(),s=n.find(c=>c.code.toUpperCase()===t);if(s){if(s.minOrder&&i<s.minOrder){v(`Coupon ${t} requires minimum cart total of ₹${s.minOrder.toLocaleString("en-IN")}`);return}a.appliedCoupon=t,v(`✓ Coupon ${t} applied! (${s.discountPct}% OFF)`),H()}else v(`Invalid coupon code. Available: ${n.map(c=>c.code).slice(0,3).join(", ")}`)}window.applyDirectCoupon=function(e){xt(e)};window.openCorporateInquiry=function(){var e;(e=o("#corporateInquiryModal"))==null||e.classList.add("active")};window.closeCorporateInquiry=function(){var e;(e=o("#corporateInquiryModal"))==null||e.classList.remove("active")};window.openCorporateGiftingModal=window.openCorporateInquiry;window.closeCorporateGiftingModal=window.closeCorporateInquiry;window.routeToWhatsAppInquiry=function(){var r,l,c,d,u;const e=((l=(r=o("#corpInqCompany"))==null?void 0:r.value)==null?void 0:l.trim())||"My Business",t=((d=(c=o("#corpInqQty"))==null?void 0:c.value)==null?void 0:d.trim())||"Bulk",i=((u=o("#corpInqProduct"))==null?void 0:u.value)||"Mattresses / Sleep Suites",n=`Hi Subashini, I am reaching out regarding a Business & Bulk Enquiry for Velvet Hug.

Organization: `+e+`
Requirement: `+i+`
Estimated Qty: `+t+` units

Please share a custom proposal.`,s=encodeURIComponent(n);window.open("https://wa.me/919880011223?text="+s,"_blank"),window.closeCorporateInquiry()};window.routeToEmailInquiry=function(){var r,l,c,d,u;const e=((l=(r=o("#corpInqCompany"))==null?void 0:r.value)==null?void 0:l.trim())||"My Business",t=((d=(c=o("#corpInqQty"))==null?void 0:c.value)==null?void 0:d.trim())||"Bulk",i=((u=o("#corpInqProduct"))==null?void 0:u.value)||"Mattresses / Sleep Suites",n=encodeURIComponent("Business & Bulk Enquiry: "+e+" - Velvet Hug"),s=encodeURIComponent(`Hi Subashini,

I would like to discuss a business / bulk order for Velvet Hug.

Organization: `+e+`
Requirement: `+i+`
Estimated Quantity: `+t+` units

Please let me know your case-by-case corporate pricing.

Warm regards,
`+e);window.location.href="mailto:subashini@velvethug.in?subject="+n+"&body="+s,window.closeCorporateInquiry()};window.openSubmitStoryModal=function(){var e;(e=o("#submitStoryModal"))==null||e.classList.add("active")};window.closeSubmitStoryModal=function(){var e;(e=o("#submitStoryModal"))==null||e.classList.remove("active")};window.submitCustomerStoryForm=function(e){var d,u,p,m,h,f,g,y,x;e.preventDefault();const t=(u=(d=o("#storyCustName"))==null?void 0:d.value)==null?void 0:u.trim(),i=(m=(p=o("#storyCustCity"))==null?void 0:p.value)==null?void 0:m.trim(),n=(f=(h=o("#storyCustText"))==null?void 0:h.value)==null?void 0:f.trim(),s=((g=o("#storyCustMediaType"))==null?void 0:g.value)||"WhatsApp Video Reel (0:45)",r=(y=o("#storyCustDpdp"))==null?void 0:y.checked;if(!t||!n)return;let l={};try{const b=localStorage.getItem("vh_admin_store_v1");b&&(l=JSON.parse(b))}catch{}l.storySubmissions||(l.storySubmissions=[]);const c={id:`st_${Date.now()}`,author:t,city:i,partnerNum:((x=a.user)==null?void 0:x.foundingNumber)||Math.floor(100+Math.random()*400),mediaType:s,story:n,consentDpdp:!!r,consentDate:new Date().toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric"}),rewardStatus:"Cash Reward ₹5,000 Eligible",status:"Approved & Featured"};l.storySubmissions.unshift(c),localStorage.setItem("vh_admin_store_v1",JSON.stringify(l)),window.closeSubmitStoryModal(),v(`🎉 Thank you ${t}! Your sleep story has been submitted for ₹5,000 reward.`)};window.openOrderReviewModal=function(e,t){const i=o("#orderReviewModal");if(!i)return;const n=o("#orderReviewProductLabel");n&&(n.textContent=`Product: ${t}`);const s=o("#orderReviewOrderId");s&&(s.value=e);const r=o("#orderReviewProductName");r&&(r.value=t),i.classList.add("active")};window.closeOrderReviewModal=function(){var e;(e=o("#orderReviewModal"))==null||e.classList.remove("active")};window.setReviewRating=function(e){const t=o("#orderReviewRatingVal");t&&(t.value=e);const i=o("#starRatingGroup");i&&i.querySelectorAll("span").forEach((s,r)=>{s.textContent=r<e?"★":"☆"})};window.submitOrderReviewForm=function(e){var p,m,h,f,g,y,x,b,w,P;e.preventDefault();const t=(p=o("#orderReviewOrderId"))==null?void 0:p.value,i=((m=o("#orderReviewProductName"))==null?void 0:m.value)||"Velvet Hug Mattress",n=parseInt(((h=o("#orderReviewRatingVal"))==null?void 0:h.value)||"5",10),s=(g=(f=o("#orderReviewText"))==null?void 0:f.value)==null?void 0:g.trim(),r=!!((y=o("#orderReviewDoctor"))!=null&&y.checked);if(!s)return;let l={};try{const M=localStorage.getItem("vh_admin_store_v1");M&&(l=JSON.parse(M))}catch{}l.reviews||(l.reviews=[]);const c=((x=a.user)==null?void 0:x.name)||"Verified Sleeper",d=((P=(w=(b=a.user)==null?void 0:b.addresses)==null?void 0:w[0])==null?void 0:P.city)||"India",u={id:`rev_${Date.now()}`,product:i,author:r?`Dr. ${c}`:c,city:d,rating:n,date:"Just now",comment:s,doctorRec:r,status:"Approved"};if(l.reviews.unshift(u),localStorage.setItem("vh_admin_store_v1",JSON.stringify(l)),a.user&&a.user.orders){const M=a.user.orders.find(L=>L.id===t);M&&(M.hasReviewed=!0),A(a.user)}window.closeOrderReviewModal(),v("⭐ Verified review published! Thank you for sharing your rest experience."),De()};window.simulateDelivery=function(e){if(a.user&&a.user.orders){const t=a.user.orders.find(i=>i.id===e);if(t){t.step=4,t.status="Delivered",A(a.user);try{const i=localStorage.getItem("vh_admin_store_v1");if(i){const n=JSON.parse(i),s=(n.orders||[]).find(r=>r.id===e);s&&(s.status="Delivered & Reconciled",s.step=4,localStorage.setItem("vh_admin_store_v1",JSON.stringify(n)))}}catch{}v(`🚚 Order #${e} marked as Delivered!`),De()}}};window.state=a;window.toast=v;window.proceedToPayment=Ji;window.backToCheckoutDetails=Zi;window.applyCheckoutCoupon=xt;window.renderCheckout=H;window.openCheckout=Oe;window.closeCheckout=ye;window.setPaymentMethod=vt;window.executePaymentGateway=Yi;window.completeOrderProcess=wt;window.openBankOtpModal=bt;function Xi(){var e,t,i;(e=o("#quizBtn"))==null||e.addEventListener("click",St),(t=o("#quizModalClose"))==null||t.addEventListener("click",be),(i=o("#quizModalBackdrop"))==null||i.addEventListener("click",n=>{n.target===o("#quizModalBackdrop")&&be()})}function St(){var e;a.quizStep=0,a.quizAnswers={},kt(),(e=o("#quizModalBackdrop"))==null||e.classList.add("active")}function be(){var e;(e=o("#quizModalBackdrop"))==null||e.classList.remove("active")}function en(){try{const e=localStorage.getItem("vh_quiz_questions");if(e)return JSON.parse(e)}catch{}return he}function kt(){const e=o("#quizContent");if(!e)return;const t=en();if(a.quizStep>=t.length){Pt();return}const i=t[a.quizStep],n=Math.round(a.quizStep/t.length*100);e.innerHTML=`
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${n}%"></div></div>
    <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:4px;">Question ${a.quizStep+1} of ${t.length}</div>
    <h3 style="font-family:var(--font-serif);font-size:1.25rem;font-weight:700;color:var(--midnight-blue);margin-bottom:4px;">${i.question}</h3>
    <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:16px;">${i.sub||""}</p>
    <div class="quiz-options-list">
      ${(i.options||[]).map((s,r)=>`
        <div class="quiz-option-card" data-qid="${i.id||a.quizStep}" data-oid="${s.id||r}">
          <div style="font-size:0.95rem;color:var(--champagne-gold);margin-bottom:6px;font-weight:700;">✦</div>
          <div class="quiz-option-title">${s.label}</div>
          <div class="quiz-option-sub">${s.sub||""}</div>
        </div>
      `).join("")}
    </div>`,T(".quiz-option-card",e).forEach(s=>{s.addEventListener("click",()=>{a.quizAnswers[s.dataset.qid]=s.dataset.oid,a.quizStep++,kt()})})}function Pt(){var s,r;const e=o("#quizContent");if(!e)return;setTimeout(()=>{const l=o(".quiz-modal-card");l&&(l.scrollTop=0)},10);const t=a.quizAnswers,i=_t(t),n=(s=i[0])==null?void 0:s.product;k.submitQuizDiagnosis({sessionOrCustomerId:((r=a.user)==null?void 0:r.id)||F(),answers:t,recommendedProductId:n==null?void 0:n.id,recommendedFirmness:(n==null?void 0:n.firmness)||"Medium Firm"}).catch(l=>console.warn("[Quiz] Backend persistence failed:",l.message)),e.innerHTML=`
    <div style="text-align:center;margin-bottom:16px;">
      <div style="font-size:1.2rem;color:var(--champagne-gold);margin-bottom:4px;">✦ ✦ ✦</div>
      <h3 style="font-family:var(--font-serif);font-size:1.35rem;font-weight:700;color:var(--midnight-blue);margin-bottom:4px;">Your Posture Diagnosis &amp; Sleep Match</h3>
      <p style="font-size:0.84rem;color:var(--text-secondary);max-width:440px;margin:0 auto;">Scientifically calibrated across your age, spine condition, sleeper weight, and firmness preference.</p>
    </div>

    <div class="quiz-results-container">
      ${i.map((l,c)=>{const d=l.product;return`
          <div class="quiz-result-card ${c===0?"top-match-card":""}">
            ${c===0?`
              <div class="quiz-top-match-ribbon">
                <span>TOP MATCH • ${l.score}% CALIBRATED</span>
              </div>
            `:""}
            
            <div class="quiz-result-body">
              <img src="${R(d.image)}" alt="${d.name}" class="quiz-result-image"
                   onerror="this.src='./src/assets/images/mattress_hybrid_luxury.jpg'">
              
              <div class="quiz-result-info">
                <div class="quiz-result-title-row">
                  <span class="quiz-product-title">${d.name}</span>
                  <span class="badge ${Ae(d.badge)}" style="font-size:0.65rem;">${d.badgeLabel||d.collection}</span>
                </div>
                
                <div class="quiz-product-meta">
                  ${d.mattressType||"Mattress"} • <strong>${d.firmness}</strong> • ${d.collection} Tier
                </div>

                <div class="quiz-clinical-box">
                  <strong>Clinical Match:</strong> ${l.reason}
                </div>

                <div class="quiz-result-footer">
                  <div class="quiz-price-wrap">
                    <span class="quiz-price-current">${S(d.basePrice)}</span>
                    ${d.mrp?`<span class="quiz-price-mrp">${S(d.mrp)}</span>`:""}
                  </div>

                  <div class="quiz-actions-wrap">
                    <button type="button" class="btn btn-gold btn-xs quiz-action-btn" onclick="closeQuiz();openPDP(getProductById('${d.id}'))">
                      View Details →
                    </button>
                    <button type="button" class="btn btn-outline-dark btn-xs quiz-action-btn" onclick="closeQuiz();addToCart('${d.id}');openCart();">
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>

    <div style="display:flex;gap:10px;margin-top:16px;">
      <button type="button" class="btn btn-outline btn-sm" style="flex:1;" onclick="state.quizStep=0;state.quizAnswers={};renderQuizStep()">Retake Diagnostic</button>
      <button type="button" class="btn btn-primary btn-sm" style="flex:1;" onclick="closeQuiz();goToPage('mattresses')">Explore All Mattresses</button>
    </div>`}window.openQuiz=St;window.closeQuiz=be;window.renderQuizResults=Pt;let ze="hdfc",Ie="hdfc",Ct=28e3;function we(){const e=o("#standaloneEmiBankTabs");e&&(e.innerHTML=O.map(i=>`
      <button type="button" class="emi-bank-tab-btn ${i.id===ze?"active":""}" onclick="window.selectStandaloneEmiBank('${i.id}')">
        <span>${i.logo}</span> <span>${i.name}</span>
      </button>
    `).join(""));const t=o("#emiFintechList");t&&(t.innerHTML=Nt.map(i=>`
      <div class="emi-fintech-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div style="font-size:1.6rem;">${i.logo}</div>
          <span class="badge badge-founding" style="font-size:0.68rem;">${i.tag}</span>
        </div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:700;color:var(--midnight-blue);margin-bottom:4px;">${i.name}</div>
        <div style="font-size:0.75rem;color:var(--muted-violet);font-weight:600;margin-bottom:8px;">${i.type}</div>
        <p style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;margin-bottom:14px;">${i.desc}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(76,63,94,0.08);padding-top:10px;">
          <span style="font-size:0.74rem;color:var(--text-muted);">Tenures: ${i.tenures.join(", ")} Months</span>
          <button class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:4px 10px;" onclick="window.openEmiModal(28000, '${i.name} Plan')">Check Limit →</button>
        </div>
      </div>
    `).join("")),Mt()}function tn(e){ze=e,we()}function Mt(){const e=o("#standaloneEmiAmount"),t=o("#standaloneEmiResultsTable");if(!t)return;const i=parseFloat(e==null?void 0:e.value)||28e3,n=O.find(s=>s.id===ze)||O[0];t.innerHTML=`
    <div style="overflow-x:auto;">
      <table class="emi-table-wrap">
        <thead>
          <tr>
            <th>Tenure Plan</th>
            <th>Monthly Installment</th>
            <th>Bank Interest Rate</th>
            <th>Velvet Hug Upfront Subsidy</th>
            <th>Total Cost to You</th>
          </tr>
        </thead>
        <tbody>
          ${n.tenures.map(s=>{const r=s.isNoCost?Math.round(i/s.months):ae(i,s.annualRate,s.months),l=ae(i,s.annualRate,s.months)*s.months,c=s.isNoCost?l-i:0,d=r*s.months;return`
              <tr>
                <td>
                  <strong>${s.months} Months</strong>
                  ${s.isNoCost?'<span class="emi-badge-nocost" style="margin-left:6px;">No-Cost</span>':""}
                </td>
                <td style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);">
                  ₹${r.toLocaleString("en-IN")}<span style="font-size:0.72rem;font-weight:400;color:var(--text-muted);">/mo</span>
                </td>
                <td>${s.annualRate}% p.a.</td>
                <td style="color:var(--accent-emerald);font-weight:600;">${c>0?"− ₹"+Math.round(c).toLocaleString("en-IN"):"₹0"}</td>
                <td style="font-weight:700;">₹${d.toLocaleString("en-IN")}</td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `}function $t(e=28e3,t="Product Plan"){Ct=e;const i=o("#emiCalculatorModal"),n=o("#modalEmiProductTitle"),s=o("#modalEmiPrincipalDisplay");n&&(n.textContent=`Selected: ${t}`),s&&(s.textContent=S(e)),At(),Tt(),i&&i.classList.add("active")}function nn(){var e;(e=o("#emiCalculatorModal"))==null||e.classList.remove("active")}function At(){const e=o("#modalEmiBankTabs");e&&(e.innerHTML=O.map(t=>`
    <button type="button" class="emi-bank-tab-btn ${t.id===Ie?"active":""}" onclick="window.selectModalEmiBank('${t.id}')">
      <span>${t.logo}</span> <span>${t.name}</span>
    </button>
  `).join(""))}function on(e){Ie=e,At(),Tt()}function Tt(){const e=o("#modalEmiTenureTableBody");if(!e)return;const t=O.find(n=>n.id===Ie)||O[0],i=Ct;e.innerHTML=t.tenures.map(n=>{const s=n.isNoCost?Math.round(i/n.months):ae(i,n.annualRate,n.months),r=ae(i,n.annualRate,n.months)*n.months,l=n.isNoCost?r-i:0,c=s*n.months;return`
      <tr>
        <td>
          <strong>${n.months} Months</strong>
          ${n.isNoCost?'<span class="emi-badge-nocost" style="margin-left:6px;">No Cost</span>':""}
        </td>
        <td style="font-weight:700;color:var(--midnight-blue);">₹${s.toLocaleString("en-IN")}/mo</td>
        <td>${n.annualRate}% p.a.</td>
        <td style="color:var(--accent-emerald);font-weight:600;">${l>0?"− ₹"+Math.round(l).toLocaleString("en-IN"):"₹0"}</td>
        <td style="font-weight:700;">₹${c.toLocaleString("en-IN")}</td>
      </tr>
    `}).join("")}window.selectStandaloneEmiBank=tn;window.updateStandaloneEmiCalc=Mt;window.openEmiModal=$t;window.closeEmiModal=nn;window.selectModalEmiBank=on;function Ge(){console.log("✓ 100-Night Trial & Returns View Active")}function sn(){var t,i,n;const e=o("#returnOrderSelect");e&&((i=(t=a.user)==null?void 0:t.orders)!=null&&i.length)&&(e.innerHTML=`
      <option value="">Choose Order...</option>
      ${a.user.orders.map(s=>`<option value="${s.id}">Order #${s.id} (${(s.items||[]).map(r=>r.name||r).join(", ")})</option>`).join("")}
      <option value="custom">Other Order (Enter Order ID)</option>
    `),(n=o("#returnRequestModal"))==null||n.classList.add("active")}function Lt(){var e;(e=o("#returnRequestModal"))==null||e.classList.remove("active")}async function an(e){var d,u,p,m,h,f,g,y,x;e.preventDefault();const t=((d=o("#returnOrderSelect"))==null?void 0:d.value)||"VH-890214",i=((u=o("#returnRequestType"))==null?void 0:u.value)||"Firmness Exchange",n=((p=o("#returnReason"))==null?void 0:p.value)||"Spine requires firmer support",s=((m=o("#returnPickupAddress"))==null?void 0:m.value)||"Bangalore";let r;try{const b=await k.submitReturn({orderId:t,customerName:((h=a.user)==null?void 0:h.name)||"Sleep Partner",customerPhone:((f=a.user)==null?void 0:f.phone)||"",customerEmail:((g=a.user)==null?void 0:g.email)||"",requestType:i,reason:n,pickupAddress:s});if(!(b!=null&&b.success))throw new Error((b==null?void 0:b.error)||"Return request failed");r=b.rmaId}catch(b){v(`Return request failed: ${b.message}`);return}const l={rmaId:r,orderId:t,customerName:((y=a.user)==null?void 0:y.name)||"Sleep Partner",customerPhone:((x=a.user)==null?void 0:x.phone)||"",item:"Velvet Hug Dual-Comfort Queen (8-Inch)",type:i,reason:n,address:s,date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),requestDate:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),trialDaysUsed:42,amount:32999,status:"Pending Super Admin Approval",assignedPerson:null,evidencePhotos:[],defectDescription:"",step:1},c=Se();c.unshift(l),Je(c),a.user?(a.user.returnTickets=a.user.returnTickets||[],a.user.returnTickets.unshift(l)):a.user={name:"Sleep Partner",phone:"",email:"",avatar:"S",orders:[],returnTickets:[l],serviceTickets:[]},A(a.user),Lt(),v(`✓ Return RMA ${r} submitted! Sent to Super Admin for verification.`),E("account"),ht("orders")}window.openReturnRequestModal=sn;window.closeReturnRequestModal=Lt;window.submitReturnForm=an;window._evidenceTempPhotos={};window.handleEvidencePhotoSelect=function(e,t,i){const n=e.files;!n||!n.length||(window._evidenceTempPhotos[t]=window._evidenceTempPhotos[t]||[],Array.from(n).forEach(s=>{const r=new FileReader;r.onload=l=>{window._evidenceTempPhotos[t].push(l.target.result);const c=o(`#${i==="return"?"return":"service"}PhotoPreview_${t}`);c&&(c.innerHTML=window._evidenceTempPhotos[t].map(d=>`
          <img src="${d}" alt="Evidence Preview" style="width:70px;height:70px;object-fit:cover;border-radius:6px;border:1px solid var(--champagne-gold);">
        `).join(""))},r.readAsDataURL(s)}))};window.attachSampleInspectionPhoto=function(e,t){window._evidenceTempPhotos[e]=window._evidenceTempPhotos[e]||[];const i=`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"><rect width="320" height="200" fill="#141F3D"/><rect x="12" y="12" width="296" height="176" rx="8" fill="#1A274E" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6,4"/><text x="160" y="85" text-anchor="middle" fill="#D4AF37" font-family="sans-serif" font-size="28">📸</text><text x="160" y="125" text-anchor="middle" fill="#FDFBF7" font-family="sans-serif" font-size="13" font-weight="bold">Inspection Photo Evidence</text><text x="160" y="150" text-anchor="middle" fill="#C4BCD0" font-family="sans-serif" font-size="11">Ticket: ${e} · QA Certified</text></svg>`,n=`data:image/svg+xml;utf8,${encodeURIComponent(i)}`;window._evidenceTempPhotos[e].push(n);const s=o(`#${t==="return"?"return":"service"}PhotoPreview_${e}`);s&&(s.innerHTML=window._evidenceTempPhotos[e].map(r=>`
      <img src="${r}" alt="Evidence Preview" style="width:70px;height:70px;object-fit:cover;border-radius:6px;border:1px solid var(--champagne-gold);">
    `).join("")),v("✓ Sample mattress inspection photo attached!")};window.submitReturnEvidence=function(e){var r;const t=((r=o(`#returnDefectDesc_${e}`))==null?void 0:r.value.trim())||"Customer provided defect description and photos.",i=window._evidenceTempPhotos[e]||[];i.length;const n=Se(),s=n.find(l=>l.rmaId===e);if(s&&(s.evidencePhotos=i.length?i:s.evidencePhotos||[],s.defectDescription=t,s.status="Evidence Submitted — Inspection Scheduled",s.timeline=s.timeline||[],s.timeline.push({stage:"Customer Evidence Received",timestamp:new Date().toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}),note:`Defect Details: "${t}". Photos attached: ${i.length}.`}),Je(n)),a.user&&a.user.returnTickets){const l=a.user.returnTickets.find(c=>c.rmaId===e);l&&(l.evidencePhotos=i.length?i:l.evidencePhotos||[],l.defectDescription=t,l.status="Evidence Submitted — Inspection Scheduled",A(a.user))}v("✓ Defect photos & issue description submitted! Reflected in Returns RMA page."),I()};function Et(e){var s,r;const t=re(e),i=o("#doctorModalContent");if(!i||!t)return;const n=Re[Math.floor(Math.random()*Re.length)];i.innerHTML=`
    <button class="modal-close-icon" onclick="closeDoctorModal()">✕</button>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
      <div class="doctor-avatar-wrap" style="width:48px;height:48px;border-radius:50%;background:rgba(76,63,94,0.1);display:flex;align-items:center;justify-content:center;color:var(--midnight-blue);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
      </div>
      <div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:600;color:var(--midnight-blue);">${n.name}</div>
        <div style="font-size:0.82rem;color:var(--muted-violet);">${n.specialty}</div>
        <div style="color:#F59E0B;font-size:0.8rem;display:flex;align-items:center;gap:4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${n.rating}</span>
        </div>
      </div>
    </div>
    <div style="background:var(--bg-secondary);border-left:3px solid var(--champagne-gold);padding:16px;border-radius:0 var(--radius-sm) var(--radius-sm) 0;margin-bottom:16px;">
      <p style="font-family:var(--font-serif);font-style:italic;color:var(--text-secondary);font-size:0.95rem;">"${n.says}"</p>
    </div>
    <div style="font-size:0.84rem;color:var(--text-secondary);line-height:1.65;margin-bottom:16px;">
      The <strong>${t.name}</strong> is clinically validated for ${(s=t.tags)!=null&&s.includes("ortho")?"orthopaedic support and spinal alignment":"healthy sleep posture"}.
    </div>
    <button class="btn btn-primary btn-block" onclick="closeDoctorModal();openPDP(getProductById('${e}'))">View ${t.name}</button>`,(r=o("#doctorModalBackdrop"))==null||r.classList.add("active")}function rn(){var e;(e=o("#doctorModalBackdrop"))==null||e.classList.remove("active")}window.openDoctorModal=Et;window.closeDoctorModal=rn;function ln(){const e=o("#partnersHonorHall");e&&(e.innerHTML=Rt.map(t=>`
      <div class="partner-honor-chip">
        <div class="partner-honor-num">#${t.num}</div>
        <div class="partner-honor-name">${t.name}</div>
        <div class="partner-honor-city">${t.city}</div>
      </div>
    `).join(""))}let C={currentIndex:0,totalSlides:5,timer:null,intervalMs:5500,isPaused:!1,touchStartX:0,touchEndX:0};function cn(){const e=o("#heroCarousel"),t=o("#heroCarouselTrack"),i=o("#heroPrevBtn"),n=o("#heroNextBtn"),s=o("#heroCarouselDots"),r=o("#heroSlideCounter");if(!e||!t)return;const l=T(".hero-carousel-slide",t),c=s?T(".hero-dot-bar",s):[];C.totalSlides=l.length||5;function d(g){g<0?g=C.totalSlides-1:g>=C.totalSlides&&(g=0),C.currentIndex=g;const y=g*20;t.style.transform=`translateX(-${y}%)`,l.forEach((x,b)=>{x.classList.toggle("active",b===g)}),c.forEach((x,b)=>{const w=b===g;x.classList.toggle("active",w),x.setAttribute("aria-selected",w?"true":"false")}),r&&(r.textContent=`0${g+1} / 0${C.totalSlides}`),f()}function u(){d(C.currentIndex+1)}function p(){d(C.currentIndex-1)}function m(){h(),C.timer=setInterval(()=>{!C.isPaused&&a.currentPage==="home"&&u()},C.intervalMs)}function h(){C.timer&&(clearInterval(C.timer),C.timer=null)}function f(){h(),m()}i&&(i.onclick=g=>{g.stopPropagation(),p()}),n&&(n.onclick=g=>{g.stopPropagation(),u()}),c.forEach((g,y)=>{g.onclick=x=>{x.stopPropagation(),d(y)}}),e.addEventListener("mouseenter",()=>{C.isPaused=!0}),e.addEventListener("mouseleave",()=>{C.isPaused=!1}),e.addEventListener("touchstart",g=>{g.touches&&g.touches[0]&&(C.touchStartX=g.touches[0].screenX,C.isPaused=!0)},{passive:!0}),e.addEventListener("touchend",g=>{if(g.changedTouches&&g.changedTouches[0]){C.touchEndX=g.changedTouches[0].screenX,C.isPaused=!1;const y=C.touchEndX-C.touchStartX;y>45?p():y<-45&&u()}},{passive:!0}),window.addEventListener("keydown",g=>{a.currentPage==="home"&&(g.target.tagName==="INPUT"||g.target.tagName==="TEXTAREA"||g.target.tagName==="SELECT"||(g.key==="ArrowLeft"?p():g.key==="ArrowRight"&&u()))}),window._resumeHeroCarousel=()=>{C.isPaused=!1,m()},window._pauseHeroCarousel=()=>{C.isPaused=!0,h()},window.goToHeroSlide=d,d(0)}let fe=null;function dn(){const e=o("#promoAdModal");if(!e)return;const t=o("#promoAdCountdown");if(t){let s=function(){const r=n-Date.now();if(r<=0){t.textContent="Ending Soon";return}const l=Math.floor(r/864e5),c=Math.floor(r%864e5/36e5),d=Math.floor(r%36e5/6e4),u=Math.floor(r%6e4/1e3);t.textContent=`${String(l).padStart(2,"0")}d ${String(c).padStart(2,"0")}h ${String(d).padStart(2,"0")}m ${String(u).padStart(2,"0")}s`};var i=s;const n=Date.now()+2592e5+504e5+132e4;s(),fe&&clearInterval(fe),fe=setInterval(s,1e3)}e.addEventListener("click",n=>{n.target===e&&de()}),window.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&de()}),setTimeout(()=>{xe()},1200),T("#promoBanner, #promoTag, #promoCoupon, #promoAdOpenBtn, .hero-pill-badge, [data-open-promo]").forEach(n=>{n.style.cursor="pointer",n.addEventListener("click",s=>{s.target.id!=="promoCloseBt"&&xe()})})}function xe(){const e=o("#promoAdModal");e&&(e.style.display="flex",requestAnimationFrame(()=>{e.classList.add("show")}))}function de(e){e&&e.stopPropagation&&e.stopPropagation();const t=o("#promoAdModal");t&&(t.classList.remove("show"),setTimeout(()=>{t.classList.contains("show")||(t.style.display="none")},350))}function un(){de(),Ft("DIWALI30",!1),v("🎉 Voucher DIWALI30 applied! Enjoy 30% OFF."),goToPage("mattresses")}function Ft(e="DIWALI30",t=!0){navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(e).catch(()=>{});const i=o("#promoCopyBtnText");if(i){const n=i.textContent;i.textContent="Copied! ✓",setTimeout(()=>{i.textContent=n},2e3)}t&&v(`🏷️ Coupon code "${e}" copied to clipboard!`)}window.openPromoAd=xe;window.closePromoAd=de;window.claimPromoAd=un;window.copyPromoCode=Ft;function pn(){(localStorage.getItem("vh_consumer_theme")||"light")==="dark"?(document.documentElement.setAttribute("data-theme","dark"),document.body.classList.add("dark-theme")):(document.documentElement.removeAttribute("data-theme"),document.body.classList.remove("dark-theme")),Dt()}function Dt(){const e=o("#themeToggleIcon"),t=document.body.classList.contains("dark-theme")||document.documentElement.getAttribute("data-theme")==="dark";e&&(e.innerHTML=t?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>':'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>')}window.toggleConsumerTheme=function(){document.body.classList.contains("dark-theme")||document.documentElement.getAttribute("data-theme")==="dark"?(document.documentElement.removeAttribute("data-theme"),document.body.classList.remove("dark-theme"),localStorage.setItem("vh_consumer_theme","light"),v("Light Mode activated")):(document.documentElement.setAttribute("data-theme","dark"),document.body.classList.add("dark-theme"),localStorage.setItem("vh_consumer_theme","dark"),v("Dark Mode activated")),Dt()};async function Ue(){pn(),ii(),oi(),si(),ai(),ri(),ci(),Ki(),Xi(),Bi(),ni(),ln(),cn(),dn(),bi(),_("mattresses"),_("pillows"),_("cushions"),_("bolsters"),_("accessories"),ei();const e=it();history.replaceState({page:e},"",e==="home"?"/":`/${e}`),E(e,!1),Qt().then(()=>{D(),["mattresses","pillows","accessories"].includes(a.currentPage)&&_(a.currentPage)}).catch(t=>console.warn("[Backend Hydration]",t.message)),console.log("🛏️ Velvet Hug — Be Held, Every Night. Complete Application Ready.")}typeof window<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Ue()):Ue());window.simulateReferralTest=function(){if(!a.user){v("Please log in or place an order first to track referrals.");return}a.user.referralStats=a.user.referralStats||{count:0,earned:0,pending:0},a.user.referralStats.count++,a.user.referralStats.earned+=1e3,a.user.isAmbassador=!0,A(a.user),v("ðŸŽ‰ Referral tracked! +â‚¹1,000 earned! ðŸŒ¿ Rest Ambassador badge activated on your profile."),Fe(),I()};window.openPrivacyPolicyModal=function(){const e=document.getElementById("privacyModal");e&&(e.style.display="flex",e.classList.add("active"))};window.closePrivacyPolicyModal=function(){const e=document.getElementById("privacyModal");e&&(e.style.display="none",e.classList.remove("active"))};window.openTermsModal=function(){const e=document.getElementById("termsModal");e&&(e.style.display="flex",e.classList.add("active"))};window.closeTermsModal=function(){const e=document.getElementById("termsModal");e&&(e.style.display="none",e.classList.remove("active"))};
