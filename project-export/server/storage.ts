import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, ilike, or, and } from "drizzle-orm"; 
import * as schema from "../shared/schema";
import { 
  type Category, 
  type Product, 
  type CartItem, 
  type Order,
  type InsertCartItem,
  type InsertOrder,
  categories as categoriesTable,
  products as productsTable,
  cartItems as cartItemsTable,
  orders as ordersTable
} from "@shared/schema";

// --- 1. PostgreSQL Connection Setup ---
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Render
});

export const db = drizzle(pool, { schema });

// --- 2. Interface Definition ---
export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  getCart(sessionId: string): Promise<CartItem[]>;
  getCartItem(sessionId: string, productId: string): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersBySession(sessionId: string): Promise<Order[]>;
}

// --- 3. Drizzle Implementation ---
export class DrizzleStorage implements IStorage {
  
  // -- Categories --
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categoriesTable);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id));
    return category;
  }

  // -- Products --
  async getProducts(): Promise<Product[]> {
    return await db.select().from(productsTable);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    return product;
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return await db.select().from(productsTable).where(eq(productsTable.categoryId, categoryId));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(productsTable).where(eq(productsTable.isFeatured, true));
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchStr = `%${query}%`;
    return await db.select().from(productsTable).where(
      or(
        ilike(productsTable.name, searchStr),
        ilike(productsTable.description, searchStr)
      )
    );
  }

  // -- Cart --
  async getCart(sessionId: string): Promise<CartItem[]> {
    return await db.select().from(cartItemsTable).where(eq(cartItemsTable.sessionId, sessionId));
  }

  async getCartItem(sessionId: string, productId: string): Promise<CartItem | undefined> {
    const [item] = await db.select().from(cartItemsTable).where(
      and(
        eq(cartItemsTable.sessionId, sessionId),
        eq(cartItemsTable.productId, productId)
      )
    );
    return item;
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const [existing] = await db.select().from(cartItemsTable).where(
        and(eq(cartItemsTable.sessionId, item.sessionId), eq(cartItemsTable.productId, item.productId))
    );

    if (existing) {
        const [updated] = await db.update(cartItemsTable)
            .set({ quantity: existing.quantity + item.quantity })
            .where(eq(cartItemsTable.id, existing.id))
            .returning();
        return updated;
    }

    const [newItem] = await db.insert(cartItemsTable).values(item).returning();
    return newItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [updated] = await db.update(cartItemsTable)
      .set({ quantity })
      .where(eq(cartItemsTable.id, id))
      .returning();
    return updated;
  }

  async removeFromCart(id: string): Promise<void> {
    await db.delete(cartItemsTable).where(eq(cartItemsTable.id, id));
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItemsTable).where(eq(cartItemsTable.sessionId, sessionId));
  }

  // -- Orders --
  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(ordersTable).values({
        ...order,
        status: "pending",
        createdAt: new Date()
    }).returning();
    return newOrder;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
    return order;
  }

  async getOrdersBySession(sessionId: string): Promise<Order[]> {
    return await db.select().from(ordersTable).where(eq(ordersTable.sessionId, sessionId));
  }
}

