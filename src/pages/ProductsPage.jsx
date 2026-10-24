import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getOptimizedImageUrl } from "../utils/optimizeImage";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState("featured");

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok)
          throw new Error("Failed to load products from Fake Store API");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setSortedProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setSortedProducts(result);
  }, [sortBy, products]);

  if (error)
    return (
      <div className="state-message" style={{ color: "#ef4444" }}>
        {error}
      </div>
    );

  return (
    <div className="page-container">
      <div className="catalog-header-bar">
        <h1>Catalog</h1>

        <div className="catalog-controls">
          <select
            className="category-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))
          : sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link
                  to={`/products/${product.id}`}
                  className="product-image-box"
                >
                  <img
                    src={getOptimizedImageUrl(product.image, 350)}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    width="200"
                    height="200"
                  />
                </Link>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="product-title">{product.title}</h3>
                  </Link>
                </div>

                <div className="product-footer">
                  <span className="product-price">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    className="add-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
