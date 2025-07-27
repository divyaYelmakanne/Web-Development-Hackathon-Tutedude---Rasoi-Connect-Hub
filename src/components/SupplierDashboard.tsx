import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import AddProject from "./AddProject";
import AnalyticsDashboard from "./AnalyticsDashboard";
import Reviews from "./Reviews";
import GroupCharts from "./GroupCharts";
import AddItem from "./AddItem";
import UpdateStock from "./UpdateStock";
import { 
  Package, 
  Plus, 
  Users, 
  MessageCircle, 
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Eye,
  ArrowLeft,
  TrendingUp,
  ShoppingBag,
  Check,
  X
} from "lucide-react";

interface SupplierDashboardProps {
  onBack: () => void;
}

const SupplierDashboard = ({ onBack }: SupplierDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'project' | 'analytics' | 'reviews' | 'charts' | 'addItem' | 'updateStock'>('dashboard');
  const [pendingOrders] = useState([
    {
      id: "SO001",
      material: "Basmati Rice",
      quantity: "200 kg", 
      groupSize: 8,
      totalValue: "₹9,600",
      pricePerKg: "₹48",
      vendorGroup: "Delhi Food Vendors",
      deadline: "Today 6 PM",
      priority: "High"
    },
    {
      id: "SO002",
      material: "Onions",
      quantity: "150 kg",
      groupSize: 5,
      totalValue: "₹3,750", 
      pricePerKg: "₹25",
      vendorGroup: "Karol Bagh Vendors",
      deadline: "Tomorrow 2 PM",
      priority: "Medium"
    }
  ]);

  const [inventory] = useState([
    {
      id: "INV001",
      name: "Basmati Rice",
      stock: "500 kg",
      price: "₹48/kg",
      status: "In Stock",
      lastUpdated: "2 hours ago"
    },
    {
      id: "INV002", 
      name: "Onions",
      stock: "300 kg",
      price: "₹25/kg", 
      status: "Low Stock",
      lastUpdated: "1 hour ago"
    },
    {
      id: "INV003",
      name: "Tomatoes", 
      stock: "0 kg",
      price: "₹35/kg",
      status: "Out of Stock",
      lastUpdated: "30 min ago"
    }
  ]);

  // Render different views based on currentView state
  if (currentView === 'project') {
    return <AddProject onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'analytics') {
    return <AnalyticsDashboard onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'reviews') {
    return <Reviews onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'charts') {
    return <GroupCharts onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'addItem') {
    return <AddItem onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'updateStock') {
    return <UpdateStock onBack={() => setCurrentView('dashboard')} />;
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
                  Supplier Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground ml-14">
                Manage your orders, inventory, and grow your business with vendor groups.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="supplier" 
            className="h-24 flex flex-col items-center justify-center gap-2 group"
            onClick={() => setCurrentView('addItem')}
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold">Add Product</span>
              <span className="text-xs opacity-80">Inventory +127</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 group"
            onClick={() => setCurrentView('analytics')}
          >
            <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold">Analytics</span>
              <span className="text-xs opacity-70">↗ 23% sales</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-success/10 group"
            onClick={() => setCurrentView('reviews')}
          >
            <Star className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold">Reviews</span>
              <span className="text-xs opacity-70">4.8★ (156)</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-warning/10 group"
            onClick={() => setCurrentView('charts')}
          >
            <MessageCircle className="w-6 h-6 group-hover:pulse transition-all" />
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold">Group Charts</span>
              <span className="text-xs opacity-70">12 active</span>
            </div>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">₹45,000</div>
              <div className="text-sm text-muted-foreground">This Month Revenue</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">23</div>
              <div className="text-sm text-muted-foreground">Pending Orders</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">4.6</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">156</div>
              <div className="text-sm text-muted-foreground">Happy Vendors</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Orders */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Pending Orders</h2>
              <Button variant="outline" size="sm" className="group hover:bg-primary/10">
                <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start">
                  <span>View All Orders</span>
                  <span className="text-xs opacity-70">45 pending • ₹2.3L total</span>
                </div>
              </Button>
            </div>

            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-soft transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.material}</CardTitle>
                        <CardDescription>Group: {order.vendorGroup}</CardDescription>
                      </div>
                      <Badge 
                        variant={order.priority === 'High' ? 'destructive' : 'secondary'}
                        className={order.priority === 'High' ? '' : 'bg-warning/20 text-warning-foreground'}
                      >
                        {order.priority} Priority
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
                        <div className="text-sm text-muted-foreground">Total Value</div>
                        <div className="font-semibold text-primary">{order.totalValue}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Group Size</div>
                        <div className="font-semibold">{order.groupSize} vendors</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Deadline</div>
                        <div className="font-semibold flex items-center text-warning">
                          <Clock className="w-4 h-4 mr-1" />
                          {order.deadline}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="group flex-1"
                        onClick={() => {
                          // Handle accept order
                          console.log(`Accepting order ${order.id}`);
                        }}
                      >
                        <Check className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                        <div className="flex flex-col items-start">
                          <span>Accept</span>
                          <span className="text-xs opacity-80">Earn {order.totalValue}</span>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive/10 group flex-1"
                        onClick={() => {
                          // Handle decline order
                          console.log(`Declining order ${order.id}`);
                        }}
                      >
                        <X className="w-4 h-4 mr-1 group-hover:rotate-90 transition-transform" />
                        <div className="flex flex-col items-start">
                          <span>Decline</span>
                          <span className="text-xs opacity-70">Send reason</span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Inventory Management */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Inventory</h2>
              <Button variant="supplier" size="sm" className="group">
                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                <div className="flex flex-col items-start">
                  <span>Add Item</span>
                  <span className="text-xs opacity-80">Expand inventory • Set prices</span>
                </div>
              </Button>
            </div>

            <div className="space-y-4">
              {inventory.map((item) => (
                <Card key={item.id} className="hover:shadow-soft transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>Updated {item.lastUpdated}</CardDescription>
                      </div>
                      <Badge 
                        variant={
                          item.status === 'In Stock' ? 'secondary' :
                          item.status === 'Low Stock' ? 'secondary' : 'destructive'
                        }
                        className={
                          item.status === 'In Stock' ? 'bg-success/20 text-success-foreground' :
                          item.status === 'Low Stock' ? 'bg-warning/20 text-warning-foreground' : ''
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Current Stock</div>
                        <div className="font-semibold">{item.stock}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Price</div>
                        <div className="font-semibold text-primary">{item.price}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="supplier" 
                        size="sm" 
                        className="group flex-1"
                        onClick={() => setCurrentView('updateStock')}
                      >
                        <div className="flex flex-col items-start">
                          <span>Update Stock</span>
                          <span className="text-xs opacity-80">Price • Quantity • Status</span>
                        </div>
                        <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
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

export default SupplierDashboard;