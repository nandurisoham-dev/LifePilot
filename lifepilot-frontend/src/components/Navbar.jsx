export default function Navbar({ memoryCount }) {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <div className="brand-icon">L</div>
                <span>LifePilot</span>
            </div>

            <div className="nav-right">
                <span className="nav-label">PERSONAL WORKSPACE</span>
                <div className="nav-memory-count">
                    {memoryCount} memories
                </div>
            </div>
        </nav>
    );
}
