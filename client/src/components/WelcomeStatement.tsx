import { useState, useEffect } from 'react';

export default function WelcomeStatement() {
  const [tagline, setTagline] = useState('Welcome to The Fayettevillains');

  useEffect(() => {
    const fetchTagline = async () => {
      try {
        const response = await fetch('http://localhost:8000/tagline');
        if (response.ok) {
          const data = await response.json();
          setTagline(data.text);
        }
      } catch (error) {
        console.error('Failed to fetch tagline:', error);
        // Keep default tagline on error
      }
    };

    fetchTagline();
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <h1>Welcome to The Fayettevillains</h1>
      <span style={{ fontSize: '1.2rem', color: '#6b7280', display: 'block', marginBottom: 8 }}>{tagline}</span>
    </div>
  );
}
