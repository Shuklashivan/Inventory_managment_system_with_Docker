from fastapi import APIRouter
from app.schemas.auth_schema import LoginRequest

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/login")
def login(data: LoginRequest):

    if (
        data.email == "admin@example.com"
        and
        data.password == "admin123"
    ):
        return {
            "message": "Login Successful"
        }

    return {
        "message": "Invalid Credentials"
    }