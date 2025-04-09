
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { User, Phone, LogOut, ChevronRight, HelpCircle, Settings, Shield, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const ProfileItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
}> = ({ icon, title, description, onClick }) => {
  return (
    <div className="flex items-center justify-between py-3" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};

const Profile: React.FC = () => {
  const { phoneNumber, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <main className="container p-4 space-y-4">
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {phoneNumber?.slice(-2) || "OP"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Driver</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  {phoneNumber}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Account Settings</h3>
            <div className="space-y-1">
              <ProfileItem 
                icon={<User className="h-5 w-5" />} 
                title="Personal Information"
                description="Update your personal details"
              />
              <Separator />
              <ProfileItem 
                icon={<Bell className="h-5 w-5" />} 
                title="Notification Preferences"
                description="Manage your notification settings"
              />
              <Separator />
              <ProfileItem 
                icon={<Settings className="h-5 w-5" />} 
                title="App Settings"
                description="Change language, theme, and more"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Support</h3>
            <div className="space-y-1">
              <ProfileItem 
                icon={<HelpCircle className="h-5 w-5" />} 
                title="Help Center"
                description="FAQs and troubleshooting"
              />
              <Separator />
              <ProfileItem 
                icon={<Shield className="h-5 w-5" />} 
                title="Privacy Policy"
                description="Learn how we protect your data"
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          variant="destructive" 
          className="w-full mt-6" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </main>
    </div>
  );
};

export default Profile;
