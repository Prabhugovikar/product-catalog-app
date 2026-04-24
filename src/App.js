import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Homepage/HomePage';
import DetailPage from './Pages/Detailpage/DetailPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:itemName" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;