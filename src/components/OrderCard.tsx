
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import { MapPin, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const handleAcceptOrder = () => {
    toast.success(`Order accepted from ${order.platformName.toUpperCase()}`);
  };

  const getPlatformBadgeClass = (platform: string) => {
    return `platform-badge-${platform.toLowerCase()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-platform-${order.platformName}">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Badge className={getPlatformBadgeClass(order.platformName)}>
            {order.platformName.toUpperCase()}
          </Badge>
        </div>
        <div className="text-lg font-bold text-optimove-success">₹{order.payAmount}</div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-optimove-text-light" />
          <span>
            Pickup: {order.pickupDistance} km | Delivery: {order.deliveryDistance} km
          </span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-1 text-optimove-text-light" />
          <span>Est. Time: {order.estimatedTime} mins</span>
        </div>
        <div className="flex items-center text-sm">
          <TrendingUp className="h-4 w-4 mr-1 text-optimove-success" />
          <span className="text-optimove-success font-medium">
            ₹{Math.round(order.payAmount / order.estimatedTime * 60)} per hour
          </span>
        </div>
      </div>

      <Button 
        onClick={handleAcceptOrder} 
        className="w-full bg-optimove-primary hover:bg-opacity-90"
      >
        Accept Order
      </Button>
    </div>
  );
};

export default OrderCard;
