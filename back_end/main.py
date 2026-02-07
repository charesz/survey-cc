from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine, select
from pydantic import BaseModel
from typing import Dict
import json

# Database setup
DATABASE_URL = "sqlite:///./survey.db"
engine = create_engine(DATABASE_URL, echo=True)

# --- Models ---
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
    id: int = Field(default=None, primary_key=True)
    player_name: str
    answers: str  # store as JSON string
    archetype_id: int

# Create tables
SQLModel.metadata.create_all(engine)

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic model for input ---
class ResultInput(BaseModel):
    playerName: str
    answers: Dict[str, str]  # keys like "q1", values like "A", "B", etc.
    archetype_id: int


# --- Seed archetypes ---
import seed_data  # make sure seed_data.py has `classData = [ {...}, {...}, ... ]`
with Session(engine) as session:
    existing = session.exec(select(Archetype)).all()
    if len(existing) == 0:
        for arch in seed_data.classData:
            session.add(Archetype(**arch))
        session.commit()

# --- Endpoints ---
@app.get("/archetypes")
def get_archetypes():
    with Session(engine) as session:
        result = session.exec(select(Archetype)).all()
        return [arch.dict() for arch in result]

@app.post("/results")
def save_result(data: ResultInput):
    print("Received data:", data)
    with Session(engine) as session:
        result = UserResult(
            player_name=data.playerName,
            answers=json.dumps(data.answers),
            archetype_id=data.archetype_id
        )
        session.add(result)
        session.commit()
        session.refresh(result)
        return {"status": "success", "id": result.id}
