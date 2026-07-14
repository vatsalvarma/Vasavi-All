const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let replacedCount = 0;
walkDir('src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Replace $ followed by numbers/commas/decimals with ₹
    // This avoids replacing template literal variables like ${var}
    let newContent = content.replace(/\$([0-9.,]+)/g, '₹$1');
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      replacedCount++;
      console.log('Updated:', filePath);
    }
  }
});
console.log('Replaced in ' + replacedCount + ' files.');
