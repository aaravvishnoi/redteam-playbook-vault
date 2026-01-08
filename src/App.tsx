import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Writeups from "./pages/Writeups";
import Notes from "./pages/Notes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SqlInjectionLoginBypass from "./pages/projects/SqlInjectionLoginBypass";
import SqlInjectionOracleVersion from "./pages/projects/SqlInjectionOracleVersion";
import SqlInjectionUnionEnumeration from "./pages/projects/SqlInjectionUnionEnumeration";
import BlindSqlInjectionBoolean from "./pages/projects/BlindSqlInjectionBoolean";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/sql-injection-login-bypass" element={<SqlInjectionLoginBypass />} />
          <Route path="/portfolio/sql-injection-oracle-version" element={<SqlInjectionOracleVersion />} />
          <Route path="/portfolio/sql-injection-union-enumeration" element={<SqlInjectionUnionEnumeration />} />
          <Route path="/portfolio/blind-sql-injection-boolean" element={<BlindSqlInjectionBoolean />} />
          <Route path="/writeups" element={<Writeups />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
