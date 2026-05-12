from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

from backend.api.schemas import ThreatResponse # Import our armor
from backend.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "sentinel.db"

@app.get("/")
async def root():
    return {"status": "Sentinel Engine Online", "version": "0.1.0"}

# Note the 'response_model' - this automatically formats our data!
@app.get("/api/threats", response_model=ThreatResponse)
def get_threats():
    """Fetches threat reports with full error shielding."""
    
    # 1. Shield: Check if DB exists
    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=404, detail="Database file not found. Run processor first.")

    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM threat_reports ORDER BY id DESC")
        rows = cursor.fetchall()
        
        # 2. Shield: Handle empty database
        if not rows:
            return {"count": 0, "reports": []}

        # Format data
        reports_list = [dict(row) for row in rows]
        conn.close()
        
        return {"count": len(reports_list), "reports": reports_list}

    except sqlite3.Error as e:
        # 3. Shield: Handle database internal errors
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")