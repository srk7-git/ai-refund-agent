# AI Refund Agent

An AI-powered customer support agent for automated e-commerce refund processing.

## Features

- Automated refund eligibility checking
- Customer loyalty-based refund exceptions
- Customer chat interface
- Admin dashboard
- Reasoning logs for decision transparency
- Customer and order database integration

## Tech Stack

### Frontend
- React
- Vite

### Backend
- FastAPI
- Python

### Data Storage
- JSON files

## Refund Logic

1. Order is searched using Order ID.
2. Customer details are retrieved.
3. If purchase is within 30 days:
   - Refund Approved
4. If customer is Gold and within 35 days:
   - Gold Customer Exception Applied
5. Otherwise:
   - Refund Denied

## Project Structure

```
backend/
├── main.py
├── refund_checker.py
├── refund_policy.txt
└── data/

frontend/
├── src/
├── public/
└── package.json
```

## Sample Test Cases

### Approved

Order ID: O1001

### Gold Exception

Order ID: O1004

### Denied

Order ID: O1002

## Future Improvements

- LLM integration (OpenAI/Grok)
- Database support
- Authentication
- Ticket generation
- Email notifications

## Author

Sivaramakrishna
