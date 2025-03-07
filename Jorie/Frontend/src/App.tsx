import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { PrivateRoute, PublicRoute } from "./components/AuthRoute"; // Updated import
import LandingPage from "./pages/landing";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes - redirect to home if already logged in */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            
            {/* Protected Routes - require login */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Index />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;