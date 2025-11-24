import { db } from '@/db';
import { ads } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date().toISOString();
    
    const sampleAds = [
        {
            title: 'African Tech Summit 2024',
            type: 'banner',
            placement: 'homepage',
            contentHtml: "<div class='ad-banner'><h2>Join Africa's Biggest Tech Event</h2><p>Network with 5000+ innovators | March 15-17, 2024 | Nairobi</p></div>",
            scriptCode: null,
            imageUrl: 'https://example.com/ads/tech-summit-banner.jpg',
            linkUrl: 'https://africantechsummit.com',
            status: 'active',
            priority: 10,
            impressions: 45230,
            clicks: 1234,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            title: 'Pan-African Investment Fund',
            type: 'sidebar',
            placement: 'article',
            contentHtml: "<div class='sidebar-ad'><h3>Invest in Africa's Future</h3><p>Diversified portfolio across 15 African markets. Get started with $1000.</p></div>",
            scriptCode: null,
            imageUrl: 'https://example.com/ads/investment-sidebar.jpg',
            linkUrl: 'https://africaninvest.com',
            status: 'active',
            priority: 8,
            impressions: 32100,
            clicks: 892,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            title: 'E-Learning Platform Spotlight',
            type: 'in-article',
            placement: 'article',
            contentHtml: "<div class='native-ad'><h4>Learn New Skills Online</h4><p>1000+ courses by African educators. Free trial for 30 days.</p></div>",
            scriptCode: null,
            imageUrl: 'https://example.com/ads/elearning-native.jpg',
            linkUrl: 'https://afrilearn.com',
            status: 'active',
            priority: 5,
            impressions: 28450,
            clicks: 756,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            title: 'Post Your Job Opening',
            type: 'banner',
            placement: 'job',
            contentHtml: "<div class='job-banner'><h2>Hire Top African Talent</h2><p>Reach 500,000+ qualified professionals across Africa</p></div>",
            scriptCode: null,
            imageUrl: 'https://example.com/ads/hire-talent-banner.jpg',
            linkUrl: 'https://africantalent.com/employers',
            status: 'active',
            priority: 9,
            impressions: 15670,
            clicks: 432,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
        {
            title: 'Green Energy Solutions',
            type: 'feed',
            placement: 'news',
            contentHtml: "<div class='feed-ad'><h3>Solar Panels for Your Business</h3><p>Reduce energy costs by 60%. Get a free consultation today.</p></div>",
            scriptCode: null,
            imageUrl: 'https://example.com/ads/solar-feed.jpg',
            linkUrl: 'https://africansolar.com',
            status: 'active',
            priority: 6,
            impressions: 19820,
            clicks: 523,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        },
    ];

    await db.insert(ads).values(sampleAds);
    
    console.log('✅ Ads seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});