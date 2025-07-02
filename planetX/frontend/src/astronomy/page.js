import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
} from "@mui/material";

function AstronomyPage() {
  const [astronomy, setAstronomy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const fetchAstronomy = async (params = {}) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8081/api/astronomy", {
        params,
      });
      setAstronomy(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch astronomy data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAstronomy(); // fetch today’s APOD on page load
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date) {
      fetchAstronomy({ date });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
        color: "white",
        py: 6,
      }}
    >
      <Container>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          Astronomy of the Day
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Explore the wonders of the universe with NASA's Astronomy Picture of the Day (APOD).
          
        </Typography>

        {/* Form for date selection */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 400, mx: "auto", my: 4 }}
        >
          <TextField
  fullWidth
  label="Select a date (YYYY-MM-DD)"
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
    "& input[type='date']::-webkit-calendar-picker-indicator": {
      filter: "invert(1)", // inverts calendar icon to white → black, black → white
    },
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
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Typography align="center" color="error">
            {error}
          </Typography>
        )}

        {!loading && !error && astronomy && (
          <Card sx={{ bgcolor: "grey.900", color: "white", mt: 4 }}>
            {astronomy.media_type === "image" && (
              <CardMedia
                component="img"
                image={astronomy.url}
                alt={astronomy.title}
                sx={{
                  maxHeight: 500,
                  objectFit: "contain",
                  borderBottom: "1px solid grey",
                }}
              />
            )}
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                {astronomy.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Date: {astronomy.date}
              </Typography>
              <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
                {astronomy.explanation}
              </Typography>
              {astronomy.copyright && (
                <Typography variant="caption">
                  © {astronomy.copyright}
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}

export default AstronomyPage;
