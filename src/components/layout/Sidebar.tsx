'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarAd } from '@/components/ads/AdSenseAd';
import { getMostViewedItems } from '@/lib/feed-data';
import { categories } from '@/lib/data/categories';

export const Sidebar = () => {
  const trendingPosts = getMostViewedItems(5);

  return (
    <aside className="w-full space-y-6">
      {/* Ad Placement */}
      <SidebarAd />

      {/* Trending Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/${post.type}/${post.slug}`}
              className="block group"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 text-3xl font-bold text-muted-foreground/20">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.postedAt}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Browse Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Badge
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Another Ad Placement */}
      <SidebarAd />

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-lg">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest African news, jobs, and articles delivered to your inbox.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-2 rounded-md text-sm font-medium">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};
