import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Flame, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const { loginPartner } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your business email and password');
      const response=await axios.post('http://localhost:3000/api/auth/food-partner/login', { email, password }, {
        withCredentials: true
      });
      console.log(response.data);
      navigate('/create-food')
      return;
    }

    setLoading(true);
    try {
      const res = await loginPartner(email, password);
      if (res.status === 'failed' || res.message?.includes('Invalid')) {
        setError(res.message || 'Invalid partner email or password');
      } else {
        navigate('/create-food');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-view" style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      overflowY: 'auto',
      background: 'radial-gradient(circle at top right, #241A14 0%, #080A0E 100%)'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/register')}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={24} color="#FF9500" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.2rem', color: '#FFF' }}>
            Partner Studio
          </span>
        </div>
        <div style={{ width: '40px' }} />
      </div>

      {/* Main Title */}
      <div style={{ marginBottom: '28px' }}>
        <h2 className="heading-lg" style={{ marginBottom: '6px' }}>Partner Studio Login</h2>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          Access your food partner dashboard to post new reels.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{
          background: 'rgba(233, 30, 99, 0.15)',
          border: '1px solid #E91E63',
          color: '#FF7597',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '6px' }}>
            Business Email
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#FF9500" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="email" 
              placeholder="contact@bistro.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '46px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#6C7289" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '46px' }}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary" 
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '14px',
            background: 'linear-gradient(135deg, #FF9500 0%, #FF5E3B 100%)'
          }}
        >
          {loading ? 'Logging In...' : 'Log In to Studio'}
        </button>
      </form>

      {/* Switch to Register */}
      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          New food partner?{' '}
          <span 
            onClick={() => navigate('/food-partner/register')}
            style={{ color: '#FF9500', fontWeight: '700', cursor: 'pointer' }}
          >
            Register Business
          </span>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
