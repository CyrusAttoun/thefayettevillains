# FastAPI server with LanceDB integration
import logging
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
import traceback
from contextlib import asynccontextmanager
from .database import init_tables, get_posts as db_get_posts, get_taglines, store_image
from .config import settings

@asynccontextmanager
def lifespan(app: FastAPI):
    # Initialize logging
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s %(message)s')
    logging.getLogger().setLevel(logging.INFO)
    init_tables()
    yield
    # (Optional) Add any shutdown/cleanup logic here

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/posts")
def get_posts():
    """Get all posts from LanceDB"""
    try:
        return db_get_posts()
    except Exception as e:
        logging.error("Error fetching posts", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}\n{traceback.format_exc()}")

@app.get("/tagline")
def get_random_tagline():
    """Get a random tagline from LanceDB"""
    try:
        taglines = get_taglines()
        if not taglines:
            return {"text": "Welcome to The Fayettevillains"}
        
        random_tagline = random.choice(taglines)
        return {"text": random_tagline["text"]}
    except Exception as e:
        logging.error("Error fetching tagline", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error fetching tagline: {str(e)}\n{traceback.format_exc()}")

@app.post("/upload-image/{post_id}")
async def upload_image(post_id: int, file: UploadFile = File(...)):
    """Upload and store image for a post"""
    try:
        # Read file content
        content = await file.read()
        
        # Store in LanceDB
        image_ref = store_image(content, post_id)
        
        return {"message": "Image uploaded successfully", "image_ref": image_ref}
    except Exception as e:
        logging.error("Error uploading image", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}\n{traceback.format_exc()}")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
