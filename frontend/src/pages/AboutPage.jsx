import React from 'react';
// Import the shared divider ornament
import { OrnaDivider } from '../components/Shared';

const AboutPage = ({ setPage }) => (
  <div style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--ivory)' }}>
    {/* Header Section */}
    <div style={{ textAlign: 'center', padding: '60px 40px 40px', background: 'linear-gradient(180deg, var(--cream) 0%, var(--ivory) 100%)' }}>
      <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--copper)', textTransform: 'uppercase', marginBottom: 12 }}>Our Story</div>
      <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--brown)' }}>
        About <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Us</em>
      </h1>
      <OrnaDivider />
    </div>

    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px 80px' }}>
      {/* Intro Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 80 }}>
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.5rem', fontWeight: 400, color: 'var(--brown)', marginBottom: 24, lineHeight: 1.2 }}>
            A Journey of Art & <em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Devotion</em>
          </h2>
          <p style={{ fontSize: '0.88rem', lineHeight: 2, color: 'var(--warm-gray)', marginBottom: 20 }}>
            Founded in 2022 in the heart of Guntur, Mehandi by yasaswini began as a small passion project — one artist's love for the ancient craft of henna.
          </p>
          <p style={{ fontSize: '0.88rem', lineHeight: 2, color: 'var(--warm-gray)', marginBottom: 32 }}>
            Today, we are a full-service beauty studio offering mehandi artistry, makeup, saree draping, and more.
          </p>
          <button className="btn-primary" onClick={() => setPage('booking')}>Book With Us</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { emoji: '🌿', title: 'Natural Materials', desc: 'We use only 100% natural, skin-safe henna and organic products.' },
            { emoji: '✨', title: '8+ Years of Art', desc: 'Over a decade of perfecting our craft across thousands of clients.' },
            { emoji: '👑', title: 'Bridal Experts', desc: 'Specialising in bridal packages for the most important day.' },
            { emoji: '❤️', title: 'Made with Love', desc: 'Every design, every look, every drape — crafted with genuine care.' },
          ].map((v, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border)', padding: '24px 20px', animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{v.emoji}</div>
              <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', color: 'var(--brown)', marginBottom: 8 }}>{v.title}</h4>
              <p style={{ fontSize: '0.75rem', lineHeight: 1.7, color: 'var(--warm-gray)' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Artists Section */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.2rem', color: 'var(--brown)', marginBottom: 12 }}>Meet Our <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>Artists</em></h2>
        <OrnaDivider />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 80 }}>
        {[
          { name: 'yasaswini', role: 'Founder & Lead Mehandi Artist', emoji: '🌿', exp: '10 Years', specialty: 'Bridal Mehandi' },
          { name: 'himaja', role: 'Senior Makeup Artist', emoji: '💄', exp: '7 Years', specialty: 'Bridal & HD Makeup' },
          { name: 'varshitha', role: 'Saree Draping Expert', emoji: '🥻', exp: '12 Years', specialty: 'All Regional Styles' },
          { name: 'Maduri', role: 'Nail Art Specialist', emoji: '💅', exp: '5 Years', specialty: '3D & Bridal Nail Art' },
        ].map((person, i) => (
          <div key={i} className="card-hover"
            style={{ background: 'white', border: '1px solid var(--border)', padding: '32px 24px', textAlign: 'center', animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cream), var(--copper))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 20px' }}>{person.emoji}</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: 4 }}>{person.name}</h3>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--copper)', marginBottom: 12 }}>{person.role}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              {[['⏱', person.exp], ['✦', person.specialty]].map(([icon, val]) => (
                <div key={val} style={{ fontSize: '0.68rem', color: 'var(--warm-gray)' }}>{icon} {val}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div style={{ background: 'var(--brown)', padding: '48px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', color: 'var(--cream)', marginBottom: 16 }}>Get in <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Touch</em></h3>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.9, color: 'rgba(249,244,238,0.65)', marginBottom: 24 }}>
            Have questions about services, pricing, or availability? We'd love to hear from you.
          </p>
          {[
            ['📍', 'Ramanapet  1st line, Guntur , Andhra Pradesh'],
            ['📞', '+91 6309844678'],
            ['💌', 'manam.yasaswini125730@gmail.com'],
            ['⏰', 'Mon–Sun: 9 AM to 7 PM'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: '0.82rem', color: 'rgba(249,244,238,0.75)' }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
        <div>
          <button className="btn-primary" onClick={() => setPage('booking')}
            style={{ background: 'var(--gold)', display: 'block', width: '100%', padding: '18px', textAlign: 'center', fontSize: '0.82rem', marginBottom: 12 }}>
            Book an Appointment ✦
          </button>
          <button className="btn-outline" onClick={() => setPage('shop')}
            style={{ display: 'block', width: '100%', padding: '17px', textAlign: 'center', fontSize: '0.82rem', borderColor: 'rgba(249,244,238,0.3)', color: 'var(--cream)' }}>
            Shop Products
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;