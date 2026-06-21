from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str