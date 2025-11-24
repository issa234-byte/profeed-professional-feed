'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Ad {
  id: number;
  title: string;
  type: string;
  placement: string;
  contentHtml: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  status: string;
  priority: number;
}

interface AdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ad: Ad | null;
  onSuccess: () => void;
}

export function AdDialog({ open, onOpenChange, ad, onSuccess }: AdDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'banner',
    placement: 'homepage',
    contentHtml: '',
    imageUrl: '',
    linkUrl: '',
    status: 'active',
    priority: '0',
  });

  useEffect(() => {
    if (open && ad) {
      setFormData({
        title: ad.title,
        type: ad.type,
        placement: ad.placement,
        contentHtml: ad.contentHtml || '',
        imageUrl: ad.imageUrl || '',
        linkUrl: ad.linkUrl || '',
        status: ad.status,
        priority: ad.priority.toString(),
      });
    } else if (open) {
      setFormData({
        title: '',
        type: 'banner',
        placement: 'homepage',
        contentHtml: '',
        imageUrl: '',
        linkUrl: '',
        status: 'active',
        priority: '0',
      });
    }
  }, [open, ad]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        priority: parseInt(formData.priority),
      };

      const url = ad ? `/api/admin/ads?id=${ad.id}` : '/api/admin/ads';
      const method = ad ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`Ad ${ad ? 'updated' : 'created'} successfully`);
        onSuccess();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save ad');
      }
    } catch (error) {
      toast.error('Failed to save ad');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{ad ? 'Edit Ad' : 'Create New Ad'}</DialogTitle>
          <DialogDescription>
            {ad ? 'Update the ad details' : 'Fill in the details to create a new ad'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                required
              >
                <option value="banner">Banner</option>
                <option value="sidebar">Sidebar</option>
                <option value="in-article">In-Article</option>
                <option value="feed">Feed</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="placement">Placement *</Label>
              <select
                id="placement"
                value={formData.placement}
                onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                required
              >
                <option value="homepage">Homepage</option>
                <option value="article">Article</option>
                <option value="job">Job</option>
                <option value="news">News</option>
                <option value="all">All Pages</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/ad-image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkUrl">Link URL</Label>
            <Input
              id="linkUrl"
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="https://example.com/landing-page"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentHtml">HTML Content (optional)</Label>
            <Textarea
              id="contentHtml"
              value={formData.contentHtml}
              onChange={(e) => setFormData({ ...formData, contentHtml: e.target.value })}
              rows={4}
              placeholder="<div>Custom HTML for ad</div>"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground">
                Higher priority ads are shown first
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : ad ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
