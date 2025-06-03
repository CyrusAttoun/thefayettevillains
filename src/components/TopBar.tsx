import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faList, faPlus, faMapMarkerAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

const AREAS = [
  { name: 'Home', path: '/' },
  { name: 'Art', path: '/art' },
  { name: 'Rummage Sales', path: '/rummage' },
  { name: 'Real Estate', path: '/real-estate' },
  { name: 'Community', path: '/posts' },
  { name: 'Restaurants', path: '/restaurants' },
  { name: 'Marketplace', path: '/marketplace' },
];

const user = {
  name: 'Jane Doe',
  initials: 'JD',
  loggedIn: false,
};

export default function TopBar() {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);
  const [selectedArea, setSelectedArea] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(6px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: 'var(--font-family-sans)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          {/* Logo and subtitle */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            {/* Villain/criminal SVG icon */}
            <svg
              width={32}
              height={32}
              viewBox="0 0 64 64"
              style={{ display: 'block', marginRight: 4 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="30" fill="var(--color-secondary)" stroke="#fff" strokeWidth="2"/>
              <ellipse cx="32" cy="38" rx="20" ry="10" fill="var(--color-accent)" stroke="#fff" strokeWidth="2"/>
              <ellipse cx="22" cy="38" rx="5" ry="3" fill="#fff"/>
              <ellipse cx="42" cy="38" rx="5" ry="3" fill="#fff"/>
              <ellipse cx="22" cy="38" rx="2" ry="1" fill="var(--color-secondary)"/>
              <ellipse cx="42" cy="38" rx="2" ry="1" fill="var(--color-secondary)"/>
              <rect x="18" y="30" width="28" height="8" rx="4" fill="none" stroke="#fff" strokeWidth="2"/>
              <path d="M18 34 Q32 44 46 34" fill="none" stroke="#fff" strokeWidth="2"/>
            </svg>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', transition: 'color 0.2s', fontFamily: 'var(--font-family-heading)' }}>TheFayettevillains</span>
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Fayetteville, AR Community</span>
            </span>
          </a>
          {/* Desktop nav and actions in one group */}
          <nav style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            {AREAS.map(area => (
              <button
                key={area.name}
                style={{
                  background: selectedArea === area.name ? 'var(--color-primary-light)' : 'transparent',
                  color: selectedArea === area.name ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontWeight: selectedArea === area.name ? 700 : 500,
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 14px',
                  fontSize: 15,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-family-sans)',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => { setSelectedArea(area.name); navigate(area.path); }}
              >
                {area.name}
              </button>
            ))}
            <button
              style={{ background: 'var(--color-primary)', color: '#fff', height: 40, padding: '0 1.5rem', marginRight: 8, border: 'none', borderRadius: 8, fontFamily: 'var(--font-family-sans)', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
              onClick={() => {}}
            >
              <FontAwesomeIcon icon={faPlus} /> Post Something
            </button>
            {!user.loggedIn && (
              <button
                style={{ border: '1.5px solid var(--color-primary-light)', color: 'var(--color-primary)', background: 'var(--color-background)', height: 40, padding: '0 1.5rem', marginLeft: 0, marginRight: 8, borderRadius: 8, fontFamily: 'var(--font-family-sans)', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
                onClick={() => {}}
              >
                Sign In
              </button>
            )}
            {user.loggedIn && (
              <DropdownMenu.Root open={menuOpened} onOpenChange={setMenuOpened}>
                <DropdownMenu.Trigger asChild>
                  <Avatar.Root style={{ cursor: 'pointer', marginLeft: 16, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 700, fontSize: 16 }}>
                    <Avatar.Fallback>{user.initials}</Avatar.Fallback>
                  </Avatar.Root>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content sideOffset={8} align="end" style={{ minWidth: 180, background: '#fff', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', padding: 8 }}>
                  <DropdownMenu.Item onSelect={() => {}} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faCog} /> Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => {}} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faList} /> My Posts
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => {}} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </nav>
          {/* Mobile menu button */}
          <button style={{ background: 'transparent', border: 'none', color: 'gray', fontSize: 24, minWidth: 40, display: 'none' /* TODO: add media query for mobile */ }} onClick={() => setMobileMenuOpen((o) => !o)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </header>
  );
}
