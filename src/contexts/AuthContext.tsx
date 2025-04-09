
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  isLoading: boolean;
  login: (phoneNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedPhone = localStorage.getItem("phoneNumber");
    if (storedPhone) {
      setPhoneNumber(storedPhone);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string) => {
    setIsLoading(true);
    try {
      // For MVP, we're just simulating the OTP sending
      // In a real app, this would call an API to send OTP
      setPhoneNumber(phone);
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${phone}`,
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For MVP, we're accepting any OTP with length 4
      // In a real app, this would validate against an API
      if (otp.length === 4) {
        localStorage.setItem("phoneNumber", phoneNumber || "");
        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "You have successfully logged in!",
        });
        setIsLoading(false);
        return true;
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect.",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("phoneNumber");
    setPhoneNumber(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        phoneNumber,
        isLoading,
        login,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
