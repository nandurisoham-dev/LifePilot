
import MemoryCard from "./MemoryCard";

export default function MemoryList({
    memories,
    loading,
    searchQuery,
    onEdit,
    onDelete,
    onCreate,
    onClearSearch
}) {

    if (loading) {
        return (
            <div className="empty-state">
                <div className="loading-spinner"></div>
                <p>Loading your memories...</p>
            </div>
        );
    }

    if (memories.length === 0) {

        if (searchQuery) {
            return (
                <div className="empty-state">
                    <div className="empty-icon">?</div>

                    <h3>No matching memories</h3>

                    <p>
                        We couldn't find anything matching
                        "{searchQuery}". Try another keyword.
                    </p>

                    <button
                        className="button-secondary"
                        onClick={onClearSearch}
                    >
                        Clear Search
                    </button>
                </div>
            );
        }

        return (
            <div className="empty-state">
                <div className="empty-icon">M</div>

                <h3>Your memory space is empty</h3>

                <p>
                    Start building your personal memory library.
                    Save important thoughts, ideas and information
                    in one place.
                </p>

                <button
                    className="button-primary"
                    onClick={onCreate}
                >
                    <span>+</span>
                    Create Your First Memory
                </button>
            </div>
        );
    }

    return (
        <div className="memory-grid">
            {memories.map((memory) => (
                <MemoryCard
                    key={memory.id}
                    memory={memory}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
