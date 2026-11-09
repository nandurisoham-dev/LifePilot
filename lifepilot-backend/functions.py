from sqlalchemy import Integer, String, Column, Text, DateTime, create_engine
from sqlalchemy.orm import Session, declarative_base
from datetime import datetime

# Database setup

DB_PATH = "lifepilot.db"

engine = create_engine(f"sqlite:///{DB_PATH}")

Base = declarative_base()


# Table definition

class Memory(Base):
    __tablename__ = "memories"

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)


# Create database table

Base.metadata.create_all(engine)


# Convert memory object into dictionary

def memory_to_dict(memory):
    return {
        "id": memory.id,
        "title": memory.title,
        "content": memory.content,
        "created_at": memory.created_at,
        "updated_at": memory.updated_at
    }


# Add a memory

def add_memory(title, content):
    session = Session(engine)

    try:
        memory = Memory(title=title, content=content)

        session.add(memory)
        session.commit()
        session.refresh(memory)

        return memory_to_dict(memory)

    finally:
        session.close()


# Get all memories

def get_memories():
    session = Session(engine)

    try:
        memories = session.query(Memory).all()

        response = []

        for memory in memories:
            response.append(memory_to_dict(memory))

        return response

    finally:
        session.close()


# Get one memory

def get_memory(id):
    session = Session(engine)

    try:
        memory = session.get(Memory, id)

        if memory is None:
            return None

        return memory_to_dict(memory)

    finally:
        session.close()


# Update a memory

def update_memory(id, title, content):
    session = Session(engine)

    try:
        memory = session.get(Memory, id)

        if memory is None:
            return None

        memory.title = title
        memory.content = content

        session.commit()
        session.refresh(memory)

        return memory_to_dict(memory)

    finally:
        session.close()


# Delete a memory

def delete_memory(id):
    session = Session(engine)

    try:
        memory = session.get(Memory, id)

        if memory is None:
            return False

        session.delete(memory)
        session.commit()

        return True

    finally:
        session.close()
