'use client';

import React from 'react';
import { Bell, Search, Menu, User, MapPin, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/mode-toggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-9 w-9 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Tamu Diaries</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center ml-6 space-x-1">
            <Button variant="ghost" className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-orange-600 dark:hover:text-orange-400">All</Button>
            <Button variant="ghost" className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-orange-600 dark:hover:text-orange-400">Jobs</Button>
            <Button variant="ghost" className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-orange-600 dark:hover:text-orange-400">News</Button>
            <Button variant="ghost" className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-orange-600 dark:hover:text-orange-400">Articles</Button>
            <Button variant="ghost" className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-orange-600 dark:hover:text-orange-400">Regions</Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <Input 
              type="search" 
              placeholder="Search jobs, articles..." 
              className="pl-9 bg-zinc-100 dark:bg-zinc-900 border-transparent focus:bg-white dark:focus:bg-zinc-800 transition-all rounded-full h-9"
            />
          </div>
          
          <ModeToggle />
          
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="rounded-full" title="Admin Panel">
              <Settings className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-orange-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
          </Button>
          
          <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-orange-200 dark:hover:ring-orange-900 transition-all">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}