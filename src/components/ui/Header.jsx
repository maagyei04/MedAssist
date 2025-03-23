import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="bg-gray-800 lg:mx-4 lg:mt-4 lg:rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-white text-xl font-bold">MedAssist</span>
                </div>

                {/* Nav Links - Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                location.pathname === link.path
                                ? 'bg-blue-600 text-white'
                                : 'text-white hover:bg-gray-700'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Free Consult Button */}
                <button className="hidden lg:block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors">
                    Free Consult
                </button>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-white"
                >
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden px-4 py-3 border-t border-gray-700">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    location.pathname === link.path
                                    ? 'bg-blue-600 text-white'
                                    : 'text-white hover:bg-gray-700'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors text-left">
                            Free Consult
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;
