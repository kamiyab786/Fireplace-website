import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Facebook, Instagram, Twitter, Send, Phone, MapPin, Clock } from 'lucide-react';
import { SITE_DATA } from '../data/Constants';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className='bg-primary text-white pt-20 pb-10 border-t border-white/10 font-sans'>
      <div className='max-w-7xl mx-auto px-6 lg:px-12'>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16'>

          <div className='lg:col-span-5 space-y-8'>
            {/* Logo */}
            <Link to="/" className='block bg-white max-w-47 lg:max-w-55 px-2 pt-3 pb-2 rounded-xl'>
              <img
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/SxR3ZqgZbzQRiOEueKXk/media/681b81746da84953b0d279b5.png"
                alt={SITE_DATA.brandName}
                className='h-10 md:h-12 w-auto object-contain'
              />
            </Link>

            {/* Big Phone Number */}
            <div className='space-y-2'>
              <a href={`tel:${SITE_DATA.phone}`} className='flex items-center gap-3 text-2xl md:text-3xl font-heading font-bold text-white hover:text-secondary transition-colors w-max'>
                <Phone className='w-6 h-6 text-secondary' fill='currentColor' />
                {SITE_DATA.phone}
              </a>
              <p className='text-secondary text-xs font-bold uppercase tracking-widest pl-9'>
                Round-the-clock Support
              </p>
            </div>

            {/* Location & Hours */}
            <div className='space-y-4'>
              <div className='flex items-start gap-3 text-white/90 text-sm font-medium'>
                <MapPin className='w-5 h-5 text-secondary mt-1 shrink-0' />
                <span>20771 Langley Bypass #201<br />{SITE_DATA.location} V3A 5E8</span>
              </div>
              <div className='flex items-start gap-3 text-white/90 text-sm font-medium'>
                <Clock className='w-5 h-5 text-secondary mt-1 shrink-0' />
                <span>Mon-Fri: 09:00am - 04:30pm<br />Sat-Sun: 10:00am - 04:00pm</span>
              </div>
            </div>
          </div>

          {/* COL 2: EXPLORE (With Active State Logic) */}
          <div className='lg:col-span-3 lg:pl-8'>
            <h3 className='font-heading text-2xl text-secondary uppercase mb-8 tracking-wide font-bold'>
              Explore
            </h3>
            <ul className='space-y-4'>
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => {
                // Check if this link is the current page
                const isActive = location.pathname === link.path;

                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-2 transition-colors group font-medium ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
                    >
                      {/* Logic: If Active, opacity is 100 and translateX is 0.
                         If Inactive, opacity is 0 until hover.
                         Color is 'secondary' (Black) to contrast against Red background.
                      */}
                      <span
                        className={`text-secondary transition-all duration-300 font-bold text-lg leading-none pb-1
                          ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
                        `}
                      >
                        ›
                      </span>
                      <span className={`transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                        {link.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COL 3: SUBSCRIBE & SOCIALS (Moved Here) */}
          <div className='lg:col-span-4'>
            <h3 className='font-heading text-2xl text-secondary uppercase mb-8 tracking-wide font-bold'>
              Subscribe
            </h3>

            <form className='relative group mb-8'>
              <input
                type="email"
                placeholder="Your email ..."
                className='w-full bg-white text-gray-900 py-4 pl-6 pr-16 rounded-full outline-hidden border-2 border-transparent focus:border-secondary/50 transition-all placeholder:text-gray-400 shadow-lg'
              />
              <button
                type='button'
                className='absolute top-1 right-1 bottom-1 w-12 bg-secondary rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 shadow-md'
              >
                <Send className='w-5 h-5 -ml-1' />
              </button>
            </form>

            <div className='flex items-start gap-3 mb-8'>
              <input
                type="checkbox"
                id="terms"
                className='mt-1 w-4 h-4 rounded-xs border-white/20 bg-black/10 accent-secondary cursor-pointer'
              />
              <label htmlFor="terms" className='text-xs text-white/80 leading-relaxed cursor-pointer select-none font-medium'>
                I have read and agree to the <span className='text-white hover:text-secondary transition-colors underline decoration-white/30 underline-offset-4 font-bold'>Terms & Conditions</span>.
              </label>
            </div>

            {/* Social Icons (Moved Here) */}
            <div className='flex gap-4'>
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <div key={i} className='w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 cursor-pointer bg-white/5'>
                  <Icon className='w-4 h-4' />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className='pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60 font-medium'>
          <p>© 2025 {SITE_DATA.brandName}. All Rights Reserved.</p>
          <div className='flex gap-6'>
            <span className='hover:text-white cursor-pointer transition-colors'>Privacy Policy</span>
            <span className='hover:text-white cursor-pointer transition-colors'>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;