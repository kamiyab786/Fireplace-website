import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';
import { SITE_DATA, INITIAL_PRODUCTS } from '../data/Constants';

const ProductPage = () => {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Check if we navigated here with a specific brand requested
        if (location.state && location.state.selectedBrand) {
            setSelectedBrands([location.state.selectedBrand]);

            // Optional: Clear the state so it doesn't get stuck if they refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        if (selectedBrands.length > 0) {
            setProducts(INITIAL_PRODUCTS.filter((p) => selectedBrands.includes(p.brand)));
        } else {
            setProducts(INITIAL_PRODUCTS);
        }
    }, [selectedBrands]);

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
    };

    return (
        <div className='min-h-screen pt-[72px] bg-white animate-fade-in'>
            {/* Banner */}
            <div className='bg-gray-50 border-b border-gray-200'>
                <div className='max-w-[1600px] mx-auto px-6 py-12 md:py-20'>
                    <div className='flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold'>
                        <Link to="/" className='hover:text-[#C8102E] transition-colors'>Home</Link>
                        <span className='text-[#C8102E] font-bold'>/</span>
                        <span>Fireplaces</span>
                        <span className='text-[#C8102E] font-bold'>/</span>
                        <span className='text-gray-900'>Electric</span>
                    </div>
                    <h1 className='font-heading text-5xl md:text-6xl text-gray-900 uppercase mb-4'>Electric Collection</h1>
                    <p className='font-sans text-gray-500 max-w-2xl text-lg leading-relaxed'>
                        Modern efficiency meets style. Browse our curated selection of industry-leading electric fireplaces, perfect for any room in your home.
                    </p>
                </div>
            </div>

            <div className='max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-screen relative'>
                {/* --- LEFT FILTER PANE --- */}
                <aside className='hidden lg:block w-72 flex-shrink-0 py-12 pr-12 pl-6 border-r border-gray-100 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar'>
                    <div className='flex items-center gap-2 mb-8 text-[#C8102E] font-bold uppercase tracking-widest text-xs'>
                        <SlidersHorizontal className='w-4 h-4' /> Filters
                    </div>

                    <div className='mb-10'>
                        <h3 className='font-heading text-lg uppercase mb-4 text-gray-900'>Brand</h3>
                        <div className='space-y-3 font-sans text-sm text-gray-500'>
                            {SITE_DATA.filters.brands.map((brand) => (
                                <label key={brand} className='flex items-center gap-3 cursor-pointer group'>
                                    <div className={`w-4 h-4 border rounded-xs flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-[#C8102E] border-[#C8102E]' : 'border-gray-300 group-hover:border-[#C8102E]'}`}>
                                        {selectedBrands.includes(brand) && <Check className='w-3 h-3 text-white' />}
                                    </div>
                                    <input type='checkbox' className='hidden' checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                                    <span className={`group-hover:text-gray-900 transition-colors ${selectedBrands.includes(brand) ? 'text-gray-900 font-bold' : ''}`}>{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='mb-10'>
                        <h3 className='font-heading text-lg uppercase mb-4 text-gray-900'>Style</h3>
                        <div className='space-y-3 font-sans text-sm text-gray-500'>
                            {SITE_DATA.filters.styles.map((style) => (
                                <label key={style} className='flex items-center gap-3 cursor-pointer group'>
                                    <div className='w-4 h-4 border border-gray-300 rounded-xs flex items-center justify-center group-hover:border-[#C8102E] transition-colors'></div>
                                    <span className='group-hover:text-gray-900 transition-colors'>{style}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='mb-10'>
                        <h3 className='font-heading text-lg uppercase mb-4 text-gray-900'>Price Range</h3>
                        <div className='flex gap-2 text-sm font-sans mb-4'>
                            <div className='relative w-full'>
                                <span className='absolute left-3 top-2 text-gray-400'>$</span>
                                <input type='number' placeholder='0' className='w-full pl-6 p-2 border border-gray-200 outline-hidden focus:border-[#C8102E] bg-gray-50 rounded-xs' />
                            </div>
                            <span className='self-center text-gray-400'>-</span>
                            <div className='relative w-full'>
                                <span className='absolute left-3 top-2 text-gray-400'>$</span>
                                <input type='number' placeholder='5000' className='w-full pl-6 p-2 border border-gray-200 outline-hidden focus:border-[#C8102E] bg-gray-50 rounded-xs' />
                            </div>
                        </div>
                        <button className='w-full py-3 bg-gray-900 text-white uppercase text-xs font-bold tracking-widest hover:bg-[#C8102E] transition-colors rounded-xs'>Update Results</button>
                    </div>
                </aside>

                {/* --- MOBILE FILTER TOGGLE --- */}
                <div className='lg:hidden p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-[72px] z-30 shadow-xs'>
                    <button onClick={() => setFiltersOpen(true)} className='flex items-center gap-2 uppercase font-bold text-xs tracking-widest text-gray-900 border border-gray-200 px-4 py-2 rounded-xs'>
                        <SlidersHorizontal className='w-4 h-4' /> Filter Products
                    </button>
                    <span className='text-xs text-gray-500 font-sans font-medium'>{products.length} Results</span>
                </div>

                {/* --- MOBILE FILTER DRAWER --- */}
                {filtersOpen && (
                    <div className='fixed inset-0 z-[70] bg-white flex flex-col lg:hidden animate-in slide-in-from-bottom'>
                        <div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
                            <span className='font-heading text-xl uppercase'>Refine Selection</span>
                            <button onClick={() => setFiltersOpen(false)} className='p-2 bg-white rounded-full shadow-xs'>
                                <X className='w-6 h-6' />
                            </button>
                        </div>
                        <div className='p-8 overflow-y-auto flex-1'>
                            <h3 className='font-heading text-lg uppercase mb-4'>Brand</h3>
                            <div className='space-y-4 font-sans text-sm text-gray-600 mb-8'>
                                {SITE_DATA.filters.brands.map((b) => (
                                    <div key={b} className='flex gap-3 items-center'>
                                        <div className='w-5 h-5 border border-gray-300 rounded-xs'></div>
                                        {b}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setFiltersOpen(false)} className='w-full py-4 bg-[#C8102E] text-white uppercase font-bold tracking-widest rounded-xs mt-8'>
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* --- MAIN PRODUCT GRID --- */}
                <main className='flex-1 p-6 md:p-12 bg-white'>
                    <div className='hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-100'>
                        <span className='text-sm text-gray-500 font-sans font-medium'>
                            Showing <strong>{products.length}</strong> Products
                        </span>
                        <div className='flex items-center gap-2 text-sm font-sans cursor-pointer group px-4 py-2 border border-transparent hover:border-gray-100 rounded-xs'>
                            <span className='text-gray-500 group-hover:text-gray-900'>Sort by: Featured</span>
                            <ChevronDown className='w-4 h-4 text-gray-400' />
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className='py-20 text-center text-gray-400 font-sans'>No products found matching your filters.</div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10'>
                            {products.map((product) => (
                                <div key={product.id} className='group cursor-pointer flex flex-col'>
                                    <div className='relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4 rounded-xs'>
                                        <img src={product.image} alt={product.name} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' />
                                        {product.isNew && <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-gray-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-xs'>New Arrival</div>}
                                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
                                        <div className='absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                                            <button className='w-full py-3 bg-[#C8102E] text-white text-xs uppercase font-bold tracking-widest hover:bg-gray-900 transition-colors'>Quick View</button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <div className='flex justify-between items-start mb-1'>
                                            <div className='text-[10px] text-gray-400 uppercase tracking-widest font-bold'>{product.brand}</div>
                                            <div className='text-[10px] text-gray-300 uppercase tracking-widest'>{product.sku}</div>
                                        </div>
                                        <h3 className='font-heading text-lg text-gray-900 leading-tight mb-2 group-hover:text-[#C8102E] transition-colors'>{product.name}</h3>
                                        <div className='mt-auto flex items-baseline gap-2'>
                                            <span className='font-sans font-semibold text-gray-900'>${product.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductPage;