import React, { useState } from 'react';
// Import the product data
import { PRODUCTS } from '../data/constants';
// Import the shared divider
import { OrnaDivider } from '../components/Shared';

// --- 1. PRODUCT-SPECIFIC IMAGE IMPORTS ---
import conesImg from '../assets/12cones.jpg';
import bookImg from '../assets/book.jpg';
import powderImg from '../assets/hennapowder.jpg';
import brushImg from '../assets/brushset.jpg';
import pinsImg from '../assets/safetypins.jpg';
import sprayImg from '../assets/spray.jpg';
import nailKitImg from '../assets/nailartkit.jpg';
import oilImg from '../assets/hennaoil.jpg';

// --- 2. CATEGORY FALLBACK IMAGE IMPORTS ---
import henna from '../assets/henna.jpg';
import makeupImg from '../assets/makeup1.jpg';
import sareImg from '../assets/sd2.jpg';
import nailImg from '../assets/na.jpg';
import spaImg from '../assets/sp.jpg';

const ShopPage = ({ cart, setCart, showToast }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['all', 'henna', 'makeup', 'nails', 'accessories', 'books'];

  // Helper to match image to category if no specific photo exists
  const getProductImage = (category) => {
    switch (category) {
      case 'henna': return henna;
      case 'makeup': return makeupImg;
      case 'nails': return nailImg;
      case 'accessories': return spaImg;
      case 'books': return sareImg;
      default: return spaImg;
    }
  };

  // Helper for unique product photos based on ID
  const getSpecificProductPhoto = (productId) => {
    switch (productId) {
      case 1: return conesImg;
      case 2: return bookImg;
      case 3: return powderImg;
      case 4: return brushImg;
      case 5: return pinsImg;
      case 6: return sprayImg;
      case 7: return nailKitImg;
      case 8: return oilImg;
      default: return null;
    }
  };

  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
    showToast(`✦ ${product.name} added to cart`);
  };

  // Logic to filter and sort products
  let productsList = PRODUCTS.filter(p =>
    (filter === 'all' || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting Logic
  if (sortBy === 'price-asc') productsList = [...productsList].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') productsList = [...productsList].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') productsList = [...productsList].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', padding: '60px 40px 40px', background: 'linear-gradient(180deg, var(--cream) 0%, var(--ivory) 100%)' }}>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 12 }}>Mehandi Essentials</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--brown)' }}>
          Our <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Shop</em>
        </h1>
        <OrnaDivider />
      </div>

      {/* Controls: Filter, Search, Sort */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 32px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 18px', 
                  border: `1px solid ${filter === cat ? 'var(--copper)' : 'var(--border)'}`,
                  background: filter === cat ? 'var(--copper)' : 'white',
                  color: filter === cat ? 'white' : 'var(--brown)',
                  fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'capitalize', 
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Josefin Sans',
                }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <input 
              className="form-input" 
              placeholder="Search products..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              style={{ width: 200 }} 
            />
            <select className="form-input" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 160 }}>
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low→High</option>
              <option value="price-desc">Price: High→Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
        {productsList.map((product, i) => {
          const inCart = cart.find(c => c.id === product.id);
          const displayImage = getSpecificProductPhoto(product.id) || getProductImage(product.category);

          return (
            <div key={product.id} className="card-hover"
              style={{ background: 'white', border: '1px solid var(--border)', overflow: 'hidden', animation: `fadeUp 0.5s ease ${i * 0.05}s both` }}>
              
              {/* IMAGE CONTAINER */}
              <div style={{
                background: 'linear-gradient(135deg, var(--cream), #EFE0CC)',
                height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                {product.badge && (
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: 'var(--copper)', color: 'white',
                    fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '4px 10px', zIndex: 2
                  }}>{product.badge}</div>
                )}
                
                <img 
                  src={displayImage} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />

                {product.originalPrice && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'var(--sage)', color: 'white',
                    fontSize: '0.58rem', letterSpacing: '0.1em',
                    padding: '4px 8px', zIndex: 2
                  }}>SALE</div>
                )}
              </div>

              <div style={{ padding: '20px 20px 24px' }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--warm-gray)', textTransform: 'capitalize', marginBottom: 6 }}>{product.category}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', fontWeight: 500, color: 'var(--brown)', marginBottom: 6, lineHeight: 1.3 }}>{product.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', lineHeight: 1.7, marginBottom: 16 }}>{product.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span className="stars" style={{ fontSize: '0.75rem' }}>{'★'.repeat(Math.floor(product.rating || 5))}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--warm-gray)' }}>{product.rating || 5} ({product.reviews || 0})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: 'var(--copper)' }}>₹{product.price}</span>
                    {product.originalPrice && <span style={{ fontSize: '0.8rem', color: 'var(--warm-gray)', textDecoration: 'line-through', marginLeft: 8 }}>₹{product.originalPrice}</span>}
                  </div>
                  <button onClick={() => addToCart(product)}
                    style={{
                      padding: '9px 18px',
                      background: inCart ? 'var(--sage)' : 'var(--copper)',
                      border: 'none', color: 'white', fontSize: '0.7rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
                      transition: 'all 0.3s', fontFamily: 'Josefin Sans',
                    }}>
                    {inCart ? `In Cart (${inCart.qty})` : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopPage;