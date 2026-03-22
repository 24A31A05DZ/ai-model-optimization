# AI Model Optimization

This project deploys a FastAPI backend for AI Model Optimization with a dashboard.

## Features
- FastAPI backend API
- Uvicorn server
- Dashboard route

## Requirements
- Python 3.10+
- FastAPI
- Uvicorn
- Other dependencies in `requirements.txt`

## Running Locally
```bash
pip install -r backend/requirements.txt
uvicorn backend.app:app --host 0.0.0.0 --port 10000
