import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Phone, Star, Film, LogOut, ArrowLeft, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [partnerData, setPartnerData] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, role, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('reels');
  const routePartner = location.state?.foodPartner;
  const partnerAvatar = location.state?.partnerAvatar;
  const isValidPartnerId = /^[a-f\d]{24}$/i.test(id);
  const currentPartnerData = partnerData?.id === id ? partnerData : null;
  const profile = currentPartnerData?.profile;
  const partnerReels = currentPartnerData?.foodItems || [];
  const reelsLoading = isValidPartnerId && !currentPartnerData;
  const reelsError = currentPartnerData?.error || '';
  const currentMenuData = menuData?.id === id ? menuData : null;
  const restaurantMenu = currentMenuData?.menu || [];
  const menuLoading = isValidPartnerId && !currentMenuData;
  const menuError = currentMenuData?.error || '';

  useEffect(() => {
    let isCurrentRequest = true;

    if (!isValidPartnerId) return undefined;

    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        if (!isCurrentRequest) return;
        setPartnerData({
          id,
          profile: response.data.foodPartner,
          foodItems: response.data.foodItems || [],
        });
      })
      .catch((error) => {
        if (!isCurrentRequest) return;
        console.error('Failed to load food partner profile:', error);
        setPartnerData({
          id,
          profile: null,
          foodItems: [],
          error: 'Restaurant videos could not be loaded. Please try again later.',
        });
      });

    axios
      .get(`http://localhost:3000/api/food/partner/${id}/menu`, { withCredentials: true })
      .then((response) => {
        if (!isCurrentRequest) return;
        setMenuData({ id, menu: response.data.menu || [] });
      })
      .catch((error) => {
        if (!isCurrentRequest) return;
        console.error('Failed to load restaurant menu:', error);
        setMenuData({
          id,
          menu: [],
          error: 'The menu could not be loaded. Please try again later.',
        });
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [id, isValidPartnerId]);
  const isOwnProfile = role === 'partner' && currentUser && currentUser._id === id;

  const partnerInfo = {
    name: profile?.name || routePartner?.name || (isOwnProfile && currentUser?.name) || 'Restaurant',
    contactName: profile?.contactName || routePartner?.contactName || currentUser?.contactName || 'Contact details unavailable',
    address: profile?.address || routePartner?.address || currentUser?.address || 'Location not provided',
    phone: profile?.phone || routePartner?.phone || currentUser?.phone || '',
    email: profile?.email || routePartner?.email || currentUser?.email || '',
    rating: '4.9',
    reviewCount: 340,
    avatar: partnerAvatar || '🍽️'
  };

  const handleLogout = async () => {
    await logout();
    navigate('/register');
  };

  return (
    <div className="mobile-view hide-scrollbar" style={{
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '100px',
      overflowY: 'auto',
      background: '#090A0F'
    }}>
      {/* Banner & Top Bar */}
      <div style={{
        position: 'relative',
        height: '180px',
        background: 'linear-gradient(135deg, #FF5E3B 0%, #FF9500 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} />
        </button>

        {isOwnProfile && (
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '6px 14px',
              color: '#FF7597',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        )}
      </div>

      {/* Restaurant Header Avatar & Details */}
      <div style={{ padding: '0 20px', marginTop: '-45px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: '#131622',
            border: '4px solid #090A0F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            {partnerInfo.avatar}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {partnerInfo.phone && (
              <a
                href={`tel:${partnerInfo.phone}`}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              >
                <Phone size={14} />
                Call
              </a>
            )}
          </div>
        </div>

        <div>
          <h1 className="heading-md" style={{ color: '#FFF', marginBottom: '4px' }}>
            {partnerInfo.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.82rem', color: '#9AA0B4', marginBottom: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FF9500', fontWeight: '700' }}>
              <Star size={14} fill="#FF9500" /> {partnerInfo.rating} ({partnerInfo.reviewCount})
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="#FF5E3B" /> {partnerInfo.address}
            </span>
          </div>
        </div>

        {/* Studio Action for owner */}
        {isOwnProfile && (
          <button
            onClick={() => navigate('/create-food')}
            className="btn-primary"
            style={{ width: '100%', marginTop: '12px', padding: '12px', fontSize: '0.9rem' }}
          >
            <Film size={18} />
            + Upload New Food Reel
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginTop: '20px',
        padding: '0 20px'
      }}>
        <button
          onClick={() => setActiveTab('reels')}
          style={{
            flex: 1,
            padding: '12px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'reels' ? '3px solid #FF5E3B' : '3px solid transparent',
            color: activeTab === 'reels' ? '#FF5E3B' : '#6C7289',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          Reels Grid ({partnerReels.length})
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          style={{
            flex: 1,
            padding: '12px 8px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'menu' ? '3px solid #FF5E3B' : '3px solid transparent',
            color: activeTab === 'menu' ? '#FF5E3B' : '#6C7289',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          Menu ({restaurantMenu.length})
        </button>
        <button
          onClick={() => setActiveTab('about')}
          style={{
            flex: 1,
            padding: '12px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'about' ? '3px solid #FF5E3B' : '3px solid transparent',
            color: activeTab === 'about' ? '#FF5E3B' : '#6C7289',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          Restaurant Info
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '20px' }}>
        {activeTab === 'reels' && (
          reelsLoading ? (
            <p style={{ color: '#9AA0B4', textAlign: 'center' }}>Loading restaurant videos…</p>
          ) : reelsError ? (
            <p role="status" style={{ color: '#FF9B83', textAlign: 'center' }}>{reelsError}</p>
          ) : partnerReels.length === 0 ? (
            <p style={{ color: '#9AA0B4', textAlign: 'center' }}>No videos uploaded yet.</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px'
            }}>
              {partnerReels.map((reel) => (
                <div
                  key={reel._id}
                  onClick={() => navigate('/')}
                  title={reel.name}
                  style={{
                    position: 'relative',
                    paddingTop: '140%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#1A1D2A',
                    cursor: 'pointer'
                  }}
                >
                  <video
                    src={reel.video}
                    muted
                    playsInline
                    preload="metadata"
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
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}>
                    <Play size={10} fill="#FFF" />
                    <span>{reel.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'menu' && (
          menuLoading ? (
            <p style={{ color: '#9AA0B4', textAlign: 'center' }}>Loading menu…</p>
          ) : menuError ? (
            <p role="status" style={{ color: '#FF9B83', textAlign: 'center' }}>{menuError}</p>
          ) : restaurantMenu.length === 0 ? (
            <p style={{ color: '#9AA0B4', textAlign: 'center' }}>No menu items available yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {restaurantMenu.map((item) => (
                <article
                  key={item._id}
                  className="glass-card"
                  style={{
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ color: '#FFF', fontSize: '0.95rem', fontWeight: '700' }}>{item.name}</h2>
                    {item.category && (
                      <p style={{ color: '#9AA0B4', fontSize: '0.75rem', marginTop: '2px' }}>{item.category}</p>
                    )}
                    {item.description && (
                      <p style={{
                        color: '#B0B5C6',
                        fontSize: '0.78rem',
                        lineHeight: 1.4,
                        marginTop: '5px',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden'
                      }}>
                        {item.description}
                      </p>
                    )}
                    <p style={{ color: '#FF9500', fontWeight: '700', fontSize: '0.85rem', marginTop: '7px' }}>
                      ₹{item.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!partnerInfo.phone}
                    onClick={() => {
                      if (partnerInfo.phone) window.location.href = `tel:${partnerInfo.phone}`;
                    }}
                    aria-label={`Order ${item.name} by calling the restaurant`}
                    title={partnerInfo.phone ? 'Call restaurant to order' : 'Restaurant phone number unavailable'}
                    style={{
                      flexShrink: 0,
                      border: 'none',
                      borderRadius: '10px',
                      padding: '9px 12px',
                      background: partnerInfo.phone ? 'var(--accent-gradient)' : '#343846',
                      color: '#FFF',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: partnerInfo.phone ? 'pointer' : 'not-allowed',
                      opacity: partnerInfo.phone ? 1 : 0.65
                    }}
                  >
                    Order
                  </button>
                </article>
              ))}
            </div>
          )
        )}

        {activeTab === 'about' && (
          <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#6C7289' }}>Manager / Chef</span>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFF' }}>{partnerInfo.contactName}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#6C7289' }}>Phone Contact</span>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFF' }}>{partnerInfo.phone || 'Not provided'}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#6C7289' }}>Business Email</span>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFF' }}>{partnerInfo.email || 'Not provided'}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#6C7289' }}>Location</span>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFF' }}>{partnerInfo.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
