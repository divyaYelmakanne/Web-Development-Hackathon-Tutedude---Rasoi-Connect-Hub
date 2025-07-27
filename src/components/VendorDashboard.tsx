import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import ViewAllOrders from "./ViewAllOrders";
import GroupChat from "./GroupChat";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import { 
  Users, 
  Plus, 
  ShoppingCart, 
  MessageCircle, 
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface VendorDashboardProps {
  onBack: () => void;
}

const VendorDashboard = ({ onBack }: VendorDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'orders' | 'chat' | 'create' | 'join'>('dashboard');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('AG001');
  
  const [activeOrders] = useState([
    {
      id: "VO001",
      material: "Basmati Rice",
      quantity: "50 kg",
      groupSize: 8,
      totalPrice: "₹2,400",
      pricePerKg: "₹48",
      supplier: "Gupta Traders",
      rating: 4.5,
      status: "In Transit",
      eta: "2 hours",
      location: "Connaught Place, Delhi"
    }
  ]);

  const [availableGroups] = useState([
    {
      id: "AG001",
      material: "Onions",
      currentMembers: 5,
      maxMembers: 10,
      pricePerKg: "₹25",
      savings: "₹8/kg",
      supplier: "Fresh Veggie Co.",
      rating: 4.2,
      location: "Karol Bagh, Delhi",
      deadline: "2 days left"
    },
    {
      id: "AG002", 
      material: "Tomatoes",
      currentMembers: 3,
      maxMembers: 8,
      pricePerKg: "₹35",
      savings: "₹12/kg",
      supplier: "City Vegetables",
      rating: 4.7,
      location: "Chandni Chowk, Delhi",
      deadline: "1 day left"
    }
  ]);

  // Render different views based on currentView state
  if (currentView === 'orders') {
    return <ViewAllOrders onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'chat') {
    return <GroupChat onBack={() => setCurrentView('dashboard')} groupId={selectedGroupId} />;
  }

  if (currentView === 'create') {
    return <CreateGroup onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'join') {
    return <JoinGroup onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Vendor Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground ml-14">
                Welcome back! Manage your group orders and find the best deals.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">₹1,200</div>
              <div className="text-sm text-muted-foreground">Saved This Month</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-sm text-muted-foreground">Active Groups</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">4.8</div>
              <div className="text-sm text-muted-foreground">Your Rating</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">28</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Orders */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Active Orders</h2>
              <Button 
                variant="outline" 
                size="sm" 
                className="group hover:bg-primary/10"
                onClick={() => setCurrentView('orders')}
              >
                <ShoppingCart className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                <div className="flex flex-col items-start">
                  <span>View All Orders</span>
                  <span className="text-xs opacity-70">28 active • ₹45,200 saved</span>
                </div>
              </Button>
            </div>

            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-soft transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.material}</CardTitle>
                          <CardDescription>Order #{order.id}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Quantity</div>
                          <div className="font-semibold">{order.quantity}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Group Size</div>
                          <div className="font-semibold flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {order.groupSize} vendors
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Total Price</div>
                          <div className="font-semibold text-primary">{order.totalPrice}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">ETA</div>
                          <div className="font-semibold flex items-center text-success">
                            <Clock className="w-4 h-4 mr-1" />
                            {order.eta}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {order.location}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="group hover:bg-success/10"
                          onClick={() => setCurrentView('chat')}
                        >
                          <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          <div className="flex flex-col items-start">
                            <span>Group Chat</span>
                            <span className="text-xs opacity-70">3 unread • 8 members</span>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No active orders yet</p>
                  <Button variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Order
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Available Groups */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Join a Group</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="group hover:bg-warning/10"
                  onClick={() => setCurrentView('create')}
                >
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                  <div className="flex flex-col items-start">
                    <span>Create Group</span>
                    <span className="text-xs opacity-70">Invite vendors • Set targets</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="group hover:bg-primary/10"
                  onClick={() => setCurrentView('join')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  <span>Join Group</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {availableGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-soft transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.material}</CardTitle>
                        <CardDescription>{group.supplier}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Savings</div>
                        <div className="font-bold text-success">{group.savings}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Price per kg</div>
                        <div className="font-semibold text-primary">{group.pricePerKg}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Members</div>
                        <div className="font-semibold flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {group.currentMembers}/{group.maxMembers}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                        <div className="font-semibold flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-warning text-warning" />
                          {group.rating}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Deadline</div>
                        <div className="font-semibold text-warning">{group.deadline}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {group.location}
                      </div>
                      <Button variant="vendor" size="sm" className="group">
                        <div className="flex flex-col items-start mr-2">
                          <span>Join Group</span>
                          <span className="text-xs opacity-80">Save {group.savings} • {group.maxMembers - group.currentMembers} spots left</span>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;