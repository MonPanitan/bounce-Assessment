import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
          Planet X
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/asteroid">Asteroids</Button>
          <Button color="inherit" component={Link} to="/astronomy">Astronomy</Button>
          <Button color="inherit" component={Link} to="/rover">Rovers</Button>
          <Button color="inherit" component={Link} to="/quiz">Quizzes</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
