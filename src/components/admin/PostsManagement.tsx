'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Eye, Plus, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { PostDialog } from './PostDialog';

interface Post {
  id: number;
  title: string;
  slug: string;
  type: string;
  status: string;
  views: number;
  categoryId: number | null;
  authorId: number | null;
  createdAt: string;
  publishedAt: string | null;
}

interface PostsManagementProps {
  onUpdate: () => void;
}

export function PostsManagement({ onUpdate }: PostsManagementProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'article' | 'job' | 'news'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    loadPosts();
  }, [filterType, filterStatus]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/posts?limit=100';
      if (filterType !== 'all') url += `&type=${filterType}`;
      if (filterStatus !== 'all') url += `&status=${filterStatus}`;

      const res = await fetch(url);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Post deleted successfully');
        loadPosts();
        onUpdate();
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  const handlePublish = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}/publish`, {
        method: 'PATCH',
      });

      if (res.ok) {
        toast.success('Post published successfully');
        loadPosts();
        onUpdate();
      } else {
        toast.error('Failed to publish post');
      }
    } catch (error) {
      toast.error('Failed to publish post');
      console.error(error);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingPost(null);
    loadPosts();
    onUpdate();
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts Management</CardTitle>
        <CardDescription>Create, edit, and manage your blog posts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="job">Jobs</option>
              <option value="news">News</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No posts found
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {post.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Badge variant="outline">{post.type}</Badge>
                        <Badge
                          variant={
                            post.status === 'published'
                              ? 'default'
                              : post.status === 'draft'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {post.status}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views || 0} views
                        </span>
                        <span>ID: {post.id}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Slug: {post.slug}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {post.status === 'draft' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePublish(post.id)}
                        >
                          Publish
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>

      <PostDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        post={editingPost}
        onSuccess={handleDialogClose}
      />
    </Card>
  );
}
