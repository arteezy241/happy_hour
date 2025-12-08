import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./storage";
import { insertCartItemSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/categories", async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get("/api/categories/:id", async (req, res) => {
    const category = await storage.getCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  });

  app.get("/api/products", async (req, res) => {
    const { category, search, featured } = req.query;
    
    if (featured === "true") {
      const products = await storage.getFeaturedProducts();
      return res.json(products);
    }
    
    if (search && typeof search === "string") {
      const products = await storage.searchProducts(search);
      return res.json(products);
    }
    
    if (category && typeof category === "string") {
      const products = await storage.getProductsByCategory(category);
      return res.json(products);
    }
    
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.get("/api/cart/:sessionId", async (req, res) => {
    const items = await storage.getCart(req.params.sessionId);
    const itemsWithProducts = await Promise.all(
      items.map(async (item) => {
        const product = await storage.getProduct(item.productId);
        return { ...item, product };
      })
    );
    res.json(itemsWithProducts);
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const parsed = insertCartItemSchema.parse(req.body);
      const item = await storage.addToCart(parsed);
      const product = await storage.getProduct(item.productId);
      res.status(201).json({ ...item, product });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      throw error;
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    const { quantity } = req.body;
    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }
    const item = await storage.updateCartItem(req.params.id, quantity);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    const product = await storage.getProduct(item.productId);
    res.json({ ...item, product });
  });

  app.delete("/api/cart/:id", async (req, res) => {
    await storage.removeFromCart(req.params.id);
    res.status(204).send();
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    await storage.clearCart(req.params.sessionId);
    res.status(204).send();
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const parsed = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(parsed);
      await storage.clearCart(parsed.sessionId);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      throw error;
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    const order = await storage.getOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  });

  const httpServer = createServer(app);
  return httpServer;
}
