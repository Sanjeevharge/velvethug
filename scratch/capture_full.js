import { execSync } from 'child_process';
import path from 'path';

const outPath = path.resolve('C:/Users/Sanjeev/.gemini/antigravity-ide/brain/ab80bb48-fa55-49c4-b694-4db80366c470/backend_inspector_full.png');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const cmd = `"${edgePath}" --headless --disable-gpu --window-size=1440,1600 --screenshot="${outPath}" http://localhost:8080/backend-inspector`;
execSync(cmd, { stdio: 'inherit' });
console.log('Full screenshot saved to:', outPath);
