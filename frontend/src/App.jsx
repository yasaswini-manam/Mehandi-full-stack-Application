import React, { useState, useEffect } from 'react';

// Import Styles
import { GlobalStyle } from './styles/GlobalStyles';

// Import Components
import Navbar from './components/Navbar';
import { Toast } from './components/Shared';

// Import Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';

// Placeholder for unimported/missing component
const ManageBookings = () => (
  <div style={{ paddingTop: 120, textAlign: 'center', minHeight: '100vh', background: 'var(--ivory)', color: 'var(--brown)' }}>
    <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.5rem' }}>Manage Appointments</h2>
    <p style={{ marginTop: 10, color: 'var(--warm-gray)' }}>This feature is coming soon.</p>
  </div>
);


const App = () => {
  // State Management
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedService, setSelectedService] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Helper to trigger notifications
  const showToast = (msg) => setToast(msg);

  // Custom setPage with auth interceptor
  const navigateTo = (targetPage) => {
    if ((targetPage === 'booking' || targetPage === 'manage' || targetPage === 'orders' || targetPage === 'cart') && !currentUser) {
      setRedirectPath(targetPage);
      showToast(targetPage === 'cart' ? '🔑 Please register or login to place shopping orders.' : '🔑 Please register or login to continue.');
      setPage('auth');
    } else {
      setPage(targetPage);
    }
  };

  // Scroll to top automatically when switching pages
  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [page]);

  // Calculate total items in the cart
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div>
      {/* Inject Global CSS Variables and Animations */}
      <GlobalStyle />

      {/* Main Navigation */}
      <Navbar 
        page={page} 
        setPage={navigateTo} 
        cartCount={cartCount} 
        wishlistCount={wishlist.length}
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        showToast={showToast} 
      />

      {/* Page Routing Logic */}
      <div className="page-enter" key={page}>
        {page === 'home' && <HomePage setPage={navigateTo} />}
        
        {page === 'services' && (
          <ServicesPage setPage={navigateTo} setSelectedService={setSelectedService} />
        )}
        
        {page === 'booking' && (
          <BookingPage 
            selectedService={selectedService} 
            setSelectedService={setSelectedService} 
            showToast={showToast} 
            currentUser={currentUser}
          />
        )}
        
        {/* --- NEW ROUTE: MANAGE APPOINTMENTS --- */}
        {page === 'manage' && (
          <ManageBookings showToast={showToast} setPage={navigateTo} />
        )}
        
        {page === 'shop' && (
          <ShopPage cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showToast={showToast} />
        )}
        
        {page === 'cart' && (
          <CartPage cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showToast={showToast} currentUser={currentUser} />
        )}

        {page === 'wishlist' && (
          <WishlistPage wishlist={wishlist} setWishlist={setWishlist} setPage={navigateTo} cart={cart} setCart={setCart} showToast={showToast} />
        )}
        
        {page === 'about' && <AboutPage setPage={navigateTo} />}

        {page === 'orders' && (
          <OrderHistoryPage currentUser={currentUser} setPage={navigateTo} showToast={showToast} />
        )}

        {page === 'auth' && (
          <AuthPage 
            setCurrentUser={setCurrentUser} 
            showToast={showToast} 
            setPage={setPage} 
            redirectPath={redirectPath} 
          />
        )}
      </div>

      {/* Global Toast Notification */}
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </div>
  );
};

export default App;