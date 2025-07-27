import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";
import RoleSelector from "@/components/RoleSelector";
import VendorDashboard from "@/components/VendorDashboard";
import SupplierDashboard from "@/components/SupplierDashboard";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'roleSelect' | 'vendor' | 'supplier'>('landing');

  const handleGetStarted = () => {
    setCurrentView('roleSelect');
  };

  const handleRoleSelect = (role: 'vendor' | 'supplier') => {
    setCurrentView(role);
  };

  if (currentView === 'vendor') {
    return <VendorDashboard onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'supplier') {
    return <SupplierDashboard onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'roleSelect') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Let's get you set up with the right dashboard for your needs
          </p>
          <RoleSelector onRoleSelect={handleRoleSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <About onGetStarted={handleGetStarted} onJoinAsSupplier={() => setCurrentView('supplier')} />
      <Contact onGetStarted={handleGetStarted} />
    </div>
  );
};

export default Index;
