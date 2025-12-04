import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, MapPin, ChevronRight, PhoneCall } from 'lucide-react';
import { SITE_DATA } from '../data/Constants';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
    setIsNavOpen(false);
  };

  const mapLink = "https://maps.app.goo.gl/wbAuXyDAvyfT9A6B7";

  // Navigation Items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className='fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300'>

        {/* 1. IMAGE LOGO (Sized relative to navbar) */}
        <Link to="/" className='block'>
          <img
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/SxR3ZqgZbzQRiOEueKXk/media/681b81746da84953b0d279b5.png"
            alt={SITE_DATA.brandName}
            className='h-10 md:h-12 w-auto object-contain'
          />
        </Link>

        {/* RIGHT SIDE ACTIONS */}
        <div className='flex items-center gap-4 lg:gap-8 pointer-events-auto'>

          {/* Contact Info */}
          <div className='hidden lg:flex flex-col items-end text-right mr-4'>
            <a
              href={`tel:${SITE_DATA.phone}`}
              className='font-heading text-lg font-bold text-primary hover:text-secondary transition-colors'
            >
              {SITE_DATA.phone}
            </a>

            {/* Clickable Location Link */}
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className='flex items-center gap-1 text-xs text-gray-500 uppercase tracking-wider font-medium hover:text-primary transition-colors group'
            >
              <MapPin className='w-3 h-3 group-hover:animate-bounce' />
              <span className='group-hover:underline underline-offset-2'>{SITE_DATA.location}</span>
            </a>
          </div>

          {/* Book Consult Button (Styles Preserved) */}
          <button
            onClick={() => navigate('/contact')}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-white rounded-xl transition-all duration-300 shadow-lg group"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-bold">Book Consult</span>
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className='flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors duration-300 text-secondary'
          >
            {isNavOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </header>

      {/* NAV DRAWER */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Drawer Header */}
        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-300'>
          <img
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/SxR3ZqgZbzQRiOEueKXk/media/681b81746da84953b0d279b5.png"
            alt="Logo"
            className='h-10 md:h-12 w-auto object-contain'
          />
          <button
            onClick={() => setIsNavOpen(false)}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors text-secondary'
          >
            <X className='w-8 h-8' />
          </button>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-col items-center justify-center flex-1 gap-8 p-6'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className='group relative flex items-center gap-4'
              >
                {/* Active State: If active, text is Primary (Red), otherwise Secondary (Black/Dark) */}
                <span
                  className={`font-heading text-4xl md:text-5xl uppercase font-bold transition-colors ${isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}
                >
                  {item.name}
                </span>

                {/* Chevron only shows on hover or active */}
                {/* <ChevronRight 
                  className={`w-8 h-8 text-primary transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                /> */}
              </button>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className='p-8 bg-white border-t border-gray-300 text-center space-y-4'>
          <a href={`tel:${SITE_DATA.phone}`} className='block font-heading text-2xl text-primary hover:text-secondary font-bold'>
            {SITE_DATA.phone}
          </a>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className='flex items-center justify-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm uppercase tracking-widest font-bold'
          >
            <MapPin className='w-4 h-4' /> {SITE_DATA.location}
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;