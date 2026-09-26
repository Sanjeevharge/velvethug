import fs from 'fs';

const adminJsPath = 'src/admin.js';
let content = fs.readFileSync(adminJsPath, 'utf8');

// 1. Replace 2FA step HTML
const old2FA = `  if (adminState.loginStep === '2fa') {
    const u = adminState.selectedRoleForLogin || staffList[0];
    authContainer.innerHTML = \`
      <div class="admin-auth-card">
        <div class="admin-auth-header">
          <div class="admin-auth-logo">Velvet Hug</div>
          <div class="admin-auth-subtitle">Mandatory Two-Factor Authentication</div>
        </div>
        
        <div style="background:var(--admin-surface-subtle);border:1px solid var(--admin-border-gold);border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:0.84rem;color:var(--admin-midnight);">
          <strong>Security Verification:</strong> Enter the 4-digit authentication code sent to <strong>\${u.phone}</strong>.<br>
          <span style="font-size:0.75rem;color:var(--admin-text-secondary);">Demo Code: <strong>\${u.twoFactorSecret}</strong></span>
        </div>

        <div class="admin-input-group">
          <label class="admin-label">Enter 4-Digit 2FA Code</label>
          <input class="admin-input" id="admin2faInput" placeholder="••••" maxlength="4" style="font-size:1.3rem;letter-spacing:0.35em;text-align:center;" value="\${u.twoFactorSecret}">
        </div>

        <button class="admin-btn-primary" onclick="window.verify2FACode()">Verify &amp; Authorize Session</button>
        <button class="btn-sm-admin btn-outline-sm" style="width:100%;margin-top:10px;" onclick="window.cancel2FA()">Back to Login</button>
      </div>\`;
    return;
  }`;

const new2FA = `  if (adminState.loginStep === '2fa') {
    authContainer.innerHTML = \`
      <div class="admin-auth-card">
        <div class="admin-auth-header">
          <div class="admin-auth-logo">Velvet Hug</div>
          <div class="admin-auth-subtitle">Two-Factor Authentication</div>
        </div>
        
        <div style="background:var(--admin-surface-subtle);border:1px solid var(--admin-border-gold);border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:0.84rem;color:var(--admin-midnight);text-align:center;">
          Authenticating Staff: <strong>\${adminState._pendingEmail || 'Administrator'}</strong>
        </div>

        <div class="admin-input-group">
          <label class="admin-label">Enter 2FA Security Code</label>
          <input class="admin-input" id="admin2faInput" placeholder="••••" maxlength="8" style="font-size:1.3rem;letter-spacing:0.35em;text-align:center;" autofocus>
        </div>

        <button class="admin-btn-primary" onclick="window.verify2FACode()">Verify &amp; Authorize Session</button>
        <button class="btn-sm-admin btn-outline-sm" style="width:100%;margin-top:10px;" onclick="window.cancel2FA()">Back to Login</button>
      </div>\`;
    return;
  }`;

// 2. Replace Credentials step HTML
const oldCreds = `  // Credentials Step
  authContainer.innerHTML = \`
    <div class="admin-auth-card">
      <div class="admin-auth-header">
        <div class="admin-auth-logo">Velvet Hug</div>
        <div class="admin-auth-subtitle">Operations &amp; Security Control Center</div>
      </div>

      <div class="admin-input-group">
        <label class="admin-label">Official Staff Email</label>
        <input class="admin-input" id="adminEmailInput" placeholder="name@velvethug.in" value="subashini@velvethug.in">
      </div>

      <div class="admin-input-group">
        <label class="admin-label">Password</label>
        <input class="admin-input" type="password" id="adminPasswordInput" placeholder="••••••••••••" value="VelvetAdmin@2026!">
      </div>

      <button class="admin-btn-primary" onclick="window.submitAdminLogin()">Proceed to 2FA Verification</button>

      <!-- Sole Admin Quick Login -->
      <div class="admin-quick-roles">
        <div class="quick-roles-title">Sole Administrator:</div>
        <div class="quick-role-chips" style="grid-template-columns:1fr;">
          <div class="quick-role-chip" onclick="window.quickSelectRole('usr_001')" style="text-align:center;padding:12px;">
            <strong>Subashini</strong><br>
            <span style="font-size:0.75rem;color:var(--admin-text-secondary);">Sole Administrator (Full Operational Control)</span>
          </div>
        </div>
      </div>
    </div>\`;`;

const newCreds = `  // Credentials Step
  authContainer.innerHTML = \`
    <div class="admin-auth-card">
      <div class="admin-auth-header">
        <div class="admin-auth-logo">Velvet Hug</div>
        <div class="admin-auth-subtitle">Operations &amp; Security Control Center</div>
      </div>

      <div class="admin-input-group">
        <label class="admin-label">Official Staff Email</label>
        <input class="admin-input" id="adminEmailInput" type="email" autocomplete="username" placeholder="name@velvethug.in">
      </div>

      <div class="admin-input-group">
        <label class="admin-label">Password</label>
        <input class="admin-input" type="password" id="adminPasswordInput" autocomplete="current-password" placeholder="••••••••••••">
      </div>

      <button class="admin-btn-primary" onclick="window.submitAdminLogin()">Proceed to 2FA Verification</button>
    </div>\`;`;

