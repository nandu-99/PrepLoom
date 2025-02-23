import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import {
  Sun,
  Moon,
  GraduationCap,
  Code,
  Users,
  Home,
  Share2,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "./components/theme-provider";
import { Card } from "./components/ui/card";
import { DSAPage } from "./pages/DSAPage";
import { WebDevPage } from "./pages/WebDevPage";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import { AuthPage } from "./pages/AuthPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { ContactPage } from "./pages/ContactPage";
import LearningPathPage from "./pages/LearningPathPage";
import TopicsPage from "./pages/TopicsPage";
import CodingQuestionsPage from "./pages/CodingQuestionsPage";
import Quiz from "./pages/QuizPage";
import { ResumePortfolioTipsPage } from "./pages/ResumePortfolioTipsPage";
import { useState } from "react";

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

function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Added to track current route
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setShowSharePopup(true);
    setTimeout(() => setShowSharePopup(false), 2000);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Function to determine if a route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <Home className="h-5 w-5" />
            </Button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-4">
              <Link to="/webdev">
                <Button
                  variant={isActive("/webdev") ? "default" : "ghost"}
                  className={isActive("/webdev") ? "bg-primary text-primary-foreground" : ""}
                >
                  Web Dev
                </Button>
              </Link>
              <Link to="/interview">
                <Button
                  variant={isActive("/interview") ? "default" : "ghost"}
                  className={isActive("/interview") ? "bg-primary text-primary-foreground" : ""}
                >
                  Interview Prep
                </Button>
              </Link>
              <Link to="/dsa">
                <Button
                  variant={isActive("/dsa") ? "default" : "ghost"}
                  className={isActive("/dsa") ? "bg-primary text-primary-foreground" : ""}
                >
                  DSA
                </Button>
              </Link>
              <Link to="/resume-portfolio-tips">
                <Button
                  variant={isActive("/resume-portfolio-tips") ? "default" : "ghost"}
                  className={isActive("/resume-portfolio-tips") ? "bg-primary text-primary-foreground" : ""}
                >
                  Resume & Portfolio
                </Button>
              </Link>
              <Link to="/feedback">
                <Button
                  variant={isActive("/feedback") ? "default" : "ghost"}
                  className={isActive("/feedback") ? "bg-primary text-primary-foreground" : ""}
                >
                  Feedback
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant={isActive("/contact") ? "default" : "ghost"}
                  className={isActive("/contact") ? "bg-primary text-primary-foreground" : ""}
                >
                  Contact
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleDrawer}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Side Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={toggleDrawer}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-4 p-4">
          <Link to="/webdev" onClick={toggleDrawer}>
            <Button
              variant={isActive("/webdev") ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive("/webdev") ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              Web Dev
            </Button>
          </Link>
          <Link to="/interview" onClick={toggleDrawer}>
            <Button
              variant={isActive("/interview") ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive("/interview") ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              Interview Prep
            </Button>
          </Link>
          <Link to="/dsa" onClick={toggleDrawer}>
            <Button
              variant={isActive("/dsa") ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive("/dsa") ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              DSA
            </Button>
          </Link>
          <Link to="/resume-portfolio-tips" onClick={toggleDrawer}>
            <Button
              variant={isActive("/resume-portfolio-tips") ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive("/resume-portfolio-tips") ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              Resume & Portfolio
            </Button>
          </Link>
          <Link to="/feedback" onClick={toggleDrawer}>
            <Button
              variant={isActive("/feedback") ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive("/feedback") ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              Feedback
            </Button>
          </Link>
          <Link to="/contact" onClick={toggleDrawer}>
            <Button
              variant={isActive("/contact") ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive("/contact") ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              Contact
            </Button>
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleDrawer}
        />
      )}

      <main className="container mx-auto px-4 py-8">{children}</main>

      {showSharePopup && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-md shadow-lg transition-opacity">
          Link copied to clipboard!
        </div>
      )}

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          © {new Date().getFullYear()} PrepLoom. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage onNavigate={navigate} />} />
        <Route path="/dsa" element={<DSAPage />} />
        <Route path="/webdev" element={<WebDevPage />} />
        <Route path="/webdev/learning-path/:pathId" element={<LearningPathPage />} />
        <Route path="/interview" element={<TopicsPage />} />
        <Route path="/questions/:categoryPathId/:topicPathId" element={<InterviewPrepPage />} />
        <Route path="/coding/:categoryPathId/:topicPathId" element={<CodingQuestionsPage />} />
        <Route path="/quiz/:categoryPathId/:topicPathId" element={<Quiz />} />
        <Route path="/resume-portfolio-tips" element={<ResumePortfolioTipsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/auth"
          element={
            <AuthPage
              onLogin={() => {
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
