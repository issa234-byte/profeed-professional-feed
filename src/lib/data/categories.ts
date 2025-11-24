import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'African tech innovation, startups, and digital transformation',
    color: 'bg-blue-500',
    icon: 'Laptop',
  },
  {
    id: 'business',
    name: 'Business',
    slug: 'business',
    description: 'Markets, finance, entrepreneurship, and economic development',
    color: 'bg-emerald-500',
    icon: 'TrendingUp',
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    slug: 'agriculture',
    description: 'Farming innovation, AgriTech, and food security',
    color: 'bg-green-600',
    icon: 'Sprout',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Medical innovations, public health, and wellness',
    color: 'bg-red-500',
    icon: 'Heart',
  },
  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    description: 'EdTech, learning innovations, and academic development',
    color: 'bg-purple-500',
    icon: 'GraduationCap',
  },
  {
    id: 'environment',
    name: 'Environment',
    slug: 'environment',
    description: 'Climate action, renewable energy, and sustainability',
    color: 'bg-teal-500',
    icon: 'Leaf',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Arts, culture, music, film, and creative industries',
    color: 'bg-pink-500',
    icon: 'Music',
  },
  {
    id: 'jobs',
    name: 'Jobs & Careers',
    slug: 'jobs',
    description: 'Employment opportunities across Africa',
    color: 'bg-amber-500',
    icon: 'Briefcase',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}
