import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoadmapForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillLevel: 'Beginner',
    timeCommitment: '5'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/roadmaps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          skill_level: formData.skillLevel,
          time_commitment: formData.timeCommitment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create roadmap');
      }

      const data = await response.json();
      // Navigate to the roadmap view page with the created roadmap ID
      navigate(`/roadmap/${data.id}`);
    } catch (error) {
      console.error('Error creating roadmap:', error);
      alert('Failed to create roadmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          What do you want to learn?
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field mt-1"
          placeholder="e.g., Python Programming"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-field mt-1"
          rows="3"
          placeholder="Brief description of your learning goal"
        />
      </div>

      <div>
        <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
          Your Current Skill Level
        </label>
        <select
          id="skillLevel"
          name="skillLevel"
          value={formData.skillLevel}
          onChange={handleChange}
          className="input-field mt-1"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label htmlFor="timeCommitment" className="block text-sm font-medium text-gray-700">
          Hours per week you can commit
        </label>
        <select
          id="timeCommitment"
          name="timeCommitment"
          value={formData.timeCommitment}
          onChange={handleChange}
          className="input-field mt-1"
        >
          <option value="5">5 hours</option>
          <option value="10">10 hours</option>
          <option value="15">15 hours</option>
          <option value="20">20 hours</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn-primary w-full flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            Generating...
            <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        ) : (
          'Generate Learning Path'
        )}
      </button>
    </form>
  );
}

export default RoadmapForm; 