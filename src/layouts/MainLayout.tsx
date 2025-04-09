
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pb-20">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};

export default MainLayout;
