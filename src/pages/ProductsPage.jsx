import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getOptimizedImageUrl } from "../utils/optimizeImage";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <div className="catalog-header-bar">
        <h2>Products</h2>
        <div className="catalog-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link
                to={`/products/${product.id}`}
                className="product-image-box"
              >
                <img
                  src={
                    getOptimizedImageUrl
                      ? getOptimizedImageUrl(product.image, 350)
                      : product.image
                  }
                  alt={product.title || "Product Image"}
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
                  ${product.price?.toFixed(2)}
                </span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product, 1)}
                  aria-label={`Add ${product.title || "product"} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
