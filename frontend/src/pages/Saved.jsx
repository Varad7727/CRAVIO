import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Play, Utensils, Trash2, ArrowLeft, ExternalLink } from 'lucide-react';

const DEMO_SAVED_FALLBACK = [
  {
    _id: 'demo-reel-1',
    name: 'Artisanal Sourdough Truffle Pizza',
    description: 'Crispy wood-fired sourdough crust topped with fresh mozzarella & black truffle.',
    price: '499',
    category: 'Italian',
    partnerName: 'La Truffe Pizzeria',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-pizza-42777-large.mp4',
    partnerAvatar: '🍕'
  },
  {
    _id: 'demo-reel-3',
    name: 'Matcha Boba Pancake Tower',
    description: 'Fluffy Japanese souffle pancakes stacked high with organic Uji matcha cream.',
    price: '290',
    category: 'Desserts',
    partnerName: 'Tokyo Sweet Cafe',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-maple-syrup-on-pancakes-42999-large.mp4',
    partnerAvatar: '🥞'
  }
];

const Saved = () => {
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('foodreel_saved_items');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedItems(parsed.length > 0 ? parsed : DEMO_SAVED_FALLBACK);
    } else {
      setSavedItems(DEMO_SAVED_FALLBACK);
    }
  }, []);

  const handleRemove = (id, e) => {
    e.stopPropagation();
    const updated = savedItems.filter(item => (item._id || item.id) !== id);
    setSavedItems(updated);
    localStorage.setItem('foodreel_saved_items', JSON.stringify(updated));
  };

  const categories = ['All', 'Italian', 'Burgers', 'Desserts', 'Spicy'];

  const filteredItems = activeCategory === 'All' 
    ? savedItems 
    : savedItems.filter(item => item.category?.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="mobile-view hide-scrollbar" style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px 100px 20px',
      overflowY: 'auto',
      background: '#090A0F'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="heading-md" style={{ color: '#FFF' }}>Saved Reels</h1>
        </div>
        <span className="glass-pill" style={{ borderColor: '#FF9500', color: '#FF9500' }}>
          <Bookmark size={14} />
          {savedItems.length} Dishes
        </span>
      </div>

      {/* Category Pills */}
      <div className="hide-scrollbar" style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        marginBottom: '24px',
        paddingBottom: '4px'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.06)',
              color: activeCategory === cat ? '#FFF' : '#9AA0B4',
              border: '1px solid',
              borderColor: activeCategory === cat ? '#FF5E3B' : 'rgba(255,255,255,0.12)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Saved Cards Grid */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#6C7289' }}>
          <Utensils size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <p style={{ fontSize: '0.95rem' }}>No saved food reels in this category.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px'
        }}>
          {filteredItems.map((item, idx) => (
            <div
              key={item._id || idx}
              onClick={() => setSelectedVideo(item)}
              className="glass-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '18px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Thumbnail Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '130%',
                background: '#1A1D2A'
              }}>
                <video
                  src={item.video}
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={(e) => handleRemove(item._id || item.id, e)}
                >
                  <Trash2 size={14} color="#FF5E3B" />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Play size={14} color="#FFF" fill="#FFF" />
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.partnerName || 'Food Partner'}
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div style={{ padding: '10px 12px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#FFF', marginBottom: '4px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {item.name}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FF5E3B' }}>
                    ₹{item.price || '299'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#9AA0B4' }}>
                    {item.category || 'Dish'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Quick Preview Modal */}
      {selectedVideo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '380px',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <video
              src={selectedVideo.video}
              controls
              autoPlay
              style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
            />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF' }}>{selectedVideo.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#9AA0B4', margin: '6px 0 16px' }}>{selectedVideo.description}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    setSelectedVideo(null);
                    navigate(`/food-partner/${selectedVideo.foodPartner?._id || 'partner-1'}`);
                  }}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={16} />
                  View Restaurant
                </button>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '0.88rem' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Saved;
