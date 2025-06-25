import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
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

      {/* Right side - Hero section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 dark:from-brand-900 dark:via-brand-800 dark:to-brand-700">
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-lg text-center space-y-6">
            <div className="w-20 h-20 bg-white dark:bg-brand-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">📝</span>
              </div>
            </div>
            <h3 className="text-2xl font-display font-bold text-brand-900 dark:text-brand-100">
              ContentPro
            </h3>
            <p className="text-brand-700 dark:text-brand-200 leading-relaxed">
              The all-in-one content marketing platform that helps you create,
              manage, and distribute amazing content across all channels.
            </p>
            <div className="flex items-center justify-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-900 dark:text-brand-100">
                  10K+
                </div>
                <div className="text-sm text-brand-600 dark:text-brand-300">
                  Articles Created
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-900 dark:text-brand-100">
                  500+
                </div>
                <div className="text-sm text-brand-600 dark:text-brand-300">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-900 dark:text-brand-100">
                  99.9%
                </div>
                <div className="text-sm text-brand-600 dark:text-brand-300">
                  Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
