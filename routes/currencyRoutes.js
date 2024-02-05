// routes/currencyRoutes.js
const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');


/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3003/
 * @responds with returning the data as a JSON
 */
router.get('/',  async (request, response) => {
  try {
    const currencies = await Currency.findAll();
    response.json(currencies);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
// GET a specific currency by ID
router.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const currency = await Currency.findByPk(id);

    if (currency) {
      response.json(currency);
    } else {
      response.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
// POST a new currency
router.post('/', async (request, response) => {
  try {
    const { currencyCode, conversionRate, countryId } = request.body;
    const newCurrency = await Currency.create({ currencyCode, conversionRate, countryId });
    response.status(201).json(newCurrency);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
// PUT update a currency's conversion rate by ID
router.put('/:id/:newRate', async (request, response) => {
  const id = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);

  try {
    const [updatedRowsCount, updatedCurrencies] = await Currency.update(
      { conversionRate: newRate },
      { where: { id }, returning: true }
    );

    if (updatedRowsCount > 0) {
      response.json(updatedCurrencies[0]);
    } else {
      response.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
// DELETE a currency by ID
router.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const deletedRowsCount = await Currency.destroy({ where: { id } });

    if (deletedRowsCount > 0) {
      response.status(204).send();
    } else {
      response.status(404).json({ error: 'Currency not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
