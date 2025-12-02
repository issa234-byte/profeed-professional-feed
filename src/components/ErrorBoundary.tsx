'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-cyan-950/20">
          <div className="glass rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mb-6 relative">
              <AlertTriangle className="h-10 w-10 text-white" />
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
            </div>
            
            <h1 className="text-3xl font-black mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Don't worry, we're on it! Try refreshing the page or head back home.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 rounded-xl text-left">
                <p className="text-sm font-mono text-red-600 dark:text-red-400 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
              </Button>
              
              <Link href="/">
                <Button
                  variant="outline"
                  className="glass border-white/20 dark:border-white/10 rounded-2xl font-semibold hover:bg-white/50 dark:hover:bg-white/10 w-full sm:w-auto"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
