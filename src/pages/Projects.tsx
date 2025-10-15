import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { Plus, Users, Code, Palette, Cpu, Wrench, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useProjects, useRequestJoinProject, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/use-data";
import { useUser } from "@/contexts/UserContext";

const Projects = () => {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    maxMembers: 5,
    skills: "",
    icon: "Code"
  });
  
  const handleLogout = () => {
    navigate("/");
  };

  const { data: projects = [], isLoading } = useProjects();
  const requestJoin = useRequestJoinProject();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const { currentUser } = useUser();

  const handleJoinProject = async (projectId: string, projectTitle: string) => {
    await requestJoin.mutateAsync(projectId);
    toast.success(`Request sent to join ${projectTitle}!`);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        // Update existing project
        await updateProject.mutateAsync({
          id: editingProject._id,
          data: {
            title: formData.title,
            description: formData.description,
            domain: formData.domain,
            maxMembers: formData.maxMembers,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            icon: formData.icon
          }
        });
        toast.success("Project updated successfully!");
      } else {
        // Create new project
        await createProject.mutateAsync({
          title: formData.title,
          description: formData.description,
          domain: formData.domain,
          memberUserIds: currentUser ? [currentUser._id] : [],
          maxMembers: formData.maxMembers,
          skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
          icon: formData.icon
        });
        toast.success("Project created successfully!");
      }
      setIsDialogOpen(false);
      setEditingProject(null);
      setFormData({ title: "", description: "", domain: "", maxMembers: 5, skills: "", icon: "Code" });
    } catch (error) {
      toast.error(editingProject ? "Failed to update project" : "Failed to create project");
    }
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      domain: project.domain,
      maxMembers: project.maxMembers,
      skills: project.skills.join(', '),
      icon: project.icon
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      try {
        await deleteProject.mutateAsync(projectId);
        toast.success("Project deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-primary/5">
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Project Collaboration Hub</h1>
            <p className="text-muted-foreground">Find teammates and build amazing things together</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5" />
                Start a Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "Start a New Project"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., AI Chatbot for Campus"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your project..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="e.g., AI/ML, Mobile Dev, IoT"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    value={formData.maxMembers}
                    onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) || 5 })}
                    min="2"
                    max="20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g., Python, React, Machine Learning"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createProject.isPending || updateProject.isPending}>
                    {createProject.isPending || updateProject.isPending ? (editingProject ? "Updating..." : "Creating...") : (editingProject ? "Update Project" : "Create Project")}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Projects Grid */}
        <div className="modern-grid">
          {isLoading && <div className="text-center py-12 text-lg text-muted-foreground animate-pulse">Loading projects...</div>}
          {!isLoading && projects.map((project, index) => {
            const iconMap: Record<string, any> = { Code, Palette, Cpu, Wrench };
            const Icon = iconMap[project.icon ?? "Code"] ?? Code;
            return (
              <Card key={project._id} className="glass-card p-8 card-hover animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center flex-shrink-0 pulse-glow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl mb-2 gradient-text">{project.title}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-primary/20 text-primary border border-primary/30">
                      {project.domain}
                    </span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{project.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-medium text-muted-foreground">
                      {project.memberUserIds.length}/{project.maxMembers} members
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="glass-card px-3 py-1 text-sm font-bold">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                {project.memberUserIds.includes(currentUser?._id) ? (
                  // Owner actions
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 glass-card hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteProject(project._id, project.title)}
                      className="text-destructive hover:text-destructive glass-card hover:bg-destructive/10 transition-all duration-300 hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  // Non-owner actions
                  <Button 
                    className="w-full btn-modern transition-all duration-300 hover:scale-105"
                    onClick={() => handleJoinProject(project._id, project.title)}
                  >
                    Request to Join
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
