import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

//const SHRINK_FACTOR = 0.12
const SHRINK_FACTOR = 0

export default function PostCard({ post, focused }: { post: any; focused?: boolean }) {
    return (
        <div
            style={{
                position: 'relative',
                overflow: 'hidden',
                opacity: focused ? 1 : 0.6,
                transform: focused ? `scale(${1.0 + SHRINK_FACTOR})` : `scale(${1.0 - SHRINK_FACTOR})`,
                transition: 'all 0.3s',                
                aspectRatio: '4/3',                
                margin: '0 auto',
                background: 'var(--color-background)',
                fontFamily: 'var(--font-family-sans)',
                borderRadius: 12,
                boxShadow: focused ? '0 4px 32px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.10)'
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
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        background: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        padding: '2px 10px',
                        marginBottom: 8,
                        cursor: 'pointer',
                        alignSelf: 'flex-start',
                        fontFamily: 'var(--font-family-sans)'
                    }}
                >
                    <FontAwesomeIcon icon={post.areaIcon} style={{ marginRight: 4 }} />
                    {post.area}
                </span>
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
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
                </span>
                <span
                    style={{
                        fontSize: 14,
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
                </span>
                {post.price && (
                    <span
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
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
                    </span>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{
                          width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14
                        }}>{post.author[0]}</span>
                        <span style={{ color: '#fff', fontSize: 13, textShadow: '0 1px 4px #000' }}>{post.author}</span>
                        <span style={{ color: '#fff', opacity: 0.7, fontSize: 13, textShadow: '0 1px 4px #000' }}>• {formatDate(post.date)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span title="Upvotes" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,0,0,0.25)', borderRadius: 6, padding: '2px 8px', color: '#fff', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faHeart} />
                            <span style={{ marginLeft: 4, fontSize: 13 }}>{post.upvotes}</span>
                        </span>
                        <span title="Comments" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,0,0,0.25)', borderRadius: 6, padding: '2px 8px', color: '#fff', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faComment} />
                            <span style={{ marginLeft: 4, fontSize: 13 }}>{post.comments}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
