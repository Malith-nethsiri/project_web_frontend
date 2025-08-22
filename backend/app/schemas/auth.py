from pydantic import BaseModel
from typing import Optional
from .user import User

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class TokenData(BaseModel):
    email: Optional[str] = None