const { chromium } = require('playwright');

async function searchProductInToGo(productName) {
  let browser;

  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.togonline.co.il/', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('#top-search');
    await page.type('#top-search', productName);
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    const hasProduct = await page.$('.product');

    if (hasProduct) {
      return page.url();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error in searchProductInToGo service:', error);
    throw new Error('An error occurred while searching for the product');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}


async function searchProductInKidichic(productName) {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.kidichic.co.il/melange/', { waitUntil: 'domcontentloaded' });

    await Promise.all([
      page.waitForSelector('.wd-header-search.wd-tools-element.wd-design-1.wd-style-icon.wd-display-full-screen.whb-eydkog748rfxr17qdgm0 > a'),
      page.click('.wd-header-search.wd-tools-element.wd-design-1.wd-style-icon.wd-display-full-screen.whb-eydkog748rfxr17qdgm0 > a')
    ]);

    await page.waitForSelector('input.s.wd-search-inited');
    await page.type('input.s.wd-search-inited', productName);
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    const hasProductWrapper = await page.$('.product-wrapper');

    if (hasProductWrapper) {
      return page.url();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error in searchProductInKidichic:', error);
    throw new Error('An error occurred while searching for the product');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}


module.exports = {
  searchProductInToGo,
  searchProductInKidichic
};
