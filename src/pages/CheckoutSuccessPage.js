// src/pages/CheckoutSuccessPage.js
import React, { useEffect } from "react";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../App.module.css";

/**
 * Renders order confirmation with toast and animation
 */
function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
    toast.success("🎉 Your order was successful!", {
      position: "top-center",
      autoClose: 3000,
    });
  }, [clearCart]);

  return (
    <Layout>
      <ToastContainer />
      <div className={`${styles.checkoutSuccessContainer} ${styles.fadeIn}`}>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase.</p>
        <button onClick={() => navigate("/")} className={styles.backLink}>
          Back to store
        </button>
      </div>
    </Layout>
  );
}

export default CheckoutSuccessPage;
