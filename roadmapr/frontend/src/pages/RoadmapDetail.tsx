import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import { Roadmap, Module } from '../types';

const RoadmapDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`http://localhost:8000/roadmaps/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap');
        }
        const data = await response.json();
        setRoadmap(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!roadmap) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning" sx={{ mt: 2 }}>
          Roadmap not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {roadmap.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Skill Level: {roadmap.skill_level}
        </Typography>
        <Typography variant="body1" paragraph>
          {roadmap.description}
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {roadmap.modules.map((module: Module, index: number) => (
            <Step key={module.id}>
              <StepLabel>
                <Typography variant="h6">{module.title}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body1" paragraph>
                  {module.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === roadmap.modules.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Container>
  );
};

export default RoadmapDetail; 