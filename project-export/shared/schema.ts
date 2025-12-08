import { pgTable, text, serial, integer, boolean, numeric, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// 1. Categories Table
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

// 2. Products Table
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  categoryId: text("category_id").notNull().references(() => categories.id),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  volume: text("volume").notNull(),
  abv: numeric("abv").notNull(),
  imageUrl: text("image_url").notNull(),
  stock: integer("stock").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  tags: jsonb("tags").$type<string[]>().notNull(),
});

// 3. Cart Items Table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: text("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
});

// 4. Orders Table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  // Customer Info
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
});

// --- Zod Schemas & Types ---
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, status: true, createdAt: true });

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;