import React from 'react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search items…' }) {
  return (
    <div className="search-bar">
      <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear">
          ✕
        </button>
      )}
    </div>
  );
}
