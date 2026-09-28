import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Flame, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const UserLogin = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password');
      const response = await axios.post(
        'http://localhost:5173/user/login',
        { email, password },
        {
          withCredentials: true
        }
      );
      consoe.log(response.data)
      navigate('/')

      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.status === 'fail' || res.message?.includes('INVALID')) {
        setError(res.message || 'Invalid email or password');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Login failed. Please check credentials.');
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
      background: 'radial-gradient(circle at top right, #1F1424 0%, #080A0E 100%)'
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
          <Flame size={24} color="#FF5E3B" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.2rem', color: '#FFF' }}>
            CRAVIO
          </span>
        </div>
        <div style={{ width: '40px' }} />
      </div>

      {/* Main Title */}
      <div style={{ marginBottom: '28px' }}>
        <h2 className="heading-lg" style={{ marginBottom: '6px' }}>Welcome Back!</h2>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          Log in to your foodie account to access your saved reels.
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
            Email Address
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#6C7289" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              placeholder="alex@example.com"
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
          style={{ width: '100%', marginTop: '10px', padding: '14px' }}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      {/* Switch to Register */}
      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/user/register')}
            style={{ color: '#FF5E3B', fontWeight: '700', cursor: 'pointer' }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
