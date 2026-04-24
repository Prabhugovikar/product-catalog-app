import React from 'react';
import './PropRow.css';

export default function PropRow({ label, value, index = 0 }) {
  return (
    <div className="prop-row" style={{ animationDelay: `${index * 60 + 200}ms` }}>
      <span className="prop-row__label">{label}</span>
      <span className="prop-row__divider" />
      <span className="prop-row__value">{value}</span>
    </div>
  );
}
