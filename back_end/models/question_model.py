from sqlmodel import SQLModel, Field
from typing import Optional

class Question(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    text: str
    choice_a: str
    choice_b: str
    choice_c: str
    choice_d: str

