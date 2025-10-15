import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { MongoId } from "@/lib/types";

// Query keys
const qk = {
  listings: (search?: string) => ["listings", { search }] as const,
  projects: () => ["projects"] as const,
  me: () => ["me"] as const,
  achievements: (userId: MongoId) => ["achievements", userId] as const,
  notifications: (userId: MongoId) => ["notifications", userId] as const,
};

export function useListings(search?: string) {
  return useQuery({
    queryKey: qk.listings(search),
    queryFn: () => api.listMarketplace({ search }),
    onError: (error) => {
      console.error('Failed to fetch listings:', error);
    }
  });
}

export function useCreateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createListing,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useRequestListing() {
  return useMutation({ mutationFn: api.requestListing });
}

export function useProjects() {
  return useQuery({ 
    queryKey: qk.projects(), 
    queryFn: api.listProjects,
    onError: (error) => {
      console.error('Failed to fetch projects:', error);
    }
  });
}

export function useRequestJoinProject() {
  return useMutation({ mutationFn: api.requestJoinProject });
}

export function useMe() {
  return useQuery({ 
    queryKey: qk.me(), 
    queryFn: api.getCurrentUser,
    onError: (error) => {
      console.error('Failed to fetch user:', error);
    }
  });
}

export function useAchievements(userId: MongoId) {
  return useQuery({ 
    queryKey: qk.achievements(userId), 
    queryFn: () => api.listAchievements(userId), 
    enabled: !!userId,
    onError: (error) => {
      console.error('Failed to fetch achievements:', error);
    }
  });
}

export function useNotifications(userId: MongoId) {
  return useQuery({ 
    queryKey: qk.notifications(userId), 
    queryFn: () => api.listNotifications(userId), 
    enabled: !!userId,
    onError: (error) => {
      console.error('Failed to fetch notifications:', error);
    }
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.markNotificationRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

// New CRUD hooks for Marketplace
export function useUpdateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: MongoId; data: any }) => api.updateListing(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export function useDeleteListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteListing,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

// New CRUD hooks for Projects
export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: MongoId; data: any }) => api.updateProject(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

// User registration hook
export function useRegisterUser() {
  return useMutation({
    mutationFn: api.registerUser,
  });
}

    // User login hook
    export function useLoginUser() {
      return useMutation({
        mutationFn: api.loginUser,
      });
    }

    // User update hook
    export function useUpdateUser() {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: api.updateUser,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
      });
    }


