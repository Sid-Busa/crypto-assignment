import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Web3 from 'web3';

const MetaMaskIntegration = () => {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection error", error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  };

  return (
    <div>
      <Typography variant="h6">Connect MetaMask Wallet</Typography>
      <Button variant="contained" onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect MetaMask'}
      </Button>
    </div>
  );
};

export default MetaMaskIntegration;
