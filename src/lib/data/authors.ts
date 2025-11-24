import { Author } from '../types';

export const authors: Author[] = [
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
    bio: 'Technology journalist covering African innovation and startup ecosystems. Based in Lagos, Nigeria.',
    title: 'Senior Technology Reporter',
    socialLinks: {
      twitter: 'https://twitter.com/amaraokafor',
      linkedin: 'https://linkedin.com/in/amaraokafor',
    },
    articleCount: 24,
  },
  {
    id: 'kofi-mensah',
    name: 'Kofi Mensah',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi',
    bio: 'Environmental journalist focused on renewable energy and sustainability across Africa.',
    title: 'Environment & Energy Correspondent',
    socialLinks: {
      twitter: 'https://twitter.com/kofimensah',
      website: 'https://kofimensah.com',
    },
    articleCount: 18,
  },
  {
    id: 'zainab-ahmed',
    name: 'Zainab Ahmed',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab',
    bio: 'Education technology specialist exploring how digital tools are transforming learning in Africa.',
    title: 'EdTech Writer',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/zainabahmed',
      website: 'https://zainabwrites.com',
    },
    articleCount: 15,
  },
  {
    id: 'thabo-mbeki',
    name: 'Thabo Mbeki',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thabo',
    bio: 'Business analyst covering African markets, finance, and economic development.',
    title: 'Business & Finance Editor',
    socialLinks: {
      twitter: 'https://twitter.com/thabombeki',
      linkedin: 'https://linkedin.com/in/thabombeki',
    },
    articleCount: 32,
  },
  {
    id: 'fatima-hassan',
    name: 'Fatima Hassan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    bio: 'Healthcare journalist documenting innovations in African healthcare systems.',
    title: 'Health Correspondent',
    socialLinks: {
      twitter: 'https://twitter.com/fatimahassan',
    },
    articleCount: 21,
  },
  {
    id: 'chisom-nwankwo',
    name: 'Chisom Nwankwo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chisom',
    bio: 'Culture and entertainment writer covering African creative industries and arts.',
    title: 'Arts & Culture Reporter',
    socialLinks: {
      twitter: 'https://twitter.com/chisomnwankwo',
      website: 'https://chisomnwankwo.com',
    },
    articleCount: 19,
  },
];

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id);
}

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((author) => author.name === name);
}
