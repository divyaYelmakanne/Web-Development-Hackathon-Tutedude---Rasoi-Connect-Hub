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
  Users, 
  Package, 
  DollarSign,
  Calendar,
  MapPin,
  Copy,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface CreateGroupProps {
  onBack: () => void;
  onGroupCreated?: (groupId: string) => void;
}

const CreateGroup = ({ onBack, onGroupCreated }: CreateGroupProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [createdGroupId, setCreatedGroupId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    groupName: "",
    description: "",
    material: "",
    targetQuantity: "",
    maxMembers: "",
    pricePerKg: "",
    location: "",
    deadline: "",
    supplier: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const materials = [
    "Rice", "Wheat", "Pulses", "Vegetables", "Fruits", "Spices", 
    "Oil", "Sugar", "Salt", "Tea", "Coffee", "Other"
  ];

  const suppliers = [
    "Gupta Traders", "Fresh Veggie Co.", "City Vegetables", 
    "Agri Supply Co.", "Organic Foods Ltd.", "Local Market"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.groupName.trim()) {
      newErrors.groupName = "Group name is required";
    }

    if (!formData.material) {
      newErrors.material = "Please select a material";
    }

    if (!formData.targetQuantity || parseInt(formData.targetQuantity) <= 0) {
      newErrors.targetQuantity = "Please enter a valid target quantity";
    }

    if (!formData.maxMembers || parseInt(formData.maxMembers) < 2) {
      newErrors.maxMembers = "Minimum 2 members required";
    }

    if (!formData.pricePerKg || parseFloat(formData.pricePerKg) <= 0) {
      newErrors.pricePerKg = "Please enter a valid price per kg";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Please set a deadline";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const generateGroupId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `AG${timestamp}${random}`.toUpperCase();
  };

  const handleCreateGroup = async () => {
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

      const groupId = generateGroupId();
      setCreatedGroupId(groupId);

      toast({
        title: "Group Created Successfully!",
        description: `Group ${groupId} has been created and is ready to accept members.`,
      });

      // Call the callback if provided
      if (onGroupCreated) {
        onGroupCreated(groupId);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyGroupLink = () => {
    if (createdGroupId) {
      const link = `${window.location.origin}/join/${createdGroupId}`;
      navigator.clipboard.writeText(link);
      toast({
        title: "Link Copied!",
        description: "Group invitation link has been copied to clipboard.",
      });
    }
  };

  const estimatedSavings = () => {
    const targetQty = parseInt(formData.targetQuantity) || 0;
    const price = parseFloat(formData.pricePerKg) || 0;
    const members = parseInt(formData.maxMembers) || 1;
    
    // Assume 15% savings for group orders
    const individualPrice = price * 1.15;
    const groupPrice = price;
    const savingsPerKg = individualPrice - groupPrice;
    
    return {
      perKg: savingsPerKg.toFixed(2),
      total: (savingsPerKg * targetQty).toFixed(2),
      perMember: (savingsPerKg * targetQty / members).toFixed(2)
    };
  };

  if (createdGroupId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Group Created!</h1>
            </div>
          </div>

          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Group Created Successfully</h2>
              <p className="text-muted-foreground mb-6">
                Your group is ready to accept members and start saving together!
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="text-sm text-muted-foreground mb-2">Group ID</div>
                <div className="text-2xl font-mono font-bold text-primary">{createdGroupId}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{formData.maxMembers}</div>
                  <div className="text-sm text-muted-foreground">Max Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">₹{estimatedSavings().perKg}</div>
                  <div className="text-sm text-muted-foreground">Savings per kg</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{formData.deadline}</div>
                  <div className="text-sm text-muted-foreground">Deadline</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={copyGroupLink} className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Invitation Link
                </Button>
                <Button variant="outline" onClick={onBack} className="w-full">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
            </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Create New Group</h1>
          </div>
          <p className="text-muted-foreground ml-14">
            Start a group order to save money and connect with other vendors
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Group Details
                </CardTitle>
                <CardDescription>
                  Fill in the details to create your group order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupName">Group Name *</Label>
                    <Input
                      id="groupName"
                      placeholder="e.g., Fresh Onions Group Order"
                      value={formData.groupName}
                      onChange={(e) => handleInputChange("groupName", e.target.value)}
                      className={errors.groupName ? "border-destructive" : ""}
                    />
                    {errors.groupName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.groupName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="material">Material *</Label>
                    <Select value={formData.material} onValueChange={(value) => handleInputChange("material", value)}>
                      <SelectTrigger className={errors.material ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((material) => (
                          <SelectItem key={material} value={material}>
                            {material}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.material && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.material}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your group order, quality requirements, or special instructions..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetQuantity">Target Quantity (kg) *</Label>
                    <Input
                      id="targetQuantity"
                      type="number"
                      placeholder="e.g., 500"
                      value={formData.targetQuantity}
                      onChange={(e) => handleInputChange("targetQuantity", e.target.value)}
                      className={errors.targetQuantity ? "border-destructive" : ""}
                    />
                    {errors.targetQuantity && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.targetQuantity}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxMembers">Max Members *</Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.maxMembers}
                      onChange={(e) => handleInputChange("maxMembers", e.target.value)}
                      className={errors.maxMembers ? "border-destructive" : ""}
                    />
                    {errors.maxMembers && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.maxMembers}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricePerKg">Price per kg (₹) *</Label>
                    <Input
                      id="pricePerKg"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 25.50"
                      value={formData.pricePerKg}
                      onChange={(e) => handleInputChange("pricePerKg", e.target.value)}
                      className={errors.pricePerKg ? "border-destructive" : ""}
                    />
                    {errors.pricePerKg && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.pricePerKg}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Connaught Place, Delhi"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className={errors.location ? "border-destructive" : ""}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange("deadline", e.target.value)}
                      className={errors.deadline ? "border-destructive" : ""}
                    />
                    {errors.deadline && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.deadline}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Preferred Supplier (Optional)</Label>
                  <Select value={formData.supplier} onValueChange={(value) => handleInputChange("supplier", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCreateGroup} 
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Group...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Group
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
                <CardTitle className="text-lg">Group Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Group Name</div>
                  <div className="font-medium">
                    {formData.groupName || "Enter group name"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Material</div>
                  <div className="font-medium flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {formData.material || "Select material"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Target Qty</div>
                    <div className="font-medium">
                      {formData.targetQuantity ? `${formData.targetQuantity} kg` : "Not set"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Max Members</div>
                    <div className="font-medium flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {formData.maxMembers || "Not set"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Price per kg</div>
                  <div className="font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {formData.pricePerKg ? `₹${formData.pricePerKg}` : "Not set"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {formData.location || "Not set"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Deadline</div>
                  <div className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formData.deadline || "Not set"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estimated Savings */}
            {formData.pricePerKg && formData.targetQuantity && formData.maxMembers && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estimated Savings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Per kg savings:</span>
                    <span className="font-semibold text-success">₹{estimatedSavings().perKg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total savings:</span>
                    <span className="font-semibold text-success">₹{estimatedSavings().total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Per member:</span>
                    <span className="font-semibold text-success">₹{estimatedSavings().perMember}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup; 