import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateRoadmap from './components/CreateRoadmap';
import RoadmapDetail from './components/RoadmapDetail';
import MyRoadmaps from './pages/MyRoadmaps';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateRoadmap />} />
            <Route path="/roadmap/:id" element={<RoadmapDetail />} />
            <Route path="/my-paths" element={<MyRoadmaps />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App; 