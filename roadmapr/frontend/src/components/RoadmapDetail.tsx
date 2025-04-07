import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Container, Card, CardContent } from '@mui/material';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  resource_type: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  resources: Resource[];
}

interface Roadmap {
  id: number;
  title: string;
  description: string;
  skill_level: string;
  topic: string;
  modules: Module[];
}

const RoadmapDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`http://localhost:8000/roadmaps/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/');
            return;
          }
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
  }, [id, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!roadmap) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {roadmap.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Skill Level: {roadmap.skill_level}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Topic: {roadmap.topic}
        </Typography>
        <Typography variant="body1" paragraph>
          {roadmap.description}
        </Typography>

        {roadmap.modules.map((module) => (
          <Card key={module.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {module.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {module.description}
              </Typography>

              {module.resources.map((resource) => (
                <Box key={resource.id} mb={2}>
                  <Typography variant="subtitle2">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      {resource.title}
                    </a>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {resource.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default RoadmapDetail; 