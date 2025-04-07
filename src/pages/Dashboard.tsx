
import { useState, useEffect } from "react";
import { fetchDailyEarnings, fetchWeeklyEarnings } from "@/services/mockData";
import { DailyEarnings, WeeklyEarnings } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";

const Dashboard = () => {
  const [dailyEarnings, setDailyEarnings] = useState<DailyEarnings | null>(null);
  const [weeklyEarnings, setWeeklyEarnings] = useState<WeeklyEarnings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [daily, weekly] = await Promise.all([
          fetchDailyEarnings(),
          fetchWeeklyEarnings(),
        ]);
        setDailyEarnings(daily);
        setWeeklyEarnings(weekly);
      } catch (error) {
        console.error("Error loading earnings data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Prepare data for weekly chart
  const chartData = weeklyEarnings
    ? Object.values(weeklyEarnings.dailyEarnings).map((day) => ({
        date: format(parseISO(day.date), "EEE"),
        amount: day.totalAmount,
      }))
    : [];

  // Calculate weekly goal progress (sample goal: ₹10,000)
  const weeklyGoal = 10000;
  const progress = weeklyEarnings
    ? Math.min(100, (weeklyEarnings.totalAmount / weeklyGoal) * 100)
    : 0;

  // Prepare platform comparison data
  const platformColors: Record<string, string> = {
    swiggy: "#FC8019",
    zomato: "#CB202D",
    dunzo: "#00D290",
    other: "#757575",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Earnings Dashboard</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-optimove-primary" />
        </div>
      ) : (
        <>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4 mt-4">
              {dailyEarnings && (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Today's Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-optimove-success">
                        ₹{dailyEarnings.totalAmount}
                      </div>
                      <div className="text-sm text-optimove-text-light">
                        {dailyEarnings.orderCount} orders completed
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Platform Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(dailyEarnings.platforms).map(([platform, data]) => (
                        <div key={platform} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: platformColors[platform] }}
                              ></div>
                              <span className="capitalize">{platform}</span>
                            </div>
                            <span className="font-medium">₹{data.amount}</span>
                          </div>
                          <Progress
                            value={(data.amount / dailyEarnings.totalAmount) * 100}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4 mt-4">
              {weeklyEarnings && (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Weekly Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-optimove-success">
                        ₹{weeklyEarnings.totalAmount}
                      </div>
                      <div className="text-sm text-optimove-text-light mb-4">
                        {weeklyEarnings.orderCount} orders completed
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Weekly Goal (₹{weeklyGoal})</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Weekly Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                  offset="5%"
                                  stopColor="#FF5A5F"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#FF5A5F"
                                  stopOpacity={0.2}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                              dataKey="date"
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                            />
                            <YAxis tick={{ fontSize: 12 }} tickLine={false} />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="amount"
                              stroke="#FF5A5F"
                              fillOpacity={1}
                              fill="url(#colorAmount)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
