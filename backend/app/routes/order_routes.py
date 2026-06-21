from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.product import Product
from app.models.customer import Customer
from app.schemas.order_schema import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@router.post("/")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):

    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found."
        )

    product = db.query(Product).filter(
        Product.id == order.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    if product.stock < order.quantity:
        raise HTTPException(
            status_code=409,
            detail="Insufficient stock."
        )

    product.stock -= order.quantity

    new_order = Order(
        customer_id=order.customer_id,
        product_id=order.product_id,
        quantity=order.quantity
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order