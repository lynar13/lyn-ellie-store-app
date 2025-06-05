import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier.
 * @property {string} title - Product title.
 * @property {number} price - Original price.
 * @property {number} discountedPrice - Discounted price.
 * @property {{ url: string, alt?: string }} image - Product image.
 */

/**
 * Cart context for global cart state management.
 * @type {React.Context<{
 *   cart: Product[],
 *   addToCart: (product: Product) => void,
 *   removeFromCart: (productId: string) => void,
 *   clearCart: () => void,
 *   cartCount: number
 * }>}
 */
const CartContext = createContext();

/**
 * CartProvider component wraps your app and provides cart context.
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /**
   * Adds a product to the cart.
   * @param {Product} product - Product to add to the cart.
   */
  const addToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  /**
   * Removes a product from the cart by ID.
   * @param {string} productId - ID of the product to remove.
   */
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  /**
   * Clears the entire cart.
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  /**
   * Calculates the total number of products in the cart.
   * @type {number}
   */
  const cartCount = useMemo(() => cart.length, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context.
 * @returns {{
 *   cart: Product[],
 *   addToCart: (product: Product) => void,
 *   removeFromCart: (productId: string) => void,
 *   clearCart: () => void,
 *   cartCount: number
 * }}
 */
export function useCart() {
  return useContext(CartContext);
}
