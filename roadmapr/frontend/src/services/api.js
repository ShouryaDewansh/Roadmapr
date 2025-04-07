const API_URL = 'http://localhost:8000';

export const createRoadmap = async (roadmapData) => {
  const response = await fetch(`${API_URL}/roadmaps/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roadmapData),
  });
  return response.json();
};

export const getRoadmap = async (id) => {
  const response = await fetch(`${API_URL}/roadmaps/${id}`);
  return response.json();
};

export const getRoadmaps = async () => {
  const response = await fetch(`${API_URL}/roadmaps/`);
  return response.json();
};

// New progress tracking functions
export const updateModuleProgress = async (moduleId, progressData) => {
  const response = await fetch(`${API_URL}/modules/${moduleId}/progress`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(progressData),
  });
  return response.json();
};

export const updateResourceProgress = async (resourceId, progressData) => {
  const response = await fetch(`${API_URL}/resources/${resourceId}/progress`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(progressData),
  });
  return response.json();
};

export const getModuleProgress = async (moduleId) => {
  const response = await fetch(`${API_URL}/modules/${moduleId}/progress`);
  return response.json();
};

export const getResourceProgress = async (resourceId) => {
  const response = await fetch(`${API_URL}/resources/${resourceId}/progress`);
  return response.json();
}; 