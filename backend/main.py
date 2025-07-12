from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from database import engine
from models import Base
from auth.routes import router as auth_router
from routers import users, requests

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)
app.include_router(users.router)
app.include_router(requests.router)


@app.get("/")
def root():
    return {"message": "Welcome to Skill Swap API"}

# 👇 Add this OpenAPI override to fix Auth UI
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Skill Swap API",
        version="1.0.0",
        description="API for skill swap platform",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"]:
        for method in openapi_schema["paths"][path]:
            operation = openapi_schema["paths"][path][method]
            operation.setdefault("security", []).append({"BearerAuth": []})
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
