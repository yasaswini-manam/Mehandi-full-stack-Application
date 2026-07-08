import React, { useState, useEffect } from 'react';

const Navbar = ({ page, setPage, cartCount, wishlistCount, currentUser, setCurrentUser, showToast }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- UPDATED NAV LINKS ---
  const navLinks = [
    { label: 'Services', key: 'services' },
    { label: 'Book Now', key: 'booking' },
    { label: 'Shop', key: 'shop' },
    { label: 'About', key: 'about' },
  ];

  return (
    <nav className={scrolled ? 'scrolled' : ''} style={{ padding: scrolled ? '12px 0' : '22px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <div onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', fontWeight: 500, color: 'var(--brown)', letterSpacing: '0.05em', lineHeight: 1 }}>
            Mehandi <span style={{ color: 'var(--copper)' }}>By</span> yasaswini
          </div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--warm-gray)', textTransform: 'uppercase', marginTop: 2 }}>Art · Beauty · Tradition</div>
        </div>

        {/* Nav links (Desktop) */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {navLinks.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)}
              style={{ 
                background: 'none', border: 'none', cursor: 'pointer', 
                fontFamily: 'Josefin Sans', fontSize: '0.75rem', 
                letterSpacing: '0.18em', textTransform: 'uppercase', 
                color: page === l.key ? 'var(--copper)' : 'var(--brown)', 
                transition: 'color 0.3s', fontWeight: 400 
              }}>
              {l.label}
            </button>
          ))}
          
          {/* User Auth Info (Desktop) */}
          {currentUser ? (
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <button onClick={() => setPage('orders')}
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  fontFamily: 'Josefin Sans', fontSize: '0.75rem', 
                  letterSpacing: '0.15em', textTransform: 'uppercase', 
                  color: page === 'orders' ? 'var(--copper)' : 'var(--brown)', 
                  transition: 'color 0.3s', fontWeight: 400 
                }}>
                My Orders
              </button>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--copper)', fontWeight: 500 }}>
                Hi, {currentUser.name.split(' ')[0]}
              </span>
              <button onClick={() => {
                localStorage.removeItem('currentUser');
                setCurrentUser(null);
                showToast('👋 Logged out successfully.');
                setPage('home');
              }}
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  fontFamily: 'Josefin Sans', fontSize: '0.72rem', 
                  letterSpacing: '0.15em', textTransform: 'uppercase', 
                  color: 'var(--warm-gray)', transition: 'color 0.3s'
                }}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => setPage('auth')}
              style={{ 
                background: 'none', border: 'none', cursor: 'pointer', 
                fontFamily: 'Josefin Sans', fontSize: '0.75rem', 
                letterSpacing: '0.18em', textTransform: 'uppercase', 
                color: page === 'auth' ? 'var(--copper)' : 'var(--brown)', 
                transition: 'color 0.3s', fontWeight: 400 
              }}>
              Login
            </button>
          )}

          {/* Wishlist Icon */}
          <div style={{ position: 'relative', cursor: 'pointer', marginRight: 8 }} onClick={() => setPage('wishlist')}>
            <svg width="20" height="20" fill={page === 'wishlist' ? "var(--copper)" : "none"} stroke={page === 'wishlist' ? "var(--copper)" : "var(--brown)"} strokeWidth="1.7" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && <span className="badge" style={{ position: 'absolute', top: -8, right: -8, background: "var(--copper)" }}>{wishlistCount}</span>}
          </div>

          {/* Cart Icon */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setPage('cart')}>
            <svg width="20" height="20" fill="none" stroke="var(--brown)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="badge" style={{ position: 'absolute', top: -8, right: -8 }}>{cartCount}</span>}
          </div>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          className="hide-desktop" >{menuOpen ? '✕' : '☰'}</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'var(--ivory)', padding: '20px 40px', borderTop: '1px solid var(--border)' }}>
          {navLinks.map(l => (
            <div key={l.key} onClick={() => { setPage(l.key); setMenuOpen(false); }}
              style={{ 
                padding: '12px 0', borderBottom: '1px solid var(--border)', 
                fontSize: '0.85rem', letterSpacing: '0.12em', 
                textTransform: 'uppercase', cursor: 'pointer', color: 'var(--brown)' 
              }}>
              {l.label}
            </div>
          ))}

          {/* User Auth Info (Mobile) */}
          {currentUser ? (
            <>
              <div onClick={() => { setPage('orders'); setMenuOpen(false); }}
                style={{ 
                  padding: '12px 0', borderBottom: '1px solid var(--border)', 
                  fontSize: '0.85rem', letterSpacing: '0.12em', 
                  textTransform: 'uppercase', cursor: 'pointer', color: 'var(--brown)' 
                }}>
                My Orders
              </div>
              <div style={{ 
                padding: '12px 0', borderBottom: '1px solid var(--border)', 
                fontSize: '0.85rem', letterSpacing: '0.12em', 
                textTransform: 'uppercase', color: 'var(--copper)', fontWeight: 500
              }}>
                Hi, {currentUser.name}
              </div>
              <div onClick={() => {
                localStorage.removeItem('currentUser');
                setCurrentUser(null);
                showToast('👋 Logged out successfully.');
                setPage('home');
                setMenuOpen(false);
              }}
                style={{ 
                  padding: '12px 0', borderBottom: '1px solid var(--border)', 
                  fontSize: '0.85rem', letterSpacing: '0.12em', 
                  textTransform: 'uppercase', cursor: 'pointer', color: 'var(--warm-gray)' 
                }}>
                Logout
              </div>
            </>
          ) : (
            <div onClick={() => { setPage('auth'); setMenuOpen(false); }}
              style={{ 
                padding: '12px 0', borderBottom: '1px solid var(--border)', 
                fontSize: '0.85rem', letterSpacing: '0.12em', 
                textTransform: 'uppercase', cursor: 'pointer', color: 'var(--brown)' 
              }}>
              Login / Register
            </div>
          )}

          {/* Wishlist link in mobile menu */}
          <div onClick={() => { setPage('wishlist'); setMenuOpen(false); }}
            style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--brown)' }}>
            Wishlist ({wishlistCount})
          </div>

          {/* Cart link in mobile menu */}
          <div onClick={() => { setPage('cart'); setMenuOpen(false); }}
            style={{ padding: '12px 0', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--brown)' }}>
            Cart ({cartCount})
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;