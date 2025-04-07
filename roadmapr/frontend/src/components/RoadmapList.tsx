import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Roadmap } from '../types';

const RoadmapList: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/roadmaps/');
      if (!response.ok) {
        throw new Error('Failed to fetch roadmaps');
      }
      const data = await response.json();
      setRoadmaps(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchRoadmaps}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Learning Roadmaps
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/create-path')}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1
          }}
        >
          Create New Roadmap
        </Button>
      </Box>

      <Grid container spacing={3}>
        {roadmaps.map((roadmap) => (
          <Grid item xs={12} sm={6} md={4} key={roadmap.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {roadmap.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {roadmap.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Skill Level: {roadmap.skill_level}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoadmapList; 