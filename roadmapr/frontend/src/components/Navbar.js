import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Roadmapr</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-primary-600">
              Home
            </Link>
            <Link to="/create-path" className="text-gray-600 hover:text-primary-600">
              Create Path
            </Link>
            <Link to="/my-paths" className="text-gray-600 hover:text-primary-600">
              My Paths
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 