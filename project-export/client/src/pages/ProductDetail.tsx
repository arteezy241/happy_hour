import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import type { Product, Category } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
  });

  const { data: category } = useQuery<Category>({
    queryKey: ["/api/categories", product?.categoryId],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${product?.categoryId}`);
      if (!res.ok) throw new Error("Failed to fetch category");
      return res.json();
    },
    enabled: !!product?.categoryId,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.name} added to your cart`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Product not found</h1>
          <Link href="/shop">
            <Button className="rounded-2xl">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 py-12 px-6">
      <div className="py-16 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center text-sm ">
          <Link href="/">
            <span className="text-gray-500 hover:text-gray-900 cursor-pointer">Home</span>
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link href="/shop">
            <span className="text-gray-500 hover:text-gray-900 cursor-pointer">Shop</span>
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          {category && (
            <>
              <Link href={`/shop?category=${category.id}`}>
                <span className="text-gray-500 hover:text-gray-900 cursor-pointer">{category.name}</span>
              </Link>
              <span className="text-gray-400 mx-2">/</span>
            </>
          )}
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-2 dark:text-white">
              {product.name}
            </h1>
            <p className="text-gray-500 mb-4">{product.volume} • {product.abv}% ABV</p>
            
            <p className="font-['Poppins'] text-3xl font-bold text-[#333333] dark:text-white mb-6">
              {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(product.price)}
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-900 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 font-bold text-lg"
                >
                  -
                </button>
                <span className="px-6 py-3 font-['Poppins'] font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 font-bold text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-[#333333] hover:bg-[#444444] text-white py-6 text-lg rounded-2xl font-['Poppins'] font-medium shadow-lg"
            >
              ADD TO CART
            </Button>

            <Link href="/cart">
              <Button
                variant="outline"
                className="w-full mt-4 py-6 text-lg rounded-2xl font-['Poppins']"
              >
                VIEW CART
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
