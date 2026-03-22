# Green AI Optimizer — Deployment Guide

## Project Structure

```
smart-ai-eco/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── hero-branding.png
├── backend/
│   └── app.py
├── requirements.txt
├── render.yaml       # Render deployment config
├── Procfile          # Railway / generic
└── DEPLOY.md
```

## Run Locally

```bash
pip install -r requirements.txt
uvicorn backend.app:app --host 0.0.0.0 --port 10000
```

Then open http://localhost:10000

## Deploy on Render

### Option A: Using render.yaml (Blueprint)

1. Push your code to GitHub.
2. In [Render Dashboard](https://dashboard.render.com), click **New** → **Blueprint**.
3. Connect your repo and select it.
4. Render will detect `render.yaml` and create the web service.
5. Deploy.

### Option B: Manual Setup

1. Push code to GitHub.
2. In Render, click **New** → **Web Service**.
3. Connect your repo.
4. Configure:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**.

### Verify

- Visit your Render URL (e.g. `https://green-ai-optimizer.onrender.com`).
- Click **Run Optimization** in the demo — it should fetch `/optimize` and show results.
