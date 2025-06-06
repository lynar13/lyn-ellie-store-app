import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout";
import styles from "../App.module.css";

const API_URL = "https://v2.api.noroff.dev/online-shop";

/**
 * ProductPage component - Displays details for a specific product,
 * including title, image, price (with discounts), reviews, and a button to add to cart.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductPage component
 */
function ProductPage() {
  const { id } = useParams(); // Product ID from URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  /**
   * Fetch product data based on ID on component mount.
   */
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Layout>
      <div className={styles.productDetailContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Back
        </button>

        {product ? (
          <>
            <div className={styles.productImageContainer}>
              <img
                src={product.image.url}
                alt={product.image.alt || product.title}
                className={styles.productImage}
              />
            </div>

            <div className={styles.productInfoContainer}>
              <h1>{product.title}</h1>
              <p>{product.description}</p>

              <div className={styles.priceContainerProduct}>
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

              <button
                className={styles.addToCartButton}
                onClick={() => addToCart(product)}
              >
                Buy
                <img
                  src="/images/cart.svg"
                  alt="Cart"
                  className={styles.cartIcon}
                />
              </button>

              <div className={styles.reviews}>
                <h3>Customer Reviews</h3>
                {product.reviews?.length ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                      <p>
                        <strong>{review.username}</strong> ⭐ {review.rating}/5
                      </p>
                      <p>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}

export default ProductPage;
