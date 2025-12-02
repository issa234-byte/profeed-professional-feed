'use client';

import React, { useState, useRef, useEffect } from 'react';
import { feedData } from '@/lib/feed-data';
import FeedItem from '@/components/feed/FeedItem';
import Header from '@/components/feed/Header';
import ScrollNavigation from '@/components/feed/ScrollNavigation';
import { motion } from 'framer-motion';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * containerRef.current.clientHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (activeIndex < feedData.length - 1) {
      scrollTo(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollTo(activeIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <main className="fixed inset-0 overflow-hidden font-sans relative">
      {/* Animated Gen Z Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-cyan-950/20" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      <Header />
      
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide relative"
      >
        {feedData.map((item, index) => (
          <section 
            key={item.id} 
            className="h-screen w-full snap-start snap-always flex items-center justify-center pt-16 pb-4"
          >
            <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4">
              <FeedItem item={item} isActive={index === activeIndex} />
            </div>
          </section>
        ))}
        
        {/* End of feed indicator */}
        {activeIndex === feedData.length - 1 && (
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-3 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              🎉 You've reached the end! More content coming soon ✨
            </p>
          </motion.div>
        )}
      </div>

      <ScrollNavigation 
        currentIndex={activeIndex} 
        totalItems={feedData.length} 
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </main>
  );
}