import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, ChevronUp, Search, X, Check, ArrowRight, Loader2, ChevronRight, Home } from 'lucide-react';

// --- 1. CONFIGURATION ---
const MAIN_CATEGORIES = [
  'Electric',
  'Gas',
  'Luxury Gas',
  'Luxury Mantels',
  'Outdoor Fire Features',
  'Outdoor Kitchen',
  'Misc'
];

// --- 2. UTILITY: Parse Category Path ---
const parseCategoryPath = (filterString, allBrands) => {
  if (!filterString) return { main: 'Misc', subs: [] };

  let parts = filterString.split(',').map(s => s.trim());

  // Handle "fireplaces" as root special case
  if (parts.length > 0 && parts[0].toLowerCase() === 'fireplaces') {
    parts.shift();
  }

  if (parts.length === 0) return { main: 'Misc', subs: [] };

  // Identify Main Category
  let rawMain = parts[0].toLowerCase();
  let mainCategory = 'Misc';

  if (rawMain.includes('electric')) mainCategory = 'Electric';
  else if (rawMain.includes('luxury gas')) mainCategory = 'Luxury Gas';
  else if (rawMain.includes('luxury mantels')) mainCategory = 'Luxury Mantels';
  else if (rawMain.includes('gas')) mainCategory = 'Gas';
  else if (rawMain.includes('outdoor fire')) mainCategory = 'Outdoor Fire Features';
  else if (rawMain.includes('outdoor kitchen') || rawMain.includes('grills') || rawMain.includes('barbeque')) mainCategory = 'Outdoor Kitchen';
  
  // Process Subcategories (Dynamic Brand Filtering)
  const subCategories = parts.slice(1).filter(part => {
    const lowerPart = part.toLowerCase();
    const isBrand = allBrands.has(lowerPart);
    return !isBrand;
  }).map(s => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));

  return { main: mainCategory, subs: subCategories };
};

