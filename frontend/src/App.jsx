import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

// import Home from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>{/* <Route path="/" element={<Home />} /> */}</Routes>
    </BrowserRouter>
  );
}

export default App;
