import { Card, Badge, Image, Avatar, ActionIcon, Tooltip, Stack, Group, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

export default function PostCard({ post, focused }: { post: any; focused?: boolean }) {
  return (
    <Card
      shadow={focused ? 'xl' : 'sm'}
      radius="md"
      p="md"
      style={{
        opacity: focused ? 1 : 0.6,
        transform: focused ? 'scale(1.08)' : 'scale(0.92)',
        transition: 'all 0.3s',
        minHeight: 320,
        maxWidth: 340,
        margin: '0 auto',
        background: '#fff',
      }}
    >
      <Stack gap={8}>
        <Badge
          leftSection={<FontAwesomeIcon icon={post.areaIcon} style={{ marginRight: 4 }} />}
          color="blue"
          variant="light"
          size="sm"
          style={{ cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          {post.area}
        </Badge>
        {post.image && (
          <Image src={post.image} height={140} radius="md" alt={post.title} style={{ marginBottom: 8 }} />
        )}
        <Text fw={600} size="lg" style={{ marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</Text>
        <Text size="sm" c="dimmed" style={{ marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.description}</Text>
        {post.price && (
          <Text size="sm" c="blue" fw={500} style={{ marginBottom: 4 }}>{post.price}</Text>
        )}
        <Group justify="space-between" style={{ marginTop: 12 }}>
          <Group gap={6}>
            <Avatar size={24} radius="xl" color="blue">{post.author[0]}</Avatar>
            <Text size="xs" c="gray.7">{post.author}</Text>
            <Text size="xs" c="gray.5">• {formatDate(post.date)}</Text>
          </Group>
          <Group gap={8}>
            <Tooltip label="Upvotes" withArrow>
              <ActionIcon variant="subtle" color="red">
                <FontAwesomeIcon icon={faHeart} />
                <Text size="xs" style={{ marginLeft: 4 }}>{post.upvotes}</Text>
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Comments" withArrow>
              <ActionIcon variant="subtle" color="gray">
                <FontAwesomeIcon icon={faComment} />
                <Text size="xs" style={{ marginLeft: 4 }}>{post.comments}</Text>
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
