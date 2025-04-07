import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import RoadmapList from '../components/RoadmapList';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Roadmapr
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your AI-powered learning path generator
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
          sx={{ mt: 2 }}
        >
          Create New Roadmap
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Featured Roadmaps
        </Typography>
        <RoadmapList />
      </Box>
    </Container>
  );
};

export default Home; 