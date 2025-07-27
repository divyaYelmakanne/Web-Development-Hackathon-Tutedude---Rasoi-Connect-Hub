import { Button } from "@/components/ui/button";
import { ArrowRight, Users, ShoppingCart, TrendingDown } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-warning/60 to-success/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Group Buying</span>
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              for Street Vendors
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join forces with other vendors to get wholesale prices on raw materials. 
            Save money, build community, grow together.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">30%</div>
              <div className="text-sm text-white/80">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Active Vendors</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-white/80">Group Orders</div>
            </div>
          </div>

          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-6 h-auto group"
            onClick={onGetStarted}
          >
            <div className="flex flex-col items-center">
              <span>Get Started Today</span>
              <span className="text-sm opacity-80 font-normal">Group Ordering • Cost Savings</span>
            </div>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              FSSAI Verified Suppliers
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Secure UPI Payments
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Real-time Tracking
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-accent rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-warning rounded-full opacity-50 animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-primary rounded-full opacity-30 animate-pulse delay-700"></div>
    </div>
  );
};

export default Hero;