// --- 3. MODAL COMPONENT (Redesigned) ---
const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const handleGetQuote = () => {
    onClose();
    navigate('/contact', { state: { productOfInterest: product.name, sku: product.sku } });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200'>
      <div className='absolute inset-0 bg-secondary/90 backdrop-blur-sm' onClick={onClose}></div>
      
      {/* Updated Modal Design: Red Top Border, Sharper Shadows */}
      <div className='relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 border-t-4 border-primary'>
        
        <button onClick={onClose} className='absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors'>
          <X className='w-5 h-5' />
        </button>   

        {/* LEFT: Image Gallery */}
        <div className='w-full md:w-3/5 bg-gray-50 p-8 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100'>
          <div className='relative aspect-square w-full max-w-md mb-6 bg-white rounded-sm shadow-sm p-6 flex items-center justify-center'>
            {product.images && product.images.length > 0 ? (
              <img src={product.images[activeImage]} alt={product.name} className='w-full h-full object-contain mix-blend-multiply' />
            ) : (
              <span className='text-gray-400 font-bold uppercase tracking-widest'>No Image</span>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className='flex gap-3 overflow-x-auto pb-2 w-full justify-center custom-scrollbar'>
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)} 
                  className={`w-16 h-16 border-2 rounded-sm overflow-hidden flex-shrink-0 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details */}
        <div className='w-full md:w-2/5 p-8 md:p-10 flex flex-col bg-white'>
          <div className='mb-auto'>
            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mb-6'>
              <span className='px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-sm'>
                {product.brand}
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-sm'>
                SKU: {product.sku}
              </span>
            </div>

            <h2 className='font-heading text-3xl text-secondary uppercase leading-tight mb-4'>{product.name}</h2>
            
            <div className='mb-8 pb-6 border-b border-gray-100'>
               <div className='flex flex-wrap items-center text-xs font-bold text-gray-400 gap-1 uppercase tracking-wide'>
                 <span className='text-primary'>Category:</span> 
                 {product.categoryPath.map((cat, i) => (
                   <span key={i} className='flex items-center text-gray-600'>
                     {i > 0 && <ChevronRight className='w-3 h-3 mx-1 text-gray-300' />}
                     {cat}
                   </span>
                 ))}
               </div>
            </div>

            <div className='prose prose-sm text-gray-500 mb-8 max-h-60 overflow-y-auto custom-scrollbar pr-2 leading-relaxed' dangerouslySetInnerHTML={{ __html: product.description || "No description available." }} />
          </div>

          <div className='mt-6 pt-6'>
            <button onClick={handleGetQuote} className='w-full py-4 bg-primary text-white uppercase font-bold tracking-widest text-sm hover:bg-secondary transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group rounded-sm'>
              Request Pricing <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </button>
            <p className='text-center text-[10px] uppercase tracking-widest text-gray-400 mt-4 font-bold'>
              <Check className="w-3 h-3 inline mr-1 text-green-500" /> Professional Installation Available
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// --- 4. SIDEBAR FILTER COMPONENT (Realistic Design) ---
const CategoryFilter = ({ processedData, selectedCategoryPath, onSelectCategory }) => {
  if (selectedCategoryPath.length === 0) {
    return (
      <div className="space-y-1">
        {MAIN_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onSelectCategory([cat])}
            className="w-full text-left px-3 py-2 text-sm font-bold text-gray-600 hover:text-white hover:bg-primary rounded-sm transition-all flex justify-between items-center group"
          >
            {cat}
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-white/80" />
          </button>
        ))}
      </div>
    );
  }

  const currentLevelSubs = useMemo(() => {
    const subs = new Set();
    processedData.products.forEach(p => {
      const matchesPath = selectedCategoryPath.every((part, i) => p.categoryPath[i] === part);
      if (matchesPath && p.categoryPath.length > selectedCategoryPath.length) {
        subs.add(p.categoryPath[selectedCategoryPath.length]);
      }
    });
    return Array.from(subs).sort();
  }, [processedData, selectedCategoryPath]);

  return (
    <div className="space-y-4 animate-in slide-in-from-left-2 duration-300">
      {/* Breadcrumb Navigation within Filter */}
      <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-200/50">
        <button 
          onClick={() => onSelectCategory([])} 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors self-start"
        >
          <Home className="w-3 h-3" /> All Categories
        </button>
        
        <div className="flex flex-wrap items-center gap-1 text-xs font-bold uppercase tracking-wide text-secondary">
           {selectedCategoryPath.map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-3 h-3 text-gray-400" />}
              <button 
                onClick={() => onSelectCategory(selectedCategoryPath.slice(0, index + 1))}
                className={`${index === selectedCategoryPath.length - 1 ? 'text-primary underline decoration-primary/30 underline-offset-4' : 'hover:text-primary'} transition-colors`}
              >
                {part}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Subcategories List */}
      <div className="space-y-1">
        {currentLevelSubs.length > 0 ? (
          <>
            <div className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em] px-3">Subcategories</div>
            {currentLevelSubs.map(sub => (
              <button
                key={sub}
                onClick={() => onSelectCategory([...selectedCategoryPath, sub])}
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 border-l-2 border-transparent hover:border-primary transition-all flex items-center gap-2"
              >
                {sub}
              </button>
            ))}
          </>
        ) : (
          <div className="text-sm text-gray-400 italic px-3 py-2 bg-gray-50 rounded-sm text-center">No further subcategories</div>
        )}
      </div>
    </div>
  );
};

// --- 5. MAIN PAGE ---
const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [visibleCount, setVisibleCount] = useState(24);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedCategoryPath, setSelectedCategoryPath] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/products.json`);
        const data = await res.json();
        setRawData(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategoryPath([location.state.category]);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const processedData = useMemo(() => {
    const uniqueBrands = new Set();
    rawData.forEach(p => {
      if (p.company) uniqueBrands.add(p.company.trim().toLowerCase());
    });

    const cleanProducts = rawData.map(p => {
      const { main, subs } = parseCategoryPath(p.filters || "", uniqueBrands);
      return {
        ...p,
        id: p._id?.$oid || p._id || Math.random(),
        brand: p.company ? p.company.trim() : 'Other',
        mainCategory: main,
        subCategories: subs,
        categoryPath: [main, ...subs],
        price: 0
      };
    });

    return { products: cleanProducts };
  }, [rawData]);

  const filteredProducts = useMemo(() => {
    let result = processedData.products;

    if (selectedCategoryPath.length > 0) {
      result = result.filter(p => selectedCategoryPath.every((part, i) => p.categoryPath[i] === part));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }

    return result;
  }, [processedData, selectedCategoryPath, selectedBrands, searchQuery]);

  const availableBrands = useMemo(() => {
    const brands = {};
    const categoryFiltered = processedData.products.filter(p => {
       if (selectedCategoryPath.length > 0) {
         return selectedCategoryPath.every((part, i) => p.categoryPath[i] === part);
       }
       return true;
    });

    categoryFiltered.forEach(p => {
      brands[p.brand] = (brands[p.brand] || 0) + 1;
    });

    return Object.entries(brands)
      .map(([k, v]) => ({ value: k, label: k, count: v }))
      .sort((a, b) => b.count - a.count);
  }, [processedData, selectedCategoryPath]);

  useEffect(() => {
    setVisibleCount(24);
    window.scrollTo(0, 0);
  }, [selectedCategoryPath, selectedBrands, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setVisibleCount(prev => prev + 24);
    }, { threshold: 0.1 });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => { if (loadMoreRef.current) observer.unobserve(loadMoreRef.current); };
  }, [filteredProducts]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearAllFilters = () => {
    setSelectedCategoryPath([]);
    setSelectedBrands([]);
    setSearchQuery("");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-[72px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className='min-h-screen pt-[72px] bg-white animate-fade-in'>
      
      {/* --- HERO SECTION (Matches About/Contact Style) --- */}
      <section className='relative w-full h-[35vh] min-h-[300px] flex items-center justify-center bg-secondary overflow-hidden'>
        <div className='absolute inset-0'>
          {/* Add a generic fireplace or showroom image here */}
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" 
            alt="Product Collection" 
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent'></div>
        </div>
        
        <div className='relative z-10 text-center px-6 max-w-4xl mx-auto'>
          {/* Clickable Breadcrumbs in Hero */}
          <div className='flex items-center justify-center flex-wrap gap-2 text-xs uppercase tracking-widest text-white/70 mb-4 font-bold'>
            <Link to="/" className='hover:text-primary transition-colors'>Home</Link>
            <ChevronRight className='w-3 h-3 text-primary' />
            <button 
              onClick={() => setSelectedCategoryPath([])} 
              className={`hover:text-primary transition-colors ${selectedCategoryPath.length === 0 ? 'text-white' : ''}`}
            >
              Collection
            </button>
            {selectedCategoryPath.map((part, i) => (
              <React.Fragment key={i}>
                <ChevronRight className='w-3 h-3 text-primary' />
                <button 
                   onClick={() => setSelectedCategoryPath(selectedCategoryPath.slice(0, i + 1))}
                   className='text-white hover:text-primary transition-colors border-b border-transparent hover:border-primary'
                >
                  {part}
                </button>
              </React.Fragment>
            ))}
          </div>
          
          <h1 className='font-heading text-4xl md:text-6xl text-white uppercase mb-4 drop-shadow-lg'>
             {selectedCategoryPath.length > 0 ? (
               <span className='animate-in fade-in slide-in-from-bottom duration-500'>
                 {selectedCategoryPath[selectedCategoryPath.length - 1]}
               </span>
             ) : (
               <span>Premium <span className='text-primary'>Selection</span></span>
             )}
          </h1>
        </div>
      </section>

      <div className='max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-screen relative'>
        
        {/* --- SIDEBAR (Realistic Design) --- */}
        <aside className='hidden lg:block w-72 flex-shrink-0 py-12 px-8 border-r border-gray-100 bg-white sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-2 text-secondary font-black uppercase tracking-widest text-xs'>
              <SlidersHorizontal className='w-4 h-4 text-primary' /> Filters
            </div>
            <button onClick={clearAllFilters} className='text-[10px] uppercase font-bold text-gray-400 hover:text-primary tracking-widest transition-colors'>
              Reset
            </button>
          </div>

          <div className="relative mb-8 group">
            <input 
              type="text" placeholder="Search products..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>

          <div className="border-b border-gray-100 pb-8 mb-6">
            <h3 className="font-heading text-lg uppercase text-secondary font-bold mb-4">Categories</h3>
            <CategoryFilter 
              processedData={processedData}
              selectedCategoryPath={selectedCategoryPath}
              onSelectCategory={setSelectedCategoryPath}
            />
          </div>

          <div>
            <h3 className="font-heading text-lg uppercase text-secondary font-bold mb-4">Brands</h3>
            <div className="space-y-2 custom-scrollbar max-h-60 overflow-y-auto pr-2">
              {availableBrands.map((brand) => (
                <label key={brand.value} className="flex items-center gap-3 cursor-pointer group select-none py-1 hover:bg-gray-50 rounded-sm px-1 -mx-1 transition-colors">
                  <div className={`w-4 h-4 border rounded-[2px] flex items-center justify-center transition-all duration-200 ${selectedBrands.includes(brand.value) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                    {selectedBrands.includes(brand.value) && <Check className='w-3 h-3 text-white' strokeWidth={4} />}
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedBrands.includes(brand.value)} onChange={() => toggleBrand(brand.value)} />
                  <span className={`text-sm font-sans transition-colors flex-1 ${selectedBrands.includes(brand.value) ? 'text-secondary font-bold' : 'text-gray-600 group-hover:text-primary'}`}>
                    {brand.label}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded-full">{brand.count}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* MOBILE TOGGLE */}
        <div className='lg:hidden p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-[72px] z-30 shadow-xs'>
          <button onClick={() => setIsMobileFilterOpen(true)} className='flex items-center gap-2 uppercase font-bold text-xs tracking-widest text-secondary border border-gray-200 px-4 py-3 rounded-sm'>
            <SlidersHorizontal className='w-4 h-4' /> Filter Products
          </button>
          <span className='text-xs text-gray-500 font-bold'>{filteredProducts.length} Results</span>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileFilterOpen && (
          <div className='fixed inset-0 z-[100] bg-white flex flex-col lg:hidden animate-in slide-in-from-bottom duration-300'>
            <div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
              <span className='font-heading text-xl uppercase text-secondary'>Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className='p-2 bg-white rounded-full shadow-xs text-secondary'>
                <X className='w-6 h-6' />
              </button>
            </div>
            <div className='p-8 overflow-y-auto flex-1'>
              <div className="mb-8">
                <h3 className="font-heading text-lg uppercase text-secondary font-bold mb-4">Category</h3>
                <CategoryFilter 
                  processedData={processedData}
                  selectedCategoryPath={selectedCategoryPath}
                  onSelectCategory={setSelectedCategoryPath}
                />
              </div>
              <div>
                <h3 className="font-heading text-lg uppercase text-secondary font-bold mb-4">Brands</h3>
                <div className="space-y-3">
                  {availableBrands.map((brand) => (
                    <label key={brand.value} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 border rounded-sm flex items-center justify-center ${selectedBrands.includes(brand.value) ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                        {selectedBrands.includes(brand.value) && <Check className='w-3 h-3 text-white' strokeWidth={4} />}
                      </div>
                      <input type="checkbox" className="hidden" checked={selectedBrands.includes(brand.value)} onChange={() => toggleBrand(brand.value)} />
                      <span className="text-sm font-sans text-gray-600">{brand.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button onClick={() => setIsMobileFilterOpen(false)} className='w-full py-4 bg-primary text-white uppercase font-bold tracking-widest rounded-sm mt-8'>
                Show Results
              </button>
            </div>
          </div>
        )}

        {/* MAIN GRID */}
        <main className='flex-1 p-6 md:p-12 bg-gray-50/30'>
          <div className='hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-200'>
            <span className='text-sm text-gray-500 font-sans font-medium'>
              Showing <strong>{Math.min(visibleCount, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> Products
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-32 text-center'>
              <Search className="w-16 h-16 text-gray-200 mb-6" />
              <h3 className="font-heading text-2xl text-secondary uppercase mb-2">No Matches Found</h3>
              <p className="text-gray-500 max-w-md mb-8">Try adjusting your filters or search query.</p>
              <button onClick={clearAllFilters} className='px-8 py-3 bg-primary text-white uppercase font-bold tracking-widest rounded-sm hover:bg-secondary transition-colors'>
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <div key={product.id} className='group cursor-pointer flex flex-col bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden animate-fade-in' onClick={() => setSelectedProduct(product)}>
                    <div className='relative aspect-[4/3] bg-gray-100 overflow-hidden'>
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} className='w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105' loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100"><span className="text-xs uppercase font-bold tracking-widest">No Image</span></div>
                      )}
                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300'></div>
                      <div className='absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'>
                        <button className='w-full py-3 bg-primary text-white text-xs uppercase font-bold tracking-widest hover:bg-secondary transition-colors'>Quick View</button>
                      </div>
                    </div>
                    <div className='flex flex-col flex-1 p-5'>
                      <div className='text-[10px] text-gray-400 uppercase tracking-widest font-bold group-hover:text-primary transition-colors mb-2'>{product.brand}</div>
                      <h3 className='font-heading text-lg text-secondary leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors'>{product.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
              {visibleCount < filteredProducts.length && (
                <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-10">
                   <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-widest">
                     <Loader2 className="w-5 h-5 animate-spin text-primary" /> Loading More...
                   </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default ProductPage;