const express = require('express');
const { Currency, Country } = require('../models/Currency');

const router = express.Router();

// GET endpoint for "/currency-countryName"
router.get('/currency-countryName', async (req, res) => {
    try {
      const result = await Currency.findAll({
        include: {
          model: Country,
          attributes: ['name'],
        },
        attributes: ['currencyCode'],
      });
  
      const formattedResult = result.map((item) => ({
        currencyCode: item.currencyCode,
        countryName: item.Country.name,
      }));
  
      res.json(formattedResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
