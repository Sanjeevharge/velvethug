import fs from 'fs';

const code = fs.readFileSync('./src/main.js', 'utf8');
const lines = code.split('\n');

console.log('--- localStorage lines in src/main.js ---');
lines.forEach((line, idx) => {
  if (line.includes('localStorage.')) {
    console.log(`L${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
