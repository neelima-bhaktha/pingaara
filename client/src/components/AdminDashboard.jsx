import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function AdminDashboard({ token, onLogout }) {
  const [menuItems, setMenuItems] = useState([]);
  const [galleryPosts, setGalleryPosts] = useState([]);
  const [view, setView] = useState('menu'); // 'menu' or 'gallery'
  
  // Menu Form State
  const [menuName, setMenuName] = useState('');
  const [menuDesc, setMenuDesc] = useState('');
  const [menuPrice, setMenuPrice] = useState(0);
  const [menuCategory, setMenuCategory] = useState('');

  const fetchMenu = async () => {
    const res = await fetch('/api/menu');
    const data = await res.json();
    if(res.ok) setMenuItems(data);
  };

  const fetchGallery = async () => {
    const res = await fetch('/api/gallery/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if(res.ok) setGalleryPosts(data);
  };

  useEffect(() => {
    fetchMenu();
    fetchGallery();
  }, []);

  const handleAddMenu = async (e) => {
    e.preventDefault();
    await fetch('/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: menuName,
        description: menuDesc,
        price: menuPrice,
        category: menuCategory
      })
    });
    setMenuName(''); setMenuDesc(''); setMenuPrice(0); setMenuCategory('');
    fetchMenu();
  };

  const handleDeleteMenu = async (id) => {
    await fetch(`/api/menu/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchMenu();
  };

  const handleApproveGallery = async (id) => {
    await fetch(`/api/gallery/${id}/approve`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchGallery();
  };

  const handleDeleteGallery = async (id) => {
    await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchGallery();
  };

  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh', color: 'white', fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div style={{ paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '100px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#EAE202', fontSize: '3rem' }}>Admin Dashboard</h1>
          <button onClick={onLogout} style={btnDanger}>Logout</button>
        </div>

        <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
          <button onClick={() => setView('menu')} style={view === 'menu' ? btnActive : btnInactive}>Manage Menu</button>
          <button onClick={() => setView('gallery')} style={view === 'gallery' ? btnActive : btnInactive}>Moderate Gallery</button>
        </div>

        {view === 'menu' && (
          <div>
            <div style={panelStyle}>
              <h3 style={{marginBottom:'10px', color:'#EAE202'}}>Add New Menu Item</h3>
              <form onSubmit={handleAddMenu} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input placeholder="Name" value={menuName} onChange={e => setMenuName(e.target.value)} required style={inputStyle} />
                <input placeholder="Description" value={menuDesc} onChange={e => setMenuDesc(e.target.value)} required style={inputStyle} />
                <input type="number" placeholder="Price" value={menuPrice} onChange={e => setMenuPrice(e.target.value)} style={{...inputStyle, width: '80px'}} />
                <input placeholder="Category" value={menuCategory} onChange={e => setMenuCategory(e.target.value)} required style={{...inputStyle, width: '120px'}} />
                <button type="submit" style={btnApprove}>Add Item</button>
              </form>
            </div>

            <div style={panelStyle}>
              <h3 style={{marginBottom:'15px', color:'#EAE202'}}>Current Menu Items</h3>
              {menuItems.map(item => (
                <div key={item._id} style={listItemStyle}>
                  <div>
                    <strong style={{color:'#EAE202', letterSpacing:'1px', fontSize:'1.1rem'}}>{item.name}</strong> - {item.description} ({item.category}) Let ₹{item.price}
                  </div>
                  <button onClick={() => handleDeleteMenu(item._id)} style={btnDanger}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'gallery' && (
          <div>
             <div style={panelStyle}>
              <h3 style={{marginBottom:'15px', color:'#EAE202'}}>Pending & Live Gallery Posts</h3>
              {galleryPosts.length === 0 && <p>No posts yet.</p>}
              {galleryPosts.map(post => (
                <div key={post._id} style={{ ...listItemStyle, alignItems: 'flex-start' }}>
                  <img src={post.imageUrl} alt="User Upload" style={{ width: '150px', height:'150px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, marginLeft: '20px' }}>
                    <p style={{fontSize:'1.2rem', color:'#EAE202'}}><strong>{post.customerName}</strong></p>
                    <p style={{margin: '10px 0', fontStyle: 'italic'}}>"{post.feedbackText}"</p>
                    <p style={{ color: post.isApproved ? '#4ade80' : '#facc15', fontWeight:'bold' }}>
                      Status: {post.isApproved ? 'LIVE' : 'PENDING APPROVAL'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {!post.isApproved && (
                      <button onClick={() => handleApproveGallery(post._id)} style={btnApprove}>Approve</button>
                    )}
                    <button onClick={() => handleDeleteGallery(post._id)} style={btnDanger}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white', flex: 1 };
const panelStyle = { backgroundColor: '#000A48', padding: '30px', borderRadius: '12px', marginBottom: '20px' };
const listItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a202c', padding: '15px', borderRadius: '8px', marginBottom: '10px', border: '1px solid #2d3748' };

const btnApprove = { backgroundColor: '#EAE202', color: '#000A48', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const btnDanger = { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const btnActive = { ...btnApprove };
const btnInactive = { backgroundColor: '#4a5568', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
