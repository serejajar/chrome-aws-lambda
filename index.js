const chromium = require('chrome-aws-lambda');

(async () => {
  let result = null;
  let browser = null;

  try {
    console.log('chromium.headless', chromium.headless);
    console.log('chromium.args', chromium.args);
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });


    let page = await browser.newPage();
    await page.goto('https://point.md/ru/novosti/obschestvo/cheban-obvinil-minzdrav-i-pravitel-stvo-v-bezdeistvii-eto-bor-ba-ne-s-pandemiei-a-s-narodom/');

    await page.screenshot({ path: 'example.png' });
    await page.pdf({ path: 'example.pdf' });

    await page.close();

  } catch (error) {
    console.log('error 123', error)
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
})();
