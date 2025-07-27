import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Plus, 
  Upload, 
  Image as ImageIcon,
  Package,
  DollarSign,
  Tag,
  AlertCircle,
  CheckCircle,
  X,
  Trash2
} from "lucide-react";

interface AddItemProps {
  onBack: () => void;
  onItemCreated?: (itemId: string) => void;
}

const AddItem = ({ onBack, onItemCreated }: AddItemProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    unit: "kg",
    minOrderQuantity: "",
    tags: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Rice & Grains", "Vegetables", "Fruits", "Spices", "Dairy", 
    "Meat & Poultry", "Seafood", "Beverages", "Snacks", "Other"
  ];

  const units = ["kg", "g", "pieces", "liters", "packets", "boxes"];

  const availableTags = [
    "Organic", "Fresh", "Premium", "Bulk", "Local", "Imported", 
    "Seasonal", "Gluten-Free", "Vegan", "Halal", "Kosher"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Item name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Please enter a valid stock quantity";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Item description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Some images were skipped",
        description: "Only JPG, PNG, GIF, and WebP files under 5MB are allowed.",
        variant: "destructive"
      });
    }

    if (uploadedImages.length + validFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum 5 images allowed per item.",
        variant: "destructive"
      });
      return;
    }

    setUploadedImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateItemId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `INV${timestamp}${random}`.toUpperCase();
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const itemId = generateItemId();
      
      toast({
        title: "Item Added Successfully!",
        description: `Item ${itemId} has been added to your inventory.`,
      });

      if (onItemCreated) {
        onItemCreated(itemId);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Add New Item</h1>
          </div>
          <p className="text-muted-foreground ml-14">
            Add new products to your inventory and start selling to vendor groups
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Item Details
                </CardTitle>
                <CardDescription>
                  Fill in the details to add a new item to your inventory
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Premium Basmati Rice"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per {formData.unit} (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 48.50"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className={errors.price ? "border-destructive" : ""}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="e.g., 500"
                      value={formData.stock}
                      onChange={(e) => handleInputChange("stock", e.target.value)}
                      className={errors.stock ? "border-destructive" : ""}
                    />
                    {errors.stock && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.stock}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minOrderQuantity">Min Order Qty</Label>
                    <Input
                      id="minOrderQuantity"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.minOrderQuantity}
                      onChange={(e) => handleInputChange("minOrderQuantity", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the item, its quality, origin, and any special features..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Tags (Optional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer hover:bg-primary/10 ${
                          formData.tags.includes(tag) ? "bg-primary text-primary-foreground" : ""
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Item Images (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload high-quality images of your item
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Max 5 images • 5MB each • JPG, PNG, GIF, WebP
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm">
                        Choose Images
                      </Button>
                    </Label>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Uploaded Images:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {uploadedImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Adding Item...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Item Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">
                    {formData.name || "Enter item name"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {formData.category || "Select category"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-medium flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {formData.price ? `₹${formData.price}/${formData.unit}` : "Not set"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Stock</div>
                    <div className="font-medium">
                      {formData.stock ? `${formData.stock} ${formData.unit}` : "Not set"}
                    </div>
                  </div>
                </div>

                {formData.minOrderQuantity && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Min Order</div>
                    <div className="font-medium">
                      {formData.minOrderQuantity} {formData.unit}
                    </div>
                  </div>
                )}

                {formData.tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {uploadedImages.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Images</div>
                    <div className="text-sm">
                      {uploadedImages.length} image(s) uploaded
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ImageIcon className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">High-Quality Images</p>
                    <p className="text-xs text-muted-foreground">Clear, well-lit photos increase sales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <DollarSign className="w-3 h-3 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Competitive Pricing</p>
                    <p className="text-xs text-muted-foreground">Research market rates for better sales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-3 h-3 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Accurate Stock</p>
                    <p className="text-xs text-muted-foreground">Keep inventory updated to avoid issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem; 