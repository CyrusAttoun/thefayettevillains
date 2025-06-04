import posts from '../data/posts';
import PostCard from './PostCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function PostCarousel() {
  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: 24, fontWeight: 600 }}>Featured Fayetteville Posts</span>
        <button style={{ fontSize: 14, background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>View All Posts</button>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3500}
        centerMode        
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 30
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        //autoPlay
      >
        {posts.map((post) => (
          <div key={post.id} style={{ height: 340, display: 'flex', alignItems: 'stretch', margin: '0 10px' }}>
            <PostCard post={post} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
