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
  FileText,
  Calendar,
  DollarSign,
  Tag,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";

interface AddProjectProps {
  onBack: () => void;
  onProjectCreated?: (projectId: string) => void;
}

const AddProject = ({ onBack, onProjectCreated }: AddProjectProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
    tags: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Catering", "Decor", "Equipment", "Ingredients", "Packaging", 
    "Transportation", "Services", "Other"
  ];

  const availableTags = [
    "Wedding", "Corporate", "Birthday", "Festival", "Catering", 
    "Decoration", "Equipment", "Bulk Order", "Urgent", "Premium"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Please enter a valid budget amount";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Please select a deadline";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were skipped",
        description: "Only images, PDFs, and text files under 5MB are allowed.",
        variant: "destructive"
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const generateProjectId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `PRJ${timestamp}${random}`.toUpperCase();
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

      const projectId = generateProjectId();
      
      toast({
        title: "Project Created Successfully!",
        description: `Project ${projectId} has been created and is now visible to vendors.`,
      });

      if (onProjectCreated) {
        onProjectCreated(projectId);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
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
            <h1 className="text-3xl font-bold text-foreground">Add New Project</h1>
          </div>
          <p className="text-muted-foreground ml-14">
            Create a new project to attract vendor groups and grow your business
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Project Details
                </CardTitle>
                <CardDescription>
                  Fill in the details to create your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Wedding Catering for 200 Guests"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements, specifications, and any special instructions..."
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (₹) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="e.g., 50000"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className={errors.budget ? "border-destructive" : ""}
                    />
                    {errors.budget && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.budget}
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
                  <Label>File Upload (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload supporting files (images, PDFs, documents)
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Max 5MB per file • Images, PDFs, and text files only
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </Label>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Uploaded Files:</p>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{file.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="w-4 h-4" />
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
                      Creating Project...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
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
                <CardTitle className="text-lg">Project Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Title</div>
                  <div className="font-medium">
                    {formData.title || "Enter project title"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {formData.category || "Select category"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Budget</div>
                    <div className="font-medium flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {formData.budget ? `₹${formData.budget}` : "Not set"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Deadline</div>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formData.deadline || "Not set"}
                    </div>
                  </div>
                </div>

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

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Files</div>
                    <div className="text-sm">
                      {uploadedFiles.length} file(s) uploaded
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
                    <CheckCircle className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Clear Description</p>
                    <p className="text-xs text-muted-foreground">Be specific about requirements and expectations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <DollarSign className="w-3 h-3 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Realistic Budget</p>
                    <p className="text-xs text-muted-foreground">Set competitive but fair pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-3 h-3 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reasonable Timeline</p>
                    <p className="text-xs text-muted-foreground">Give vendors enough time to prepare</p>
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

export default AddProject; 