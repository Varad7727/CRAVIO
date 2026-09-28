import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Store, ArrowRight, Flame } from 'lucide-react';

const ChooseRegister = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-view" style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 24px',
      justifyContent: 'space-between',
      background: 'radial-gradient(circle at top, #1E1728 0%, #090A0F 100%)'
    }}>
      {/* Top Brand Header */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: 'var(--accent-glow)'
        }}>
          <Flame size={36} color="#FFF" />
        </div>
        <h1 className="heading-lg" style={{ marginBottom: '8px' }}>
          Welcome to <span className="gradient-text">CRAVIO</span>
        </h1>
        <p style={{ color: '#9AA0B4', fontSize: '0.95rem' }}>
          Choose how you want to get started
        </p>
      </div>

      {/* Role Selection Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Customer / User Option */}
        <div 
          onClick={() => navigate('/user/register')}
          className="glass-card"
          style={{
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 94, 59, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 94, 59, 0.15)',
            borderRadius: '50%',
            filter: 'blur(20px)'
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(255, 94, 59, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5E3B'
            }}>
              <UtensilsCrossed size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#FFF', marginBottom: '4px' }}>
                Foodie Account
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9AA0B4' }}>
                Discover delicious reels, save dishes & order from local partners.
              </p>
            </div>
            <ArrowRight size={20} color="#FF5E3B" />
          </div>
        </div>

        {/* Food Partner / Restaurant Option */}
        <div 
          onClick={() => navigate('/food-partner/register')}
          className="glass-card"
          style={{
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 149, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 149, 0, 0.15)',
            borderRadius: '50%',
            filter: 'blur(20px)'
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(255, 149, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF9500'
            }}>
              <Store size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#FFF', marginBottom: '4px' }}>
                Food Partner Studio
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9AA0B4' }}>
                Post mouthwatering food reels, promote dishes & grow your business.
              </p>
            </div>
            <ArrowRight size={20} color="#FF9500" />
          </div>
        </div>
      </div>

      {/* Footer Logins */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <p style={{ fontSize: '0.9rem', color: '#9AA0B4' }}>
          Already registered?{' '}
          <span 
            onClick={() => navigate('/user/login')}
            style={{ color: '#FF5E3B', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
          >
            User Login
          </span>
          {' '}•{' '}
          <span 
            onClick={() => navigate('/food-partner/login')}
            style={{ color: '#FF9500', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Partner Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChooseRegister;
