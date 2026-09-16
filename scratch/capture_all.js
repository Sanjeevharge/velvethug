import { execSync } from 'child_process';
import path from 'path';

const outAdmin = path.resolve('C:/Users/Sanjeev/.gemini/antigravity-ide/brain/ab80bb48-fa55-49c4-b694-4db80366c470/admin_portal_login.png');
const outStore = path.resolve('C:/Users/Sanjeev/.gemini/antigravity-ide/brain/ab80bb48-fa55-49c4-b694-4db80366c470/storefront_home.png');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

execSync(`"${edgePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outAdmin}" http://localhost:8080/admin.html`, { stdio: 'inherit' });
console.log('Saved admin screenshot:', outAdmin);

execSync(`"${edgePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outStore}" http://localhost:8080/`, { stdio: 'inherit' });
console.log('Saved storefront screenshot:', outStore);
