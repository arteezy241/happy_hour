import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Order } from "@shared/schema";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", id],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/">
            <Button className="rounded-2xl">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="font-['Playfair_Display'] text-4xl font-bold mb-2">
            Thank You!
          </h1>
          <p className="text-gray-500 text-lg">Your order has been placed successfully</p>
        </div>

        <Card className="rounded-2xl text-left mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-['Poppins'] font-medium">#{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-['Poppins'] font-medium capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-['Poppins'] font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-['Poppins'] font-bold text-lg">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-['Poppins'] font-medium mb-2">Shipping To:</h3>
              <p className="text-gray-600">
                {order.customerName}<br />
                {order.address}<br />
                {order.city}, {order.state} {order.zipCode}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button className="bg-[#333333] hover:bg-[#444444] rounded-2xl px-8 py-4 font-['Poppins']">
              CONTINUE SHOPPING
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="rounded-2xl px-8 py-4 font-['Poppins']">
              GO HOME
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
