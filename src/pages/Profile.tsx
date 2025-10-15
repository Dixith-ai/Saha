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
import { Edit, Trophy, Star, Award, Target, Trash2, Plus } from "lucide-react";
import { useAchievements, useMe, useUpdateUser, useListings, useProjects, useUpdateListing, useDeleteListing, useUpdateProject, useDeleteProject } from "@/hooks/use-data";
import { useUser } from "@/contexts/UserContext";
import { setCurrentUserId as setApiCurrentUserId } from '@/lib/api';
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditListingDialogOpen, setIsEditListingDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    bio: "",
    skills: ""
  });
  const [listingFormData, setListingFormData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    image: ""
  });
  const [projectFormData, setProjectFormData] = useState({
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

  const { currentUser, currentUserId, setCurrentUser } = useUser();
  const { data: achievements = [] } = useAchievements(currentUser?._id ?? "");
  const { data: allListings = [] } = useListings();
  const { data: allProjects = [] } = useProjects();
  const updateUser = useUpdateUser();
  const updateListing = useUpdateListing();
  const deleteListing = useDeleteListing();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  // Filter user's own content
  const myListings = (allListings as any[]).filter((listing: any) => {
    // Handle both string and object ownerUserId
    const ownerId = typeof listing.ownerUserId === 'string' 
      ? listing.ownerUserId 
      : listing.ownerUserId?._id;
    return ownerId === currentUser?._id;
  });
  
  const myProjects = (allProjects as any[]).filter((project: any) => {
    // Handle both string array and object array memberUserIds
    if (Array.isArray(project.memberUserIds)) {
      return project.memberUserIds.some((member: any) => {
        const memberId = typeof member === 'string' ? member : member?._id;
        return memberId === currentUser?._id;
      });
    }
    return false;
  });


  const handleEditProfile = () => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        branch: currentUser.branch || "",
        year: currentUser.year || "",
        bio: currentUser.bio || "",
        skills: (currentUser.skills || []).join(', ')
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure API layer has the current user ID
      if (currentUserId) {
        setApiCurrentUserId(currentUserId);
      }
      
      
      const updatedUser = await updateUser.mutateAsync({
        name: formData.name,
        email: formData.email,
        branch: formData.branch,
        year: formData.year,
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      });
      
      // Update the local state with the new user data
      setCurrentUser(updatedUser);
      
      toast.success("Profile updated successfully!");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Profile Update Error:', error);
      toast.error("Failed to update profile");
    }
  };

  // Listing handlers
  const handleEditListing = (listing: any) => {
    setEditingListing(listing);
    setListingFormData({
      title: listing.title,
      description: listing.description,
      type: listing.type,
      category: listing.category,
      image: listing.image || ""
    });
    setIsEditListingDialogOpen(true);
  };

  const handleUpdateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateListing.mutateAsync({
        id: editingListing._id,
        data: {
          title: listingFormData.title,
          description: listingFormData.description,
          type: listingFormData.type as "Lending" | "Selling" | "Swapping",
          category: listingFormData.category,
          image: listingFormData.image || "🛒"
        }
      });
      toast.success("Listing updated successfully!");
      setIsEditListingDialogOpen(false);
      setEditingListing(null);
    } catch (error) {
      toast.error("Failed to update listing");
    }
  };

  const handleDeleteListing = async (listingId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteListing.mutateAsync(listingId);
        toast.success("Listing deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete listing");
      }
    }
  };

  // Project handlers
  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description,
      domain: project.domain,
      maxMembers: project.maxMembers,
      skills: project.skills.join(', '),
      icon: project.icon
    });
    setIsEditProjectDialogOpen(true);
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProject.mutateAsync({
        id: editingProject._id,
        data: {
          title: projectFormData.title,
          description: projectFormData.description,
          domain: projectFormData.domain,
          maxMembers: projectFormData.maxMembers,
          skills: projectFormData.skills.split(',').map(s => s.trim()).filter(Boolean),
          icon: projectFormData.icon
        }
      });
      toast.success("Project updated successfully!");
      setIsEditProjectDialogOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  const handleDeleteProject = async (projectId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProject.mutateAsync(projectId);
        toast.success("Project deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-success/5">
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center text-4xl font-bold text-white flex-shrink-0">
                    {currentUser?.name?.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold mb-1">{currentUser?.name}</h1>
                        <p className="text-muted-foreground">{currentUser?.email}</p>
                      </div>
                  <Button variant="outline" size="sm" onClick={handleEditProfile}>
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>
                
                    <div className="flex gap-4 mb-4 text-sm">
                      <span className="text-muted-foreground">{currentUser?.branch}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{currentUser?.year}</span>
                    </div>

                    <p className="text-muted-foreground mb-4">{currentUser?.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {(currentUser?.skills ?? []).map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
              </div>
            </div>
            
            {/* XP Progress */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level {currentUser?.level}</span>
                <span className="text-sm text-muted-foreground">{currentUser?.xp} XP</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                  style={{ width: `${((currentUser?.xp ?? 0) % 500) / 5}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {500 - ((currentUser?.xp ?? 0) % 500)} XP to Level {(currentUser?.level ?? 0) + 1}
              </p>
            </div>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-accent" />
                Achievements
              </h2>
              <div className="space-y-3">
                {(achievements as any[]).map((achievement: any) => {
                  const Icon = Star;
                  return (
                    <Card key={achievement._id} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${achievement.badgeColor ?? "text-accent"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            {/* My Listings */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/marketplace")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              {myListings.length > 0 ? (
                <div className="grid gap-4">
                  {myListings.map((listing) => (
                    <Card key={listing._id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{listing.image || "🛒"}</span>
                            <div>
                              <h3 className="font-semibold text-lg">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">{listing.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              listing.type === "Lending" ? "bg-success/20 text-success" :
                              listing.type === "Selling" ? "bg-primary/20 text-primary" :
                              "bg-accent/20 text-accent"
                            }`}>
                              {listing.type}
                            </span>
                            {listing.category && (
                              <span className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                                {listing.category}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditListing(listing)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteListing(listing._id, listing.title)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't created any listings yet.</p>
                  <Button onClick={() => navigate("/marketplace")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Listing
                  </Button>
                </Card>
              )}
            </div>

            {/* My Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/projects")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              {myProjects.length > 0 ? (
                <div className="grid gap-4">
                  {myProjects.map((project) => (
                    <Card key={project._id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center">
                              <span className="text-lg">🚀</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                              {project.domain}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {project.memberUserIds?.length || 0}/{project.maxMembers} members
                            </span>
                          </div>
                          {project.skills && project.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProject(project)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProject(project._id, project.title)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't created any projects yet.</p>
                  <Button onClick={() => navigate("/projects")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Project
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@university.edu"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="Computer Science"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="3rd Year"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, Python, Design (comma separated)"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateUser.isPending}>
                {updateUser.isPending ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Listing Dialog */}
      <Dialog open={isEditListingDialogOpen} onOpenChange={setIsEditListingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateListing} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="listing-title">Title</Label>
              <Input
                id="listing-title"
                value={listingFormData.title}
                onChange={(e) => setListingFormData({ ...listingFormData, title: e.target.value })}
                placeholder="Item title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="listing-description">Description</Label>
              <Textarea
                id="listing-description"
                value={listingFormData.description}
                onChange={(e) => setListingFormData({ ...listingFormData, description: e.target.value })}
                placeholder="Describe your item..."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="listing-type">Type</Label>
              <select
                id="listing-type"
                value={listingFormData.type}
                onChange={(e) => setListingFormData({ ...listingFormData, type: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select type</option>
                <option value="Lending">Lending</option>
                <option value="Selling">Selling</option>
                <option value="Swapping">Swapping</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="listing-category">Category</Label>
              <Input
                id="listing-category"
                value={listingFormData.category}
                onChange={(e) => setListingFormData({ ...listingFormData, category: e.target.value })}
                placeholder="e.g., Books, Electronics"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="listing-image">Image Emoji</Label>
              <Input
                id="listing-image"
                value={listingFormData.image}
                onChange={(e) => setListingFormData({ ...listingFormData, image: e.target.value })}
                placeholder="📚"
                maxLength={2}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditListingDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateListing.isPending}>
                {updateListing.isPending ? "Updating..." : "Update Listing"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditProjectDialogOpen} onOpenChange={setIsEditProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Title</Label>
              <Input
                id="project-title"
                value={projectFormData.title}
                onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                placeholder="Project title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                value={projectFormData.description}
                onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                placeholder="Describe your project..."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-domain">Domain</Label>
              <Input
                id="project-domain"
                value={projectFormData.domain}
                onChange={(e) => setProjectFormData({ ...projectFormData, domain: e.target.value })}
                placeholder="e.g., AI/ML, Mobile Dev"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-maxMembers">Max Members</Label>
              <Input
                id="project-maxMembers"
                type="number"
                value={projectFormData.maxMembers}
                onChange={(e) => setProjectFormData({ ...projectFormData, maxMembers: parseInt(e.target.value) || 1 })}
                min="1"
                max="10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-skills">Required Skills</Label>
              <Input
                id="project-skills"
                value={projectFormData.skills}
                onChange={(e) => setProjectFormData({ ...projectFormData, skills: e.target.value })}
                placeholder="React, Python, Design (comma separated)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-icon">Icon</Label>
              <Input
                id="project-icon"
                value={projectFormData.icon}
                onChange={(e) => setProjectFormData({ ...projectFormData, icon: e.target.value })}
                placeholder="Code"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditProjectDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateProject.isPending}>
                {updateProject.isPending ? "Updating..." : "Update Project"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
