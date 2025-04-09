
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Truck, BarChart2, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check if user is authenticated and redirect to login if not
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-optimove-primary">Welcome to OptiMove</h1>
        <p className="text-optimove-text-light mt-2">
          Maximize your earnings with smart delivery choices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-optimove-primary/10 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-optimove-primary" />
            </div>
            <CardTitle className="mt-4">Available Orders</CardTitle>
            <CardDescription>
              Browse and accept high-paying delivery orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              View orders sorted by pay amount, with pickup and delivery details.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/orders")} className="w-full bg-optimove-primary hover:bg-opacity-90">
              View Orders
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-optimove-secondary/10 rounded-full flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-optimove-secondary" />
            </div>
            <CardTitle className="mt-4">Earnings Dashboard</CardTitle>
            <CardDescription>
              Track your daily and weekly earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Get insights into your earnings by platform and monitor your progress.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/dashboard")} className="w-full bg-optimove-secondary hover:bg-opacity-90">
              View Dashboard
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-optimove-success/10 rounded-full flex items-center justify-center">
              <Bell className="h-6 w-6 text-optimove-success" />
            </div>
            <CardTitle className="mt-4">Notifications</CardTitle>
            <CardDescription>
              Stay updated with important alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Receive notifications about new orders, peak times, and high-paying opportunities.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/notifications")} variant="outline" className="w-full border-optimove-success text-optimove-success hover:bg-optimove-success/10">
              View Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-6 bg-gradient-to-r from-optimove-primary to-optimove-secondary text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">Currently live in Jaipur!</h3>
          <p>
            OptiMove is now serving delivery partners in Jaipur city with real-time order aggregation from multiple platforms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
