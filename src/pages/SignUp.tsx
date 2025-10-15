import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useRegisterUser } from "@/hooks/use-data";
import { useUser } from "@/contexts/UserContext";

const SignUp = () => {
  const navigate = useNavigate();
  const registerUser = useRegisterUser();
  const { setCurrentUser, setCurrentUserId } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "",
    year: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    
    try {
      const newUser = await registerUser.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        branch: formData.branch,
        year: formData.year,
        bio: "",
        skills: []
      });
      
      // Set the new user as current user
      setCurrentUser(newUser);
      setCurrentUserId(newUser._id);
      setCurrentUserId(newUser._id); // Set in API layer too
      
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/title_logo.png" 
                alt="SAHA Title Logo" 
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-3xl font-bold">Join SAHA</h1>
            </div>
            <p className="text-muted-foreground">Start collaborating with your campus community</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
            
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  name="branch"
                  type="text"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="text"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="3rd Year"
                  className="mt-1"
                />
              </div>
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
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
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
              disabled={registerUser.isPending}
            >
              {registerUser.isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
