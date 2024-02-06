const express = require('express');
const Currency = require('../models/Currency');
const Country = require('../models/Country');
const router = express.Router();


router.get('/currency-countryName', async (req, res) => {
  try {
    const currenciesWithCountries = await Currency.findAll({
      include: [{
        model: Country,
        attributes: ['name'], 
      }],
      attributes: ['currencyCode'], 
    });

    const result = currenciesWithCountries.map(currency => ({
      currencyCode: currency.currencyCode,
      countryName: currency.Country ? currency.Country.name : null,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
