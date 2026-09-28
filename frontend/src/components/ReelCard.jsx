import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark, MessageCircle, Share2, Volume2, VolumeX, Play, MapPin, Tag, Utensils } from 'lucide-react';
import CommentModal from './CommentModal';

const ReelCard = ({ foodItem, isActive, onSaveToggle, isSavedInitial }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(foodItem.likes || 240);
  const [isSaved, setIsSaved] = useState(isSavedInitial || false);
  const [showComments, setShowComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Auto-play / pause based on active visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.log('Autoplay prevented:', err);
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const nextSavedState = !isSaved;
    setIsSaved(nextSavedState);
    if (onSaveToggle) {
      onSaveToggle(foodItem, nextSavedState);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: foodItem.name,
        text: `Check out ${foodItem.name} on CRAVIO!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const partnerId = foodItem.foodPartner?._id || foodItem.foodPartner || 'partner-demo';
  const partnerName = foodItem.foodPartner?.name || foodItem.partnerName || 'Restaurant';
  const partnerAddress = foodItem.foodPartner?.address || foodItem.address || foodItem.partnerAddress || 'Location not provided';
  const partnerAvatar = foodItem.partnerAvatar || '🍔';
  const openPartnerProfile = (event) => {
    event.stopPropagation();
    navigate(`/food-partner/${partnerId}`, {
      state: {
        foodPartner: typeof foodItem.foodPartner === 'object'
          ? foodItem.foodPartner
          : {
              _id: partnerId,
              name: partnerName,
              address: partnerAddress,
            },
        partnerAvatar,
      },
    });
  };

  return (
    <div className="reel-item" onClick={togglePlay}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={foodItem.video}
        loop
        playsInline
        muted={isMuted}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Play/Pause Overlay indicator when paused */}
      {!isPlaying && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.25)',
          pointerEvents: 'none'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Play size={32} color="#FFF" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      )}

      {/* Sound Toggle (Top Right) */}
      <button
        onClick={toggleMute}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 30,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
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
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Share Toast */}
      {showShareToast && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid var(--accent-primary)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600'
        }}>
          Link copied to clipboard!
        </div>
      )}

      {/* Right Sidebar Action Buttons */}
      <div style={{
        position: 'absolute',
        right: '16px',
        bottom: '120px',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center'
      }}>
        {/* Like Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={handleLike}
            className={`reel-action-btn ${isLiked ? 'active' : ''}`}
          >
            <Heart
              size={24}
              fill={isLiked ? '#FF5E3B' : 'none'}
              color={isLiked ? '#FF5E3B' : '#FFF'}
              className={isLiked ? 'animate-pulse-heart' : ''}
            />
          </button>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'white', marginTop: '4px' }}>
            {likeCount}
          </span>
        </div>

        {/* Comment Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
            className="reel-action-btn"
          >
            <MessageCircle size={24} color="#FFF" />
          </button>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'white', marginTop: '4px' }}>
            {foodItem.commentsCount || 18}
          </span>
        </div>

        {/* Save/Bookmark Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={handleSave}
            className={`reel-action-btn ${isSaved ? 'active' : ''}`}
          >
            <Bookmark
              size={24}
              fill={isSaved ? '#FF9500' : 'none'}
              color={isSaved ? '#FF9500' : '#FFF'}
            />
          </button>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'white', marginTop: '4px' }}>
            {isSaved ? 'Saved' : 'Save'}
          </span>
        </div>

        {/* Share Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={handleShare}
            className="reel-action-btn"
          >
            <Share2 size={24} color="#FFF" />
          </button>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'white', marginTop: '4px' }}>
            Share
          </span>
        </div>
      </div>

      {/* Bottom Information Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '0',
        right: '70px',
        padding: '20px',
        zIndex: 30,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Partner Header */}
        <div 
          onClick={openPartnerProfile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            width: 'fit-content'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF5E3B, #FF9500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            border: '2px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            {partnerAvatar}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#FFF' }}>{partnerName}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFollowing(!isFollowing);
                }}
                style={{
                  background: isFollowing ? 'rgba(255,255,255,0.2)' : 'var(--accent-gradient)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '3px 10px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {isFollowing ? 'Following' : '+ Follow'}
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B0B5C6', fontSize: '0.75rem' }}>
              <MapPin size={12} color="#FF9500" />
              <span>{partnerAddress}</span>
            </div>
          </div>
        </div>

        {/* Dish Title & Description */}
        <div style={{ marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>{foodItem.name}</h2>
            {foodItem.price && (
              <span className="glass-pill" style={{ background: 'rgba(255, 94, 59, 0.25)', borderColor: '#FF5E3B', color: '#FFF' }}>
                ₹{foodItem.price}
              </span>
            )}
          </div>
          <p style={{
            fontSize: '0.88rem',
            color: '#D0D4E4',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {foodItem.description}
          </p>
        </div>

        {/* Category tag */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
            <Utensils size={12} color="#FF5E3B" />
            {foodItem.category || 'Specialty Dish'}
          </span>
          <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
            <Tag size={12} color="#FF9500" />
            Freshly Made
          </span>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        foodName={foodItem.name}
        commentsCount={foodItem.commentsCount || 18}
      />
    </div>
  );
};

export default ReelCard;
