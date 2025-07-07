import { NavLink, useLocation } from "react-router-dom";
import { Edit, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/AppContext";

const navigation = [
  // { name: "Dashboard", href: "/dashboard", icon: Home },
  // { name: "Content Generation", href: "/generate", icon: BotIcon },
  // {
  //   name: "Articles",
  //   href: "/articles",
  //   icon: FileText,
  //   badge: "8",
  // },
  // { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Blog Manager", href: "/blog", icon: Edit },
  {
    name: "Chat Conversations",
    href: "/chat",
    icon: MessageSquare,
    badge: "3",
  },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const initials = [user?.firstName?.[0] || "", user?.lastName?.[0] || ""]
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-sidebar-border max-lg:hidden">
        <div className="flex items-center space-x-2">
          <img src="/assets/logo.svg" className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold gradient-text !bg-clip-text text-transparent py-1">
            technests
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/60 group-hover:text-sidebar-primary",
                  )}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className="bg-brand-100 text-brand-800 dark:bg-brand-800 dark:text-brand-100"
                >
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-sidebar-border space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="mr-3 h-5 w-5 text-sidebar-foreground/60 group-hover:text-sidebar-primary" />
              {item.name}
            </NavLink>
          );
        })}

        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5 text-sidebar-foreground/60" />
          Sign out
        </Button>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
