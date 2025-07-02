import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";

function HomePage() {
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User entered date:", date);
    // TODO: Call NASA APOD API or navigate to results page with this date
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
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                Search
              </Button>
            </Box>
          </Container>
        </Box>

        <Box sx={{ bgcolor: "grey.900", p: 4, borderRadius: 2, my: 6 }}>
          <Typography variant="h5" gutterBottom color="primary">
            What is Planet X?
          </Typography>
          <Typography paragraph>
            Planet X is the gateway that contains all the universe inside our app!
            You can see the astronomy of the universe, along with the Mars images
            taken by NASA cute little rovers.
          </Typography>
          
        </Box>

        <Box sx={{ bgcolor: "grey.800", p: 4, borderRadius: 2, my: 6 }}>
            <Typography variant="h5" gutterBottom color="white" >
            Feel free to explore the following sections to learn more about our
            solar system and beyond:
          </Typography>
          <Grid container spacing={4}>
  {[
    {
      title: "Asteroids",
      desc: "Learn about near-Earth asteroids and their trajectories.",
      to: "/asteroid",
      image: "https://images.unsplash.com/photo-1635307122625-249784b339a9?fit=crop&w=800&q=80", // asteroid image
    },
    {
      title: "Astronomy",
      desc: "Learn about our Astronomy of the day.",
      to: "/astronomy",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?fit=crop&w=800&q=80", // stars/galaxy image
    },
    {
      title: "Our Rovers",
      desc: "Explore images taken by NASA rovers on Mars.",
      to: "/rover",
      image: "https://mars.nasa.gov/system/news_items/main_images/9398_PIA25681-FigureA-web.jpg", // rover image
    },
    {
      title: "Quizzes",
      desc: "Test your knowledge with AI-generated space quizzes.",
      to: "/quiz",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?fit=crop&w=800&q=80", // cosmic quiz abstract
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
