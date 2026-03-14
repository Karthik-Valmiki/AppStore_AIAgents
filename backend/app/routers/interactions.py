from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.agent import Agent
from app.models.interaction import Interaction, Rating
from app.schemas.interaction import InteractionCreate, InteractionResponse, RatingCreate, RatingResponse

router = APIRouter(prefix="/interactions", tags=["Interactions"])

@router.post("/track", response_model=InteractionResponse)
def track_interaction(
    interaction: InteractionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        agent = db.query(Agent).filter(Agent.id == interaction.agent_id).first()
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        new_interaction = Interaction(
            user_id=current_user.id,
            agent_id=interaction.agent_id,
            interaction_type=interaction.interaction_type
        )
        db.add(new_interaction)
        
        if interaction.interaction_type == "download":
            agent.downloads += 1
        
        db.commit()
        db.refresh(new_interaction)
        return new_interaction
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to track interaction")

@router.post("/ratings", response_model=RatingResponse)
def create_rating(
    rating: RatingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        agent = db.query(Agent).filter(Agent.id == rating.agent_id).first()
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        existing_rating = db.query(Rating).filter(
            Rating.user_id == current_user.id,
            Rating.agent_id == rating.agent_id
        ).first()
        
        if existing_rating:
            existing_rating.score = rating.score
            existing_rating.review = rating.review
            db.commit()
            db.refresh(existing_rating)
            new_rating = existing_rating
        else:
            new_rating = Rating(
                user_id=current_user.id,
                agent_id=rating.agent_id,
                score=rating.score,
                review=rating.review
            )
            db.add(new_rating)
            db.commit()
            db.refresh(new_rating)
        
        avg_rating = db.query(func.avg(Rating.score)).filter(
            Rating.agent_id == rating.agent_id
        ).scalar()
        
        if avg_rating:
            agent.average_rating = round(float(avg_rating), 2)
            db.commit()
        
        return new_rating
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create rating")

@router.get("/ratings", response_model=List[RatingResponse])
def get_ratings(agent_id: int = None, db: Session = Depends(get_db)):
    try:
        query = db.query(Rating)
        if agent_id:
            if agent_id <= 0:
                raise HTTPException(status_code=400, detail="Invalid agent ID")
            query = query.filter(Rating.agent_id == agent_id)
        return query.order_by(desc(Rating.created_at)).all()
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch ratings")

@router.get("/stats")
def get_user_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        interactions_count = db.query(Interaction).filter(
            Interaction.user_id == current_user.id
        ).count()
        
        ratings_count = db.query(Rating).filter(
            Rating.user_id == current_user.id
        ).count()
        
        if current_user.role == "developer":
            agents_published = db.query(Agent).filter(
                Agent.developer_id == current_user.id
            ).count()
            
            total_downloads = db.query(func.sum(Agent.downloads)).filter(
                Agent.developer_id == current_user.id
            ).scalar() or 0
            
            return {
                "agents_published": agents_published,
                "total_downloads": int(total_downloads),
                "interactions": interactions_count,
                "ratings_given": ratings_count
            }
        
        return {
            "interactions": interactions_count,
            "ratings_given": ratings_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch stats")
