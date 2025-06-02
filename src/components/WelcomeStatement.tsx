import { useMemo } from 'react';
import { Text } from '@mantine/core';

const TAGLINES = [
  'Where the hills are steep, the vibes are deep, and the rent makes you weep ',
  "Where every street is a cul-de-sac so we stumble drunkenly by greenway",
  "A little bit country, a little bit rock n' roll",
  'A little piece of Texas right here in Arkansas',
  "It's trashy, but it's our trash",
  "A place where a bunch of poor people live in homes they can't afford",
  "At least it's not Bentonville",
  "At least it's not Oklahoma",
  "Lately we kinda wish we were Springdale",
  "The Subject Matter Experts on futile protests",
  "An airbnb community owned by Texans"
];

export default function WelcomeStatement() {
  const tagline = useMemo(() => {
    const idx = Math.floor(Math.random() * TAGLINES.length);
    return TAGLINES[idx];
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <h1>Welcome to The Fayettevillains</h1>
      <Text size="lg" c="dimmed" mb={8}>{tagline}</Text>      
    </div>
  );
}
