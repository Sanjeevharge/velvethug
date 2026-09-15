$path = "c:\Users\Sanjeev\Desktop\velvethug\src\main.js"
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$badPattern = @"
                </div>
                <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:4px;">
                  Item: <strong>${r.item || 'Velvet Hug Dual-Comfort Mattress'}</strong> · Type: <strong>${r.typefunction addNewAddress() {
"@

$replacement = @"
                </div>
                <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:4px;">
                  Item: <strong>`${r.item || 'Velvet Hug Dual-Comfort Mattress'}</strong> · Type: <strong>`${r.type || 'Exchange'}</strong> · Reason: `${r.reason || 'Comfort preference'}
                </div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
                  Pickup Address: `${r.pickupAddress || r.address || 'Registered Address'} · Slot: `${r.slot || 'Pending Dispatch'}
                </div>
                `${r.evidenceUrl ? `
                  <div style="margin-top:8px;font-size:0.75rem;">
                    <a href="`${r.evidenceUrl}" target="_blank" style="color:var(--champagne-gold);text-decoration:underline;">📷 View Inspection Photo Evidence</a>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `;
      })()}
    `;
  } else if (_accountPageTab === 'profile') {
    el.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <!-- Personal Details -->
        <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;">
          <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:16px;">Personal Details</div>
          <div style="margin-bottom:14px;">
            <label class="form-label">Full Name</label>
            <input class="form-input" id="profileName" value="`${u.name || ''}" placeholder="Your Name">
          </div>
          <div style="margin-bottom:14px;">
            <label class="form-label">Email Address</label>
            <input class="form-input" id="profileEmail" value="`${u.email || ''}" placeholder="your@email.com">
          </div>
          <div style="margin-bottom:20px;">
            <label class="form-label">Phone Number (+91)</label>
            <input class="form-input" id="profilePhone" value="`${u.phone || ''}" placeholder="98765 43210">
          </div>
          <button class="btn btn-primary btn-sm" onclick="saveProfileDetails()">Save Changes</button>
        </div>

        <!-- Saved Addresses -->
        <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;">
          <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:16px;">Saved Addresses</div>
          <div id="profileAddressList">
            `${(u.addresses || []).map((a, i) => `
              <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);border-radius:var(--radius-sm);padding:14px;margin-bottom:10px;position:relative;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span class="badge badge-founding" style="font-size:0.65rem;">`${a.tag}</span>
                  `${a.isDefault ? '<span style="font-size:0.72rem;color:var(--accent-emerald);font-weight:700;">Default</span>' : `<button class="btn btn-outline btn-sm" style="font-size:0.68rem;padding:2px 8px;" onclick="setDefaultAddress(`${i})">Set Default</button>`}
                </div>
                <div style="font-weight:700;color:var(--midnight-blue);font-size:0.9rem;">`${a.name}</div>
                <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">`${a.line}<br>`${a.city}, `${a.state} - `${a.pincode}<br>📞 `${a.phone}</div>
                <button onclick="deleteAddress(`${i})" style="position:absolute;top:10px;right:10px;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.75rem;">✕ Remove</button>
              </div>
            `).join('')}
          </div>
          <div style="border-top:1px solid rgba(76,63,94,0.08);padding-top:14px;margin-top:14px;">
            <div style="font-size:0.82rem;font-weight:600;color:var(--midnight-blue);margin-bottom:10px;">Add New Address</div>
            <input class="form-input" id="newAddrTag" placeholder="Label (Home / Office)" style="margin-bottom:6px;">
            <input class="form-input" id="newAddrLine" placeholder="Street address" style="margin-bottom:6px;">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px;">
              <input class="form-input" id="newAddrCity" placeholder="City">
              <input class="form-input" id="newAddrState" placeholder="State">
              <input class="form-input" id="newAddrPin" placeholder="Pincode" maxlength="6">
            </div>
            <button class="btn btn-outline btn-sm" onclick="addNewAddress()">+ Save Address</button>
          </div>
        </div>

      </div>

      <!-- Sleep Partner Status Card -->
      `${u.isFounding ? `
      <div style="background:linear-gradient(135deg,var(--midnight-blue),var(--muted-violet));border-radius:var(--radius-lg);padding:24px;margin-top:24px;color:#FDFBF7;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
        <div>
          <div style="font-size:0.78rem;letter-spacing:0.1em;opacity:0.7;margin-bottom:4px;">FOUNDING SLEEP PARTNER</div>
          <div style="font-family:var(--font-serif);font-size:2rem;font-weight:700;">#`${u.foundingNumber}</div>
          <div style="font-size:0.84rem;opacity:0.75;margin-top:4px;">15% lifetime price lock · VIP first access</div>
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-gold btn-sm" onclick="openCertificateModal()">🏅 Certificate</button>
          <button class="btn btn-outline-light btn-sm" onclick="switchAccountPageTab('orders')">View Orders</button>
        </div>
      </div>` : ''}

      <!-- Referral Panel -->
      <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;margin-top:24px;">
        <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:8px;">🤝 Rest Ambassador - Refer &amp; Earn</div>
        <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:14px;">Share your link. Earn ₹1,000 for every friend who buys.</p>
        <div style="display:flex;gap:8px;margin-bottom:12px;">
          <input class="form-input" value="https://velvethug.in/ref/`${u.referralCode}" readonly style="font-family:monospace;font-size:0.82rem;">
          <button class="btn btn-gold btn-sm" onclick="navigator.clipboard?.writeText('https://velvethug.in/ref/`${u.referralCode}');toast('✓ Link copied!')">Copy</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
          <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
            <div style="font-size:1.4rem;font-weight:800;color:var(--midnight-blue);">`${u.referralStats?.count || 0}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Friends Referred</div>
          </div>
          <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
            <div style="font-size:1.4rem;font-weight:800;color:var(--accent-emerald);">₹`${(u.referralStats?.earned||0).toLocaleString('en-IN')}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Earned</div>
          </div>
          <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
            <div style="font-size:1.4rem;font-weight:800;color:var(--muted-violet);">₹`${(u.referralStats?.pending||0).toLocaleString('en-IN')}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">In Trial</div>
          </div>
        </div>
      </div>
    `;
  }
}

function saveProfileDetails() {
  if (!state.user) return;
  const name  = qs('#profileName')?.value?.trim();
  const email = qs('#profileEmail')?.value?.trim();
  const phone = qs('#profilePhone')?.value?.trim();
  if (!name) { toast('Name cannot be empty'); return; }
  state.user.name  = name;
  state.user.email = email;
  state.user.phone = phone;
  state.user.avatar = name[0].toUpperCase();
  saveStoredUser(state.user);
  updateHeaderUserUI();
  renderAccountPage();
  toast('✓ Profile updated!');
}

function addNewAddress() {
"@

$normText = $text -replace "`r`n", "`n"
$normBad = $badPattern -replace "`r`n", "`n"
$normRep = $replacement -replace "`r`n", "`n"

if ($normText.Contains($normBad)) {
    $newText = $normText.Replace($normBad, $normRep)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $newText, $utf8NoBom)
    Write-Host "SUCCESSFULLY_REPLACED_IN_MAIN_JS"
} else {
    Write-Host "PATTERN_NOT_FOUND"
}