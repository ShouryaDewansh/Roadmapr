# Roadmapr - AI-Powered Learning Path Generator

Roadmapr is a web application that helps users create personalized learning paths for various topics. It generates structured roadmaps with curated resources to guide your learning journey.

## Features

- Create custom learning paths for any topic
- Get structured modules with curated resources
- Track your progress through the learning path
- Clean and intuitive user interface
- Predefined templates for popular topics

## Tech Stack

### Frontend
- React
- TypeScript
- Material-UI
- TailwindCSS

### Backend
- FastAPI
- SQLAlchemy
- SQLite

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd roadmapr/backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd roadmapr/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## License

This project is licensed under the MIT License - see the LICENSE file for details. 