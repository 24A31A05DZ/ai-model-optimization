"""
Green AI Optimizer - FastAPI Backend
Deployment-ready: serves frontend + /optimize API (simulated values, no torch)
"""

from pathlib import Path

from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Literal

# Path to frontend (works when run from project root)
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

app = FastAPI(
    title="Green AI Optimizer",
    description="Energy-efficient AI model optimization",
)


class OptimizeResponse(BaseModel):
    total_params: int
    before_pruning: int
    after_pruning: int
    percentage_reduction: float
    estimated_energy_saved: float


# Simulated model sizes (parameter counts)
MODEL_PARAMS = {
    "small": 52_426,
    "medium": 209_738,
    "large": 1_050_634,
}


def simulate_optimization(level: float, size: str) -> OptimizeResponse:
    """Simulate pruning results without PyTorch."""
    total_params = MODEL_PARAMS.get(size, MODEL_PARAMS["medium"])
    before_pruning = total_params

    # Higher level = more reduction (0% -> ~5%, 100% -> ~85%)
    reduction_pct = 5 + (level / 100) * 80
    after_pruning = int(before_pruning * (1 - reduction_pct / 100))

    percentage_reduction = round(
        (before_pruning - after_pruning) / before_pruning * 100, 2
    )
    estimated_energy_saved = round(min(percentage_reduction * 1.15, 99.9), 1)

    return OptimizeResponse(
        total_params=total_params,
        before_pruning=before_pruning,
        after_pruning=after_pruning,
        percentage_reduction=percentage_reduction,
        estimated_energy_saved=estimated_energy_saved,
    )


# API route - must be defined before static mount
@app.get("/optimize", response_model=OptimizeResponse)
def optimize(
    optimization_level: float = Query(50, ge=0, le=100),
    model_size: Literal["small", "medium", "large"] = Query("medium"),
):
    """Return simulated optimization metrics."""
    return simulate_optimization(optimization_level, model_size)


# Health check for Railway
@app.get("/health")
def health():
    return {"status": "ok"}


# Serve frontend static files (index.html, CSS, JS, images)
# Must be last so /optimize and /health take precedence
if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="static")
else:

    @app.get("/")
    def root():
        return {"error": "Frontend not found", "status": "backend-only"}
