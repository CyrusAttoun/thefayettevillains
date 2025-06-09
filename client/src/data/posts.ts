import { faTag, faPaw, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

const posts = [
  {
    id: 1,
    area: 'Free',
    areaIcon: faTag,
    title: 'Free Piano - Must Pick Up This Weekend',
    description: "Upright piano in good condition. Moving and can't take it with us. You haul!",
    author: 'Sarah M.',
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    upvotes: 12,
    comments: 5,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    location: 'Greenland',
    price: null,
    badge: 'Free'
  },
  {
    id: 2,
    area: 'Lost Pet',
    areaIcon: faPaw,
    title: 'Lost Cat - Orange Tabby Named Mango',
    description: 'Missing since yesterday evening. Very friendly, microchipped. Please call if seen!',
    author: 'Mike R.',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    upvotes: 28,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
    location: 'Prairie Grove',
    price: null,
    badge: 'Lost Pet'
  },
  {
    id: 3,
    area: 'Food',
    areaIcon: faBreadSlice,
    title: 'Homemade Sourdough Bread for Sale',
    description: 'Fresh loaves baked daily. $8 each. Available for pickup or local delivery.',
    author: 'Lisa K.',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    upvotes: 19,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    location: 'Farmington',
    price: '$8',
    badge: 'Food'
  },
  {
    id: 4,
    area: 'Event',
    areaIcon: faTag,
    title: 'Community Yard Sale This Saturday',
    description: 'Multiple families participating. Great deals on clothes, toys, and more! 8am-2pm at Wilson Park.',
    author: 'Neighborhood Assoc.',
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    upvotes: 7,
    comments: 2,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    location: 'Fayetteville',
    price: null,
    badge: 'Event'
  },
  {
    id: 5,
    area: 'Help Wanted',
    areaIcon: faTag,
    title: 'Looking for Lawn Mowing Service',
    description: 'Need someone to mow my yard this week. Please DM with rates and availability.',
    author: 'Tom S.',
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    upvotes: 3,
    comments: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    location: 'Johnson',
    price: null,
    badge: 'Help Wanted'
  },
  {
    id: 6,
    area: 'For Sale',
    areaIcon: faTag,
    title: 'Mountain Bike - Like New',
    description: '2023 Trek Marlin 5, barely used. $450 OBO. Includes helmet and lock.',
    author: 'Emily W.',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    upvotes: 15,
    comments: 4,
    image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=600&q=80',
    location: 'Springdale',
    price: '$450',
    badge: 'For Sale'
  }
];

export default posts;
