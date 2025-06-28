import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../types/Post';
import './PostCard.css';

// PostCard displays a single post as a styled card
export default function PostCard({ post, focused }: { post: import('../types/Post').Post; focused?: boolean }) {
    return (
        <div className={`postcard-root${focused ? ' focused' : ''}`}>
            {/* Post image as background */}
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="postcard-image"
                />
            )}
            {/* Overlay for text readability */}
            <div className="postcard-overlay" />
            {/* Main card content */}
            <div className="postcard-content">
                <TopRow post={post} />
                <TitleAndDescription title={post.title} description={post.description} />
                <Statistics author={post.author} date={post.date} upvotes={post.upvotes} comments={post.comments} />
            </div>
        </div>
    );
}

// Format date as 'Mon DD'
function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// TopRow displays the area and price badge
function TopRow({ post }: { post: import('../types/Post').Post }) {
    // areaIcon is now always an IconProp (mapped in PostCarousel)
    return (
        <div>
            <span className="postcard-toprow-area">
                <FontAwesomeIcon icon={post.areaIcon as any} style={{ marginRight: 4 }} />
                {post.area}
            </span>
            {post.price && (
                <span className="postcard-toprow-price">
                    {post.price}
                </span>
            )}
        </div>
    );
}

// TitleAndDescription displays the post's title and description
function TitleAndDescription({ title, description }: { title: string; description: string }) {
    return (
        <>
            <span className="postcard-title">{title}</span>
            <span className="postcard-description">{description}</span>
        </>
    );
}

// Statistics displays author, date, upvotes, and comments
function Statistics({ author, date, upvotes, comments }: { author: string; date: string; upvotes: number; comments: number }) {
    return (
        <div className="postcard-stats-row">
            <div className="postcard-stats-author-group">
                <span className="postcard-stats-author-initial">{author[0]}</span>
                <span className="postcard-stats-author">{author}</span>
                <span className="postcard-stats-date">• {formatDate(date)}</span>
            </div>
            <div className="postcard-stats-icons">
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
    );
}