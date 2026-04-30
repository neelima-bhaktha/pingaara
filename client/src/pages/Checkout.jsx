import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { user, loading } = useAuth();
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (loading) return <div style={fullScreenCenter}>Loading...</div>;

  if (!user || user.role !== 'customer') {
    return <Navigate to="/login" replace />;
  }

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div style={fullScreenCenter}>
        <Navbar />
        <div style={successCard}>
          <h2 style={successTitle}>Payment Successful!</h2>
          <p style={successText}>Your order has been received and our kitchen is preparing it.</p>
          <button onClick={() => navigate('/order')} style={btnPrimary}>Return to Menu</button>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh', color: 'white', fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div style={{ paddingTop: '100px', paddingBottom: '60px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Cart Summary Section */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={sectionTitle}>Your Order Summary</h2>
          
          <div style={panel}>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {cart.map((item, index) => (
                  <div key={index} style={cartItemRow}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#EAE202' }}>
                        {item.name} {item.varietyName ? `(${item.varietyName})` : ''} x {item.quantity}
                      </p>
                      {item.note && <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', opacity: 0.8 }}>Note: {item.note}</p>}
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>₹{item.price * item.quantity}</span>
                      <button onClick={() => removeFromCart(index)} style={btnDangerSmall}>X</button>
                    </div>
                  </div>
                ))}
                
                <div style={totalRow}>
                  <span>Total Amount:</span>
                  <span>₹{total}</span>
                </div>
              </div>
            )}
            
            <Link to="/order" style={{ ...btnSecondary, display: 'inline-block', marginTop: '20px' }}>
              Back to Menu
            </Link>
          </div>
        </div>

        {/* Payment Section */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={sectionTitle}>Payment Details</h2>
          
          <div style={panel}>
            {cart.length === 0 ? (
              <p>Add items to your cart to checkout.</p>
            ) : (
              <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div>
                  <label style={labelStyle}>Payment Method</label>
                  <select 
                    value={paymentMethod} 
                    onChange={e => setPaymentMethod(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="card">Credit / Debit Card</option>
                    <option value="upi">UPI / QR Code</option>
                  </select>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label style={labelStyle}>Card Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX XXXX" required style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Expiry (MM/YY)</label>
                        <input type="text" placeholder="MM/YY" required style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>CVV</label>
                        <input type="password" placeholder="XXX" required style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Name on Card</label>
                      <input type="text" placeholder="Your Name" required style={inputStyle} />
                    </div>
                  </>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label style={labelStyle}>UPI ID</label>
                    <input type="text" placeholder="example@upi" required style={inputStyle} />
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  style={{ ...btnPrimary, marginTop: '10px', opacity: isProcessing ? 0.7 : 1 }}
                >
                  {isProcessing ? 'Processing Payment...' : `Pay ₹${total}`}
                </button>
              </form>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

const fullScreenCenter = { backgroundColor: '#1D5C26', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: "'Poppins', sans-serif" };
const sectionTitle = { fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: '#EAE202', marginBottom: '20px' };
const panel = { backgroundColor: '#000A48', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const successCard = { backgroundColor: '#000A48', padding: '50px', borderRadius: '12px', textAlign: 'center', maxWidth: '400px' };
const successTitle = { fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', color: '#EAE202', marginBottom: '15px' };
const successText = { fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.9 };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white', fontFamily: "'Poppins', sans-serif", outline: 'none', boxSizing: 'border-box' };
const cartItemRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' };
const totalRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: '#EAE202' };
const btnPrimary = { backgroundColor: '#EAE202', color: '#000A48', border: 'none', padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em', width: '100%' };
const btnSecondary = { backgroundColor: 'transparent', color: '#EAE202', border: '1px solid #EAE202', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', textAlign: 'center' };
const btnDangerSmall = { backgroundColor: '#ef4444', color: 'white', border: 'none', width: '25px', height: '25px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold' };
