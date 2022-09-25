import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ApiPinger from './components/apiPinger';

function App() {
  return (
    <ApiPinger>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ApiPinger>
  );
}

export default App;
