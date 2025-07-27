import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Calendar,
  MapPin,
  Users,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

interface Order {
  id: string;
  material: string;
  quantity: string;
  groupSize: number;
  totalPrice: string;
  pricePerKg: string;
  supplier: string;
  rating: number;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  eta: string;
  location: string;
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
}

interface ViewAllOrdersProps {
  onBack: () => void;
}

const ViewAllOrders = ({ onBack }: ViewAllOrdersProps) => {
  const [orders] = useState<Order[]>([
    {
      id: "VO001",
      material: "Basmati Rice",
      quantity: "50 kg",
      groupSize: 8,
      totalPrice: "₹2,400",
      pricePerKg: "₹48",
      supplier: "Gupta Traders",
      rating: 4.5,
      status: "in_transit",
      eta: "2 hours",
      location: "Connaught Place, Delhi",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-17",
      notes: "Handle with care - premium quality rice"
    },
    {
      id: "VO002",
      material: "Onions",
      quantity: "100 kg",
      groupSize: 12,
      totalPrice: "₹2,500",
      pricePerKg: "₹25",
      supplier: "Fresh Veggie Co.",
      rating: 4.2,
      status: "confirmed",
      eta: "1 day",
      location: "Karol Bagh, Delhi",
      orderDate: "2024-01-16"
    },
    {
      id: "VO003",
      material: "Tomatoes",
      quantity: "75 kg",
      groupSize: 6,
      totalPrice: "₹2,625",
      pricePerKg: "₹35",
      supplier: "City Vegetables",
      rating: 4.7,
      status: "delivered",
      eta: "Delivered",
      location: "Chandni Chowk, Delhi",
      orderDate: "2024-01-10",
      deliveryDate: "2024-01-12"
    },
    {
      id: "VO004",
      material: "Potatoes",
      quantity: "200 kg",
      groupSize: 15,
      totalPrice: "₹4,000",
      pricePerKg: "₹20",
      supplier: "Agri Supply Co.",
      rating: 4.0,
      status: "pending",
      eta: "3 days",
      location: "Lajpat Nagar, Delhi",
      orderDate: "2024-01-18"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, text: "Pending", icon: Clock },
      confirmed: { variant: "default" as const, text: "Confirmed", icon: CheckCircle },
      in_transit: { variant: "default" as const, text: "In Transit", icon: Package },
      delivered: { variant: "default" as const, text: "Delivered", icon: CheckCircle },
      cancelled: { variant: "destructive" as const, text: "Cancelled", icon: XCircle }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + parseInt(order.totalPrice.replace('₹', '').replace(',', ''));
  }, 0);

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
                  View All Orders
                </h1>
              </div>
              <p className="text-muted-foreground ml-14">
                Manage and track all your group orders
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{orders.length}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">₹{totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">
                {orders.filter(o => o.status === 'in_transit').length}
              </div>
              <div className="text-sm text-muted-foreground">In Transit</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">
                {orders.filter(o => o.status === 'delivered').length}
              </div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter/Search Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search orders, materials, suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              Showing {paginatedOrders.length} of {filteredOrders.length} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.material}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="font-semibold text-primary">{order.totalPrice}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{order.eta}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.id}</DialogTitle>
                                <DialogDescription>
                                  Complete information about this order
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Order Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><span className="text-muted-foreground">Material:</span> {order.material}</div>
                                    <div><span className="text-muted-foreground">Quantity:</span> {order.quantity}</div>
                                    <div><span className="text-muted-foreground">Price per kg:</span> {order.pricePerKg}</div>
                                    <div><span className="text-muted-foreground">Total Price:</span> {order.totalPrice}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Supplier Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><span className="text-muted-foreground">Supplier:</span> {order.supplier}</div>
                                    <div><span className="text-muted-foreground">Rating:</span> ⭐ {order.rating}</div>
                                    <div><span className="text-muted-foreground">Location:</span> {order.location}</div>
                                    <div><span className="text-muted-foreground">Group Size:</span> {order.groupSize} vendors</div>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <h4 className="font-semibold mb-2">Timeline</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><span className="text-muted-foreground">Order Date:</span> {order.orderDate}</div>
                                    {order.deliveryDate && (
                                      <div><span className="text-muted-foreground">Delivery Date:</span> {order.deliveryDate}</div>
                                    )}
                                    <div><span className="text-muted-foreground">ETA:</span> {order.eta}</div>
                                  </div>
                                </div>
                                {order.notes && (
                                  <div className="col-span-2">
                                    <h4 className="font-semibold mb-2">Notes</h4>
                                    <p className="text-sm text-muted-foreground">{order.notes}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewAllOrders; 