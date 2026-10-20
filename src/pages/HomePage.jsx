import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    return <div className="loading-spinner">Loading store sections...</div>;
  }

  return (
    <div className="home-container">
      <section className="product-slot">
        <div className="slot-header">
          <h2>🔥 Hot Items</h2>
          <span className="slot-subtitle">Trending right now</span>
        </div>
        <div className="product-grid">
          {hotItems.map((product) => (
            <ProductCard key={product.id} product={product} badge="HOT" />
          ))}
        </div>
      </section>

      <section className="product-slot">
        <div className="slot-header">
          <h2>⭐ Best Sellers</h2>
          <span className="slot-subtitle">Most loved by our customers</span>
        </div>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} badge="TOP" />
          ))}
        </div>
      </section>

      <section className="product-slot">
        <div className="slot-header">
          <h2>✨ New Arrivals</h2>
          <Link to="/products" className="see-all-link">
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
  return (
    <div className="product-card">
      <div className="product-image-box">
        {badge && <span className="card-badge">{badge}</span>}
        <img src={product.image} alt={product.title} />
      </div>
      <span className="product-category">{product.category}</span>
      <h3 className="product-name">{product.title}</h3>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
}
