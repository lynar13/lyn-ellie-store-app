import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import styles from "../App.module.css";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src="/images/logo1.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/contact" className={styles.link}>
          Contact
        </Link>
        <Link to="/cart" className={styles.cartLink}>
          <img src="/images/cart.svg" alt="Cart" className={styles.cartIcon} />
          {cartCount > 0 && (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
