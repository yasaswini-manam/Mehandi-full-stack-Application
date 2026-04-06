import conesImg from '../assets/12cones.jpg';
import bookImg from '../assets/book.jpg';
import powderImg from '../assets/hennapowder.jpg';
import brushImg from '../assets/brushset.jpg';
import pinsImg from '../assets/safetypins.jpg';
import sprayImg from '../assets/spray.jpg';
import nailKitImg from '../assets/nailartkit.jpg';
import oilImg from '../assets/hennaoil.jpg';
import henna from '../assets/henna.jpg';
import makeupImg from '../assets/makeup1.jpg';
import sareImg from '../assets/sd2.jpg';
import nailImg from '../assets/na.jpg';
import spImg from '../assets/sp.jpg';

export const SERVICES = [
  {
    id: 1, slug: 'mehandi',
    name: 'Mehandi Design',
    subtitle: 'Henna Artistry',
    price: 1500,
    duration: 120,
    category: 'henna',
    icon: henna,
    color: '#7A8C6E',
    gradient: 'linear-gradient(135deg, #7A8C6E22, #C8922A11)',
    description: 'Intricate traditional & fusion mehandi for weddings, engagements, and festivities. Bridal full hands, Arabic patterns, and custom designs.',
    features: ['Bridal Full Hand & Feet', 'Arabic & Rajasthani Patterns', 'Fusion Modern Designs', 'Natural Henna Paste'],
    images: ['🌿','🍃','✨'],
    timeSlots: ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
  },
  {
    id: 2, slug: 'makeup',
    name: 'Makeup Application',
    subtitle: 'Bridal & Party',
    price: 2500,
    duration: 90,
    category: 'beauty',
    icon: makeupImg,
    color: '#D4856A',
    gradient: 'linear-gradient(135deg, #D4856A22, #B5622A11)',
    description: 'Professional bridal makeup, party glam, and everyday looks. HD airbrush finish, long-lasting formulas, customized to your skin tone.',
    features: ['HD Airbrush Bridal', 'Party & Event Glam', 'Engagement Looks', 'Skin Tone Matching'],
    images: ['💄','✨','👑'],
    timeSlots: ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM']
  },
  {
    id: 3, slug: 'saree-draping',
    name: 'Saree Draping',
    subtitle: 'Elegant Styling',
    price: 800,
    duration: 30,
    category: 'styling',
    icon: sareImg,
    color: '#B5622A',
    gradient: 'linear-gradient(135deg, #B5622A22, #C8922A11)',
    description: 'Expert saree draping in all regional styles — Nivi, Bengali, Gujarati, Maharashtrian, Mermaid style, and more.',
    features: ['15+ Regional Styles', 'Bridal Draping', 'Modern Fusion Styles', 'Pin & Pleat Perfect'],
    images: ['🥻','✨','🌸'],
    timeSlots: ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
  },
  {
    id: 4, slug: 'nail-art',
    name: 'Nail Art',
    subtitle: 'Hand & Foot',
    price: 600,
    duration: 60,
    category: 'beauty',
    icon: nailImg,
    color: '#C8922A',
    gradient: 'linear-gradient(135deg, #C8922A22, #D4856A11)',
    description: 'Stunning nail art designs — floral, geometric, bridal mehandi-inspired, ombre, and 3D nail extensions.',
    features: ['Gel & Acrylic Extensions', 'Bridal Nail Art', 'Floral & Mehandi Motifs', 'Ombre & French'],
    images: ['💅','✨','🌸'],
    timeSlots: ['10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
  },
  {
    id: 5, slug: 'saree-preplating',
    name: 'Saree Pre-Plating',
    subtitle: 'Ready-to-Wear',
    price: 500,
    duration: 45,
    category: 'styling',
    icon: spImg,
    color: '#8C7B6E',
    gradient: 'linear-gradient(135deg, #8C7B6E22, #B5622A11)',
    description: 'Pre-stitched saree plating — beautifully pleated and ready to wear in minutes. Perfect for busy brides and event guests.',
    features: ['Pre-Stitched Pleats', 'All Fabric Types', 'Embroidered Sarees', 'Quick-Wear Design'],
    images: ['🎀','✨','🌺'],
    timeSlots: ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM']
  },
];

export const PRODUCTS = [
  { 
    id: 1, name: 'Premium Henna Cone Pack', price: 250, originalPrice: 320, 
    description: '12 professional-grade cones with natural henna', 
    category: 'henna', image: conesImg, badge: 'Bestseller' 
  },
  { 
    id: 2, name: 'Mehandi Design Book Vol.1', price: 450, originalPrice: null, 
    description: '200+ traditional & modern mehandi patterns', 
    category: 'books', image: bookImg, badge: 'New' 
  },
  { 
    id: 3, name: 'Natural Henna Powder', price: 180, originalPrice: 220, 
    description: '100% organic henna powder — 250g pack', 
    category: 'henna', image: powderImg, badge: 'Organic' 
  },
  { 
    id: 4, name: 'Professional Brush Set', price: 650, originalPrice: 850, 
    description: '15-piece premium makeup brush set', 
    category: 'makeup', image: brushImg, badge: 'Pro' 
  },
  { 
    id: 5, name: 'Saree Safety Pins (50pc)', price: 120, originalPrice: null, 
    description: 'Golden saree pins — rust-free stainless', 
    category: 'accessories', image: pinsImg, badge: null 
  },
  { 
    id: 6, name: 'Mehandi Fixer Spray', price: 280, originalPrice: 350, 
    description: 'Long-lasting mehandi colour seal spray', 
    category: 'henna', image: sprayImg, badge: 'Top Pick' 
  },
  { 
    id: 7, name: 'Nail Art Kit', price: 390, originalPrice: 500, 
    description: 'Complete DIY nail art starter kit', 
    category: 'nails', image: nailKitImg, badge: null 
  },
  { 
    id: 8, name: 'Henna Oil (Rose & Sandalwood)', price: 220, originalPrice: 280, 
    description: 'Aromatherapy oil that deepens henna colour', 
    category: 'henna', image: oilImg, badge: 'Loved' 
  },
];

export const TESTIMONIALS = [
  { name:'Priya Sharma', role:'Bride, Dec 2024', text:'yasaswini did my bridal mehandi and it was absolutely stunning. The design lasted for almost 3 weeks and everyone at the wedding complimented it!', stars:5, initials:'PS', color:'#D4856A' },
  { name:'Meera Reddy', role:'Event Guest', text:'Got makeup and saree draping done. The team was so professional and the makeup lasted all 8 hours of the function without touching up.', stars:5, initials:'MR', color:'#7A8C6E' },
  { name:'Anjali Patel', role:'Regular Customer', text:'The nail art here is incredible. Got mehandi-inspired nail designs for my sister\'s wedding — everyone asked who did them!', stars:5, initials:'AP', color:'#C8922A' },
  { name:'Sunita Rao', role:'Bride, Jan 2025', text:'Ordered the henna pack online and it arrived perfectly. The quality is so much better than anything I\'ve found locally.', stars:5, initials:'SR', color:'#B5622A' },
];
