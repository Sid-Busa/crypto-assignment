import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {isLoggedIn ? (
        <h2>Welcome, {username}!</h2>
      ) : (
        <>
          <TextField label="Username" onChange={(e) => setUsername(e.target.value)} fullWidth />
          <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleLogin}>Login</Button>
        </>
      )}
    </Box>
  );
};

export default Auth;
