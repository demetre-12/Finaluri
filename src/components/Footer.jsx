import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="lopedia-footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lopedia. All rights reserved.</p>
      </div>
    </footer>
  );
}
