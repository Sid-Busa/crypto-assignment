import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>Welcome to the Investment Platform</Typography>
        <Typography variant="body1">Explore, track, and manage your crypto investments with ease.</Typography>
      </Box>
    </motion.div>
  );
};

export default Home;
