'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Plus, Twitter, Linkedin, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { AuthorDialog } from './AuthorDialog';

interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  avatar: string | null;
  role: string | null;
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
}

interface AuthorsManagementProps {
  onUpdate: () => void;
}

export function AuthorsManagement({ onUpdate }: AuthorsManagementProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/authors');
      const data = await res.json();
      setAuthors(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load authors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this author?')) return;

    try {
      const res = await fetch(`/api/admin/authors?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Author deleted successfully');
        loadAuthors();
        onUpdate();
      } else {
        toast.error('Failed to delete author');
      }
    } catch (error) {
      toast.error('Failed to delete author');
      console.error(error);
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingAuthor(null);
    loadAuthors();
    onUpdate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Authors Management</CardTitle>
            <CardDescription>Manage writers and contributors</CardDescription>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Author
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading authors...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authors.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No authors found
              </div>
            ) : (
              authors.map((author) => (
                <div
                  key={author.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {author.avatar ? (
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                          {author.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{author.name}</h3>
                      {author.role && (
                        <p className="text-sm text-primary font-medium">{author.role}</p>
                      )}
                      {author.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {author.bio}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {author.twitter && (
                          <a
                            href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {author.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${author.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {author.website && (
                          <a
                            href={author.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(author)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(author.id)}
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

      <AuthorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        author={editingAuthor}
        onSuccess={handleDialogClose}
      />
    </Card>
  );
}
