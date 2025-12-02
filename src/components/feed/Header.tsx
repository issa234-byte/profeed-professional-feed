'use client';

import React, { useState } from 'react';
import { Bell, Search, Menu, User, MapPin, Settings, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/mode-toggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 glass border-b border-white/20 dark:border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden rounded-2xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20">
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
            <motion.div 
              className="h-10 w-10 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <MapPin className="h-5 w-5 relative z-10" />
              <div className="absolute inset-0 shimmer opacity-50" />
            </motion.div>
            <div className="hidden md:block">
              <span className="gradient-text text-2xl font-black">Tamu Diaries</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center ml-6 space-x-1">
            <Button variant="ghost" className="rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
              All
            </Button>
            <Button variant="ghost" className="rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
              Jobs
            </Button>
            <Button variant="ghost" className="rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-amber-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-all">
              News
            </Button>
            <Button variant="ghost" className="rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-rose-500/10 hover:text-pink-600 dark:hover:text-pink-400 transition-all">
              Articles
            </Button>
            <Button variant="ghost" className="rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              Regions
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-64 hidden sm:block">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search awesome content..." 
                    className="pl-10 glass border-white/20 dark:border-white/10 rounded-2xl h-10 focus:ring-2 focus:ring-purple-500/50"
                    autoFocus
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-2xl"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-2xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </AnimatePresence>
          
          <ModeToggle />
          
          <Link href="/admin">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 relative group" title="Admin Panel">
                <Settings className="h-5 w-5" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </motion.div>
          </Link>
          
          <Button variant="ghost" size="icon" className="relative rounded-2xl hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-amber-500/20 transition-all group">
            <Bell className="h-5 w-5" />
            <motion.span 
              className="absolute top-2 right-2 h-2 w-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-2 border-white dark:border-zinc-950"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-purple-500/50 transition-all">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}