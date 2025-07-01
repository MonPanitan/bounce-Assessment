const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const NASA_APIKEY = process.env.NASA_APIKEY;

app.use(cors());
app.use(express.json());

console.log('Express server initialized');

app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Planet X Backend!');
});

// Hello route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Planet X API!' });
});

// Astronomy Picture of the Day route
app.get('/api/astronomy', async (req, res) => {
  try {
    const date = req.query.date;
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: {
        api_key: NASA_APIKEY,
        date: date,
      },
    });

    res.json({
      title: response.data.title,
      url: response.data.url,
      explanation: response.data.explanation,
      date: response.data.date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching APOD data');
  }
});

// Asteroids API route
const asteroidRouter = require('./routes/getAsteroid/route');
app.use('/api', asteroidRouter);

module.exports = app;
