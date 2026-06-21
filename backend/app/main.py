from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.user import User

from app.routes.product_routes import router as product_router
from app.routes.customer_routes import router as customer_router
from app.routes.order_routes import router as order_router
from app.routes.auth_routes import router as auth_router

from time import sleep

sleep(10)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://inventory-frontend-kbwi.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "Inventory Management System Running"
    }