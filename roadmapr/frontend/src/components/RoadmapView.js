import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  getRoadmap,
  updateModuleProgress,
  updateResourceProgress,
} from '../services/api';
import ProgressTracker from './ProgressTracker';

const RoadmapView = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoadmap();
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      const data = await getRoadmap(id);
      setRoadmap(data);
      setError(null);
    } catch (err) {
      setError('Failed to load roadmap');
      console.error('Error fetching roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModuleProgressUpdate = async (moduleId, progressData) => {
    try {
      await updateModuleProgress(moduleId, progressData);
      // Refresh roadmap data to get updated progress
      await fetchRoadmap();
    } catch (err) {
      setError('Failed to update module progress');
      console.error('Error updating module progress:', err);
    }
  };

  const handleResourceProgressUpdate = async (resourceId, progressData) => {
    try {
      await updateResourceProgress(resourceId, progressData);
      // Refresh roadmap data to get updated progress
      await fetchRoadmap();
    } catch (err) {
      setError('Failed to update resource progress');
      console.error('Error updating resource progress:', err);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!roadmap) {
    return (
      <Container>
        <Alert severity="info" sx={{ my: 2 }}>
          Roadmap not found
        </Alert>
      </Container>
    );
  }

  const calculateOverallProgress = () => {
    if (!roadmap.modules || roadmap.modules.length === 0) return 0;
    
    const totalModules = roadmap.modules.length;
    const completedModules = roadmap.modules.filter(
      module => module.progress?.status === 'completed'
    ).length;
    const inProgressModules = roadmap.modules.filter(
      module => module.progress?.status === 'in_progress'
    ).length;

    return Math.round(((completedModules + inProgressModules * 0.5) / totalModules) * 100);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {roadmap.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {roadmap.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Overall Progress: {calculateOverallProgress()}%
        </Typography>

        {roadmap.modules.map((module) => (
          <ProgressTracker
            key={module.id}
            module={module}
            onProgressUpdate={handleModuleProgressUpdate}
            onResourceUpdate={handleResourceProgressUpdate}
          />
        ))}
      </Box>
    </Container>
  );
};

export default RoadmapView; 