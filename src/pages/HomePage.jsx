import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Quote, X } from 'lucide-react';
import { SITE_DATA } from '../data/Constants';

const TESTIMONIALS_DATA = [
  {
    name: 'MSG Developments',
    role: 'Custom Home Builder',
    text: "We have been purchasing fireplaces from Mainland fireplaces for quite some time now for all our custom home projects, and the experience has been outstanding from start to finish. The selection of fireplaces is extensive, the staff is incredibly knowledgeable, helping our clients choose the perfect model for any space. Installation is seamless, with a professional team ensuring everything is set up safely and efficiently. If you're looking for a reliable fireplace supplier with excellent products and customer service, we highly recommend Mainland Fireplaces.",
  },
  {
    name: 'Steven Me',
    role: 'Homeowner',
    text: "Mainland Fireplaces did an amazing job at transforming our living room with a beautiful wall build-out to hold a large fireplace. They completed the look with a cement finish which looks fantastic. Very modern. I would highly recommend them.",
  },
  {
    name: 'Melissa Fraser',
    role: 'Homeowner',
    text: "Mainland installed our fireplaces and has helped us with maintenance since. As someone who knows nothing about fireplaces they have helped answer questions on several occasions and provided great customer service since the installation. Absolutely recommend them for sales and service.",
  },
];

