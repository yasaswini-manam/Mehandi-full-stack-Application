import React, { useEffect } from 'react';

// Floating orbs decoration
export const FloatingOrbs = () => (
  <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
    {[
      { w:300, h:300, top:'5%', left:'-5%', color:'rgba(200,146,42,0.08)', delay:0 },
      { w:200, h:200, top:'60%', right:'-3%', color:'rgba(181,98,42,0.07)', delay:2 },
      { w:150, h:150, top:'35%', left:'45%', color:'rgba(212,133,106,0.06)', delay:4 },
    ].map((orb, i) => (
      <div key={i} style={{
        position:'absolute', width:orb.w, height:orb.h,
        borderRadius:'50%', background:orb.color,
        top:orb.top, left:orb.left, right:orb.right,
        animation: `float ${6+i}s ease-in-out ${orb.delay}s infinite`,
        filter:'blur(40px)',
      }} />
    ))}
  </div>
);

// Ornamental divider
export const OrnaDivider = ({ label }) => (
  <div style={{ display:'flex', alignItems:'center', gap:20, margin:'0 auto', maxWidth:320 }}>
    <div style={{ flex:1, height:1, background:'var(--border)' }} />
    <span style={{ fontFamily:'Cormorant Garamond', fontSize:'1rem', color:'var(--gold)', letterSpacing:'0.1em' }}>{label || '✦'}</span>
    <div style={{ flex:1, height:1, background:'var(--border)' }} />
  </div>
);


export const Toast = ({ message, onHide }) => {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
  }, [onHide]);

  return <div className="toast">{message}</div>;
};