from sqlmodel import SQLModel, create_engine, Session

# --- Database configuration ---
DATABASE_URL = "sqlite:///./survey.db"
engine = create_engine(DATABASE_URL, echo=True)

# --- Optional helper function to create sessions ---
def get_session():
    return Session(engine)

