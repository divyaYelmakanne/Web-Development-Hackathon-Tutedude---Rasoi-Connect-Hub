import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  PieChart,
  Download,
  Filter,
  Calendar,
  DollarSign,
  Package,
  Users,
  MapPin
} from "lucide-react";

interface GroupChartsProps {
  onBack: () => void;
}

const GroupCharts = ({ onBack }: GroupChartsProps) => {
  const [groupBy, setGroupBy] = useState('date');
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('month');

  // Mock data for different groupings
  const chartData = {
    date: [
      { label: 'Jan', revenue: 35000, orders: 12, customers: 8 },
      { label: 'Feb', revenue: 42000, orders: 15, customers: 10 },
      { label: 'Mar', revenue: 38000, orders: 13, customers: 9 },
      { label: 'Apr', revenue: 45000, orders: 16, customers: 12 },
      { label: 'May', revenue: 52000, orders: 18, customers: 14 },
      { label: 'Jun', revenue: 48000, orders: 17, customers: 13 }
    ],
    category: [
      { label: 'Catering', revenue: 180000, orders: 45, customers: 25 },
      { label: 'Ingredients', revenue: 120000, orders: 38, customers: 20 },
      { label: 'Equipment', revenue: 90000, orders: 25, customers: 15 },
      { label: 'Decor', revenue: 60000, orders: 18, customers: 10 }
    ],
    region: [
      { label: 'Delhi', revenue: 150000, orders: 50, customers: 30 },
      { label: 'Mumbai', revenue: 120000, orders: 35, customers: 20 },
      { label: 'Bangalore', revenue: 90000, orders: 25, customers: 15 },
      { label: 'Chennai', revenue: 60000, orders: 18, customers: 10 }
    ],
    status: [
      { label: 'Completed', revenue: 280000, orders: 80, customers: 45 },
      { label: 'In Progress', revenue: 80000, orders: 20, customers: 15 },
      { label: 'Pending', revenue: 40000, orders: 10, customers: 8 },
      { label: 'Cancelled', revenue: 10000, orders: 3, customers: 2 }
    ]
  };

  const currentData = chartData[groupBy as keyof typeof chartData];
  const maxValue = Math.max(...currentData.map(item => item.revenue));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderBarChart = () => (
    <div className="h-80 flex items-end justify-between gap-2">
      {currentData.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div className="w-full bg-primary/20 rounded-t-lg relative group cursor-pointer">
            <div 
              className="bg-primary rounded-t-lg transition-all duration-300 group-hover:bg-primary/80"
              style={{ 
                height: `${(item.revenue / maxValue) * 280}px`,
                minHeight: '20px'
              }}
            ></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {formatCurrency(item.revenue)}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {item.label}
          </div>
          <div className="text-xs text-muted-foreground">
            {item.orders} orders
          </div>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <div className="h-80 relative">
      <svg className="w-full h-full" viewBox="0 0 600 320">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={64 + i * 48}
            x2="600"
            y2={64 + i * 48}
            stroke="hsl(var(--muted))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Line path */}
        <path
          d={currentData.map((item, index) => {
            const x = (index / (currentData.length - 1)) * 540 + 30;
            const y = 320 - ((item.revenue / maxValue) * 240 + 40);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          className="transition-all duration-300"
        />

        {/* Area fill */}
        <path
          d={`${currentData.map((item, index) => {
            const x = (index / (currentData.length - 1)) * 540 + 30;
            const y = 320 - ((item.revenue / maxValue) * 240 + 40);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')} L ${(currentData.length - 1) / (currentData.length - 1) * 540 + 30} 320 L 30 320 Z`}
          fill="url(#lineGradient)"
          className="transition-all duration-300"
        />

        {/* Data points */}
        {currentData.map((item, index) => {
          const x = (index / (currentData.length - 1)) * 540 + 30;
          const y = 320 - ((item.revenue / maxValue) * 240 + 40);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="hsl(var(--primary))"
              className="transition-all duration-300 hover:r-6"
            />
          );
        })}
      </svg>
    </div>
  );

  const renderPieChart = () => (
    <div className="h-80 flex items-center justify-center">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {(() => {
            const total = currentData.reduce((sum, item) => sum + item.revenue, 0);
            let currentAngle = 0;
            const colors = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--accent))'];
            
            return currentData.map((item, index) => {
              const percentage = (item.revenue / total) * 100;
              const angle = (percentage / 100) * 360;
              const radius = 80;
              const x1 = 100 + radius * Math.cos((currentAngle * Math.PI) / 180);
              const y1 = 100 + radius * Math.sin((currentAngle * Math.PI) / 180);
              const x2 = 100 + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
              const y2 = 100 + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              );
            });
          })()}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{currentData.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderBarChart();
    }
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
                <h1 className="text-3xl font-bold text-foreground">Group Charts</h1>
              </div>
              <p className="text-muted-foreground ml-14">
                Visualize your data with interactive charts and analytics
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Chart
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
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
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Revenue by {groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}
                    </CardTitle>
                    <CardDescription>
                      {chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart showing performance metrics
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-success/20 text-success-foreground">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +23.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {renderChart()}
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm">Total Revenue</span>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(currentData.reduce((sum, item) => sum + item.revenue, 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-success" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <span className="font-semibold">
                    {currentData.reduce((sum, item) => sum + item.orders, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-warning" />
                    <span className="text-sm">Total Customers</span>
                  </div>
                  <span className="font-semibold">
                    {currentData.reduce((sum, item) => sum + item.customers, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentData
                  .sort((a, b) => b.revenue - a.revenue)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-warning text-warning-foreground' :
                          index === 1 ? 'bg-muted text-muted-foreground' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatCurrency(item.revenue)}
                      </span>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Date Range
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCharts; 