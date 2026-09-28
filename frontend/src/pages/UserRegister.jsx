import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft, Flame, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom'
const UserRegister = () => {
  const navigate = useNavigate();//used to navigate to different pages after successful registration
  const { registerUser } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const fullName=e.target.fullName.value;
    console.log(fullName);
    setError('');
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      const response = await axios.post('http://localhost:5173/user/register', { fullName, email, password },
        {
          withCredentials: true//used to send cookies along with the request, allowing the server to identify the user and maintain session state
        });

      console.log(response.data)
      
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(fullName, email, password);
      if (res.status === 'failed' || res.message?.includes('exist')) {
        setError(res.message || 'User already exists');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
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

      {/* Main Form Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 className="heading-lg" style={{ marginBottom: '6px' }}>Create Foodie Account</h2>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          Sign up to watch reels, save dishes, and discover local spots.
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '6px' }}>
            Full Name
          </label>
          <div style={{ position: 'relative' }}>
            <User size={18} color="#6C7289" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="e.g. Alex Johnson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '46px' }}
            />
          </div>
        </div>

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
          style={{ width: '100%', marginTop: '12px', padding: '14px' }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {/* Switch to Login */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/user/login')}
            style={{ color: '#FF5E3B', fontWeight: '700', cursor: 'pointer' }}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
