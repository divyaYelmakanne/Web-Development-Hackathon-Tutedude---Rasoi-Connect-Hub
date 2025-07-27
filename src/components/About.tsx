import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShoppingCart, 
  MessageCircle, 
  Star,
  TrendingUp,
  Shield,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface AboutProps {
  onGetStarted?: () => void;
  onJoinAsSupplier?: () => void;
}

const About = ({ onGetStarted, onJoinAsSupplier }: AboutProps) => {
  const impactNumbers = [
    { number: "500+", label: "Orders Delivered", icon: ShoppingCart },
    { number: "100+", label: "Suppliers Connected", icon: Users },
    { number: "4.8★", label: "Average Rating", icon: Star },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  const keyFeatures = [
    {
      icon: Users,
      title: "Group Orders",
      description: "Connect with other vendors to place bulk orders and get better prices"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Communicate directly with suppliers and other group members"
    },
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers are thoroughly vetted for quality and reliability"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Track your orders, savings, and performance with detailed insights"
    },
    {
      icon: MapPin,
      title: "Local Focus",
      description: "Connect with suppliers in your area for faster delivery"
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Rate and review suppliers to maintain high standards"
    }
  ];

  const whoWeHelp = [
    {
      title: "Restaurant Owners",
      description: "Get bulk ingredients at competitive prices through group orders"
    },
    {
      title: "Catering Services",
      description: "Source high-quality ingredients and equipment from verified suppliers"
    },
    {
      title: "Food Suppliers",
      description: "Expand your customer base and manage orders efficiently"
    },
    {
      title: "Event Organizers",
      description: "Find reliable suppliers for all your event needs"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Intro Summary */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About Rasoi Connect Hub
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Bridging the Gap Between{" "}
            <span className="text-primary">Suppliers & Vendors</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Rasoi Connect Hub is a revolutionary platform that connects food suppliers with vendors, 
            enabling group orders, real-time communication, and seamless inventory management. 
            We're transforming how the food industry collaborates and grows together.
          </p>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactNumbers.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {item.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Key Features */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Why Choose{" "}
              <span className="text-primary">Rasoi Connect Hub?</span>
            </h3>
            <div className="space-y-6">
              {keyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Who We Help */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Who We{" "}
              <span className="text-primary">Help</span>
            </h3>
            <div className="space-y-6">
              {whoWeHelp.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            How It{" "}
            <span className="text-primary">Works</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">
                Join or Create Groups
              </h4>
              <p className="text-muted-foreground">
                Connect with other vendors in your area or create your own group to start ordering together.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">
                Place Bulk Orders
              </h4>
              <p className="text-muted-foreground">
                Combine your orders with group members to get better prices and delivery terms from suppliers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">
                Save & Grow
              </h4>
              <p className="text-muted-foreground">
                Enjoy cost savings, better quality, and build lasting relationships with reliable suppliers.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of vendors and suppliers who are already saving money and growing together on our platform.
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={onGetStarted}
                >
                  Get Started Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About; 