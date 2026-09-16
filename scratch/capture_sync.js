import { execSync } from 'child_process';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:/Users/Sanjeev/.gemini/antigravity-ide/brain/ab80bb48-fa55-49c4-b694-4db80366c470';

// 1. Capture Backend Inspector
const inspectorOut = path.resolve(artifactDir, 'backend_inspector_sync.png');
const cmd1 = `"${edgePath}" --headless --disable-gpu --window-size=1440,1200 --screenshot="${inspectorOut}" http://localhost:8080/backend-inspector.html`;
console.log('Capturing Backend Inspector...');
execSync(cmd1, { stdio: 'inherit' });
console.log('Backend Inspector screenshot saved to:', inspectorOut);

// 2. Capture Admin Portal
const adminOut = path.resolve(artifactDir, 'admin_inventory_sync.png');
const cmd2 = `"${edgePath}" --headless --disable-gpu --window-size=1440,1200 --screenshot="${adminOut}" http://localhost:8080/admin.html`;
console.log('Capturing Admin Portal...');
execSync(cmd2, { stdio: 'inherit' });
console.log('Admin Portal screenshot saved to:', adminOut);
