# Green AI Optimizer - Backend

FastAPI backend that serves the static frontend and `/optimize` API.

## Run (from project root)

```bash
cd ..
pip install -r requirements.txt
uvicorn backend.app:app --reload --port 8000
```

Then open http://localhost:8000

## Endpoints

- `GET /` — Serves `frontend/index.html`
- `GET /optimize` — Returns simulated optimization metrics (JSON)
- `GET /health` — Health check for Railway