// Normalize \r\n to \n for matching
content = content.replace(/\r\n/g, '\n');
content = content.replace(old2FA.replace(/\r\n/g, '\n'), new2FA.replace(/\r\n/g, '\n'));
content = content.replace(oldCreds.replace(/\r\n/g, '\n'), newCreds.replace(/\r\n/g, '\n'));

// 3. Replace auth handler functions
const oldHandlers = `window.quickSelectRole = function(userId) {
  const emailInput = qs('#adminEmailInput');
  const passInput = qs('#adminPasswordInput');
  if (emailInput) emailInput.value = 'subashini@velvethug.in';
  if (passInput) passInput.value = 'VelvetAdmin@2026!';
  window.submitAdminLogin();
};

window.submitAdminLogin = function() {
  const email = qs('#adminEmailInput')?.value.trim().toLowerCase();
  const pass = qs('#adminPasswordInput')?.value.trim();
  const staffList = getAdminUsers();

  const user = staffList.find(u => u.email.toLowerCase() === email && u.passwordHash === pass);

  if (!user) {
    adminState.failedAttempts++;
    if (adminState.failedAttempts >= 3) {
      adminState.isLockedOut = true;
      logAuditAction('Security Monitor', 'Automated Guard', 'Security', 'Lockout Triggered', \`3 consecutive failed attempts targeting \${email}\`);
      renderAuthScreen();
      return;
    }
    adminToast(\`Invalid credentials. \${3 - adminState.failedAttempts} attempt(s) remaining.\`);
    return;
  }

  adminState.selectedRoleForLogin = user;
  adminState._pendingPassword = pass;
  adminState.loginStep = '2fa';
  renderAuthScreen();
};

window.verify2FACode = async function() {
  const code = qs('#admin2faInput')?.value.trim();
  const user = adminState.selectedRoleForLogin;

  if (code !== user.twoFactorSecret && code !== '8942') {
    adminToast('Invalid 2FA code. Please enter the valid code.');
    return;
  }

  try {
    const response = await nativeFetch('/api/company/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: adminState._pendingPassword, twoFactorCode: code })
    });
    const raw = await response.text();
    let result;
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch {
      throw new Error('Backend unavailable. Start the backend with npm run server, then reload this page.');
    }
    if (!response.ok || !result.success) throw new Error(result.error || 'Backend login failed');
    localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
    adminState._pendingPassword = null;
  } catch (error) {
    adminToast(error.message);
    return;
  }

  adminState.currentUser = user;
  adminState.failedAttempts = 0;
  adminState.loginStep = 'credentials';
  adminState.idleSecondsRemaining = 900;

  const allowed = ROLE_PERMISSIONS[user.role]?.modules || ['dashboard'];
  adminState.activeModule = allowed[0] || 'dashboard';

  logAuditAction(user.name, user.roleLabel, 'Security', '2FA Session Authorized', \`Authorized login for \${user.email}\`);
  adminToast(\`Welcome, \${user.name} (\${user.roleLabel})\`);
  renderAuthScreen();
  syncWithPostgresBackend();
};

window.cancel2FA = function() {
  adminState.loginStep = 'credentials';
  renderAuthScreen();
};`;

const newHandlers = `window.submitAdminLogin = function() {
  const email = qs('#adminEmailInput')?.value.trim().toLowerCase();
  const pass = qs('#adminPasswordInput')?.value.trim();

  if (!email || !email.includes('@')) {
    adminToast('Please enter your official staff email address.');
    return;
  }
  if (!pass) {
    adminToast('Please enter your administrator password.');
    return;
  }

  adminState._pendingEmail = email;
  adminState._pendingPassword = pass;
  adminState.loginStep = '2fa';
  renderAuthScreen();
};

window.verify2FACode = async function() {
  const code = qs('#admin2faInput')?.value.trim();
  const email = adminState._pendingEmail;
  const password = adminState._pendingPassword;

  if (!code) {
    adminToast('Please enter your 2FA security code.');
    return;
  }

  try {
    const response = await nativeFetch('/api/company/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, twoFactorCode: code })
    });
    const raw = await response.text();
    let result;
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch {
      throw new Error('Backend unavailable. Start the backend with npm run server, then reload this page.');
    }
    if (!response.ok || !result.success) throw new Error(result.error || 'Authentication failed');
    localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
    document.cookie = \`vh_admin_tok=\${result.token};path=/;SameSite=Strict\`;
    adminState._pendingPassword = null;

    adminState.currentUser = result.user;
    adminState.failedAttempts = 0;
    adminState.loginStep = 'credentials';
    adminState.idleSecondsRemaining = 900;

    const allowed = ROLE_PERMISSIONS[result.user.role]?.modules || ['dashboard'];
    adminState.activeModule = allowed[0] || 'dashboard';

    logAuditAction(result.user.name, result.user.roleLabel || 'Admin', 'Security', '2FA Session Authorized', \`Authorized login for \${result.user.email}\`);
    adminToast(\`Welcome, \${result.user.name} (\${result.user.roleLabel || 'Administrator'})\`);
    renderAuthScreen();
    syncWithPostgresBackend();
  } catch (error) {
    adminToast(error.message);
  }
};

window.cancel2FA = function() {
  adminState.loginStep = 'credentials';
  adminState._pendingPassword = null;
  renderAuthScreen();
};`;

content = content.replace(oldHandlers.replace(/\r\n/g, '\n'), newHandlers.replace(/\r\n/g, '\n'));

fs.writeFileSync(adminJsPath, content, 'utf8');
console.log('src/admin.js updated successfully!');
