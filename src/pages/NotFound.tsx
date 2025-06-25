import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
        </div>

        {/* 404 */}
        <div className="mb-8">
          <h1 className="text-8xl font-display font-bold text-brand-500 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-display font-semibold mb-2">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
          >
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Help */}
        <div className="mt-8 text-sm text-muted-foreground">
          Need help?{" "}
          <a
            href="mailto:support@contentpro.com"
            className="text-brand-600 hover:text-brand-500 font-medium"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
