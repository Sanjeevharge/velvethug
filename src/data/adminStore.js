// src/data/adminStore.js — Velvet Hug Admin Data & State Management
// Handles Dynamic RBAC Staff Users, 2FA, Audit Logs, DPDP Compliance, Dynamic Quiz, Order Lifecycle Timelines, and Admin Modules

import { SLEEP_QUIZ } from './products.js';

export const DEFAULT_SLEEP_QUIZ = SLEEP_QUIZ;

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

export const DEFAULT_RETURNS = [];

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
    if (raw) {
      state = JSON.parse(raw);
      // If legacy cached inventory has fewer than 20 SKUs or contains mock orders, force clean refresh
      if (state && (!state.inventory || Object.keys(state.inventory).length < 20)) {
        state.inventory = null;
      }
    }
  } catch (e) {}

  if (!state) {
    state = {
      orders: [],
      inventory: null,
      coupons: [
        { code: 'DIWALI30', discountPct: 30, maxDiscount: 10000, minOrder: 15000, expiry: '31 Oct 2026', usageCount: 0, status: 'Active' },
        { code: 'FOUNDING', discountPct: 15, maxDiscount: 15000, minOrder: 10000, expiry: 'Permanent (First 1,000)', usageCount: 0, status: 'Active' },
        { code: 'REST10', discountPct: 10, maxDiscount: 5000, minOrder: 5000, expiry: '31 Dec 2026', usageCount: 0, status: 'Active' }
      ],
      crmLeads: [],
      storySubmissions: [],
      reviews: [],
      referralPayouts: [],
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

  return state;
}

export function saveAdminState(data) {
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_STATE, JSON.stringify(data));
  } catch (e) {}
}
