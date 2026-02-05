from database import engine
from sqlmodel import Session
from models.user_model import User

with Session(engine) as session:
    user = User(username="TEST_PLAYER")
    session.add(user)
    session.commit()
    session.refresh(user)
    print("Inserted user:", user)
