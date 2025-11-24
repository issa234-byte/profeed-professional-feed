import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, DollarSign, Briefcase, Eye, Share2, Bookmark, ArrowLeft, ExternalLink } from 'lucide-react';
import { getFeedItemBySlug, getMostViewedItems } from '@/lib/feed-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { InArticleAd } from '@/components/ads/AdSenseAd';
import Header from '@/components/feed/Header';

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getFeedItemBySlug(slug);

  if (!job || job.type !== 'job') {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} | Tamu Diaries Jobs`,
    description: job.description,
    keywords: [...job.tags, job.metadata.location, 'jobs in Africa', 'African jobs'].join(', '),
    openGraph: {
      title: job.title,
      description: job.description,
      type: 'website',
      images: [
        {
          url: job.imageUrl,
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getFeedItemBySlug(slug);

  if (!job || job.type !== 'job') {
    notFound();
  }

  const relatedJobs = getMostViewedItems(3).filter(
    (item) => item.type === 'job' && item.id !== job.id
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
              {/* Job Header */}
              <div className="bg-card rounded-xl shadow-sm border p-8">
                <Badge className="mb-4">{job.category}</Badge>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {job.title}
                </h1>

                {/* Company Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {job.metadata.avatarUrl ? (
                      <Image
                        src={job.metadata.avatarUrl}
                        alt={job.metadata.source || ''}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{job.metadata.source}</h3>
                    <p className="text-sm text-muted-foreground">{job.metadata.secondary}</p>
                  </div>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {job.metadata.location && (
                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Location</p>
                        <p className="text-sm text-muted-foreground">{job.metadata.location}</p>
                      </div>
                    </div>
                  )}
                  {job.metadata.jobType && (
                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Job Type</p>
                        <p className="text-sm text-muted-foreground">{job.metadata.jobType}</p>
                      </div>
                    </div>
                  )}
                  {job.metadata.salary && (
                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Salary</p>
                        <p className="text-sm text-muted-foreground">{job.metadata.salary}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
                  <Image
                    src={job.imageUrl}
                    alt={job.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Job Description */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <h2>About the Role</h2>
                  <p>{job.description}</p>

                  <h2>Key Responsibilities</h2>
                  <ul>
                    <li>Design and implement scalable backend systems</li>
                    <li>Collaborate with cross-functional teams to deliver high-quality products</li>
                    <li>Mentor junior engineers and contribute to technical decisions</li>
                    <li>Optimize application performance and ensure system reliability</li>
                  </ul>

                  {/* In-Article Ad */}
                  <InArticleAd />

                  <h2>Requirements</h2>
                  <ul>
                    <li>5+ years of experience in software engineering</li>
                    <li>Strong proficiency in backend technologies (Node.js, Python, or Java)</li>
                    <li>Experience with cloud platforms (AWS, GCP, or Azure)</li>
                    <li>Excellent problem-solving and communication skills</li>
                    <li>Bachelor's degree in Computer Science or related field</li>
                  </ul>

                  <h2>Benefits</h2>
                  <ul>
                    <li>Competitive salary and equity package</li>
                    <li>Health insurance and wellness programs</li>
                    <li>Professional development opportunities</li>
                    <li>Flexible work arrangements</li>
                    <li>Dynamic and inclusive work environment</li>
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <Button className="flex-1" size="lg">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline" size="lg">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Job
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div className="bg-card rounded-xl shadow-sm border p-6">
                  <h3 className="text-2xl font-bold mb-6">Similar Jobs</h3>
                  <div className="grid gap-6">
                    {relatedJobs.map((related) => (
                      <Link
                        key={related.id}
                        href={`/job/${related.slug}`}
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
                          <p className="text-sm text-muted-foreground mb-1">
                            {related.metadata.source}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {related.metadata.location}
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
