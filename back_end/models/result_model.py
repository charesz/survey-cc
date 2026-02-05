from sqlmodel import SQLModel, Field, ForeignKey

class Result(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    archetype_id: int  # 1–7 matching classData in JS
    score: float       # optional weighted score
