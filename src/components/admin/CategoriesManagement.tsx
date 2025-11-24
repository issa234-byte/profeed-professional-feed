'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { CategoryDialog } from './CategoryDialog';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
}

interface CategoriesManagementProps {
  onUpdate: () => void;
}

export function CategoriesManagement({ onUpdate }: CategoriesManagementProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Category deleted successfully');
        loadCategories();
        onUpdate();
      } else {
        toast.error('Failed to delete category');
      }
    } catch (error) {
      toast.error('Failed to delete category');
      console.error(error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    loadCategories();
    onUpdate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Categories Management</CardTitle>
            <CardDescription>Organize content with categories</CardDescription>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No categories found
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {category.icon && <span className="text-2xl">{category.icon}</span>}
                        <h3 className="font-semibold text-lg truncate">{category.name}</h3>
                      </div>
                      {category.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {category.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Slug: {category.slug}</span>
                        {category.color && (
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: category.color }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(category.id)}
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

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
        onSuccess={handleDialogClose}
      />
    </Card>
  );
}
