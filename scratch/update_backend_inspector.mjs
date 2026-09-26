import fs from 'fs';

let html = fs.readFileSync('backend-inspector.html', 'utf8');

// Replace all unauthenticated system fetch calls with auth headers
html = html.replace(
  `const res = await fetch('/api/system/schema-overview').then(r => r.json());`,
  `const res = await fetch('/api/system/schema-overview', { headers: getAuthHeaders() }).then(r => r.json());`
);

html = html.replace(
  `const res = await fetch(\`/api/system/table-data/\${activeSchema}/\${activeTable}?limit=50\`).then(r => r.json());`,
  `const res = await fetch(\`/api/system/table-data/\${activeSchema}/\${activeTable}?limit=50\`, { headers: getAuthHeaders() }).then(r => r.json());`
);

html = html.replace(
  `const res = await fetch('/api/company/audit-logs').then(r => r.json());`,
  `const res = await fetch('/api/company/audit-logs', { headers: getAuthHeaders() }).then(r => r.json());`
);

html = html.replace(
  `const res = await fetch('/api/system/reset-users', { method: 'POST' }).then(r => r.json());`,
  `const res = await fetch('/api/system/reset-users', { method: 'POST', headers: getAuthHeaders() }).then(r => r.json());`
);

html = html.replace(
  `const res = await fetch('/api/system/reset-company', { method: 'POST' }).then(r => r.json());`,
  `const res = await fetch('/api/system/reset-company', { method: 'POST', headers: getAuthHeaders() }).then(r => r.json());`
);

html = html.replace(
  `const res = await fetch('/api/system/full-reset', { method: 'POST' }).then(r => r.json());`,
  `const res = await fetch('/api/system/full-reset', { method: 'POST', headers: getAuthHeaders() }).then(r => r.json());`
);

// Add auth helper function and gate
const authHelperCode = `
    function getAdminToken() {
      const cookieTok = ('; ' + document.cookie).split('; vh_admin_tok=').pop().split(';').shift();
      return cookieTok || localStorage.getItem('vh_admin_token') || null;
    }

    function getAuthHeaders() {
      const tok = getAdminToken();
      return tok ? { 'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
    }

    async function promptAdminAuth() {
      const email = prompt('Administrator Email:');
      if (!email) return false;
      const password = prompt('Administrator Password:');
      if (!password) return false;
      const twoFactorCode = prompt('2FA Code:');
      if (!twoFactorCode) return false;

      try {
        const res = await fetch('/api/company/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, twoFactorCode })
        }).then(r => r.json());

        if (res.success && res.token) {
          localStorage.setItem('vh_admin_token', res.token);
          document.cookie = 'vh_admin_tok=' + res.token + ';path=/;SameSite=Strict';
          alert('Authenticated successfully.');
          refreshDashboard();
          return true;
        } else {
          alert('Authentication failed: ' + (res.error || 'Invalid credentials'));
          return false;
        }
      } catch (e) {
        alert('Authentication error: ' + e.message);
        return false;
      }
    }
`;

html = html.replace('let activeSchema = \'company\';', authHelperCode + '\n    let activeSchema = \'company\';');

fs.writeFileSync('backend-inspector.html', html, 'utf8');
console.log('backend-inspector.html updated with authentication guard!');
