import fs from 'fs';

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace placeholder WhatsApp
indexHtml = indexHtml.replaceAll('https://wa.me/91XXXXXXXXXX', 'https://wa.me/918069008358');
indexHtml = indexHtml.replaceAll('91XXXXXXXXXX', '918069008358');

// Replace fake countdown in promo banner with clean founding offer
indexHtml = indexHtml.replace(
  '<span class="promo-tag-badge" id="promoTag">FOUNDING EXCLUSIVE</span>\n      <span id="promoMessage">First 1,000 Sleep Partners — 15% Lifetime Price Lock (347 Claimed)</span>',
  '<span class="promo-tag-badge" id="promoTag">FOUNDING PRIVILEGE</span>\n      <span id="promoMessage">Founding Sleep Partner Program — 15% Lifetime Price Lock with code FOUNDING15</span>'
);

// Replace medical exaggeration with substantiated sleep engineering
indexHtml = indexHtml.replaceAll('Doctor Certified 7-Zone Support', 'Ergonomic 7-Zone Spinal Alignment');
indexHtml = indexHtml.replaceAll('Doctor Recommended Spine Alignment', 'Ergonomically Engineered Spine Support');
indexHtml = indexHtml.replaceAll('48+ certified orthopaedic doctors', 'Sleep posture specialists & ergonomic engineers');
indexHtml = indexHtml.replaceAll('23 Sleep Scientists from AIIMS, Fortis, Apollo, IISc', 'Sleep specialists and ergonomic product engineers');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('index.html updated for compliance & legal alignment.');
