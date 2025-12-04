import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom'; // Import for Portal
import { Link, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, ChevronUp, Search, X, Check, ArrowRight, Loader2 } from 'lucide-react';

// --- 1. PORTAL MODAL (FIXES POSITIONING ISSUE) ---
const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const handleGetQuote = () => {
    onClose();
    navigate('/contact', { state: { productOfInterest: product.name, sku: product.sku } });
  };

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Render directly into document.body to ignore parent animations/transforms
  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200'>
      {/* Dark Backdrop */}
      <div
        className='absolute inset-0 bg-secondary/80 backdrop-blur-sm'
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className='relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300'>

        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-primary hover:text-white rounded-full transition-colors'
        >
          <X className='w-6 h-6' />
        </button>

        {/* LEFT: Image Gallery */}
        <div className='w-full md:w-1/2 bg-gray-50 p-8 flex flex-col items-center justify-center'>
          <div className='relative aspect-square w-full max-w-sm mb-4 bg-white rounded-sm shadow-sm p-4 flex items-center justify-center'>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className='w-full h-full object-contain mix-blend-multiply'
              />
            ) : (
              <span className='text-gray-400 font-bold uppercase tracking-widest'>No Image</span>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className='flex gap-2 overflow-x-auto pb-2 w-full justify-center custom-scrollbar'>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 h-14 border rounded-sm overflow-hidden flex-shrink-0 transition-all ${activeImage === idx ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img} alt="" className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details */}
        <div className='w-full md:w-1/2 p-8 md:p-10 flex flex-col'>
          <div className='mb-auto'>
            <div className='flex items-center gap-3 mb-4'>
              <span className='px-3 py-1 bg-gray-100 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-sm'>
                {product.brand}
              </span>
              <span className='text-xs text-gray-400 font-bold tracking-widest'>
                SKU: {product.sku}
              </span>
            </div>

            <h2 className='font-heading text-3xl md:text-4xl text-secondary uppercase leading-none mb-4'>
              {product.name}
            </h2>

            <div className='text-2xl font-sans font-bold text-primary mb-6'>
              ${product.price.toLocaleString()}
            </div>

            <div
              className='prose prose-sm text-gray-500 mb-8 max-h-40 overflow-y-auto custom-scrollbar pr-2'
              dangerouslySetInnerHTML={{ __html: product.description || "No description available." }}
            />
          </div>

          <div className='mt-6 pt-6 border-t border-gray-100'>
            <button
              onClick={handleGetQuote}
              className='w-full py-4 bg-primary text-white uppercase font-bold tracking-widest text-sm hover:bg-secondary transition-colors shadow-lg flex items-center justify-center gap-2'
            >
              Get a Quote <ArrowRight className='w-4 h-4' />
            </button>
            <p className='text-center text-xs text-gray-400 mt-4'>
              Expert installation and support available.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body // This renders the modal outside of your root div!
  );
};

