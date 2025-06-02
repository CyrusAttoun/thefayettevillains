import { Carousel } from '@mantine/carousel';
import { Box, Button, Title, Group } from '@mantine/core';
import posts from '../data/posts';
import PostCard from './PostCard';
import { useEffect, useRef } from 'react';

export default function PostCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  // Simple autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = carouselRef.current?.querySelector('[data-active]')?.parentElement;
      if (!carousel) return;
      const next = carousel.nextElementSibling || carousel.parentElement?.firstElementChild;
      if (next && next instanceof HTMLElement) {
        next.querySelector('button')?.click();
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box my="xl">
      <Group justify="space-between" mb="sm" style={{ alignItems: 'center' }}>
        <Title order={2}>Featured Fayetteville Posts</Title>
        <Button size="xs" variant="light">View All Posts</Button>
      </Group>
      <Carousel
        slideSize="33.3333%"
        slideGap="md"
        withControls
        draggable
        height={340}
        withIndicators={false}
        styles={{
          control: { zIndex: 2 },
        }}
        ref={carouselRef}
      >
        {posts.map((post, idx) => (
          <Carousel.Slide key={post.id}>
            <PostCard post={post} focused={idx === 1} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
