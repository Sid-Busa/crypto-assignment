import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import TopCryptos from './pages/TopCryptos';
import PriceChart from './pages/PriceChart';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';


function App() {
  return (
    <Router>
      <CssBaseline />
      {/* <Header /> */}
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route  path="/" element={<Header />}>
            <Route Route  path="" element={<ProtectedRoute />}>
              <Route path="home" element={<Home />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="top-cryptos" element={<TopCryptos />} />
              <Route path="price-chart" element={<PriceChart />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      
    </Router>
  );
}

export default App;
