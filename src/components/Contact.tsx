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
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  ArrowLeft
} from "lucide-react";

interface ContactProps {
  onGetStarted?: () => void;
}

const Contact = ({ onGetStarted }: ContactProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: ""
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      value: "divyayelmakanne@gmail.com",
      description: "Get help with your account or orders"
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "+91 6303375692",
      description: "Call us for urgent assistance"
    },
    {
      icon: MapPin,
      title: "Office Address",
      value: "Hyderabad, Telangana, India",
      description: "Visit our office for in-person support"
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "Mon - Fri, 10AM - 3PM",
      description: "We're here to help during business hours"
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: ""
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Get in Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's{" "}
            <span className="text-primary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our platform? Want to join as a supplier? 
            We're here to help you succeed. Reach out to us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Inquiry Type</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {info.title}
                            </h4>
                            <p className="text-primary font-medium mb-1">
                              {info.value}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => window.open(social.href, '_blank')}
                    >
                      <Icon className="w-5 h-5" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-auto py-3 px-4"
                  onClick={onGetStarted}
                >
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Get Started</div>
                    <div className="text-xs text-muted-foreground">Join the platform</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-auto py-3 px-4"
                  onClick={() => setShowDocumentation(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Documentation</div>
                    <div className="text-xs text-muted-foreground">Learn how to use</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-auto py-3 px-4"
                  onClick={() => setShowReportIssue(true)}
                >
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Report Issue</div>
                    <div className="text-xs text-muted-foreground">Get help & support</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>



        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-2">
                  How do I join as a supplier?
                </h4>
                <p className="text-muted-foreground">
                  Simply click "Join as Supplier" and fill out our registration form. We'll review your application and get back to you within 24 hours.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-2">
                  How do group orders work?
                </h4>
                <p className="text-muted-foreground">
                  Vendors can join or create groups to combine their orders. This allows them to get bulk pricing and better delivery terms from suppliers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Is the platform free to use?
                </h4>
                <p className="text-muted-foreground">
                  Basic features are free for vendors. Suppliers pay a small commission on successful orders. Premium features are available for advanced users.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-2">
                  How do I get support?
                </h4>
                <p className="text-muted-foreground">
                  You can reach us via email, phone, or the contact form above. Our support team is available Monday to Friday, 9 AM to 6 PM IST.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Documentation Modal */}
      {showDocumentation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDocumentation(false)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Main Page
                  </Button>
                  <h2 className="text-2xl font-bold">📚 Platform Documentation</h2>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDocumentation(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search documentation topics..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Getting Started */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      🚀 Getting Started
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Platform Overview</div>
                        <div className="text-sm text-muted-foreground mt-1">Learn about key features and benefits</div>
                        <div className="text-xs text-primary mt-2">5 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Account Setup</div>
                        <div className="text-sm text-muted-foreground mt-1">Create and configure your account</div>
                        <div className="text-xs text-primary mt-2">3 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">First Order</div>
                        <div className="text-sm text-muted-foreground mt-1">Place your first group order</div>
                        <div className="text-xs text-primary mt-2">7 min read</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vendor Dashboard */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      🛒 Vendor Dashboard
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">View All Orders</div>
                        <div className="text-sm text-muted-foreground mt-1">Track and manage your orders</div>
                        <div className="text-xs text-primary mt-2">4 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Group Chat</div>
                        <div className="text-sm text-muted-foreground mt-1">Communicate with group members</div>
                        <div className="text-xs text-primary mt-2">6 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Create/Join Groups</div>
                        <div className="text-sm text-muted-foreground mt-1">Start or join group orders</div>
                        <div className="text-xs text-primary mt-2">5 min read</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supplier Dashboard */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      🏪 Supplier Dashboard
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Add Items</div>
                        <div className="text-sm text-muted-foreground mt-1">Add products to your inventory</div>
                        <div className="text-xs text-primary mt-2">4 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Update Stock</div>
                        <div className="text-sm text-muted-foreground mt-1">Manage inventory levels</div>
                        <div className="text-xs text-primary mt-2">3 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Analytics</div>
                        <div className="text-sm text-muted-foreground mt-1">View performance metrics</div>
                        <div className="text-xs text-primary mt-2">8 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Reviews</div>
                        <div className="text-sm text-muted-foreground mt-1">Manage customer feedback</div>
                        <div className="text-xs text-primary mt-2">5 min read</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting Section */}
              <div className="mt-12">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    🔧 Troubleshooting & FAQs
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Common Issues</div>
                        <div className="text-sm text-muted-foreground mt-1">Solutions to frequent problems</div>
                        <div className="text-xs text-primary mt-2">10 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Payment Issues</div>
                        <div className="text-sm text-muted-foreground mt-1">Resolve payment problems</div>
                        <div className="text-xs text-primary mt-2">6 min read</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Order Problems</div>
                        <div className="text-sm text-muted-foreground mt-1">Handle order issues</div>
                        <div className="text-xs text-primary mt-2">7 min read</div>
                      </div>
                      <div className="p-4 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                        <div className="font-semibold text-foreground">Contact Support</div>
                        <div className="text-sm text-muted-foreground mt-1">Get help when you need it</div>
                        <div className="text-xs text-primary mt-2">2 min read</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {showReportIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReportIssue(false)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Main Page
                  </Button>
                  <h2 className="text-2xl font-bold">🚨 Report an Issue</h2>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Track My Issues
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowReportIssue(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Issue Form */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-6">📝 Report Your Issue</h3>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="issue-name" className="font-semibold">Name *</Label>
                          <Input
                            id="issue-name"
                            placeholder="Your full name"
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="issue-email" className="font-semibold">Email *</Label>
                          <Input
                            id="issue-email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issue-category" className="font-semibold">Issue Category *</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select the type of issue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bug">🐛 Bug Report</SelectItem>
                            <SelectItem value="ui">🎨 UI/UX Issue</SelectItem>
                            <SelectItem value="feature">💡 Feature Request</SelectItem>
                            <SelectItem value="order">📦 Order Problem</SelectItem>
                            <SelectItem value="payment">💳 Payment Issue</SelectItem>
                            <SelectItem value="performance">⚡ Performance Issue</SelectItem>
                            <SelectItem value="security">🔒 Security Concern</SelectItem>
                            <SelectItem value="other">❓ Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issue-subject" className="font-semibold">Subject *</Label>
                        <Input
                          id="issue-subject"
                          placeholder="Brief, descriptive title for your issue"
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issue-description" className="font-semibold">Detailed Description *</Label>
                        <Textarea
                          id="issue-description"
                          placeholder="Please provide detailed information about the issue, including steps to reproduce, expected vs actual behavior, and any relevant context..."
                          rows={6}
                          required
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Include browser version, device type, and any error messages if applicable
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issue-screenshot" className="font-semibold">Screenshot/Attachment</Label>
                        <Input
                          id="issue-screenshot"
                          type="file"
                          accept="image/*,.pdf,.txt"
                          className="bg-background"
                        />
                        <p className="text-xs text-muted-foreground">
                          Upload screenshots, error logs, or other files that help illustrate the issue (Max 5MB)
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          type="submit" 
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            toast({
                              title: "✅ Issue Reported Successfully!",
                              description: "We've received your report. You'll get a confirmation email with tracking details.",
                            });
                            setShowReportIssue(false);
                          }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Submit Report
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setShowReportIssue(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Issue Status & Help */}
                <div className="space-y-6">
                  {/* Issue Status */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">📊 Issue Status</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-background rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Recent Issues</span>
                          <Badge variant="secondary">3</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last updated: 2 hours ago
                        </div>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Resolved</span>
                          <Badge variant="default">12</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          This month
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Help */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">💡 Quick Help</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all">
                        <div className="font-medium text-sm">Check FAQ First</div>
                        <div className="text-xs text-muted-foreground">Many issues have quick solutions</div>
                      </div>
                      <div className="p-3 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all">
                        <div className="font-medium text-sm">Clear Browser Cache</div>
                        <div className="text-xs text-muted-foreground">Often fixes display issues</div>
                      </div>
                      <div className="p-3 bg-background rounded-lg cursor-pointer hover:shadow-md transition-all">
                        <div className="font-medium text-sm">Try Different Browser</div>
                        <div className="text-xs text-muted-foreground">Test if it's browser-specific</div>
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">⏱️ Response Times</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Critical Issues:</span>
                        <span className="font-semibold text-red-600">2-4 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bug Reports:</span>
                        <span className="font-semibold text-orange-600">24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Feature Requests:</span>
                        <span className="font-semibold text-blue-600">3-5 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>General Support:</span>
                        <span className="font-semibold text-green-600">24-48 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact; 