# Green AI Optimizer — Railway Deployment

## Project Structure

```
smart-ai-eco/
├── backend/
│   └── app.py          # FastAPI app (serves frontend + /optimize API)
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── hero-branding.png
├── requirements.txt    # fastapi, uvicorn (no torch)
├── Procfile
├── nixpacks.toml       # Forces Python build
├── runtime.txt         # python-3.11
└── railway.toml        # Railway config
```

## Step-by-Step Redeploy on Railway

### 1. Commit and push changes

```bash
git add .
git status   # Verify no package.json, node_modules
git commit -m "Convert to pure Python FastAPI deployment"
git push origin main
```

### 2. In Railway dashboard

- Open your project
- Go to **Settings** → **Build**
- Ensure **Root Directory** is `.` (project root)
- **Builder**: Nixpacks (default)
- **Build Command**: (leave empty — Nixpacks uses `nixpacks.toml`)
- **Start Command**: `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`

### 3. Environment variables

- `PORT` is set by Railway automatically — no action needed

### 4. Redeploy

- Click **Deploy** or push to trigger a new build
- Railway will detect `requirements.txt` and `nixpacks.toml` → Python build
- No Caddy or Node — only FastAPI serves the app

### 5. Verify

- Visit your Railway URL
- You should see the Green AI Optimizer hero and demo
- Click **Run Optimization** — it should fetch `/optimize` and display results

---

## Local run

```bash
cd smart-ai-eco
pip install -r requirements.txt
uvicorn backend.app:app --reload --port 8000
```

Then open http://localhost:8000

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 500 error / Caddy | Ensure `package.json` is deleted and `nixpacks.toml` exists |
| Module not found | Run from project root; `backend.app` assumes root cwd |
| Static files 404 | Confirm `frontend/` has index.html, styles.css, app.js |
| `node_modules` in deploy | Add `node_modules` to `.gitignore` (already done) |
