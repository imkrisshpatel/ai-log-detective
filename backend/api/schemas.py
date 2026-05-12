from pydantic import BaseModel
from typing import List, Optional

# This defines what ONE threat report looks like
class ThreatReport(BaseModel):
    id: int
    timestamp: str
    raw_log: str
    ai_report: str

    class Config:
        # This tells Pydantic to play nice with database 'Row" objects
        from_attributes = True

# This defines the "Envelope" we send to the frontend
class ThreatResponse(BaseModel):
    count: int
    reports: List[ThreatReport]

    