import { FeedItemData } from './types';

export const feedData: FeedItemData[] = [
  {
    id: '1',
    slug: 'senior-software-engineer-fintech-kenya',
    type: 'job',
    title: 'Senior Software Engineer - Fintech',
    description: 'Join a leading fintech company revolutionizing mobile payments across Africa. We are seeking an experienced engineer to build scalable backend systems serving millions of users.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'M-Pesa Holdings',
      secondary: 'Nairobi, Kenya (Hybrid)',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MP',
      location: 'Nairobi, Kenya',
      salary: '$60,000 - $90,000',
      jobType: 'Full-time',
    },
    tags: ['Fintech', 'Backend', 'Mobile Payments', 'Remote'],
    actionLabel: 'Apply Now',
    postedAt: '2h ago',
    publishedDate: new Date('2025-11-24'),
    category: 'Jobs & Careers',
    categorySlug: 'jobs',
    region: 'East Africa',
    featured: true,
    views: 1243,
  },
  {
    id: '2',
    slug: 'rise-of-african-tech-hubs',
    type: 'article',
    title: 'The Rise of African Tech Hubs: Lagos to Nairobi',
    description: 'Explore how tech ecosystems across Africa are fostering innovation and attracting global investment. From Lagos\' thriving startup scene to Nairobi\'s Silicon Savannah, the continent is becoming a tech powerhouse.',
    content: `Africa's technology landscape is experiencing unprecedented growth, with cities like Lagos, Nairobi, and Cape Town emerging as major innovation hubs...`,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'Amara Okafor',
      secondary: '8 min read',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
      author: 'Amara Okafor',
      authorId: 'amara-okafor',
      readTime: '8 min',
      date: 'Nov 24, 2025',
    },
    tags: ['Technology', 'Innovation', 'Startups', 'Investment'],
    actionLabel: 'Read Full Article',
    postedAt: '5h ago',
    publishedDate: new Date('2025-11-24'),
    category: 'Technology',
    categorySlug: 'technology',
    region: 'West Africa',
    featured: true,
    views: 2847,
  },
  {
    id: '3',
    slug: 'afcfta-trade-milestone',
    type: 'news',
    title: 'African Continental Free Trade Area Reaches New Milestone',
    description: 'The AfCFTA has officially recorded over $2 billion in intra-African trade this quarter, marking a significant achievement in continental economic integration. Experts predict continued growth.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'Pan-African Business Daily',
      secondary: 'Breaking News',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=PA',
      date: 'Today',
      author: 'Thabo Mbeki',
      authorId: 'thabo-mbeki',
    },
    tags: ['Economy', 'Trade', 'AfCFTA', 'Business'],
    actionLabel: 'Read More',
    postedAt: '1h ago',
    publishedDate: new Date('2025-11-24'),
    category: 'Business',
    categorySlug: 'business',
    featured: true,
    views: 3521,
  },
  {
    id: '4',
    slug: 'agricultural-innovation-specialist-johannesburg',
    type: 'job',
    title: 'Agricultural Innovation Specialist',
    description: 'Lead agricultural transformation projects using drone technology and data analytics. Help smallholder farmers increase yields and access markets across Southern Africa.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'AgriTech Solutions',
      secondary: 'Johannesburg, South Africa',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AS',
      location: 'Johannesburg, South Africa',
      salary: '$45,000 - $70,000',
      jobType: 'Full-time',
    },
    tags: ['Agriculture', 'Innovation', 'Data Analytics', 'Full-time'],
    actionLabel: 'Learn More',
    postedAt: '6h ago',
    publishedDate: new Date('2025-11-23'),
    category: 'Jobs & Careers',
    categorySlug: 'jobs',
    region: 'Southern Africa',
    views: 892,
  },
  {
    id: '5',
    slug: 'renewable-energy-revolution-east-africa',
    type: 'article',
    title: 'Renewable Energy Revolution in East Africa',
    description: 'Kenya and Ethiopia are leading Africa\'s green energy transformation with massive investments in geothermal, wind, and solar power. This comprehensive analysis explores the impact on local communities and economic growth.',
    content: `East Africa is witnessing a remarkable transformation in its energy sector, with Kenya and Ethiopia at the forefront of renewable energy adoption...`,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
    metadata: {
      source: 'Kofi Mensah',
      secondary: '12 min read',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi',
      author: 'Kofi Mensah',
      authorId: 'kofi-mensah',
      readTime: '12 min',
      date: 'Nov 23, 2025',
    },
    tags: ['Energy', 'Sustainability', 'Climate', 'Development'],
    actionLabel: 'Read Article',
    postedAt: '1d ago',
    publishedDate: new Date('2025-11-23'),
    category: 'Environment',
    categorySlug: 'environment',
    region: 'East Africa',
    featured: true,
    views: 2145,
  },
  {
    id: '6',
    slug: 'nigeria-creative-economy-report',
    type: 'news',
    title: 'Nigeria\'s Creative Economy Generates $7.3 Billion',
    description: 'New report reveals Nigeria\'s entertainment and creative industries have contributed significantly to GDP, with Nollywood, music, and fashion driving unprecedented growth and global recognition.',
    imageUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
    metadata: {
      source: 'West Africa Economic Review',
      secondary: 'Featured Report',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=WA',
      date: 'Today',
      author: 'Chisom Nwankwo',
      authorId: 'chisom-nwankwo',
    },
    tags: ['Entertainment', 'Economy', 'Arts', 'Culture'],
    actionLabel: 'View Report',
    postedAt: '3h ago',
    publishedDate: new Date('2025-11-24'),
    category: 'Entertainment',
    categorySlug: 'entertainment',
    region: 'West Africa',
    views: 1876,
  },
  {
    id: '7',
    slug: 'healthcare-data-analyst-cape-town',
    type: 'job',
    title: 'Healthcare Data Analyst',
    description: 'Join our mission to improve healthcare delivery through data-driven insights. Analyze patient data, healthcare trends, and help optimize medical resource allocation across the region.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'HealthCare Analytics Africa',
      secondary: 'Cape Town, South Africa (Remote)',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HA',
      location: 'Cape Town, South Africa',
      salary: '$50,000 - $75,000',
      jobType: 'Remote',
    },
    tags: ['Healthcare', 'Data Science', 'Analytics', 'Remote'],
    actionLabel: 'Apply Now',
    postedAt: '8h ago',
    publishedDate: new Date('2025-11-23'),
    category: 'Jobs & Careers',
    categorySlug: 'jobs',
    region: 'Southern Africa',
    views: 1124,
  },
  {
    id: '8',
    slug: 'education-technology-bridging-learning-gap',
    type: 'article',
    title: 'Education Technology Bridging the Learning Gap',
    description: 'How mobile learning platforms are transforming education access in rural Africa. Success stories from Ghana, Rwanda, and Tanzania show the power of technology in democratizing quality education.',
    content: `Educational technology is revolutionizing access to quality learning across the African continent...`,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
    metadata: {
      source: 'Zainab Ahmed',
      secondary: '10 min read',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab',
      author: 'Zainab Ahmed',
      authorId: 'zainab-ahmed',
      readTime: '10 min',
      date: 'Nov 22, 2025',
    },
    tags: ['Education', 'EdTech', 'Innovation', 'Access'],
    actionLabel: 'Read More',
    postedAt: '2d ago',
    publishedDate: new Date('2025-11-22'),
    category: 'Education',
    categorySlug: 'education',
    views: 1657,
  },
];

// Helper functions for filtering and searching
export function getFeedItemBySlug(slug: string): FeedItemData | undefined {
  return feedData.find((item) => item.slug === slug);
}

export function getFeedItemsByCategory(categorySlug: string): FeedItemData[] {
  return feedData.filter((item) => item.categorySlug === categorySlug);
}

export function getFeedItemsByType(type: 'job' | 'article' | 'news'): FeedItemData[] {
  return feedData.filter((item) => item.type === type);
}

export function getFeedItemsByAuthor(authorId: string): FeedItemData[] {
  return feedData.filter((item) => item.metadata.authorId === authorId);
}

export function getFeedItemsByRegion(region: string): FeedItemData[] {
  return feedData.filter((item) => item.region === region);
}

export function searchFeedItems(query: string): FeedItemData[] {
  const lowerQuery = query.toLowerCase();
  return feedData.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getFeaturedItems(): FeedItemData[] {
  return feedData.filter((item) => item.featured);
}

export function getMostViewedItems(limit: number = 5): FeedItemData[] {
  return [...feedData].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
}