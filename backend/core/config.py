from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
from typing import List # We need this to tell Python it's a list of strings

load_dotenv() # This loads the variables from your .env file

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sentinel"
    API_V1_STR: str = "/api/v1"
    
    # ADD THIS LINE:
    # We define the list and give it defauklt values 
    THREAT_KEYWORDS: List[str] = ["error", "critical", "breach", "unauthorized", "failed"]
    # These will be pulled from your .env file
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    class Config:
        case_sensitive = True

settings = Settings()