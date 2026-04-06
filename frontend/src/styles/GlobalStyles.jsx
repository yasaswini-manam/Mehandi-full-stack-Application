import React from 'react';

export const GlobalStyle = () => (
  <style>{`
    :root {
      --cream: #F9F4EE;
      --ivory: #FDF8F2;
      --deep: #1A0F0A;
      --brown: #3D1F0E;
      --copper: #B5622A;
      --gold: #C8922A;
      --rose: #D4856A;
      --sage: #7A8C6E;
      --warm-gray: #8C7B6E;
      --border: rgba(180,130,80,0.2);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--cream);
      color: var(--deep);
      font-family: 'Josefin Sans', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
    }
    h1,h2,h3,h4 {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 400;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--copper); border-radius: 10px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-12px) rotate(2deg); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes drawLine {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes pulse {
      0%,100% { opacity:0.6; transform:scale(1); }
      50%      { opacity:1;   transform:scale(1.05); }
    }

    .animate-fadeup { animation: fadeUp 0.7s ease forwards; }
    .animate-fadein { animation: fadeIn 0.5s ease forwards; }

    /* Ornament decorations */
    .ornament { color: var(--gold); font-size: 1.4rem; }

    /* Utility */
    .text-gold { color: var(--gold); }
    .text-copper { color: var(--copper); }
    .text-rose { color: var(--rose); }

    /* Page transitions */
    .page-enter {
      animation: fadeIn 0.4s ease forwards;
    }

    /* Henna pattern SVG background */
    .henna-bg {
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8922A' fill-opacity='0.06'%3E%3Cpath d='M30 0 C30 0 40 10 30 20 C20 10 30 0 30 0Z M0 30 C0 30 10 20 20 30 C10 40 0 30 0 30Z M60 30 C60 30 50 40 40 30 C50 20 60 30 60 30Z M30 60 C30 60 20 50 30 40 C40 50 30 60 30 60Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    /* Button styles */
    .btn-primary {
      display: inline-block;
      background: var(--copper);
      color: white;
      border: none;
      padding: 14px 36px;
      font-family: 'Josefin Sans', sans-serif;
      font-weight: 400;
      letter-spacing: 0.15em;
      font-size: 0.78rem;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }
    .btn-primary:hover { background: var(--brown); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(61,31,14,0.25); }
    .btn-primary:hover::after { transform: translateX(100%); }

    .btn-outline {
      display: inline-block;
      background: transparent;
      color: var(--copper);
      border: 1px solid var(--copper);
      padding: 13px 34px;
      font-family: 'Josefin Sans', sans-serif;
      font-weight: 400;
      letter-spacing: 0.15em;
      font-size: 0.78rem;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-outline:hover { background: var(--copper); color: white; }

    /* Card styles */
    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 50px rgba(61,31,14,0.12);
    }

    /* Nav */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 999;
      transition: all 0.4s ease;
    }
    nav.scrolled {
      background: rgba(249,244,238,0.96);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 var(--border);
    }

    /* Input styles */
    .form-input {
      width: 100%;
      padding: 14px 16px;
      background: white;
      border: 1px solid var(--border);
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.85rem;
      font-weight: 300;
      color: var(--deep);
      outline: none;
      transition: border-color 0.3s;
    }
    .form-input:focus { border-color: var(--copper); }
    .form-input::placeholder { color: var(--warm-gray); }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 30px; right: 30px;
      background: var(--brown);
      color: white;
      padding: 16px 24px;
      font-size: 0.82rem;
      letter-spacing: 0.05em;
      z-index: 9999;
      animation: fadeUp 0.4s ease;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    }

    /* Badge */
    .badge {
      display: inline-block;
      background: var(--copper);
      color: white;
      font-size: 0.6rem;
      width: 18px; height: 18px;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      letter-spacing: 0;
      font-weight: 600;
    }

    /* Divider ornament */
    .divider {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 20px 0;
    }
    .divider::before, .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* Scrolling text banner */
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .marquee-inner { animation: marquee 22s linear infinite; white-space: nowrap; }

    /* Stars */
    .stars { color: var(--gold); letter-spacing: 2px; font-size: 0.9rem; }

    /* Henna loader */
    .loader {
      width: 40px; height: 40px;
      border: 2px solid var(--border);
      border-top-color: var(--copper);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    /* Mobile responsive basics */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .mobile-full { width: 100% !important; }
    }
  `}
  </style>
);
