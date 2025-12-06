import { 
  type Category, 
  type Product, 
  type CartItem, 
  type Order,
  type InsertCartItem,
  type InsertOrder
} from "@shared/schema";
import { randomUUID } from "crypto";

const categories: Category[] = [
  { id: "tequila", name: "Tequila", description: "Authentic Mexican tequilas and cream liqueurs" },
  { id: "whiskey", name: "Whiskey", description: "Premium scotch, bourbon, and blends" },
  { id: "wine", name: "Wine", description: "Red, white, and sparkling wines" },
  { id: "local", name: "Local Brands", description: "Proudly Philippine made favorites" },
];

const products: Product[] = [
  // TEQUILA CATEGORY
  {
    id: "1",
    name: "Tequila Rose",
    categoryId: "tequila",
    description: "Strawberry cream liqueur with a splash of tequila.",
    price: 899.00,
    volume: "750ml", // Standard bottle size
    abv: 15, // Standard ABV
    imageUrl: "/products/tequila-rose.jpg", 
    tags: ["cream", "sweet", "pink"],
    isFeatured: true,
    stock: 50
  },
  {
    id: "2",
    name: "Cazadores Reposado",
    categoryId: "tequila",
    description: "Original tequila made with 100% Blue Agave, aged in new oak barrels.",
    price: 1100.00,
    volume: "750ml", // Standard bottle size
    abv: 40, // Standard ABV
    imageUrl: "/products/cazadores-reposado.jpg",
    tags: ["reposado", "100% agave", "smooth"],
    isFeatured: false,
    stock: 30
  },
  {
    id: "3",
    name: "Jose Cuervo Gold",
    categoryId: "tequila",
    description: "Golden-style joven tequila made from a blend of reposado and younger tequilas.",
    price: 1099.00,
    volume: "700ml", // PH standard is 700ml
    abv: 40,
    imageUrl: "/products/jose-cuervo.jpg",
    tags: ["gold", "classic", "mixer"],
    isFeatured: false,
    stock: 100
  },
  {
    id: "4",
    name: "Jose Cuervo Especial Silver", // Corrected name for "Blue Agave"
    categoryId: "tequila",
    description: "Silver tequila specially crafted for smoothness.",
    price: 899.00,
    volume: "700ml", // PH standard is 700ml
    abv: 40,
    imageUrl: "/products/jose-cuervo-blue.jpg",
    tags: ["silver", "clear", "smooth"],
    isFeatured: false,
    stock: 60
  },

  // WHISKEY CATEGORY
  {
    id: "5",
    name: "Johnnie Walker Black Label",
    categoryId: "whiskey",
    description: "Iconic blend of whiskies aged for a minimum of 12 years.",
    price: 1150.00,
    volume: "700ml", // PH standard is 700ml (70cl)
    abv: 40,
    imageUrl: "/products/jw-black.jpg",
    tags: ["scotch", "blended", "12 year"],
    isFeatured: true,
    stock: 80
  },
  {
    id: "6",
    name: "Jack Daniel's Old No. 7",
    categoryId: "whiskey",
    description: "Tennessee sour mash whiskey, charcoal mellowed for smoothness.",
    price: 1299.00,
    volume: "700ml", // Commonly 700ml or 1L in PH
    abv: 40,
    imageUrl: "/products/jack-daniels.jpg",
    tags: ["tennessee", "bourbon", "classic"],
    isFeatured: true,
    stock: 90
  },
  {
    id: "7",
    name: "Johnnie Walker Blue Label",
    categoryId: "whiskey",
    description: "An exquisite blend of Scotland's rarest and most exceptional whiskies.",
    price: 6299.00,
    volume: "750ml", // Standard Blue Label size
    abv: 40,
    imageUrl: "/products/jw-blue.jpg",
    tags: ["luxury", "rare", "gift"],
    isFeatured: true,
    stock: 10
  },
  {
    id: "8",
    name: "Glenfiddich 12 Year",
    categoryId: "whiskey",
    description: "The world's most awarded single malt Scotch whisky.",
    price: 2299.00,
    volume: "700ml", // Standard PH size
    abv: 40,
    imageUrl: "/products/glenfiddich.jpg",
    tags: ["single malt", "scotch", "aged"],
    isFeatured: false,
    stock: 25
  },

  // WINE CATEGORY
  {
    id: "9",
    name: "Carlo Rossi California Red",
    categoryId: "wine",
    description: "A rich, fruit-forward red wine with flavors of raspberry and cherry.",
    price: 349.00,
    volume: "750ml", // Standard wine bottle
    abv: 11.5, // Confirmed ABV
    imageUrl: "/products/carlo-rossi-red.jpg",
    tags: ["red wine", "california", "table wine"],
    isFeatured: false,
    stock: 100
  },
  {
    id: "10",
    name: "Carlo Rossi Sangria",
    categoryId: "wine",
    description: "Sweet and refreshing wine with citrus fruit flavors.",
    price: 349.00,
    volume: "750ml", // Standard wine bottle
    abv: 10, // Confirmed ABV
    imageUrl: "/products/carlo-rossi-sangria.jpg",
    tags: ["sweet", "sangria", "fruity"],
    isFeatured: false,
    stock: 100
  },
  {
    id: "11",
    name: "Lindeman's Cawarra Chardonnay",
    categoryId: "wine",
    description: "Medium-bodied white wine with stone fruit flavors and a creamy finish.",
    price: 449.00,
    volume: "750ml", // Standard wine bottle
    abv: 13.5, // Confirmed ABV
    imageUrl: "/products/lindemans-chardonnay.jpg",
    tags: ["white wine", "dry", "australian"],
    isFeatured: false,
    stock: 40
  },
  {
    id: "12",
    name: "Santa Carolina Premio Red", // Corrected Name
    categoryId: "wine",
    description: "A classic Chilean red blend perfect for everyday dining.",
    price: 429.00,
    volume: "750ml", // Standard wine bottle
    abv: 12, // Average ABV for this blend
    imageUrl: "/products/vsc-premio.jpg",
    tags: ["red wine", "value", "dinner"],
    isFeatured: false,
    stock: 60
  },

  // LOCAL BRANDS CATEGORY
  {
    id: "13",
    name: "Ginebra San Miguel Frasco",
    categoryId: "local",
    description: "The world's largest selling gin. Distinct taste and strong kick.",
    price: 140.00,
    volume: "700ml", // Frasco size is 700ml
    abv: 40,
    imageUrl: "/products/ginebra-frasco.jpg",
    tags: ["gin", "local", "strong"],
    isFeatured: false,
    stock: 200
  },
  {
    id: "14",
    name: "San Miguel Pale Pilsen",
    categoryId: "local",
    description: "The original Philippine beer. Full-bodied with a pleasant bitterness.",
    price: 120.00,
    volume: "320ml", // Classic Steinie bottle
    abv: 5,
    imageUrl: "/products/pale-pilsen.jpg",
    tags: ["beer", "classic", "local"],
    isFeatured: true,
    stock: 200
  },
  {
    id: "15",
    name: "Alfonso Light",
    categoryId: "local",
    description: "A premium brandy liqueur that is easy to drink.",
    price: 285.00,
    volume: "700ml", // Standard bottle
    abv: 25, // Confirmed ABV for Light
    imageUrl: "/products/alfonso-light.jpg",
    tags: ["brandy", "local", "light"],
    isFeatured: false,
    stock: 150
  },
  {
    id: "16",
    name: "Fundador Super Special",
    categoryId: "local",
    description: "Distinctive spirit drink with a balanced aroma and smooth taste.",
    price: 300.00,
    volume: "1L", // Super Special is often sold in 1L
    abv: 23.5, // Accurate ABV
    imageUrl: "/products/fundador.jpg",
    tags: ["brandy", "imported-local", "smooth"],
    isFeatured: false,
    stock: 120
  },
];

