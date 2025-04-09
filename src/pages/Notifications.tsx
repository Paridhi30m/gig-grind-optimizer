
import { useState, useEffect } from "react";
import { fetchNotifications } from "@/services/mockData";
import { Notification } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Bell, Clock, TrendingUp, AlertCircle, Info } from "lucide-react";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Bell className="h-5 w-5" />;
      case "peak":
        return <Clock className="h-5 w-5" />;
      case "high-pay":
        return <TrendingUp className="h-5 w-5" />;
      case "system":
        return <Info className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-600";
      case "peak":
        return "bg-amber-100 text-amber-600";
      case "high-pay":
        return "bg-optimove-success/20 text-optimove-success";
      case "system":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notifications</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-optimove-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{notification.title}</h3>
                        {!notification.read && (
                          <Badge className="bg-optimove-primary">New</Badge>
                        )}
                      </div>
                      <p className="text-optimove-text-light mt-1">{notification.message}</p>
                      <p className="text-xs text-optimove-text-light mt-2">
                        {formatDistanceToNow(parseISO(notification.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-optimove-text-light">No notifications found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
