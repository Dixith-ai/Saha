import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { Search, Filter, Plus, MessageSquare, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useListings, useRequestListing, useCreateListing, useUpdateListing, useDeleteListing } from "@/hooks/use-data";
import { useUser } from "@/contexts/UserContext";

const Marketplace = () => {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    image: ""
  });
  
  const handleLogout = () => {
    navigate("/");
  };

  const { data: listings = [], isLoading } = useListings(searchQuery);
  const requestListing = useRequestListing();
  const createListing = useCreateListing();
  const updateListing = useUpdateListing();
  const deleteListing = useDeleteListing();
  const { currentUser } = useUser();

  // Debug logging
  console.log('Current User:', currentUser);
  console.log('Listings:', listings);

  const handleRequest = async (listingId: string, title: string) => {
    await requestListing.mutateAsync(listingId);
    toast.success(`Request sent for ${title}!`);
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingListing) {
        // Update existing listing
        await updateListing.mutateAsync({
          id: editingListing._id,
          data: {
            title: formData.title,
            description: formData.description,
            type: formData.type as "Lending" | "Selling" | "Swapping",
            category: formData.category,
            image: formData.image || "🛒"
          }
        });
        toast.success("Listing updated successfully!");
      } else {
        // Create new listing
        await createListing.mutateAsync({
          title: formData.title,
          description: formData.description,
          ownerUserId: currentUser?._id || "",
          ownerName: currentUser?.name || "",
          type: formData.type as "Lending" | "Selling" | "Swapping",
          category: formData.category,
          image: formData.image || "🛒"
        });
        toast.success("Item listed successfully!");
      }
      setIsDialogOpen(false);
      setEditingListing(null);
      setFormData({ title: "", description: "", type: "", category: "", image: "" });
    } catch (error) {
      toast.error(editingListing ? "Failed to update listing" : "Failed to create listing");
    }
  };

  const handleEditListing = (listing: any) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      description: listing.description,
      type: listing.type,
      category: listing.category,
      image: listing.image || ""
    });
    setIsDialogOpen(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-success/5">
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Campus Marketplace</h1>
            <p className="text-muted-foreground">Buy, sell, swap, or lend with your peers</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5" />
                List an Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingListing ? "Edit Item" : "List a New Item"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateListing} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Physics Textbook"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your item..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lending">Lending</SelectItem>
                      <SelectItem value="Selling">Selling</SelectItem>
                      <SelectItem value="Swapping">Swapping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Emoji (optional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="📚"
                    maxLength={2}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                <Button type="submit" disabled={createListing.isPending || updateListing.isPending}>
                  {createListing.isPending || updateListing.isPending ? (editingListing ? "Updating..." : "Creating...") : (editingListing ? "Update Item" : "List Item")}
                </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search items or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
        
            {/* Items Grid */}
            <div className="modern-grid">
              {isLoading && <div className="text-center py-12 text-lg text-muted-foreground animate-pulse">Loading listings...</div>}
              {!isLoading && listings.map((item, index) => (
                <Card key={item._id} className="glass-card p-8 card-hover animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-8xl mb-6 text-center float-animation">{item.image ?? "🛒"}</div>

                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl gradient-text">{item.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        item.type === "Lending" ? "bg-success/20 text-success border border-success/30" :
                        item.type === "Selling" ? "bg-primary/20 text-primary border border-primary/30" :
                        "bg-accent/20 text-accent border border-accent/30"
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3 text-lg leading-relaxed">{item.description}</p>
                    <p className="text-sm text-muted-foreground font-medium">by {item.ownerName}</p>
                  </div>

                  <div className="flex gap-3">
                    {(() => {
                      const isOwner = item.ownerUserId === currentUser?._id;
                      console.log(`Item: ${item.title}, Owner: ${item.ownerUserId}, Current User: ${currentUser?._id}, Is Owner: ${isOwner}`);
                      return isOwner;
                    })() ? (
                      // Owner actions
                      <div className="flex gap-3 w-full">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="flex-1 glass-card hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                          onClick={() => handleEditListing(item)}
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteListing(item._id, item.title)}
                          className="text-destructive hover:text-destructive glass-card hover:bg-destructive/10 transition-all duration-300 hover:scale-105"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    ) : (
                      // Non-owner actions
                      <>
                        <Button
                          className="flex-1 btn-modern transition-all duration-300 hover:scale-105"
                          onClick={() => handleRequest(item._id, item.title)}
                        >
                          Request
                        </Button>
                        <Button variant="outline" size="icon" className="glass-card hover:bg-primary/10 transition-all duration-300 hover:scale-105">
                          <MessageSquare className="w-5 h-5" />
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
      </div>
    </div>
  );
};

export default Marketplace;
