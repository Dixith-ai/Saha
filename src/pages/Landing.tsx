import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Users, Trophy, ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/landing-background.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-success/10 to-accent/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl float-animation"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-success/20 rounded-full blur-2xl float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl float-animation" style={{animationDelay: '4s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-8 animate-scale-in">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-white">Campus Collaboration Made Easy</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 animate-fade-in-up">
              <img 
                src="/images/title_logo.png" 
                alt="SAHA Title Logo" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain float-animation"
              />
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight text-center">
                Collaborate. <span className="gradient-text-hero">Share</span>.<br />
                <span className="gradient-text-hero">Build Together</span>.
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Join your campus community in a platform built for students. 
              Exchange items, find project teammates, and grow together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Button className="btn-modern text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link to="/signup">
                  Join SAHA
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="glass-card border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full" asChild>
                <Link to="/marketplace">Explore Campus</Link>
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/80 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-success rounded-full pulse-glow"></div>
                <span className="font-medium">500+ Active Students</span>
              </div>
              <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-primary rounded-full pulse-glow"></div>
                <span className="font-medium">200+ Projects</span>
              </div>
              <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-accent rounded-full pulse-glow"></div>
                <span className="font-medium">1000+ Items Shared</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-success/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-success/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Built for the modern campus experience with cutting-edge features
            </p>
          </div>
          
          <div className="modern-grid max-w-7xl mx-auto">
            <div className="feature-card animate-slide-in-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 pulse-glow">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Campus Marketplace</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Buy, sell, swap, or lend items with fellow students. From textbooks to electronics, 
                everything you need is just a click away.
              </p>
            </div>
            
            <div className="feature-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center mb-6 pulse-glow">
                <Users className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Project Collaboration</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Find teammates for your next big idea. Create projects, manage tasks, 
                and build amazing things together.
              </p>
            </div>
            
            <div className="feature-card animate-slide-in-right" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 pulse-glow">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Achievements & XP</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Earn badges and experience points for being active. Unlock achievements, 
                level up, and showcase your campus contributions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center glass-card rounded-3xl p-16 relative overflow-hidden animate-scale-in">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-success to-accent opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Ready to Get <span className="gradient-text-hero">Started</span>?
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
                Join thousands of students already collaborating on SAHA
              </p>
              <Button className="btn-modern text-white px-10 py-5 text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link to="/signup">
                  Create Your Account
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 SAHA. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
