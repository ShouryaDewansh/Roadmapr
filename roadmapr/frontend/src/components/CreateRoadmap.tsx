import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';

const CreateRoadmap: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skill_level: 'Beginner'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/roadmaps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create roadmap');
      }

      const data = await response.json();
      navigate('/');
    } catch (err) {
      console.error('Error creating roadmap:', err);
      setError(err instanceof Error ? err.message : 'Failed to create roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        fullWidth
        label="What do you want to learn?"
        value={formData.title}
        onChange={handleChange('title')}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Description"
        value={formData.description}
        onChange={handleChange('description')}
        margin="normal"
        multiline
        rows={4}
        required
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Your Current Skill Level</InputLabel>
        <Select
          value={formData.skill_level}
          onChange={handleChange('skill_level')}
          label="Your Current Skill Level"
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading || !formData.title || !formData.description}
      >
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            Generating...
          </Box>
        ) : (
          'Generate Learning Path'
        )}
      </Button>
    </Box>
  );
};

export default CreateRoadmap; 