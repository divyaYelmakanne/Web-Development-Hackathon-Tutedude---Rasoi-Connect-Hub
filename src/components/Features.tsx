import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  ShoppingCart, 
  MessageCircle, 
  MapPin, 
  Receipt, 
  Shield,
  Smartphone,
  TrendingDown 
} from "lucide-react";

const Features = () => {
  const getFeatureTag = (title: string) => {
    const tags: Record<string, string> = {
      "Group Ordering": "Save up to 30%",
      "Price Comparison": "200+ Suppliers",
      "Real-time Chat": "Live Messaging",
      "Live Tracking": "GPS Enabled",
      "Digital Invoices": "PDF Downloads", 
      "Verified Suppliers": "100% Verified",
      "Mobile First": "Touch Optimized",
      "Cost Savings": "Bulk Pricing"
    };
    return tags[title] || "Save 30% costs";
  };

  const features = [
    {
      icon: Users,
      title: "Group Ordering",
      description: "Join or create group orders with nearby vendors to unlock wholesale prices and bulk discounts.",
      color: "from-primary to-warning"
    },
    {
      icon: ShoppingCart,
      title: "Price Comparison",
      description: "Compare prices from verified suppliers in your area and choose the best deals for your business.",
      color: "from-warning to-accent"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Coordinate with group members and suppliers through integrated chat. Share updates and stay connected.",
      color: "from-accent to-success"
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "Track your orders in real-time with delivery ETA on maps. Know exactly when your materials will arrive.",
      color: "from-success to-primary"
    },
    {
      icon: Receipt,
      title: "Digital Invoices",
      description: "Get instant PDF invoices for all your orders. Keep track of expenses and maintain proper records.",
      color: "from-primary to-accent"
    },
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers are FSSAI verified with ratings and reviews from other vendors in the community.",
      color: "from-warning to-success"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Designed for mobile use with large touch targets and simple navigation. Use it anywhere, anytime.",
      color: "from-accent to-primary"
    },
    {
      icon: TrendingDown,
      title: "Cost Savings",
      description: "Save up to 30% on raw material costs through group buying power and direct supplier relationships.",
      color: "from-success to-warning"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent block">
              Grow Your Business
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed specifically for street food vendors and suppliers in India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-soft transition-all duration-300 hover:scale-105 border-2 hover:border-primary/10 overflow-hidden"
            >
              <CardHeader className="text-center pb-4 relative">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-warm transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                </div>
                <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {feature.description}
                </CardDescription>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-semibold">
                    {getFeatureTag(feature.title)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;