
import { User, Order, Notification, DailyEarnings, WeeklyEarnings } from "@/types";

// Mock user data
export const mockUser: User = {
  id: "user123",
  name: "Rahul Singh",
  phone: "9876543210",
  platformPreference: ["swiggy", "zomato", "dunzo"],
};

// Generate past dates function
const getPastDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "ord001",
    platformName: "swiggy",
    payAmount: 175,
    pickupDistance: 1.2,
    deliveryDistance: 2.5,
    estimatedTime: 25,
    timestamp: getPastDate(0),
    status: "available",
  },
  {
    id: "ord002",
    platformName: "zomato",
    payAmount: 220,
    pickupDistance: 0.8,
    deliveryDistance: 3.2,
    estimatedTime: 30,
    timestamp: getPastDate(0),
    status: "available",
  },
  {
    id: "ord003",
    platformName: "dunzo",
    payAmount: 150,
    pickupDistance: 1.5,
    deliveryDistance: 1.8,
    estimatedTime: 20,
    timestamp: getPastDate(0),
    status: "available",
  },
  {
    id: "ord004",
    platformName: "swiggy",
    payAmount: 190,
    pickupDistance: 2.0,
    deliveryDistance: 1.5,
    estimatedTime: 28,
    timestamp: getPastDate(0),
    status: "available",
  },
  {
    id: "ord005",
    platformName: "zomato",
    payAmount: 230,
    pickupDistance: 0.5,
    deliveryDistance: 4.0,
    estimatedTime: 35,
    timestamp: getPastDate(0),
    status: "available",
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif001",
    title: "High Paying Order",
    message: "New high paying order available on Zomato - ₹220",
    type: "high-pay",
    timestamp: getPastDate(0),
    read: false,
  },
  {
    id: "notif002",
    title: "Peak Time Alert",
    message: "It's peak time in your area. More orders expected in the next hour.",
    type: "peak",
    timestamp: getPastDate(0),
    read: false,
  },
  {
    id: "notif003",
    title: "Order Update",
    message: "5 new orders available in your area",
    type: "order",
    timestamp: getPastDate(1),
    read: true,
  },
  {
    id: "notif004",
    title: "System Update",
    message: "App updated to version 1.2. Check out new features!",
    type: "system",
    timestamp: getPastDate(2),
    read: true,
  },
];

// Mock daily earnings
export const mockDailyEarnings: DailyEarnings = {
  date: getPastDate(0).split('T')[0],
  totalAmount: 1250,
  orderCount: 8,
  platforms: {
    swiggy: {
      amount: 520,
      orderCount: 3,
    },
    zomato: {
      amount: 450,
      orderCount: 3,
    },
    dunzo: {
      amount: 280,
      orderCount: 2,
    },
  },
};

// Mock weekly earnings
export const mockWeeklyEarnings: WeeklyEarnings = {
  weekStartDate: getPastDate(6).split('T')[0],
  weekEndDate: getPastDate(0).split('T')[0],
  totalAmount: 7850,
  orderCount: 52,
  dailyEarnings: {
    [getPastDate(6).split('T')[0]]: {
      date: getPastDate(6).split('T')[0],
      totalAmount: 950,
      orderCount: 7,
      platforms: {
        swiggy: { amount: 450, orderCount: 3 },
        zomato: { amount: 320, orderCount: 2 },
        dunzo: { amount: 180, orderCount: 2 },
      },
    },
    [getPastDate(5).split('T')[0]]: {
      date: getPastDate(5).split('T')[0],
      totalAmount: 1120,
      orderCount: 8,
      platforms: {
        swiggy: { amount: 520, orderCount: 4 },
        zomato: { amount: 450, orderCount: 3 },
        dunzo: { amount: 150, orderCount: 1 },
      },
    },
    [getPastDate(4).split('T')[0]]: {
      date: getPastDate(4).split('T')[0],
      totalAmount: 1350,
      orderCount: 9,
      platforms: {
        swiggy: { amount: 630, orderCount: 4 },
        zomato: { amount: 520, orderCount: 3 },
        dunzo: { amount: 200, orderCount: 2 },
      },
    },
    [getPastDate(3).split('T')[0]]: {
      date: getPastDate(3).split('T')[0],
      totalAmount: 1080,
      orderCount: 7,
      platforms: {
        swiggy: { amount: 480, orderCount: 3 },
        zomato: { amount: 420, orderCount: 3 },
        dunzo: { amount: 180, orderCount: 1 },
      },
    },
    [getPastDate(2).split('T')[0]]: {
      date: getPastDate(2).split('T')[0],
      totalAmount: 1200,
      orderCount: 8,
      platforms: {
        swiggy: { amount: 550, orderCount: 4 },
        zomato: { amount: 480, orderCount: 3 },
        dunzo: { amount: 170, orderCount: 1 },
      },
    },
    [getPastDate(1).split('T')[0]]: {
      date: getPastDate(1).split('T')[0],
      totalAmount: 980,
      orderCount: 6,
      platforms: {
        swiggy: { amount: 450, orderCount: 3 },
        zomato: { amount: 380, orderCount: 2 },
        dunzo: { amount: 150, orderCount: 1 },
      },
    },
    [getPastDate(0).split('T')[0]]: mockDailyEarnings,
  },
};

// Functions to simulate API calls
export const fetchOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockOrders].sort((a, b) => b.payAmount - a.payAmount));
    }, 500);
  });
};

export const fetchNotifications = (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotifications);
    }, 500);
  });
};

export const fetchDailyEarnings = (): Promise<DailyEarnings> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDailyEarnings);
    }, 500);
  });
};

export const fetchWeeklyEarnings = (): Promise<WeeklyEarnings> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeeklyEarnings);
    }, 500);
  });
};
