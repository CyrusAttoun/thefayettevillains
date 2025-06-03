import { Card, Badge, Avatar, ActionIcon, Tooltip, Group, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

//const SHRINK_FACTOR = 0.12
const SHRINK_FACTOR = 0

export default function PostCard({ post, focused }: { post: any; focused?: boolean }) {
    return (
        <Card
            shadow={focused ? 'xl' : 'sm'}
            radius="md"
            p={0}
            style={{
                position: 'relative',
                overflow: 'hidden',
                opacity: focused ? 1 : 0.6,
                transform: focused ? `scale(${1.0 + SHRINK_FACTOR})` : `scale(${1.0 - SHRINK_FACTOR})`,
                transition: 'all 0.3s',                
                aspectRatio: '4/3',                
                margin: '0 auto',
                background: 'var(--color-background)',
                fontFamily: 'var(--font-family-sans)'
            }}
        >
            {/* Image fills card */}
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                        filter: focused ? 'none' : 'blur(1.5px) brightness(0.85)'
                    }}
                />
            )}
            {/* Overlay for text readability */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.15) 90%, rgba(0,0,0,0.01) 100%)'
                }}
            />
            {/* Card content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 3,
                    height: '100%',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: '1.2rem 1rem 1rem 1rem'
                }}
            >
                <Badge
                    leftSection={<FontAwesomeIcon icon={post.areaIcon} style={{ marginRight: 4 }} />}
                    color="blue"
                    variant="light"
                    size="sm"
                    style={{
                        cursor: 'pointer',
                        alignSelf: 'flex-start',
                        marginBottom: 8,
                        background: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-family-sans)'
                    }}
                >
                    {post.area}
                </Badge>
                <Text
                    fw={700}
                    size="lg"
                    style={{
                        marginBottom: 2,
                        color: '#fff',
                        textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 2px #000',
                        fontFamily: 'var(--font-family-heading)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {post.title}
                </Text>
                <Text
                    size="sm"
                    style={{
                        marginBottom: 6,
                        color: '#fff',
                        textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 2px #000',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {post.description}
                </Text>
                {post.price && (
                    <Text
                        size="sm"
                        fw={600}
                        style={{
                            marginBottom: 4,
                            color: 'var(--color-primary)',
                            background: 'rgba(255,255,255,0.85)',
                            borderRadius: 6,
                            padding: '2px 8px',
                            display: 'inline-block',
                            fontFamily: 'var(--font-family-sans)',
                            textShadow: '0 1px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        {post.price}
                    </Text>
                )}
                <Group justify="space-between" style={{ marginTop: 'auto' }}>
                    <Group gap={6}>
                        <Avatar size={24} radius="xl" color="blue">{post.author[0]}</Avatar>
                        <Text size="xs" style={{ color: '#fff', textShadow: '0 1px 4px #000' }}>{post.author}</Text>
                        <Text size="xs" style={{ color: '#fff', opacity: 0.7, textShadow: '0 1px 4px #000' }}>• {formatDate(post.date)}</Text>
                    </Group>
                    <Group gap={8}>
                        
                        <Tooltip label="Upvotes" withArrow>
                            <ActionIcon variant="subtle" size="unset" color="red" style={{ background: 'rgba(0,0,0,0.25)', paddingRight: 8, paddingLeft: 8 }}>
                                <FontAwesomeIcon icon={faHeart} />
                                <Text size="xs" style={{ marginLeft: 4, color: '#fff', textShadow: '0 1px 4px #000' }}>{post.upvotes}</Text>
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Comments" withArrow>
                            <ActionIcon variant="subtle" size="unset" color="gray" style={{ background: 'rgba(0,0,0,0.25)' }}>
                                <FontAwesomeIcon icon={faComment} />
                                <Text size="xs" style={{ marginLeft: 4, color: '#fff', textShadow: '0 1px 4px #000' }}>{post.comments}</Text>
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </div>
        </Card>
    );
}

function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
