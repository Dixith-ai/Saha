import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { Plus, ShoppingBag, Briefcase, Trophy, TrendingUp } from "lucide-react";
import { useListings, useProjects, useAchievements, useNotifications } from "@/hooks/use-data";
import { useUser } from "@/contexts/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(true);
  const { currentUser, logout } = useUser();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const { data: listings = [] } = useListings();
  const { data: projects = [] } = useProjects();
  const { data: achievements = [] } = useAchievements(currentUser?._id || "");
  const { data: notifications = [] } = useNotifications(currentUser?._id || "");

  // Calculate XP progress (assuming 100 XP per level)
  const currentLevel = currentUser?.level || 1;
  const currentXP = currentUser?.xp || 0;
  const xpForCurrentLevel = (currentLevel - 1) * 100;
  const xpForNextLevel = currentLevel * 100;
  const xpProgress = ((currentXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-success/5">
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up">
          <div className="relative">
            <img 
              src="/images/title_logo.png" 
              alt="SAHA Title Logo" 
              className="w-20 h-20 object-contain flex-shrink-0 float-animation"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full pulse-glow"></div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome back, <span className="gradient-text">{currentUser?.name || 'Student'}</span>! 👋
            </h1>
            <p className="text-muted-foreground text-xl">Here's what's happening on campus today</p>
          </div>
        </div>

        {/* XP and Level Section */}
        <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <Card className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold gradient-text">Level {currentLevel}</h2>
                  <p className="text-muted-foreground text-lg">{currentXP} XP</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Next Level</p>
                  <p className="font-bold text-lg">{xpForNextLevel} XP</p>
                </div>
              </div>
              <div className="relative">
                <Progress value={xpProgress} className="h-3 rounded-full" />
                <div className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary to-success rounded-full" style={{width: `${xpProgress}%`}}></div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Achievements and Notifications */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Achievements */}
          <Card className="glass-card p-8 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center pulse-glow">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Achievements</h2>
            </div>
            <div className="space-y-4">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <div key={achievement._id} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 animate-fade-in-up" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{achievement.name}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No achievements yet. Start creating projects and listings!</p>
                </div>
              )}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="glass-card p-8 animate-slide-in-right" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center pulse-glow">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification, index) => (
                  <div key={notification._id} className={`p-4 rounded-xl border transition-all duration-300 animate-fade-in-up ${notification.read ? 'bg-muted/30 border-muted' : 'bg-primary/5 border-primary/20'}`} style={{animationDelay: `${0.8 + index * 0.1}s`}}>
                    <h3 className="font-bold text-base">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{notification.body}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No recent activity</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card p-8 card-hover cursor-pointer animate-fade-in-up" style={{animationDelay: '0.8s'}} onClick={() => navigate("/marketplace")}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center pulse-glow">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">List an Item</h3>
                <p className="text-muted-foreground text-lg">Share with campus</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass-card p-8 card-hover cursor-pointer animate-fade-in-up" style={{animationDelay: '1s'}} onClick={() => navigate("/projects")}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center pulse-glow">
                <Briefcase className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">Start a Project</h3>
                <p className="text-muted-foreground text-lg">Find teammates</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass-card p-8 card-hover cursor-pointer animate-fade-in-up" style={{animationDelay: '1.2s'}} onClick={() => navigate("/profile")}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center pulse-glow">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">View Achievements</h3>
                <p className="text-muted-foreground text-lg">250 XP earned</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Marketplace Highlights */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary" />
                Marketplace Highlights
              </h2>
              <Button variant="ghost" onClick={() => navigate("/marketplace")}>
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {listings.slice(0, 3).map((item) => (
                <Card key={item._id} className="p-4 card-hover cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">by {item.ownerName}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {item.type}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Suggested Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-success" />
                Suggested Projects
              </h2>
              <Button variant="ghost" onClick={() => navigate("/projects")}>
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {projects.slice(0, 3).map((project) => (
                <Card key={project._id} className="p-4 card-hover cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      {project.domain}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{project.memberUserIds.length} members</span>
                    <span className="text-primary font-medium">Max: {project.maxMembers}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
