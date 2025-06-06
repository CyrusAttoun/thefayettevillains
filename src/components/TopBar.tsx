import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faList, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
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
    const [,setMobileMenuOpen] = useState(false);

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
                        <VillainIcon width={32} height={32}/>
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', transition: 'color 0.2s', fontFamily: 'var(--font-family-heading)' }}>TheFayettevillains</span>
                            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Fayetteville, AR Community</span>
                        </span>
                    </a>
                    {/* Desktop nav and actions in one group */}
                    <nav style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, marginLeft: '2em', marginRight: '2em' }}>
                        {AREAS.map(area => (
                            <button
                                key={area.name}
                                className={selectedArea === area.name ? 'selected' : ''}    
                                onClick={() => { setSelectedArea(area.name); navigate(area.path); }}
                            >
                                {area.name}
                            </button>
                        ))}
                        <button
                            style={{ textWrap: 'nowrap', background: 'var(--color-primary)', color: '#fff', height: 40, padding: '0 1.5rem', marginRight: 8, border: 'none', borderRadius: 8, fontFamily: 'var(--font-family-sans)', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                            onClick={() => { }}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Post Something
                        </button>
                        {!user.loggedIn && (
                            <button
                                style={{ textWrap: 'nowrap', border: '1.5px solid var(--color-primary-light)', color: 'var(--color-primary)', background: 'var(--color-background)', height: 40, padding: '0 1.5rem', marginLeft: 0, marginRight: 8, borderRadius: 8, fontFamily: 'var(--font-family-sans)', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
                                onClick={() => { }}
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
                                    <DropdownMenu.Item onSelect={() => { }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faCog} /> Settings
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onSelect={() => { }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faList} /> My Posts
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onSelect={() => { }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer' }}>
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

{/* Villain/criminal SVG icon */}
function VillainIcon({ width, height }: { width: number | string; height: number | string }) {
    return (
        <svg viewBox="0 0 295.996 295.996" width={width} height={height} fill="currentColor">
            <g>
                <path d="M147.998,0C66.392,0,0,66.392,0,147.998c0,81.606,66.392,147.998,147.998,147.998c81.606,0,147.998-66.392,147.998-147.998
	C295.996,66.392,229.605,0,147.998,0z M147.998,279.996c-36.257,0-69.143-14.696-93.023-38.44
	c-9.536-9.482-17.631-20.41-23.934-32.42c-4.641-8.842-8.315-18.266-10.866-28.139H275.82
	C261.13,237.865,209.392,279.996,147.998,279.996z M25.037,99.997C44.278,50.877,92.14,16,147.998,16
	c34.523,0,65.987,13.328,89.533,35.102c12.208,11.288,22.289,24.844,29.558,39.997c1.395,2.908,2.686,5.877,3.87,8.898H25.037z
	 M213.497,140.497c0,8.836-7.164,16-16,16c-8.836,0-16-7.164-16-16c0-8.836,7.164-16,16-16
	C206.333,124.497,213.497,131.661,213.497,140.497z M114.497,140.497c0,8.836-7.164,16-16,16c-8.836,0-16-7.164-16-16
	c0-8.836,7.164-16,16-16C107.333,124.497,114.497,131.661,114.497,140.497z"/>

                <rect x="70.767" y="69.685" transform="matrix(-0.9689 -0.2473 0.2473 -0.9689 174.7187 177.3174)" width="55.46" height="15.999" />

                <rect x="189.498" y="49.954" transform="matrix(-0.2473 -0.9689 0.9689 -0.2473 171.0742 288.259)" width="15.999" height="55.46" />
                <path d="M200.159,205.505c12.875-1.788,26.044,1.092,37.084,8.104l8.578-13.506c-14.238-9.043-31.233-12.752-47.862-10.445
	c-26.732,3.714-49.436,22.684-57.84,48.329l15.205,4.982C161.838,223.089,179.438,208.384,200.159,205.505z"/>
            </g>
        </svg>
    )
}