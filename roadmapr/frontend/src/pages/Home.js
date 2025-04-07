import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Your Personalized Learning Journey Starts Here
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Generate customized learning paths for any topic, complete with curated resources and a flexible timeline that fits your schedule.
        </p>
        <Link to="/create-path" className="btn-primary text-lg">
          Create Your Learning Path
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="card text-center">
          <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
          <p className="text-gray-600">
            Get a clear, step-by-step roadmap tailored to your goals and skill level.
          </p>
        </div>

        <div className="card text-center">
          <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-600">
            Monitor your progress and stay motivated with visual tracking tools.
          </p>
        </div>

        <div className="card text-center">
          <h3 className="text-xl font-semibold mb-2">Flexible Timeline</h3>
          <p className="text-gray-600">
            Adjust your learning schedule to fit your busy student life.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-primary-50 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands of students who are already using Roadmapr to master new skills.
        </p>
        <Link to="/create-path" className="btn-primary">
          Get Started Now
        </Link>
      </section>
    </div>
  );
}

export default Home; 