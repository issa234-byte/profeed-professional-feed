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

interface Author {
  id: number;
  name: string;
  bio: string | null;
  avatar: string | null;
  role: string | null;
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
}

interface AuthorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  author: Author | null;
  onSuccess: () => void;
}

export function AuthorDialog({ open, onOpenChange, author, onSuccess }: AuthorDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
    role: '',
    twitter: '',
    linkedin: '',
    website: '',
  });

  useEffect(() => {
    if (open && author) {
      setFormData({
        name: author.name,
        bio: author.bio || '',
        avatar: author.avatar || '',
        role: author.role || '',
        twitter: author.twitter || '',
        linkedin: author.linkedin || '',
        website: author.website || '',
      });
    } else if (open) {
      setFormData({
        name: '',
        bio: '',
        avatar: '',
        role: '',
        twitter: '',
        linkedin: '',
        website: '',
      });
    }
  }, [open, author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = author ? `/api/admin/authors?id=${author.id}` : '/api/admin/authors';
      const method = author ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`Author ${author ? 'updated' : 'created'} successfully`);
        onSuccess();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save author');
      }
    } catch (error) {
      toast.error('Failed to save author');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{author ? 'Edit Author' : 'Create New Author'}</DialogTitle>
          <DialogDescription>
            {author ? 'Update the author details' : 'Fill in the details to create a new author'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Tech Editor, Reporter, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              placeholder="Brief professional biography"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Handle</Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="@username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : author ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
