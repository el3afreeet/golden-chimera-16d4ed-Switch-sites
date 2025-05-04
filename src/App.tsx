import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './i18n';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Signals from './pages/Signals';
import Performance from './pages/Performance';
import Evolution from './pages/Evolution';
import Settings from './pages/Settings';

// Set the default title
document.title = 'Self-Evolving Forex AI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="signals" element={<Signals />} />
          <Route path="performance" element={<Performance />} />
          <Route path="evolution" element={<Evolution />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;