# Minimal FastAPI server
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import uvicorn

app = FastAPI()

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
    # Hardcoded posts data for now
    posts = [
        {
            "id": 1,
            "area": "Free",
            "areaIcon": "faTag",
            "title": "Free Piano - Must Pick Up This Weekend",
            "description": "Upright piano in good condition. Moving and can't take it with us. You haul!",
            "author": "Sarah M.",
            "date": (datetime.now() - timedelta(hours=1)).isoformat(),
            "upvotes": 12,
            "comments": 5,
            "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
            "location": "Greenland",
            "price": None,
            "badge": "Free"
        },
        {
            "id": 2,
            "area": "Lost Pet",
            "areaIcon": "faPaw",
            "title": "Lost Cat - Orange Tabby Named Mango",
            "description": "Missing since yesterday evening. Very friendly, microchipped. Please call if seen!",
            "author": "Mike R.",
            "date": (datetime.now() - timedelta(hours=3)).isoformat(),
            "upvotes": 28,
            "comments": 8,
            "image": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
            "location": "Prairie Grove",
            "price": None,
            "badge": "Lost Pet"
        },
        {
            "id": 3,
            "area": "Food",
            "areaIcon": "faBreadSlice",
            "title": "Homemade Sourdough Bread for Sale",
            "description": "Fresh loaves baked daily. $8 each. Available for pickup or local delivery.",
            "author": "Lisa K.",
            "date": (datetime.now() - timedelta(hours=5)).isoformat(),
            "upvotes": 19,
            "comments": 12,
            "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
            "location": "Farmington",
            "price": "$8",
            "badge": "Food"
        },
        # ... more posts as needed ...
    ]
    return posts

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
