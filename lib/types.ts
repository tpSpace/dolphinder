// Profile types
export interface Profile {
  id: string;
  owner: string;
  name: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  socialLinks: string[];
  isVerified: boolean;
  createdAt: string;
  experienceCount: number;
  educationCount: number;
  certificateCount: number;
  skills: Skill[];
}

export interface Experience {
  id: number;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
  order_index: number;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  order_index: number;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  certificate_url: string;
  order_index: number;
}

export interface Skill {
  name: string;
  endorsement_count: number;
}

// Post types (Phase 2 - Now Implemented in Move Contract)
export interface Post {
  id: string;
  author: string;
  profileId: string;
  content: string;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  isLikedByUser?: boolean; // For UI state
}

export interface Comment {
  id: number;
  author: string;
  profileId: string;
  content: string;
  createdAt: string;
  orderIndex: number;
}

export interface PostLike {
  postId: string;
  userAddress: string;
  profileId: string;
}

export interface PostComment {
  postId: string;
  commentId: number;
  author: string;
  profileId: string;
  content: string;
}

// Feed and UI types
export interface PostWithProfile extends Post {
  profile?: Profile;
}

export interface FeedFilters {
  type: 'forYou' | 'following' | 'trending';
}

