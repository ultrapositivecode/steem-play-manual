import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// scan JSX tags simply (very naive, just to see what opens before 1256 and isn't closed)
// actually let's just log lines 1240 to 1260:
let lines = content.split('\n');
for (let i = 1240; i <= 1260; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
