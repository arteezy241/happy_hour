import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, Category } from "@shared/schema";

export default function Home() {
  // Define the base URL once
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

  // 1. FIX: Fetch Featured Products with Base URL
  const { data: featuredProducts, isLoading: loadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", "featured"],
    queryFn: async () => {
      // Original: const res = await fetch("/api/products?featured=true");
      const res = await fetch(`${baseUrl}/api/products?featured=true`); 
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  // 2. FIX: Fetch Categories with Base URL
  const { data: categories, isLoading: loadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      // Original: const res = await fetch("/api/categories");
      const res = await fetch(`${baseUrl}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <img 
              src="/figmaAssets/image-1.png" 
              alt="Happy Hour Liquors"
              className="w-48 h-48 mx-auto object-contain rounded-3xl"
            />
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">
            Happy Hour Liquors
          </h1>
          <p className="font-['Playfair_Display'] text-xl text-gray-300 mb-8">
            "celebrating the craft behind every bottle"
          </p>
          <Link href="/shop">
            <Button className="bg-[#333333] hover:bg-[#444444] text-white px-10 py-6 text-lg rounded-2xl font-['Poppins'] font-medium shadow-lg transition-transform hover:scale-105">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-center mb-10 dark:text-white">
            Shop by Category
          </h2>
          {loadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories?.map((category) => (
                <Link key={category.id} href={`/shop?category=${category.id}`}>
                  <div className="border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 p-6 rounded-2xl text-center hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col justify-center items-center gap-2 group">
                    <h3 className="font-['Playfair_Display'] font-bold text-xl group-hover:text-[#333333] dark:text-white dark:group-hover:text-gray-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-center mb-10 dark:text-white">
            Featured Products
          </h2>
          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[300px] w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="cursor-pointer hover:shadow-xl transition-shadow rounded-2xl overflow-hidden h-full dark:bg-gray-900 dark:border-gray-800">
                    <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-['Poppins'] font-medium text-lg mb-1 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{product.volume}</p>
                      <p className="font-['Poppins'] font-bold text-lg text-[#333333] dark:text-white mb-6">
                        {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(Number(product.price))}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/shop">
              <Button variant="outline" className="rounded-2xl px-8 py-6 text-lg font-['Poppins'] dark:text-white dark:border-gray-600 dark:hover:bg-gray-800">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">Happy Hour Liquors</h3>
          <p className="text-gray-400 mb-4">Premium spirits for every occasion</p>
          <p className="text-sm text-gray-500">Must be 21+ to purchase. Please drink responsibly.</p>
        </div>
      </footer>
    </div>
  );
}