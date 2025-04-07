
import { User } from "@/types";
import { mockUser } from "./mockData";
import { toast } from "sonner";

// Mock authentication service
export const login = async (phone: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API call to send OTP
  return new Promise((resolve) => {
    setTimeout(() => {
      if (phone.length === 10 && /^\d+$/.test(phone)) {
        resolve({ success: true, message: "OTP sent successfully" });
      } else {
        resolve({ success: false, message: "Invalid phone number" });
      }
    }, 1000);
  });
};

export const verifyOtp = async (
  phone: string,
  otp: string
): Promise<{ success: boolean; user?: User; message: string }> => {
  // Simulate API call to verify OTP
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo, accept any 4-digit OTP
      if (otp.length === 4 && /^\d+$/.test(otp)) {
        // For demo purposes, always return the mock user
        resolve({ success: true, user: mockUser, message: "OTP verified successfully" });
        toast.success("Login successful");
      } else {
        resolve({ success: false, message: "Invalid OTP" });
        toast.error("Invalid OTP");
      }
    }, 1000);
  });
};

export const logout = (): void => {
  localStorage.removeItem("optimove_user");
  toast.info("Logged out successfully");
};

export const checkAuth = (): User | null => {
  const userJson = localStorage.getItem("optimove_user");
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

export const setAuth = (user: User): void => {
  localStorage.setItem("optimove_user", JSON.stringify(user));
};
