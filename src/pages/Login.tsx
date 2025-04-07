
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, verifyOtp } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { login: authLogin } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const response = await login(phone);
      if (response.success) {
        setOtpSent(true);
        toast.success("OTP sent successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4 || !/^\d+$/.test(otp)) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp(phone, otp);
      if (response.success && response.user) {
        authLogin(response.user);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-optimove-background px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-optimove-primary">OptiMove</h1>
          <p className="mt-2 text-optimove-text-light">
            Maximize your delivery earnings
          </p>
        </div>

        <div className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-l-none"
                    placeholder="Enter your 10-digit mobile number"
                    maxLength={10}
                    disabled={loading}
                  />
                </div>
              </div>
              <Button
                onClick={handleSendOtp}
                className="w-full bg-optimove-primary hover:bg-opacity-90"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium">
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center tracking-widest"
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  disabled={loading}
                />
                <p className="text-sm text-optimove-text-light mt-1">
                  OTP sent to +91 {phone}
                </p>
              </div>
              <Button
                onClick={handleVerifyOtp}
                className="w-full bg-optimove-primary hover:bg-opacity-90"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Log In"}
              </Button>
              <Button
                variant="link"
                className="w-full text-optimove-primary"
                onClick={() => setOtpSent(false)}
                disabled={loading}
              >
                Change Phone Number
              </Button>
            </>
          )}
        </div>

        <div className="text-center text-sm text-optimove-text-light">
          <p>For demo: Enter any 10-digit number and any 4-digit OTP</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
