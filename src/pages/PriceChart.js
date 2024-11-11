import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Container } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const PriceChart = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
      }
    })
      .then((response) => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching cryptocurrency data.');
        setLoading(false);
        console.error('Error:', error);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const chartData = {
    labels: cryptoData.map(coin => coin.name),
    datasets: [
      {
        label: 'Price Movement (USD)',
        data: cryptoData.map(coin => coin.current_price),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return  <Container maxWidth="lg"><Line data={chartData} /> </Container>
};

export default PriceChart;
