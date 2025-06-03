import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer style={{ background: '#18181b', color: 'white', paddingTop: 48, paddingBottom: 24, marginTop: '2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48 }}>
          {/* Left: Logo, subtitle, and description */}
          <div style={{ flex: 2, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#4ade80" size="2x" />
              <div>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', display: 'block' }}>TheFayettevillains</span>
                <span style={{ fontSize: '0.9rem', color: '#a3a3a3' }}>Your Fayetteville Community Hub</span>
              </div>
            </div>
            <span style={{ color: '#d1d5db', fontSize: '0.95rem', maxWidth: 340, display: 'block' }}>
              Connecting neighbors, supporting local businesses, and building a stronger Fayetteville community through shared experiences and trusted interactions.
            </span>
          </div>
          {/* Community Links */}
          <div style={{ minWidth: 160 }}>
            <span style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>Community</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <FooterLink href="/art">Local Art</FooterLink>
              <FooterLink href="/rummage">Rummage Sales</FooterLink>
              <FooterLink href="/restaurants">Restaurants</FooterLink>
              <FooterLink href="/posts">Community Posts</FooterLink>
            </div>
          </div>
          {/* Services Links */}
          <div style={{ minWidth: 160 }}>
            <span style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>Services</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <FooterLink href="/real-estate">Real Estate</FooterLink>
              <FooterLink href="/marketplace">Marketplace</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Community Guidelines</FooterLink>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #27272a', margin: '2rem 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#a3a3a3', fontSize: '0.95rem' }}>
            © 2024 TheFayettevillains. Made with{' '}
            <FontAwesomeIcon icon={faHeart} color="#f87171" style={{ verticalAlign: 'middle' }} />{' '}
            for Fayetteville, AR
          </span>
          <span style={{ color: '#a3a3a3', fontSize: '0.95rem', marginTop: 8 }}>
            Privacy-focused • AI-moderated • Community-driven
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ color: '#d1d5db', fontSize: '0.95rem', textDecoration: 'none', transition: 'color 0.2s' }}
      onMouseOver={e => (e.currentTarget.style.color = '#4ade80')}
      onMouseOut={e => (e.currentTarget.style.color = '#d1d5db')}
    >
      {children}
    </a>
  );
}
