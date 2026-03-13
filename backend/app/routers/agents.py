from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Optional
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.agent import Agent
from app.models.interaction import Interaction
from app.schemas.agent import AgentCreate, AgentResponse

router = APIRouter(prefix="/agents", tags=["Agents"])

@router.get("/", response_model=List[AgentResponse])
def get_agents(
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        query = db.query(Agent).filter(Agent.is_active == True)
        
        if category:
            query = query.filter(Agent.category == category)
        
        if search:
            search_term = f"%{search.strip()}%"
            query = query.filter(
                (Agent.name.ilike(search_term)) | 
                (Agent.description.ilike(search_term))
            )
        
        agents = query.order_by(desc(Agent.average_rating), desc(Agent.downloads)).all()
        
        for agent in agents:
            agent.developer_name = agent.developer.username if agent.developer else "Unknown"
        
        return agents
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch agents")

@router.post("/", response_model=AgentResponse)
def create_agent(
    agent: AgentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        print(f"\n=== Agent Creation Request ===")
        print(f"User: {current_user.username} (ID: {current_user.id})")
        print(f"Role: {current_user.role}")
        print(f"Agent Data: {agent.dict()}")
        
        if current_user.role != "developer":
            print(f"❌ Access denied: User role is '{current_user.role}', not 'developer'")
            raise HTTPException(status_code=403, detail="Only developers can publish agents")
        
        print(f"✅ Role check passed")
        
        existing_agent = db.query(Agent).filter(
            Agent.name == agent.name,
            Agent.developer_id == current_user.id
        ).first()
        
        if existing_agent:
            print(f"❌ Duplicate agent name: {agent.name}")
            raise HTTPException(status_code=400, detail="You already have an agent with this name")
        
        print(f"✅ No duplicate found")
        
        new_agent = Agent(
            name=agent.name,
            description=agent.description,
            category=agent.category,
            api_endpoint=agent.api_endpoint,
            version=agent.version,
            developer_id=current_user.id
        )
        
        print(f"✅ Agent object created")
        
        db.add(new_agent)
        print(f"✅ Agent added to session")
        
        db.commit()
        print(f"✅ Changes committed to database")
        
        db.refresh(new_agent)
        print(f"✅ Agent refreshed, ID: {new_agent.id}")
        
        new_agent.developer_name = current_user.username
        
        print(f"✅ Agent created successfully!")
        print(f"=== End Agent Creation ===")
        
        return new_agent
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"❌ Error creating agent: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to create agent: {str(e)}")

@router.get("/recommended", response_model=List[AgentResponse])
def get_recommended_agents(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        user_interactions = db.query(Interaction.agent_id).filter(
            Interaction.user_id == current_user.id
        ).distinct().all()
        
        user_agent_ids = [i[0] for i in user_interactions]
        
        if not user_agent_ids:
            popular = db.query(Agent).filter(Agent.is_active == True).order_by(
                desc(Agent.downloads), desc(Agent.average_rating)
            ).limit(10).all()
            for agent in popular:
                agent.developer_name = agent.developer.username if agent.developer else "Unknown"
            return popular
        
        similar_users = db.query(Interaction.user_id).filter(
            Interaction.agent_id.in_(user_agent_ids),
            Interaction.user_id != current_user.id
        ).group_by(Interaction.user_id).order_by(
            desc(func.count(Interaction.id))
        ).limit(20).all()
        
        similar_user_ids = [u[0] for u in similar_users]
        
        if not similar_user_ids:
            popular = db.query(Agent).filter(Agent.is_active == True).order_by(
                desc(Agent.downloads), desc(Agent.average_rating)
            ).limit(10).all()
            for agent in popular:
                agent.developer_name = agent.developer.username if agent.developer else "Unknown"
            return popular
        
        recommended = db.query(Agent).join(Interaction).filter(
            Interaction.user_id.in_(similar_user_ids),
            Agent.id.notin_(user_agent_ids),
            Agent.is_active == True
        ).group_by(Agent.id).order_by(
            desc(func.count(Interaction.id))
        ).limit(10).all()
        
        for agent in recommended:
            agent.developer_name = agent.developer.username if agent.developer else "Unknown"
        
        return recommended
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch recommendations")

@router.get("/trending", response_model=List[AgentResponse])
def get_trending_agents(db: Session = Depends(get_db)):
    try:
        agents = db.query(Agent).filter(Agent.is_active == True).order_by(
            desc(Agent.downloads), desc(Agent.average_rating)
        ).limit(10).all()
        
        for agent in agents:
            agent.developer_name = agent.developer.username if agent.developer else "Unknown"
        
        return agents
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch trending agents")

@router.get("/{agent_id}", response_model=AgentResponse)
def get_agent(agent_id: int, db: Session = Depends(get_db)):
    try:
        if agent_id <= 0:
            raise HTTPException(status_code=400, detail="Invalid agent ID")
        
        agent = db.query(Agent).filter(Agent.id == agent_id).first()
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        agent.developer_name = agent.developer.username if agent.developer else "Unknown"
        return agent
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch agent")
