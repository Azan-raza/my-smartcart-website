import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const getStoredCart = () => {
  try {
    const stored = localStorage.getItem("smartcart_cart");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("smartcart_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find(
        (x) => x.productId === item.productId && x.size === item.size && x.color === item.color
      );

      if (existing) {
        return prev.map((x) =>
          x.productId === item.productId && x.size === item.size && x.color === item.color
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      }

      return [...prev, item];
    });
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);
  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      total,
      isCartOpen,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      toggleCart
    }),
    [items, total, isCartOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
