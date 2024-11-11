import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const AnimatedPaper = styled(Paper)({
  padding: '2rem',
  maxWidth: '400px',
  margin: 'auto',
  background: 'linear-gradient(135deg, #4b79a1, #283e51)',
  color: 'white',
  animation: 'fadeIn 1s ease-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'scale(0.9)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate =  useNavigate()

  const handleLogin = () => {
    if(username === "sidbusa" && password === "$idBusa@123$#"){
      localStorage.setItem('user',JSON.stringify({ username,password }))
      navigate('home')
    }else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <AnimatedPaper elevation={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Investor Login
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              marginBottom: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiInputBase-root': { color: 'white' },
              '& .MuiInputLabel-root': { color: '#d3d3d3' },
            }}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiInputBase-root': { color: 'white' },
              '& .MuiInputLabel-root': { color: '#d3d3d3' },
            }}
          />
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: '1rem',
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#388e3c' },
              animation: 'pulse 1s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </AnimatedPaper>
    </Box>
  );
};

export default Login;
