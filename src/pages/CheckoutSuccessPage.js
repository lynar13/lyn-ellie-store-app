import React, { useEffect } from "react";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import styles from "../App.module.css";

function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, []); // ✅ Empty dependency array ensures it runs only once

  return (
    <Layout>
      <div className={styles.checkoutSuccessContainer}>
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
