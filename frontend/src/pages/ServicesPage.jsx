import React from 'react';
// Import the data list
import { SERVICES } from '../data/constants';
// Import the divider ornament
import { OrnaDivider } from '../components/Shared';

const ServicesPage = ({ setPage, setSelectedService }) => {
  const handleBook = (svc) => {
    setSelectedService(svc);
    setPage('booking');
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', padding: '60px 40px 40px', background: 'linear-gradient(180deg, var(--cream) 0%, var(--ivory) 100%)' }}>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 12 }}>Premium Beauty</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--brown)', lineHeight: 1.1, marginBottom: 16 }}>
          Our <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Services</em>
        </h1>
        <OrnaDivider />
        <p style={{ fontSize: '0.88rem', color: 'var(--warm-gray)', marginTop: 24, maxWidth: 500, margin: '24px auto 0', lineHeight: 1.8 }}>
          Each service is crafted with care, expertise, and the finest materials for an unforgettable experience.
        </p>
      </div>

      {/* SERVICES LIST */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
        {SERVICES.map((svc, i) => (
          <div key={svc.id} className="card-hover"
            style={{
              display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 2fr' : '2fr 1fr',
              gap: 0, marginBottom: 32, border: '1px solid var(--border)',
              background: 'white', overflow: 'hidden',
              animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
            }}>
            
            {/* Alternating Layout Logic: Text on Left */}
            {i % 2 !== 0 && (
              <div style={{ padding: '48px 40px', paddingLeft: '5%' }}>
                <ServiceContent svc={svc} handleBook={handleBook} />
              </div>
            )}

            {/* IMAGE CONTAINER */}
            <div style={{
              background: svc.gradient,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 48, minHeight: 280, position: 'relative', overflow: 'hidden',
            }}>
              {/* --- IMAGE TAG REPLACES TEXT PATH --- */}
              <img 
                src={svc.icon} 
                alt={svc.name} 
                style={{ 
                  width: '240px', 
                  height: '240px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '6px solid white',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                  animation: 'float 5s ease-in-out infinite', 
                  zIndex: 2 
                }} 
              />
              
              {/* Decorative background circle */}
              <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
              
              {/* Price/Duration Badge */}
              <div style={{
                marginTop: 24, background: 'white', padding: '8px 20px',
                fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--copper)', fontWeight: 400, zIndex: 1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}>
                {svc.duration} min · From ₹{svc.price.toLocaleString()}
              </div>
            </div>

            {/* Alternating Layout Logic: Text on Right */}
            {i % 2 === 0 && (
              <div style={{ padding: '48px 40px' }}>
                <ServiceContent svc={svc} handleBook={handleBook} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper component for Service Text
const ServiceContent = ({ svc, handleBook }) => (
  <div>
    <div style={{ fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 8 }}>{svc.subtitle}</div>
    <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.2rem', fontWeight: 400, color: 'var(--brown)', marginBottom: 16 }}>{svc.name}</h2>
    <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'var(--warm-gray)', marginBottom: 24 }}>{svc.description}</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 32 }}>
      {svc.features.map(f => (
        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'var(--brown)' }}>
          <span style={{ color: 'var(--gold)' }}>✦</span> {f}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div>
        <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', color: 'var(--copper)' }}>₹{svc.price.toLocaleString()}</div>
        <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--warm-gray)' }}>Starting price</div>
      </div>
      <button className="btn-primary" onClick={() => handleBook(svc)}>Book This Service</button>
    </div>
  </div>
);

export default ServicesPage;