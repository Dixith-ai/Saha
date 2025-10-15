import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useLoginUser } from "@/hooks/use-data";
import { useUser } from "@/contexts/UserContext";
import { setCurrentUserId as setApiCurrentUserId } from '@/lib/api';

const SignIn = () => {
  const navigate = useNavigate();
  const loginUser = useLoginUser();
  const { setCurrentUser, setCurrentUserId } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = await loginUser.mutateAsync({
        email: formData.email,
        password: formData.password
      });
      
      // Set the logged in user
      setCurrentUser(user);
      setCurrentUserId(user._id);
      setApiCurrentUserId(user._id); // Set in API layer too
      
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/title_logo.png?v=1" 
                alt="SAHA Title Logo" 
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-3xl font-bold">Welcome Back</h1>
            </div>
            <p className="text-muted-foreground">Sign in to continue to SAHA</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@university.edu"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              variant="hero" 
              size="lg"
              disabled={loginUser.isPending}
            >
              {loginUser.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
