import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profileDir = path.resolve('temp_admin_test_profile_sync');

async function captureModule(moduleName, outputFileName) {
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9226',
    `--user-data-dir=${profileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-sync',
    '--window-size=1440,1100',
    'http://localhost:8080/admin.html'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const listRes = await fetch('http://127.0.0.1:9226/json').then(r => r.json());
  const target = listRes.find(t => t.type === 'page');
  if (!target) {
    edgeProcess.kill();
    throw new Error('No target');
  }

  const ws = new globalThis.WebSocket(target.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = () => {
      let id = 1;
      const send = (method, params = {}) => ws.send(JSON.stringify({ id: id++, method, params }));

      setTimeout(() => {
        send('Runtime.evaluate', {
          expression: `
            (async () => {
              localStorage.removeItem('vh_admin_store_v1');
              localStorage.removeItem('vh_founding_count');
              window.submitAdminLogin();
              await new Promise(r => setTimeout(r, 400));
              window.verify2FACode();
              await new Promise(r => setTimeout(r, 600));
              window.switchAdminModule('${moduleName}');
              await new Promise(r => setTimeout(r, 1200));
            })()
          `
        });
      }, 1000);

      setTimeout(() => {
        send('Page.captureScreenshot', { format: 'png' });
      }, 4500);

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.result && msg.result.data) {
          const outputPath = path.resolve('C:\\Users\\Sanjeev\\.gemini\\antigravity-ide\\brain\\ab80bb48-fa55-49c4-b694-4db80366c470', outputFileName);
          fs.writeFileSync(outputPath, Buffer.from(msg.result.data, 'base64'));
          console.log(`Screenshot saved for ${moduleName} -> ${outputPath}`);
          ws.close();
          edgeProcess.kill();
          resolve();
        }
      };
    };
  });
}

async function run() {
  await captureModule('quiz', 'admin_quiz_sync.png');
  await new Promise(r => setTimeout(r, 1000));
  await captureModule('founding', 'admin_founding_sync.png');
  await new Promise(r => setTimeout(r, 1000));
  await captureModule('referrals', 'admin_referrals_sync.png');
  console.log('All admin module screenshots captured.');
}

run();
