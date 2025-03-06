import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import styles from "../App.module.css";

function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo1.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {/* Burger Menu Button */}
      <button className={styles.burgerMenu} onClick={toggleMenu}>
        ☰
      </button>

      {/* Navigation Links */}
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/contact"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          to="/cart"
          className={styles.cartLink}
          onClick={() => setMenuOpen(false)}
        >
          <img src="/images/cart.svg" alt="Cart" className={styles.cartIcon} />
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
