import { ReactNode } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="h-16 bg-background border-b py-4 border-border flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        {children}
        {/* Search */}
       
      </div>

      <div className="flex items-center space-x-3">
        

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-2 p-2">
              <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                <p className="text-sm font-medium">Article scheduled</p>
                <p className="text-xs text-muted-foreground">
                  "AI Content Guide" will be published in 2 hours
                </p>
              </div>
              <div className="p-3 bg-info-50 dark:bg-info-900/20 rounded-lg">
                <p className="text-sm font-medium">New chat conversation</p>
                <p className="text-xs text-muted-foreground">
                  Emma Wilson started a conversation about pricing
                </p>
              </div>
              <div className="p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                <p className="text-sm font-medium">Upload complete</p>
                <p className="text-xs text-muted-foreground">
                  Product demo video has been processed
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
