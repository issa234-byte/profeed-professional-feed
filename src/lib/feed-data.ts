export type FeedItemType = 'job' | 'article' | 'news';

export interface FeedItemData {
  id: string;
  type: FeedItemType;
  title: string;
  description: string;
  imageUrl: string;
  metadata: {
    source?: string;
    secondary?: string;
    avatarUrl?: string;
    location?: string;
    author?: string;
    readTime?: string;
    date?: string;
  };
  tags: string[];
  actionLabel: string;
  postedAt: string;
  category: string;
  region?: 'East Africa' | 'West Africa' | 'Southern Africa';
}

export const feedData: FeedItemData[] = [
  {
    id: '1',
    type: 'job',
    title: 'Senior Software Engineer - Fintech',
    description: 'Join a leading fintech company revolutionizing mobile payments across Africa. We are seeking an experienced engineer to build scalable backend systems serving millions of users.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'M-Pesa Holdings',
      secondary: 'Nairobi, Kenya (Hybrid)',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MP',
      location: 'Nairobi, Kenya'
    },
    tags: ['Fintech', 'Backend', 'Mobile Payments', 'Remote'],
    actionLabel: 'Apply Now',
    postedAt: '2h ago',
    category: 'Technology',
    region: 'East Africa'
  },
  {
    id: '2',
    type: 'article',
    title: 'The Rise of African Tech Hubs: Lagos to Nairobi',
    description: 'Explore how tech ecosystems across Africa are fostering innovation and attracting global investment. From Lagos\' thriving startup scene to Nairobi\'s Silicon Savannah, the continent is becoming a tech powerhouse.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'Amara Okafor',
      secondary: '8 min read',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
      author: 'Amara Okafor',
      readTime: '8 min read'
    },
    tags: ['Technology', 'Innovation', 'Startups', 'Investment'],
    actionLabel: 'Read Full Article',
    postedAt: '5h ago',
    category: 'Technology',
    region: 'West Africa'
  },
  {
    id: '3',
    type: 'news',
    title: 'African Continental Free Trade Area Reaches New Milestone',
    description: 'The AfCFTA has officially recorded over $2 billion in intra-African trade this quarter, marking a significant achievement in continental economic integration. Experts predict continued growth.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'Pan-African Business Daily',
      secondary: 'Breaking News',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=PA',
      date: 'Today'
    },
    tags: ['Economy', 'Trade', 'AfCFTA', 'Business'],
    actionLabel: 'Read More',
    postedAt: '1h ago',
    category: 'Business'
  },
  {
    id: '4',
    type: 'job',
    title: 'Agricultural Innovation Specialist',
    description: 'Lead agricultural transformation projects using drone technology and data analytics. Help smallholder farmers increase yields and access markets across Southern Africa.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'AgriTech Solutions',
      secondary: 'Johannesburg, South Africa',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AS',
      location: 'Johannesburg, South Africa'
    },
    tags: ['Agriculture', 'Innovation', 'Data Analytics', 'Full-time'],
    actionLabel: 'Learn More',
    postedAt: '6h ago',
    category: 'Agriculture',
    region: 'Southern Africa'
  },
  {
    id: '5',
    type: 'article',
    title: 'Renewable Energy Revolution in East Africa',
    description: 'Kenya and Ethiopia are leading Africa\'s green energy transformation with massive investments in geothermal, wind, and solar power. This comprehensive analysis explores the impact on local communities and economic growth.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
    metadata: {
      source: 'Kofi Mensah',
      secondary: '12 min read',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi',
      author: 'Kofi Mensah',
      readTime: '12 min read'
    },
    tags: ['Energy', 'Sustainability', 'Climate', 'Development'],
    actionLabel: 'Read Article',
    postedAt: '1d ago',
    category: 'Environment',
    region: 'East Africa'
  },
  {
    id: '6',
    type: 'news',
    title: 'Nigeria\'s Creative Economy Generates $7.3 Billion',
    description: 'New report reveals Nigeria\'s entertainment and creative industries have contributed significantly to GDP, with Nollywood, music, and fashion driving unprecedented growth and global recognition.',
    imageUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
    metadata: {
      source: 'West Africa Economic Review',
      secondary: 'Featured Report',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=WA',
      date: 'Today'
    },
    tags: ['Entertainment', 'Economy', 'Arts', 'Culture'],
    actionLabel: 'View Report',
    postedAt: '3h ago',
    category: 'Entertainment',
    region: 'West Africa'
  },
  {
    id: '7',
    type: 'job',
    title: 'Healthcare Data Analyst',
    description: 'Join our mission to improve healthcare delivery through data-driven insights. Analyze patient data, healthcare trends, and help optimize medical resource allocation across the region.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    metadata: {
      source: 'HealthCare Analytics Africa',
      secondary: 'Cape Town, South Africa (Remote)',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HA',
      location: 'Cape Town, South Africa'
    },
    tags: ['Healthcare', 'Data Science', 'Analytics', 'Remote'],
    actionLabel: 'Apply Now',
    postedAt: '8h ago',
    category: 'Healthcare',
    region: 'Southern Africa'
  },
  {
    id: '8',
    type: 'article',
    title: 'Education Technology Bridging the Learning Gap',
    description: 'How mobile learning platforms are transforming education access in rural Africa. Success stories from Ghana, Rwanda, and Tanzania show the power of technology in democratizing quality education.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
    metadata: {
      source: 'Zainab Ahmed',
      secondary: '10 min read',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab',
      author: 'Zainab Ahmed',
      readTime: '10 min read'
    },
    tags: ['Education', 'EdTech', 'Innovation', 'Access'],
    actionLabel: 'Read More',
    postedAt: '2d ago',
    category: 'Education'
  }
];