import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import styles from "../App.module.css";

const API_URL = "https://v2.api.noroff.dev/online-shop";

/**
 * HomePage component for displaying searchable product list from API.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component
 */
function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  /**
   * Fetches product data from the API on initial render.
   */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch(console.error);
  }, []);

  /**
   * Handles changes in the search input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
   */
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    setShowSuggestions(query.length > 0);
    setSuggestions(
      products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  /**
   * Handles selecting a suggestion from the autocomplete list.
   *
   * @param {string} selectedTitle - The selected product title.
   */
  const handleSelectSuggestion = (selectedTitle) => {
    setSearch(selectedTitle);
    setShowSuggestions(false);
  };

  return (
    <Layout>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>🔍</button>
        </div>
        {showSuggestions && (
          <ul className={styles.suggestionsList}>
            {suggestions.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelectSuggestion(product.title)}
                className={styles.suggestionItem}
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.productGrid}>
        {products
          .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
          .map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image.url}
                alt={product.image.alt || product.title}
                className={styles.productImage}
              />
              <h2>{product.title}</h2>
              <div className={styles.priceContainer}>
                {product.price === product.discountedPrice ? (
                  <p className={styles.originalPriceProduct}>
                    {product.price.toFixed(2)} kr
                  </p>
                ) : (
                  <>
                    <p className={styles.originalPrice}>
                      {product.price.toFixed(2)} kr
                    </p>
                    <p className={styles.discountedPrice}>
                      {product.discountedPrice.toFixed(2)} kr
                    </p>
                    <p className={styles.discountAmount}>
                      You save:{" "}
                      {(product.price - product.discountedPrice).toFixed(2)} kr!
                    </p>
                  </>
                )}
              </div>
              <Link to={`/product/${product.id}`} className={styles.button}>
                View Product
              </Link>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default HomePage;
