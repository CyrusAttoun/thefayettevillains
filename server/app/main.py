# FastAPI server with LanceDB integration
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
from .database import init_tables, get_posts as db_get_posts, get_taglines, store_image
from .config import settings

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables on startup
@app.on_event("startup")
async def startup_event():
    init_tables()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/posts")
def get_posts():
    """Get all posts from LanceDB"""
    try:
        return db_get_posts()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}")

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
        raise HTTPException(status_code=500, detail=f"Error fetching tagline: {str(e)}")

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
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
