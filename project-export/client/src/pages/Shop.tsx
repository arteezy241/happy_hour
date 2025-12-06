import { useQuery } from "@tanstack/react-query";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import type { Product, Category } from "@shared/schema";

export default function Shop() {
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory, searchQuery],
    queryFn: async () => {
      let url = "/api/products";
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      } else if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 py-12 px-6">
      <div className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <span className="text-gray-400 hover:text-white cursor-pointer">Home</span>
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span>Shop</span>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold mt-4">Our Collection</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory("");
            }}
            className="md:w-80 rounded-xl"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "" && !searchQuery ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory("");
                setSearchQuery("");
              }}
              className="rounded-xl"
            >
              All
            </Button>
            {categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery("");
                }}
                className="rounded-xl"
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="cursor-pointer hover:shadow-xl transition-shadow rounded-2xl overflow-hidden h-full">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-['Poppins'] font-medium text-base mb-1 line-clamp-2 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{product.volume}</p>
                    <p className="font-['Poppins'] font-bold text-lg text-[#333333] dark:text-white mb-6">
                      <p className="font-['Poppins'] font-bold text-lg text-[#333333] dark:text-white mb-6">
  ₱{Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
</p>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
