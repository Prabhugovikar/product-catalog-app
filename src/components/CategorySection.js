import React, { useState } from 'react';
import ItemCard from './ItemCard';
import './CategorySection.css';

const CATEGORY_ICONS = {
  Cars:      '🚗',
  Bikes:     '🏍️',
  Phones:    '📱',
  Computers: '💻',
};

const CATEGORY_DESCRIPTIONS = {
  Cars:      'Performance, luxury, and everyday rides',
  Bikes:     'Two-wheeled machines built to thrill',
  Phones:    'Flagship smartphones from top brands',
  Computers: 'Laptops engineered for pros and gamers',
};

const INITIAL_VISIBLE = 4;

export default function CategorySection({ category, items }) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, INITIAL_VISIBLE);

  return (
    <section className={`cat-section cat-section--${category.toLowerCase()}`}>
      <div className="cat-section__header">
        <div className="cat-section__header-left">
          <span className="cat-section__icon">{CATEGORY_ICONS[category] || '📦'}</span>
          <div>
            <h2 className="cat-section__title">{category}</h2>
            <p className="cat-section__desc">{CATEGORY_DESCRIPTIONS[category] || ''}</p>
          </div>
        </div>
        <div className="cat-section__meta">
          <span className="cat-section__count">{items.length} items</span>
        </div>
      </div>

      <div className="cat-section__grid">
        {visibleItems.map((item, i) => (
          <ItemCard key={item.itemname} item={item} index={i} />
        ))}
      </div>

      {items.length > INITIAL_VISIBLE && (
        <div className="cat-section__footer">
          <button
            className="cat-section__toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? 'Show Less'
              : `Show ${items.length - INITIAL_VISIBLE} More`}
            <svg
              width="14" height="14" viewBox="0 0 16 16" fill="none"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
