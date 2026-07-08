import React from 'react';
import { OrnaDivider } from '../components/Shared';

// --- PRODUCT-SPECIFIC IMAGE IMPORTS ---
import conesImg from '../assets/12cones.jpg';
import bookImg from '../assets/book.jpg';
import powderImg from '../assets/hennapowder.jpg';
import brushImg from '../assets/brushset.jpg';
import pinsImg from '../assets/safetypins.jpg';
import sprayImg from '../assets/spray.jpg';
import nailKitImg from '../assets/nailartkit.jpg';
import oilImg from '../assets/hennaoil.jpg';

// --- CATEGORY FALLBACK IMAGE IMPORTS ---
import henna from '../assets/henna.jpg';
import makeupImg from '../assets/makeup1.jpg';
import sareImg from '../assets/sd2.jpg';
import nailImg from '../assets/na.jpg';

const WishlistPage = ({ wishlist, setWishlist, setPage, cart, setCart, showToast }) => {

  const getProductPhoto = (item) => {
    if (item.image) return item.image;
    switch (item.id) {
      case 1: return conesImg;
      case 2: return bookImg;
      case 3: return powderImg;
      case 4: return brushImg;
      case 5: return pinsImg;
      case 6: return sprayImg;
      case 7: return nailKitImg;
      case 8: return oilImg;
      default:
        switch (item.category) {
          case 'henna': return henna;
          case 'makeup': return makeupImg;
          case 'nails': return nailImg;
          case 'accessories': return pinsImg;
          case 'books': return bookImg;
          default: return henna;
        }
    }
  };

  const moveToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
    setWishlist(w => w.filter(i => i.id !== product.id));
    showToast(`✦ ${product.name} moved to Cart`);
  };

  const remove = (id) => {
    setWishlist(w => w.filter(i => i.id !== id));
    showToast("💔 Removed from Wishlist");
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)', paddingBottom: 80 }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', padding: '60px 40px 40px', background: 'linear-gradient(180deg, var(--cream) 0%, var(--ivory) 100%)' }}>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 12 }}>Favorites</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--brown)' }}>
          Your <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Wishlist</em>
        </h1>
        <OrnaDivider />
      </div>

      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 24px' }}>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', background: 'white', border: '1px solid var(--border)', padding: '60px 40px', boxShadow: '0 10px 30px rgba(61,31,14,0.03)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 20 }}>❤️</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--brown)', marginBottom: 12 }}>
              Your wishlist is empty
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)', marginBottom: 24 }}>
              Tap the heart icon on products in the shop to add them to your wishlist.
            </p>
            <button className="btn-primary" onClick={() => setPage('shop')}>
              Go to Shop
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {wishlist.map((item, idx) => (
              <div 
                key={item.id} 
                style={{ 
                  background: 'white', 
                  border: '1px solid var(--border)', 
                  padding: '20px 24px', 
                  borderRadius: 4,
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
                  animation: `fadeUp 0.4s ease ${idx * 0.05}s both`
                }}
              >
                {/* Product Image */}
                <div style={{ width: 80, height: 80, background: 'var(--cream)', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={getProductPhoto(item)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: 'var(--brown)', fontWeight: 500, marginBottom: 4 }}>
                    {item.name}
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--copper)', fontWeight: 600 }}>
                    ₹{item.price}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button 
                    onClick={() => moveToCart(item)}
                    className="btn-primary"
                    style={{ padding: "10px 18px", fontSize: "0.75rem", background: "var(--copper)" }}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => remove(item.id)}
                    style={{ 
                      background: 'none', border: '1px solid var(--border)', cursor: 'pointer', 
                      color: 'var(--warm-gray)', padding: "10px 14px", borderRadius: 0,
                      fontSize: "0.75rem", fontFamily: "Josefin Sans", textTransform: "uppercase" 
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
