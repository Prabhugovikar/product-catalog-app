import React from 'react';
import './HeroStats.css';

export default function HeroStats({ stats }) {
  return (
    <div className="hero-stats">
      {stats.map(({ label, value }) => (
        <div key={label} className="hero-stats__item">
          <span className="hero-stats__value">{value}</span>
          <span className="hero-stats__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
