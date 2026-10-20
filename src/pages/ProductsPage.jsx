import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="products-container">
      <h2>All Products Catalog</h2>
      {loading ? (
        <div className="loading-spinner">Loading catalog...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-box">
                <img src={product.image} alt={product.title} />
              </div>
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
