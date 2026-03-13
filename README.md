# 🤖 AI Agent Marketplace

Professional marketplace for AI agents with smart recommendations, voice search, and role-based authentication.

## ✨ Features

- **Smart Recommendations**: Collaborative filtering based on user interactions
- **Voice Search**: Speech recognition for hands-free browsing (Chrome only)
- **Role-Based Authentication**: Separate interfaces for developers and consumers
- **Agent Publishing**: Developers can publish and manage agents
- **Usage Analytics**: Track downloads, ratings, and interactions
- **Real-time Stats**: View performance metrics and user engagement

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM for database operations
- **JWT** - Token-based authentication
- **scikit-learn** - Machine learning for recommendations

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Web Speech API** - Voice recognition

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+

## 🚀 Quick Start

### Option 1: Automatic Setup (Windows)

1. **Create PostgreSQL Database**
```bash
psql -U postgres
CREATE DATABASE agent_store;
\q
```

2. **Run Startup Script**
```bash
START_ALL.bat
```

This will:
- Initialize the database
- Start backend server (http://localhost:8000)
- Start frontend server (http://localhost:3000)

### Option 2: Manual Setup

#### Backend Setup

1. **Create Database**
```bash
psql -U postgres
CREATE DATABASE agent_store;
\q
```

2. **Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

3. **Initialize Database**
```bash
python init_db.py
```

4. **Start Server**
```bash
uvicorn app.main:app --reload
```

Backend runs on: http://localhost:8000
API Docs: http://localhost:8000/docs

#### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

Frontend runs on: http://localhost:3000

## 📖 Usage Guide

### 1. Register an Account

- Go to http://localhost:3000/login
- Click "Create one" to register
- Choose your role:
  - **Consumer**: Browse and use AI agents
  - **Developer**: Publish and manage agents

### 2. As a Consumer

- **Browse Marketplace**: View all available agents
- **Filter by Category**: Click category buttons to filter
- **Search**: Type keywords or use voice search (🎤 button)
- **View Recommendations**: See personalized agent suggestions
- **Rate Agents**: Provide feedback on agents you use

### 3. As a Developer

- **Access Dashboard**: Click "Dashboard" in navbar
- **View Statistics**: See your agent performance metrics
- **Publish Agent**: Fill out the form with agent details
- **Manage Agents**: View all your published agents
- **Track Performance**: Monitor downloads and ratings

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Agents
- `GET /api/agents/` - List all agents (with filters)
- `POST /api/agents/` - Publish agent (developer only)
- `GET /api/agents/recommended` - Get personalized recommendations
- `GET /api/agents/trending` - Get trending agents
- `GET /api/agents/{id}` - Get agent details

### Interactions
- `POST /api/interactions/track` - Track user interaction
- `POST /api/interactions/ratings` - Rate an agent
- `GET /api/interactions/ratings?agent_id={id}` - Get agent ratings
- `GET /api/interactions/stats` - Get user statistics

### Testing
- `GET /api/test/db-connection` - Test database connection
- `GET /api/test/cors-test` - Test CORS configuration

## 🗄️ Database Schema

### Users
- id, username, email, hashed_password, role, bio, created_at

### Agents
- id, name, description, category, developer_id, version, api_endpoint, is_active, downloads, average_rating, created_at, updated_at

### Interactions
- id, user_id, agent_id, interaction_type, created_at

### Ratings
- id, user_id, agent_id, score, review, created_at

## 🔧 Configuration

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:first123@localhost:5432/agent_store
SECRET_KEY=your-secret-key-change-in-production-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### Frontend
API URL configured in `frontend/src/services/api.js`:
```javascript
const API_URL = 'http://localhost:8000/api';
```

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed**
- Ensure PostgreSQL is running
- Verify database 'agent_store' exists
- Check credentials in .env file

**Import Errors**
```bash
pip install -r requirements.txt
```

**Port Already in Use**
```bash
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**npm install fails**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 in use**
Edit `vite.config.js` and change port

**Voice search not working**
- Use Google Chrome
- Allow microphone permissions

**API connection fails**
- Ensure backend is running
- Check browser console for errors
- Verify CORS settings

## 📁 Project Structure

```
AppStore_AIAgents/
├── backend/
│   ├── app/
│   │   ├── core/          # Database, security, dependencies
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routers/       # API endpoints
│   │   ├── schemas/       # Pydantic schemas
│   │   └── main.py        # FastAPI application
│   ├── .env               # Environment variables
│   ├── requirements.txt   # Python dependencies
│   ├── init_db.py        # Database initialization
│   └── start.bat         # Startup script
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── styles/       # CSS styles
│   ├── package.json      # Node dependencies
│   └── vite.config.js    # Vite configuration
├── START_ALL.bat         # Start both servers
└── README.md            # This file
```

## 🎯 Development

### Backend Hot Reload
```bash
cd backend
uvicorn app.main:app --reload
```

### Frontend Hot Reload
```bash
cd frontend
npm run dev
```

### Production Build
```bash
cd frontend
npm run build
```

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📧 Support

For issues and questions, please check:
- Backend logs in terminal
- Frontend console in browser
- API documentation at http://localhost:8000/docs

---

**Made with ❤️ for AI Agent Marketplace**