// --- 2. CARD & MODAL COMPONENT ---
const TestimonialCard = ({ review }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setIsOpen(true)}
        className='group relative bg-white border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-sm h-full flex flex-col'
      >
        {/* Quote Icon */}
        <div className='absolute -top-5 left-8 w-10 h-10 bg-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300'>
          <Quote className='w-5 h-5 text-white' fill='currentColor' />
        </div>

        <div className='mt-6 mb-6 flex-1'>
          {/* Truncated Text */}
          <p className='font-sans text-gray-500 leading-relaxed line-clamp-4 group-hover:text-gray-900 transition-colors'>
            "{review.text}"
          </p>
          <span className='text-primary text-xs font-bold uppercase tracking-widest mt-4 inline-block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
            Read Full Review →
          </span>
        </div>

        <div className='border-t border-gray-100 pt-6 flex items-center justify-between'>
          <div>
            <h4 className='font-heading text-lg text-gray-900 uppercase tracking-wide font-bold'>
              {review.name}
            </h4>
            <p className='text-xs text-gray-400 uppercase tracking-widest font-bold'>
              {review.role}
            </p>
          </div>
          <div className='flex gap-1'>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className='w-3 h-3 text-primary' fill='currentColor' />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL POPUP - FIXED */}
      {isOpen && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4'>
          {/* Backdrop - Using inline style to ensure it works regardless of Tailwind config */}
          <div
            className='absolute inset-0 backdrop-blur-sm'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          ></div>

          {/* White Modal Content */}
          <div className='relative bg-white w-full max-w-2xl p-10 md:p-14 shadow-2xl rounded-sm overflow-y-auto max-h-[70vh] animate-in fade-in zoom-in duration-300'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className='absolute top-4 right-4 p-2 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-full transition-colors z-50'
            >
              {/* Ensure X is rendered */}
              <X className='w-6 h-6' />
            </button>

            <div className='flex flex-col items-center text-center'>
              <Quote className='w-12 h-12 text-primary/20 mb-6' fill='currentColor' />

              <p className='font-sans text-xl md:text-2xl text-gray-900 leading-relaxed mb-10'>
                "{review.text}"
              </p>

              <div className='border-t border-gray-100 pt-8 w-full'>
                <div className='font-heading text-2xl uppercase tracking-wide text-primary font-bold'>
                  {review.name}
                </div>
                <div className='text-sm text-gray-400 uppercase tracking-[0.2em] font-bold mt-2'>
                  {review.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const HomePage = () => {
  const [activeId, setActiveId] = useState('electric');
  const navigate = useNavigate();

  return (
    <>
      {/* 1. HERO ACCORDION */}
      <section className='relative w-full h-[100dvh] pt-[72px] flex flex-col md:flex-row bg-gray-900'>
        {SITE_DATA.categories.map((cat, index) => {
          const isActive = activeId === cat.id;
          return (
            <article
              key={cat.id}
              onMouseEnter={() => setActiveId(cat.id)}
              onClick={() => setActiveId(cat.id)}
              className={`
                relative group flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-700/50 overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isActive ? 'flex-[4] lg:flex-[5] min-h-[40vh] md:min-h-auto' : 'flex-[1] min-h-[80px] md:min-h-auto'}
                ${cat.solidColor}
              `}
            >
              <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <img src={cat.image} alt={cat.title} className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-95'></div>
              </div>

              <div className='relative z-10 h-full w-full flex flex-col justify-end p-6 md:p-10 pb-8 md:pb-16'>
                <div className={`absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 top-1/2 left-6 -translate-y-1/2 transition-all duration-500 delay-100 ${isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                  <h2 className='font-heading text-lg md:text-2xl text-gray-400 uppercase tracking-widest vertical-text whitespace-nowrap md:rotate-180 font-medium group-hover:text-[#C8102E] transition-colors'>
                    {cat.title}
                  </h2>
                </div>

                <div className={`flex flex-col transition-all duration-700 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 hidden md:flex'}`}>
                  <div className='text-xs tracking-widest font-sans font-bold text-[#C8102E] mb-2 md:mb-4 flex items-center gap-2'>
                    <span className='w-8 h-[2px] bg-[#C8102E]'></span>0{index + 1}
                  </div>
                  <h2 className='font-heading text-3xl md:text-6xl lg:text-7xl text-gray-900 mb-2 md:mb-4 uppercase leading-none'>
                    {cat.title}
                  </h2>
                  <div className='max-w-xl'>
                    <h3 className='text-gray-500 uppercase tracking-widest text-xs font-bold mb-4 font-sans'>
                      {cat.subtitle}
                    </h3>
                    <p className='font-sans text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 border-l-4 border-[#C8102E] pl-4 hidden md:block'>
                      {cat.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Navigate to the products route
                        navigate('/products');
                      }}
                      className='flex items-center gap-3 bg-[#C8102E] text-white px-5 py-2 md:px-6 md:py-3 rounded-xs hover:bg-[#a00c24] transition-colors duration-300 shadow-lg w-max'
                    >
                      <span className='uppercase tracking-widest text-xs font-bold'>Explore</span>
                      <ArrowRight className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 2. NAPOLEON BRAND SPOTLIGHT */}
      <section className='w-full bg-primary text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative'>
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10'>
          <div className='flex-1 space-y-8 animate-fade-in'>
            <div className='relative'>
              <div className='flex items-center gap-4 mb-4'>
                <span className='h-[0.5px] w-12 bg-white'></span>
                <span className='text-sm uppercase tracking-[0.2em] text-white'>
                  Premium Partner
                </span>
                <span className='h-[0.5px] w-12 bg-white'></span>
              </div>
              <h2 className='font-heading text-5xl md:text-7xl uppercase text-white leading-none drop-shadow-sm'>
                Featured <span className='text-secondary'>Brand</span>
              </h2>
            </div>

            <img
              src='https://brand.napoleon.com/files/02f93c40-cdb6-3331-bf9f-7fde7f54f3c3?account_id=95993C08-D4A8-467C-935205C27AA83360&expiry=1765065600000&signature=BRVfMGOwSThCYc%2FATTFBfboWddck0v3yLC4v40BLCUtEYPi4Us1dzVZuzuqoDKIJfJzOGYd0oWGsMkH16sfDDA%3D%3D&version=a0b1ec4b'
              alt='Napoleon Logo'
              className='w-48'
            />

            <p className='font-sans text-white text-lg leading-relaxed max-w-xl border-l-1 border-white pl-6'>
              For over 40 years, Napoleon has led the way with innovative engineering and stunning design. From high-efficiency gas fireplaces to state-of-the-art electric models.
            </p>

            <div className='pt-4'>
              <button
                onClick={() => navigate('/products', { state: { selectedBrand: 'Napoleon' } })}
                className='group bg-white text-primary px-8 py-4 uppercase font-bold tracking-widest text-sm rounded-xl hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl flex items-center gap-3'
              >
                Explore Collection
                <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
              </button>
            </div>
          </div>

          <div className='flex-1 w-full relative group'>
            <div className='absolute -inset-4 border border-white/50 rounded-xl translate-x-2 translate-y-2 opacity-50 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-700'></div>
            <div className='absolute -inset-4 border border-white/50 rounded-xl -translate-x-2 -translate-y-2 opacity-50 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-700'></div>

            <div className='relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl bg-black'>
              <iframe
                src="https://player.vimeo.com/video/812977112?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
                className="absolute inset-0 w-full h-full scale-[1.02]"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Napoleon Lifestyle"
              ></iframe>

              {/* Subtle Overlay to ensure text readability if you add any over video later */}
              <div className='absolute inset-0 bg-black/10 pointer-events-none'></div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. NAPOLEON BRAND SPOTLIGHT */}
      {/* <section className='w-full bg-primary text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative'>
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10'>
          <div className='flex-1 space-y-8'>
            <div className='text-left mb-16 max-w-2xl mx-auto'>
              <h2 className='font-heading text-4xl md:text-6xl uppercase text-white mb-6'>Featured Brand</h2>
              <div className='w-30 h-1 bg-secondary mt-6'></div>
            </div>

            <img src='https://brand.napoleon.com/files/02f93c40-cdb6-3331-bf9f-7fde7f54f3c3?account_id=95993C08-D4A8-467C-935205C27AA83360&expiry=1765065600000&signature=BRVfMGOwSThCYc%2FATTFBfboWddck0v3yLC4v40BLCUtEYPi4Us1dzVZuzuqoDKIJfJzOGYd0oWGsMkH16sfDDA%3D%3D&version=a0b1ec4b' alt='Napoleon Logo' width={250} />

            <p className='font-sans text-white text-s leading-relaxed max-w-xl'>
              For over 40 years, Napoleon has led the way with innovative engineering and stunning design. From high-efficiency gas fireplaces to state-of-the-art electric models and premium outdoor grills, Napoleon products are built to last and designed to elevate your home's comfort and style.
            </p>

            <div className='flex gap-4 pt-4'>
              <button className='bg-white text-primary px-8 py-4 uppercase font-bold tracking-widest text-sm rounded-full hover:bg-secondary hover:text-white transition-colors antialiased'>
                Explore Napoleon Products
              </button>
            </div>
          </div>

          <div className='flex-1 relative'>
            <div className='aspect-[4/3] bg-gray-800 rounded-xs overflow-hidden relative group shadow-2xl'>
              <img src='https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop' alt='Napoleon Grill' className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
              <div className='absolute inset-0 bg-gradient-to-tr from-gray-900 via-transparent to-transparent opacity-60'></div>
            </div>
          </div>
        </div>
      </section> */}

      {/* 3. OUTDOOR FIRE FEATURES SPOTLIGHT */}
      <section className='w-full py-24 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 max-w-3xl mx-auto'>
            <div className='flex items-center justify-center gap-4 mb-4'>
              <span className='h-[1px] w-12 bg-primary'></span>
              <span className='text-sm font-bold text-primary tracking-[0.2em] uppercase'>
                Outdoor Living
              </span>
              <span className='h-[1px] w-12 bg-primary'></span>
            </div>

            <h2 className='font-heading text-5xl md:text-7xl uppercase text-secondary leading-none mb-6'>
              Extend <span className='text-primary'>The Season</span>
            </h2>

            {/* <p className='font-sans text-gray-500 text-lg leading-relaxed'>
              Bring warmth and atmosphere to your backyard year-round with our curated collection of outdoor fire features.
            </p> */}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {SITE_DATA.outdoorFeatures.map((feat, i) => (
              <div key={i} className='group cursor-pointer'>
                <div className='relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100 rounded-xs'>
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors'></div>
                  <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-xs p-3 rounded-full text-primary'>
                    {feat.icon}
                  </div>
                </div>

                <h3 className='font-heading text-2xl text-secondary uppercase mb-2 group-hover:text-primary transition-colors'>
                  {feat.title}
                </h3>

                <p className='font-sans text-gray-500 text-sm leading-relaxed mb-4'>
                  {feat.desc}
                </p>

                <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary border-b border-secondary pb-1 w-max group-hover:text-primary group-hover:border-primary transition-all'>
                  View Collection <ArrowRight className='w-3 h-3' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BRANDS CAROUSEL */}
      <section className='w-full py-24 bg-primary overflow-hidden relative isolate'>
        <div className='max-w-7xl mx-auto px-6 mb-16 text-center'>
          <div className='flex items-center justify-center gap-4 mb-4'>
            <span className='h-[0.5px] w-12 bg-white'></span>
            <span className='text-sm uppercase tracking-[0.2em] text-white'>
              Industry Leaders
            </span>
            <span className='h-[0.5px] w-12 bg-white'></span>
          </div>
          <h2 className='font-heading text-4xl md:text-5xl uppercase text-white tracking-wide drop-shadow-sm'>
            Brands We <span className='text-secondary'>Trust</span>
          </h2>
        </div>

        <div className='relative w-full max-w-[100vw] overflow-hidden'>
          <div className='absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none'></div>
          <div className='absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none'></div>

          <div className='flex w-max animate-scroll gap-16 md:gap-32 items-center'>
            {[...SITE_DATA.brands, ...SITE_DATA.brands, ...SITE_DATA.brands].map((brand, i) => (
              <div
                key={i}
                className='relative group flex flex-col items-center justify-center cursor-pointer px-4'
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className='h-12 md:h-16 w-auto object-contain brightness-0 invert opacity group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110'
                />

                <div className='absolute -inset-4 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -z-10'></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className='w-full py-24 bg-white relative border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-6 relative z-10'>

          <div className='text-center mb-20'>
            <div className='flex items-center justify-center gap-4 mb-4'>
              <span className='h-[1px] w-12 bg-primary'></span>
              <span className='text-sm font-bold text-primary tracking-[0.2em] uppercase'>
                Client Stories
              </span>
              <span className='h-[1px] w-12 bg-primary'></span>
            </div>
            <h2 className='font-heading text-5xl md:text-7xl uppercase text-secondary leading-none mb-6'>
              Trusted Since <span className='text-primary'>2001</span>
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {TESTIMONIALS_DATA.map((review, index) => (
              <TestimonialCard key={index} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;