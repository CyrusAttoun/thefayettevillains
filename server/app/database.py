import lancedb
import pyarrow as pa
from typing import List, Dict, Optional
from datetime import datetime
from .config import settings
import base64
from PIL import Image
import io
import os
from .columns import PostColumns, TaglineColumns

def get_db():
    """Get LanceDB connection"""
    return lancedb.connect(settings.LANCEDB_URI)

def init_tables():
    """Initialize database tables"""
    db = get_db()
    
    # Posts table schema
    posts_schema = pa.schema([
        pa.field(PostColumns.ID, pa.int64()),
        pa.field(PostColumns.AREA, pa.string()),
        pa.field(PostColumns.AREA_ICON, pa.string()),
        pa.field(PostColumns.TITLE, pa.string()),
        pa.field(PostColumns.DESCRIPTION, pa.string()),
        pa.field(PostColumns.AUTHOR, pa.string()),
        pa.field(PostColumns.DATE, pa.string()),
        pa.field(PostColumns.UPVOTES, pa.int64()),
        pa.field(PostColumns.COMMENTS, pa.int64()),
        pa.field(PostColumns.IMAGE, pa.string()),
        pa.field(PostColumns.LOCATION, pa.string()),
        pa.field(PostColumns.PRICE, pa.string()),
        pa.field(PostColumns.BADGE, pa.string()),
        pa.field(PostColumns.IMAGE_DATA, pa.binary()),  # For storing actual image bytes
    ])
    
    # Taglines table schema
    taglines_schema = pa.schema([
        pa.field(TaglineColumns.ID, pa.int64()),
        pa.field(TaglineColumns.TEXT, pa.string()),
        pa.field(TaglineColumns.ACTIVE, pa.bool_()),
        pa.field(TaglineColumns.CREATED_AT, pa.string()),
    ])
    
    # Create tables if they don't exist
    try:
        db.open_table("posts")
    except FileNotFoundError:
        # Initialize with sample data
        sample_posts = [
            {
                PostColumns.ID: 1,
                PostColumns.AREA: "Free",
                PostColumns.AREA_ICON: "faTag",
                PostColumns.TITLE: "Free Piano - Must Pick Up This Weekend",
                PostColumns.DESCRIPTION: "Upright piano in good condition. Moving and can't take it with us. You haul!",
                PostColumns.AUTHOR: "Sarah M.",
                PostColumns.DATE: datetime.now().isoformat(),
                PostColumns.UPVOTES: 12,
                PostColumns.COMMENTS: 5,
                PostColumns.IMAGE: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
                PostColumns.LOCATION: "Greenland",
                PostColumns.PRICE: "",
                PostColumns.BADGE: "Free",
                PostColumns.IMAGE_DATA: b"",
            },
            {
                PostColumns.ID: 2,
                PostColumns.AREA: "Lost Pet",
                PostColumns.AREA_ICON: "faPaw",
                PostColumns.TITLE: "Lost Cat - Orange Tabby Named Mango",
                PostColumns.DESCRIPTION: "Missing since yesterday evening. Very friendly, microchipped. Please call if seen!",
                PostColumns.AUTHOR: "Mike R.",
                PostColumns.DATE: datetime.now().isoformat(),
                PostColumns.UPVOTES: 28,
                PostColumns.COMMENTS: 8,
                PostColumns.IMAGE: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
                PostColumns.LOCATION: "Prairie Grove",
                PostColumns.PRICE: "",
                PostColumns.BADGE: "Lost Pet",
                PostColumns.IMAGE_DATA: b"",
            },
            {
                PostColumns.ID: 3,
                PostColumns.AREA: "Food",
                PostColumns.AREA_ICON: "faBreadSlice",
                PostColumns.TITLE: "Homemade Sourdough Bread for Sale",
                PostColumns.DESCRIPTION: "Fresh loaves baked daily. $8 each. Available for pickup or local delivery.",
                PostColumns.AUTHOR: "Lisa K.",
                PostColumns.DATE: datetime.now().isoformat(),
                PostColumns.UPVOTES: 19,
                PostColumns.COMMENTS: 12,
                PostColumns.IMAGE: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                PostColumns.LOCATION: "Farmington",
                PostColumns.PRICE: "$8",
                PostColumns.BADGE: "Food",
                PostColumns.IMAGE_DATA: b"",
            }
        ]
        db.create_table("posts", sample_posts, schema=posts_schema)
    
    try:
        db.open_table("taglines")
    except FileNotFoundError:
        # Initialize with sample taglines
        sample_taglines = [
            {TaglineColumns.ID: 1, TaglineColumns.TEXT: 'Where the hills are steep, the vibes are deep, and the rent makes you weep', TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 2, TaglineColumns.TEXT: "Where every street is a cul-de-sac so we stumble drunkenly by greenway", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 3, TaglineColumns.TEXT: "A little bit country, a little bit rock n' roll", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 4, TaglineColumns.TEXT: 'A little piece of Texas right here in Arkansas', TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 5, TaglineColumns.TEXT: "It's trashy, but it's our trash", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 6, TaglineColumns.TEXT: "A place where a bunch of poor people live in homes they can't afford", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 7, TaglineColumns.TEXT: "At least it's not Bentonville", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 8, TaglineColumns.TEXT: "At least it's not Oklahoma", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 9, TaglineColumns.TEXT: "Lately we kinda wish we were Springdale", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 10, TaglineColumns.TEXT: "The Subject Matter Experts on futile protests", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()},
            {TaglineColumns.ID: 11, TaglineColumns.TEXT: "An airbnb community owned by Texans", TaglineColumns.ACTIVE: True, TaglineColumns.CREATED_AT: datetime.now().isoformat()}
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
            elif key == PostColumns.IMAGE_DATA:
                post[key] = None  # Don't include binary data in API response
    
    return posts

def get_taglines() -> List[Dict]:
    """Get all active taglines from database"""
    db = get_db()
    taglines_table = db.open_table("taglines")
    df = taglines_table.to_pandas()
    active_taglines = df[df[TaglineColumns.ACTIVE] == True].to_dict('records')
    
    # Convert numpy types to native Python types
    for tagline in active_taglines:
        for key, value in tagline.items():
            if hasattr(value, 'item'):  # numpy scalar
                tagline[key] = value.item()
    
    return active_taglines

def store_image(image_data: bytes, post_id: int) -> str:
    """Store image data in LanceDB and return a reference (updates the post's image_data column)"""
    db = get_db()
    posts_table = db.open_table("posts")

    # Use LanceDB's update method for in-place update
    where = f"{PostColumns.ID} = {post_id}"
    values = {PostColumns.IMAGE_DATA: image_data}
    result = posts_table.update(where=where, values=values)

    # Return a reference string (could be a URL or ID, here just a status string)
    return f"image_data_stored_for_post_{post_id}"