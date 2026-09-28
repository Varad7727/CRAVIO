import React, { useState, useEffect, useRef } from 'react';
import { Flame, Search, Filter } from 'lucide-react';
import ReelCard from '../components/ReelCard';
import { apiClient } from '../api/apiClient';

// Rich fallback food reels if backend contains no videos yet
const DEMO_REELS = [
  {
    _id: 'demo-reel-1',
    name: 'Artisanal Sourdough Truffle Pizza',
    description:
      'Crispy wood-fired sourdough crust topped with fresh mozzarella, black truffle oil, and wild forest mushrooms.',
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-pizza-42777-large.mp4',
    price: '499',
    category: 'Italian • Gourmet',
    partnerName: 'La Truffe Pizzeria',
    partnerAddress: 'Indiranagar • 0.8 km',
    partnerAvatar: '🍕',
    likes: 342,
    commentsCount: 24,
    foodPartner: {
      _id: 'partner-1',
      name: 'La Truffe Pizzeria',
      contactName: 'Marco Bellini',
      address: 'Indiranagar',
    },
  },

  {
    _id: 'demo-reel-2',
    name: 'Sizzling Smoked Wagyu Burger',
    description:
      'Juicy 200g smoked wagyu beef patty layered with aged cheddar, caramelized onion jam, and secret smoked mayo.',
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-making-a-hamburger-on-a-grill-42996-large.mp4',
    price: '380',
    category: 'American • Burgers',
    partnerName: 'Smokey Grillhouse',
    partnerAddress: 'Koramangala • 1.5 km',
    partnerAvatar: '🍔',
    likes: 512,
    commentsCount: 42,
    foodPartner: {
      _id: 'partner-2',
      name: 'Smokey Grillhouse',
      contactName: 'Arjun Mehta',
      address: 'Koramangala',
    },
  },

  {
    _id: 'demo-reel-3',
    name: 'Matcha Boba Pancake Tower',
    description:
      'Fluffy Japanese souffle pancakes stacked high with organic Uji matcha cream and warm boba pearls.',
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-pouring-maple-syrup-on-pancakes-42999-large.mp4',
    price: '290',
    category: 'Desserts • Asian Fusion',
    partnerName: 'Tokyo Sweet Cafe',
    partnerAddress: 'MG Road • 2.1 km',
    partnerAvatar: '🥞',
    likes: 890,
    commentsCount: 67,
    foodPartner: {
      _id: 'partner-3',
      name: 'Tokyo Sweet Cafe',
      contactName: 'Hana Suzuki',
      address: 'MG Road',
    },
  },
];

const Home = () => {
  const [reels, setReels] = useState(DEMO_REELS);
  const [activeIndex, setActiveIndex] = useState(0);

  const [savedIds, setSavedIds] = useState(() => {
    const saved = localStorage.getItem('foodreel_saved_items');

    return saved ? JSON.parse(saved) : [];
  });

  const containerRef = useRef(null);

  // Fetch reels from backend
  useEffect(() => {
    const fetchBackendReels = async () => {
      try {
        const data = await apiClient.getFoodItems();

        if (
          data &&
          data.foodItems &&
          data.foodItems.length > 0
        ) {
          setReels(data.foodItems);
        }
      } catch (err) {
        console.log('Using demo reels');
      }
    };

    fetchBackendReels();
  }, []);

  

  // Detect active reel while scrolling
  const handleScroll = () => {
    if (!containerRef.current) return;

    const {
      scrollTop,
      clientHeight,
    } = containerRef.current;

    const index = Math.round(
      scrollTop / clientHeight
    );

    if (
      index !== activeIndex &&
      index >= 0 &&
      index < reels.length
    ) {
      setActiveIndex(index);
    }
  };

  // Save / unsave food item
  const handleSaveToggle = (
    foodItem,
    isSavedNow
  ) => {
    let updated;

    if (isSavedNow) {
      updated = [...savedIds, foodItem];
    } else {
      updated = savedIds.filter(
        (item) =>
          (item._id || item.id) !==
          (foodItem._id || foodItem.id)
      );
    }

    setSavedIds(updated);

    localStorage.setItem(
      'foodreel_saved_items',
      JSON.stringify(updated)
    );
  };

  return (
    <div
      className="mobile-view"
      style={{
        position: 'relative',
        background: '#000',
        height: '100vh',
        overflow: 'hidden',
      }}
    >

      {/* =========================
          TOP FLOATING HEADER
      ========================== */}

      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 50,

          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

          pointerEvents: 'none',
        }}
      >

        {/* Brand Badge */}
        <div
          className="glass-pill"
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(16px)',

            display: 'flex',
            alignItems: 'center',
            gap: '8px',

            padding: '10px 14px',
            borderRadius: '20px',
          }}
        >
          <Flame
            size={20}
            color="#FF5E3B"
          />

          <span
            style={{
              fontFamily:
                'var(--font-heading)',
              fontWeight: '800',
              fontSize: '1rem',
              color: '#FFF',
            }}
          >
            CRAVIO
          </span>
        </div>

        {/* Trending Filter */}
        <div
          className="glass-pill"
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0,0,0,0.6)',

            display: 'flex',
            alignItems: 'center',
            gap: '8px',

            padding: '10px 14px',
            borderRadius: '20px',
          }}
        >
          <Search
            size={14}
            color="#FFF"
          />

          <span
            style={{
              fontSize: '0.78rem',
              color: '#FFF',
            }}
          >
            Trending
          </span>

          <Filter
            size={12}
            color="#FF9500"
          />
        </div>
      </div>

      {/* =========================
          REEL FEED
      ========================== */}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="reel-feed-container hide-scrollbar"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
        }}
      >
        {reels.map((item, index) => (
          <ReelCard
            key={item._id || index}
            foodItem={item}
            isActive={index === activeIndex}
            onSaveToggle={handleSaveToggle}
            isSavedInitial={savedIds.some(
              (saved) =>
                (saved._id || saved.id) ===
                (item._id || item.id)
            )}
          />
        ))}
      </div>

    </div>
  );
};

export default Home;