'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Search, BarChart } from 'lucide-react';
import { toast } from 'sonner';
import { AdDialog } from './AdDialog';

interface Ad {
  id: number;
  title: string;
  type: string;
  placement: string;
  status: string;
  priority: number;
  impressions: number;
  clicks: number;
  createdAt: string;
}

interface AdsManagementProps {
  onUpdate: () => void;
}

export function AdsManagement({ onUpdate }: AdsManagementProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  useEffect(() => {
    loadAds();
  }, [filterStatus]);

  const loadAds = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/ads?limit=100';
      if (filterStatus !== 'all') url += `&status=${filterStatus}`;

      const res = await fetch(url);
      const data = await res.json();
      setAds(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load ads');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this ad?')) return;

    try {
      const res = await fetch(`/api/admin/ads?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Ad deleted successfully');
        loadAds();
        onUpdate();
      } else {
        toast.error('Failed to delete ad');
      }
    } catch (error) {
      toast.error('Failed to delete ad');
      console.error(error);
    }
  };

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingAd(null);
    loadAds();
    onUpdate();
  };

  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ads Management</CardTitle>
        <CardDescription>Create, edit, and manage advertisements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Ad
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading ads...</div>
        ) : (
          <div className="space-y-4">
            {filteredAds.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No ads found</div>
            ) : (
              filteredAds.map((ad) => (
                <div
                  key={ad.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">{ad.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Badge variant="outline">{ad.type}</Badge>
                        <Badge variant="outline">{ad.placement}</Badge>
                        <Badge
                          variant={ad.status === 'active' ? 'default' : 'secondary'}
                        >
                          {ad.status}
                        </Badge>
                        <span>Priority: {ad.priority}</span>
                        <span className="flex items-center gap-1">
                          <BarChart className="h-3 w-3" />
                          {ad.impressions} impressions
                        </span>
                        <span>{ad.clicks} clicks</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        CTR: {ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : 0}%
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(ad)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(ad.id)}
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

      <AdDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ad={editingAd}
        onSuccess={handleDialogClose}
      />
    </Card>
  );
}
