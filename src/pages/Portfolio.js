import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress, Box, Container } from '@mui/material';
import Web3 from 'web3';
import axios from 'axios';
import MetaMaskIntegration from './MetaMaskIntegration';

const Portfolio = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start as true
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadPortfolio = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
       
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);

          console.log("Connected account:", accounts[0]);

  
          const tokens = await getPortfolioAssets(web3, accounts[0]);
          console.log("Fetched tokens:", tokens);

      
          const assetsWithPrices = await Promise.all(
            tokens.map(async (token) => {
              const usdValue = await fetchTokenPrice(token.symbol);
              return { ...token, usdValue };
            })
          );

          setAssets(assetsWithPrices);
        } catch (error) {
          console.error("Error fetching portfolio", error);
        } finally {
          setIsLoading(false); // Set loading to false once done
        }
      } else {
        alert('MetaMask is not installed!');
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const getPortfolioAssets = async (web3, account) => {
    try {
      const ethBalance = await web3.eth.getBalance(account) / 1e18;
      console.log("ETH balance:", ethBalance);

      return [
        { symbol: 'ETH', balance: ethBalance },
        { symbol: 'DAI', balance: 50 } // Mock balance for DAI
      ];
    } catch (error) {
      console.error("Error fetching portfolio assets:", error);
      return [];
    }
  };

  const fetchTokenPrice = async (symbol) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: { ids: symbol.toLowerCase(), vs_currencies: 'usd' },
      });
      return response.data[symbol.toLowerCase()]?.usd || 0;
    } catch (error) {
      console.error(`Error fetching price for ${symbol}`, error);
      return 0;
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" >Investment Portfolio</Typography>
      </Box>
      <MetaMaskIntegration />
    
      <List>
        {assets.length > 0 ? (
          assets.map((asset, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${asset.symbol}: ${asset.balance} tokens`}
                secondary={`USD Value: $${(asset.balance * asset.usdValue).toFixed(2)}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography>No assets found in this wallet.</Typography>
        )}
      </List>
    </Container>
  );
};

export default Portfolio;
