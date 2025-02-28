import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import styles from "./App.module.css";


const API_URL = "https://v2.api.noroff.dev/online-shop";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate the total number of items in the cart
  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}


function useCart() {
  return useContext(CartContext);
}

// Layout Component
function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

// Header Component
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
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
        <Link to="/cart" className={styles.cartLink}>
          <img src="/images/cart.svg" alt="Cart" className={styles.cartIcon} />
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
      </nav>
    </header>
  );
}


// Footer Component
function Footer() {
  return (
    <footer className={styles.footer}>&copy; 2025 Lyn Ellie Store</footer>
  );
}

// HomePage Component
function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.length > 0) {
      const filteredSuggestions = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (title) => {
    setSearch(title);
    setShowSuggestions(false);
  };

  return (
    <Layout>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className={styles.search}
        />
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

// ProductPage Component
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

function CartPage() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, product) => sum + product.discountedPrice, 0);

  return (
    <Layout>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className={styles.cartContainer}>
          <ul className={styles.cartList}>
            {cart.map((product, index) => (
              <li key={index} className={styles.cartItem}>
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

function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Layout>
      <div className={styles.checkoutSuccessContainer}>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase.</p>
        <button onClick={() => navigate("/homepage")} className={styles.backLink}>
          Back to store
        </button>
      </div>
    </Layout>
  );
}

// ContactPage Component
function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "@stud.noroff.no",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, subject, email, message } = formData;

    // Basic Validation
    if (fullName.length >= 3 && subject.length >= 3 && email && message.length >= 3) {
      console.log("Form Data:", formData);
      alert("Message sent successfully!");
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <Layout>
      <h1>Contact Us</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          minLength={3}
          className={styles.input}
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          minLength={3}
          className={styles.input}
          value={formData.subject}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          required
          minLength={3}
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </Layout>
  );
}

// App Component
function App() {
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

export default App;
