import { Box, Text, Group, Anchor, Container, Divider, Stack } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <Box component="footer" bg="#18181b" c="white" pt={48} pb={24} mt="xl">
      <Container size="lg" px="md" style={{ maxWidth: 1200 }}>
        <Group align="flex-start" gap={48} wrap="wrap" style={{ justifyContent: 'space-between' }}>
          {/* Left: Logo, subtitle, and description */}
          <Box style={{ flex: 2, minWidth: 260 }}>
            <Group align="center" gap={12} mb={12}>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#4ade80" size="2x" />
              <Box>
                <Text fw={700} size="xl">TheFayettevillains</Text>
                <Text size="sm" c="#a3a3a3">Your Fayetteville Community Hub</Text>
              </Box>
            </Group>
            <Text c="#d1d5db" size="sm" style={{ maxWidth: 340 }}>
              Connecting neighbors, supporting local businesses, and building a stronger Fayetteville community through shared experiences and trusted interactions.
            </Text>
          </Box>
          {/* Community Links */}
          <Box style={{ minWidth: 160 }}>
            <Text fw={600} mb={12}>Community</Text>
            <Stack gap={4}>
              <FooterLink href="/art">Local Art</FooterLink>
              <FooterLink href="/rummage">Rummage Sales</FooterLink>
              <FooterLink href="/restaurants">Restaurants</FooterLink>
              <FooterLink href="/posts">Community Posts</FooterLink>
            </Stack>
          </Box>
          {/* Services Links */}
          <Box style={{ minWidth: 160 }}>
            <Text fw={600} mb={12}>Services</Text>
            <Stack gap={4}>
              <FooterLink href="/real-estate">Real Estate</FooterLink>
              <FooterLink href="/marketplace">Marketplace</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Community Guidelines</FooterLink>
            </Stack>
          </Box>
        </Group>
        <Divider my={32} color="#27272a" />
        <Group justify="space-between" align="center" wrap="wrap">
          <Text c="#a3a3a3" size="sm">
            © 2024 TheFayettevillains. Made with{' '}
            <FontAwesomeIcon icon={faHeart} color="#f87171" style={{ verticalAlign: 'middle' }} />{' '}
            for Fayetteville, AR
          </Text>
          <Text c="#a3a3a3" size="sm" style={{ marginTop: 8 }}>
            Privacy-focused • AI-moderated • Community-driven
          </Text>
        </Group>
      </Container>
    </Box>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Anchor
      href={href}
      c="#d1d5db"
      size="sm"
      style={{ textDecoration: 'none', transition: 'color 0.2s' }}
      onMouseOver={e => (e.currentTarget.style.color = '#4ade80')}
      onMouseOut={e => (e.currentTarget.style.color = '#d1d5db')}
    >
      {children}
    </Anchor>
  );
}
