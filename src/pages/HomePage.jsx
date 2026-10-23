import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [hotItems, setHotItems] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setHotItems(data.slice(0, 4));
        setBestSellers(data.slice(4, 8));
        setNewArrivals(data.slice(8, 12));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching homepage slots:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="state-message">Loading store sections...</div>;
  }

  return (
    <div className="page-container home-container">
      <section className="product-slot" style={{ marginBottom: "3rem" }}>
        <div className="slot-header" style={{ marginBottom: "1.5rem" }}>
          <h2>🔥 Hot Items</h2>
          <span
            className="slot-subtitle"
            style={{ color: "var(--text-muted)" }}
          >
            Trending right now
          </span>
        </div>
        <div className="product-grid">
          {hotItems.map((product) => (
            <ProductCard key={product.id} product={product} badge="HOT" />
          ))}
        </div>
      </section>

      <section className="product-slot" style={{ marginBottom: "3rem" }}>
        <div className="slot-header" style={{ marginBottom: "1.5rem" }}>
          <h2>⭐ Best Sellers</h2>
          <span
            className="slot-subtitle"
            style={{ color: "var(--text-muted)" }}
          >
            Most loved by our customers
          </span>
        </div>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} badge="TOP" />
          ))}
        </div>
      </section>

      <section className="product-slot">
        <div
          className="slot-header"
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>✨ New Arrivals</h2>
          <Link
            to="/products"
            className="link"
            style={{ color: "var(--accent-blue)" }}
          >
            Explore All Catalog →
          </Link>
        </div>
        <div className="product-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} badge="NEW" />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, badge }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-box">
        {badge && <span className="card-badge">{badge}</span>}
        <img src={product.image} alt={product.title} />
      </Link>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>
      </div>

      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button className="add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
