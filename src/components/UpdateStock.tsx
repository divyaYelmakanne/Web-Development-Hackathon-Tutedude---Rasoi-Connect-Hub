import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Edit,
  Save,
  X,
  Plus,
  Minus
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  price: number;
  unit: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
  minStockLevel: number;
}

interface UpdateStockProps {
  onBack: () => void;
}

const UpdateStock = ({ onBack }: UpdateStockProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, { stock: number; price: number }>>({});

  const [inventory] = useState<InventoryItem[]>([
    {
      id: "INV001",
      name: "Basmati Rice",
      category: "Rice & Grains",
      currentStock: 500,
      price: 48,
      unit: "kg",
      status: "in_stock",
      lastUpdated: "2 hours ago",
      minStockLevel: 100
    },
    {
      id: "INV002",
      name: "Onions",
      category: "Vegetables",
      currentStock: 50,
      price: 25,
      unit: "kg",
      status: "low_stock",
      lastUpdated: "1 hour ago",
      minStockLevel: 100
    },
    {
      id: "INV003",
      name: "Tomatoes",
      category: "Vegetables",
      currentStock: 0,
      price: 35,
      unit: "kg",
      status: "out_of_stock",
      lastUpdated: "30 min ago",
      minStockLevel: 50
    },
    {
      id: "INV004",
      name: "Potatoes",
      category: "Vegetables",
      currentStock: 200,
      price: 20,
      unit: "kg",
      status: "in_stock",
      lastUpdated: "3 hours ago",
      minStockLevel: 75
    },
    {
      id: "INV005",
      name: "Ginger",
      category: "Spices",
      currentStock: 25,
      price: 120,
      unit: "kg",
      status: "low_stock",
      lastUpdated: "4 hours ago",
      minStockLevel: 30
    },
    {
      id: "INV006",
      name: "Turmeric Powder",
      category: "Spices",
      currentStock: 80,
      price: 180,
      unit: "kg",
      status: "in_stock",
      lastUpdated: "1 day ago",
      minStockLevel: 40
    }
  ]);

  const categories = ["all", ...Array.from(new Set(inventory.map(item => item.category)))];

  const getStatusBadge = (status: InventoryItem['status']) => {
    const statusConfig = {
      in_stock: { variant: "secondary" as const, text: "In Stock", icon: CheckCircle, className: "bg-success/20 text-success-foreground" },
      low_stock: { variant: "secondary" as const, text: "Low Stock", icon: AlertTriangle, className: "bg-warning/20 text-warning-foreground" },
      out_of_stock: { variant: "destructive" as const, text: "Out of Stock", icon: X, className: "" }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    const matchesStock = stockFilter === "all" || 
      (stockFilter === "low" && item.status === "low_stock") ||
      (stockFilter === "out" && item.status === "out_of_stock") ||
      (stockFilter === "in" && item.status === "in_stock");

    return matchesSearch && matchesCategory && matchesStock;
  });

  const startEditing = (itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (item) {
      setEditValues({
        ...editValues,
        [itemId]: { stock: item.currentStock, price: item.price }
      });
      setEditingItem(itemId);
    }
  };

  const cancelEditing = (itemId: string) => {
    setEditingItem(null);
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[itemId];
      return newValues;
    });
  };

  const saveChanges = async (itemId: string) => {
    const values = editValues[itemId];
    if (!values) return;

    if (values.stock < 0) {
      toast({
        title: "Invalid Stock",
        description: "Stock quantity cannot be negative.",
        variant: "destructive"
      });
      return;
    }

    if (values.price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Price must be greater than zero.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Stock Updated",
        description: `Successfully updated ${inventory.find(i => i.id === itemId)?.name}`,
      });

      setEditingItem(null);
      setEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[itemId];
        return newValues;
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update stock. Please try again.",
        variant: "destructive"
      });
    }
  };

  const quickUpdate = (itemId: string, change: number) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    const newStock = Math.max(0, item.currentStock + change);
    setEditValues({
      ...editValues,
      [itemId]: { stock: newStock, price: item.price }
    });
    setEditingItem(itemId);
  };

  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.status === "low_stock").length;
  const outOfStockItems = inventory.filter(item => item.status === "out_of_stock").length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);

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
                <h1 className="text-3xl font-bold text-foreground">Update Stock</h1>
              </div>
              <p className="text-muted-foreground ml-14">
                Manage your inventory levels and pricing
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{totalItems}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">{lowStockItems}</div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">{outOfStockItems}</div>
              <div className="text-sm text-muted-foreground">Out of Stock</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">₹{totalValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search items by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Stock Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="in">In Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>
              Click on any item to edit stock levels and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {editingItem === item.id ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => quickUpdate(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={editValues[item.id]?.stock || item.currentStock}
                              onChange={(e) => setEditValues({
                                ...editValues,
                                [item.id]: { 
                                  ...editValues[item.id], 
                                  stock: parseInt(e.target.value) || 0 
                                }
                              })}
                              className="w-20 text-center"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => quickUpdate(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm text-muted-foreground">{item.unit}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.currentStock}</span>
                            <span className="text-sm text-muted-foreground">{item.unit}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingItem === item.id ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={editValues[item.id]?.price || item.price}
                            onChange={(e) => setEditValues({
                              ...editValues,
                              [item.id]: { 
                                ...editValues[item.id], 
                                price: parseFloat(e.target.value) || 0 
                              }
                            })}
                            className="w-24"
                          />
                        ) : (
                          <span className="font-medium">₹{item.price}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {item.lastUpdated}
                        </div>
                      </TableCell>
                      <TableCell>
                        {editingItem === item.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => saveChanges(item.id)}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => cancelEditing(item.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditing(item.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateStock; 