import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="skeleton-card" style={{ height: "450px" }}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="page-container"
        style={{ textAlign: "center", padding: "4rem 0" }}
      >
        <h2>Product not found</h2>
        <Link
          to="/products"
          className="luxury-back-btn"
          style={{ marginTop: "1rem" }}
        >
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="luxury-detail-wrapper">
        <Link to="/products" className="luxury-back-btn">
          ← Back to Catalog
        </Link>

        <div className="luxury-detail-grid">
          <div className="luxury-image-showcase">
            <img
              src={product.image}
              alt={product.title || "Product Detail Image"}
            />
          </div>

          <div className="luxury-info-panel">
            <span className="luxury-category-tag">{product.category}</span>
            <h1 className="luxury-title">{product.title}</h1>
            <div className="luxury-price-tag">${product.price?.toFixed(2)}</div>
            <p className="luxury-description">{product.description}</p>

            <div className="luxury-purchase-zone">
              <div className="luxury-qty-selector">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="luxury-cart-btn"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
