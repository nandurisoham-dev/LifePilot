
export default function MemoryCard({ memory, onEdit, onDelete }) {
    function formatDate(date) {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    return (
        <article className="memory-card">
            <div className="memory-card-top">
                <span className="memory-tag">MEMORY</span>

                <span className="memory-date">
                    {formatDate(memory.created_at)}
                </span>
            </div>

            <h3>{memory.title}</h3>

            <p className="memory-content">
                {memory.content}
            </p>

            <div className="memory-card-footer">
                <span className="memory-updated">
                    Updated {formatDate(memory.updated_at)}
                </span>

                <div className="card-actions">
                    <button
                        className="edit-button"
                        onClick={() => onEdit(memory)}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-button"
                        onClick={() => onDelete(memory.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}
