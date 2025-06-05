import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";

/**
 * Main application component that sets up routing and context providers.
 *
 * @component
 * @returns {JSX.Element} The root application wrapped in Cart context and routing.
 */
export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
