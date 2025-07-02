import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

function RoverPage() {
  const [photos, setPhotos] = useState([]);
  const [rover, setRover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);

  // Select open state
  const [open, setOpen] = useState(false);

  const fetchRoverPhotos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8081/api/rovers', {
        params: { rover: selectedRover, sol },
      });
      console.log(response.data);
      setPhotos(response.data.photos || []);
      setRover(response.data.rover || null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch rover photos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRoverPhotos();
  };

  const handleChange = (event) => {
    setSelectedRover(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'black', color: 'white', py: 6 }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          Mars Rover Photos
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Explore the latest photos from Mars rovers! Select a rover and sol (Mars day) to view their captured images.
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            my: 4,
          }}
        >
          <FormControl sx={{ minWidth: 150, bgcolor: 'white', borderRadius: 1 }}>
            <InputLabel id="rover-select-label">Select Rover</InputLabel>
            <Select
              labelId="rover-select-label"
              id="rover-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={selectedRover}
              label="Select Rover"
              onChange={handleChange}
            >
              <MenuItem value="curiosity">Curiosity</MenuItem>
              <MenuItem value="opportunity">Opportunity</MenuItem>
              <MenuItem value="spirit">Spirit</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Sol (Mars Day)"
            type="number"
            value={sol}
            onChange={(e) => setSol(e.target.value)}
            sx={{ minWidth: 120, bgcolor: 'white', borderRadius: 1 }}
          />

          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Typography align="center" color="error">
            {error}
          </Typography>
        )}

        {rover && (
          <Box sx={{ my: 4, bgcolor: 'grey.900', p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Rover Information
            </Typography>
            <Typography><strong>Name:</strong> {rover.name}</Typography>
            <Typography><strong>Landing Date:</strong> {rover.landing_date}</Typography>
            <Typography><strong>Launch Date:</strong> {rover.launch_date}</Typography>
            <Typography><strong>Status:</strong> {rover.status}</Typography>
          </Box>
        )}

        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Photos
          </Typography>
          {photos.length > 0 ? (
            <Grid container spacing={4}>
              {photos.map((photo) => (
                <Grid item xs={12} md={4} key={photo.id}>
                  <Card sx={{ bgcolor: 'grey.900' }}>
                    <CardMedia
                      component="img"
                      image={photo.img_src}
                      alt={`Mars Rover ${photo.rover.name}`}
                      sx={{ maxHeight: 300, objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        {photo.rover.name} - {photo.camera.full_name}
                      </Typography>
                      <Typography variant="body2" color="white">
                        Earth Date: {photo.earth_date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No photos found for the selected sol and rover.</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default RoverPage;
