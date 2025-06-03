import { Group, Button, Avatar, Menu, Text, Box, Container, rem } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faList, faPlus, faMapMarkerAlt, faBars } from '@fortawesome/free-solid-svg-icons';

const AREAS = [
  { name: 'Home', path: '/' },
  { name: 'Art', path: '/art' },
  { name: 'Rummage Sales', path: '/rummage' },
  { name: 'Real Estate', path: '/real-estate' },
  { name: 'Community', path: '/posts' },
  { name: 'Restaurants', path: '/restaurants' },
  { name: 'Marketplace', path: '/marketplace' },
];

const user = {
  name: 'Jane Doe',
  initials: 'JD',
  loggedIn: false,
};

export default function TopBar() {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);
  const [selectedArea, setSelectedArea] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box component="header" style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(6px)',      
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: 'var(--font-family-sans)'
    }}>
      <Container size="lg" px="md" style={{ maxWidth: 1200 }}>
        <Group justify="space-between" align="center" wrap="nowrap" style={{ height: 64 }}>
          {/* Logo and subtitle */}
          <Box component="a" href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            {/* Villain/criminal SVG icon */}
            <svg
              width={32}
              height={32}
              viewBox="0 0 64 64"
              style={{ display: 'block', marginRight: 4 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="30" fill="var(--color-secondary)" stroke="#fff" strokeWidth="2"/>
              <ellipse cx="32" cy="38" rx="20" ry="10" fill="var(--color-accent)" stroke="#fff" strokeWidth="2"/>
              <ellipse cx="22" cy="38" rx="5" ry="3" fill="#fff"/>
              <ellipse cx="42" cy="38" rx="5" ry="3" fill="#fff"/>
              <ellipse cx="22" cy="38" rx="2" ry="1" fill="var(--color-secondary)"/>
              <ellipse cx="42" cy="38" rx="2" ry="1" fill="var(--color-secondary)"/>
              <rect x="18" y="30" width="28" height="8" rx="4" fill="none" stroke="#fff" strokeWidth="2"/>
              <path d="M18 34 Q32 44 46 34" fill="none" stroke="#fff" strokeWidth="2"/>
            </svg>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: rem(20), fontWeight: 700, color: 'var(--color-text)', transition: 'color 0.2s', fontFamily: 'var(--font-family-heading)' }}>TheFayettevillains</span>
              <span style={{ fontSize: rem(12), color: 'var(--color-text-secondary)' }}>Fayetteville, AR Community</span>
            </Box>
          </Box>
          {/* Desktop nav and actions in one group */}
          <Group gap={4} visibleFrom="md" wrap="nowrap" style={{ flex: 1, justifyContent: 'center' }}>
            {AREAS.map(area => (
              <Button
                key={area.name}
                variant={selectedArea === area.name ? 'light' : 'subtle'}
                color={selectedArea === area.name ? 'green' : 'gray'}
                size="sm"
                px={14}
                radius="md"
                fw={selectedArea === area.name ? 700 : 500}
                style={{
                  background: selectedArea === area.name ? 'var(--color-primary-light)' : undefined,
                  color: selectedArea === area.name ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontWeight: selectedArea === area.name ? 700 : 500,
                  transition: 'background 0.2s, color 0.2s',
                  fontFamily: 'var(--font-family-sans)'
                }}
                onClick={() => { setSelectedArea(area.name); navigate(area.path); }}
              >
                {area.name}
              </Button>
            ))}
            {/* Desktop actions inline with nav */}
            <Button
              leftSection={<FontAwesomeIcon icon={faPlus} />}
              variant="filled"
              color="green"
              size="md"
              style={{ background: 'var(--color-primary)', height: 40, padding: '0 1.5rem', marginRight: 8, fontFamily: 'var(--font-family-sans)' }}
              onClick={() => {}}
            >
              Post Something
            </Button>
            {!user.loggedIn && (
              <Button
                variant="outline"
                color="green"
                size="md"
                style={{ borderColor: 'var(--color-primary-light)', color: 'var(--color-primary)', background: 'var(--color-background)', height: 40, padding: '0 1.5rem', marginLeft: 0, marginRight: 8, fontFamily: 'var(--font-family-sans)' }}
                onClick={() => {}}
              >
                Sign In
              </Button>
            )}
            {user.loggedIn && (
              <Menu
                opened={menuOpened}
                onOpen={() => setMenuOpened(true)}
                onClose={() => setMenuOpened(false)}
                position="bottom-end"
                withArrow
                trigger="hover"
                transitionProps={{ transition: 'pop', duration: 150 }}
              >
                <Menu.Target>
                  <Avatar
                    color="green"
                    radius="xl"
                    style={{ cursor: 'pointer', marginLeft: 16 }}
                    onClick={() => setMenuOpened((o) => !o)}
                  >
                    {user.initials}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<FontAwesomeIcon icon={faCog} />}>Settings</Menu.Item>
                  <Menu.Item leftSection={<FontAwesomeIcon icon={faList} />}>My Posts</Menu.Item>
                  <Menu.Item leftSection={<FontAwesomeIcon icon={faSignOutAlt} />}>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
          {/* Mobile menu button */}
          <Button variant="subtle" color="gray" size="md" hiddenFrom="md" px={8} style={{ minWidth: 40 }} onClick={() => setMobileMenuOpen((o) => !o)}>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: rem(24) }} />
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
