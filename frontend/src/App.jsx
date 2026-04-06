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


const App = () => {
  // State Management
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [toast, setToast] = useState(null);

  // Helper to trigger notifications
  const showToast = (msg) => setToast(msg);

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
      <Navbar page={page} setPage={setPage} cartCount={cartCount} />

      {/* Page Routing Logic */}
      <div className="page-enter" key={page}>
        {page === 'home' && <HomePage setPage={setPage} />}
        
        {page === 'services' && (
          <ServicesPage setPage={setPage} setSelectedService={setSelectedService} />
        )}
        
        {page === 'booking' && (
          <BookingPage 
            selectedService={selectedService} 
            setSelectedService={setSelectedService} 
            showToast={showToast} 
          />
        )}
        
        {/* --- NEW ROUTE: MANAGE APPOINTMENTS --- */}
        {page === 'manage' && (
          <ManageBookings showToast={showToast} setPage={setPage} />
        )}
        
        {page === 'shop' && (
          <ShopPage cart={cart} setCart={setCart} showToast={showToast} />
        )}
        
        {page === 'cart' && (
          <CartPage cart={cart} setCart={setCart} showToast={showToast} />
        )}
        
        {page === 'about' && <AboutPage setPage={setPage} />}
      </div>

      {/* Global Toast Notification */}
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </div>
  );
};

export default App;