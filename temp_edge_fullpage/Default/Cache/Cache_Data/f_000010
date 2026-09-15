// src/data/adminStore.js — Velvet Hug Admin Data & State Management
// Handles Dynamic RBAC Staff Users, 2FA, Audit Logs, DPDP Compliance, Dynamic Quiz, Order Lifecycle Timelines, and Admin Modules

export const DEFAULT_SLEEP_QUIZ = [
  {
    id: 'q1',
    question: 'What is your primary sleeping position?',
    options: [
      { text: 'Side Sleeper', trait: 'side', weight: 'medium_soft' },
      { text: 'Back Sleeper', trait: 'back', weight: 'medium_firm' },
      { text: 'Stomach Sleeper', trait: 'stomach', weight: 'firm' },
      { text: 'Combination / Toss & Turn', trait: 'combo', weight: 'adaptive' }
    ]
  },
  {
    id: 'q2',
    question: 'Do you currently experience any spinal or body stiffness?',
    options: [
      { text: 'Frequent Lower Back / Lumbar Pain', trait: 'ortho_lumbar', weight: 'ortho' },
      { text: 'Neck & Upper Shoulder Stiffness', trait: 'cervical', weight: 'cervical_pillow' },
      { text: 'Occasional Joint / Hip Pain', trait: 'pressure_relief', weight: 'latex' },
      { text: 'None — Just seeking deep restorative comfort', trait: 'wellness', weight: 'cloud' }
    ]
  },
  {
    id: 'q3',
    question: 'What is your preferred mattress firmness feel?',
    options: [
      { text: 'Plush & Hugging (Cloud-like feel)', trait: 'plush', weight: 'soft' },
      { text: 'Balanced Medium-Firm (Cradling with support)', trait: 'balanced', weight: 'medium_firm' },
      { text: 'Solid Orthopedic Firm (Max spinal alignment)', trait: 'firm', weight: 'firm' },
      { text: 'Dual-Comfort (Different feel on both sides)', trait: 'dual', weight: 'dual_comfort' }
    ]
  },
  {
    id: 'q4',
    question: 'Do you sleep hot or feel temperature buildup at night?',
    options: [
      { text: 'Yes, I run warm and need active cooling', trait: 'cooling_gel', weight: 'cool' },
      { text: 'I prefer organic breathable materials (Latex/Bamboo)', trait: 'organic_latex', weight: 'natural' },
      { text: 'No specific temperature issues', trait: 'standard', weight: 'neutral' }
    ]
  }
];

export const DEFAULT_ADMIN_USERS = [
  {
    id: 'usr_001',
    name: 'Subashini',
    email: 'subashini@velvethug.in',
    role: 'super_admin',
    roleLabel: 'Sole Administrator',
    passwordHash: 'VelvetAdmin@2026!',
    twoFactorSecret: '8942',
    avatar: 'S',
    department: 'Sole Administrator & Founder Operations',
    lastLogin: 'Today, 10:15 AM',
    phone: '+91 98800 11223'
  }
];

const STORAGE_KEY_ADMIN_USERS = 'vh_admin_staff_users';
const STORAGE_KEY_ADMIN_STATE = 'vh_admin_store_v1';
const STORAGE_KEY_ADMIN_AUDIT = 'vh_admin_audit_logs';
const STORAGE_KEY_QUIZ = 'vh_quiz_questions';

export function getAdminUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ADMIN_USERS);
    if (data) return JSON.parse(data);
  } catch (e) {}
  return DEFAULT_ADMIN_USERS;
}

export function saveAdminUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_USERS, JSON.stringify(users));
  } catch (e) {}
}

export const ROLE_PERMISSIONS = {
  super_admin: {
    label: 'Sole Administrator',
    desc: 'Full operational control over catalog, inventory, orders, returns, pricing, quiz, founding partners, and reviews.',
    modules: ['dashboard', 'customer_orders', 'completed_orders', 'returns', 'inventory', 'catalog', 'pricing', 'quiz', 'founding', 'referrals', 'stories', 'reviews', 'content', 'dpdp', 'audit']
  }
};

