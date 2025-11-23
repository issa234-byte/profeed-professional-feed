'use client';

import React from 'react';
import Image from 'next/image';
import { FeedItemData } from '@/lib/feed-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Newspaper, FileText, Share2, Bookmark, MoreHorizontal, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeedItemProps {
  item: FeedItemData;
  isActive: boolean;
}

export default function FeedItem({ item, isActive }: FeedItemProps) {
  const getTypeIcon = () => {
    switch (item.type) {
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'news':
        return <Newspaper className="h-4 w-4" />;
    }
  };

  const getTypeLabel = () => {
    return item.type.charAt(0).toUpperCase() + item.type.slice(1);
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'job':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'article':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'news':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
    }
  };

  return (
    <motion.div 
      className="h-full w-full flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0.4, 
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl border-none ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-zinc-900 h-[85vh] flex flex-col">
        <div className="relative h-1/2 w-full overflow-hidden group">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={isActive}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={`flex gap-1.5 items-center px-3 py-1.5 border ${getTypeColor()}`}>
              {getTypeIcon()}
              <span className="font-semibold">{getTypeLabel()}</span>
            </Badge>
            {item.region && (
              <Badge className="flex gap-1 items-center px-3 py-1.5 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <MapPin className="h-3 w-3" />
                {item.region}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
             <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 border-2 border-white/30 ring-2 ring-white/10">
                  <AvatarImage src={item.metadata.avatarUrl} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold">
                    {item.metadata.source?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm md:text-base">{item.metadata.source}</p>
                  <p className="text-xs md:text-sm text-zinc-200 flex items-center gap-1.5">
                    <span className="inline-block h-1 w-1 rounded-full bg-orange-400"></span>
                    {item.postedAt} • {item.metadata.secondary}
                  </p>
                </div>
             </div>
             <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-3 line-clamp-2 drop-shadow-lg">
               {item.title}
             </h2>
             <p className="text-sm md:text-base text-zinc-200 font-medium uppercase tracking-wide">
               {item.category}
             </p>
          </div>
        </div>

        <CardContent className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
          <div>
            <p className="text-zinc-700 dark:text-zinc-300 text-base md:text-lg leading-relaxed line-clamp-4 md:line-clamp-5 mb-6">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="px-3 py-1 text-xs md:text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-orange-600 dark:hover:text-orange-400">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-orange-600 dark:hover:text-orange-400">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-orange-600 dark:hover:text-orange-400">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              size="lg" 
              className="px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:via-orange-600 hover:to-red-700 text-white"
            >
              {item.actionLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}