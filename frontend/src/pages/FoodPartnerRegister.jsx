import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Mail, Lock, Phone, MapPin, User, ArrowLeft, Flame, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const { registerPartner } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      const response=await axios.post('http://localhost:3000/api/auth/food-partner/register', formData, {
        withCredentials: true
      });
      console.log(response.data);
      return;
    }

    setLoading(true);
    try {
      const res = await registerPartner(formData);
      if (res.status === 'failed' || res.message?.includes('already exists')) {
        setError(res.message || 'Partner account already exists');
      } else {
        navigate('/create-food');
      }
    } catch (err) {
      setError('Registration failed. Please check form details.');
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
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
      <div style={{ marginBottom: '20px' }}>
        <h2 className="heading-lg" style={{ marginBottom: '6px' }}>Register Your Business</h2>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          Join CRAVIO Studio to upload reels and attract nearby food lovers.
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
          marginBottom: '16px'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '4px' }}>
            Restaurant / Business Name
          </label>
          <div style={{ position: 'relative' }}>
            <Store size={18} color="#FF9500" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              name="name"
              placeholder="e.g. Bella Italia Bistro"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              style={{ paddingLeft: '46px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '4px' }}>
            Owner / Contact Person
          </label>
          <div style={{ position: 'relative' }}>
            <User size={18} color="#6C7289" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              name="contactName"
              placeholder="e.g. Chef Marco"
              value={formData.contactName}
              onChange={handleChange}
              className="input-field"
              style={{ paddingLeft: '46px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '4px' }}>
              Business Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#6C7289" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                name="email"
                placeholder="contact@bistro.com"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                style={{ paddingLeft: '42px', fontSize: '0.85rem' }}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '4px' }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} color="#6C7289" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="tel" 
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                style={{ paddingLeft: '42px', fontSize: '0.85rem' }}
              />
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '4px' }}>
            Location / Outlet Address
          </label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} color="#6C7289" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              name="address"
              placeholder="e.g. 42 Main St, Downtown Market"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              style={{ paddingLeft: '46px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '4px' }}>
            Account Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#6C7289" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
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
          {loading ? 'Registering Studio...' : 'Register Food Partner Studio'}
        </button>
      </form>

      {/* Switch to Login */}
      <div style={{ textAlign: 'center', marginTop: '24px', paddingBottom: '20px' }}>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem' }}>
          Already registered as a partner?{' '}
          <span 
            onClick={() => navigate('/food-partner/login')}
            style={{ color: '#FF9500', fontWeight: '700', cursor: 'pointer' }}
          >
            Partner Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
