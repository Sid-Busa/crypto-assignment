import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const TopCryptos = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 10, page: 1 },
        });
        setCryptos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data", error);
        setLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box mt={4}>
    <Container maxWidth="lg">
      <Typography variant="h6">Top 10 Cryptocurrencies</Typography>
      <List>
        {cryptos.map((crypto) => (
          <motion.div
            key={crypto.id}
            whileHover={{ scale: 1.05, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: '8px', marginBottom: '8px' }}
          >
            <ListItem sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: 2 }}>
              <ListItemText
                primary={`${crypto.name}: $${crypto.current_price}`}
                secondary={`Market Cap: $${crypto.market_cap.toLocaleString()}`}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Container>
    </Box>
  );
};

export default TopCryptos;
