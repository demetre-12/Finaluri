import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-card">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="continue-shop-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <span className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
