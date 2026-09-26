import fs from 'fs';

// 1. Add Modals HTML to index.html before globalToast
let indexHtml = fs.readFileSync('index.html', 'utf8');

const legalModalsHtml = `
<!-- PRIVACY POLICY MODAL (DPDP ACT 2023 COMPLIANT) -->
<div id="privacyModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="privacyModalTitle" style="display:none;">
  <div class="modal-card" style="max-width:720px;max-height:85vh;overflow-y:auto;background:var(--midnight,#0A1128);color:#FDFBF7;padding:32px;border:1px solid rgba(212,175,55,0.3);border-radius:16px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px;">
      <h3 id="privacyModalTitle" style="font-family:'Lora',serif;color:var(--champagne-gold,#D4AF37);margin:0;">Privacy &amp; Data Protection Policy</h3>
      <button onclick="window.closePrivacyPolicyModal()" style="background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;">✕</button>
    </div>
    <div style="font-size:0.88rem;line-height:1.7;color:rgba(253,251,247,0.8);">
      <p><strong>Effective Date:</strong> January 1, 2026 | <strong>Jurisdiction:</strong> Republic of India (Digital Personal Data Protection Act, 2023)</p>
      
      <h4 style="color:#fff;margin-top:16px;">1. Information We Collect</h4>
      <p>Velvet Hug collects only necessary data required to fulfill mattress custom manufacturing, logistics delivery, and warranty fulfillment:</p>
      <ul style="padding-left:20px;margin-bottom:12px;">
        <li><strong>Contact Data:</strong> Name, delivery address, phone number, and email.</li>
        <li><strong>Sleep Profile:</strong> Anonymous answers submitted through our 5-question Sleep Diagnostic Quiz.</li>
        <li><strong>Transaction Data:</strong> Encrypted payment references (we never store raw credit card or UPI credentials).</li>
      </ul>

      <h4 style="color:#fff;margin-top:16px;">2. Purpose of Processing</h4>
      <p>Your data is processed strictly for: (a) order dispatch, (b) 100-night trial and 10-year warranty tracking, and (c) logistics communication.</p>

      <h4 style="color:#fff;margin-top:16px;">3. Data Rights &amp; Deletion</h4>
      <p>Under the DPDP Act 2023, you have the right to access, rectify, or request permanent deletion of your data at any time by emailing <strong>privacy@velvethug.in</strong> or contacting our Data Protection Officer at +91 80 6900 8358.</p>
    </div>
    <button class="btn btn-gold btn-block" style="margin-top:24px;" onclick="window.closePrivacyPolicyModal()">I Understand</button>
  </div>
</div>

<!-- TERMS OF SERVICE MODAL -->
<div id="termsModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="termsModalTitle" style="display:none;">
  <div class="modal-card" style="max-width:720px;max-height:85vh;overflow-y:auto;background:var(--midnight,#0A1128);color:#FDFBF7;padding:32px;border:1px solid rgba(212,175,55,0.3);border-radius:16px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px;">
      <h3 id="termsModalTitle" style="font-family:'Lora',serif;color:var(--champagne-gold,#D4AF37);margin:0;">Terms of Service &amp; Trial Agreement</h3>
      <button onclick="window.closeTermsModal()" style="background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;">✕</button>
    </div>
    <div style="font-size:0.88rem;line-height:1.7;color:rgba(253,251,247,0.8);">
      <h4 style="color:#fff;margin-top:16px;">1. 100-Night Bedroom Trial Terms</h4>
      <p>Every Velvet Hug mattress includes a 100-night trial starting from the verified delivery date. We require a minimum 21-night break-in period for body adjustment. If you are not satisfied, you may request a firmness adjustment or full return with zero restocking fees.</p>

      <h4 style="color:#fff;margin-top:16px;">2. 10-Year Limited Warranty</h4>
      <p>Mattress cores are warrantied against visible indentation greater than 1 inch and structural manufacturing defects across 10 years of domestic use.</p>

      <h4 style="color:#fff;margin-top:16px;">3. Governing Law</h4>
      <p>These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.</p>
    </div>
    <button class="btn btn-gold btn-block" style="margin-top:24px;" onclick="window.closeTermsModal()">Accept &amp; Close</button>
  </div>
</div>
`;

if (!indexHtml.includes('id="privacyModal"')) {
  indexHtml = indexHtml.replace('<!-- GLOBAL TOAST -->', legalModalsHtml + '\n<!-- GLOBAL TOAST -->');
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('Legal modals injected into index.html');
}

// 2. Add JavaScript open/close functions in src/main.js
let mainJs = fs.readFileSync('src/main.js', 'utf8');

const legalJs = `
// ────────────────────────────────────────────────────────────
// LEGAL & PRIVACY POLICY MODALS
// ────────────────────────────────────────────────────────────
window.openPrivacyPolicyModal = function() {
  const el = document.getElementById('privacyModal');
  if (el) { el.style.display = 'flex'; el.classList.add('active'); }
};

window.closePrivacyPolicyModal = function() {
  const el = document.getElementById('privacyModal');
  if (el) { el.style.display = 'none'; el.classList.remove('active'); }
};

window.openTermsModal = function() {
  const el = document.getElementById('termsModal');
  if (el) { el.style.display = 'flex'; el.classList.add('active'); }
};

window.closeTermsModal = function() {
  const el = document.getElementById('termsModal');
  if (el) { el.style.display = 'none'; el.classList.remove('active'); }
};
`;

if (!mainJs.includes('openPrivacyPolicyModal')) {
  mainJs += legalJs;
  fs.writeFileSync('src/main.js', mainJs, 'utf8');
  console.log('Legal modal handlers added to src/main.js');
}
