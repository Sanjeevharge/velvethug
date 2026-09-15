# 👑 Velvet Hug (`velvethug.in`) — Ultra-Luxury Ergonomic Mattress E-Commerce Platform

> **Benchmark**: [Duroflex (duroflexworld.com)](https://www.duroflexworld.com/) & [Fabo Interiors (fabointeriors.com)](https://fabointeriors.com)  
> **Brand**: Velvet Hug (`velvethug.in`)  
> **Hosting & E-Commerce Engine**: Shopify Online Store 2.0 (OS 2.0) Architecture  
> **Market Target**: India-First (Festival Season Ready · Razorpay No-Cost EMI · 19,000+ PIN Code Delivery · WhatsApp Omnichannel)

---

## 🌟 1. Recommended Production Tech Stack

| Layer | Recommended Technology | Rationale & Capabilities |
|---|---|---|
| **Core Platform & Hosting** | **Shopify Advanced / Plus** on custom domain `velvethug.in` | Handles high-traffic Indian festival flash sales (Diwali/New Year) with 99.99% uptime, PCI-DSS Level 1 compliance, automatic CDN scaling, and zero DevOps overhead. |
| **Theme Architecture** | **Shopify Online Store 2.0 (OS 2.0)** (`/shopify-theme`) | Modular Liquid sections, JSON templates, Web Components, and native schema customizer blocks. |
| **Interactive 3D Visualizer** | **Three.js / WebGL / `<model-viewer>`** | Allows customers to rotate 360° and explode mattress anatomy (Quilt, Natural Pin-Core Latex, Cooling Memory Foam, 7-Zone Pocket Coils, Ortho HR Foam) before checkout. |
| **Data Model & Filtering** | **Shopify Metafields + Metaobjects** + **Search & Discovery App** | 6 independent parallel filter axes (Size, Material, Firmness, Tier, Age Group, Packaging) with fast AND-logic filtering. |
| **Payment Gateway & EMI** | **Razorpay + Shopify Payments (India)** | Instant UPI (GPay, PhonePe, Paytm), NetBanking, Credit/Debit Cards, Cash on Delivery (COD), and **No-Cost EMI** across top banks (HDFC, ICICI, SBI, Axis, Bajaj Finserv, Axio). |
| **WhatsApp Omnichannel API** | **Interakt / Gupshup / Official WhatsApp Cloud API** | Direct 1-tap "Ask an Orthopedic Doctor" spine consultation, customer video/story submission for ₹1,500 cash rewards, and automated order tracking. |
| **Reviews & Social Proof** | **Judge.me / Loox** | Photo/video verified customer reviews with schema rich snippets for Google SEO ranking. |
| **Referrals & Loyalty** | **Smile.io / ReferralCandy** | Powering the 1,000 Founding Sleep Partner Circle and 3-Tier Rest Ambassadors program (Bronze, Silver, Gold). |

---

## 📐 2. Architecture & File Structure

```
velvethug/
├── index.html                           # Complete luxury interactive web app entrypoint
├── package.json                         # Dependencies & project scripts
├── vite.config.js                       # Vite server configuration
├── README.md                            # Complete technical documentation
├── public/
│   ├── favicon.svg
│   └── images/                          # High-res luxury generated assets
│       ├── hero-mattress.jpg            # Luxury master bedroom hero
│       ├── festival-banner.jpg          # Indian Diwali festive campaign banner
│       ├── crosssection-layers.jpg      # 3D anatomical cutaway illustration
│       ├── corporate-gift.jpg           # Velvet executive sleep hamper
│       ├── pillow-luxury.jpg            # Cervical contour ortho pillow
│       └── cushion-bolster.jpg          # Jewel-toned cushions & bolsters
├── src/
│   ├── data/
│   │   ├── products.js                  # Complete catalog & 6-axis metafields database
│   │   └── quizQuestions.js             # 30-second sleep companion diagnostic engine
│   ├── components/
│   │   └── Visualizer3D.js              # Three.js 3D WebGL exploded layer engine
│   ├── styles/
│   │   ├── main.css                     # Design system (midnight velvet tokens & glassmorphism)
│   │   ├── components.css               # Components (header, filters, cards, quiz, cart, compare)
│   │   └── visualizer.css               # 3D viewport and HUD overlay styling
│   └── main.js                          # Core application logic & state store
└── shopify-theme/                       # Full Shopify OS 2.0 Theme Package
    ├── shopify.theme.toml               # Shopify CLI configuration
    ├── config/
    │   ├── settings_schema.json         # Theme customizer options
    │   └── settings_data.json           # Default theme configuration
    ├── layout/
    │   └── theme.liquid                 # Master layout template
    ├── templates/
    │   ├── index.json                   # Homepage JSON schema
    │   ├── collection.json              # Collection page with 6-axis filters
    │   ├── product.json                 # Product template with 3D block & EMI
    │   ├── cart.json                    # Cart page template
    │   ├── page.quiz.json               # 30-sec quiz landing page
    │   ├── page.corporate.json          # Corporate gifting & B2B RFQ
    │   └── page.care-repair.json        # Care & repair circular sleep portal
    ├── sections/
    │   ├── promo-banner.liquid          # Timed festival banner with countdown
    │   ├── header.liquid                # Header with mega menu & search
    │   ├── hero-slider.liquid           # Hero section
    │   ├── categories-rail.liquid       # Core & Accessories category rail
    │   ├── mattress-filters.liquid      # 6-Axis filter grid
    │   ├── product-3d-viewer.liquid     # Embedded 3D mattress viewer
    │   ├── doctor-consultation.liquid   # Doctor endorsement & WhatsApp CTA
    │   ├── founding-partners.liquid     # 1,000 Founding partner live counter
    │   ├── customer-stories.liquid      # WhatsApp video reviews rail
    │   └── footer.liquid                # Duroflex-benchmarked footer
    ├── snippets/
    │   ├── product-card.liquid          # Reusable product card with 3D badge
    │   ├── emi-calculator.liquid        # No-cost EMI calculator snippet
    │   └── whatsapp-widget.liquid       # Floating WhatsApp concierge
    ├── assets/                          # Styles, scripts, and imagery
    └── schema/
        └── metafields_and_metaobjects.json # Ready-to-import Shopify schema
```

---

## 🚀 3. Features Implemented in Detail

### 1. Timed Festival & Seasonal Promo Banners
- **Real-Time Countdown Timer**: Dynamically counts down days, hours, minutes, and seconds to the festival deadline.
- **Dynamic Coupon Copier**: One-click copying of coupon codes (`FESTIVE40`, `MONSOON15`) with toast notifications.
- **Scheduled Auto-Switching**: Backed by Shopify Metaobjects so marketing teams can schedule Diwali, New Year, and Monsoon sales without code changes.

### 2. 6-Axis Combinable Mattress Filter Engine
- **Parallel AND-Logic Filtering** across:
  1. **By Size**: Single, Double, Queen, King, Twin + **"Need a custom size?"** dimension calculator.
  2. **By Material**: 100% Natural Latex, Memory Foam, Pocket Spring, Orthopedic, Coir, Aerocell Foam, Luxury Hybrid, High-Density Rebonded.
  3. **By Firmness**: Plush Soft (3-4/10), Medium Firm (6-7/10), Ortho Firm (8-9/10).
  4. **By Price / Product Tier**: Essential (6"), Signature (8"), Reserve (10"), Reserve+ (12").
  5. **By Age Group**: Kids (0-12), Teen (13-19), Young Adult (20-30), Middle-Aged (31-45), Mature Adult (46-60), Senior (60+).
  6. **By Packaging**: Bed-in-a-Box (Vacuum Compressed), Traditional Flat-Packed, Rollable Travel, Bi-Fold/Tri-Fold.

### 3. Interactive 3D WebGL Mattress Visualizer
- **Exploded View Mode**: Moves layers vertically in 3D space to reveal internal high-density foam, carbon steel pocket springs, cryo-gel, and organic latex.
- **Assembled View Mode**: Reconstructs the finished luxury mattress.
- **360° Orbit Rotation**: Full touch/mouse drag rotation with automatic rotation toggle.
- **Direct Add to Bag**: Adds the customized 3D inspected mattress straight to cart.

### 4. Side-by-Side Mattress Compare Matrix
- Select up to **4 mattresses** simultaneously.
- Floating persistent comparison pill showing count.
- Detailed matrix comparing Profile Height, Core Materials, Firmness Score, Motion Isolation Rating, Spine Alignment Certification, 100-Night Trial, 10-Yr Warranty, and No-Cost EMI.

### 5. "Find Your Sleep Companion in 30 Seconds" Quiz
- 4-step diagnostic wizard assessing Sleeping Position, Pain Points / Lumbar issues, Firmness Preference, and Sleeper Demographics.
- Intelligent weighted scoring engine matching the sleeper to the ideal tier with clinical reasoning from Dr. Alok Verma.

### 6. "Ask a Doctor on WhatsApp" & Clinical Hub
- Featured consulting orthopedic surgeon (**Dr. Alok Verma, MS Ortho**, Max Healthcare).
- Clinical reasoning for spinal decompression.
- One-tap WhatsApp trigger pre-populating mattress specifications for customized medical advice.

### 7. Founding Sleep Partner Live Counter & Rest Ambassadors
- Real-time animated counter tracking the first 1,000 patrons with lifetime 20% privilege and brass plaques.
- 3-tier Rest Ambassador referral program (Bronze, Silver, Gold) with WhatsApp shareable links.

### 8. Corporate Gifting & Institutional B2B Orders
- **The Flagship Gift**: Break-room rest mattresses for modern tech offices.
- **The Personal Gift**: 7-piece executive luxury sleep collection (Nightly Hug, Pocket Hug, Pause Pad, etc.).
- **Institutional Bulk Orders**: RFQ calculator for hotels, hostels, and builders with tiered volume discounts.

### 9. India-First Checkout, No-Cost EMI & PIN Code Checker
- Slide-out cart drawer with real-time Indian PIN code delivery checker (19,000+ PINs).
- No-Cost EMI breakdown starting from ₹1,083/month.
- Integrated COD, UPI (GPay/PhonePe/Paytm), and Credit Card support.

---

## 🛠️ 4. Shopify Deployment Guide (`velvethug.in`)

### Step 1: Install Shopify CLI & Authenticate
```bash
npm install -g @shopify/cli @shopify/theme
shopify auth login --store velvethug.myshopify.com
```

### Step 2: Push Theme Package
```bash
cd shopify-theme
shopify theme push --store velvethug.myshopify.com
```

### Step 3: Import Metafields & Metaobjects
In Shopify Admin (`Settings > Custom Data`), import or configure the definitions from [`shopify-theme/schema/metafields_and_metaobjects.json`](file:///c:/Users/Sanjeev/Desktop/velvethug/shopify-theme/schema/metafields_and_metaobjects.json).

### Step 4: Configure Razorpay & Payments
1. In Shopify Admin, navigate to **Settings > Payments**.
2. Enable **Razorpay** and enter your live Key ID and Key Secret.
3. Enable **No-Cost EMI** in Razorpay Dashboard for HDFC, ICICI, SBI, and Bajaj Finserv.
4. Enable **Cash on Delivery (COD)** with OTP verification.

### Step 5: Connect Custom Domain
In Shopify Admin (**Settings > Domains**), add and verify `velvethug.in`.
