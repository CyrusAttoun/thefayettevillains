import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    LANCEDB_URI: str = os.getenv("LANCEDB_URI", "./lancedb_data")
    LANCEDB_API_KEY: str = os.getenv("LANCEDB_API_KEY", "")
    LANCEDB_PROJECT: str = os.getenv("LANCEDB_PROJECT", "thefayettevillains")
    APP_NAME: str = os.getenv("APP_NAME", "The Fayettevillains")
    APP_VERSION: str = os.getenv("APP_VERSION", "1.0.0")

settings = Settings()