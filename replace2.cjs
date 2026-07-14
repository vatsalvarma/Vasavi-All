const fs = require('fs');
const path = require('path');
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if(fs.statSync(dirPath).isDirectory()) walkDir(dirPath, callback);
    else callback(dirPath);
  });
}
let count = 0;
walkDir('src', filePath => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content.replace(/>\$\{/g, '>₹{').replace(/> \$\{/g, '>₹ {');
    // Also replace in strings if there is any like "\$24.99"
    newContent = newContent.replace(/\$([0-9.,]+)/g, '₹$1');
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      count++;
      console.log('Fixed:', filePath);
    }
  }
});
console.log('Replaced ' + count + ' files.');
