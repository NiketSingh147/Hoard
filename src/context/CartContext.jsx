import { createContext, useState, useContext, useMemo, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountRate, setDiscountRate] = useState(0);

  const getItemTotal = useCallback((item) => {
    const pack = item.pack || 1;
    const quantity = item.quantity || 1;
    return item.price * pack * quantity;
  }, []);

  const addToCart = useCallback((product, pack = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id && item.pack === pack);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.pack === pack
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, pack, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId, pack) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === productId && item.pack === pack)),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId, pack, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId, pack);
        return;
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId && item.pack === pack ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => setCartItems([]), []);

  const getCartSubtotal = useCallback(
    () => cartItems.reduce((total, item) => total + getItemTotal(item), 0),
    [cartItems, getItemTotal],
  );

  const discountAmount = useMemo(
    () => Math.round(getCartSubtotal() * discountRate),
    [discountRate, getCartSubtotal],
  );

  const getCartTotal = useCallback(
    () => Math.max(0, Math.round(getCartSubtotal() - discountAmount)),
    [discountAmount, getCartSubtotal],
  );

  const getCartCount = useCallback(
    () => cartItems.reduce((count, item) => count + (item.quantity || 1), 0),
    [cartItems],
  );

  const getCartItemQuantity = useCallback(
    (productId, pack) =>
      cartItems.find((item) => item.id === productId && item.pack === pack)?.quantity || 0,
    [cartItems],
  );

  const applyCoupon = useCallback(
    (couponCode) => {
      const coupons = {
        SAVE10: 0.1,
        SAVE20: 0.2,
        SAVE50: 0.5,
        SPECIAL: 0.15,
      };

      const normalizedCode = couponCode?.trim().toUpperCase();
      if (coupons[normalizedCode]) {
        const discount = Math.round(getCartSubtotal() * coupons[normalizedCode]);
        setAppliedCoupon(normalizedCode);
        setDiscountRate(coupons[normalizedCode]);
        return { success: true, message: `${normalizedCode} applied! You saved Rs ${discount}` };
      }
      return { success: false, message: "Invalid coupon code" };
    },
    [getCartSubtotal],
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setDiscountRate(0);
  }, []);

  const isInCart = useCallback(
    (productId) => cartItems.some((item) => item.id === productId),
    [cartItems],
  );

  const contextValue = useMemo(
    () => ({
      cartItems,
      appliedCoupon,
      discountAmount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartSubtotal,
      getCartCount,
      getCartItemQuantity,
      isInCart,
      applyCoupon,
      removeCoupon,
      getItemTotal,
    }),
    [
      cartItems,
      appliedCoupon,
      discountAmount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartSubtotal,
      getCartCount,
      getCartItemQuantity,
      isInCart,
      applyCoupon,
      removeCoupon,
      getItemTotal,
    ],
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
