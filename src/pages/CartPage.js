import React from "react";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import styles from "../App.module.css";

/**
 * CartPage displays the user's shopping cart and allows proceeding to checkout or navigating back to shop.
 *
 * @component
 * @returns {JSX.Element} The rendered CartPage component.
 */
function CartPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  /** Total price of all products in the cart */
  const total = cart.reduce((sum, product) => sum + product.discountedPrice, 0);

  return (
    <Layout>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className={styles.cartContainer}>
          <ul className={styles.cartList}>
            {cart.map((product) => (
              <li key={product.id} className={styles.cartItem}>
                <img
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  className={styles.cartImage}
                />
                <div className={styles.cartDetails}>
                  <p className={styles.cartProductTitle}>{product.title}</p>
                  <p className={styles.cartPrice}>
                    {product.discountedPrice.toFixed(2)} kr
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.cartButtons}>
            <h2 className={styles.cartTotal}>Total: {total.toFixed(2)} kr</h2>

            <button
              onClick={() => navigate("/checkout-success")}
              className={styles.checkoutButton}
            >
              Checkout
            </button>

            <button onClick={() => navigate("/")} className={styles.backLink}>
              Keep shopping
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      )}
    </Layout>
  );
}

export default CartPage;
