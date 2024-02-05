const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/country
 * @responds with returning all data as a JSON
 */
router.get('/', async (request, response) => {
  try {
    const countries = await Country.findAll();
    response.json(countries);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/country,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
router.post('/', async (request, response) => {
  try {
    const { name } = request.body;
    const newCountry = await Country.create({ name });
    response.status(201).json(newCountry);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * TODO: DELETE Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/country/:id,
 * @responds by returning a status code of 204
 */
router.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const deletedRowsCount = await Country.destroy({ where: { id } });

    if (deletedRowsCount > 0) {
      response.status(204).send();
    } else {
      response.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
