import posts from '../data/posts';
import PostCard from "./PostCard";
import { useEffect, useRef, useState } from 'react';

export default function PostCarousel() {
  const [current, setCurrent] = useState(0);
  const visibleSlides = 3;
  const total = posts.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total]);

  const goTo = (idx: number) => setCurrent(idx);

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: 24, fontWeight: 600 }}>Featured Fayetteville Posts</span>
        <button style={{ fontSize: 14, background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>View All Posts</button>
      </div>
      <div style={{ display: 'flex', gap: 16, overflow: 'hidden', position: 'relative', height: 340 }}>
        {posts.slice(current, current + visibleSlides).concat(
          current + visibleSlides > total ? posts.slice(0, (current + visibleSlides) % total) : []
        ).map((post, idx) => (
          <div key={post.id} style={{ flex: '0 0 33.33%' }}>
            <PostCard post={post} focused={idx === 1} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: idx === current ? 'var(--color-primary)' : '#e5e7eb',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
