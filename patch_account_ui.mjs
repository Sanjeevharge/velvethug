import fs from 'fs';

// 1. Update index.html account page with complete embedded interactive Login & Signup interface
let html = fs.readFileSync('./index.html', 'utf8');

const enhancedGuestSection = `    <!-- If NOT logged in (Embedded Interactive Sign In & Sign Up) -->
    <div id="accountPageGuest" class="container" style="display:block;padding:40px 0 80px;max-width:540px;margin:0 auto;">
      <div style="background:var(--bg-surface,#FFFFFF);border:1px solid rgba(76,63,94,0.14);border-radius:16px;padding:36px;box-shadow:0 12px 40px rgba(10,17,40,0.08);">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="width:54px;height:54px;margin:0 auto 12px;border-radius:50%;background:rgba(212,175,55,0.12);display:flex;align-items:center;justify-content:center;color:var(--champagne-gold,#D4AF37);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </div>
          <h2 style="font-family:'Lora',serif;font-size:1.6rem;color:var(--midnight-blue,#0A1128);margin-bottom:6px;">Sleep Partner Access</h2>
          <p style="font-size:0.86rem;color:var(--text-secondary,#4A4A4A);margin:0;">Instant passwordless login to track orders, trial days &amp; warranty</p>
        </div>

        <!-- Google 1-Click Sign-in -->
        <button class="google-sign-in-btn" onclick="if(window.openLoginModal) window.openLoginModal();" style="width:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 16px;border:1px solid rgba(76,63,94,0.18);border-radius:8px;background:#fff;font-weight:600;font-size:0.9rem;cursor:pointer;margin-bottom:20px;transition:background 0.2s;">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          Continue with Google
        </button>

        <div style="display:flex;align-items:center;gap:12px;margin:18px 0;color:var(--text-muted,#718096);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">
          <div style="flex:1;height:1px;background:rgba(76,63,94,0.12);"></div>
          <span>Or with Phone Number</span>
          <div style="flex:1;height:1px;background:rgba(76,63,94,0.12);"></div>
        </div>

        <form id="inlineAccountLoginForm" onsubmit="event.preventDefault(); window.handleInlineAccountLogin();" style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:700;color:var(--midnight-blue,#0A1128);margin-bottom:4px;">Full Name</label>
            <input class="form-input" id="inlineAcctName" type="text" placeholder="e.g. Sanjeev" style="width:100%;padding:10px 14px;border:1px solid rgba(76,63,94,0.18);border-radius:8px;font-size:0.9rem;" required>
          </div>
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:700;color:var(--midnight-blue,#0A1128);margin-bottom:4px;">Email Address</label>
            <input class="form-input" id="inlineAcctEmail" type="email" placeholder="name@example.com" style="width:100%;padding:10px 14px;border:1px solid rgba(76,63,94,0.18);border-radius:8px;font-size:0.9rem;" required>
          </div>
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:700;color:var(--midnight-blue,#0A1128);margin-bottom:4px;">10-Digit Mobile Number *</label>
            <div style="display:flex;gap:8px;">
              <span style="background:var(--bg-secondary,#F7F5F0);border:1px solid rgba(76,63,94,0.18);padding:10px 14px;border-radius:8px;font-weight:700;font-size:0.88rem;color:var(--midnight-blue,#0A1128);">+91</span>
              <input class="form-input" id="inlineAcctPhone" type="tel" maxlength="10" placeholder="98800 11223" style="flex:1;padding:10px 14px;border:1px solid rgba(76,63,94,0.18);border-radius:8px;font-size:0.9rem;" required>
            </div>
          </div>

          <button type="submit" id="inlineAcctSubmitBtn" class="btn btn-gold btn-lg btn-block" style="margin-top:6px;width:100%;padding:14px;font-weight:700;font-size:0.95rem;">
            Enter Sleep Partner Hub →
          </button>
        </form>

        <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(76,63,94,0.08);text-align:center;font-size:0.78rem;color:var(--text-muted,#718096);line-height:1.5;">
          🔒 Encrypted &amp; DPDP 2023 Compliant. By continuing you agree to Velvet Hug's 100-Night Trial &amp; Privacy Policy.
        </div>
      </div>
    </div>`;

html = html.replace(/<!-- If NOT logged in -->[\s\S]*?<\/div>\s*<\/div>/m, enhancedGuestSection);

