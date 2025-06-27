import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  Video,
  Sparkles,
  Plus,
  X,
  Paperclip,
  Building2,
  Search,
  Target,
  TrendingUp,
  Globe,
  Users,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useContentGeneration } from "@/hooks/useContentGeneration";
import { useAppContext, useToasts } from "@/context/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import { VerticalStepper } from "@/components/ui/vertical-stepper";

const ContentGeneration: React.FC = () => {
  const { generateContent, isGenerating, } = useContentGeneration();
  const { addToast } = useToasts();
  const { state } = useAppContext();
const { stepperSteps } = state;

  // Form state
  const [formData, setFormData] = useState({
    // Business Information
    companyName: "",
    industry: "",
    targetAudience: "",
    businessDescription: "",
    website: "",

    // Keywords & Research
    primaryKeywords: [] as string[],
    secondaryKeywords: [] as string[],
    competitorWebsites: [] as string[],

    // Content Preferences
    contentGoals: "",
    brandVoice: "",

    // Contact & Additional Info
    contactEmail: "",
    additionalNotes: "",
  });

  // File states
  const [uploadedFiles, setUploadedFiles] = useState({
    researchMaterials: [] as File[],
    brandAssets: [] as File[],
    articles: [] as File[],
    images: [] as File[],
    businessDocuments: [] as File[],
  });

  // Input states
  const [newKeyword, setNewKeyword] = useState("");
  const [newSecondaryKeyword, setNewSecondaryKeyword] = useState("");
  const [newCompetitor, setNewCompetitor] = useState("");

  const addKeyword = (type: "primary" | "secondary") => {
    const keyword = type === "primary" ? newKeyword : newSecondaryKeyword;
    const field = type === "primary" ? "primaryKeywords" : "secondaryKeywords";

    if (keyword.trim() && !formData[field].includes(keyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], keyword.trim()],
      }));

      if (type === "primary") {
        setNewKeyword("");
      } else {
        setNewSecondaryKeyword("");
      }
    }
  };

  const removeKeyword = (keyword: string, type: "primary" | "secondary") => {
    const field = type === "primary" ? "primaryKeywords" : "secondaryKeywords";
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((k) => k !== keyword),
    }));
  };

  const addCompetitor = () => {
    if (
      newCompetitor.trim() &&
      !formData.competitorWebsites.includes(newCompetitor.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        competitorWebsites: [...prev.competitorWebsites, newCompetitor.trim()],
      }));
      setNewCompetitor("");
    }
  };

  const removeCompetitor = (competitor: string) => {
    setFormData((prev) => ({
      ...prev,
      competitorWebsites: prev.competitorWebsites.filter(
        (c) => c !== competitor,
      ),
    }));
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: keyof typeof uploadedFiles,
  ) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => ({
      ...prev,
      [category]: [...prev[category], ...files],
    }));
  };

  const removeFile = (index: number, category: keyof typeof uploadedFiles) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", { formData, uploadedFiles });

    if (!formData.companyName.trim() || formData.primaryKeywords.length === 0) {
      addToast({
        type: "error",
        title: "Missing Information",
        description:
          "Please provide company name and at least one primary keyword.",
      });
      return;
    }

    console.log("Starting content research and generation...");
    try {
      await generateContent({
        brandId: "default",
        platforms: [
          "instagram",
          "twitter",
          "linkedin",
          "facebook",
          "youtube",
          "blog",
        ],
        duration: "1_month",
        contentTypes: ["posts", "stories", "articles", "videos"],
        tone: formData.brandVoice || "professional",
        topics: formData.primaryKeywords,
        additionalPrompts: `Company: ${formData.companyName}. Industry: ${formData.industry}. Target: ${formData.targetAudience}. Description: ${formData.businessDescription}. Goals: ${formData.contentGoals}. Additional: ${formData.additionalNotes}`,
        attachments: Object.values(uploadedFiles)
          .flat()
          .map((file) => file.name),
      });

      // Reset form
      setFormData({
        companyName: "",
        industry: "",
        targetAudience: "",
        businessDescription: "",
        website: "",
        primaryKeywords: [],
        secondaryKeywords: [],
        competitorWebsites: [],
        contentGoals: "",
        brandVoice: "",
        contactEmail: "",
        additionalNotes: "",
      });
      setUploadedFiles({
        researchMaterials: [],
        brandAssets: [],
        articles: [],
        images: [],
        businessDocuments: [],
      });
    } catch (error) {
      // Error handled by the mutation
    }
  };

  const FileUploadSection = ({
    title,
    description,
    category,
    acceptedTypes,
    icon: Icon,
    color,
  }: {
    title: string;
    description: string;
    category: keyof typeof uploadedFiles;
    acceptedTypes: string;
    icon: any;
    color: string;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${color}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Label htmlFor={`upload-${category}`} className="cursor-pointer">
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-sm font-medium">{description}</p>
                <p className="text-xs text-muted-foreground">
                  {acceptedTypes} files supported
                </p>
              </div>
              <Input
                id={`upload-${category}`}
                type="file"
                multiple
                accept={acceptedTypes}
                onChange={(e) => handleFileUpload(e, category)}
                className="hidden"
              />
            </Label>
          </div>

          {uploadedFiles[category].length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Uploaded Files ({uploadedFiles[category].length})
              </Label>
              <div className="space-y-2">
                {uploadedFiles[category].map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index, category)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppLayout>
    <div className="mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          Content Research & Generation
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Provide your business information, keywords, and research materials.
          Our AI will conduct competitive analysis, keyword research, and
          generate 30 days of high-quality content including articles, posts,
          videos, and images.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span>Competitive Analysis</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>Keyword Research</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span>30-Day Content Plan</span>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Business Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    placeholder="Forex Pro Trading Signals"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, industry: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forex-trading">
                        Forex Trading
                      </SelectItem>
                      <SelectItem value="stock-trading">
                        Stock Trading
                      </SelectItem>
                      <SelectItem value="crypto-trading">
                        Crypto Trading
                      </SelectItem>
                      <SelectItem value="financial-education">
                        Financial Education
                      </SelectItem>
                      <SelectItem value="investment-advisory">
                        Investment Advisory
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="https://forexprosignals.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactEmail: e.target.value,
                      }))
                    }
                    placeholder="admin@company.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      targetAudience: e.target.value,
                    }))
                  }
                  placeholder="Professional traders, forex beginners, institutional investors"
                />
              </div>

              <div>
                <Label htmlFor="businessDescription">
                  Business Description
                </Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      businessDescription: e.target.value,
                    }))
                  }
                  placeholder="Describe your business, services, unique value proposition, and what makes you different from competitors..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Keywords & Research */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-green-600" />
                Keywords & Competitive Research
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Keywords */}
              <div>
                <Label htmlFor="primaryKeywords">Primary Keywords *</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Main keywords you want to rank for and create content around
                </p>
                <div className="flex space-x-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="e.g., forex signals, trading tips, market analysis"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addKeyword("primary"))
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => addKeyword("primary")}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.primaryKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.primaryKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="default"
                        className="cursor-pointer"
                        onClick={() => removeKeyword(keyword, "primary")}
                      >
                        {keyword}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Secondary Keywords */}
              <div>
                <Label htmlFor="secondaryKeywords">Secondary Keywords</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Additional keywords for broader content coverage
                </p>
                <div className="flex space-x-2">
                  <Input
                    value={newSecondaryKeyword}
                    onChange={(e) => setNewSecondaryKeyword(e.target.value)}
                    placeholder="e.g., EUR/USD, gold trading, risk management"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addKeyword("secondary"))
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => addKeyword("secondary")}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.secondaryKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.secondaryKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeKeyword(keyword, "secondary")}
                      >
                        {keyword}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Competitor Websites */}
              <div>
                <Label htmlFor="competitorWebsites">Competitor Websites</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Competitor websites for analysis and benchmarking
                </p>
                <div className="flex space-x-2">
                  <Input
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                    placeholder="e.g., https://competitor.com"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addCompetitor())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addCompetitor}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.competitorWebsites.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.competitorWebsites.map((competitor) => (
                      <Badge
                        key={competitor}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => removeCompetitor(competitor)}
                      >
                        <Globe className="h-3 w-3 mr-1" />
                        {competitor}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* File Uploads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <FileUploadSection
            title="Research Materials"
            description="Upload market research, competitor analysis, industry reports"
            category="researchMaterials"
            acceptedTypes=".pdf,.doc,.docx,.txt"
            icon={FileText}
            color="text-blue-600"
          />

          <FileUploadSection
            title="Brand Assets"
            description="Upload logos, brand guidelines, style guides"
            category="brandAssets"
            acceptedTypes="image/*,.pdf"
            icon={Briefcase}
            color="text-purple-600"
          />

          <FileUploadSection
            title="Existing Articles"
            description="Upload your existing blog posts or articles for reference"
            category="articles"
            acceptedTypes=".pdf,.doc,.docx,.txt"
            icon={FileText}
            color="text-green-600"
          />

          <FileUploadSection
            title="Images & Media"
            description="Upload product images, charts, infographics"
            category="images"
            acceptedTypes="image/*,video/*"
            icon={Image}
            color="text-orange-600"
          />
        </motion.div>

        {/* Content Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Content Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contentGoals">Content Goals</Label>
                <Textarea
                  id="contentGoals"
                  value={formData.contentGoals}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contentGoals: e.target.value,
                    }))
                  }
                  placeholder="What do you want to achieve with your content? E.g., increase brand awareness, generate leads, educate audience, drive conversions..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="brandVoice">Brand Voice & Tone</Label>
                <Select
                  value={formData.brandVoice}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, brandVoice: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">
                      Professional & Authoritative
                    </SelectItem>
                    <SelectItem value="educational">
                      Educational & Informative
                    </SelectItem>
                    <SelectItem value="friendly">
                      Friendly & Approachable
                    </SelectItem>
                    <SelectItem value="confident">Confident & Bold</SelectItem>
                    <SelectItem value="conversational">
                      Conversational & Casual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      additionalNotes: e.target.value,
                    }))
                  }
                  placeholder="Any specific requirements, compliance notes, content restrictions, or special instructions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            type="submit"
            size="lg"
            disabled={isGenerating}
            className="px-12 py-4 bg-primary hover:bg-primary/90 text-lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-6 w-6 mr-3 animate-spin" />
                Researching & Generating Content...
              </>
            ) : (
              <>
                <TrendingUp className="h-6 w-6 mr-3" />
                Start Research & Generate 30-Day Content Plan
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            This will analyze your competitors, research keywords, and generate
            30 days of content including articles, posts, videos, and images
            optimized for your business.
          </p>
        </motion.div>
      </form>

      {isGenerating && (
        <VerticalStepper steps={stepperSteps} />
      )}
    </div>
    </AppLayout>
  );
};

export default ContentGeneration;