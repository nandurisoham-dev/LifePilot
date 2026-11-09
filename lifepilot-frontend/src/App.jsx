import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import MemoryForm from "./components/MemoryForm";
import MemoryList from "./components/MemoryList";
import SearchBar from "./components/SearchBar";

const API_URL = "http://127.0.0.1:8000";

export default function App() {

    // =====================================
    // STATE MANAGEMENT
    // =====================================

    const [memories, setMemories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingMemory, setEditingMemory] = useState(null);


    // =====================================
    // FETCH ALL MEMORIES
    // =====================================

    async function fetchMemories() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/memories`);

            if (!response.ok) {
                throw new Error("Unable to load memories.");
            }

            const data = await response.json();

            setMemories(data);

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }


    // Load memories when application starts

    useEffect(() => {
        fetchMemories();
    }, []);


    // =====================================
    // CREATE AND UPDATE MEMORY
    // =====================================

    async function handleSave(memoryData) {
        try {
            setSaving(true);
            setError("");

            const isEditing = Boolean(editingMemory);

            const url = isEditing
                ? `${API_URL}/memories/${editingMemory.id}`
                : `${API_URL}/memories`;

            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(memoryData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Unable to save memory."
                );
            }

            if (isEditing) {

                // Update existing memory

                setMemories((previous) =>
                    previous.map((memory) =>
                        memory.id === data.id ? data : memory
                    )
                );

            } else {

                // Add newly created memory

                setMemories((previous) => [
                    data,
                    ...previous
                ]);
            }

            setShowForm(false);
            setEditingMemory(null);

        } catch (err) {
            setError(err.message);

        } finally {
            setSaving(false);
        }
    }


    // =====================================
    // OPEN NEW MEMORY FORM
    // =====================================

    function handleNewMemory() {
        setEditingMemory(null);
        setShowForm(true);
        setError("");
    }


    // =====================================
    // EDIT MEMORY
    // =====================================

    function handleEdit(memory) {
        setEditingMemory(memory);
        setShowForm(true);
        setError("");
    }


    // =====================================
    // DELETE MEMORY
    // =====================================

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this memory?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(
                `${API_URL}/memories/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Unable to delete memory."
                );
            }

            // Remove deleted memory from frontend

            setMemories((previous) =>
                previous.filter((memory) => memory.id !== id)
            );

            // Close form if the deleted memory was being edited

            if (editingMemory?.id === id) {
                setEditingMemory(null);
                setShowForm(false);
            }

        } catch (err) {
            setError(err.message);
        }
    }


    // =====================================
    // CANCEL FORM
    // =====================================

    function handleCancel() {
        setShowForm(false);
        setEditingMemory(null);
        setError("");
    }


    // =====================================
    // SEARCH AND FILTER MEMORIES
    // =====================================

    const filteredMemories = useMemo(() => {

        const query = searchQuery.toLowerCase().trim();

        if (!query) {
            return memories;
        }

        return memories.filter((memory) =>
            memory.title.toLowerCase().includes(query) ||
            memory.content.toLowerCase().includes(query)
        );

    }, [memories, searchQuery]);


    // =====================================
    // APPLICATION UI
    // =====================================

    return (
        <div className="app">

            {/* Navigation */}

            <Navbar memoryCount={memories.length} />


            <main className="main-container">

                {/* Hero Section */}

                <section className="hero-section">

                    <div className="hero-text">

                        <span className="eyebrow">
                            YOUR PERSONAL SPACE
                        </span>

                        <h1>
                            Keep what <span>matters.</span>
                        </h1>

                        <p>
                            Your thoughts, ideas and important
                            information, all in one place.
                        </p>

                    </div>


                    <button
                        className="button-primary add-memory-button"
                        onClick={handleNewMemory}
                    >
                        <span>+</span>
                        New Memory
                    </button>

                </section>


                {/* Memory Workspace */}

                <section className="workspace-section">

                    {/* Error Message */}

                    {error && (
                        <div
                            className="error-message"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}


                    {/* Memory Form */}

                    {showForm && (
                        <MemoryForm
                            initialMemory={editingMemory}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            saving={saving}
                        />
                    )}


                    {/* Library Header */}

                    <div className="library-header">

                        <div>

                            <span className="eyebrow">
                                YOUR COLLECTION
                            </span>

                            <h2>Memory Library</h2>

                            <p>
                                {memories.length} saved memories
                            </p>

                        </div>


                        {/* Search */}

                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />

                    </div>


                    {/* Memory List */}

                    <MemoryList
                        memories={filteredMemories}
                        loading={loading}
                        searchQuery={searchQuery}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCreate={handleNewMemory}
                        onClearSearch={() => setSearchQuery("")}
                    />

                </section>


                {/* Footer */}

                <footer className="app-footer">

                    <span>LifePilot</span>

                    <span>
                        Your space. Your memories.
                    </span>

                </footer>

            </main>

        </div>
    );
}
