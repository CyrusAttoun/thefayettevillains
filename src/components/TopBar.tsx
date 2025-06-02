import { Group, Button, Avatar, Menu, Text, ActionIcon, Box } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faList, faPlus } from '@fortawesome/free-solid-svg-icons';

// Dummy user state for now
const user = {
  name: 'Jane Doe',
  initials: 'JD',
  loggedIn: true,
};

export default function TopBar() {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <Group position="apart" px="md" py="sm" style={{ borderBottom: '1px solid #eee', background: '#fff', zIndex: 100, position: 'sticky', top: 0 }}>
      {/* Logo */}
      <Box style={{ fontWeight: 700, fontSize: 24, cursor: 'pointer' }} onClick={() => navigate('/')}>Fayetteville Vibes Hub</Box>
      {/* Menu bar (future links) */}
      <Group spacing="xs">
        <Button variant="subtle" size="sm">Home</Button>
        <Button variant="subtle" size="sm">Areas</Button>
      </Group>
      <Group spacing="xs">
        <Button leftIcon={<FontAwesomeIcon icon={faPlus} />} variant="filled" color="blue" size="sm">Post Something</Button>
        {user.loggedIn ? (
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
                color="blue"
                radius="xl"
                style={{ cursor: 'pointer' }}
                onClick={() => setMenuOpened((o) => !o)}
              >
                {user.initials}
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<FontAwesomeIcon icon={faCog} />}>Settings</Menu.Item>
              <Menu.Item icon={<FontAwesomeIcon icon={faList} />}>My Posts</Menu.Item>
              <Menu.Item icon={<FontAwesomeIcon icon={faSignOutAlt} />}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button leftIcon={<FontAwesomeIcon icon={faUser} />} variant="outline" color="blue" size="sm">Sign In</Button>
        )}
      </Group>
    </Group>
  );
}
