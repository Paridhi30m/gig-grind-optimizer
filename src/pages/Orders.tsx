
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, IndianRupee, Navigation, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for orders
const MOCK_ORDERS = [
  {
    id: 1,
    platform: "Swiggy",
    pay: 120,
    pickupDistance: 1.2,
    deliveryDistance: 2.5,
    estimatedTime: 25,
    pickupLocation: "Vaishali Nagar",
    deliveryLocation: "C Scheme",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    platform: "Zomato",
    pay: 150,
    pickupDistance: 0.8,
    deliveryDistance: 3.2,
    estimatedTime: 30,
    pickupLocation: "Malviya Nagar",
    deliveryLocation: "Jagatpura",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    platform: "Dunzo",
    pay: 90,
    pickupDistance: 0.5,
    deliveryDistance: 1.7,
    estimatedTime: 20,
    pickupLocation: "Raja Park",
    deliveryLocation: "Tonk Road",
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    platform: "Swiggy",
    pay: 110,
    pickupDistance: 1.5,
    deliveryDistance: 2.2,
    estimatedTime: 28,
    pickupLocation: "Mansarovar",
    deliveryLocation: "Pratap Nagar",
    timestamp: new Date().toISOString(),
  },
  {
    id: 5,
    platform: "Zomato",
    pay: 135,
    pickupDistance: 1.0,
    deliveryDistance: 2.8,
    estimatedTime: 32,
    pickupLocation: "Jawahar Circle",
    deliveryLocation: "Sitapura",
    timestamp: new Date().toISOString(),
  }
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS.sort((a, b) => b.pay - a.pay));
  const { toast } = useToast();

  const handleAcceptOrder = (id: number) => {
    // For MVP, we're just removing the order from the list
    setOrders(orders.filter((order) => order.id !== id));
    toast({
      title: "Order Accepted!",
      description: "You've successfully accepted this order.",
    });
  };

  // Function to determine badge color based on platform
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "swiggy":
        return "bg-[#FC8019] text-white";
      case "zomato":
        return "bg-[#EF4F5F] text-white";
      case "dunzo":
        return "bg-[#0C9BF0] text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <main className="container p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Available Orders</h2>
          <Badge variant="outline" className="font-normal">
            {orders.length} orders
          </Badge>
        </div>
        
        {orders.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center space-y-2">
              <p className="text-muted-foreground">No orders available right now.</p>
              <p className="text-sm text-muted-foreground">Check back soon for new orders.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <Badge className={`${getPlatformColor(order.platform)}`}>
                      {order.platform}
                    </Badge>
                    <CardDescription className="mt-1">
                      Order #{order.id}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold flex items-center justify-end">
                      <IndianRupee className="h-4 w-4 mr-0.5" />
                      {order.pay}
                    </p>
                    <CardDescription>
                      <Clock className="h-3.5 w-3.5 inline mr-0.5" />
                      {order.estimatedTime} min
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-0 pb-2 space-y-3">
                  <div className="grid grid-cols-[auto,1fr] gap-2 mt-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1"></div>
                      <div className="w-0.5 h-8 bg-border"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive"></div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          Pickup ({order.pickupDistance} km)
                        </p>
                        <p className="text-xs text-muted-foreground">{order.pickupLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          Delivery ({order.deliveryDistance} km)
                        </p>
                        <p className="text-xs text-muted-foreground">{order.deliveryLocation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-2 flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Location Opened",
                        description: "Opening map application...",
                      });
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
