// ProductPage Component
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout";
import styles from "../App.module.css";

const API_URL = "https://v2.api.noroff.dev/online-shop";
function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Layout>
      {product ? (
        <div className={styles.productDetailContainer}>
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

            {/* Display Reviews */}
            <div className={styles.reviews}>
              <h3>Customer Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}

export default ProductPage;
