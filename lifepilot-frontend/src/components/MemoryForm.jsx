import { useEffect, useState } from "react";

export default function MemoryForm({
    initialMemory,
    onSave,
    onCancel,
    saving
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setTitle(initialMemory?.title || "");
        setContent(initialMemory?.content || "");
    }, [initialMemory]);

    function handleSubmit(event) {
        event.preventDefault();

        if (!title.trim() || !content.trim()) {
            return;
        }

        onSave({
            title: title.trim(),
            content: content.trim()
        });
    }

    return (
        <form className="memory-form" onSubmit={handleSubmit}>
            <div className="form-heading">
                <div>
                    <span className="eyebrow">
                        {initialMemory ? "EDIT MEMORY" : "NEW MEMORY"}
                    </span>

                    <h2>
                        {initialMemory
                            ? "Update your memory"
                            : "Capture a thought"}
                    </h2>

                    <p>Keep important information in one place.</p>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="memory-title">Title</label>

                <input
                    id="memory-title"
                    type="text"
                    placeholder="Give your memory a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={200}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="memory-content">Content</label>

                <textarea
                    id="memory-content"
                    placeholder="Write down what you want to remember..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    required
                />
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="button-secondary"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="button-primary"
                    disabled={saving || !title.trim() || !content.trim()}
                >
                    {saving
                        ? "Saving..."
                        : initialMemory
                            ? "Save Changes"
                            : "Save Memory"}
                </button>
            </div>
        </form>
    );
}
