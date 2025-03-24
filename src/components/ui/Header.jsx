import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from '../common/AuthModal';
import { useAuth } from '../../contexts/authContext';
import { scrollToSection } from '../common/ScrollToSection';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { userLoggedIn } = useAuth();

    const navigate = useNavigate();

    const handleClick = () => {
        userLoggedIn &&
            navigate('/client_dashboard')
    };

    const navLinks = [
        { name: 'Home', href: '/', to: '/' },
        { name: 'About', href: '#about', to: 'about' },
        { name: 'Services', href: '#services', to: 'services' },
        { name: 'Success Stories', href: '#stories', to: 'stories' },
        { name: 'Contact Us', href: '#contact', to: 'contact' }
    ];

    return (
        <nav className="bg-transparent lg:mx-6 lg:mt-4 lg:rounded-3xl border border-gray-300">
            <div className="px-4 py-3 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                    </svg>
                </button>

                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-sm font-bold">MedAssist</span>
                </div>

                {/* Nav Links - Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.to}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.to)
                            }}
                            className={`px-4 py-2 rounded-3xl transition-colors ${
                                location.pathname === link.to
                                ? 'bg-[#04387CFF] text-white text-sm'
                                : 'text-black text-sm hover:text-gray-500'
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Dynamic Button - Try MedAssist or Dashboard */}
                {userLoggedIn ? (
                    <button onClick={handleClick} className="block bg-[#04387CFF] hover:bg-[#04387CCC] text-white text-sm px-6 py-2 rounded-3xl transition-colors">
                        Dashboard
                    </button>
                ) : (
                    <button onClick={() => setIsAuthModalOpen(true)} className="block bg-[#BF0A30] hover:bg-[#BF0A31BE] text-white text-sm px-6 py-2 rounded-3xl transition-colors">
                        Try MedAssist
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden px-4 py-3 border-t border-gray-300">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                location.pathname === link.path
                                ? 'bg-[#04387CFF] text-white text-sm'
                                : 'text-black text-sm hover:text-gray-500'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
        />
        </nav>
    );
}

export default Header;
