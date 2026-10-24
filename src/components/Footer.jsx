import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="lopedia-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">LOPEDIA</h2>
          <p>A curated collection of modern apparel & essentials.</p>
        </div>

        <div className="footer-links">
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lopedia. All rights reserved.</p>
      </div>
    </footer>
  );
}
