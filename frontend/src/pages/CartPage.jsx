import React, { useState } from 'react';
import axios from 'axios';
// Import the shared divider component
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

const CartPage = ({ cart, setCart, showToast }) => {
  const [ordered, setOrdered] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper for unique product photos based on ID
  const getProductPhoto = (item) => {
    // If the item already has an image passed from the shop, use it
    if (item.image) return item.image;

    // Fallback ID-based mapping
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
        // Category fallbacks
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

  const updateQty = (id, delta) => {
    setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const remove = (id) => setCart(c => c.filter(i => i.id !== id));
  
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    if (!address) return;
    setLoading(true);

    const finalTotal = total > 499 ? total : total + 50;
    const orderData = {
      shipping_address: address,
      total_amount: finalTotal
    };

    try {
      const response = await axios.post("http://localhost:8080/api/orders", orderData);
      if (response.status === 200 || response.status === 201) {
        setOrdered(true);
        showToast('🎉 Order placed successfully!');
        setCart([]);
      }
    } catch (error) {
      showToast('❌ Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (ordered) return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ivory)' }}>
      <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s ease', padding: 40 }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>✨</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.5rem', color: 'var(--brown)', marginBottom: 12 }}>Order Placed!</h2>
        <OrnaDivider />
        <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)', marginTop: 24 }}>Thank you for your purchase. We'll ship within 2-3 business days.</p>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)' }}>
      <div style={{ textAlign: 'center', padding: '60px 40px 40px', background: 'linear-gradient(180deg, var(--cream) 0%, var(--ivory) 100%)' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--brown)' }}>
          Your <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Cart</em>
        </h1>
        <OrnaDivider />
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🛒</div>
          <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--warm-gray)', marginBottom: 16 }}>Your cart is empty</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)' }}>Add some beautiful products to get started.</p>
        </div>
      ) : (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 40px 80px', display: 'grid', gridTemplateColumns: '1fr 350px', gap: 40 }}>
          <div>
            {cart.map((item, i) => (
              <div key={item.id} style={{ background: 'white', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: 12, display: 'flex', gap: 20, alignItems: 'center', animation: `fadeUp 0.4s ease ${i * 0.05}s both` }}>
                
                {/* --- PRODUCT IMAGE --- */}
                <div style={{ width: 80, height: 80, background: 'var(--cream)', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img 
                        src={getProductPhoto(item)} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', color: 'var(--brown)', marginBottom: 4 }}>{item.name}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--copper)' }}>₹{item.price} each</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer' }}>−</button>
                    <span style={{ width: 32, textAlign: 'center', fontSize: '0.85rem' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', color: 'var(--copper)', minWidth: 70, textAlign: 'right' }}>₹{item.price * item.qty}</div>
                  <button onClick={() => remove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-gray)' }}>✕</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ background: 'white', border: '1px solid var(--border)', padding: '28px 24px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: 24 }}>Order Summary</h3>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--warm-gray)', marginBottom: 8 }}>
                  <span>Subtotal</span><span>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--sage)', marginBottom: 12 }}>
                  <span>Shipping</span><span>{total > 499 ? 'FREE' : '₹50'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', color: 'var(--brown)', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--copper)' }}>₹{total > 499 ? total : total + 50}</span>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--brown)', marginBottom: 8 }}>Shipping Address</label>
                <textarea className="form-input" rows={3} placeholder="Enter full address..." value={address} onChange={e => setAddress(e.target.value)} style={{ resize: 'none' }} />
              </div>

              <button className="btn-primary" onClick={placeOrder} disabled={!address || loading} style={{ width: '100%', marginTop: 20 }}>
                {loading ? 'Processing...' : 'Place Order ✦'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;