import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  DollarSign,
  Package,
  Star,
  Users,
  Filter,
  Download
} from "lucide-react";

interface AnalyticsDashboardProps {
  onBack: () => void;
}

const AnalyticsDashboard = ({ onBack }: AnalyticsDashboardProps) => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [groupBy, setGroupBy] = useState('date');
  const [chartType, setChartType] = useState('bar');

  // Mock data for demonstration
  const analyticsData = {
    summary: {
      totalOrders: 156,
      totalRevenue: 450000,
      averageRating: 4.6,
      totalProjects: 23,
      growthRate: 23.5
    },
    revenueData: [
      { month: 'Jan', revenue: 35000, orders: 12 },
      { month: 'Feb', revenue: 42000, orders: 15 },
      { month: 'Mar', revenue: 38000, orders: 13 },
      { month: 'Apr', revenue: 45000, orders: 16 },
      { month: 'May', revenue: 52000, orders: 18 },
      { month: 'Jun', revenue: 48000, orders: 17 }
    ],
    categoryData: [
      { category: 'Catering', revenue: 180000, orders: 45 },
      { category: 'Ingredients', revenue: 120000, orders: 38 },
      { category: 'Equipment', revenue: 90000, orders: 25 },
      { category: 'Decor', revenue: 60000, orders: 18 }
    ],
    ratingData: [
      { rating: 5, count: 89, percentage: 57 },
      { rating: 4, count: 45, percentage: 29 },
      { rating: 3, count: 15, percentage: 10 },
      { rating: 2, count: 5, percentage: 3 },
      { rating: 1, count: 2, percentage: 1 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Analytics Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground ml-14">
                Track your performance and make data-driven decisions
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Time Period</label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Group By</label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="region">Region</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Chart Type</label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {analyticsData.summary.totalOrders}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {getGrowthIcon(analyticsData.summary.growthRate)}
                <span className={`text-sm ${getGrowthColor(analyticsData.summary.growthRate)}`}>
                  +{analyticsData.summary.growthRate}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-success">
                    {formatCurrency(analyticsData.summary.totalRevenue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {getGrowthIcon(analyticsData.summary.growthRate)}
                <span className={`text-sm ${getGrowthColor(analyticsData.summary.growthRate)}`}>
                  +{analyticsData.summary.growthRate}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-warning">
                    {analyticsData.summary.averageRating}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">+0.2</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {analyticsData.summary.totalProjects}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {getGrowthIcon(analyticsData.summary.growthRate)}
                <span className={`text-sm ${getGrowthColor(analyticsData.summary.growthRate)}`}>
                  +{analyticsData.summary.growthRate}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success-foreground">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +23.5%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {analyticsData.revenueData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-primary/20 rounded-t-lg relative group cursor-pointer">
                      <div 
                        className="bg-primary rounded-t-lg transition-all duration-300 group-hover:bg-primary/80"
                        style={{ 
                          height: `${(data.revenue / 52000) * 200}px`,
                          minHeight: '20px'
                        }}
                      ></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatCurrency(data.revenue)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">{data.month}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Category Performance</CardTitle>
                  <CardDescription>Revenue by category</CardDescription>
                </div>
                <Badge variant="secondary">Top: Catering</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.categoryData.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(category.revenue)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(category.revenue / analyticsData.categoryData[0].revenue) * 100}%`
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{category.orders} orders</span>
                      <span>{((category.revenue / analyticsData.summary.totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rating Distribution</CardTitle>
              <CardDescription>Customer satisfaction breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.ratingData.map((rating, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-sm font-medium">{rating.rating}</span>
                      <Star className="w-3 h-3 fill-warning text-warning" />
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-warning h-2 rounded-full transition-all duration-300"
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground w-12 text-right">
                      {rating.count}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest orders and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New order received</p>
                    <p className="text-xs text-muted-foreground">Order #SO156 - ₹12,500</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">5-star review received</p>
                    <p className="text-xs text-muted-foreground">From Delhi Food Vendors</p>
                  </div>
                  <span className="text-xs text-muted-foreground">15 min ago</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-muted-foreground">₹8,900 for Order #SO154</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New vendor joined</p>
                    <p className="text-xs text-muted-foreground">Spice Garden Restaurant</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 