# AI Agent Marketplace - Backend (FastAPI)

## Quick Start

### 1. Create PostgreSQL Database
```bash
psql -U postgres
CREATE DATABASE agent_store;
\q
```

### 2. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Start Server
```bash
# Windows
start.bat

# Linux/Mac
python init_db.py
uvicorn app.main:app --reload
```

## API Endpoints

### Test Endpoints
- `GET /api/test/db-connection` - Test database connection
- `GET /api/test/cors-test` - Test CORS configuration

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Agents
- `GET /api/agents/` - List all agents
- `POST /api/agents/` - Create agent (developer only)
- `GET /api/agents/recommended` - Get recommendations
- `GET /api/agents/trending` - Get trending agents
- `GET /api/agents/{id}` - Get agent details

### Interactions
- `POST /api/interactions/track` - Track interaction
- `POST /api/interactions/ratings` - Create rating
- `GET /api/interactions/ratings?agent_id={id}` - Get ratings
- `GET /api/interactions/stats` - Get user stats

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- hashed_password
- role (developer/consumer)
- bio
- created_at

### Agents Table
- id (Primary Key)
- name
- description
- category
- developer_id (Foreign Key -> users.id)
- version
- api_endpoint
- is_active
- downloads
- average_rating
- created_at
- updated_at

### Interactions Table
- id (Primary Key)
- user_id (Foreign Key -> users.id)
- agent_id (Foreign Key -> agents.id)
- interaction_type (view/download/use)
- created_at

### Ratings Table
- id (Primary Key)
- user_id (Foreign Key -> users.id)
- agent_id (Foreign Key -> agents.id)
- score (1-5)
- review
- created_at

## Environment Variables (.env)
```
DATABASE_URL=postgresql://postgres:first123@localhost:5432/agent_store
SECRET_KEY=your-secret-key-change-in-production-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

## Testing

### Test Database Connection
```bash
python init_db.py
```

### Access API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database 'agent_store' exists
- Check credentials in .env file

### Import Errors
- Run: `pip install -r requirements.txt`

### Port Already in Use
- Change port: `uvicorn app.main:app --reload --port 8001`
