const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  try {
    await page.goto('http://localhost:5173/product/102', {waitUntil: 'networkidle0'});
  } catch(e) {
    console.log("Nav Error", e);
  }
  await browser.close();
})();