export const FIELD_SPECIALISTS = [
  { id: 'spec_1', name: 'Ramesh Kumar', phone: '+91 98440 98765', role: 'Logistics Specialist Lead', vehicle: 'Eco-Van #02 (Bangalore Central)' },
  { id: 'spec_2', name: 'Kavitha S.', phone: '+91 98112 34567', role: 'Sleep Assessment Specialist', vehicle: 'Inspection Van #04 (Bangalore South)' },
  { id: 'spec_3', name: 'Anand Rao', phone: '+91 98440 12345', role: 'Master Restorer & Upholsterer', vehicle: 'Mobile Renewal Lab #01 (Indiranagar Lab)' },
  { id: 'spec_4', name: 'Suresh Patil', phone: '+91 98800 44556', role: 'UV-C Hygiene & Core Specialist', vehicle: 'Sanitization Unit #03 (Whitefield)' },
  { id: 'spec_5', name: 'Vikram Anand', phone: '+91 97411 22334', role: 'Quality Control Lead', vehicle: 'Inspection Unit #05 (North BLR)' }
];

const STORAGE_KEY_RETURNS = 'vh_returns_data';
const STORAGE_KEY_SERVICES = 'vh_services_data';

export const DEFAULT_RETURNS = [
  {
    rmaId: 'VH-RET-78401',
    orderId: 'VH-981240',
    customerName: 'Ananya Deshmukh',
    customerPhone: '+91 98450 66112',
    customerEmail: 'ananya.d@gmail.com',
    item: 'Elara Cloud Orthopedic Mattress (King, 8-Inch)',
    type: '100-Night Trial Return',
    reason: 'Partner prefers slightly firmer lumbar tier',
    address: '42, Lavelle Road, Bangalore, Karnataka 560001',
    requestDate: '08 Sep 2026',
    trialDaysUsed: 42,
    amount: 48999,
    status: 'Pending Super Admin Approval',
    assignedPerson: null,
    evidencePhotos: [],
    defectDescription: '',
    timeline: [
      { stage: 'Return Requested', timestamp: '08 Sep 2026, 02:15 PM', note: 'Customer initiated 100-Night trial return' }
    ]
  },
  {
    rmaId: 'VH-RET-89215',
    orderId: 'VH-975102',
    customerName: 'Karthik Subramanian',
    customerPhone: '+91 97412 33889',
    customerEmail: 'karthik.sub@gmail.com',
    item: 'Velvet Hug Dual-Comfort Queen (8-Inch)',
    type: 'Firmness Exchange',
    reason: 'Exchange from Medium to Firm zone core',
    address: 'Villa 12, Palm Meadows, Whitefield, Bangalore 560066',
    requestDate: '05 Sep 2026',
    trialDaysUsed: 68,
    amount: 32999,
    status: 'Approved - Awaiting Photo & Defect Evidence',
    assignedPerson: { name: 'Kavitha S.', phone: '+91 98112 34567', role: 'Sleep Assessment Specialist', vehicle: 'Inspection Van #04' },
    evidencePhotos: [],
    defectDescription: 'Mattress profile requires firmer spinal support under upper lumbar tier.',
    timeline: [
      { stage: 'Return Requested', timestamp: '05 Sep 2026, 11:30 AM', note: 'Customer initiated firmness exchange' },
      { stage: 'Approved by Super Admin', timestamp: '06 Sep 2026, 09:45 AM', note: 'Super Admin Subashini approved RMA request' },
      { stage: 'Officer Assigned', timestamp: '06 Sep 2026, 10:15 AM', note: 'Assigned Kavitha S. (Inspection Van #04)' }
    ]
  }
];

export function getStoredReturns() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RETURNS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_RETURNS;
}

export function saveStoredReturns(returns) {
  try {
    localStorage.setItem(STORAGE_KEY_RETURNS, JSON.stringify(returns));
  } catch (e) {}
}

export function getAdminAuditLogs() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ADMIN_AUDIT);
    if (data) return JSON.parse(data);
  } catch (e) {}
  return [
    { id: 'aud_101', timestamp: 'Today, 08:00 AM', user: 'System', role: 'Security Engine', module: 'System', action: 'Audit Initialized', details: 'Fresh session started with DPDP compliance monitor active', ip: '127.0.0.1' }
  ];
}

