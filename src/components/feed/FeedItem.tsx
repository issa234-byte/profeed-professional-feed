'use client';

import React from 'react';
import Image from 'next/image';
import { FeedItemData } from '@/lib/feed-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Newspaper, FileText, Share2, Bookmark, Heart, MessageCircle, MapPin, Sparkles, TrendingUp } from 'lucide-react';
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

  const getTypeGradient = () => {
    switch (item.type) {
      case 'job':
        return 'from-emerald-400 via-teal-400 to-cyan-500';
      case 'article':
        return 'from-purple-400 via-pink-400 to-rose-500';
      case 'news':
        return 'from-orange-400 via-amber-400 to-yellow-500';
    }
  };

  return (
    <motion.div 
      className="h-full w-full flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 50,
        filter: isActive ? 'blur(0px)' : 'blur(4px)'
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="w-full max-w-4xl overflow-hidden border-none h-[86vh] flex flex-col relative group">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10" />
        
        <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient()} opacity-5 rounded-3xl`} />

        {/* Image Section - Enhanced Visibility */}
        <div className="relative h-3/5 w-full overflow-hidden rounded-t-3xl">
          {/* Decorative frame border */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient()} opacity-30 blur-2xl -z-10`} />
          <div className="absolute inset-0 ring-2 ring-white/20 dark:ring-white/10 rounded-t-3xl pointer-events-none z-10" />
          
          <motion.div
            className="absolute inset-0 p-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            {/* Inner frame with better contrast */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                priority={isActive}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              
              {/* Lighter gradient overlays for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient()} opacity-10 mix-blend-overlay`} />
              
              {/* Vignette effect for focus */}
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.3)]" />
            </div>
          </motion.div>
          
          {/* Floating badges with glassmorphism */}
          <motion.div 
            className="absolute top-7 left-7 flex flex-wrap gap-2 z-20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge className={`glass flex gap-1.5 items-center px-4 py-2 border-0 backdrop-blur-xl bg-gradient-to-r ${getTypeGradient()} text-white font-bold shadow-2xl hover:shadow-3xl transition-all`}>
              {getTypeIcon()}
              <span className="text-sm">{getTypeLabel()}</span>
              <Sparkles className="h-3 w-3 ml-1" />
            </Badge>
            {item.region && (
              <Badge className="glass flex gap-1 items-center px-3 py-2 bg-white/30 dark:bg-black/30 text-white border-white/40 dark:border-white/20 backdrop-blur-xl font-semibold shadow-xl">
                <MapPin className="h-3 w-3" />
                {item.region}
              </Badge>
            )}
            {item.featured && (
              <Badge className="glass flex gap-1 items-center px-3 py-2 bg-yellow-400/40 text-yellow-50 border-yellow-400/40 backdrop-blur-xl font-semibold animate-pulse shadow-xl">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
          </motion.div>

          {/* Content overlay - positioned at bottom with glass background */}
          <motion.div 
            className="absolute bottom-3 left-3 right-3 p-6 md:p-8 text-white rounded-2xl glass backdrop-blur-2xl bg-gradient-to-br from-black/70 via-black/60 to-black/70 border border-white/20 shadow-2xl z-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12 border-2 border-white/50 ring-4 ring-white/20 backdrop-blur-sm shadow-lg">
                <AvatarImage src={item.metadata.avatarUrl} />
                <AvatarFallback className={`bg-gradient-to-br ${getTypeGradient()} text-white font-bold text-lg`}>
                  {item.metadata.source?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-sm md:text-base text-white/95">{item.metadata.source}</p>
                <p className="text-xs md:text-sm text-white/80 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse"></span>
                  {item.postedAt} • {item.metadata.secondary}
                </p>
              </div>
            </div>
            <h2 className="text-2xl md:text-4xl font-black leading-tight mb-2 line-clamp-2 drop-shadow-2xl text-white">
              {item.title}
            </h2>
            <p className={`text-xs md:text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${getTypeGradient()} bg-clip-text text-transparent filter drop-shadow-lg`}>
              {item.category}
            </p>
          </motion.div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30" />
        </div>

        {/* Content Section with Glassmorphism */}
        <CardContent className="flex-1 p-6 md:p-8 flex flex-col justify-between glass rounded-b-3xl backdrop-blur-2xl">
          <div>
            <p className="text-foreground/90 text-base md:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 font-medium">
              {item.description}
            </p>
            
            {/* Tags with gradient backgrounds */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag, idx) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  <Badge 
                    className="px-4 py-1.5 text-xs md:text-sm font-semibold bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-blue-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer backdrop-blur-sm"
                  >
                    #{tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action buttons with modern design */}
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-foreground/10">
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all group/btn h-11 w-11"
              >
                <Heart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all group/btn h-11 w-11"
              >
                <MessageCircle className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-2xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-indigo-500/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all group/btn h-11 w-11"
              >
                <Share2 className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-2xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all group/btn h-11 w-11"
              >
                <Bookmark className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </div>
            <Button 
              size="lg" 
              className={`px-8 py-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-base bg-gradient-to-r ${getTypeGradient()} hover:scale-105 border-0 text-white relative overflow-hidden group/cta`}
            >
              <span className="relative z-10">{item.actionLabel}</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity" />
              <Sparkles className="h-4 w-4 ml-2 group-hover/cta:rotate-180 transition-transform duration-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}