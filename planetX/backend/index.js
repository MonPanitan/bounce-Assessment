const express = require('express');
const app = express(); //using express

console.log(app);

app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});

//add route
app.get('/', (req, res) => {
  res.send('Hello from Planet X Backend!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Planet X API!' });
});