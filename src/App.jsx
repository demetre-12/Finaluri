import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetailPage";
import Cart from "./pages/CartPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
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
