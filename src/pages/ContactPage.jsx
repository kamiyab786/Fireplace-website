import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_DATA } from '../data/Constants';

const ContactPage = () => {
  const location = useLocation();
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check for "Get Quote" data passed from Product Page
  useEffect(() => {
    if (location.state && location.state.productOfInterest) {
      const { productOfInterest, sku } = location.state;
      setFormData(prev => ({
        ...prev,
        interest: `Quote: ${productOfInterest} (SKU: ${sku})`,
        message: `Hi, I am interested in getting a quote and checking availability for the ${productOfInterest}.`
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <div className='min-h-screen pt-[72px] bg-white animate-fade-in'>
      
      {/* 1. HERO SECTION */}
      <section className='relative w-full h-[40vh] min-h-[300px] flex items-center justify-center bg-secondary overflow-hidden'>
        <div className='absolute inset-0'>
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Contact Us" 
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent'></div>
        </div>
        <div className='relative z-10 text-center px-6'>
          <div className='flex items-center justify-center gap-4 mb-4'>
            <span className='h-[2px] w-12 bg-primary'></span>
            <span className='text-primary font-bold tracking-[0.25em] uppercase text-xs animate-in slide-in-from-bottom duration-700'>
              Get In Touch
            </span>
            <span className='h-[2px] w-12 bg-primary'></span>
          </div>
          <h1 className='font-heading text-5xl md:text-7xl text-white uppercase leading-none drop-shadow-lg animate-in fade-in zoom-in duration-1000'>
            Contact <span className='text-primary'>Us</span>
          </h1>
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-6 md:px-12 py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          
          {/* 2. CONTACT INFO (Left Side) */}
          <div className='space-y-12'>
            <div>
              <h2 className='font-heading text-3xl md:text-4xl text-secondary uppercase mb-6'>
                We're Here <br/><span className='text-primary'>To Help</span>
              </h2>
              <p className='font-sans text-gray-500 text-lg leading-relaxed'>
                Have questions or ready to start your project? Whether you need expert advice on a new fireplace or service for an existing one, our team is ready.
              </p>
            </div>

            <div className='grid gap-6'>
              {/* Info Cards */}
              <div className='flex items-start gap-6 p-6 bg-gray-50 border border-gray-100 rounded-sm hover:border-primary/30 transition-colors group'>
                <div className='w-12 h-12 bg-white flex items-center justify-center text-primary shadow-sm rounded-full shrink-0 group-hover:scale-110 transition-transform'>
                  <MapPin className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='font-heading text-lg text-secondary uppercase mb-2'>Showroom</h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>
                    20771 Langley Bypass #201,<br/> Langley, BC V3A 5E8
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-6 p-6 bg-gray-50 border border-gray-100 rounded-sm hover:border-primary/30 transition-colors group'>
                <div className='w-12 h-12 bg-white flex items-center justify-center text-primary shadow-sm rounded-full shrink-0 group-hover:scale-110 transition-transform'>
                  <Phone className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='font-heading text-lg text-secondary uppercase mb-2'>Contact</h3>
                  <p className='text-gray-500 text-sm mb-1'>Phone: <a href={`tel:${SITE_DATA.phone}`} className='text-secondary font-bold hover:text-primary transition-colors'>{SITE_DATA.phone}</a></p>
                  <p className='text-gray-500 text-sm'>Email: info@mainlandfireplaces.com</p>
                </div>
              </div>

              <div className='flex items-start gap-6 p-6 bg-gray-50 border border-gray-100 rounded-sm hover:border-primary/30 transition-colors group'>
                <div className='w-12 h-12 bg-white flex items-center justify-center text-primary shadow-sm rounded-full shrink-0 group-hover:scale-110 transition-transform'>
                  <Clock className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='font-heading text-lg text-secondary uppercase mb-2'>Opening Hours</h3>
                  <p className='text-gray-500 text-sm flex justify-between w-full max-w-[200px] mb-1'>
                    <span>Mon - Fri :</span> <span className='font-bold text-secondary'>9AM - 4:30PM</span>
                  </p>
                  <p className='text-gray-500 text-sm flex justify-between w-full max-w-[200px]'>
                    <span>Sat - Sun :</span> <span className='font-bold text-secondary'>10AM - 4PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CONTACT FORM (Right Side) */}
          <div className='bg-white p-8 md:p-10 border border-gray-100 shadow-xl rounded-sm relative overflow-hidden'>
            {/* Decorative BG */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10'></div>

            {isSubmitted ? (
              <div className='h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in'>
                <div className='w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6'>
                  <CheckCircle className='w-8 h-8' />
                </div>
                <h3 className='font-heading text-2xl text-secondary uppercase mb-2'>Message Sent!</h3>
                <p className='text-gray-500 max-w-xs mx-auto'>
                  Thank you for contacting us. One of our experts will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className='mt-8 text-primary font-bold text-sm uppercase tracking-widest hover:underline'
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold uppercase tracking-widest text-secondary'>First Name *</label>
                    <input 
                      type="text" name="firstName" required 
                      value={formData.firstName} onChange={handleChange}
                      className='w-full p-3 bg-gray-50 border border-gray-200 focus:border-primary focus:outline-hidden transition-colors rounded-sm'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold uppercase tracking-widest text-secondary'>Last Name *</label>
                    <input 
                      type="text" name="lastName" required 
                      value={formData.lastName} onChange={handleChange}
                      className='w-full p-3 bg-gray-50 border border-gray-200 focus:border-primary focus:outline-hidden transition-colors rounded-sm'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold uppercase tracking-widest text-secondary'>Email *</label>
                    <input 
                      type="email" name="email" required 
                      value={formData.email} onChange={handleChange}
                      className='w-full p-3 bg-gray-50 border border-gray-200 focus:border-primary focus:outline-hidden transition-colors rounded-sm'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold uppercase tracking-widest text-secondary'>Phone *</label>
                    <input 
                      type="tel" name="phone" required 
                      value={formData.phone} onChange={handleChange}
                      className='w-full p-3 bg-gray-50 border border-gray-200 focus:border-primary focus:outline-hidden transition-colors rounded-sm'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold uppercase tracking-widest text-secondary'>Interest / Subject</label>
                  <input 
                    type="text" name="interest" 
                    value={formData.interest} onChange={handleChange}
                    placeholder="e.g., Gas Fireplace Quote"
                    className='w-full p-3 bg-gray-50 border border-gray-200 focus:border-primary focus:outline-hidden transition-colors rounded-sm'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold uppercase tracking-widest text-secondary'>Message</label>
                  <textarea 
                    name="message" rows="4" 
                    value={formData.message} onChange={handleChange}
                    className='w-full p-3 bg-gray-50 border border-gray-200 focus:border-primary focus:outline-hidden transition-colors rounded-sm'
                  ></textarea>
                </div>

                <button 
                  type='submit'
                  className='w-full py-4 bg-primary text-white uppercase font-bold tracking-widest text-xs hover:bg-secondary transition-colors shadow-lg flex items-center justify-center gap-2 group'
                >
                  Send Message <Send className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 4. MAP SECTION */}
      <section className='w-full h-[400px] bg-gray-200 filter grayscale hover:grayscale-0 transition-all duration-700'>
        <iframe 
          title="Mainland Fireplaces Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2611.5909193059015!2d-122.64993832398424!3d49.1134114827266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485ce288b2e1ba1%3A0xd85fe8414bfc2d81!2sMainland%20Fireplaces!5e0!3m2!1sen!2sca!4v1764825723971!5m2!1sen!2sca"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
      </section>
    </div>
  );
};

export default ContactPage;