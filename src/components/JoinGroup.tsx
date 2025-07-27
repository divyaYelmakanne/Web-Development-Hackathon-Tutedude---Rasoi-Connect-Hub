import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Users, 
  Package, 
  DollarSign,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  Copy,
  ExternalLink
} from "lucide-react";

interface GroupDetails {
  id: string;
  name: string;
  material: string;
  currentMembers: number;
  maxMembers: number;
  pricePerKg: string;
  savings: string;
  supplier: string;
  rating: number;
  location: string;
  deadline: string;
  description?: string;
  admin: {
    name: string;
    rating: number;
  };
}

interface JoinGroupProps {
  onBack: () => void;
  onJoinSuccess?: (groupId: string) => void;
}

const JoinGroup = ({ onBack, onJoinSuccess }: JoinGroupProps) => {
  const { toast } = useToast();
  const [groupCode, setGroupCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [error, setError] = useState("");

  // Mock group data for demonstration
  const mockGroups: Record<string, GroupDetails> = {
    "AG001": {
      id: "AG001",
      name: "Fresh Onions Group Order",
      material: "Onions",
      currentMembers: 5,
      maxMembers: 10,
      pricePerKg: "₹25",
      savings: "₹8/kg",
      supplier: "Fresh Veggie Co.",
      rating: 4.2,
      location: "Karol Bagh, Delhi",
      deadline: "2 days left",
      description: "High-quality onions for restaurants and food businesses. Group order to get better prices.",
      admin: {
        name: "Rajesh Kumar",
        rating: 4.8
      }
    },
    "AG002": {
      id: "AG002",
      name: "Premium Tomatoes Group",
      material: "Tomatoes",
      currentMembers: 3,
      maxMembers: 8,
      pricePerKg: "₹35",
      savings: "₹12/kg",
      supplier: "City Vegetables",
      rating: 4.7,
      location: "Chandni Chowk, Delhi",
      deadline: "1 day left",
      description: "Fresh, ripe tomatoes for your culinary needs. Limited spots available!",
      admin: {
        name: "Priya Sharma",
        rating: 4.9
      }
    }
  };

  const handleSearchGroup = async () => {
    if (!groupCode.trim()) {
      setError("Please enter a group code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const group = mockGroups[groupCode.toUpperCase()];
      
      if (group) {
        setGroupDetails(group);
        toast({
          title: "Group Found!",
          description: `Found group: ${group.name}`,
        });
      } else {
        setError("Group not found. Please check the code and try again.");
        setGroupDetails(null);
        toast({
          title: "Group Not Found",
          description: "Invalid group code. Please check and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setError("Failed to search for group. Please try again.");
      toast({
        title: "Error",
        description: "Failed to search for group. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!groupDetails) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Successfully Joined!",
        description: `You've joined ${groupDetails.name}`,
      });

      // Call the callback if provided
      if (onJoinSuccess) {
        onJoinSuccess(groupDetails.id);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join group. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyGroupCode = () => {
    if (groupCode) {
      navigator.clipboard.writeText(groupCode);
      toast({
        title: "Code Copied!",
        description: "Group code has been copied to clipboard.",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchGroup();
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
            <h1 className="text-3xl font-bold text-foreground">Join a Group</h1>
          </div>
          <p className="text-muted-foreground ml-14">
            Enter a group code to join an existing group order and start saving
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Join Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Enter Group Code
                </CardTitle>
                <CardDescription>
                  Get the group code from the group admin or scan the QR code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupCode">Group Code *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="groupCode"
                      placeholder="e.g., AG001"
                      value={groupCode}
                      onChange={(e) => {
                        setGroupCode(e.target.value.toUpperCase());
                        setError("");
                      }}
                      onKeyPress={handleKeyPress}
                      className="font-mono text-lg tracking-wider"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyGroupCode}
                      disabled={!groupCode}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {error}
                    </p>
                  )}
                </div>

                <Button 
                  onClick={handleSearchGroup} 
                  disabled={isLoading || !groupCode.trim()}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Search Group
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have a group code?{" "}
                    <Button variant="link" className="p-0 h-auto">
                      Browse available groups
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to Join</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Get the group code</p>
                    <p className="text-xs text-muted-foreground">Ask the group admin for the unique group code</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Enter the code above</p>
                    <p className="text-xs text-muted-foreground">Type or paste the group code in the input field</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Review and join</p>
                    <p className="text-xs text-muted-foreground">Check the group details and confirm your participation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Group Details */}
          <div className="space-y-6">
            {groupDetails ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{groupDetails.name}</CardTitle>
                    <Badge variant="secondary" className="bg-success/20 text-success-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Available
                    </Badge>
                  </div>
                  <CardDescription>Group #{groupDetails.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Material</div>
                    <div className="font-medium flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {groupDetails.material}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Members</div>
                      <div className="font-medium flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {groupDetails.currentMembers}/{groupDetails.maxMembers}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Price per kg</div>
                      <div className="font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {groupDetails.pricePerKg}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Your Savings</div>
                    <div className="font-bold text-success text-lg">{groupDetails.savings}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Supplier</div>
                    <div className="font-medium flex items-center gap-2">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      {groupDetails.supplier} (⭐ {groupDetails.rating})
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {groupDetails.location}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Deadline</div>
                    <div className="font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {groupDetails.deadline}
                    </div>
                  </div>

                  {groupDetails.description && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Description</div>
                      <p className="text-sm">{groupDetails.description}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Group Admin</div>
                    <div className="font-medium flex items-center gap-2">
                      <span>{groupDetails.admin.name}</span>
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="text-sm">{groupDetails.admin.rating}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleJoinGroup} 
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Joining Group...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Join Group
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-8 text-center">
                  <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Group Selected</h3>
                  <p className="text-muted-foreground">
                    Enter a group code above to see the group details and join
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Join Groups?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <DollarSign className="w-3 h-3 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Save Money</p>
                    <p className="text-xs text-muted-foreground">Get bulk discounts and better prices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Connect with Vendors</p>
                    <p className="text-xs text-muted-foreground">Network with other food businesses</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-3 h-3 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quality Assurance</p>
                    <p className="text-xs text-muted-foreground">Verified suppliers and quality products</p>
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

export default JoinGroup; 