// ... KEEP THE REST OF THE CLASS MemStorage BELOW AS IS ...

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

export class MemStorage implements IStorage {
  private categoriesData: Map<string, Category>;
  private productsData: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.categoriesData = new Map(categories.map(c => [c.id, c]));
    this.productsData = new Map(products.map(p => [p.id, p]));
    this.cartItems = new Map();
    this.orders = new Map();
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categoriesData.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categoriesData.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.productsData.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.productsData.get(id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.productsData.values()).filter(p => p.categoryId === categoryId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.productsData.values()).filter(p => p.isFeatured);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.productsData.values()).filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags?.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  async getCart(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async getCartItem(sessionId: string, productId: string): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(
      item => item.sessionId === sessionId && item.productId === productId
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const existing = await this.getCartItem(insertItem.sessionId, insertItem.productId);
    if (existing) {
      const updated = await this.updateCartItem(existing.id, existing.quantity + insertItem.quantity);
      return updated!;
    }
    const id = randomUUID();
    const item: CartItem = { ...insertItem, id };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, quantity };
    this.cartItems.set(id, updated);
    return updated;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const toRemove = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id]) => id);
    toRemove.forEach(id => this.cartItems.delete(id));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersBySession(sessionId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(o => o.sessionId === sessionId);
  }
}

export const storage = new MemStorage();
