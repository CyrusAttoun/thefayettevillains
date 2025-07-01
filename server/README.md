# Server

This is the Python backend for thefayettevillains.

## Local Setup

I think you just need to do a 'poetry add' and go.
Without configuration, data will be stored in a local lancedb store 
If you would prefer, set your .env to a deployed cloud instance:
```
LANCEDB_API_KEY=your api key from lancedb
LANCEDB_URI=the uri to the lancedb db (eg, db://thefayettevillains-.....)
```

## Configuration on railway

At the time of this writing, railway's default python is too old for this project. Set
```
RAILPACK_PYTHON_VERSION=3.13.2
```
In the 'variables' setup.

You also need a couple of keys:
```
LANCEDB_API_KEY=your api key from lancedb
LANCEDB_URI=the uri to the lancedb db (eg, db://thefayettevillains-.....)
```