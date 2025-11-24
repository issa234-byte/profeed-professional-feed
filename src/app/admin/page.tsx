'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PostsManagement } from '@/components/admin/PostsManagement';
import { AdsManagement } from '@/components/admin/AdsManagement';
import { CategoriesManagement } from '@/components/admin/CategoriesManagement';
import { AuthorsManagement } from '@/components/admin/AuthorsManagement';
import { FileText, DollarSign, FolderOpen, Users, BarChart3 } from 'lucide-react';

export default function AdminPanel() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalAds: 0,
    totalCategories: 0,
    totalAuthors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [postsRes, adsRes, categoriesRes, authorsRes] = await Promise.all([
        fetch('/api/admin/posts?limit=1'),
        fetch('/api/admin/ads?limit=1'),
        fetch('/api/admin/categories?limit=1'),
        fetch('/api/admin/authors?limit=1'),
      ]);

      const [posts, ads, categories, authors] = await Promise.all([
        postsRes.json(),
        adsRes.json(),
        categoriesRes.json(),
        authorsRes.json(),
      ]);

      setStats({
        totalPosts: Array.isArray(posts) ? posts.length : 0,
        totalAds: Array.isArray(ads) ? ads.length : 0,
        totalCategories: Array.isArray(categories) ? categories.length : 0,
        totalAuthors: Array.isArray(authors) ? authors.length : 0,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Tamu Diaries Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage your blog posts, advertisements, categories, and authors
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalPosts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalAds}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <FolderOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalCategories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Authors</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalAuthors}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="ads">Ads</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <PostsManagement onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="ads">
            <AdsManagement onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManagement onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="authors">
            <AuthorsManagement onUpdate={loadStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
