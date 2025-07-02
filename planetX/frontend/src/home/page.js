import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";

function HomePage() {
  const [date, setDate] = useState("");
  const [astronomy, setAstronomy] = useState(null);
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return;

    setLoading(true);
    setError("");
    try {
      // Fetch Astronomy of the day
      const astronomyResponse = await axios.get("http://localhost:8081/api/astronomy", {
        params: { date },
      });
      setAstronomy(astronomyResponse.data);

      // Fetch Asteroids data for the date
      const asteroidResponse = await axios.get("http://localhost:8081/api/asteroids", {
        params: { start_date: date, end_date: date },
      });
      setAsteroids(asteroidResponse.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please check server/API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "black", color: "white" }}>
      <Container sx={{ py: 4, flexGrow: 1 }}>
        <Box
          sx={{
            backgroundImage: "url('https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?fit=crop&w=1470&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            py: 8,
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <Container sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ textShadow: "1px 1px 4px black" }}>
              Welcome to Planet X
            </Typography>
            <Typography variant="h6" align="center" paragraph sx={{ textShadow: "1px 1px 4px black" }}>
              Your gateway to exploring the universe!
            </Typography>
            <Typography variant="body1" align="center" sx={{ textShadow: "1px 1px 4px black" }}>
              Discover the wonders of space with our interactive features, including Astronomy of the Day, Near-Earth Asteroids, and more.
            </Typography>

            {/* Form area */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400, mx: "auto", my: 4, bgcolor: "rgba(255,255,255,0.1)", p: 3, borderRadius: 2 }}
            >
              <TextField
                fullWidth
                label="Enter a date (e.g. your birthday date)"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  style: { color: "white" },
                }}
                sx={{
                  mb: 2,
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "cyan" },
                    "&.Mui-focused fieldset": { borderColor: "cyan" },
                  },
                }}
              />
              <Button type="submit" variant="contained" fullWidth color="primary">
                Search
              </Button>
            </Box>

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <CircularProgress color="primary" />
              </Box>
            )}

            {error && (
              <Typography align="center" color="error">
                {error}
              </Typography>
            )}

            {/* Astronomy Result */}
            {astronomy && (
              <Box sx={{ my: 4, bgcolor: "grey.900", p: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Astronomy of {astronomy.date}
                </Typography>
                {astronomy.media_type === "image" && (
                  <Box component="img" src={astronomy.url} alt={astronomy.title} sx={{ maxWidth: "100%", borderRadius: 1 }} />
                )}
                <Typography variant="h6" mt={2}>
                  {astronomy.title}
                </Typography>
                <Typography variant="body2">{astronomy.explanation}</Typography>
                {astronomy.copyright && (
                  <Typography variant="caption">© {astronomy.copyright}</Typography>
                )}
              </Box>
            )}

            {/* Asteroids Result */}
            {asteroids.length > 0 && (
              <Box sx={{ my: 4, bgcolor: "grey.900", p: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Asteroids on {date}
                </Typography>
                {asteroids.map((asteroid, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography><strong>Name:</strong> {asteroid.name}</Typography>
                    <Typography><strong>Size:</strong> {asteroid.size}</Typography>
                    <Typography><strong>Distance:</strong> {asteroid.distanceFromEarth}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Container>
        </Box>

        {/* Sections */}
        <Box sx={{ bgcolor: "grey.800", p: 4, borderRadius: 2, my: 6 }}>
          <Typography variant="h5" gutterBottom color="white">
            Feel free to explore the following sections to learn more about our solar system and beyond:
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Asteroids",
                desc: "Learn about near-Earth asteroids and their trajectories.",
                to: "/asteroid",
                image: "https://images.unsplash.com/photo-1635307122625-249784b339a9?fit=crop&w=800&q=80",
              },
              {
                title: "Astronomy",
                desc: "Learn about our Astronomy of the day.",
                to: "/astronomy",
                image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?fit=crop&w=800&q=80",
              },
              {
                title: "Our Rovers",
                desc: "Explore images taken by NASA rovers on Mars.",
                to: "/rover",
                image: "https://mars.nasa.gov/system/news_items/main_images/9398_PIA25681-FigureA-web.jpg",
              },
              {
                title: "Quizzes",
                desc: "Test your knowledge with AI-generated space quizzes.",
                to: "/quiz",
                image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?fit=crop&w=800&q=80",
              },
            ].map((section, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card sx={{ bgcolor: "grey.900", color: "white" }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {section.title}
                    </Typography>
                    <Box
                      sx={{
                        backgroundImage: `url(${section.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: 150,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        my: 2,
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2">{section.desc}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={section.to}
                      size="small"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Explore
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: "grey.900", py: 3, mt: "auto" }}>
        <Container>
          <Typography variant="body2" color="grey.300" align="center">
            © 2025 Planet X. All rights reserved.
          </Typography>
          <Typography variant="body2" color="grey.400" align="center">
            Developed by Panitan Sripoom | Powered by NASA APIs
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
