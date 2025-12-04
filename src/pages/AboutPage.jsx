import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Heart, PenTool, Users, Star, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_DATA } from '../data/Constants';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen pt-[72px] bg-white animate-fade-in'>
      
      {/* 1. HERO SECTION */}
      <section className='relative w-full h-[60vh] flex items-center justify-center bg-secondary overflow-hidden'>
        {/* Background Image with Overlay */}
        <div className='absolute inset-0'>
          <img 
            src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=2070&auto=format&fit=crop" 
            alt="Cozy Fireplace" 
            className='w-full h-full object-cover opacity-40'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent'></div>
        </div>

        <div className='relative z-10 text-center max-w-4xl px-6'>
          <div className='flex items-center justify-center gap-4 mb-6'>
            <span className='h-[2px] w-12 bg-primary'></span>
            <span className='text-primary font-bold tracking-[0.25em] uppercase text-xs animate-in slide-in-from-bottom duration-700'>
              Since 2001
            </span>
            <span className='h-[2px] w-12 bg-primary'></span>
          </div>
          <h1 className='font-heading text-5xl md:text-7xl text-white uppercase leading-none mb-6 drop-shadow-lg animate-in fade-in zoom-in duration-1000'>
            Keeping Families <br />
            <span className='text-primary'>Cozy</span>
          </h1>
          <p className='font-sans text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom duration-1000 delay-200'>
            We believe your home should be a place of warmth, comfort, and connection. 
            Enhancing living spaces inside and out for over two decades.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className='py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center gap-16'>
          {/* Left: Image Grid */}
          <div className='flex-1 relative w-full'>
            <div className='relative aspect-[4/5] w-full max-w-md mx-auto lg:mr-auto'>
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Installation" 
                className='w-full h-full object-cover rounded-sm shadow-2xl'
              />
              {/* Floating Badge */}
              <div className='absolute -bottom-10 -right-10 bg-white p-6 shadow-xl border-l-4 border-primary hidden md:block animate-in fade-in slide-in-from-right duration-1000 delay-300'>
                <div className='flex flex-col items-center'>
                  <span className='font-heading text-5xl text-secondary font-bold'>25+</span>
                  <span className='text-xs uppercase tracking-widest text-gray-500 font-bold'>Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className='flex-1 space-y-8'>
            <h2 className='font-heading text-4xl md:text-5xl text-secondary uppercase'>
              Who We <span className='text-primary'>Are</span>
            </h2>
            <div className='space-y-6 text-gray-600 font-sans leading-relaxed text-lg'>
              <p>
                Founded with a simple mission in 2001, <span className='font-bold text-secondary'>Mainland Fireplaces</span> has grown from a local shop to a trusted leader in Langley and beyond. We don't just sell fireplaces; we curate the heart of your home.
              </p>
              <p>
                With over 25 years of industry experience, our team is known for <span className='text-primary font-bold'>honest advice, high-quality installations, and personal service</span>. Whether it's a sleek electric unit for a modern condo or a custom outdoor kitchen for your dream backyard, we guide you through every step with care.
              </p>
            </div>
            
            <div className='flex flex-col gap-4 pt-4'>
              {[
                "Locally Owned & Community Driven",
                "Expert In-House Installation Teams",
                "Premium Partners (Napoleon, Dimplex, Bromic)"
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <div className='w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary'>
                    <CheckCircle2 className='w-4 h-4' />
                  </div>
                  <span className='font-sans font-bold text-secondary text-sm uppercase tracking-wide'>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (THE MAINLAND DIFFERENCE) */}
      <section className='bg-gray-50 py-24 px-6 border-y border-gray-100'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <span className='text-primary font-bold tracking-[0.2em] uppercase text-xs'>Why Choose Us</span>
            <h2 className='font-heading text-4xl md:text-5xl text-secondary uppercase mt-4'>
              The Mainland <span className='text-primary'>Difference</span>
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: ShieldCheck,
                title: "Trusted Craftsmanship",
                desc: "With over two decades of hands-on experience, we ensure every installation is done with precision, safety, and care."
              },
              {
                icon: Star,
                title: "Premium Products",
                desc: "We strictly partner with top-tier brands like Napoleon® and Dimplex. Built to last, designed to impress, and warrantied for peace of mind."
              },
              {
                icon: Heart,
                title: "Community First",
                desc: "As a local business, we thrive on word-of-mouth. Over 95% of our clients recommend us to friends and family."
              }
            ].map((feature, i) => (
              <div key={i} className='group bg-white p-10 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
                <div className='w-14 h-14 bg-secondary text-white flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300'>
                  <feature.icon className='w-7 h-7' />
                </div>
                <h3 className='font-heading text-2xl text-secondary uppercase mb-4'>{feature.title}</h3>
                <p className='font-sans text-gray-500 leading-relaxed'>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS BANNER */}
      <section className='bg-primary text-white py-16 px-6'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left'>
          <div className='flex flex-col gap-2'>
             <h2 className='font-heading text-4xl uppercase'>Real Results</h2>
             <p className='text-white/80 font-sans max-w-md'>We take pride in the numbers that define our journey serving Langley since 2001.</p>
          </div>
          
          <div className='flex gap-12 md:gap-24'>
             <div className='flex flex-col items-center'>
                <span className='font-heading text-5xl md:text-6xl font-bold'>25+</span>
                <span className='text-xs uppercase tracking-widest font-bold mt-2 opacity-80'>Years</span>
             </div>
             <div className='flex flex-col items-center'>
                <span className='font-heading text-5xl md:text-6xl font-bold'>1k+</span>
                <span className='text-xs uppercase tracking-widest font-bold mt-2 opacity-80'>Homes Warmed</span>
             </div>
             <div className='flex flex-col items-center'>
                <span className='font-heading text-5xl md:text-6xl font-bold'>95%</span>
                <span className='text-xs uppercase tracking-widest font-bold mt-2 opacity-80'>Satisfaction</span>
             </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className='relative py-32 px-6 flex items-center justify-center text-center overflow-hidden bg-white'>
        <div className='max-w-3xl relative z-10'>
          <h2 className='font-heading text-4xl md:text-6xl text-secondary uppercase mb-6'>
            Ready to Transform <br/> Your <span className='text-primary'>Space?</span>
          </h2>
          <p className='font-sans text-gray-500 text-lg mb-10 max-w-xl mx-auto'>
            Visit our showroom or book a consultation to discuss your project. 
            We are here to bring the warmth—inside and out.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button 
              onClick={() => navigate('/products')}
              className='px-8 py-4 bg-secondary text-white uppercase font-bold tracking-widest text-xs hover:bg-gray-900 transition-colors shadow-lg'
            >
              Browse Collection
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className='px-8 py-4 border-2 border-primary text-primary uppercase font-bold tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group'
            >
              Book Consultation <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;