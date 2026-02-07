from sqlmodel import SQLModel, Field
from typing import Optional, Dict

class Archetype(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    subtitle: str
    ds_archetype: str
    desc: str
    vibe: str
    traits: str
    target_audience: str
    image_path: str
    color: str
    bg_style: str

class UserResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    player_name: str
    answers: str  
    archetype_id: int
