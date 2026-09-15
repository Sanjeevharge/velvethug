# scratch/verify.ps1
Write-Host "=== VERIFYING CLEAN CODE AND USER REQUIREMENTS ==="

# 1. Admin access: single admin only
Write-Host "`n1. Checking Admin Users:"
Get-Content "src/data/adminStore.js" | Select-String -Pattern 'usr_001|subashini'

# 2. Corporate/Business ordering
Write-Host "`n2. Checking Corporate / Business Enquiries:"
$corpModal = Get-Content "index.html" | Select-String -Pattern 'corporateInquiryModal'
Write-Host "Corporate Inquiry Modal in index.html: $($corpModal.Count) matches"
$corpRoutes = Get-Content "src/main.js" | Select-String -Pattern 'routeToWhatsAppInquiry|routeToEmailInquiry'
Write-Host "WhatsApp/Email routing functions in main.js: $($corpRoutes.Count) matches"

# 3. Repair & Refurbishment removed entirely
Write-Host "`n3. Checking for Repair/Refurbishment footprint:"
$idxRepair = Get-Content "index.html" | Select-String -Pattern 'Repair Lab|id="view-services"|id="serviceBookingModal"'
Write-Host "Repair Lab in index.html: $($idxRepair.Count)"
$mainRepair = Get-Content "src/main.js" | Select-String -Pattern 'REFURBISHMENT_SERVICES|SERVICE_ELIGIBILITY|renderServicesPage|openServiceBookingModal'
Write-Host "Repair logic in main.js: $($mainRepair.Count)"
$adminRepair = Get-Content "src/admin.js" | Select-String -Pattern 'renderRepairsModule|getStoredServices|saveStoredServices'
Write-Host "Repair logic in admin.js: $($adminRepair.Count)"

# 4. Founding Sleep Partner live count continues past 1000
Write-Host "`n4. Checking Live Counter logic:"
$counterMain = Get-Content "src/main.js" | Select-String -Pattern 'All 1,000 Founding spots claimed|state.foundingCount\+\+'
Write-Host "Continuous counter logic occurrences: $($counterMain.Count)"

# 5. Rest Ambassador badge & referral
Write-Host "`n5. Checking Rest Ambassador & Referral:"
$ambassador = Get-Content "src/main.js" | Select-String -Pattern 'Rest Ambassador'
Write-Host "Rest Ambassador occurrences: $($ambassador.Count)"
$simTest = Get-Content "src/main.js" | Select-String -Pattern 'simulateReferralTest'
Write-Host "Simulate referral helper: $($simTest.Count)"

Write-Host "`n=== ALL VERIFICATION CHECKS COMPLETED ==="
