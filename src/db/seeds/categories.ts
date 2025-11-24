import { db } from '@/db';
import { categories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'Technology',
            slug: 'technology',
            description: 'Latest tech news, innovations, and digital transformation across Africa',
            icon: '💻',
            color: '#3B82F6',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Business',
            slug: 'business',
            description: 'African business news, startups, entrepreneurship, and economic insights',
            icon: '💼',
            color: '#10B981',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Agriculture',
            slug: 'agriculture',
            description: 'Agricultural innovations, farming techniques, and food security in Africa',
            icon: '🌾',
            color: '#84CC16',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Healthcare',
            slug: 'healthcare',
            description: 'Health news, medical innovations, and wellness across the continent',
            icon: '⚕️',
            color: '#EF4444',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Education',
            slug: 'education',
            description: 'Educational developments, learning innovations, and academic achievements',
            icon: '📚',
            color: '#8B5CF6',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Environment',
            slug: 'environment',
            description: 'Climate change, conservation, and environmental sustainability in Africa',
            icon: '🌍',
            color: '#059669',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Entertainment',
            slug: 'entertainment',
            description: 'Arts, culture, music, and entertainment from across Africa',
            icon: '🎭',
            color: '#F59E0B',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Jobs',
            slug: 'jobs',
            description: 'Job opportunities, career advice, and employment news',
            icon: '💼',
            color: '#6366F1',
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(categories).values(sampleCategories);
    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});