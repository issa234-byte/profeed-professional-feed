'use client';

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollNavigationProps {
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function ScrollNavigation({ currentIndex, totalItems, onNext, onPrev }: ScrollNavigationProps) {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40">
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-10 w-10 bg-white/80 dark:bg-black/80 backdrop-blur shadow-md hover:bg-white dark:hover:bg-zinc-900"
        onClick={onPrev}
        disabled={currentIndex === 0}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>

      <div className="flex flex-col gap-2 my-2">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <div 
            key={idx}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'h-6 bg-primary' 
                : 'h-1.5 bg-zinc-300 dark:bg-zinc-700'
            }`}
          />
        ))}
      </div>

      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-10 w-10 bg-white/80 dark:bg-black/80 backdrop-blur shadow-md hover:bg-white dark:hover:bg-zinc-900"
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
      >
        <ChevronDown className="h-5 w-5" />
      </Button>
    </div>
  );
}
