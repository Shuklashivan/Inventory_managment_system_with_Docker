from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.customer import Customer
from app.schemas.customer_schema import CustomerCreate

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)

@router.get("/")
def get_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()


@router.post("/")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    existing_customer = db.query(Customer).filter(
        Customer.email == customer.email
    ).first()

    if existing_customer:
        raise HTTPException(
            status_code=409,
            detail="Customer email already exists."
        )

    new_customer = Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer


@router.put("/{customer_id}")
def update_customer(
    customer_id: int,
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    existing_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not existing_customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found."
        )

    existing_customer.name = customer.name
    existing_customer.email = customer.email
    existing_customer.phone = customer.phone

    db.commit()
    db.refresh(existing_customer)

    return existing_customer


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found."
        )

    db.delete(customer)
    db.commit()

    return {
        "message": "Customer deleted successfully"
    }