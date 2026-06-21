from pydantic import BaseModel

class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int

class OrderResponse(OrderCreate):
    id: int

    class Config:
        from_attributes = True