import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
  description: z.string(),
  price: z.number(),
  volume: z.string(),
  abv: z.number().optional(),
  imageUrl: z.string(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  stock: z.number().default(100),
});

export const cartItemSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1),
});

export const orderSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  customerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),
  })),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered"]).default("pending"),
  createdAt: z.string(),
});

export const insertCategorySchema = categorySchema.omit({ id: true });
export const insertProductSchema = productSchema.omit({ id: true });
export const insertCartItemSchema = cartItemSchema.omit({ id: true });
export const insertOrderSchema = orderSchema.omit({ id: true, createdAt: true, status: true });

export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
