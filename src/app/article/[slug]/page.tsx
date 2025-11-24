import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { getFeedItemBySlug, getMostViewedItems } from '@/lib/feed-data';
import { getAuthorById } from '@/lib/data/authors';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sidebar } from '@/components/layout/Sidebar';
import { InArticleAd } from '@/components/ads/AdSenseAd';
import Header from '@/components/feed/Header';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getFeedItemBySlug(slug);

  if (!article || article.type !== 'article') {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Tamu Diaries`,
    description: article.description,
    keywords: article.tags.join(', '),
    authors: article.metadata.author ? [{ name: article.metadata.author }] : [],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedDate.toISOString(),
      authors: article.metadata.author ? [article.metadata.author] : [],
      tags: article.tags,
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getFeedItemBySlug(slug);

  if (!article || article.type !== 'article') {
    notFound();
  }

  const author = article.metadata.authorId ? getAuthorById(article.metadata.authorId) : null;
  const relatedArticles = getMostViewedItems(3).filter((item) => item.id !== article.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feed
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Article Header */}
              <article className="bg-card rounded-xl shadow-sm border p-8">
                {/* Category Badge */}
                <Link href={`/category/${article.categorySlug}`}>
                  <Badge className="mb-4">{article.category}</Badge>
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {article.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
                  {article.metadata.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.metadata.date}
                    </span>
                  )}
                  {article.metadata.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.metadata.readTime}
                    </span>
                  )}
                  {article.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {article.views.toLocaleString()} views
                    </span>
                  )}
                  {article.region && (
                    <Badge variant="outline">{article.region}</Badge>
                  )}
                </div>

                {/* Author Info */}
                {author && (
                  <Link href={`/author/${author.id}`}>
                    <div className="flex items-center gap-4 mb-8 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{author.name}</p>
                        <p className="text-sm text-muted-foreground">{author.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {author.articleCount} articles
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Featured Image */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {article.description}
                  </p>
                  
                  {article.content && (
                    <div className="mt-8 space-y-4 text-foreground leading-relaxed">
                      {article.content}
                    </div>
                  )}

                  {/* Sample article content */}
                  <p>
                    Africa's technology landscape is experiencing unprecedented growth, driven by a combination of increased internet penetration, mobile phone adoption, and a young, tech-savvy population eager to solve local challenges through innovation.
                  </p>

                  <h2>The Silicon Savannah Phenomenon</h2>
                  <p>
                    Nairobi has earned its nickname "Silicon Savannah" through consistent innovation in mobile money, fintech, and agricultural technology. Companies like M-Pesa have shown the world that Africa can lead in technological innovation, not just adopt it.
                  </p>

                  {/* In-Article Ad */}
                  <InArticleAd />

                  <h2>Lagos: Africa's Tech Giant</h2>
                  <p>
                    Nigeria's commercial capital has become a magnet for venture capital, with startups raising record amounts of funding. The city's tech ecosystem has produced multiple unicorns and continues to attract talent from across the continent.
                  </p>

                  <p>
                    From e-commerce to fintech, logistics to healthtech, Lagos-based companies are tackling Africa's biggest challenges while creating thousands of jobs and demonstrating the continent's economic potential to global investors.
                  </p>

                  <h2>Looking Ahead</h2>
                  <p>
                    As infrastructure improves and more capital flows into African tech, the continent is poised to become a major player in the global technology industry. The next decade promises even more innovation, job creation, and economic growth driven by technology.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t">
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

              {/* Related Articles */}
              <div className="bg-card rounded-xl shadow-sm border p-6">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid gap-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/${related.type}/${related.slug}`}
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
            </div>

            {/* Sidebar */}
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
