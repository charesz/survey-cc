from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./quiz.db"
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    from models import Archetype
    SQLModel.metadata.create_all(engine)
