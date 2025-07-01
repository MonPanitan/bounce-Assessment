const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();

const router = express.Router();
const NASA_APIKEY = process.env.NASA_APIKEY;

router.get('/asteroids', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed`, {
      params: {
        start_date: '2015-09-07',
        end_date: '2015-09-08',
        api_key: NASA_APIKEY,
      },
    });

    const nearEarthObjects = response.data.near_earth_objects;
    const asteroidList = [];

    Object.keys(nearEarthObjects).forEach(date => {
      nearEarthObjects[date].forEach(asteroid => {
        asteroidList.push({
          id: asteroid.id,
          name: asteroid.name,
          size: `${asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m`,
          distanceFromEarth: `${parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km`,
        });
      });
    });

    res.json(asteroidList);
  } catch (error) {
    console.error('Error fetching asteroid data:', error);
    res.status(500).send('Error fetching asteroid data');
  }
});

module.exports = router;
