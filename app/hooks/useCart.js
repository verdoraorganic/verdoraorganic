// app/hooks/useCart.js
'use client';
import { useState } from 'react';
import { useApp } from '../contexts/AppContext';

export function useCart() {
  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice, 
    isOpen, 
    setIsOpen 
  };
}