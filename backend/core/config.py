from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv() # This loads the variables from your .env file

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sentinel"
    API_V1_STR: str = "/api/v1"
    
    # These will be pulled from your .env file
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    class Config:
        case_sensitive = True

settings = Settings()