from pydantic import BaseModel
from datetime import datetime

class InteractionCreate(BaseModel):
    agent_id: int
    interaction_type: str

class InteractionResponse(BaseModel):
    id: int
    user_id: int
    agent_id: int
    interaction_type: str
    created_at: datetime

    class Config:
        from_attributes = True

class RatingCreate(BaseModel):
    agent_id: int
    score: int
    review: str = ""

class RatingResponse(BaseModel):
    id: int
    user_id: int
    agent_id: int
    score: int
    review: str
    created_at: datetime

    class Config:
        from_attributes = True
