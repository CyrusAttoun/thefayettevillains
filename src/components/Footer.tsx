import { Box, Text, Group, Anchor } from '@mantine/core';

export default function Footer() {
  return (
    <Box component="footer" py="md" mt="xl" style={{ borderTop: '1px solid #eee', background: '#fafbfc' }}>
      <Group position="apart" px="md">
        <Text size="sm" color="dimmed">© 2025 Fayetteville Vibes Hub</Text>
        <Group spacing="xs">
          <Anchor href="#" size="xs" color="blue.7">Privacy Policy</Anchor>
          <Anchor href="#" size="xs" color="blue.7">Terms</Anchor>
        </Group>
      </Group>
    </Box>
  );
}
