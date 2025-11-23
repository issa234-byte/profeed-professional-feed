'use client';

import React, { useState, useRef, useEffect } from 'react';
import { feedData } from '@/lib/feed-data';
import FeedItem from '@/components/feed/FeedItem';
import Header from '@/components/feed/Header';
import ScrollNavigation from '@/components/feed/ScrollNavigation';

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
    <main className="fixed inset-0 overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      <Header />
      
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
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