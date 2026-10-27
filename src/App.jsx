import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetailPage";
import Cart from "./pages/CartPage";

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("lopedia_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("lopedia_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id,
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantityToAdd,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-wrapper">
      <Header cartCount={cartCount} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList onAddToCart={addToCart} />} />
          <Route
            path="/products"
            element={<ProductList onAddToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
              />
            }
          />
        </Routes>
      </main>

      <footer className="lopedia-footer">
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Lopedia Store. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
