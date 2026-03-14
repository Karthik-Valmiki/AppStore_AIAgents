from pydantic import BaseModel, field_validator
from typing import Optional, Literal
from datetime import datetime

class AgentBase(BaseModel):
    name: str
    description: str
    category: Literal["productivity", "analytics", "customer_service", "content", "automation", "other"]
    api_endpoint: str
    version: str = "1.0.0"
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Name cannot be empty')
        if len(v) > 100:
            raise ValueError('Name must be less than 100 characters')
        return v.strip()
    
    @field_validator('description')
    @classmethod
    def validate_description(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Description cannot be empty')
        if len(v) > 500:
            raise ValueError('Description must be less than 500 characters')
        return v.strip()
    
    @field_validator('api_endpoint')
    @classmethod
    def validate_api_endpoint(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('API endpoint cannot be empty')
        return v.strip()

class AgentCreate(AgentBase):
    pass

class AgentResponse(AgentBase):
    id: int
    developer_id: int
    developer_name: Optional[str] = None
    is_active: bool
    downloads: int
    average_rating: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
