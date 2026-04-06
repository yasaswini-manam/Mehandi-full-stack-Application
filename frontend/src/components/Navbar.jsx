import React, { useState, useEffect } from 'react';

const Navbar = ({ page, setPage, cartCount }) => {
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