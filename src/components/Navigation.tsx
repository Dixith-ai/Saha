import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag, Briefcase, User, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isAuthenticated = false, onLogout }: NavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinkClass = (path: string) => cn(
    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
    isActive(path) 
      ? "bg-primary text-primary-foreground shadow-md" 
      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
  );

  return (
    <nav className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center group">
          <div className="relative">
            <img 
              src="/main_logo.png" 
              alt="SAHA Logo" 
              className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1">
              <Link to="/dashboard" className={`${navLinkClass("/dashboard")} px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105`}>
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>
              <Link to="/marketplace" className={`${navLinkClass("/marketplace")} px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105`}>
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Marketplace</span>
              </Link>
              <Link to="/projects" className={`${navLinkClass("/projects")} px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105`}>
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">Projects</span>
              </Link>
              <Link to="/profile" className={`${navLinkClass("/profile")} px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105`}>
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
            </div>
            
            <Button variant="ghost" size="icon" className="relative glass-card hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full pulse-glow"></span>
            </Button>
            
            <Button variant="outline" size="sm" onClick={onLogout} className="glass-card border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 hover:scale-105">
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="glass-card hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button variant="hero" asChild className="btn-modern transition-all duration-300 hover:scale-105">
              <Link to="/signup">Join SAHA</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
