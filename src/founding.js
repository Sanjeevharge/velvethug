import { FOUNDING_PARTNER_LIMIT, INITIAL_PARTNER_COUNT } from './data/products.js';

const COUNT_KEY = 'vh_founding_count';
const USER_KEY = 'vh_user';
const CHANNEL = 'vh-founding';

function clampCount(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num < 0) return INITIAL_PARTNER_COUNT;
  return Math.min(Math.floor(num), FOUNDING_PARTNER_LIMIT);
}

export function getFoundingCount() {
  try {
    const stored = localStorage.getItem(COUNT_KEY);
    if (stored == null) return INITIAL_PARTNER_COUNT;
    return clampCount(stored);
  } catch {
    return INITIAL_PARTNER_COUNT;
  }
}

export function setFoundingCount(n) {
  const count = clampCount(n);
  try { localStorage.setItem(COUNT_KEY, String(count)); } catch {}
  try {
    new BroadcastChannel(CHANNEL).postMessage({ type: 'count', count });
  } catch {}
  window.dispatchEvent(new CustomEvent('vh:founding', { detail: { count } }));
  return count;
}

export function isFoundingOpen(count = getFoundingCount()) {
  return count < FOUNDING_PARTNER_LIMIT;
}

export function claimFoundingSpot() {
  const current = getFoundingCount();
  if (current >= FOUNDING_PARTNER_LIMIT) return { count: current, partnerNum: null };
  const partnerNum = current + 1;
  setFoundingCount(partnerNum);
  return { count: partnerNum, partnerNum };
}

export function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  try { localStorage.setItem(USER_KEY, JSON.stringify(user)); } catch {}
  return user;
}

export function demoUser() {
  return saveUser({
    name: 'Kavitha N.',
    email: 'kavitha@example.com',
    city: 'Ahmedabad',
    foundingNum: 212,
    isSleepPartner: true,
    isAmbassador: true,
    priceLock: { currentPurchase: 12, nextPurchase: 8 },
    firstAccess: true,
    communityInvited: true,
    storyConsent: true,
    referrals: {
      code: 'HUG-KAVITHA',
      count: 3,
      completed: [
        { name: 'Rohan M.', city: 'Surat', status: 'completed', reward: 1500, date: '12 Aug 2026' },
        { name: 'Neha S.', city: 'Pune', status: 'completed', reward: 1500, date: '21 Aug 2026' }
      ],
      pending: [
        { name: 'Aisha K.', city: 'Mumbai', status: 'pending', reward: 1500, date: '28 Aug 2026' }
      ],
      earned: 3000,
      pendingAmount: 1500
    }
  });
}

export function grantAmbassadorOnReferralComplete(user, referredName = 'New Sleep Partner') {
  if (!user) return user;
  const referrals = user.referrals || {
    code: 'HUG-PARTNER', count: 0, completed: [], pending: [], earned: 0, pendingAmount: 0
  };
  referrals.completed.push({
    name: referredName,
    city: 'Online',
    status: 'completed',
    reward: 1500,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  });
  referrals.count = referrals.completed.length;
  referrals.earned = referrals.completed.reduce((s, r) => s + r.reward, 0);
  user.referrals = referrals;
  user.isAmbassador = true;
  user.isSleepPartner = true;
  return saveUser(user);
}

export function subscribeFoundingCount(handler) {
  handler(getFoundingCount());
  const onCustom = (e) => handler(e.detail.count);
  window.addEventListener('vh:founding', onCustom);
  let channel;
  try {
    channel = new BroadcastChannel(CHANNEL);
    channel.onmessage = (e) => {
      if (e.data?.type === 'count') handler(clampCount(e.data.count));
    };
  } catch {}
  const onStorage = (e) => {
    if (e.key === COUNT_KEY) handler(getFoundingCount());
  };
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener('vh:founding', onCustom);
    window.removeEventListener('storage', onStorage);
    try { channel?.close(); } catch {}
  };
}

export { FOUNDING_PARTNER_LIMIT };
