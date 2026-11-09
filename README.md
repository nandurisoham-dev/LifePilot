# LifePilot

### Your life, organized.

LifePilot is a full-stack personal productivity web application designed to help people organize and manage their busy lives.

The goal of LifePilot is to provide one place where users can manage everyday responsibilities, organize information, plan activities, and keep track of their personal goals.

The application is being developed using React for the frontend, Python FastAPI for the backend, and SQLite for database storage.

---

## Table of Contents

1. About the Project
2. Current Features
3. Technology Stack
4. Application Architecture
5. Project Structure
6. How the Application Works
7. Prerequisites
8. Installation and Setup
9. Running the Application
10. API Documentation
11. Database
12. Future Development
13. Current Project Status

---

## 1. About the Project

LifePilot is designed around a simple idea: managing a busy life should be easier.

Instead of keeping everyday information scattered across different places, LifePilot aims to bring important personal productivity tools together in one application.

The application is being developed incrementally, starting with a working full-stack foundation and expanding into additional productivity features.

LifePilot currently supports note-style information management through its initial Memory Management feature. This functionality is intended to become the Notes section of the larger application.

---

## 2. Current Features

### Memory Management

The initial version of LifePilot includes a complete CRUD implementation for managing memories.

Users can:

- Create a memory with a title and content.
- View all saved memories.
- Retrieve an individual memory.
- Edit existing memories.
- Delete memories.
- Search memories using keywords through the frontend.

### Frontend

- React-based user interface.
- Modular component structure.
- Separate CSS files for global styling and application styling.
- Search functionality.
- Create, edit, and delete operations.
- Communication with the backend through HTTP requests.

### Backend

- REST API built with FastAPI.
- SQLite database integration.
- SQLAlchemy ORM for database operations.
- CRUD functions for memory management.
- Automatic database table creation.

---

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| FastAPI | Backend web framework |
| SQLAlchemy | Database ORM |
| SQLite | Database |
| React | Frontend library |
| JavaScript (JSX) | Frontend development |
| CSS | Styling |
| Vite | Frontend development server and build tool |

---

## 4. Application Architecture

LifePilot follows a simple frontend-backend architecture.

```text
                USER
                  |
                  v
          REACT FRONTEND
             (Vite)
                  |
                  | HTTP Requests
                  | JSON Responses
                  v
           FASTAPI BACKEND
                  |
                  v
              FUNCTIONS
             (SQLAlchemy)
                  |
                  v
              SQLITE DB
             lifepilot.db
```

### Frontend

The React frontend is responsible for:

- Displaying the user interface.
- Collecting user input.
- Managing application state.
- Sending HTTP requests to the backend.
- Displaying information received from the API.

### Backend

The FastAPI backend is responsible for:

- Providing REST API endpoints.
- Receiving frontend requests.
- Validating incoming data.
- Calling database functions.
- Returning responses in JSON format.

### Database

SQLite stores application data locally.

SQLAlchemy is used to interact with the database through Python objects and functions.

---

## 5. Project Structure

```text
LifePilot/
│
├── .gitignore
├── README.md
│
├── backend/
│   ├── .venv/
│   ├── main.py
│   ├── functions.py
│   ├── requirements.txt
│   └── lifepilot.db
│
└── frontend/
    ├── node_modules/
    ├── index.html
    ├── package.json
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── App.css
        │
        └── components/
            ├── Navbar.jsx
            ├── MemoryForm.jsx
            ├── MemoryList.jsx
            ├── MemoryCard.jsx
            └── SearchBar.jsx
```

### Backend Files

**main.py**

- Initializes the FastAPI application.
- Configures CORS.
- Defines API endpoints.
- Receives frontend requests.
- Calls the appropriate database functions.

**functions.py**

- Creates the SQLAlchemy engine.
- Defines the declarative base and Memory database model.
- Creates the database table.
- Contains database operations for creating, retrieving, updating, and deleting memories.
- Converts database records into response dictionaries.

**requirements.txt**

Contains the Python dependencies required by the backend.

**lifepilot.db**

The SQLite database file generated when the backend initializes.

### Frontend Files

**main.jsx**

The entry point of the React application. It renders the main App component and loads the global stylesheets.

**App.jsx**

The main application component. It manages application state, API communication, memory operations, and the overall page layout.

**index.css**

Contains global styling, typography, CSS variables, and shared design rules.

**App.css**

Contains application-specific styling, including page layout, navigation, memory cards, forms, and responsive design.

### Components

**Navbar.jsx**

Displays the LifePilot branding and memory count.

**MemoryForm.jsx**

Provides the form for creating and editing memories.

**MemoryList.jsx**

Displays the collection of memories and handles loading and empty states.

**MemoryCard.jsx**

Displays an individual memory with its information and available actions.

