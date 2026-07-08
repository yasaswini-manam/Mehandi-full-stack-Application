import React, { useState } from 'react';
import axios from 'axios';
import { OrnaDivider } from '../components/Shared';
import LocationModal from '../components/LocationModal';
import { API_BASE_URL } from '../config';

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
import spaImg from '../assets/sp.jpg';

const CartPage = ({ cart, setCart, wishlist, setWishlist, showToast, currentUser }) => {
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Checkout Steps: 1 = Cart, 2 = Review, 3 = Payment
  const [step, setStep] = useState(1);
  
  // Location Selection State
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState({
    raw: "Guntur, Andhra Pradesh - 522007",
    city: "Guntur",
    state: "Andhra Pradesh",
    pincode: "522007"
  });

  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | online
  const [showPriceDetailsModal, setShowPriceDetailsModal] = useState(false);

  // Helper for unique product photos based on ID
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

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      remove(id);
    } else {
      setCart(c => c.map(i => i.id === id ? { ...i, qty: newQty } : i));
    }
  };

  const remove = (id) => {
    setCart(c => c.filter(i => i.id !== id));
    showToast("🛒 Item removed from cart");
  };

  const moveToWishlist = (product) => {
    setWishlist(w => {
      if (w.some(item => item.id === product.id)) return w;
      return [...w, product];
    });
    setCart(c => c.filter(i => i.id !== product.id));
    showToast("💖 Moved item to Wishlist");
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = total > 499 ? 0 : 50;
  const finalTotal = total + shipping;

  const placeOrder = async () => {
    setLoading(true);

    const orderData = {
      shipping_address: `${deliveryLocation.raw} (Contact: ${phone})`,
      total_amount: finalTotal,
      email: currentUser?.email || "anonymous@example.com",
      items: JSON.stringify(cart.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty
      })))
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);
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

  // Helper to calculate mock delivery date
  const getDeliveryDateText = (daysAhead) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'short' });
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
    <div style={{ paddingTop: 100, minHeight: '100vh', background: '#F8F6F2', paddingBottom: 100 }}>
      
      {/* 3-Step Progress Indicator Header */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: 600, margin: "0 auto", position: "relative" }}>
          
          {/* Progress bar background line */}
          <div style={{ position: "absolute", top: "25%", left: "10%", right: "10%", height: 2, background: "#EAE6DF", zIndex: 1 }} />
          <div 
            style={{ 
              position: "absolute", 
              top: "25%", 
              left: "10%", 
              width: step === 1 ? "0%" : step === 2 ? "40%" : "80%", 
              height: 2, 
              background: "var(--copper)", 
              zIndex: 2,
              transition: "width 0.3s ease"
            }} 
          />

          {/* Step 1: Cart */}
          <div style={{ flex: 1, textAlign: "center", zIndex: 3, cursor: "pointer" }} onClick={() => setStep(1)}>
            <div style={{ 
              width: 24, height: 24, borderRadius: "50%", background: step >= 1 ? "var(--copper)" : "#EAE6DF", 
              color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", margin: "0 auto 6px"
            }}>1</div>
            <div style={{ fontSize: "0.7rem", fontWeight: step === 1 ? 600 : 400, color: step === 1 ? "var(--brown)" : "var(--warm-gray)", letterSpacing: "0.05em" }}>Cart</div>
          </div>

          {/* Step 2: Review */}
          <div style={{ flex: 1, textAlign: "center", zIndex: 3, cursor: cart.length > 0 ? "pointer" : "default" }} onClick={() => cart.length > 0 && setStep(2)}>
            <div style={{ 
              width: 24, height: 24, borderRadius: "50%", background: step >= 2 ? "var(--copper)" : "#EAE6DF", 
              color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", margin: "0 auto 6px"
            }}>2</div>
            <div style={{ fontSize: "0.7rem", fontWeight: step === 2 ? 600 : 400, color: step === 2 ? "var(--brown)" : "var(--warm-gray)", letterSpacing: "0.05em" }}>Review</div>
          </div>

          {/* Step 3: Payment */}
          <div style={{ flex: 1, textAlign: "center", zIndex: 3, cursor: (cart.length > 0 && phone) ? "pointer" : "default" }} onClick={() => cart.length > 0 && phone && setStep(3)}>
            <div style={{ 
              width: 24, height: 24, borderRadius: "50%", background: step >= 3 ? "var(--copper)" : "#EAE6DF", 
              color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", margin: "0 auto 6px"
            }}>3</div>
            <div style={{ fontSize: "0.7rem", fontWeight: step === 3 ? 600 : 400, color: step === 3 ? "var(--brown)" : "var(--warm-gray)", letterSpacing: "0.05em" }}>Payment</div>
          </div>

        </div>
      </div>

      {/* Delivery Location Banner (Meesho Style) */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "12px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.82rem", color: "var(--brown)" }}>
            <span style={{ fontSize: "1.1rem" }}>📍</span>
            <span>Delivery at <strong>{deliveryLocation.state} - {deliveryLocation.pincode}</strong></span>
          </div>
          <button 
            onClick={() => setLocationModalOpen(true)}
            style={{
              padding: "6px 16px",
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 4,
              fontSize: "0.78rem",
              fontFamily: "Josefin Sans",
              color: "var(--copper)",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Change
          </button>
        </div>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🛒</div>
          <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--warm-gray)', marginBottom: 16 }}>Your cart is empty</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)' }}>Add some beautiful products to get started.</p>
        </div>
      ) : (
        <div style={{ maxWidth: 700, margin: '20px auto 100px', padding: '0 16px' }}>
          
          {/* STEP 1: CART ITEMS */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    background: 'white', 
                    border: '1px solid var(--border)', 
                    borderRadius: 4,
                    display: 'flex', 
                    flexDirection: "column",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                  }}
                >
                  {/* Item Core Details */}
                  <div style={{ display: "flex", padding: 20, gap: 16 }}>
                    {/* Product Photo */}
                    <div style={{ width: 80, height: 80, background: 'var(--cream)', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img src={getProductPhoto(item)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Product Info */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', color: 'var(--brown)', fontWeight: 500, marginBottom: 6 }}>
                        {item.name}
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--brown)" }}>
                          ₹{item.price}
                        </span>
                        {item.originalPrice && (
                          <>
                            <span style={{ fontSize: "0.78rem", color: "var(--warm-gray)", textDecoration: "line-through" }}>
                              ₹{item.originalPrice}
                            </span>
                            <span style={{ fontSize: "0.78rem", color: "var(--sage)", fontWeight: 500 }}>
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off
                            </span>
                          </>
                        )}
                      </div>

                      {/* Dropdown Spec selectors */}
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {/* Size Pill */}
                        <div style={{ display: "flex", alignItems: "center", gap: 4, border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 12, background: "#FAF8F5", fontSize: "0.75rem", color: "var(--brown)" }}>
                          Size: Free Size
                        </div>

                        {/* Qty Pill Dropdown */}
                        <div style={{ display: "flex", alignItems: "center", gap: 4, border: "1px solid var(--border)", borderRadius: 12, background: "#FAF8F5", padding: "2px 8px" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--brown)" }}>Qty:</span>
                          <select 
                            value={item.qty} 
                            onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                            style={{ border: "none", background: "none", fontSize: "0.75rem", fontWeight: 600, color: "var(--brown)", outline: "none", cursor: "pointer" }}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => (
                              <option key={q} value={q}>{q}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Estimated Delivery Banner */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--warm-gray)", marginTop: 12 }}>
                        <span>🚚</span>
                        <span>Estimated Delivery by <strong>{getDeliveryDateText(5)}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div style={{ display: "flex", borderTop: "1px solid var(--border)", background: "#FAF9F6" }}>
                    <button 
                      onClick={() => moveToWishlist(item)}
                      style={{ 
                        flex: 1, padding: "12px", border: "none", borderRight: "1px solid var(--border)", 
                        background: "none", color: "var(--brown)", fontSize: "0.78rem", fontFamily: "Josefin Sans", 
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 
                      }}
                    >
                      ♡ Move to Wishlist
                    </button>
                    <button 
                      onClick={() => remove(item.id)}
                      style={{ 
                        flex: 1, padding: "12px", border: "none", background: "none", color: "var(--copper)", 
                        fontSize: "0.78rem", fontFamily: "Josefin Sans", cursor: "pointer", 
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6 
                      }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: REVIEW DETAILS */}
          {step === 2 && (
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 4, padding: 24, boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: 20, fontWeight: 600 }}>
                Review Shipping Address
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--brown)', marginBottom: 6 }}>Delivery Destination</label>
                  <div style={{ background: "#FDFBF7", border: "1px solid var(--border)", padding: "12px 16px", borderRadius: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--brown)", marginBottom: 4 }}>Address details resolved from Map:</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--warm-gray)", lineHeight: 1.5 }}>{deliveryLocation.raw}</div>
                  </div>
                  <button 
                    onClick={() => setLocationModalOpen(true)}
                    style={{ background: "none", border: "none", color: "var(--copper)", fontSize: "0.75rem", textDecoration: "underline", cursor: "pointer", marginTop: 6 }}
                  >
                    Edit Address on Map
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--brown)', marginBottom: 8 }}>Contact Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="Enter phone number..." 
                    value={phone} 
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                  />
                </div>
              </div>

              {/* Items overview */}
              <div style={{ marginTop: 30, borderTop: "1px dashed var(--border)", paddingTop: 20 }}>
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: 12 }}>Items Overview</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cart.map(i => (
                    <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--warm-gray)" }}>
                      <span>{i.name} (x{i.qty})</span>
                      <span>₹{i.price * i.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT TYPE */}
          {step === 3 && (
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 4, padding: 24, boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: 20, fontWeight: 600 }}>
                Select Payment Mode
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Cash on Delivery */}
                <label 
                  style={{ 
                    display: "flex", alignItems: "center", justifyItems: "center", gap: 12, padding: "16px 20px", 
                    border: `1px solid ${paymentMethod === 'cod' ? 'var(--copper)' : 'var(--border)'}`, 
                    background: paymentMethod === 'cod' ? 'rgba(181,98,42,0.03)' : 'white',
                    borderRadius: 4, cursor: "pointer" 
                  }}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')} 
                    style={{ accentColor: "var(--copper)" }}
                  />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--brown)" }}>Cash on Delivery / Handover (COD)</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--warm-gray)", marginTop: 2 }}>Pay cash at the time of delivery. Safe and secure.</div>
                  </div>
                </label>

                {/* Online Payment Simulator */}
                <label 
                  style={{ 
                    display: "flex", alignItems: "center", justifyItems: "center", gap: 12, padding: "16px 20px", 
                    border: `1px solid ${paymentMethod === 'online' ? 'var(--copper)' : 'var(--border)'}`, 
                    background: paymentMethod === 'online' ? 'rgba(181,98,42,0.03)' : 'white',
                    borderRadius: 4, cursor: "pointer" 
                  }}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'online'} 
                    onChange={() => setPaymentMethod('online')}
                    style={{ accentColor: "var(--copper)" }}
                  />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--brown)" }}>UPI / Net Banking (Simulated)</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--warm-gray)", marginTop: 2 }}>Secure online transfer via UPI apps.</div>
                  </div>
                </label>
              </div>

              {/* Order Delivery Confirmation details */}
              <div style={{ marginTop: 24, background: "var(--cream)", padding: "14px 18px", borderLeft: "3px solid var(--copper)", fontSize: "0.8rem", color: "var(--brown)", lineHeight: 1.6 }}>
                📦 Your order will be delivered to: <br/>
                <strong>{deliveryLocation.raw}</strong>
              </div>
            </div>
          )}

          {/* Sticky Bottom Actions Bar (Meesho Style) */}
          <div 
            style={{ 
              position: "fixed", 
              bottom: 0, 
              left: 0, 
              width: "100%", 
              background: "white", 
              boxShadow: "0 -4px 20px rgba(0,0,0,0.08)", 
              padding: "12px 20px", 
              zIndex: 1000 
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 700, margin: "0 auto" }}>
              {/* Left Side: Total and price detail toggle */}
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--brown)" }}>
                  ₹{finalTotal.toLocaleString()}
                </div>
                <div 
                  onClick={() => setShowPriceDetailsModal(!showPriceDetailsModal)}
                  style={{ fontSize: "0.72rem", color: "#8B1E62", fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}
                >
                  {showPriceDetailsModal ? "Hide Price Details" : "View Price Details"}
                </div>
              </div>

              {/* Right Side: Step Navigation Button */}
              {step === 1 && (
                <button 
                  className="btn-primary" 
                  onClick={() => setStep(2)}
                  style={{ padding: "14px 40px", background: "#8B1E62", borderRadius: 4, letterSpacing: "0.08em" }}
                >
                  Continue
                </button>
              )}
              {step === 2 && (
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    if (!phone || phone.length < 10) {
                      showToast("❌ Please enter a valid 10-digit phone number.");
                    } else {
                      setStep(3);
                    }
                  }}
                  style={{ padding: "14px 40px", background: "#8B1E62", borderRadius: 4, letterSpacing: "0.08em" }}
                >
                  Continue
                </button>
              )}
              {step === 3 && (
                <button 
                  className="btn-primary" 
                  onClick={placeOrder} 
                  disabled={loading}
                  style={{ padding: "14px 40px", background: "#8B1E62", borderRadius: 4, letterSpacing: "0.08em" }}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Floating Price Details Drawer (Toggleable from bottom bar) */}
      {showPriceDetailsModal && cart.length > 0 && (
        <div 
          onClick={() => setShowPriceDetailsModal(false)}
          style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 999 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              position: "absolute", bottom: 74, left: 0, width: "100%", background: "white", 
              borderRadius: "16px 16px 0 0", padding: 24, boxShadow: "0 -8px 30px rgba(0,0,0,0.15)",
              animation: "slideUp 0.3s ease" 
            }}
          >
            <h4 style={{ fontFamily: "Cormorant Garamond", fontSize: "1.3rem", color: "var(--brown)", marginBottom: 16, borderBottom: "1px solid var(--border)", paddingBottom: 8 }}>Price Details</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.82rem", color: "var(--warm-gray)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Price ({cart.reduce((s,i) => s + i.qty, 0)} items)</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--sage)" }}>
                <span>Delivery Charges</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 700, color: "var(--brown)", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                <span>Order Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Map Location Selector Modal */}
      <LocationModal 
        isOpen={locationModalOpen} 
        onClose={() => setLocationModalOpen(false)} 
        onSelectLocation={(loc) => {
          setDeliveryLocation(loc);
          showToast(`📍 Delivery set to pincode ${loc.pincode}`);
        }}
      />
    </div>
  );
};

export default CartPage;