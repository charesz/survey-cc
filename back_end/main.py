from fastapi import FastAPI
from database import init_db
from routers import auth_router, question_router, response_router, result_router

app = FastAPI(title="Survey API")

# Initialize database
init_db()

# Include routers
app.include_router(auth_router.router)
app.include_router(question_router.router)
app.include_router(response_router.router)
app.include_router(result_router.router)
