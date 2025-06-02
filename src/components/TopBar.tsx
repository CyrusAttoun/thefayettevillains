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
      borderBottom: '1px solid #bbf7d0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <Container size="lg" px="md" style={{ maxWidth: 1200 }}>
        <Group justify="space-between" align="center" style={{ height: 64 }}>
          {/* Logo and subtitle */}
          <Box component="a" href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#16a34a', fontSize: rem(32), transition: 'color 0.2s' }} />
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: rem(20), fontWeight: 700, color: '#111827', transition: 'color 0.2s' }}>TheFayettevillains</span>
              <span style={{ fontSize: rem(12), color: '#6b7280' }}>Fayetteville, AR Community</span>
            </Box>
          </Box>
          {/* Desktop nav and actions in one group */}
          <Group gap={4} visibleFrom="md" style={{ flex: 1, justifyContent: 'center' }}>
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
                  background: selectedArea === area.name ? '#bbf7d0' : undefined,
                  color: selectedArea === area.name ? '#15803d' : '#4b5563',
                  fontWeight: selectedArea === area.name ? 700 : 500,
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => { setSelectedArea(area.name); navigate(area.path); }}
              >
                {area.name}
              </Button>
            ))}
            {/* Desktop actions inline with nav */}
            {!user.loggedIn && (
              <Button
                variant="outline"
                color="green"
                size="md"
                style={{ borderColor: '#bbf7d0', color: '#15803d', background: '#fff', height: 40, padding: '0 1.5rem', marginLeft: 16 }}
                onClick={() => {}}
              >
                Sign In
              </Button>
            )}
            <Button
              leftSection={<FontAwesomeIcon icon={faPlus} />}
              variant="filled"
              color="green"
              size="md"
              style={{ background: '#16a34a', height: 40, padding: '0 1.5rem' }}
              onClick={() => {}}
            >
              Post Something
            </Button>
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
