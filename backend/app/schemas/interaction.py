from pydantic import BaseModel, field_validator
from typing import Literal
from datetime import datetime

class InteractionCreate(BaseModel):
    agent_id: int
    interaction_type: Literal["view", "download", "use"]
    
    @field_validator('agent_id')
    @classmethod
    def validate_agent_id(cls, v):
        if v <= 0:
            raise ValueError('Agent ID must be positive')
        return v

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
    
    @field_validator('agent_id')
    @classmethod
    def validate_agent_id(cls, v):
        if v <= 0:
            raise ValueError('Agent ID must be positive')
        return v
    
    @field_validator('score')
    @classmethod
    def validate_score(cls, v):
        if v < 1 or v > 5:
            raise ValueError('Score must be between 1 and 5')
        return v
    
    @field_validator('review')
    @classmethod
    def validate_review(cls, v):
        if len(v) > 1000:
            raise ValueError('Review must be less than 1000 characters')
        return v.strip()

class RatingResponse(BaseModel):
    id: int
    user_id: int
    agent_id: int
    score: int
    review: str
    created_at: datetime

    class Config:
        from_attributes = True
