import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    // Check if product is already in cart
    setCartItems((prev) => {
      const itemInCart = prev.find((item) => item.id === product.id);

      if (itemInCart) {
        // If product exists, increase quantity
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Otherwise, add new product with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) {
      // If quantity is less than 1, remove the item
      removeFromCart(id);
      return;
    }

    setCartItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart,
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;