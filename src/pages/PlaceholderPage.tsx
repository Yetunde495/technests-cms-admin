import { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
  comingSoonFeatures?: string[];
}

const PlaceholderPage = ({
  title,
  description,
  icon,
  comingSoonFeatures = [],
}: PlaceholderPageProps) => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 text-brand-600 dark:text-brand-400">
              {icon}
            </div>
          </div>

          <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex items-center justify-center space-x-2 mb-8">
            <Construction className="h-5 w-5 text-brand-500" />
            <span className="text-brand-600 font-medium">
              Coming Soon - Under Development
            </span>
          </div>

          {comingSoonFeatures.length > 0 && (
            <Card className="max-w-2xl mx-auto text-left">
              <CardHeader>
                <CardTitle className="text-center">Planned Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {comingSoonFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 space-x-4">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="mr-4"
            >
              Go Back
            </Button>
            <Button
              className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PlaceholderPage;
