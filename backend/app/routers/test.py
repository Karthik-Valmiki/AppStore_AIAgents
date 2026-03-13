from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.models.agent import Agent

router = APIRouter(prefix="/test", tags=["Testing"])

@router.get("/db-connection")
def test_db_connection(db: Session = Depends(get_db)):
    try:
        user_count = db.query(User).count()
        agent_count = db.query(Agent).count()
        return {
            "status": "success",
            "message": "Database connected successfully",
            "users": user_count,
            "agents": agent_count
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@router.get("/cors-test")
def test_cors():
    return {
        "status": "success",
        "message": "CORS is working",
        "frontend_can_access": True
    }
