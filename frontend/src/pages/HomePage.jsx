import React, { useState, useEffect } from 'react';
// 1. Import your data
import { SERVICES, PRODUCTS, TESTIMONIALS } from '../data/constants';
// 2. Import shared UI ornaments
import { FloatingOrbs, OrnaDivider } from '../components/Shared';

const HomePage = ({ setPage }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Ensuring the fade-in effect triggers correctly
    const timer = setTimeout(() => setVisible(true), 100);
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(t);
    };
  }, []);

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(145deg, #e2e2e0 0%, #ebebd600 50%, #f5f7ec 100%)',
        overflow: 'hidden',
      }}>
        <FloatingOrbs />
        <div style={{
          position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'Cormorant Garamond', fontSize: 'clamp(6rem, 10vw, 20rem)',
          color: 'rgba(125, 131, 74, 0.06)', fontWeight: 400, lineHeight: 1,
          userSelect: 'none', letterSpacing: '-0.02em', pointerEvents: 'none',
        }}>Mehandi</div>

        <div style={{
          position: 'absolute', right: '12%', top: '50%', transform: 'translateY(-55%)',
          width: 'min(350px, 35vw)', height: 'min(350px, 35vw)',
          background: 'radial-gradient(circle, rgba(200,146,42,0.12) 0%, transparent 70%)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'min(140px, 13vw)',
          animation: 'float 6s ease-in-out infinite',
        }}>🌿</div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '120px 40px 80px', width: '100%' }}>
          <div style={{ maxWidth: 600, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'transform 0.8s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 30, height: 1, background: 'var(--copper)' }} />
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.35em', color: 'var(--copper)', textTransform: 'uppercase' }}>Est. 2018 · Guntur </span>
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond', fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 400, lineHeight: 1.05, color: 'var(--brown)', marginBottom: 28,
            }}>
              Where Art Meets<br />
              <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>Tradition</em>
            </h1>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--warm-gray)', marginBottom: 44, maxWidth: 480, letterSpacing: '0.03em' }}>
              Premium mehandi artistry, bridal beauty services, and curated henna products — crafted with love, delivered with grace.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => setPage('booking')}>Book Appointment</button>
              <button className="btn-outline" onClick={() => setPage('services')}>Explore Services</button>
            </div>

            <div style={{ display: 'flex', gap: 40, marginTop: 56 }}>
              {[['500+', 'Happy Brides'], ['8+', 'Years of Art'], ['15+', 'Design Styles']].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', fontWeight: 500, color: 'var(--copper)' }}>{n}</div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--warm-gray)', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brown)' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'var(--copper)', animation: 'pulse 2s ease infinite' }} />
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <div style={{ background: 'var(--brown)', padding: '14px 0', overflow: 'hidden' }}>
        <div className="marquee-inner" style={{ display: 'flex', gap: 60 }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ display: 'flex', gap: 60, color: 'rgba(249,244,238,0.7)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              <span>✦ Bridal Mehandi</span>
              <span>✦ Makeup Application</span>
              <span>✦ Saree Draping</span>
              <span>✦ Nail Art</span>
              <span>✦ Saree Pre-Plating</span>
              <span>✦ Mehandi Products</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: '100px 40px', maxWidth: 1200, margin: '0 auto' }} className="henna-bg">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 12 }}>What We Offer</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--brown)', lineHeight: 1.2 }}>
            Our <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Signature</em> Services
          </h2>
          <OrnaDivider />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {SERVICES.map((svc, i) => (
            <div key={svc.id} className="card-hover"
              onClick={() => setPage('booking')}
              style={{
                background: svc.gradient,
                border: '1px solid var(--border)',
                padding: '36px 24px', cursor: 'pointer',
                animation: `fadeUp 0.6s ease ${i * 0.1}s both`,
              }}>
              <div style={{ marginBottom: 16 }}>
                {/* --- IMAGE UPDATED --- */}
                <img src={svc.icon} alt={svc.name} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 6 }}>{svc.subtitle}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.35rem', fontWeight: 500, color: 'var(--brown)', marginBottom: 12 }}>{svc.name}</h3>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.7, color: 'var(--warm-gray)', marginBottom: 20 }}>{svc.description.slice(0, 80)}…</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', color: 'var(--copper)' }}>₹{svc.price.toLocaleString()}</span>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--warm-gray)' }}>{svc.duration} min</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button className="btn-outline" onClick={() => setPage('services')}>View All Services</button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--brown)', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(200,146,42,1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: 'rgba(200,146,42,0.8)', textTransform: 'uppercase', marginBottom: 12 }}>Client Love</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: 48 }}>
            Words That <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Inspire Us</em>
          </h2>

          <div style={{ position: 'relative', minHeight: 180 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                position: i === 0 ? 'relative' : 'absolute', inset: 0,
                opacity: i === activeTestimonial ? 1 : 0,
                transition: 'opacity 0.6s ease',
                pointerEvents: i === activeTestimonial ? 'auto' : 'none',
              }}>
                <div className="stars" style={{ marginBottom: 20 }}>{'★'.repeat(t.stars)}</div>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontStyle: 'italic', color: 'rgba(249,244,238,0.85)', lineHeight: 1.8, marginBottom: 28 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>{t.initials}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: 'var(--cream)', fontWeight: 400 }}>{t.name}</div>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(200,146,42,0.7)', textTransform: 'uppercase' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32 }}>
            {TESTIMONIALS.map((_, i) => (
              <div key={i} onClick={() => setActiveTestimonial(i)}
                style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, background: i === activeTestimonial ? 'var(--gold)' : 'rgba(200,146,42,0.3)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </section>

      {/* SHOP TEASER */}
      <section style={{ padding: '100px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 12 }}>Mehandi Essentials</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--brown)', lineHeight: 1.2, marginBottom: 24 }}>
              Shop Our <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Curated</em> Collection
            </h2>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.9, color: 'var(--warm-gray)', marginBottom: 36 }}>
              Premium henna products, professional tools, and beauty accessories — sourced and trusted by our artists.
            </p>
            <button className="btn-primary" onClick={() => setPage('shop')}>Shop Now</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <div key={p.id} className="card-hover"
                style={{ background: 'white', border: '1px solid var(--border)', padding: '20px 16px', animation: `fadeUp 0.6s ease ${i * 0.1}s both` }}>
                <div style={{ marginBottom: 12 }}>
                  {}
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1rem', fontWeight: 500, color: 'var(--brown)', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--copper)' }}>₹{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--copper), var(--brown))',
        padding: '80px 40px', textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
          Ready for Your <em>Beautiful Day?</em>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.92)', marginBottom: 36, letterSpacing: '0.05em' }}>
          Book your appointment today — bridal slots fill up fast!
        </p>
        <button className="btn-primary" onClick={() => setPage('booking')}
          style={{ background: 'white', color: 'var(--brown)' }}>
          Book My Appointment
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--deep)', padding: '60px 40px 30px', color: 'rgba(249,244,238,0.6)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', fontWeight: 500, color: 'var(--cream)', marginBottom: 8 }}>
              Mehandi <span style={{ color: 'var(--gold)' }}>By</span> yasaswini
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.8 }}>Bringing the ancient art of henna into the modern world.</p>
          </div>
          {[
            { title: 'Services', links: ['Mehandi Design', 'Makeup', 'Saree Draping', 'Nail Art', 'Pre-Plating'] },
            { title: 'Quick Links', links: ['Book Now', 'Shop Products', 'About Us', 'Contact'] },
            { title: 'Contact', links: ['📍 Guntur, AP', '📞 +91 6309844678', '💌  manam.yasaswini125730@gmail.com'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{col.title}</h4>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: '0.8rem', marginBottom: 8, lineHeight: 1.6 }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, fontSize: '0.7rem', letterSpacing: '0.1em', textAlign: 'center' }}>
          © 2018 Mehandi by yasaswini · All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

// 3. The essential Export statement
export default HomePage;