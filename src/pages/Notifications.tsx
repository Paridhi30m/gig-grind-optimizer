
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import { IndianRupee, Bell, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock notification data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    title: "New high-paying order!",
    description: "Zomato order for ₹180 available near you.",
    timestamp: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "peak",
    title: "Peak Time Alert",
    description: "It's peak lunch hour! Higher earning opportunity.",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "earnings",
    title: "Daily Earnings Update",
    description: "You've earned ₹950 today so far.",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "order",
    title: "New order nearby",
    description: "Swiggy order for ₹120 available.",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "App Update",
    description: "New features available. Check them out!",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "peak",
    title: "Weekend Peak Hours",
    description: "Higher earnings expected this weekend.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 7,
    type: "earnings",
    title: "Weekly Summary",
    description: "You earned ₹8,750 this week. Great job!",
    timestamp: "3 days ago",
    read: true,
  },
];

const getIconForType = (type: string) => {
  switch (type) {
    case "order":
      return <IndianRupee className="h-4 w-4" />;
    case "peak":
      return <TrendingUp className="h-4 w-4" />;
    case "earnings":
      return <IndianRupee className="h-4 w-4" />;
    case "system":
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case "order":
      return "bg-primary/10 text-primary";
    case "peak":
      return "bg-orange-500/10 text-orange-500";
    case "earnings":
      return "bg-green-500/10 text-green-500";
    case "system":
      return "bg-blue-500/10 text-blue-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

const Notifications: React.FC = () => {
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <main className="container p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="font-normal">
              {unreadCount} new
            </Badge>
          )}
        </div>
        
        <Card>
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <CardDescription>Recent notifications</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <ScrollArea className="h-[70vh] pr-2">
              <div className="space-y-1 p-2">
                {MOCK_NOTIFICATIONS.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${notification.read ? 'bg-background' : 'bg-primary/5'}`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getColorForType(notification.type)}`}>
                        {getIconForType(notification.type)}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-start justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {notification.timestamp}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Notifications;
