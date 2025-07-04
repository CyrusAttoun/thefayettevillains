import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faList, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import './TopBar.css';

const AREAS = [
    { name: 'Home', path: '/' },
    { name: 'Art', path: '/art' },
    { name: 'Rummage Sales', path: '/rummage' },
    { name: 'Real Estate', path: '/real-estate' },
    { name: 'Community', path: '/posts' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Marketplace', path: '/marketplace' },
];

export default function TopBar() {
    const navigate = useNavigate();
    const [menuOpened, setMenuOpened] = useState(false);
    const [selectedArea, setSelectedArea] = useState('Home');
    const [,setMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const { user, signOut, getInitials, loading } = useAuth();

    return (
        <header className="topbar">
            <div className="topbar-container">
                <div className="topbar-content">
                    {/* Logo and subtitle */}
                    <a href="/" className="logo-container">                        
                        <VillainIcon width={32} height={32}/>
                        <span className="logo-text">
                            <span className="logo-title">TheFayettevillains</span>
                            <span className="logo-subtitle">Fayetteville, AR Community</span>
                        </span>
                    </a>
                    {/* Desktop nav and actions in one group */}
                    <nav className="nav-container">
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
                            className="post-button"
                            onClick={() => {
                                if (!user) {
                                    setLoginModalOpen(true);
                                } else {
                                    // Navigate to post creation
                                    navigate('/create-post');
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Post Something
                        </button>
                        {!user && !loading && (
                            <button
                                className="signin-button"
                                onClick={() => setLoginModalOpen(true)}
                            >
                                Sign In
                            </button>
                        )}
                        {user && (
                            <DropdownMenu.Root open={menuOpened} onOpenChange={setMenuOpened}>
                                <DropdownMenu.Trigger asChild>
                                    <Avatar.Root className="user-avatar">
                                        <Avatar.Fallback>{getInitials()}</Avatar.Fallback>
                                    </Avatar.Root>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content sideOffset={8} align="end" className="dropdown-content">
                                    <DropdownMenu.Item onSelect={() => { }} className="dropdown-item">
                                        <FontAwesomeIcon icon={faCog} /> Settings
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onSelect={() => { }} className="dropdown-item">
                                        <FontAwesomeIcon icon={faList} /> My Posts
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onSelect={() => signOut()} className="dropdown-item">
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                    </nav>
                    {/* Mobile menu button */}
                    <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((o) => !o)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>
            <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
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