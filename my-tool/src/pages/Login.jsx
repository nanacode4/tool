import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('http://localhost:8000/api/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      console.log('Login successful:', data);

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('role', data.role);
      
      navigate('/progress');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ width: 360, p: 4 }}>
        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            autoComplete="off"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel control={<Checkbox size="small" />} label="Remember me" />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: '#b0b0b0',
              color: '#fff',
              '&:hover': {
                bgcolor: '#999',
              },
            }}
          >
            Sign In
          </Button>
        </Box>

        <Typography variant="body2" align="left" sx={{ mt: 2 }}>
          <Link href="#" underline="hover">
            Need help signing in?
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
