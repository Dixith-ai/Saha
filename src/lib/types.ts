// MongoDB-shaped domain types used across the app

export type MongoId = string; // Future: ObjectId string

export interface BaseDocument {
  _id: MongoId;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface UserProfile extends BaseDocument {
  name: string;
  email: string;
  branch?: string;
  year?: string;
  bio?: string;
  skills: string[];
  xp: number;
  level: number;
}

export interface MarketplaceListing extends BaseDocument {
  title: string;
  description: string;
  ownerUserId: MongoId;
  ownerName: string;
  type: "Lending" | "Selling" | "Swapping";
  category: string;
  image?: string; // emoji or URL
}

export interface Project extends BaseDocument {
  title: string;
  description: string;
  domain: string;
  memberUserIds: MongoId[];
  maxMembers: number;
  skills: string[];
  icon?: string; // lucide icon name for future
}

export interface Achievement extends BaseDocument {
  userId: MongoId;
  name: string;
  description: string;
  badgeColor?: string; // tailwind token
}

export interface AppNotification extends BaseDocument {
  userId: MongoId;
  title: string;
  body?: string;
  read: boolean;
}


