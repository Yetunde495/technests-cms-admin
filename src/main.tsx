import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as Sonner } from "sonner";
import React from "react";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" richColors />
          <App />
        </TooltipProvider>
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>,
);
