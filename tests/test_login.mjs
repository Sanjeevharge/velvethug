async function testAdminLogin() {
  const credentials = [
    { email: 'subashini@velvethug.in', password: 'velvethug', twoFactorCode: '0702' },
    { email: 'subashini@velvethug.in', password: 'velvethug', twoFactorCode: '8942' },
    { email: 'subashini@velvethug.in', password: 'VelvetAdmin@2026!', twoFactorCode: '0702' },
    { email: 'subashini@velvethug.in', password: 'VelvetAdmin@2026!', twoFactorCode: '8942' }
  ];

  for (const cred of credentials) {
    const res = await fetch('http://localhost:8080/api/company/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cred)
    });
    const data = await res.json();
    console.log(`Login test [pass: "${cred.password}", 2fa: "${cred.twoFactorCode}"] -> HTTP ${res.status}, Success: ${data.success}, User: ${data.user?.name || 'none'}`);
  }
}

testAdminLogin();