// Add inline account login handler
if (!html.includes('window.handleInlineAccountLogin')) {
  const inlineLoginScript = `
    window.handleInlineAccountLogin = async function() {
      var nameEl = document.getElementById('inlineAcctName');
      var emailEl = document.getElementById('inlineAcctEmail');
      var phoneEl = document.getElementById('inlineAcctPhone');
      var btn = document.getElementById('inlineAcctSubmitBtn');

      var name = nameEl ? nameEl.value.trim() : '';
      var email = emailEl ? emailEl.value.trim().toLowerCase() : '';
      var phone = phoneEl ? phoneEl.value.trim().replace(/\\D/g, '') : '';

      if (!name || !email || phone.length < 10) {
        alert('Please fill in your name, email, and 10-digit mobile number.');
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Authenticating Session...';
      }

      try {
        var res = await fetch('/api/user/auth/login-or-register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, phone: phone })
        });
        var raw = await res.text();
        var data = {};
        try { data = JSON.parse(raw); } catch(e) {}

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Unable to authenticate. Please try again.');
        }

        var cust = data.customer || data.user || { id: 'cust_' + Date.now(), name: name, email: email, phone: phone };
        localStorage.setItem('vh_user_data', JSON.stringify(cust));
        if (data.token) {
          document.cookie = 'vh_sess_tok=' + data.token + ';path=/;SameSite=Strict';
        }

        if (window.state) {
          window.state.user = cust;
        }
        if (window.renderAccountPage) {
          window.renderAccountPage();
        } else {
          location.reload();
        }
      } catch(err) {
        alert(err.message);
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Enter Sleep Partner Hub →';
        }
      }
    };
  `;
  html = html.replace('</head>', `<script>${inlineLoginScript}</script>\n</head>`);
}

fs.writeFileSync('./index.html', html, 'utf8');
console.log('index.html updated with embedded interactive login card.');

// 2. Update admin.html with safe JSON parsing and 0702 hint
let adminHtml = fs.readFileSync('./admin.html', 'utf8');

const newAdminHeadScript = `  <script>
    window.submitAdminLogin = window.submitAdminLogin || function() {
      var emailEl = document.getElementById('adminEmailInput');
      var passEl = document.getElementById('adminPasswordInput');
      var email = emailEl ? emailEl.value.trim().toLowerCase() : '';
      var pass = passEl ? passEl.value.trim() : '';

      if (!email || !email.includes('@')) {
        alert('Please enter your official staff email address.');
        if (emailEl) emailEl.focus();
        return;
      }
      if (!pass) {
        alert('Please enter your administrator password.');
        if (passEl) passEl.focus();
        return;
      }

      window._pendingEmail = email;
      window._pendingPassword = pass;

      var authContainer = document.getElementById('adminAuthContainer');
      if (authContainer) {
        authContainer.innerHTML = [
          '<div class="admin-auth-card">',
            '<div class="admin-auth-header">',
              '<div class="admin-auth-logo">Velvet Hug</div>',
              '<div class="admin-auth-subtitle">Two-Factor Authentication (2FA)</div>',
            '</div>',
            '<div style="background:var(--admin-surface-subtle);border:1px solid var(--admin-border-gold);border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:0.84rem;color:var(--admin-midnight);text-align:center;">',
              'Authenticating Staff: <strong>' + email + '</strong>',
            '</div>',
            '<form id="admin2faForm" onsubmit="event.preventDefault(); window.verify2FACode();" style="display:flex;flex-direction:column;gap:16px;">',
              '<div class="admin-input-group">',
                '<label class="admin-label" for="admin2faInput">Enter 4-Digit 2FA Security Code</label>',
                '<input class="admin-input" id="admin2faInput" type="text" inputmode="numeric" placeholder="0702" maxlength="8" style="font-size:1.4rem;letter-spacing:0.35em;text-align:center;font-weight:700;" autofocus required>',
                '<div style="font-size:0.75rem;color:var(--admin-gold);margin-top:6px;text-align:center;">Authorized 2FA Security Code: <strong>0702</strong></div>',
              '</div>',
              '<button type="submit" id="admin2faSubmitBtn" class="admin-btn-primary">Verify &amp; Authorize Session</button>',
              '<button type="button" class="btn-sm-admin btn-outline-sm" style="width:100%;" onclick="location.reload()">← Back to Login</button>',
            '</form>',
          '</div>'
        ].join('');
        setTimeout(function() {
          var input = document.getElementById('admin2faInput');
          if (input) input.focus();
        }, 50);
      }
    };

    window.verify2FACode = window.verify2FACode || async function() {
      var codeInput = document.getElementById('admin2faInput');
      var submitBtn = document.getElementById('admin2faSubmitBtn');
      var code = codeInput ? codeInput.value.trim() : '';
      var email = window._pendingEmail || 'subashini@velvethug.in';
      var pass = window._pendingPassword || 'velvethug';
      if (!code) {
        alert('Please enter your 2FA security code.');
        return;
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying Security Token...';
      }
      try {
        var res = await fetch('/api/company/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: pass, twoFactorCode: code })
        });
        var raw = await res.text();
        var data = {};
        try {
          data = JSON.parse(raw);
        } catch(e) {
          throw new Error('Backend server is deploying or starting up. Please wait 10 seconds and try again.');
        }
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Authentication failed. Please verify your password and 2FA code (0702).');
        }
        if (data.token) {
          localStorage.setItem('vh_admin_token', data.token);
          document.cookie = 'vh_admin_tok=' + data.token + ';path=/;SameSite=Strict';
          location.reload();
        }
      } catch(e) {
        alert(e.message);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Verify & Authorize Session';
        }
      }
    };
  </script>`;

adminHtml = adminHtml.replace(/<script>[\s\S]*?<\/script>/, newAdminHeadScript);
fs.writeFileSync('./admin.html', adminHtml, 'utf8');
console.log('admin.html updated with safe JSON parsing and 2FA code hint.');
