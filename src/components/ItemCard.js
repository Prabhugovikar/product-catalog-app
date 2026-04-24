import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryTag from './CategoryTag';
import './ItemCard.css';

export default function ItemCard({ item, index = 0 }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    navigate(`/item/${encodeURIComponent(item.itemname)}`);
  };

  const previewProps = item.itemprops.slice(0, 2);

  return (
    <article
      className="item-card"
      onClick={handleClick}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="item-card__img-wrap">
        {imgError ? (
          <div className="item-card__img-fallback">
            <span>{item.itemname.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.itemname}
            className="item-card__img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        <div className="item-card__overlay" />
        <div className="item-card__tag-wrap">
          <CategoryTag category={item.category} />
        </div>
      </div>

      <div className="item-card__body">
        <h3 className="item-card__name">{item.itemname}</h3>

        <div className="item-card__props">
          {previewProps.map((prop) => (
            <div key={prop.label} className="item-card__prop">
              <span className="item-card__prop-label">{prop.label}</span>
              <span className="item-card__prop-value">{prop.value}</span>
            </div>
          ))}
        </div>

        <button className="item-card__cta">
          View Details
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </article>
  );
}
