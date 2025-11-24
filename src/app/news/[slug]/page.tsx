import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, Share2, Bookmark, ArrowLeft, ExternalLink } from 'lucide-react';
import { getFeedItemBySlug, getMostViewedItems } from '@/lib/feed-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { InArticleAd } from '@/components/ads/AdSenseAd';
import Header from '@/components/feed/Header';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = getFeedItemBySlug(slug);

  if (!news || news.type !== 'news') {
    return {
      title: 'News Not Found',
    };
  }

  return {
    title: `${news.title} | Tamu Diaries News`,
    description: news.description,
    keywords: news.tags.join(', '),
    openGraph: {
      title: news.title,
      description: news.description,
      type: 'article',
      publishedTime: news.publishedDate.toISOString(),
      tags: news.tags,
      images: [
        {
          url: news.imageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = getFeedItemBySlug(slug);

  if (!news || news.type !== 'news') {
    notFound();
  }

  const relatedNews = getMostViewedItems(3).filter(
    (item) => item.type === 'news' && item.id !== news.id
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feed
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* News Header */}
              <article className="bg-card rounded-xl shadow-sm border p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-red-500 hover:bg-red-600">Breaking News</Badge>
                  <Badge>{news.category}</Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {news.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {news.metadata.date}
                  </span>
                  <span className="font-medium">{news.metadata.source}</span>
                  {news.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {news.views.toLocaleString()} views
                    </span>
                  )}
                  {news.region && (
                    <Badge variant="outline">{news.region}</Badge>
                  )}
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* News Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <p className="text-xl text-muted-foreground leading-relaxed font-semibold">
                    {news.description}
                  </p>

                  <p>
                    The African Continental Free Trade Area (AfCFTA) continues to demonstrate its potential as a game-changer for intra-African trade, with the latest quarterly report showing a significant milestone of over $2 billion in recorded trade transactions.
                  </p>

                  <p>
                    This achievement marks a substantial step forward in the continent's economic integration efforts, as member states increasingly leverage the free trade agreement to expand market access and reduce trade barriers across borders.
                  </p>

                  <h2>Economic Impact</h2>
                  <p>
                    Economists across the continent have welcomed the news, noting that the growth trajectory suggests strong confidence in the AfCFTA framework. The agreement, which came into force in 2021, aims to create a single market for goods and services across 54 African countries.
                  </p>

                  {/* In-Article Ad */}
                  <InArticleAd />

                  <p>
                    Trade experts predict that as implementation deepens and more countries ratify the agreement, intra-African trade could increase exponentially, potentially reaching unprecedented levels within the next five years.
                  </p>

                  <h2>Business Response</h2>
                  <p>
                    Businesses across various sectors have begun adapting their strategies to take advantage of the expanded market opportunities. Manufacturing, agriculture, and services sectors are particularly positioned to benefit from reduced tariffs and streamlined customs procedures.
                  </p>

                  <p>
                    Industry leaders emphasize that the successful implementation of AfCFTA will require continued collaboration between governments, private sector players, and regional economic communities to address remaining challenges and capitalize on emerging opportunities.
                  </p>

                  <h2>Looking Forward</h2>
                  <p>
                    As the AfCFTA enters its next phase, focus shifts to deepening implementation, addressing non-tariff barriers, and ensuring that small and medium enterprises can participate effectively in the expanded market.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {news.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Source Link */}
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Original source:</p>
                  <Button variant="link" className="p-0 h-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {news.metadata.source}
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <Button variant="outline" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </article>

              {/* Related News */}
              {relatedNews.length > 0 && (
                <div className="bg-card rounded-xl shadow-sm border p-6">
                  <h3 className="text-2xl font-bold mb-6">Related News</h3>
                  <div className="grid gap-6">
                    {relatedNews.map((related) => (
                      <Link
                        key={related.id}
                        href={`/news/${related.slug}`}
                        className="flex gap-4 group"
                      >
                        <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={related.imageUrl}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {related.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {related.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
