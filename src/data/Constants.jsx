import React from 'react';
import { Flame, ThermometerSun, Wind } from 'lucide-react';

export const SITE_DATA = {
  brandName: 'Mainland',
  phone: '(604) 533-2198',
  location: 'Langley, BC',
  filters: {
    brands: ['Napoleon', 'Amantii', 'Dimplex', 'Modern Flames', 'Faber', 'Regency', 'Bromic'],
    styles: ['Linear Built-In', 'Traditional Log', '3-Sided Glass', 'Wall Mount', 'Mantel Package', 'Insert'],
  },
  categories: [
    {
      id: 'electric',
      title: 'Electric',
      subtitle: 'Sleek & Safe',
      description: 'Perfect for condos and modern interiors. Enjoy instant ambiance with zero mess. Sleek, safe, and easy to install.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      solidColor: 'bg-gray-100',
    },
    {
      id: 'gas',
      title: 'Gas',
      subtitle: 'Efficient Warmth',
      description: 'Efficient, powerful, and timeless. Delivering real flames and consistent warmth at the push of a button.',
      image: 'https://images.unsplash.com/photo-1499572621453-4318d184758d?q=80&w=2070&auto=format&fit=crop',
      solidColor: 'bg-gray-200',
    },
    {
      id: 'luxury',
      title: 'Luxury Gas',
      subtitle: 'Custom Built',
      description: 'Elevate your space with high-end, custom-built gas fireplaces. Designed to impress and crafted to last.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
      solidColor: 'bg-stone-100',
    },
    {
      id: 'outdoor-kitchen',
      title: 'Outdoor Kitchen',
      subtitle: 'Napoleon® Grills',
      description: 'Take the indoors out with premium grilling stations. Featuring Napoleon® BBQs and ALFA Pizza Ovens.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop',
      solidColor: 'bg-slate-100',
    },
    {
      id: 'outdoor-fire',
      title: 'Outdoor Fire Features',
      subtitle: 'Atmosphere',
      description: 'Bring warmth and atmosphere to your backyard. From fire tables to custom fire features.',
      image: 'https://images.unsplash.com/photo-1623652391060-f655b404d0c1?q=80&w=2070&auto=format&fit=crop',
      solidColor: 'bg-neutral-200',
    },
  ],
  brands: [
    {
      name: 'Napoleon',
      slogan: 'Quality Fireplaces',
      logo: 'https://storage.googleapis.com/msgsndr/SxR3ZqgZbzQRiOEueKXk/media/681bc0a1d5b18d0265b69392.png'
    },
    {
      name: 'Amantii',
      slogan: 'Electric Fireplaces',
      logo: 'https://amantii.com/wp-content/uploads/2022/08/Amantii_logo_200_white.png'
    },
    {
      name: 'Dimplex',
      slogan: 'Electric Innovation',
      logo: 'https://www.dimplex.com/sites/g/files/emiian436/files/2025-08/Dimplex_logo_400.png'
    },
    {
      name: 'Real Fyre',
      slogan: 'Premium Gas Logs',
      logo: 'https://www.realfyre.com/wp-content/uploads/2021/07/realfyre-logo-small-300px.png'
    },
    {
      name: 'Bromic',
      slogan: 'Smart Heating',
      logo: 'https://storage.googleapis.com/msgsndr/SxR3ZqgZbzQRiOEueKXk/media/681bc0a1ec1140c95c5e8519.png'
    },
    {
      name: 'Infratech',
      slogan: 'Comfort Heaters',
      logo: 'https://storage.googleapis.com/msgsndr/SxR3ZqgZbzQRiOEueKXk/media/681bc0a17fc2d2fc88221d3d.png'
    },
  ],
  outdoorFeatures: [
    {
      title: 'Fire Tables',
      desc: 'The perfect centerpiece for conversation. Available in concrete, stone, and modern metal finishes.',
      icon: <Flame className='w-6 h-6' />,
      image: 'https://plus.unsplash.com/premium_photo-1725408054928-5bb5d4eda7de?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmlyZSUyMHBpdHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: 'Patio Heaters',
      desc: 'Extend your patio season with high-efficiency radiant heaters from Bromic and Infratech.',
      icon: <ThermometerSun className='w-6 h-6' />,
      image: 'https://www.dellonda.co.uk/cdn/shop/files/DG99_ACT_LIFESTYLE_PIC2.jpg?v=1728041110&width=2953',
    },
    {
      title: 'Fire Bowls',
      desc: 'Architectural statements that bring drama and warmth to pool decks and landscapes.',
      icon: <Wind className='w-6 h-6' />,
      image: 'https://images.unsplash.com/photo-1507498016354-887e17c7d231?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmlyZSUyMHBpdHxlbnwwfHwwfHx8MA%3D%3D',
    },
  ],
};

export const INITIAL_PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  brand: SITE_DATA.filters.brands[i % SITE_DATA.filters.brands.length],
  style: SITE_DATA.filters.styles[i % SITE_DATA.filters.styles.length],
  name: `${SITE_DATA.filters.brands[i % SITE_DATA.filters.brands.length]} ${SITE_DATA.filters.styles[i % SITE_DATA.filters.styles.length]} Series ${50 + i * 10}'`,
  price: 1200 + i * 150,
  image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
  isNew: i < 3,
  sku: `EF-${1000 + i}`,
}));