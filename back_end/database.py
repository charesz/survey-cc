from sqlmodel import SQLModel, create_engine, Session
from models.user_model import User
from models.question_model import Question
from models.response_model import Response
from models.result_model import Result
import os

# Path to SQLite database
DB_FILE = "survey.db"
DB_URL = f"sqlite:///{DB_FILE}"

# Create engine
engine = create_engine(DB_URL, echo=True)  # echo=True for logging SQL queries

# Create a session generator
def get_session():
    with Session(engine) as session:
        yield session

# Function to create all tables
def init_db():
    if not os.path.exists(DB_FILE):
        print("Creating new database...")
    else:
        print("Database already exists, checking tables...")
    SQLModel.metadata.create_all(engine)
    print("Tables created (if they didn't exist).")
