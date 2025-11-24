'use client';

import React, { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className = '',
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

// Placeholder component for development (shows where ads will appear)
export const AdPlaceholder: React.FC<{
  label: string;
  className?: string;
  height?: string;
}> = ({ label, className = '', height = '250px' }) => {
  return (
    <div
      className={`flex items-center justify-center bg-muted border-2 border-dashed border-border rounded-lg ${className}`}
      style={{ height, minHeight: height }}
    >
      <div className="text-center p-4">
        <div className="text-sm font-medium text-muted-foreground mb-1">
          {label}
        </div>
        <div className="text-xs text-muted-foreground/60">
          Ad Placeholder
        </div>
      </div>
    </div>
  );
};

// Homepage banner ad (728x90 or responsive)
export const HomepageBannerAd = () => {
  if (process.env.NODE_ENV === 'development') {
    return <AdPlaceholder label="Homepage Banner Ad" height="90px" />;
  }
  return <AdSenseAd adSlot="1234567890" adFormat="horizontal" />;
};

// Sidebar ad (300x250)
export const SidebarAd = () => {
  if (process.env.NODE_ENV === 'development') {
    return <AdPlaceholder label="Sidebar Ad (300x250)" height="250px" />;
  }
  return <AdSenseAd adSlot="0987654321" adFormat="rectangle" />;
};

// In-article ad (responsive)
export const InArticleAd = () => {
  if (process.env.NODE_ENV === 'development') {
    return <AdPlaceholder label="In-Article Ad" height="280px" className="my-8" />;
  }
  return (
    <div className="my-8">
      <AdSenseAd adSlot="1122334455" adFormat="fluid" />
    </div>
  );
};

// Feed ad (appears between feed items)
export const FeedAd = () => {
  if (process.env.NODE_ENV === 'development') {
    return <AdPlaceholder label="Feed Ad" height="200px" className="my-4" />;
  }
  return (
    <div className="my-4">
      <AdSenseAd adSlot="5544332211" adFormat="auto" />
    </div>
  );
};
