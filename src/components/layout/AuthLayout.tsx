import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <img src="/assets/logo.svg" className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gradient-text !bg-clip-text text-transparent py-1">
                  technests
                </span>
              </div>
              
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              {title}
            </h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
