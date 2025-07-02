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


// Asteroids API route
const asteroidRouter = require('./routes/getAsteroid/route');
app.use('/api', asteroidRouter);

// Astronomy API route
const astronomyRouter = require('./routes/getAstronomy/route');
app.use('/api', astronomyRouter);

const roverRoute = require('./routes/getRover/route');
app.use('/api', roverRoute);

const quizRoute = require('./routes/quiz/route');
app.use('/api', quizRoute);




module.exports = app;
