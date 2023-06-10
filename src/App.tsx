import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamsPage } from './pages/teams';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeamsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
