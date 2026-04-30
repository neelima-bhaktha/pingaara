import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Order() {
  const { user, loading } = useAuth();
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  
  const [menuItems, setMenuItems] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectedVarieties, setSelectedVarieties] = useState({});
  const [notes, setNotes] = useState({});

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setFetching(false);
      })
      .catch(err => {
        console.error("Error fetching menu:", err);
        setFetching(false);
      });
  }, []);

  const handleVarietyChange = (itemId, index) => {
    setSelectedVarieties(prev => ({
      ...prev,
      [itemId]: Number(index)
    }));
  };

  const handleNoteChange = (itemId, note) => {
    setNotes(prev => ({
      ...prev,
      [itemId]: note
    }));
  };

  if (loading) {
    return <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>Loading...</div>;
  }

  // Redirect to login if not logged in or not a customer
  if (!user || user.role !== 'customer') {
    return <Navigate to="/login" replace />;
  }

  const handleAddToCart = (item) => {
    const hasVarieties = item.varieties && item.varieties.length > 0;
    const selectedIdx = selectedVarieties[item._id] || 0;
    const itemNote = notes[item._id] || '';
    
    let itemPrice = item.price;
    let selectedVariety = null;
    
    if (hasVarieties) {
      selectedVariety = item.varieties[selectedIdx];
      itemPrice = selectedVariety.price;
    }
    
    addToCart(item, selectedVariety, itemNote, itemPrice, 1);
    
    // Clear the note after ordering
    setNotes(prev => ({...prev, [item._id]: ''}));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh', color: 'white', fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      
      {/* Sticky Checkout Header */}
      {totalItems > 0 && (
        <div style={{ 
          position: 'fixed', 
          top: '90px', 
          left: 0, 
          right: 0, 
          backgroundColor: '#000A48', 
          padding: '15px 40px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          zIndex: 90,
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontWeight: 'bold' }}>
            {totalItems} item(s) in cart
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            style={{
              backgroundColor: '#EAE202',
              color: '#000A48',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '999px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
            }}
          >
            View Cart & Checkout
          </button>
        </div>
      )}

      <div style={{ paddingTop: totalItems > 0 ? '160px' : '100px', paddingBottom: '60px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: '#EAE202' }}>
            Hello, {user.username}!
          </h2>
          <span style={{ backgroundColor: '#000A48', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
            Customer Dashboard
          </span>
        </div>

        <p style={{ marginBottom: '40px', fontSize: '1.1rem', opacity: 0.9 }}>
          What would you like to order today?
        </p>

        {fetching ? (
          <p>Loading menu...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {menuItems.map(item => {
              const hasVarieties = item.varieties && item.varieties.length > 0;
              const selectedIdx = selectedVarieties[item._id] || 0;
              const displayPrice = hasVarieties ? item.varieties[selectedIdx].price : item.price;

              return (
                <div key={item._id} style={{ 
                  backgroundColor: '#000A48', 
                  padding: '20px', 
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#EAE202', margin: 0, letterSpacing: '0.05em' }}>
                      {item.name}
                    </h3>
                    {item.description && (
                      <p style={{ margin: '5px 0 10px 0', fontSize: '0.9rem', opacity: 0.8 }}>
                        {item.description}
                      </p>
                    )}
                    
                    {hasVarieties && (
                      <div style={{ marginBottom: '10px' }}>
                        <select 
                          value={selectedIdx}
                          onChange={(e) => handleVarietyChange(item._id, e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            backgroundColor: '#1a202c',
                            color: 'white',
                            border: '1px solid #4a5568',
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.9rem',
                            outline: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            maxWidth: '250px'
                          }}
                        >
                          {item.varieties.map((v, idx) => (
                            <option key={idx} value={idx}>
                              {v.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div style={{ marginBottom: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="Add note (e.g. less spicy)..." 
                        value={notes[item._id] || ''}
                        onChange={(e) => handleNoteChange(item._id, e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '6px',
                          backgroundColor: '#1a202c',
                          color: 'white',
                          border: '1px solid #4a5568',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.85rem',
                          outline: 'none',
                          width: '100%',
                          maxWidth: '300px'
                        }}
                      />
                    </div>

                    {displayPrice && (
                      <p style={{ margin: '0', fontWeight: 'bold', color: '#EAE202', fontSize: '1.1rem' }}>
                        ₹{displayPrice}
                      </p>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    style={{
                      backgroundColor: '#EAE202',
                      color: '#000A48',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: 'uppercase',
                      fontSize: '0.85rem',
                      letterSpacing: '0.05em',
                      marginLeft: '10px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
            
            {menuItems.length === 0 && (
              <p style={{ textAlign: 'center', padding: '40px', backgroundColor: '#000A48', borderRadius: '12px' }}>
                No menu items available at the moment.
              </p>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}
