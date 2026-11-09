from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

from functions import (
    add_memory,
    get_memories,
    get_memory,
    update_memory,
    delete_memory
)

app = FastAPI(title="LifePilot API")


# CORS configuration

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Home endpoint

@app.get("/")
def home():
    return {"message": "Welcome to LifePilot API"}


# Add a memory

@app.post("/memories")
def create_memory(data: dict = Body(...)):
    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        raise HTTPException(
            status_code=400,
            detail="Title and content are required"
        )

    return add_memory(title, content)


# Get all memories

@app.get("/memories")
def read_memories():
    return get_memories()


# Get a specific memory

@app.get("/memories/{memory_id}")
def read_memory(memory_id: int):
    memory = get_memory(memory_id)

    if memory is None:
        raise HTTPException(
            status_code=404,
            detail="Memory not found"
        )

    return memory


# Update a memory

@app.put("/memories/{memory_id}")
def edit_memory(memory_id: int, data: dict = Body(...)):
    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        raise HTTPException(
            status_code=400,
            detail="Title and content are required"
        )

    memory = update_memory(memory_id, title, content)

    if memory is None:
        raise HTTPException(
            status_code=404,
            detail="Memory not found"
        )

    return memory


# Delete a memory

@app.delete("/memories/{memory_id}")
def remove_memory(memory_id: int):
    result = delete_memory(memory_id)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Memory not found"
        )

    return {"message": "Memory deleted successfully"}
