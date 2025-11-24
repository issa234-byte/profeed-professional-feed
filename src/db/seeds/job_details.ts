import { db } from '@/db';
import { jobDetails } from '@/db/schema';

async function main() {
    const sampleJobDetails = [
        {
            postId: 9,
            company: 'FlexiPay Technologies',
            location: 'Nairobi, Kenya (Hybrid)',
            jobType: 'Full-time',
            salaryRange: '$50,000 - $80,000 per year',
            applicationLink: 'https://flexipay.com/careers/senior-engineer',
            requirements: [
                '5+ years of software development experience',
                'Strong knowledge of JavaScript/TypeScript and Node.js',
                'Experience with React and modern frontend frameworks',
                'Familiarity with microservices architecture',
                'Previous fintech experience preferred'
            ],
            benefits: [
                'Competitive salary with equity options',
                'Flexible remote work policy',
                'Health insurance for you and your family',
                'Annual learning budget',
                'Quarterly team retreats'
            ],
            deadline: '2024-02-28T23:59:59Z',
        },
        {
            postId: 10,
            company: 'Green Future Foundation',
            location: 'Accra, Ghana with travel to rural areas',
            jobType: 'Full-time',
            salaryRange: '$35,000 - $45,000 per year',
            applicationLink: 'https://greenfuture.org/jobs/agri-specialist',
            requirements: [
                'Bachelor\'s degree in Agriculture or related field',
                '3+ years experience in sustainable farming',
                'Knowledge of local farming practices in Ghana',
                'Strong community engagement skills',
                'Fluent in English and at least one local language'
            ],
            benefits: [
                'Housing allowance',
                'Transportation provided',
                'Health and life insurance',
                'Professional development opportunities',
                'Impactful work with local communities'
            ],
            deadline: '2024-03-15T23:59:59Z',
        },
        {
            postId: 11,
            company: 'MediCore Health Systems',
            location: 'Cape Town, South Africa',
            jobType: 'Full-time',
            salaryRange: 'R400,000 - R550,000 per year',
            applicationLink: 'https://medicore.co.za/careers/data-analyst',
            requirements: [
                'Bachelor\'s degree in Data Science, Statistics, or related field',
                '2+ years experience in healthcare analytics',
                'Proficiency in SQL, Python, and data visualization tools',
                'Understanding of healthcare data privacy regulations',
                'Strong analytical and problem-solving skills'
            ],
            benefits: [
                'Medical aid and retirement annuity',
                'Annual performance bonus',
                'Flexible working hours',
                'Modern office in Cape Town CBD',
                'Career growth opportunities'
            ],
            deadline: '2024-03-10T23:59:59Z',
        },
        {
            postId: 12,
            company: 'AfriCart E-commerce',
            location: 'Lagos, Nigeria',
            jobType: 'Full-time',
            salaryRange: '₦8,000,000 - ₦12,000,000 per year',
            applicationLink: 'https://africart.ng/careers/marketing-manager',
            requirements: [
                '5+ years of marketing experience, preferably in e-commerce',
                'Proven track record of successful marketing campaigns',
                'Strong digital marketing and social media expertise',
                'Experience managing marketing teams',
                'Excellent communication and leadership skills'
            ],
            benefits: [
                'Competitive salary with performance bonuses',
                'Stock options in growing startup',
                'Health insurance',
                'Flexible work arrangements',
                'Dynamic startup environment'
            ],
            deadline: '2024-02-20T23:59:59Z',
        }
    ];

    await db.insert(jobDetails).values(sampleJobDetails);
    
    console.log('✅ Job details seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});