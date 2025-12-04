import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Imports
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className='relative w-full min-h-screen bg-white text-gray-900 font-sans selection:bg-red-100'>
      <ScrollToTop />
      
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* You can add a 404 fallback here later */}
        <Route path="*" element={<div className="pt-32 text-center">404 - Page Not Found</div>} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;