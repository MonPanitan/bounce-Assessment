import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AsteroidPage() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/asteroids');
        console.log(response.data); // check structure for correct mapping
        setAsteroids(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch asteroid data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, []);

  return (
    <div>
      <h1>Asteroid Data Page</h1>

      {loading && <p>Loading asteroid data...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul>
          {asteroids.map((asteroid, index) => (
            <li key={index}>
              <strong>Name:</strong> {asteroid.name} <br />
              <strong>Size:</strong> {asteroid.size} <br />
              <strong>Distance from Earth:</strong> {asteroid.distanceFromEarth}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AsteroidPage;
