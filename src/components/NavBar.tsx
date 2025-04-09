
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, List, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const NavBar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  // Define nav items
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: List, label: "Orders", path: "/orders" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path}
            to={item.path} 
            className="flex-1"
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full h-16 flex flex-col items-center justify-center gap-1 rounded-lg",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
