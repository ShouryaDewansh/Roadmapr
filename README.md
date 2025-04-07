# Roadmapr - AI-Powered Learning Path Generator

Roadmapr is a full-stack web application that helps users create personalized learning roadmaps for any skill or topic. It uses AI to generate structured learning paths with modules and resources.

## Features

- 🤖 AI-powered learning path generation
- 📚 Structured modules and resources
- 🎯 Skill level customization
- 📱 Modern, responsive UI
- 🔄 Real-time progress tracking
- 📝 Resource management

## Tech Stack

### Frontend
- React.js
- TypeScript
- Material-UI
- React Router

### Backend
- FastAPI
- SQLAlchemy
- OpenAI API
- SQLite

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/roadmapr.git
cd roadmapr
```

2. Set up the backend:
```bash
cd roadmapr/backend
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your OpenAI API key
```

4. Set up the frontend:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd roadmapr/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Start the frontend development server:
```bash
cd roadmapr/frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## API Documentation

The API documentation is available at `http://localhost:8000/docs` when the backend server is running.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 