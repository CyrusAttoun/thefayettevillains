import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../types/Post';
import './PostCard.css';

//const SHRINK_FACTOR = 0.12
const SHRINK_FACTOR = 0

export default function PostCard({ post, focused }: { post: Post; focused?: boolean }) {
    return (
        <div
            className={`postcard-root${focused ? ' focused' : ''}`}
        >
            {/* Image fills card */}
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="postcard-image"
                />
            )}
            {/* Overlay for text readability */}
            <div className="postcard-overlay" />
            {/* Card content */}
            <div className="postcard-content">
                <TopRow post={post}/>
                <TitleAndDescription title={post.title} description={post.description} />
                <Statistics author={post.author} date={post.date} upvotes={post.upvotes} comments={post.comments} />
            </div>
        </div>
    );
}

function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}


function TopRow({post}: { post: Post }) {
    return (
        <div>
            <span className="postcard-toprow-area">
                <FontAwesomeIcon icon={post.areaIcon} style={{ marginRight: 4 }} />
                {post.area}
            </span>

            {post.price && (
                <span className="postcard-toprow-price">
                    {post.price}
                </span>
            )}

        </div>
    )
}

// Title and Description section for PostCard
function TitleAndDescription({ title, description }: { title: string; description: string }) {
    return (
        <>
            <span className="postcard-title">
                {title}
            </span>
            <span className="postcard-description">
                {description}
            </span>
        </>
    );
}

function Statistics({author, date, upvotes, comments}: { author: string; date: string; upvotes: number; comments: number }) {
    return (
        <div className="postcard-stats-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="postcard-stats-author-initial">{author[0]}</span>
                <span className="postcard-stats-author">{author}</span>
                <span className="postcard-stats-date">• {formatDate(date)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span title="Upvotes" className="postcard-stats-icon">
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="postcard-stats-icon-count">{upvotes}</span>
                </span>
                <span title="Comments" className="postcard-stats-icon">
                    <FontAwesomeIcon icon={faComment} />
                    <span className="postcard-stats-icon-count">{comments}</span>
                </span>
            </div>
        </div>
    )
}