import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const { items, isLoading, itemCount, subtotal, tax, total, updateQuantity, removeItem } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 py-12 px-6">
      <div className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <span className="text-gray-400 hover:text-white cursor-pointer">Home</span>
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span>Cart</span>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold mt-4">Your Cart</h1>
          <p className="text-gray-400 mt-2">{itemCount} items</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
            <Link href="/shop">
              <Button className="bg-[#333333] hover:bg-[#444444] rounded-2xl px-8 py-4 font-['Poppins']">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <Card key={item.id} className="rounded-2xl overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-['Poppins'] font-medium text-lg hover:underline cursor-pointer">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500">{item.product.volume}</p>
                        <p className="font-['Poppins'] font-bold text-lg mt-1">
                          ₱{Number(item.product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                        <div className="flex items-center border rounded-xl overflow-hidden">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="px-3 py-2 hover:bg-gray-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 font-['Poppins']">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-['Poppins'] font-medium text-lg mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₱{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax (8%)</span>
                    <span>₱{tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₱{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-[#333333] hover:bg-[#444444] text-white py-6 text-lg rounded-2xl font-['Poppins'] font-medium shadow-lg">
                    PROCEED TO CHECKOUT
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="w-full mt-4 py-4 rounded-2xl font-['Poppins']">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
