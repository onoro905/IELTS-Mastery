import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

// Static imports for critical pages
import Home from "./pages/Home";
import NotFound from "@/pages/NotFound";

// Lazy load non-critical pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Vocabulary = lazy(() => import("./pages/Vocabulary"));
const Grammar = lazy(() => import("./pages/Grammar"));
const IeltsTests = lazy(() => import("./pages/IeltsTests"));
const AITeacher = lazy(() => import("./pages/AITeacher"));
const PhrasalVerbs = lazy(() => import("./pages/PhrasalVerbs"));
const Gamification = lazy(() => import("./pages/Gamification"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Settings = lazy(() => import("./pages/Settings"));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      
      <Route path={"/login"}>
        <Suspense fallback={<PageLoader />}>
          <Login />
        </Suspense>
      </Route>
      
      <Route path={"/register"}>
        <Suspense fallback={<PageLoader />}>
          <Register />
        </Suspense>
      </Route>
      
      <Route path={"/dashboard"}>
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      </Route>
      
      <Route path={"/settings"}>
        <Suspense fallback={<PageLoader />}>
          <Settings />
        </Suspense>
      </Route>
      
      <Route path={"/vocabulary"}>
        <Suspense fallback={<PageLoader />}>
          <Vocabulary />
        </Suspense>
      </Route>
      
      <Route path={"/grammar"}>
        <Suspense fallback={<PageLoader />}>
          <Grammar />
        </Suspense>
      </Route>
      
      <Route path={"/ielts"}>
        <Suspense fallback={<PageLoader />}>
          <IeltsTests />
        </Suspense>
      </Route>
      
      <Route path={"/ai-teacher"}>
        <Suspense fallback={<PageLoader />}>
          <AITeacher />
        </Suspense>
      </Route>
      
      <Route path={"/phrasal-verbs"}>
        <Suspense fallback={<PageLoader />}>
          <PhrasalVerbs />
        </Suspense>
      </Route>
      
      <Route path={"/gamification"}>
        <Suspense fallback={<PageLoader />}>
          <Gamification />
        </Suspense>
      </Route>
      
      <Route path={"/404"} component={NotFound} />
      
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
