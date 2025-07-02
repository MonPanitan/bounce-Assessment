import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

function AsteroidPage() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/asteroids");
        setAsteroids(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch asteroid data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "black", color: "white", py: 6 }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          Near-Earth Asteroids
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Explore the fascinating world of near-Earth asteroids and their potential impact on our planet along with their size and distance from Earth.
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          ( Unfortunately, the data is not real-time and is fetched from a static source with no photo available. )
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Typography align="center" color="error">
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <Grid container spacing={4}>
            {asteroids.map((asteroid) => (
              <Grid item xs={12} md={4} key={asteroid.id}>
                <Card sx={{ bgcolor: "grey.900", color: "white", height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      {asteroid.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Size:</strong> {asteroid.size}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Distance from Earth:</strong> {asteroid.distanceFromEarth}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default AsteroidPage;
