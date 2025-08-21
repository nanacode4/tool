import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Programming tool
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/coding">
          Coding
        </Button>
        {/* Only show for normal users */}
        {role === 'user' && (
          <Button color="inherit" component={Link} to="/progress">
            Progress
          </Button>
        )}
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/discuss">
          Discuss
        </Button>
        {/* Only show for admins */}
        {role === 'admin' && (
          <Button color="inherit" component={Link} to="/feedbacks">
            FeedBack
          </Button>
          
        )}
        {role === 'admin' && (
          <Button color="inherit" component={Link} to="/quizzes">
            Quiz
          </Button>
          
        )}
        {!username ? (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
