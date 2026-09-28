import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, Bookmark, PlusCircle, User, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, role } = useAuth();

  const currentPath = location.pathname;

  const getProfilePath = () => {
    if (!currentUser) return '/register';
    if (role === 'partner') return `/food-partner/${currentUser._id || 'my-partner-id'}`;
    return '/register';
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '440px',
      zIndex: 100,
      background: 'rgba(15, 18, 28, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '28px',
      padding: '8px 16px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      alignItems: 'center',
      justifyItems: 'center',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)'
    }}>
      {/* Home Feed */}
      <button 
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          color: currentPath === '/' ? '#FF5E3B' : '#9AA0B4',
          display: 'flex',
          width: '100%',
          minWidth: 0,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          fontSize: '0.72rem',
          fontWeight: currentPath === '/' ? '700' : '500',
          transition: 'all 0.2s ease'
        }}
      >
        <Flame size={22} color={currentPath === '/' ? '#FF5E3B' : '#9AA0B4'} />
        <span>Reels</span>
      </button>

      {/* Saved */}
      <button 
        onClick={() => navigate('/saved')}
        style={{
          background: 'none',
          border: 'none',
          color: currentPath === '/saved' ? '#FF5E3B' : '#9AA0B4',
          display: 'flex',
          width: '100%',
          minWidth: 0,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          fontSize: '0.72rem',
          fontWeight: currentPath === '/saved' ? '700' : '500',
          transition: 'all 0.2s ease'
        }}
      >
        <Bookmark size={22} color={currentPath === '/saved' ? '#FF5E3B' : '#9AA0B4'} />
        <span>Saved</span>
      </button>

      {/* Create Food (Partner special icon) */}
      <button 
        onClick={() => navigate('/create-food')}
        style={{
          background: 'linear-gradient(135deg, #FF5E3B 0%, #FF9500 100%)',
          border: 'none',
          color: '#FFF',
          width: '42px',
          height: '42px',
          justifySelf: 'center',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(255, 94, 59, 0.4)',
          transform: currentPath === '/create-food' ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.2s ease'
        }}
      >
        <PlusCircle size={24} color="#FFF" />
      </button>

      {/* Profile / Account */}
      <button 
        onClick={() => navigate(getProfilePath())}
        style={{
          background: 'none',
          border: 'none',
          color: currentPath.includes('/food-partner/') || currentPath === '/register' ? '#FF5E3B' : '#9AA0B4',
          display: 'flex',
          width: '100%',
          minWidth: 0,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          fontSize: '0.72rem',
          fontWeight: currentPath.includes('/food-partner/') || currentPath === '/register' ? '700' : '500',
          transition: 'all 0.2s ease'
        }}
      >
        {role === 'partner' ? (
          <Store size={22} color={currentPath.includes('/food-partner/') ? '#FF5E3B' : '#9AA0B4'} />
        ) : (
          <User size={22} color={currentPath === '/register' ? '#FF5E3B' : '#9AA0B4'} />
        )}
        <span>{role === 'partner' ? 'Store' : (currentUser ? 'Account' : 'Login')}</span>
      </button>
    </div>
  );
};

export default BottomNav;
