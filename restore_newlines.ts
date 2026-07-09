import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The previous script joined with '\\n' which might have put literal \n characters or escaped ones.
// In the view_file output, it looked like \n.
// Let's try to restore the file to multiple lines.
const restored = content.split('\\n').join('\n');
fs.writeFileSync(filePath, restored);
console.log('Restored newlines in App.tsx');
