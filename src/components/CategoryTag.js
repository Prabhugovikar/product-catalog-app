import React from 'react';
import './CategoryTag.css';

const CATEGORY_ICONS = {
  Cars:      '🚗',
  Bikes:     '🏍️',
  Phones:    '📱',
  Computers: '💻',
};

export default function CategoryTag({ category, size = 'sm' }) {
  const icon = CATEGORY_ICONS[category] || '📦';
  const slug = category?.toLowerCase() || 'default';

  return (
    <span className={`cat-tag cat-tag--${slug} cat-tag--${size}`}>
      <span className="cat-tag__icon">{icon}</span>
      {category}
    </span>
  );
}
