import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Use proper regex for <motion.div and </motion.div> counting
let openMatch = content.match(/<motion\.div/g);
let closeMatch = content.match(/<\/motion\.div>/g);

console.log("Total <motion.div:", openMatch ? openMatch.length : 0);
console.log("Total </motion.div>:", closeMatch ? closeMatch.length : 0);
