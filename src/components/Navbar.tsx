
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/services/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count unread notifications
  const unreadCount = mockNotifications.filter((notif) => !notif.read).length;

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-optimove-primary">OptiMove</h1>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/orders" className="text-optimove-text hover:text-optimove-primary">
            Orders
          </Link>
          <Link to="/dashboard" className="text-optimove-text hover:text-optimove-primary">
            Dashboard
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-optimove-primary">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium text-lg border-b">Notifications</div>
              {mockNotifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem key={notification.id} className="cursor-pointer p-3">
                  <div>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground">{notification.message}</div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="cursor-pointer justify-center">
                <Link to="/notifications" className="w-full text-center text-sm text-optimove-primary">
                  View All Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={logout} className="ml-2">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-lg md:hidden">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link
              to="/orders"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-optimove-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-optimove-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/notifications"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-optimove-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-optimove-primary">{unreadCount}</Badge>
              )}
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