// --- 2. REUSABLE FILTER COMPONENT ---
const FilterSection = ({ title, options, selected, onChange, isOpenDefault = true }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <button
        className="flex w-full justify-between items-center font-heading text-lg uppercase text-secondary font-bold hover:text-primary transition-colors mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="space-y-3 custom-scrollbar max-h-60 overflow-y-auto pr-2">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer group select-none">
                <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-all duration-200 ${selected.includes(opt.value) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                  {selected.includes(opt.value) && <Check className='w-3 h-3 text-white' strokeWidth={4} />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selected.includes(opt.value)}
                  onChange={() => onChange(opt.value)}
                />
                <span className={`text-sm font-sans transition-colors ${selected.includes(opt.value) ? 'text-secondary font-bold' : 'text-gray-500 group-hover:text-primary'}`}>
                  {opt.label} <span className="text-gray-300 text-xs ml-1">({opt.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN PRODUCT PAGE ---
const ProductPage = () => {
  const [rawData, setRawData] = useState({ products: [], categories: [] });
  const [loading, setLoading] = useState(true);

  // UI State
  const [visibleCount, setVisibleCount] = useState(24);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");

  // Infinite Scroll Ref
  const loadMoreRef = useRef(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}data/products.json`),
          fetch(`${import.meta.env.BASE_URL}data/categories.json`)
        ]);
        const products = await prodRes.json();
        const categories = await catRes.json();
        setRawData({ products, categories });
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- DATA PROCESSING ---
  const processedData = useMemo(() => {
    if (!rawData.products.length) return { products: [], brands: [], categories: [], maxPrice: 0 };

    const catMap = new Map();
    rawData.categories.forEach(c => catMap.set(c._id?.$oid || c._id, c.title));

    let maxP = 0;
    const cleanProducts = rawData.products.map(p => {
      const price = Number(p.price) || 0;
      if (price > maxP) maxP = price;
      return {
        ...p,
        id: p._id?.$oid || p._id,
        categoryName: catMap.get(p.categoryId?.$oid || p.categoryId) || 'Uncategorized',
        brand: p.company ? p.company.trim() : 'Other',
        price
      };
    });

    const brands = {}, cats = {};
    cleanProducts.forEach(p => {
      brands[p.brand] = (brands[p.brand] || 0) + 1;
      cats[p.categoryName] = (cats[p.categoryName] || 0) + 1;
    });

    return {
      products: cleanProducts,
      brands: Object.entries(brands).map(([k, v]) => ({ value: k, label: k, count: v })).sort((a, b) => b.count - a.count),
      categories: Object.entries(cats).map(([k, v]) => ({ value: k, label: k, count: v })).sort((a, b) => b.count - a.count),
      maxPrice: maxP
    };
  }, [rawData]);

  useEffect(() => {
    if (processedData.maxPrice > 0) setPriceRange([0, processedData.maxPrice]);
  }, [processedData.maxPrice]);

  // --- FILTERING ---
  const filteredProducts = useMemo(() => {
    return processedData.products.filter(p => {
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (selectedCategories.length && !selectedCategories.includes(p.categoryName)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [processedData, selectedBrands, selectedCategories, priceRange, searchQuery]);

  // Reset infinite scroll when filters change
  useEffect(() => {
    setVisibleCount(24);
    window.scrollTo(0, 0);
  }, [selectedBrands, selectedCategories, priceRange, searchQuery]);

  // --- INFINITE SCROLL OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Load more items when bottom is reached
        setVisibleCount((prev) => prev + 24);
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [filteredProducts]); // Re-attach when list changes

  const toggleFilter = (setter, val) => setter(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery("");
    setPriceRange([0, processedData.maxPrice]);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-[72px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className='min-h-screen pt-[72px] bg-white animate-fade-in'>

      {/* Banner */}
      <div className='bg-gray-50 border-b border-gray-100'>
        <div className='max-w-[1600px] mx-auto px-6 py-12 md:py-16'>
          <div className='flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold'>
            <Link to="/" className='hover:text-primary transition-colors'>Home</Link>
            <span className='text-primary font-bold'>/</span>
            <span className='text-secondary'>Collection</span>
          </div>
          <h1 className='font-heading text-4xl md:text-6xl text-secondary uppercase mb-4'>
            Premium <span className='text-primary'>Selection</span>
          </h1>
          <p className='font-sans text-gray-500 max-w-2xl text-lg leading-relaxed'>
            Browse our curated inventory of industry-leading fireplaces and grills.
          </p>
        </div>
      </div>

      <div className='max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-screen relative'>

        {/* Sidebar */}
        <aside className='hidden lg:block w-72 flex-shrink-0 py-12 pr-12 pl-6 border-r border-gray-100 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs'>
              <SlidersHorizontal className='w-4 h-4' /> Filters
            </div>
            {(selectedBrands.length > 0 || selectedCategories.length > 0) && (
              <button onClick={clearFilters} className='text-[10px] uppercase font-bold text-gray-400 hover:text-primary tracking-widest transition-colors'>
                Clear All
              </button>
            )}
          </div>

          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-hidden focus:border-primary transition-colors"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>

          <div className="border-b border-gray-100 pb-8 mb-6">
            <h3 className="font-heading text-lg uppercase text-secondary font-bold mb-4">Price Range</h3>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4">
              <span>${priceRange[0]}</span>
              <span className="h-[1px] w-4 bg-gray-300"></span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max={processedData.maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <FilterSection
            title="Brands"
            options={processedData.brands}
            selected={selectedBrands}
            onChange={(val) => toggleFilter(setSelectedBrands, val)}
          />

          <FilterSection
            title="Categories"
            options={processedData.categories}
            selected={selectedCategories}
            onChange={(val) => toggleFilter(setSelectedCategories, val)}
            isOpenDefault={false}
          />
        </aside>

        {/* Mobile Filter */}
        <div className='lg:hidden p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-[72px] z-30 shadow-xs'>
          <button onClick={() => setIsMobileFilterOpen(true)} className='flex items-center gap-2 uppercase font-bold text-xs tracking-widest text-secondary border border-gray-200 px-4 py-3 rounded-sm'>
            <SlidersHorizontal className='w-4 h-4' /> Filter Products
          </button>
          <span className='text-xs text-gray-500 font-bold'>{filteredProducts.length} Results</span>
        </div>

        {/* Mobile Drawer */}
        {isMobileFilterOpen && (
          <div className='fixed inset-0 z-[100] bg-white flex flex-col lg:hidden animate-in slide-in-from-bottom duration-300'>
            <div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
              <span className='font-heading text-xl uppercase text-secondary'>Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className='p-2 bg-white rounded-full shadow-xs text-secondary'>
                <X className='w-6 h-6' />
              </button>
            </div>
            <div className='p-8 overflow-y-auto flex-1'>
              <FilterSection
                title="Brands"
                options={processedData.brands}
                selected={selectedBrands}
                onChange={(val) => toggleFilter(setSelectedBrands, val)}
              />
              <button onClick={clearFilters} className='w-full py-4 bg-gray-100 text-secondary uppercase font-bold tracking-widest rounded-sm mt-4'>
                Reset All
              </button>
              <button onClick={() => setIsMobileFilterOpen(false)} className='w-full py-4 bg-primary text-white uppercase font-bold tracking-widest rounded-sm mt-4'>
                Show Results
              </button>
            </div>
          </div>
        )}

        {/* --- MAIN GRID --- */}
        <main className='flex-1 p-6 md:p-12 bg-white'>
          <div className='hidden lg:flex justify-between items-center mb-10 pb-4 border-b border-gray-100'>
            <span className='text-sm text-gray-500 font-sans font-medium'>
              Showing <strong>{Math.min(visibleCount, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> Products
            </span>
            <div className='flex items-center gap-2 text-sm font-sans cursor-pointer group px-4 py-2 border border-transparent hover:border-gray-100 rounded-sm transition-colors'>
              <span className='text-gray-500 group-hover:text-secondary font-medium'>Sort by: Featured</span>
              <ChevronDown className='w-4 h-4 text-gray-400' />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-32 text-center'>
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="font-heading text-2xl text-secondary uppercase mb-2">No Matches Found</h3>
              <p className="text-gray-500 max-w-md mb-8">We couldn't find any products matching your filters.</p>
              <button onClick={clearFilters} className='px-8 py-3 bg-primary text-white uppercase font-bold tracking-widest rounded-sm hover:bg-secondary transition-colors'>
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-12'>
                {filteredProducts.slice(0, visibleCount).map((product, index) => (
                  <div
                    key={product.id}
                    className='group cursor-pointer flex flex-col animate-fade-in'
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className='relative aspect-[4/3] bg-gray-50 overflow-hidden mb-5 rounded-sm'>
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className='w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110'
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                          <span className="text-xs uppercase font-bold tracking-widest">No Image</span>
                        </div>
                      )}

                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300'></div>

                      <div className='absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'>
                        <button className='w-full py-3 bg-primary text-white text-xs uppercase font-bold tracking-widest hover:bg-secondary transition-colors'>
                          Quick View
                        </button>
                      </div>
                    </div>

                    <div className='flex flex-col flex-1'>
                      <div className='flex justify-between items-start mb-2'>
                        <div className='text-[10px] text-gray-400 uppercase tracking-widest font-bold group-hover:text-primary transition-colors'>
                          {product.brand}
                        </div>
                      </div>
                      <h3 className='font-heading text-lg text-secondary leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors'>
                        {product.name}
                      </h3>
                      <div className='mt-auto pt-4 border-t border-gray-50 group-hover:border-gray-100 transition-colors'>
                        <span className='font-sans font-bold text-lg text-secondary'>
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* INFINITE SCROLL TRIGGER (Invisible Element) */}
              {visibleCount < filteredProducts.length && (
                <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-widest">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" /> Loading More Products...
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* QUICK VIEW POPUP */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductPage;