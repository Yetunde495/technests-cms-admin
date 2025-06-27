import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Grid3X3,
  List,
  Clock,
  CheckCircle,
  AlertCircle,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  FileText,
  Image,
  Video,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample calendar data
const calendarData = {
  "2024-01-01": [
    {
      id: "post-1",
      time: "18:00",
      platform: "facebook",
      type: "post",
      title: "Weekly Market Outlook",
      status: "scheduled",
      engagement: 380,
    },
  ],
  "2024-01-02": [
    {
      id: "post-2",
      time: "09:00",
      platform: "instagram",
      type: "post",
      title: "Market Opening Analysis",
      status: "scheduled",
      engagement: 245,
    },
    {
      id: "post-3",
      time: "15:30",
      platform: "twitter",
      type: "post",
      title: "Quick Trading Tip",
      status: "scheduled",
      engagement: 156,
    },
  ],
  "2024-01-03": [
    {
      id: "post-4",
      time: "08:30",
      platform: "instagram",
      type: "story",
      title: "Live Trading Session",
      status: "published",
      engagement: 189,
    },
    {
      id: "post-5",
      time: "14:30",
      platform: "twitter",
      type: "post",
      title: "Risk Management Thread",
      status: "published",
      engagement: 420,
    },
    {
      id: "post-6",
      time: "20:00",
      platform: "linkedin",
      type: "article",
      title: "Trading Psychology Deep Dive",
      status: "draft",
      engagement: 0,
    },
  ],
  "2024-01-04": [
    {
      id: "post-7",
      time: "10:00",
      platform: "youtube",
      type: "video",
      title: "Chart Reading Masterclass",
      status: "pending_review",
      engagement: 0,
    },
    {
      id: "post-8",
      time: "16:00",
      platform: "instagram",
      type: "post",
      title: "Daily Market Wrap",
      status: "scheduled",
      engagement: 298,
    },
  ],
  "2024-01-05": [
    {
      id: "post-9",
      time: "07:00",
      platform: "twitter",
      type: "post",
      title: "Pre-Market Analysis",
      status: "scheduled",
      engagement: 167,
    },
    {
      id: "post-10",
      time: "12:00",
      platform: "facebook",
      type: "post",
      title: "NFP Day Trading Strategy",
      status: "pending_review",
      engagement: 0,
    },
    {
      id: "post-11",
      time: "19:00",
      platform: "instagram",
      type: "story",
      title: "Weekend Trading Recap",
      status: "draft",
      engagement: 0,
    },
  ],
};

const ContentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getPostsForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return calendarData[dateKey as keyof typeof calendarData] || [];
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: Instagram,
      twitter: Twitter,
      linkedin: Linkedin,
      facebook: Facebook,
      youtube: Youtube,
    };
    const Icon = icons[platform as keyof typeof icons] || FileText;
    return <Icon className="h-3 w-3" />;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-3 w-3" />;
      case "story":
        return <Image className="h-3 w-3" />;
      case "article":
        return <FileText className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "pending_review":
        return "bg-yellow-500";
      case "draft":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
        1,
      ),
    );
  };

  const getAllPosts = () => {
    return Object.values(calendarData)
      .flat()
      .filter((post) => {
        if (filterPlatform !== "all" && post.platform !== filterPlatform)
          return false;
        if (filterStatus !== "all" && post.status !== filterStatus)
          return false;
        return true;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Content Calendar
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and schedule your content across all platforms
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold min-w-[200px] text-center">
              {monthName}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
            >
              <Grid3X3 className="h-4 w-4 mr-1" />
              Calendar
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search content..." className="pl-10 w-64" />
          </div>
          <Select value={filterPlatform} onValueChange={setFilterPlatform}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="pending_review">Pending Review</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === "calendar" ? (
          <Card>
            <CardContent className="p-6">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-4 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-muted-foreground p-2"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-4">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="h-32" />;
                  }

                  const posts = getPostsForDate(day);
                  const isToday =
                    day.toDateString() === new Date().toDateString();

                  return (
                    <motion.div
                      key={day.toISOString()}
                      whileHover={{ scale: 1.02 }}
                      className={`h-32 p-2 border rounded-lg cursor-pointer transition-colors ${
                        isToday
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-semibold ${
                            isToday ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {day.getDate()}
                        </span>
                        {posts.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {posts.length}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1">
                        {posts.slice(0, 2).map((post) => (
                          <div
                            key={post.id}
                            className="flex items-center gap-1 p-1 rounded text-xs bg-muted/50"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(
                                post.status,
                              )}`}
                            />
                            {getPlatformIcon(post.platform)}
                            <span
                              className="truncate flex-1"
                              title={post.title}
                            >
                              {post.title}
                            </span>
                            <span className="text-muted-foreground">
                              {post.time}
                            </span>
                          </div>
                        ))}
                        {posts.length > 2 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{posts.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Content ({getAllPosts().length} items)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getAllPosts().map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(
                            post.status,
                          )}`}
                        />
                        <span className="text-sm font-medium">{post.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(post.platform)}
                        <span className="capitalize">{post.platform}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(post.type)}
                        <span className="text-sm text-muted-foreground capitalize">
                          {post.type}
                        </span>
                      </div>
                      <span className="font-medium">{post.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusBadge(post.status)}>
                        {post.status.replace("_", " ")}
                      </Badge>
                      {post.engagement > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {post.engagement} eng.
                        </span>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="h-4 w-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Published</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm">Pending Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-sm">Draft</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContentCalendar;