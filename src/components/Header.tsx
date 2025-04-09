
import React from "react";
import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  // Dynamically set title based on current route
  const getTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/orders":
        return "Orders";
      case "/notifications":
        return "Notifications";
      case "/profile":
        return "Profile";
      default:
        return "Optimove";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-lg font-semibold">{getTitle()}</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
