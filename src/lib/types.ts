export type FeedItemType = 'job' | 'article' | 'news';
export type Region = 'East Africa' | 'West Africa' | 'Southern Africa' | 'North Africa' | 'Central Africa';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  title: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  articleCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface FeedItemData {
  id: string;
  slug: string;
  type: FeedItemType;
  title: string;
  description: string;
  content?: string;
  imageUrl: string;
  metadata: {
    source?: string;
    secondary?: string;
    avatarUrl?: string;
    location?: string;
    author?: string;
    authorId?: string;
    readTime?: string;
    date?: string;
    salary?: string;
    jobType?: string;
  };
  tags: string[];
  actionLabel: string;
  postedAt: string;
  publishedDate: Date;
  category: string;
  categorySlug: string;
  region?: Region;
  featured?: boolean;
  views?: number;
}
