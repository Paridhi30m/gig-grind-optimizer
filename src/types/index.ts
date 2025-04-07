
export interface User {
  id: string;
  name: string;
  phone: string;
  location?: {
    lat: number;
    lng: number;
  };
  platformPreference?: string[];
}

export interface Order {
  id: string;
  platformName: 'swiggy' | 'zomato' | 'dunzo' | 'other';
  payAmount: number;
  pickupDistance: number;
  deliveryDistance: number;
  estimatedTime: number; // in minutes
  timestamp: string;
  status: 'available' | 'accepted' | 'completed' | 'cancelled';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'peak' | 'high-pay' | 'system';
  timestamp: string;
  read: boolean;
}

export interface EarningsSummary {
  date: string;
  platform: string;
  amount: number;
  orderCount: number;
}

export interface DailyEarnings {
  date: string;
  totalAmount: number;
  orderCount: number;
  platforms: {
    [key: string]: {
      amount: number;
      orderCount: number;
    };
  };
}

export interface WeeklyEarnings {
  weekStartDate: string;
  weekEndDate: string;
  totalAmount: number;
  orderCount: number;
  dailyEarnings: {
    [key: string]: DailyEarnings;
  };
}
