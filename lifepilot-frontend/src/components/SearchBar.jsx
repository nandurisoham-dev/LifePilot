export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="search-wrapper">
            <span className="search-icon">⌕</span>

            <input
                type="text"
                placeholder="Search your memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
                <button
                    className="clear-search"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
}
