'use client';

import React from 'react';
import { ChevronUp, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ScrollNavigationProps {
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function ScrollNavigation({ currentIndex, totalItems, onNext, onPrev }: ScrollNavigationProps) {
  return (
    <motion.div 
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-2xl h-12 w-12 glass border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <ChevronUp className="h-6 w-6 relative z-10 group-hover:-translate-y-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </motion.div>

      <div className="flex flex-col gap-3 my-2 relative">
        {/* Animated background track */}
        <div className="absolute inset-0 -left-1 -right-1 bg-gradient-to-b from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-full blur-sm" />
        
        {Array.from({ length: totalItems }).map((_, idx) => (
          <motion.div
            key={idx}
            className="relative z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 * idx, duration: 0.3 }}
          >
            <motion.div 
              className={`rounded-full transition-all duration-300 relative overflow-hidden ${
                idx === currentIndex 
                  ? 'h-10 w-2 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 shadow-lg' 
                  : 'h-2 w-2 bg-foreground/20 hover:bg-foreground/40'
              }`}
              animate={idx === currentIndex ? {
                boxShadow: [
                  '0 0 10px rgba(168, 85, 247, 0.4)',
                  '0 0 20px rgba(236, 72, 153, 0.4)',
                  '0 0 10px rgba(168, 85, 247, 0.4)',
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {idx === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ y: '100%' }}
                  animate={{ y: '-100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.div>
            
            {/* Active indicator with sparkle */}
            {idx === currentIndex && (
              <motion.div
                className="absolute -right-4 top-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-2xl h-12 w-12 glass border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
          onClick={onNext}
          disabled={currentIndex === totalItems - 1}
        >
          <ChevronDown className="h-6 w-6 relative z-10 group-hover:translate-y-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </motion.div>

      {/* Progress indicator */}
      <div className="mt-2 glass rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-xl">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {currentIndex + 1}/{totalItems}
        </span>
      </div>
    </motion.div>
  );
}