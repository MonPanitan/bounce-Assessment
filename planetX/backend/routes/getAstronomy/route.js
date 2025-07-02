const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();

const router = express.Router();
const NASA_APIKEY = process.env.NASA_APIKEY;

router.get('/astronomy', async (req, res) => {
  try {
    const params = {
      api_key: NASA_APIKEY,
      ...req.query,
    };

    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, { params });

    res.json(response.data); // return full data to frontend
  } catch (error) {
    console.error('Error fetching APOD data:', error.response?.data || error.message);
    res.status(500).send('Error fetching APOD data');
  }
});

module.exports = router;