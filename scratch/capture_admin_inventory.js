import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputPath = 'C:\\Users\\Sanjeev\\.gemini\\antigravity-ide\\brain\\ab80bb48-fa55-49c4-b694-4db80366c470\\admin_inventory_47skus.png';
const profileDir = path.resolve('temp_admin_test_profile3');

// Start edge with remote debugging
const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9225',
  `--user-data-dir=${profileDir}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-sync',
  '--window-size=1440,1100',
  'http://localhost:8080/admin.html'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9225/json').then(r => r.json());
    const target = listRes.find(t => t.type === 'page');
    if (!target) throw new Error('No page target found');

    const ws = new globalThis.WebSocket(target.webSocketDebuggerUrl);

    ws.onopen = () => {
      let id = 1;
      const send = (method, params = {}) => {
        ws.send(JSON.stringify({ id: id++, method, params }));
      };

      // Authenticate as Subashini and switch to inventory
      setTimeout(() => {
        send('Runtime.evaluate', {
          expression: `
            (async () => {
              // 1. Submit credentials
              window.submitAdminLogin();
              await new Promise(r => setTimeout(r, 400));
              
              // 2. Verify 2FA
              window.verify2FACode();
              await new Promise(r => setTimeout(r, 600));

              // 3. Switch to inventory
              window.switchAdminModule('inventory');
              await new Promise(r => setTimeout(r, 1200));
            })()
          `
        });
      }, 1200);

      setTimeout(() => {
        send('Page.captureScreenshot', { format: 'png' });
      }, 4500);

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.result && msg.result.data) {
          fs.writeFileSync(outputPath, Buffer.from(msg.result.data, 'base64'));
          console.log('Admin inventory screenshot saved to:', outputPath);
          ws.close();
          edgeProcess.kill();
          process.exit(0);
        }
      };
    };
  } catch (e) {
    console.error('Error:', e);
    edgeProcess.kill();
    process.exit(1);
  }
}, 1500);
