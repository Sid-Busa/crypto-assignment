import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {



  return (
    <>
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Investment Platform
        </Typography>
        <Box display="flex">
          {['Home', 'Portfolio', 'Top Cryptos', 'Price Chart'].map((text, index) => (
            <Button
              key={index}
              component={Link}
              to={text === 'Home' ? '/' : `/${text.toLowerCase().replace(' ', '-')}`}
              color="inherit"
              sx={{ marginLeft: 2 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {text}
              </motion.div>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
    <Outlet />
    </>
  );
};

export default Header;