// --- 4. DATA SEEDING (Auto-runs on startup) ---
async function seedDatabase() {
  try {
    const existingCategories = await db.select().from(categoriesTable);
    if (existingCategories.length === 0) {
      console.log("🌱 Seeding database with original products...");
      
      // 1. Insert Categories
      await db.insert(categoriesTable).values([
        { id: "tequila", name: "Tequila", description: "Authentic Mexican tequilas and cream liqueurs" },
        { id: "whiskey", name: "Whiskey", description: "Premium scotch, bourbon, and blends" },
        { id: "wine", name: "Wine", description: "Red, white, and sparkling wines" },
        { id: "local", name: "Local Brands", description: "Proudly Philippine made favorites" },
      ]);

      // 2. Insert All Products (Prices as numbers/strings depending on schema)
      await db.insert(productsTable).values([
        // TEQUILA
        {
          id: "1", name: "Tequila Rose", categoryId: "tequila", price: "899.00",
          description: "Strawberry cream liqueur with a splash of tequila.", volume: "750ml", abv: 15, imageUrl: "/products/tequila-rose.jpg",
          stock: 50, isFeatured: true, tags: ["cream", "sweet", "pink"]
        },
        {
          id: "2", name: "Cazadores Reposado", categoryId: "tequila", price: "1100.00",
          description: "Original tequila made with 100% Blue Agave, aged in new oak barrels.", volume: "750ml", abv: 40, imageUrl: "/products/cazadores-reposado.jpg",
          stock: 30, isFeatured: false, tags: ["reposado", "100% agave", "smooth"]
        },
        {
          id: "3", name: "Jose Cuervo Gold", categoryId: "tequila", price: "1099.00",
          description: "Golden-style joven tequila made from a blend of reposado and younger tequilas.", volume: "700ml", abv: 40, imageUrl: "/products/jose-cuervo.jpg",
          stock: 100, isFeatured: false, tags: ["gold", "classic", "mixer"]
        },
        {
          id: "4", name: "Jose Cuervo Especial Silver", categoryId: "tequila", price: "899.00",
          description: "Silver tequila specially crafted for smoothness.", volume: "700ml", abv: 40, imageUrl: "/products/jose-cuervo-blue.jpg",
          stock: 60, isFeatured: false, tags: ["silver", "clear", "smooth"]
        },

        // WHISKEY
        {
          id: "5", name: "Johnnie Walker Black Label", categoryId: "whiskey", price: "1150.00",
          description: "Iconic blend of whiskies aged for a minimum of 12 years.", volume: "700ml", abv: 40, imageUrl: "/products/jw-black.jpg",
          stock: 80, isFeatured: true, tags: ["scotch", "blended", "12 year"]
        },
        {
          id: "6", name: "Jack Daniel's Old No. 7", categoryId: "whiskey", price: "1299.00",
          description: "Tennessee sour mash whiskey, charcoal mellowed for smoothness.", volume: "700ml", abv: 40, imageUrl: "/products/jack-daniels.jpg",
          stock: 90, isFeatured: true, tags: ["tennessee", "bourbon", "classic"]
        },
        {
          id: "7", name: "Johnnie Walker Blue Label", categoryId: "whiskey", price: "6299.00",
          description: "An exquisite blend of Scotland's rarest and most exceptional whiskies.", volume: "750ml", abv: 40, imageUrl: "/products/jw-blue.jpg",
          stock: 10, isFeatured: true, tags: ["luxury", "rare", "gift"]
        },
        {
          id: "8", name: "Glenfiddich 12 Year", categoryId: "whiskey", price: "2299.00",
          description: "The world's most awarded single malt Scotch whisky.", volume: "700ml", abv: 40, imageUrl: "/products/glenfiddich.jpg",
          stock: 25, isFeatured: false, tags: ["single malt", "scotch", "aged"]
        },

        // WINE
        {
          id: "9", name: "Carlo Rossi California Red", categoryId: "wine", price: "349.00",
          description: "A rich, fruit-forward red wine with flavors of raspberry and cherry.", volume: "750ml", abv: 11.5, imageUrl: "/products/carlo-rossi-red.jpg",
          stock: 100, isFeatured: false, tags: ["red wine", "california", "table wine"]
        },
        {
          id: "10", name: "Carlo Rossi Sangria", categoryId: "wine", price: "349.00",
          description: "Sweet and refreshing wine with citrus fruit flavors.", volume: "750ml", abv: 10, imageUrl: "/products/carlo-rossi-sangria.jpg",
          stock: 100, isFeatured: false, tags: ["sweet", "sangria", "fruity"]
        },
        {
          id: "11", name: "Lindeman's Cawarra Chardonnay", categoryId: "wine", price: "449.00",
          description: "Medium-bodied white wine with stone fruit flavors and a creamy finish.", volume: "750ml", abv: 13.5, imageUrl: "/products/lindemans-chardonnay.jpg",
          stock: 40, isFeatured: false, tags: ["white wine", "dry", "australian"]
        },
        {
          id: "12", name: "Santa Carolina Premio Red", categoryId: "wine", price: "429.00",
          description: "A classic Chilean red blend perfect for everyday dining.", volume: "750ml", abv: 12, imageUrl: "/products/vsc-premio.jpg",
          stock: 60, isFeatured: false, tags: ["red wine", "value", "dinner"]
        },

        // LOCAL BRANDS
        {
          id: "13", name: "Ginebra San Miguel Frasco", categoryId: "local", price: "140.00",
          description: "The world's largest selling gin. Distinct taste and strong kick.", volume: "700ml", abv: 40, imageUrl: "/products/ginebra-frasco.jpg",
          stock: 200, isFeatured: false, tags: ["gin", "local", "strong"]
        },
        {
          id: "14", name: "San Miguel Pale Pilsen", categoryId: "local", price: "120.00",
          description: "The original Philippine beer. Full-bodied with a pleasant bitterness.", volume: "320ml", abv: 5, imageUrl: "/products/pale-pilsen.jpg",
          stock: 200, isFeatured: true, tags: ["beer", "classic", "local"]
        },
        {
          id: "15", name: "Alfonso Light", categoryId: "local", price: "285.00",
          description: "A premium brandy liqueur that is easy to drink.", volume: "700ml", abv: 25, imageUrl: "/products/alfonso-light.jpg",
          stock: 150, isFeatured: false, tags: ["brandy", "local", "light"]
        },
        {
          id: "16", name: "Fundador Super Special", categoryId: "local", price: "300.00",
          description: "Distinctive spirit drink with a balanced aroma and smooth taste.", volume: "1L", abv: 23.5, imageUrl: "/products/fundador.jpg",
          stock: 120, isFeatured: false, tags: ["brandy", "imported-local", "smooth"]
        },
      ]);
      console.log("✅ Database seeded successfully!");
    } else {
      console.log("ℹ️ Database already has data, skipping seed.");
    }
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
}

// Run seed on startup
seedDatabase().catch(console.error);

export const storage = new DrizzleStorage();