import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <h3>Lopedia</h3>
        </Link>
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <div className="cart-link">🛒 Cart</div>
    </header>
  );
}
