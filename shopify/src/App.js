import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Product from './components/Product';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
