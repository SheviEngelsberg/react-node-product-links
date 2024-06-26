const { chromium } = require('playwright');
const productService = require('../services/productService');

async function searchProductInToGo(req, res) {
  const productName = req.params.product;
  const shopName = req.path.split('/')[2];
  try {
    const result = await productService.searchProductInToGo(shopName, productName);

    if (result) {
      res.json({ url: result });
    } else {
      res.json({ url: null });
    }
  } catch (error) {
    console.error('Error in searchProductInToGo controller:', error);
    res.status(500).json({ error: 'An error occurred while searching for the product', details: error.message });
  }
}

async function searchProductInKidichic(req, res) {
  const productName = req.params.product;
  const shopName = req.path.split('/')[2];

  try {
    const pageUrl = await productService.searchProductInKidichic(shopName, productName);

    if (pageUrl) {
      res.json({ url: pageUrl });
    } else {
      res.json({ url: null });
    }
  } catch (error) {
    console.error('Error in searchProductInKidichic:', error);
    res.status(500).json({ error: 'An error occurred while searching for the product', details: error.message });
  }
}


module.exports = {
  searchProductInToGo,
  searchProductInKidichic
};
