import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: 'vendor' | 'supplier') => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="group hover:shadow-soft transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-warning rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-warm transition-all duration-300">
            <Users className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl text-foreground">I'm a Vendor</CardTitle>
          <CardDescription className="text-muted-foreground">
            Street food vendor looking to buy raw materials in bulk with other vendors
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 text-sm text-muted-foreground mb-6">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Create or join group orders
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Compare supplier prices
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Track deliveries in real-time
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Chat with other vendors
            </li>
          </ul>
          <Button 
            variant="vendor" 
            size="lg" 
            className="w-full"
            onClick={() => onRoleSelect('vendor')}
          >
            Continue as Vendor
          </Button>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-soft transition-all duration-300 hover:scale-105 border-2 hover:border-success/20">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-warm transition-all duration-300">
            <Store className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl text-foreground">I'm a Supplier</CardTitle>
          <CardDescription className="text-muted-foreground">
            Wholesaler or distributor wanting to sell to vendor groups
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 text-sm text-muted-foreground mb-6">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
              Manage your inventory
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
              Set competitive prices
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
              Accept group orders
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
              Build your reputation
            </li>
          </ul>
          <Button 
            variant="supplier" 
            size="lg" 
            className="w-full"
            onClick={() => onRoleSelect('supplier')}
          >
            Continue as Supplier
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelector;