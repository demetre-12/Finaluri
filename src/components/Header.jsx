import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItemCount } = useCart();

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        LOPEDIA
      </Link>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Link to="/cart" className="cart-link">
        🛒 Cart ({totalItemCount})
      </Link>
    </header>
  );
}
