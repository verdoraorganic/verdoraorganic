// app/contexts/AppContext.js (ye file replace karo)
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '@/utils/products';

const AppContext = createContext(null);

function readStoredValue(key, fallback) {
  if (typeof window === 'undefined') return fallback;

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    // Corrupt or manually edited browser storage should never take down the shop.
    return fallback;
  }
}

function persist(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The storefront remains usable when storage is unavailable or full.
  }
}

export function AppProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedProducts = readStoredValue('products', initialProducts);
      setProducts(Array.isArray(storedProducts) ? storedProducts : initialProducts);
      const storedCart = readStoredValue('cart', []);
      const storedOrders = readStoredValue('orders', []);
      const storedWishlist = readStoredValue('wishlist', []);
      setCart(Array.isArray(storedCart) ? storedCart : []);
      setOrders(Array.isArray(storedOrders) ? storedOrders : []);
      setWishlist(Array.isArray(storedWishlist) ? storedWishlist : []);
      setIsAdmin(window.localStorage.getItem('isAdmin') === 'true');
      if (!window.localStorage.getItem('products')) persist('products', initialProducts);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateAdmin = (v) => {
    setIsAdmin(v);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdmin', v ? 'true' : 'false');
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      persist('wishlist', updated);
      return updated;
    });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      persist('cart', updated);
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      persist('cart', updated);
      return updated;
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      persist('cart', updated);
      return updated;
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    const order = {
      id: Date.now(),
      items: [...cart],
      total: totalPrice,
      date: new Date().toISOString(),
      status: 'Pending',
    };
    setOrders((prev) => {
      const updated = [...prev, order];
      persist('orders', updated);
      return updated;
    });
    setCart([]);
    persist('cart', []);
    return order;
  };

  const addProduct = (product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      const updated = exists
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [...prev, product];
      persist('products', updated);
      return updated;
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persist('products', updated);
      return updated;
    });
  };

  const updateProductStock = (id, stock) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, stock } : p));
      persist('products', updated);
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        orders,
        isAdmin,
        setIsAdmin: updateAdmin,
        wishlist,
        toggleWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        placeOrder,
        addProduct,
        deleteProduct,
        updateProductStock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
