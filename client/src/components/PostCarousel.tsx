import { Post } from '../types/Post';
import posts from '../data/posts';
import PostCard from './PostCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PostCarousel.css';


export default function PostCarousel() {
  const settings = {
    dots: false,
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    arrows: true,
    pauseOnHover: true,
  };
  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: 24, fontWeight: 600 }}>Featured Fayetteville Posts</span>
        <button style={{ fontSize: 14, background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>View All Posts</button>
      </div>
      <Slider {...settings}>
        {posts.map((post) => (
          <PostCard post={post as Post} key={post.id} />
        ))}
      </Slider>
    </div>
  );
}
