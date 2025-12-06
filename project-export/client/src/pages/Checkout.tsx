import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, subtotal, tax, total, sessionId, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 ...">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/shop">
            <Button className="bg-[#333333] hover:bg-[#444444] rounded-2xl px-8 py-4 font-['Poppins']">
              CONTINUE SHOPPING
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        ...formData,
        sessionId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
        subtotal,
        tax,
        total,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const order = await res.json();
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Order #${order.id.slice(0, 8)} has been confirmed.`,
      });
      setLocation(`/order-confirmation/${order.id}`);
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 py-12 px-6">
      <div className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/cart">
            <span className="text-gray-400 hover:text-white cursor-pointer">Cart</span>
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span>Checkout</span>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold mt-4">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="rounded-2xl dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-6">
                  <h2 className="font-['Poppins'] font-medium text-lg mb-4">Contact Information</h2>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        className="rounded-xl mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="rounded-xl mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="rounded-xl mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-6">
                  <h2 className="font-['Poppins'] font-medium text-lg mb-4">Shipping Address</h2>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="rounded-xl mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="rounded-xl mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="rounded-xl mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="rounded-xl mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="rounded-2xl sticky top-6 dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-6">
                  <h2 className="font-['Poppins'] font-medium text-lg mb-4 dark:text-white">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span>₱{(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span>₱{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax (8%)</span>
                      <span>₱{tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>₱{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-[#333333] hover:bg-[#444444] text-white py-6 text-lg rounded-2xl font-['Poppins'] font-medium shadow-lg"
                  >
                    {isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
