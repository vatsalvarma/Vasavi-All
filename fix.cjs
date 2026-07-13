const fs = require('fs');

let file = 'src/pages/ProductDetailsPage.tsx';
let content = fs.readFileSync(file, 'utf-8');

let newContent = content
  .replace(/from-white/g, 'from-foreground')
  .replace(/via-white/g, 'via-foreground')
  .replace(/to-white/g, 'to-foreground')
  .replace(/text-white(\s|'|\"|`|\/)/g, 'text-foreground$1')
  .replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'hsl(var(--foreground) / 0.05)')
  .replace(/rgba\(255,\s*255,\s*255,\s*0\.2\)/g, 'hsl(var(--foreground) / 0.2)')
  .replace(/rgba\(255,\s*255,\s*255,\s*0\.8\)/g, 'hsl(var(--foreground) / 0.8)')
  .replace(/#FFD54F/g, 'hsl(var(--accent))')
  .replace(/rgba\(255,\s*213,\s*79/g, 'hsl(var(--accent)');

fs.writeFileSync(file, newContent);

file = 'src/pages/ShopPage.tsx';
if (fs.existsSync(file)) {
  content = fs.readFileSync(file, 'utf-8');
  newContent = content
    .replace(/from-white/g, 'from-foreground')
    .replace(/via-white/g, 'via-foreground')
    .replace(/to-white/g, 'to-foreground')
    .replace(/text-white(\s|'|\"|`|\/)/g, 'text-foreground$1');
  fs.writeFileSync(file, newContent);
}

file = 'src/components/home/StorefrontProducts.tsx';
if (fs.existsSync(file)) {
  content = fs.readFileSync(file, 'utf-8');
  newContent = content
    .replace(/from-white/g, 'from-foreground')
    .replace(/via-white/g, 'via-foreground')
    .replace(/to-white/g, 'to-foreground')
    .replace(/text-white(\s|'|\"|`|\/)/g, 'text-foreground$1');
  fs.writeFileSync(file, newContent);
}

console.log('Fixed');
