import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Checkbox,
  TextField,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';

const ProgressTracker = ({ module, onProgressUpdate, onResourceUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(module.progress?.notes || '');
  
  const handleStatusChange = (newStatus) => {
    const completion = newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 50 : 0;
    onProgressUpdate(module.id, {
      status: newStatus,
      completion_percentage: completion,
      notes: notes,
    });
  };

  const handleResourceToggle = (resourceId, isCompleted) => {
    onResourceUpdate(resourceId, {
      is_completed: isCompleted,
    });
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleNotesSave = () => {
    onProgressUpdate(module.id, {
      notes: notes,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success.main';
      case 'in_progress':
        return 'info.main';
      default:
        return 'grey.500';
    }
  };

  return (
    <Card sx={{ mb: 2, border: 1, borderColor: getStatusColor(module.progress?.status) }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="div">
            {module.title}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={() => handleStatusChange('not_started')}
              color={module.progress?.status === 'not_started' ? 'primary' : 'default'}
            >
              <RadioButtonUncheckedIcon />
            </IconButton>
            <IconButton
              onClick={() => handleStatusChange('in_progress')}
              color={module.progress?.status === 'in_progress' ? 'info' : 'default'}
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton
              onClick={() => handleStatusChange('completed')}
              color={module.progress?.status === 'completed' ? 'success' : 'default'}
            >
              <CheckCircleIcon />
            </IconButton>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={module.progress?.completion_percentage || 0}
          sx={{ my: 2 }}
        />

        <Button
          onClick={() => setExpanded(!expanded)}
          startIcon={<ExpandMoreIcon />}
          sx={{ mb: 1 }}
        >
          {expanded ? 'Hide Details' : 'Show Details'}
        </Button>

        <Collapse in={expanded}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Resources:</Typography>
            {module.resources.map((resource) => (
              <Box
                key={resource.id}
                display="flex"
                alignItems="center"
                sx={{ my: 1 }}
              >
                <Checkbox
                  checked={resource.progress?.is_completed || false}
                  onChange={(e) => handleResourceToggle(resource.id, e.target.checked)}
                />
                <Box>
                  <Typography variant="body1">{resource.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {resource.description}
                  </Typography>
                </Box>
              </Box>
            ))}

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              value={notes}
              onChange={handleNotesChange}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleNotesSave}
              sx={{ mt: 1 }}
            >
              Save Notes
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker; 