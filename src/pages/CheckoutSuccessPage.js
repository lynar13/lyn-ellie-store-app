/**
 * CheckoutSuccessPage component
 * Displays a confirmation message after a successful order and clears the shopping cart.
 *
 * @component
 * @returns {JSX.Element} Rendered confirmation page for successful checkout.
 */

import React, { useEffect } from "react";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import styles from "../App.module.css";

/**
 * CheckoutSuccessPage - shows a success message and clears the cart on mount.
 */
function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  /**
   * Clear cart once when component is mounted.
   */
  useEffect(() => {
    clearCart();
  }, []);

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
