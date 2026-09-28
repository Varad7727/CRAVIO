import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, CheckCircle2, AlertCircle, Utensils, Tag, DollarSign, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/apiClient';

const CreateFood = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Italian');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !description || !price || !category || !videoFile) {
      setError('Please provide the dish name, description, price, category, and video reel.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('video', videoFile);

      const res = await apiClient.createFood(formData);
      if (res.status !== 'Successful' || !res.food) {
        throw new Error(res.message || 'Food reel upload failed.');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Food reel upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auth Guard Banner if not logged in as Food Partner
  if (role !== 'partner') {
    return (
      <div className="mobile-view" style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 24px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, #251B14 0%, #090A0F 100%)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(255, 149, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF9500',
          marginBottom: '20px'
        }}>
          <Store size={32} />
        </div>
        <h2 className="heading-md" style={{ marginBottom: '10px' }}>Food Partner Login Required</h2>
        <p style={{ color: '#9AA0B4', fontSize: '0.9rem', marginBottom: '28px', lineHeight: 1.5 }}>
          Only registered Food Partners can post short food reels. Log in to your partner studio to start uploading.
        </p>
        <button 
          onClick={() => navigate('/food-partner/login')}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #FF9500 0%, #FF5E3B 100%)' }}
        >
          Login as Food Partner
        </button>
        <button 
          onClick={() => navigate('/food-partner/register')}
          className="btn-secondary"
          style={{ width: '100%', marginTop: '12px', padding: '14px' }}
        >
          Register Business
        </button>
      </div>
    );
  }

  return (
    <div className="mobile-view hide-scrollbar" style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px 100px 20px',
      overflowY: 'auto',
      background: 'radial-gradient(circle at top, #1F1728 0%, #080A0E 100%)'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate('/')}
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
        <h1 className="heading-md" style={{ color: '#FFF' }}>Post Food Reel</h1>
        <div style={{ width: '40px' }} />
      </div>

      {/* Success Notification */}
      {success && (
        <div style={{
          background: 'rgba(76, 175, 80, 0.15)',
          border: '1px solid #4CAF50',
          color: '#81C784',
          padding: '14px 18px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <CheckCircle2 size={22} color="#4CAF50" />
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Food Reel Created!</div>
            <div style={{ fontSize: '0.8rem' }}>Redirecting to live feed...</div>
          </div>
        </div>
      )}

      {/* Error Notification */}
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Drag & Drop Video Container */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#FFF', marginBottom: '8px' }}>
            Video File (Reel)
          </label>
          <div 
            onClick={() => document.getElementById('videoInput').click()}
            className="glass-card"
            style={{
              padding: videoPreview ? '0' : '36px 20px',
              textAlign: 'center',
              border: '2px dashed rgba(255, 94, 59, 0.4)',
              borderRadius: '20px',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <input 
              id="videoInput"
              type="file" 
              accept="video/*"
              onChange={handleVideoSelect}
              style={{ display: 'none' }}
            />

            {videoPreview ? (
              <div style={{ position: 'relative', width: '100%', paddingTop: '100%', background: '#000' }}>
                <video 
                  src={videoPreview} 
                  controls 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ) : (
              <div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(255, 94, 59, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#FF5E3B'
                }}>
                  <Upload size={28} />
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#FFF', marginBottom: '4px' }}>
                  Tap to upload Food Video
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9AA0B4' }}>
                  Supports MP4, MOV or WebM (Max 50MB)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dish Name */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '6px' }}>
            Dish Name
          </label>
          <div style={{ position: 'relative' }}>
            <Utensils size={18} color="#FF5E3B" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="e.g. Flaming Woodfire Lasagna"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '46px' }}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '6px' }}>
            Dish Description & Ingredients
          </label>
          <textarea 
            rows={3}
            placeholder="Describe the flavors, preparation style, and ingredients..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            style={{ resize: 'none' }}
          />
        </div>

        {/* Price & Category */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '6px' }}>
              Price (₹)
            </label>
            <div style={{ position: 'relative' }}>
              <DollarSign size={18} color="#FF9500" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="number" 
                placeholder="299"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="input-field"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#B0B5C6', marginBottom: '6px' }}>
              Cuisine / Tag
            </label>
            <div style={{ position: 'relative' }}>
              <Tag size={18} color="#6C7289" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="input-field"
                style={{ paddingLeft: '40px', appearance: 'none' }}
              >
                <option value="Italian" style={{ background: '#131622' }}>Italian</option>
                <option value="Burgers" style={{ background: '#131622' }}>Burgers</option>
                <option value="Desserts" style={{ background: '#131622' }}>Desserts</option>
                <option value="Asian Fusion" style={{ background: '#131622' }}>Asian Fusion</option>
                <option value="Indian Spiced" style={{ background: '#131622' }}>Indian Spiced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading || success}
          className="btn-primary" 
          style={{ width: '100%', marginTop: '12px', padding: '14px' }}
        >
          {loading ? 'Publishing Reel...' : 'Publish Food Reel'}
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
