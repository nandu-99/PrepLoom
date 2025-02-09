import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Sun,
  Moon,
  GraduationCap,
  Code,
  Users,
  Home,
  LogIn,
} from "lucide-react";
import { useTheme } from "./components/theme-provider";
import { Card } from "./components/ui/card";
import { DSAPage } from "./pages/DSAPage";
import { WebDevPage } from "./pages/WebDevPage";
import { InterviewPrepPage } from "./pages/InterviewPrepPage";
import { AuthPage } from "./pages/AuthPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { ContactPage } from "./pages/ContactPage";

interface HomePageProps {
  onNavigate: (path: string) => void;
}

function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to PrepLoom
        </h1>
        <p className="text-lg text-muted-foreground">
          Weaving your path to coding excellence with a rich collection of projects, essential resources, and interview questions. Build, learn, and excel with a structured approach! 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onNavigate("/webdev")}
        >
          <Code className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Web Development</h2>
          <p className="text-muted-foreground">
            Learn modern web development with roadmaps and projects
          </p>
        </Card>

        <Card
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onNavigate("/interview")}
        >
          <Users className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Interview Preparation
          </h2>
          <p className="text-muted-foreground">
            Practice with real interview questions and scenarios
          </p>
        </Card>

        <Card
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onNavigate("/dsa")}
        >
          <GraduationCap className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Data Structures & Algorithms
          </h2>
          <p className="text-muted-foreground">
            Master DSA with curated resources and practice problems
          </p>
        </Card>
      </div>
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }:LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <Home className="h-5 w-5" />
            </Button>
            <nav className="hidden md:flex gap-4">
              <Link to="/webdev">
                <Button variant="ghost">Web Dev</Button>
              </Link>
              <Link to="/interview">
                <Button variant="ghost">Interview Prep</Button>
              </Link>
              <Link to="/dsa">
                <Button variant="ghost">DSA</Button>
              </Link>
              <Link to="/feedback">
                <Button variant="ghost">
                  Feedback
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost">
                  Contact
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            {isAuthenticated ? (
              <Button onClick={() => setIsAuthenticated(false)}>
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")}>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          © {new Date().getFullYear()} Interview Prep Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage onNavigate={navigate} />} />
        <Route path="/dsa" element={<DSAPage />} />
        <Route path="/webdev" element={<WebDevPage />} />
        <Route path="/interview" element={<InterviewPrepPage />} />
        <Route path="/feedback" element={<FeedbackPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route 
          path="/auth" 
          element={
            <AuthPage
              onLogin={() => {
                setIsAuthenticated(true);
                navigate("/");
              }}
            />
          } 
        />
      </Routes>
    </Layout>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
