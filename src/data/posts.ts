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
  }
];

export default posts;
