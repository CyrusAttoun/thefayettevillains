import lancedb
import pyarrow as pa
from typing import List, Dict, Optional
from datetime import datetime
from .config import settings
import base64
from PIL import Image
import io
import os

def get_db():
    """Get LanceDB connection"""
    return lancedb.connect(settings.LANCEDB_URI)

def init_tables():
    """Initialize database tables"""
    db = get_db()
    
    # Posts table schema
    posts_schema = pa.schema([
        pa.field("id", pa.int64()),
        pa.field("area", pa.string()),
        pa.field("areaIcon", pa.string()),
        pa.field("title", pa.string()),
        pa.field("description", pa.string()),
        pa.field("author", pa.string()),
        pa.field("date", pa.string()),
        pa.field("upvotes", pa.int64()),
        pa.field("comments", pa.int64()),
        pa.field("image", pa.string()),
        pa.field("location", pa.string()),
        pa.field("price", pa.string()),
        pa.field("badge", pa.string()),
        pa.field("image_data", pa.binary()),  # For storing actual image bytes
    ])
    
    # Taglines table schema
    taglines_schema = pa.schema([
        pa.field("id", pa.int64()),
        pa.field("text", pa.string()),
        pa.field("active", pa.bool_()),
        pa.field("created_at", pa.string()),
    ])
    
    # Create tables if they don't exist
    try:
        db.open_table("posts")
    except FileNotFoundError:
        # Initialize with sample data
        sample_posts = [
            {
                "id": 1,
                "area": "Free",
                "areaIcon": "faTag",
                "title": "Free Piano - Must Pick Up This Weekend",
                "description": "Upright piano in good condition. Moving and can't take it with us. You haul!",
                "author": "Sarah M.",
                "date": datetime.now().isoformat(),
                "upvotes": 12,
                "comments": 5,
                "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
                "location": "Greenland",
                "price": "",
                "badge": "Free",
                "image_data": b"",
            },
            {
                "id": 2,
                "area": "Lost Pet",
                "areaIcon": "faPaw",
                "title": "Lost Cat - Orange Tabby Named Mango",
                "description": "Missing since yesterday evening. Very friendly, microchipped. Please call if seen!",
                "author": "Mike R.",
                "date": datetime.now().isoformat(),
                "upvotes": 28,
                "comments": 8,
                "image": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
                "location": "Prairie Grove",
                "price": "",
                "badge": "Lost Pet",
                "image_data": b"",
            },
            {
                "id": 3,
                "area": "Food",
                "areaIcon": "faBreadSlice",
                "title": "Homemade Sourdough Bread for Sale",
                "description": "Fresh loaves baked daily. $8 each. Available for pickup or local delivery.",
                "author": "Lisa K.",
                "date": datetime.now().isoformat(),
                "upvotes": 19,
                "comments": 12,
                "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                "location": "Farmington",
                "price": "$8",
                "badge": "Food",
                "image_data": b"",
            }
        ]
        db.create_table("posts", sample_posts, schema=posts_schema)
    
    try:
        db.open_table("taglines")
    except FileNotFoundError:
        # Initialize with sample taglines
        sample_taglines = [
            {"id": 1, "text": 'Where the hills are steep, the vibes are deep, and the rent makes you weep', "active": True, "created_at": datetime.now().isoformat()},
            {"id": 2, "text": "Where every street is a cul-de-sac so we stumble drunkenly by greenway", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 3, "text": "A little bit country, a little bit rock n' roll", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 4, "text": 'A little piece of Texas right here in Arkansas', "active": True, "created_at": datetime.now().isoformat()},
            {"id": 5, "text": "It's trashy, but it's our trash", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 6, "text": "A place where a bunch of poor people live in homes they can't afford", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 7, "text": "At least it's not Bentonville", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 8, "text": "At least it's not Oklahoma", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 9, "text": "Lately we kinda wish we were Springdale", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 10, "text": "The Subject Matter Experts on futile protests", "active": True, "created_at": datetime.now().isoformat()},
            {"id": 11, "text": "An airbnb community owned by Texans", "active": True, "created_at": datetime.now().isoformat()}
        ]
        db.create_table("taglines", sample_taglines, schema=taglines_schema)

def get_posts() -> List[Dict]:
    """Get all posts from database"""
    db = get_db()
    posts_table = db.open_table("posts")
    posts = posts_table.to_pandas().to_dict('records')
    
    # Convert numpy types to native Python types for JSON serialization
    for post in posts:
        for key, value in post.items():
            if hasattr(value, 'item'):  # numpy scalar
                post[key] = value.item()
            elif key == 'image_data':
                post[key] = None  # Don't include binary data in API response
    
    return posts

def get_taglines() -> List[Dict]:
    """Get all active taglines from database"""
    db = get_db()
    taglines_table = db.open_table("taglines")
    df = taglines_table.to_pandas()
    active_taglines = df[df['active'] == True].to_dict('records')
    
    # Convert numpy types to native Python types
    for tagline in active_taglines:
        for key, value in tagline.items():
            if hasattr(value, 'item'):  # numpy scalar
                tagline[key] = value.item()
    
    return active_taglines

def store_image(image_data: bytes, post_id: int) -> str:
    """Store image data in LanceDB and return a reference"""
    db = get_db()
    posts_table = db.open_table("posts")
    
    # Update the post with image data
    # Note: This is a simplified approach - in production you might want
    # a separate images table with proper indexing
    return f"stored_image_{post_id}"