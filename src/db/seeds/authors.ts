import { db } from '@/db';
import { authors } from '@/db/schema';

async function main() {
    const sampleAuthors = [
        {
            name: 'Amara Okafor',
            slug: 'amara-okafor',
            bio: 'Technology journalist covering innovation and startups across West Africa. 10+ years of experience in tech reporting.',
            avatar: '/avatars/amara.jpg',
            role: 'Tech Editor',
            twitter: '@amaraokafor',
            linkedin: 'amara-okafor',
            website: 'https://amaraokafor.com',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Kwame Mensah',
            slug: 'kwame-mensah',
            bio: 'Business and economics reporter focusing on African markets and entrepreneurship.',
            avatar: '/avatars/kwame.jpg',
            role: 'Business Reporter',
            twitter: '@kwamemensah',
            linkedin: 'kwame-mensah',
            website: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Zainab Hassan',
            slug: 'zainab-hassan',
            bio: 'Health and science correspondent passionate about medical innovations and public health in East Africa.',
            avatar: '/avatars/zainab.jpg',
            role: 'Health Correspondent',
            twitter: '@zainabhassan',
            linkedin: 'zainab-hassan',
            website: 'https://zainabwrites.com',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Thandiwe Ndlovu',
            slug: 'thandiwe-ndlovu',
            bio: 'Environmental journalist covering climate change, conservation, and sustainability across Southern Africa.',
            avatar: '/avatars/thandiwe.jpg',
            role: 'Environment Editor',
            twitter: '@thandiwendlovu',
            linkedin: 'thandiwe-ndlovu',
            website: null,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Mohamed Ali',
            slug: 'mohamed-ali',
            bio: 'Agriculture and rural development specialist reporting on food security and farming innovations.',
            avatar: '/avatars/mohamed.jpg',
            role: 'Agriculture Reporter',
            twitter: '@mohamedali',
            linkedin: 'mohamed-ali',
            website: 'https://agroafrica.blog',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Chioma Eze',
            slug: 'chioma-eze',
            bio: 'Entertainment and culture writer celebrating African arts, music, and creative industries.',
            avatar: '/avatars/chioma.jpg',
            role: 'Culture Editor',
            twitter: '@chiomaeze',
            linkedin: 'chioma-eze',
            website: 'https://afroculture.net',
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(authors).values(sampleAuthors);
    
    console.log('✅ Authors seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});