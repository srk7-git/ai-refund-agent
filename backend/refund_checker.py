import json

with open("data/orders.json", "r") as file:
    orders = json.load(file)

with open("data/customers.json", "r") as file:
    customers = json.load(file)


def check_refund(order_id):
    logs = []

    logs.append("Searching for order")

    for order in orders:

        if order["order_id"] == order_id:

            logs.append("Order found")

            customer_id = order["customer_id"]

            customer = None

            for c in customers:
                if c["customer_id"] == customer_id:
                    customer = c
                    break

            if customer:
                logs.append(
                    f"Customer found ({customer['loyalty_level']})"
                )

            if order["days_since_purchase"] <= 30:

                logs.append("Order within refund period")
                logs.append("Refund approved")

                return {
                    "status": "APPROVED",
                    "reason": "Your refund request has been approved because the order is within the refund period.",
                    "customer_name": customer["name"],
                    "customer_id": customer["customer_id"],
                    "loyalty_level": customer["loyalty_level"],
                    "order_id": order["order_id"],
                    "logs": logs
                }

            if (
                customer
                and customer["loyalty_level"] == "Gold"
                and order["days_since_purchase"] <= 35
            ):

                logs.append("Gold customer exception applied")
                logs.append("Refund approved")

                return {
                    "status": "APPROVED",
                    "reason": "Your refund request has been approved. A Gold customer exception was applied according to company policy.",
                    "customer_name": customer["name"],
                    "customer_id": customer["customer_id"],
                    "loyalty_level": customer["loyalty_level"],
                    "order_id": order["order_id"],
                    "logs": logs
                }

            logs.append("Refund period exceeded")
            logs.append("Refund denied")

            return {
                "status": "DENIED",
                "reason": "Your refund request cannot be approved because the order is outside the allowed refund window.",
                "customer_name": customer["name"],
                "customer_id": customer["customer_id"],
                "loyalty_level": customer["loyalty_level"],
                "order_id": order["order_id"],
                "logs": logs
            }

    logs.append("Order not found")

    return {
        "status": "NOT FOUND",
        "reason": "Order ID not found.",
        "logs": logs
    }