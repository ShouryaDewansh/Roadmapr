import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Container,
  Chip,
} from '@mui/material';
import { Roadmap } from '../types';

const MyRoadmaps: React.FC = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
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

    fetchRoadmaps();
  }, []);

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

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        My Learning Roadmaps
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {roadmaps.map((roadmap) => (
          <Grid item xs={12} sm={6} md={4} key={roadmap.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {roadmap.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {roadmap.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={roadmap.skill_level}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`${roadmap.modules.length} Modules`}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {roadmaps.length === 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No roadmaps found. Create your first roadmap to get started!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/create')}
            sx={{ mt: 2 }}
          >
            Create Roadmap
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MyRoadmaps; 