import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { Flame, Menu, X, Calendar, MapPin } from 'lucide-react';
import { SITE_DATA } from '../data/Constants';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleNavClick = (path) => {
    navigate(path);
    setIsNavOpen(false);
  };

  return (
    <>
      <header className='fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all duration-300'>
        {/* Logo Link */}
        <Link to="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/SxR3ZqgZbzQRiOEueKXk/media/681b81746da84953b0d279b5.png" className='flex items-center gap-3 cursor-pointer group'>
          <div className='w-10 h-10 bg-[#C8102E] text-white flex items-center justify-center rounded-xs shadow-md group-hover:bg-[#a00c24] transition-colors'>
            <Flame className='w-6 h-6' fill='currentColor' />
          </div>
          <div className='flex flex-col'>
            <span className='font-heading text-xl uppercase tracking-wide font-bold text-gray-900 leading-none'>
              {SITE_DATA.brandName}
            </span>
            <span className='font-sans text-[10px] tracking-[0.2em] text-gray-500 font-semibold uppercase'>
              Fireplaces & Grills
            </span>
          </div>
        </Link>

        {/* ... (Middle section remains the same: Phone, Address, Button) ... */}
        <div className='flex items-center gap-4 lg:gap-8 pointer-events-auto'>
           {/* Keep your existing phone/consult button code here */}
           <div className='hidden lg:flex flex-col items-end text-right mr-4'>
             <a href={`tel:${SITE_DATA.phone}`} className='font-heading text-lg font-medium text-gray-900 hover:text-[#C8102E] transition-colors'>
               {SITE_DATA.phone}
             </a>
             <div className='flex items-center gap-1 text-xs text-gray-500 uppercase tracking-wider font-medium'>
                <MapPin className='w-3 h-3' /> {SITE_DATA.location}
              </div>
           </div>
           
           <button onClick={() => setIsNavOpen(!isNavOpen)} className='flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors duration-300 text-gray-900'>
            {isNavOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </header>

      {/* NAV DRAWER */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 flex flex-col items-center justify-center gap-8 ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsNavOpen(false)} className='absolute top-6 right-6 text-gray-900 p-2 hover:bg-gray-100 rounded-full'>
          <X className='w-8 h-8' />
        </button>
        
        {/* Navigation Links */}
        <span onClick={() => handleNavClick('/')} className='text-4xl font-heading font-light uppercase text-gray-900 cursor-pointer hover:text-[#C8102E] transition-colors'>
          Home
        </span>
        <span onClick={() => handleNavClick('/products')} className='text-4xl font-heading font-light uppercase text-gray-900 cursor-pointer hover:text-[#C8102E] transition-colors'>
          Fireplaces
        </span>
        {/* Add more routes for About/Contact later */}
      </div>
    </>
  );
};

export default Header;