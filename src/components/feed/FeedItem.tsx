'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FeedItemData } from '@/lib/feed-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Newspaper, FileText, Share2, Bookmark, Heart, MessageCircle, MapPin, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

interface FeedItemProps {
  item: FeedItemData;
  isActive: boolean;
}

export default function FeedItem({ item, isActive }: FeedItemProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  // Mock multiple images for demo (in production, item would have multiple images)
  const images = [item.imageUrl, item.imageUrl, item.imageUrl];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else if (info.offset.x < -threshold && imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

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
      className="h-full w-full flex items-center justify-center p-2 sm:p-4 md:p-6"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 50,
        filter: isActive ? 'blur(0px)' : 'blur(4px)'
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="w-full max-w-4xl overflow-hidden border-none h-[90vh] sm:h-[86vh] flex flex-col relative group">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10" />
        
        <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient()} opacity-5 rounded-3xl`} />

        {/* Image Section - Enhanced for Mobile with Sliding */}
        <div className="relative h-[70%] sm:h-[65%] md:h-3/5 w-full overflow-hidden rounded-t-3xl">
          {/* Decorative frame border */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient()} opacity-30 blur-2xl -z-10`} />
          <div className="absolute inset-0 ring-2 ring-white/20 dark:ring-white/10 rounded-t-3xl pointer-events-none z-10" />
          
          {/* Swipeable Image Container */}
          <motion.div
            className="absolute inset-0 p-1 sm:p-2 md:p-3"
            style={{ x, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: 'grabbing' }}
          >
            {/* Inner frame with better contrast - LARGER on mobile */}
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
              <Image
                src={images[imageIndex]}
                alt={item.title}
                fill
                className="object-cover"
                priority={isActive}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              
              {/* Ultra-light overlays for maximum image visibility on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:from-black/80 md:via-black/20" />
              <div className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient()} opacity-5 mix-blend-overlay`} />
            </div>
          </motion.div>

          {/* Slide Navigation Arrows - Mobile Friendly */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => imageIndex > 0 && setImageIndex(imageIndex - 1)}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 glass rounded-full p-2 sm:p-3 backdrop-blur-xl transition-all ${
                  imageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100 hover:scale-110'
                }`}
                disabled={imageIndex === 0}
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>
              <button
                onClick={() => imageIndex < images.length - 1 && setImageIndex(imageIndex + 1)}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 glass rounded-full p-2 sm:p-3 backdrop-blur-xl transition-all ${
                  imageIndex === images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100 hover:scale-110'
                }`}
                disabled={imageIndex === images.length - 1}
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`rounded-full transition-all ${
                      idx === imageIndex 
                        ? `w-6 h-2 bg-gradient-to-r ${getTypeGradient()}` 
                        : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Floating badges - Compact on mobile */}
          <motion.div 
            className="absolute top-3 sm:top-5 md:top-7 left-3 sm:left-5 md:left-7 flex flex-wrap gap-1.5 sm:gap-2 z-20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge className={`glass flex gap-1 sm:gap-1.5 items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border-0 backdrop-blur-xl bg-gradient-to-r ${getTypeGradient()} text-white font-bold shadow-2xl text-xs sm:text-sm`}>
              {getTypeIcon()}
              <span>{getTypeLabel()}</span>
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-0.5 sm:ml-1" />
            </Badge>
            {item.region && (
              <Badge className="glass flex gap-1 items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-white/30 dark:bg-black/30 text-white border-white/40 dark:border-white/20 backdrop-blur-xl font-semibold shadow-xl text-xs sm:text-sm">
                <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                {item.region}
              </Badge>
            )}
            {item.featured && (
              <Badge className="glass hidden sm:flex gap-1 items-center px-3 py-2 bg-yellow-400/40 text-yellow-50 border-yellow-400/40 backdrop-blur-xl font-semibold animate-pulse shadow-xl text-xs sm:text-sm">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
          </motion.div>

          {/* Content overlay - Minimal on mobile, positioned at bottom */}
          <motion.div 
            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 p-3 sm:p-4 md:p-6 lg:p-8 text-white rounded-xl sm:rounded-2xl glass backdrop-blur-2xl bg-gradient-to-br from-black/60 via-black/50 to-black/60 sm:from-black/70 sm:via-black/60 sm:to-black/70 border border-white/20 shadow-2xl z-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 border-white/50 ring-2 sm:ring-4 ring-white/20 backdrop-blur-sm shadow-lg">
                <AvatarImage src={item.metadata.avatarUrl} />
                <AvatarFallback className={`bg-gradient-to-br ${getTypeGradient()} text-white font-bold text-sm sm:text-base md:text-lg`}>
                  {item.metadata.source?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-xs sm:text-sm md:text-base text-white/95">{item.metadata.source}</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-white/80 flex items-center gap-1 sm:gap-2">
                  <span className="inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse"></span>
                  {item.postedAt} • {item.metadata.secondary}
                </p>
              </div>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl font-black leading-tight mb-1 sm:mb-2 line-clamp-2 drop-shadow-2xl text-white">
              {item.title}
            </h2>
            <p className={`text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${getTypeGradient()} bg-clip-text text-transparent filter drop-shadow-lg`}>
              {item.category}
            </p>
          </motion.div>

          {/* Swipe Hint - Mobile Only */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-20 sm:bottom-24 right-4 flex items-center gap-2 glass px-3 py-2 rounded-full backdrop-blur-xl sm:hidden z-20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span className="text-white text-xs font-semibold">Swipe</span>
              <ChevronRight className="h-3 w-3 text-white animate-pulse" />
            </motion.div>
          )}

          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30" />
        </div>

        {/* Content Section - Compact on mobile */}
        <CardContent className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-between glass rounded-b-3xl backdrop-blur-2xl overflow-y-auto">
          <div>
            <p className="text-foreground/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 sm:mb-4 md:mb-6 font-medium">
              {item.description}
            </p>
            
            {/* Tags with gradient backgrounds - Scrollable on mobile */}
            <div className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6 overflow-x-auto scrollbar-hide pb-2">
              {item.tags.map((tag, idx) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  <Badge 
                    className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-semibold bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-blue-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap"
                  >
                    #{tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action buttons - Mobile optimized */}
          <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-foreground/10">
            <div className="flex gap-0.5 sm:gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all group/btn h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all group/btn h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-indigo-500/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all group/btn h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all group/btn h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"
              >
                <Bookmark className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </div>
            <Button 
              size="lg" 
              className={`px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 rounded-xl sm:rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-xs sm:text-sm md:text-base bg-gradient-to-r ${getTypeGradient()} hover:scale-105 border-0 text-white relative overflow-hidden group/cta`}
            >
              <span className="relative z-10">{item.actionLabel}</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity" />
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 group-hover/cta:rotate-180 transition-transform duration-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}