export function logAuditAction(user, role, module, action, details) {
  const logs = getAdminAuditLogs();
  const newLog = {
    id: `aud_${Date.now()}`,
    timestamp: new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    user: user || 'Staff Admin',
    role: role || 'Admin',
    module,
    action,
    details,
    ip: '127.0.0.1 (Local)'
  };
  logs.unshift(newLog);
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_AUDIT, JSON.stringify(logs.slice(0, 200)));
  } catch (e) {}
  return newLog;
}

export function getStoredQuizQuestions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_QUIZ);
    if (data) return JSON.parse(data);
  } catch (e) {}
  return DEFAULT_SLEEP_QUIZ;
}

export function saveStoredQuizQuestions(questions) {
  try {
    localStorage.setItem(STORAGE_KEY_QUIZ, JSON.stringify(questions));
  } catch (e) {}
}

export function loadAdminState() {
  let state = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_STATE);
    if (raw) state = JSON.parse(raw);
  } catch (e) {}

  if (!state) {
    state = {
      orders: [
        {
          id: 'VH-981240',
          date: '31 Aug 2026',
          customer: 'Ananya Deshmukh',
          phone: '+91 98450 66112',
          email: 'ananya.d@gmail.com',
          address: '42, Lavelle Road, Bangalore, Karnataka 560001',
          items: 'Elara Cloud Orthopedic Mattress (King, 8-Inch) × 1',
          amount: 48999,
          paymentMode: 'UPI Pre-Paid',
          paymentStatus: 'Payment Verified',
          deliveryStatus: 'Crafted in Lab',
          trackingId: 'VH-TRK-88129',
          timeline: [
            { stage: 'Order Placed', timestamp: '31 Aug 2026, 10:14 AM', note: 'Order confirmed and verified via UPI' },
            { stage: 'Crafted in Lab', timestamp: '31 Aug 2026, 04:30 PM', note: 'Five-layer adaptive spinal assembly and QA testing passed' }
          ]
        },
        {
          id: 'VH-975102',
          date: '30 Aug 2026',
          customer: 'Karthik Subramanian',
          phone: '+91 97412 33889',
          email: 'karthik.sub@gmail.com',
          address: 'Villa 12, Palm Meadows, Whitefield, Bangalore 560066',
          items: 'Luminary 100% Natural Latex Mattress (Queen, 10-Inch) × 1',
          amount: 62500,
          paymentMode: 'COD Doorstep Cash',
          paymentStatus: 'Pending Doorstep Verification',
          deliveryStatus: 'Dispatched',
          trackingId: 'VH-TRK-77210',
          timeline: [
            { stage: 'Order Placed', timestamp: '30 Aug 2026, 11:20 AM', note: 'COD order confirmed with 2FA OTP verification' },
            { stage: 'Crafted in Lab', timestamp: '30 Aug 2026, 05:45 PM', note: 'Organic Dunlop latex core vulcanization certified' },
            { stage: 'Dispatched', timestamp: '31 Aug 2026, 08:30 AM', note: 'Handed over to White-Glove Logistics for doorstep delivery' }
          ]
        },
        {
          id: 'VH-942801',
          date: '28 Aug 2026',
          customer: 'Dr. Radhika Sen',
          phone: '+91 99001 88445',
          email: 'radhika.sen@fortis.in',
          address: 'Penthouse 5B, Prestige Kingfisher Towers, UB City, Bangalore 560001',
          items: 'Serenity Ortho Dual Comfort Mattress (King, 10-Inch) × 1 + Cloud Cradle Pillows × 2',
          amount: 54999,
          paymentMode: 'Net Banking Pre-Paid',
          paymentStatus: 'Reconciled & Cash Settled',
          deliveryStatus: 'Delivered',
          trackingId: 'VH-TRK-66109',
          timeline: [
            { stage: 'Order Placed', timestamp: '28 Aug 2026, 09:15 AM', note: 'Order registered and pre-paid' },
            { stage: 'Crafted in Lab', timestamp: '28 Aug 2026, 03:00 PM', note: 'Dual-comfort firmness testing completed' },
            { stage: 'Dispatched', timestamp: '29 Aug 2026, 09:00 AM', note: 'Dispatched via White-Glove Bangalore fleet' },
            { stage: 'Delivered', timestamp: '29 Aug 2026, 04:30 PM', note: 'Delivered, unboxed, and positioned in master bedroom. 100-night trial active.' }
          ]
        },
        {
          id: 'VH-931084',
          date: '27 Aug 2026',
          customer: 'Gautam Singhania',
          phone: '+91 98800 44556',
          email: 'gautam@singhania.in',
          address: 'Bungalow 7, Sadashivanagar, Bangalore 560080',
          items: 'Aura Zero-Motion Memory Mattress (King, 8-Inch) × 1',
          amount: 44999,
          paymentMode: 'COD Doorstep Cash',
          paymentStatus: 'Reconciled & Cash Settled',
          deliveryStatus: 'Delivered',
          trackingId: 'VH-TRK-55092',
          timeline: [
            { stage: 'Order Placed', timestamp: '27 Aug 2026, 02:10 PM', note: 'Order placed' },
            { stage: 'Crafted in Lab', timestamp: '27 Aug 2026, 07:00 PM', note: 'Zero-motion wave dissipation inspection certified' },
            { stage: 'Dispatched', timestamp: '28 Aug 2026, 10:00 AM', note: 'Dispatched' },
            { stage: 'Delivered', timestamp: '28 Aug 2026, 05:15 PM', note: 'Delivered and cash collected & reconciled by delivery executive.' }
          ]
        }
      ],
      inventory: null,
      coupons: [
        { code: 'DIWALI30', discountPct: 30, maxDiscount: 10000, minOrder: 15000, expiry: '31 Oct 2026', usageCount: 0, status: 'Active' },
        { code: 'FOUNDING', discountPct: 15, maxDiscount: 15000, minOrder: 10000, expiry: 'Permanent (First 1,000)', usageCount: 0, status: 'Active' },
        { code: 'REST10', discountPct: 10, maxDiscount: 5000, minOrder: 5000, expiry: '31 Dec 2026', usageCount: 0, status: 'Active' }
      ],
      crmLeads: [
        { id: 'crm_101', company: 'Wipro Technologies', contactName: 'Rajesh Nair (HR Director)', phone: '+91 98450 11990', email: 'rajesh.nair@wipro.com', requirement: 'Diwali Executive Wellness Sleep Gift Sets (Pillows + Aromatherapy)', quantity: 350, dealValue: '₹14,00,000', status: 'Quoted', rep: 'Rohan Deshmukh', notes: 'Sample sent to Sarjapur campus on 26 Aug' },
        { id: 'crm_102', company: 'Taj Gateway Resort Coorg', contactName: 'Meera Sen (Procurement GM)', phone: '+91 94480 77112', email: 'meera.sen@ihcltata.com', requirement: 'Signature 10" Natural Latex Luxury Mattresses for 45 Cottages', quantity: 90, dealValue: '₹38,25,000', status: 'Negotiation', rep: 'Rohan Deshmukh', notes: 'Trial bed installed in Presidential Villa' },
        { id: 'crm_103', company: 'Zerodha Broking', contactName: 'Deepak V (Operations Lead)', phone: '+91 99881 22345', email: 'deepak.v@zerodha.com', requirement: 'Ergonomic Lumbar Cushions & Bolsters for Employee Home Desks', quantity: 500, dealValue: '₹8,50,000', status: 'Won / Invoicing', rep: 'Subashini', notes: 'Advance 50% received via NEFT' }
      ],
      storySubmissions: [
        {
          id: 'st_001',
          author: 'Sunil & Rashmi Hegde',
          city: 'Mysore',
          partnerNum: 142,
          mediaType: 'Video Reel (0:45)',
          story: 'After my slip-disc surgery, finding a mattress that held my lumbar spine without stiffness felt impossible. Velvet Hug changed our mornings.',
          consentDpdp: true,
          consentDate: '28 Aug 2026, 09:30 AM',
          rewardStatus: 'Cash Reward ₹5,000 Paid',
          status: 'Approved & Featured'
        }
      ],
      reviews: [
        { id: 'rev_01', product: 'Elara Cloud Mattress', author: 'Vikrant S.', rating: 5, date: 'Today', comment: 'The unboxing experience was serene. Zero chemical smell. Slept 8.5 uninterrupted hours on night 1.', doctorRec: true, status: 'Approved' }
      ],
      grandmaPosts: [
        {
          id: 'gp_01',
          title: 'Why Turning the Pillow to the Cool Side Calms Your Vagus Nerve',
          category: 'Ancient Wisdom + Sleep Science',
          date: '28 Aug 2026',
          readTime: '4 min read',
          excerpt: 'Grandma called it "cooling the heated thoughts." Modern neurobiology calls it cranial thermoregulation.',
          status: 'Published'
        }
      ]
    };
  }

  // Ensure inventory is ALWAYS complete and self-healing across all categories
  if (!state.inventory || Object.keys(state.inventory).length === 0) {
    state.inventory = {
      'vh-m001': { name: 'Elara Cloud Orthopedic Mattress', category: 'Mattresses', stock: 45, reserved: 2, location: 'Hub Bangalore Central', reorderLevel: 15, unitCost: '₹14,200' },
      'vh-m002': { name: 'Serenity Ortho Dual Comfort Mattress', category: 'Mattresses', stock: 32, reserved: 1, location: 'Hub Chennai South', reorderLevel: 10, unitCost: '₹18,500' },
      'vh-m003': { name: 'Aura Zero-Motion Memory Mattress', category: 'Mattresses', stock: 28, reserved: 0, location: 'Hub Mumbai West', reorderLevel: 8, unitCost: '₹22,000' },
      'vh-m004': { name: 'Luminary 100% Natural Latex Mattress', category: 'Mattresses', stock: 18, reserved: 0, location: 'Hub Bangalore Central', reorderLevel: 5, unitCost: '₹31,000' },
      'vh-m005': { name: 'Embrace Hybrid Luxury Pocket Spring', category: 'Mattresses', stock: 22, reserved: 1, location: 'Hub Delhi NCR', reorderLevel: 6, unitCost: '₹26,400' },
      'vh-p001': { name: 'Cloud Cradle Ergonomic Memory Pillow', category: 'Pillows', stock: 140, reserved: 5, location: 'Central Logistics Hub', reorderLevel: 30, unitCost: '₹1,250' },
      'vh-p002': { name: 'Snooze Silk 22-Momme Mulberry Pillow', category: 'Pillows', stock: 85, reserved: 3, location: 'Central Logistics Hub', reorderLevel: 25, unitCost: '₹1,850' },
      'vh-p003': { name: 'Cervical Spine Alignment Cradle Pillow', category: 'Pillows', stock: 95, reserved: 4, location: 'Central Logistics Hub', reorderLevel: 20, unitCost: '₹1,450' },
      'vh-c001': { name: 'ErgoRest Orthopedic Lumbar Cushion', category: 'Cushions', stock: 75, reserved: 2, location: 'Hub Bangalore Central', reorderLevel: 20, unitCost: '₹950' },
      'vh-c002': { name: 'Velvet Plush Seated Floor Cushion', category: 'Cushions', stock: 60, reserved: 0, location: 'Hub Mumbai West', reorderLevel: 15, unitCost: '₹1,150' },
      'vh-b001': { name: 'Full-Body Contoured Hug Bolster', category: 'Bolsters', stock: 55, reserved: 3, location: 'Hub Bangalore Central', reorderLevel: 15, unitCost: '₹1,450' },
      'vh-b002': { name: 'Pregnancy & Hip Alignment Bolster', category: 'Bolsters', stock: 40, reserved: 1, location: 'Hub Chennai South', reorderLevel: 10, unitCost: '₹1,650' },
      'vh-a001': { name: 'Bamboo-Cotton Waterproof Mattress Protector', category: 'Accessories', stock: 180, reserved: 8, location: 'Central Logistics Hub', reorderLevel: 40, unitCost: '₹750' },
      'vh-a002': { name: 'Pure 22-Momme Mulberry Silk Eye Mask', category: 'Accessories', stock: 120, reserved: 6, location: 'Central Logistics Hub', reorderLevel: 25, unitCost: '₹450' },
      'vh-a003': { name: 'Lavender & Mysore Sandalwood Sleep Mist', category: 'Accessories', stock: 90, reserved: 2, location: 'Central Logistics Hub', reorderLevel: 20, unitCost: '₹380' },
      'vh-a004': { name: 'Velvet Hug Executive Wellness Gift Suite', category: 'Accessories', stock: 35, reserved: 1, location: 'Hub Bangalore Central', reorderLevel: 10, unitCost: '₹3,200' }
    };
    saveAdminState(state);
  }

  return state;
}

export function saveAdminState(data) {
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_STATE, JSON.stringify(data));
  } catch (e) {}
}
