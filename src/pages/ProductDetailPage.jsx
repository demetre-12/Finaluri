import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getOptimizedImageUrl } from "../utils/optimizeImage";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading)
    return <div className="state-message">Loading masterpiece...</div>;
  if (error || !product)
    return (
      <div className="state-message" style={{ color: "#ef4444" }}>
        Product not found.
      </div>
    );

  return (
    <div className="page-container luxury-detail-wrapper">
      <Link to="/products" className="luxury-back-btn">
        ← Back to Catalog
      </Link>

      <div className="luxury-detail-grid">
        <div className="luxury-image-showcase">
          <div className="glow-backdrop"></div>
          <img
            src={getOptimizedImageUrl(product.image, 800)}
            alt={product.title}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="luxury-info-panel">
          <div className="luxury-badge-row">
            <span className="luxury-category-tag">{product.category}</span>
            <div className="luxury-rating">
              ⭐ {product.rating?.rate || 4.5} ({product.rating?.count || 120}{" "}
              reviews)
            </div>
          </div>

          <h1 className="luxury-title">{product.title}</h1>
          <div className="luxury-price-tag">${product.price.toFixed(2)}</div>

          <p className="luxury-description">{product.description}</p>

          <div className="luxury-purchase-zone">
            <div className="luxury-qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button
              className={`luxury-cart-btn ${added ? "success" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
