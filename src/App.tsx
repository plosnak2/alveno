import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamsPage } from './pages/teams';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TeamsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
