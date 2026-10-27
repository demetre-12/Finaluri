import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ cartCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          Lopedia
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>
            Products
          </Link>

          <Link
            to="/cart"
            className="cart-link"
            onClick={() => setIsOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Cart</span>
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
