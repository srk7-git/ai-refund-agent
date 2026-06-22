from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from refund_checker import check_refund

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Refund Agent Backend Running"}

@app.get("/refund/{order_id}")
def refund(order_id: str):
    return check_refund(order_id)