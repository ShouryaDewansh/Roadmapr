import React from 'react';
import RoadmapForm from '../components/RoadmapForm';

function CreatePath() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create Your Learning Path
        </h1>
        <div className="card">
          <RoadmapForm />
        </div>
      </div>
    </div>
  );
}

export default CreatePath; 