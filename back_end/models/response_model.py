from sqlmodel import SQLModel, Field, ForeignKey

class Response(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    question_id: int = Field(foreign_key="question.id")
    answer: str = Field(max_length=1)  # 'A', 'B', 'C', 'D'