**SearchBar.jsx**

Provides keyword-based search for memories.

---

## 6. How the Application Works

When a user creates a memory:

1. The user enters a title and content in the React form.
2. React sends a POST request to the FastAPI backend.
3. FastAPI receives the submitted data.
4. The backend calls the appropriate function in `functions.py`.
5. SQLAlchemy inserts the record into SQLite.
6. The backend returns the newly created record.
7. React updates the interface.

The same general process applies to retrieving, updating, and deleting memories.

---

## 7. Prerequisites

Before running LifePilot, make sure the following software is installed:

### Python

Python is required to run the backend.

Download: https://www.python.org/downloads/

Verify the installation:

```bash
python --version
```

### Node.js and npm

Node.js and npm are required to install and run the React frontend.

Download: https://nodejs.org/

Verify the installation:

```bash
node --version
npm --version
```

### Git

Git is recommended for cloning and managing the project.

Download: https://git-scm.com/downloads

---

## 8. Installation and Setup

Follow these instructions to set up LifePilot on a new computer.

### Step 1: Clone the repository

Open a terminal and run:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

Navigate into the project:

```bash
cd LifePilot
```

Replace the repository URL with the actual GitHub repository URL.

### Step 2: Set up the backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment on Windows:

```bash
.venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

The backend dependencies are:

- fastapi
- uvicorn
- sqlalchemy

### Step 3: Set up the frontend

Open another terminal.

From the LifePilot project root, navigate to the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

This installs the packages specified in `package.json`.

---

## 9. Running the Application

LifePilot requires two development servers to run simultaneously.

### Terminal 1: Start the backend

Navigate to the backend directory:

```bash
cd LifePilot/backend
```

Activate the virtual environment if it is not already activated:

```bash
.venv\Scripts\activate
```

Start the FastAPI development server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

**http://127.0.0.1:8000**

### Terminal 2: Start the frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd LifePilot/frontend
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

**http://localhost:5173**

### Accessing LifePilot

Once both servers are running, open the frontend address in your browser:

http://localhost:5173

You can now use LifePilot.

**Important:** Keep both terminal windows running while using the application.

---

## 10. API Documentation

The backend exposes REST API endpoints for memory management.

### Available Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/memories` | Create a memory |
| GET | `/memories` | Retrieve all memories |
| GET | `/memories/{memory_id}` | Retrieve a specific memory |
| PUT | `/memories/{memory_id}` | Update a memory |
| DELETE | `/memories/{memory_id}` | Delete a memory |

### Creating a Memory

**POST** `/memories`

Example request body:

```json
{
  "title": "My First Memory",
  "content": "This is my first memory saved in LifePilot."
}
```

### Retrieving Memories

**GET** `/memories`

Returns the collection of saved memories.

### Retrieving an Individual Memory

**GET** `/memories/1`

Returns the memory with ID 1, if it exists.

### Updating a Memory

**PUT** `/memories/1`

Example request body:

```json
{
  "title": "Updated Memory",
  "content": "This memory has been updated."
}
```

### Deleting a Memory

**DELETE** `/memories/1`

Deletes the memory with ID 1.

### Interactive API Documentation

FastAPI automatically provides interactive API documentation.

After starting the backend, visit:

http://127.0.0.1:8000/docs

You can use Swagger UI to test the API endpoints directly from your browser.

---

## 11. Database

LifePilot currently uses SQLite as its database.

The database is managed through SQLAlchemy.

### Memory Table

The current database contains a `memories` table.

| Column | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| title | String | Memory title |
| content | Text | Memory content |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update timestamp |

The database table is created automatically when the backend initializes.

The database file is stored locally in the backend directory when the backend is started from that directory.

---

## 12. Future Development

LifePilot is intended to grow into a broader personal productivity application.

Planned features include:

### Dashboard
A central overview of the user's activities, priorities, and productivity information.

### Task Management
Create, organize, update, complete, and delete tasks.

### Daily Planner
Organize daily activities and manage schedules.

### Notes
A dedicated section for storing important information, thoughts, and ideas. The existing Memory Management functionality will evolve into this feature.

### Goal Tracking
Create personal goals and monitor progress.

### Reminders
Manage upcoming responsibilities and important activities.

These features are planned and are not yet implemented in the current version.

---

## 13. Current Project Status

**Status: Initial full-stack implementation completed.**

The current version includes:

- A working React frontend.
- A working FastAPI backend.
- SQLite database integration through SQLAlchemy.
- Memory management CRUD functionality.
- Frontend-to-backend API communication.
- Keyword-based memory search.
- Initial application styling.

The backend CRUD endpoints have been tested, and the frontend is operational.

LifePilot is under active development. Additional productivity features will be introduced incrementally.

---

## License

No license has been added yet. The project's license and distribution terms will be decided separately.