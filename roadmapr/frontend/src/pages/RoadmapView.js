import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RoadmapView() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Roadmap not found</h2>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{roadmap.title}</h1>
        <p className="text-gray-600 mb-8">{roadmap.description}</p>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6">Your Learning Path</h2>
          
          <div className="space-y-6">
            {roadmap.modules?.map((module, index) => (
              <div key={module.id} className="border-l-4 border-blue-500 pl-4">
                <div className="mb-4">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center mb-2">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                  <p className="text-gray-600">{module.description}</p>
                  <p className="text-sm text-gray-500">Estimated time: {module.estimated_time}</p>
                </div>
                
                <div className="space-y-2">
                  {module.resources?.map((resource) => (
                    <div key={resource.id} className="ml-4">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        → {resource.title}
                      </a>
                      <p className="text-sm text-gray-500">{resource.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapView; 