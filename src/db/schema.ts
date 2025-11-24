import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Categories table
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  color: text('color'),
  createdAt: text('created_at').notNull(),
});

// Authors table
export const authors = sqliteTable('authors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  bio: text('bio'),
  avatar: text('avatar'),
  role: text('role'),
  twitter: text('twitter'),
  linkedin: text('linkedin'),
  website: text('website'),
  createdAt: text('created_at').notNull(),
});

// Posts table
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  type: text('type').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  authorId: integer('author_id').references(() => authors.id),
  featuredImage: text('featured_image'),
  status: text('status').notNull().default('draft'),
  views: integer('views').default(0),
  readTime: text('read_time'),
  regions: text('regions', { mode: 'json' }),
  tags: text('tags', { mode: 'json' }),
  publishedAt: text('published_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Ads table
export const ads = sqliteTable('ads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  type: text('type').notNull(),
  placement: text('placement').notNull(),
  contentHtml: text('content_html'),
  scriptCode: text('script_code'),
  imageUrl: text('image_url'),
  linkUrl: text('link_url'),
  status: text('status').notNull().default('active'),
  priority: integer('priority').default(0),
  impressions: integer('impressions').default(0),
  clicks: integer('clicks').default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Job details table
export const jobDetails = sqliteTable('job_details', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').references(() => posts.id).unique(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  jobType: text('job_type').notNull(),
  salaryRange: text('salary_range'),
  applicationLink: text('application_link'),
  requirements: text('requirements', { mode: 'json' }),
  benefits: text('benefits', { mode: 'json' }),
  deadline: text('deadline'),
});