from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.routers import auth, agents, interactions, test
import logging
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Import all models before creating tables
from app.models.user import User
from app.models.agent import Agent
from app.models.interaction import Interaction, Rating

logger.info("Starting AI Agent Marketplace API...")

# Create database tables
try:
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("✅ Database tables created successfully!")
except Exception as e:
    logger.error(f"❌ Failed to create tables: {e}")
    raise

app = FastAPI(
    title="AI Agent Marketplace API",
    version="1.0.0",
    description="Professional marketplace for AI agents with smart recommendations"
)

# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600,
)

# Include routers
app.include_router(test.router, prefix="/api", tags=["Testing"])
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(agents.router, prefix="/api", tags=["Agents"])
app.include_router(interactions.router, prefix="/api", tags=["Interactions"])

@app.on_event("startup")
async def startup_event():
    logger.info("✅ API Server started successfully")
    logger.info("API Documentation: http://localhost:8000/docs")

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "AI Agent Marketplace API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }
