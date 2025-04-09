
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { IndianRupee, TrendingUp, Clock, ArrowUpRight } from "lucide-react";

// Mock data for the dashboard
const MOCK_DATA = {
  todayEarnings: 1250,
  weeklyEarnings: 8750,
  weeklyTarget: 10000,
  deliveriesCompleted: 15,
  averageEarningPerDelivery: 83,
  platformComparison: [
    { name: "Swiggy", value: 4250, percentage: 48 },
    { name: "Zomato", value: 3500, percentage: 40 },
    { name: "Dunzo", value: 1000, percentage: 12 }
  ]
};

const Dashboard: React.FC = () => {
  const { phoneNumber } = useAuth();
  
  // Calculate weekly progress percentage
  const weeklyProgressPercentage = Math.floor((MOCK_DATA.weeklyEarnings / MOCK_DATA.weeklyTarget) * 100);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <main className="container p-4 space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm text-muted-foreground">Welcome back!</h2>
          <p className="text-xl font-semibold">{phoneNumber}</p>
        </section>
      
        <section className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/5">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <IndianRupee className="h-3.5 w-3.5 mr-1" />Today's Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-2xl font-bold">₹{MOCK_DATA.todayEarnings}</p>
              <p className="text-xs text-muted-foreground">{MOCK_DATA.deliveriesCompleted} deliveries</p>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />Avg. Per Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-2xl font-bold">₹{MOCK_DATA.averageEarningPerDelivery}</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
        </section>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="text-base">Weekly Progress</span>
              <span className="text-base font-normal text-muted-foreground">{weeklyProgressPercentage}%</span>
            </CardTitle>
            <CardDescription>
              ₹{MOCK_DATA.weeklyEarnings} of ₹{MOCK_DATA.weeklyTarget} target
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="h-2 bg-secondary rounded-full w-full">
              <div 
                className="h-2 bg-primary rounded-full" 
                style={{ width: `${weeklyProgressPercentage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Platform Breakdown</CardTitle>
            <CardDescription>Your earnings by platform</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-4">
            {MOCK_DATA.platformComparison.map((platform) => (
              <div key={platform.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{platform.name}</p>
                  <p className="text-sm">₹{platform.value}</p>
                </div>
                <div className="h-2 bg-secondary rounded-full w-full">
                  <div 
                    className={`h-2 rounded-full ${
                      platform.name === "Swiggy" ? "bg-[#FC8019]" : 
                      platform.name === "Zomato" ? "bg-[#EF4F5F]" : 
                      "bg-[#0C9BF0]"
                    }`} 
                    style={{ width: `${platform.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i % 3 === 0 ? "bg-[#FC8019]/10 text-[#FC8019]" : 
                    i % 3 === 1 ? "bg-[#EF4F5F]/10 text-[#EF4F5F]" : 
                    "bg-[#0C9BF0]/10 text-[#0C9BF0]"
                  }`}>
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {i % 3 === 0 ? "Swiggy Order" : i % 3 === 1 ? "Zomato Order" : "Dunzo Order"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-medium">₹{(i + 1) * 75}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
