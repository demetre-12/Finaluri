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
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lopedia. All rights reserved.</p>
      </div>
    </footer>
  );
}
