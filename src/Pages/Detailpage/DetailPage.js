import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {catalogData} from '../../data/data';
import CategoryTag from '../../components/CategoryTag';
import PropRow from '../../components/PropRow';
import ItemCard from '../../components/ItemCard';
import './DetailPage.css';

export default function DetailPage() {
  const { itemName } = useParams();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const item = useMemo(
    () => catalogData.find((i) => i.itemname === decodeURIComponent(itemName)),
    [itemName]
  );

  const related = useMemo(() => {
    if (!item) return [];
    return catalogData
      .filter((i) => i.category === item.category && i.itemname !== item.itemname)
      .slice(0, 4);
  }, [item]);

  if (!item) {
    return (
      <div className="detail-not-found">
        <span className="detail-not-found__icon">🔍</span>
        <h2>Item not found</h2>
        <p>The item you're looking for doesn't exist in our catalog.</p>
        <Link to="/" className="detail-not-found__btn">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <main className="detail-page">
      {/* ── Back ── */}
      <div className="container">
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      {/* ── Hero ── */}
      <div className={`detail-hero detail-hero--${item.category.toLowerCase()}`}>
        <div className="container detail-hero__inner">
          {/* Left: info */}
          <div className="detail-hero__info">
            <CategoryTag category={item.category} size="md" />
            <h1 className="detail-hero__name">{item.itemname}</h1>
            <p className="detail-hero__sub">{item.category} · {item.itemprops.length} specifications listed</p>
          </div>

          {/* Right: image */}
          <div className="detail-hero__img-wrap">
            {imgError ? (
              <div className="detail-hero__img-fallback">
                <span>{item.itemname.charAt(0)}</span>
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.itemname}
                className="detail-hero__img"
                onError={() => setImgError(true)}
              />
            )}
            <div className="detail-hero__img-glow" />
          </div>
        </div>
      </div>

      {/* ── Specs ── */}
      <div className="container detail-body">
        <div className="detail-specs">
          <h2 className="detail-specs__title">
            <span className="detail-specs__title-line" />
            Specifications
          </h2>

          <div className="detail-specs__list">
            {item.itemprops.map((prop, i) => (
              <PropRow key={prop.label} label={prop.label} value={prop.value} index={i} />
            ))}
          </div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="detail-related">
            <h2 className="detail-related__title">
              <span className="detail-related__title-line" />
              More {item.category}
            </h2>
            <div className="detail-related__grid">
              {related.map((rel, i) => (
                <ItemCard key={rel.itemname} item={rel} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
