const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const NASA_APIKEY = process.env.NASA_APIKEY;

router.get('/rovers', async (req, res) => {
  try {
    const rover = req.query.rover || 'curiosity';
    const sol = req.query.sol || 1000;

    console.log(`Fetching photos for rover: ${rover}, sol: ${sol}`);

    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: {
        sol,
        api_key: NASA_APIKEY,
      },
    });

    const photos = response.data.photos;

    if (photos.length === 0) {
      return res.json({
        rover: {
          name: rover,
          message: `No photos found for sol ${sol}.`,
        },
        photos: [],
      });
    }

    // Extract rover info from first photo (same for all in result)
    const roverInfo = photos[0].rover;

    const roverData = {
      name: roverInfo.name,
      landing_date: roverInfo.landing_date,
      launch_date: roverInfo.launch_date,
      status: roverInfo.status,
      max_sol: roverInfo.max_sol,
      max_date: roverInfo.max_date,
      total_photos: roverInfo.total_photos,
    };

    res.json({
      rover: roverData,
      photos,
    });

  } catch (error) {
    console.error('Error fetching rover data:', error.response?.data || error.message);
    res.status(error.response?.status || 500).send(error.response?.data || 'Error fetching rover data');
  }
});

module.exports = router;
