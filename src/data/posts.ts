import { AppShell, Container } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTag, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';

// Dummy post data for carousel
const posts = [
  {
    id: 1,
    area: 'Art',
    areaIcon: faPalette,
    title: 'Local Art Show',
    description: 'Come see the best local artists!',
    author: 'Jane Doe',
    date: '2025-06-01',
    upvotes: 12,
    comments: 3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
  {
    id: 2,
    area: 'Rummage',
    areaIcon: faTag,
    title: 'Neighborhood Yard Sale',
    description: 'Lots of great finds!',
    author: 'John Smith',
    date: '2025-05-30',
    upvotes: 8,
    comments: 1,
    image: '',
    price: '$10',
  },
  {
    id: 3,
    area: 'Real Estate',
    areaIcon: faHome,
    title: '2BR Apartment for Rent',
    description: 'Downtown, pet friendly.',
    author: 'Alex Lee',
    date: '2025-05-28',
    upvotes: 5,
    comments: 0,
    image: 'https://images.unsplash.com/photo-1560185127-6a8c1f1b8c8e',
    price: '$1200/mo',
  },
  {
    id: 4,
    area: 'Art',
    areaIcon: faPalette,
    title: 'Art Class for Kids',
    description: 'Saturdays at the community center.',
    author: 'Sam Green',
    date: '2025-05-25',
    upvotes: 3,
    comments: 2,
    image: '',
  },
];

export default posts;
