import React, { useState } from 'react';
import { X, Send, Heart } from 'lucide-react';

const CommentModal = ({ isOpen, onClose, foodName, _commentsCount }) => {
  const [comments, setComments] = useState([
    { id: 1, user: 'SavorExplorer', avatar: '👨‍🍳', text: 'This looks so delicious! Need to order this ASAP 😍', likes: 12, time: '2h ago' },
    { id: 2, user: 'Chef_Maya', avatar: '👩‍🍳', text: 'The crispiness on that crust is perfection ✨', likes: 8, time: '4h ago' },
    { id: 3, user: 'FoodieRahul', avatar: '🍕', text: 'Where is this restaurant located in the city?', likes: 4, time: '1d ago' },
  ]);

  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: 'You',
        avatar: '😋',
        text: newComment,
        likes: 0,
        time: 'Just now'
      },
      ...comments
    ]);
    setNewComment('');
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxHeight: '75%',
          background: '#131622',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.7)',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#F5F7FA' }}>Comments</h3>
            <span style={{ fontSize: '0.8rem', color: '#9AA0B4' }}>{foodName} • {comments.length} comments</span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Comment List */}
        <div className="hide-scrollbar" style={{
          padding: '16px 20px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {comments.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                {item.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#FFF' }}>{item.user}</span>
                  <span style={{ fontSize: '0.72rem', color: '#6C7289' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#D0D4E4', lineHeight: 1.4 }}>{item.text}</p>
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#6C7289',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}>
                <Heart size={14} />
                <span>{item.likes}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add Comment Input */}
        <form onSubmit={handleAddComment} style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: '#0D0F14',
          display: 'flex',
          gap: '10px'
        }}>
          <input 
            type="text" 
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input-field"
            style={{ borderRadius: '20px', padding: '10px 16px', fontSize: '0.88rem' }}
          />
          <button 
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #FF5E3B 0%, #FF9500 100%)',
              border: 'none',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              minWidth: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
