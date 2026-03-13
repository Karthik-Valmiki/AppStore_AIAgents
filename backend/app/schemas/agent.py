from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AgentBase(BaseModel):
    name: str
    description: str
    category: str
    api_endpoint: str
    version: str = "1.0.0"

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
