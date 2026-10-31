// app/components/ScrollingBanner.js
'use client';
export default function ScrollingBanner() {
  const items = [
    { icon: '🔄', text: 'Skip to content' },
    { icon: '🔍', text: 'Search for Desi Ghee' },
    { icon: '🌱', text: 'Two Brothers Organic Farms' },
    { icon: '🛒', text: '0' },
    { icon: '❤️', text: '0' },
    { icon: '🧈', text: 'GHEE' },
    { icon: '🌾', text: 'ATTA' },
    { icon: '📦', text: 'SHOP BY CATEGORY' },
    { icon: '🙏', text: "BAPPA'S FAVOURITES" },
    { icon: '🤝', text: 'JOIN' },
    { icon: '🎁', text: 'CORPORATE GIFTING' },
    { icon: '🌿', text: 'FARM LIFE' },
    { icon: '🪔', text: 'Ganpati Special' },
    { icon: '📦', text: 'Bulk Gifting' },
    { icon: '✨', text: 'Join Now' },
    { icon: '🌧️', text: 'Monsoon Special' },
    { icon: '🆕', text: 'New Launches' },
  ];

  // Duplicate items for seamless scroll
  const allItems = [...items, ...items, ...items];

  return (
    <div className="scrolling-banner">
      <div className="scroll-track">
        {allItems.map((item, index) => (
          <div className="scroll-item" key={index}>
            <span className="icon">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}