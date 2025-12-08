import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, CartItem } from "@shared/schema";

type CartItemWithProduct = CartItem & { product: Product };

interface CartContextType {
  sessionId: string;
  items: CartItemWithProduct[];
  isLoading: boolean;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  addToCart: (productId: string, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(getOrCreateSessionId);
  const queryClient = useQueryClient();

  // FIX: Define the Base URL from environment variables
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

  const { data: items = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart", sessionId],
    queryFn: async () => {
      // FIX: Use baseUrl
      const res = await fetch(`${baseUrl}/api/cart/${sessionId}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
  });

  const addMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      // FIX: Use baseUrl
      const res = await fetch(`${baseUrl}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      // FIX: Use baseUrl
      const res = await fetch(`${baseUrl}/api/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Failed to update cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (itemId: string) => {
      // FIX: Use baseUrl
      const res = await fetch(`${baseUrl}/api/cart/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove from cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      // FIX: Use baseUrl
      const res = await fetch(`${baseUrl}/api/cart/session/${sessionId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to clear cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    // Handle cases where product might be null/undefined to prevent crashes
    const price = item.product ? Number(item.product.price) : 0;
    return sum + price * item.quantity;
  }, 0);
  const tax = subtotal * 0.08; // 8% Tax
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        sessionId,
        items,
        isLoading,
        itemCount,
        subtotal,
        tax,
        total,
        addToCart: (productId, quantity) => addMutation.mutate({ productId, quantity }),
        updateQuantity: (itemId, quantity) => updateMutation.mutate({ itemId, quantity }),
        removeItem: (itemId) => removeMutation.mutate(itemId),
        clearCart: () => clearMutation.mutate(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}