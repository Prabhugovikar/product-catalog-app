import React, { useMemo, useState } from 'react';
import {catalogData} from '../../data/data';
import CategorySection from '../../components/CategorySection';
import HeroStats from '../../components/HeroStats';
import SearchBar from '../../components/SearchBar';
import ItemCard from '../../components/ItemCard';
import './HomePage.css';

const CATEGORY_ORDER = ['Cars', 'Bikes', 'Phones', 'Computers'];

export default function HomePage() {
  const [query, setQuery] = useState('');

  // Group items by category
  const grouped = useMemo(() => {
    const map = {};
    catalogData.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, []);

  // Sorted categories
  const categories = useMemo(() => {
    const known = CATEGORY_ORDER.filter((c) => grouped[c]);
    const rest = Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c));
    return [...known, ...rest];
  }, [grouped]);

  // Stats
  const stats = useMemo(() => [
    { label: 'Total Items',  value: catalogData.length },
    { label: 'Categories',   value: categories.length },
    { label: 'Brands',       value: new Set(catalogData.map(i => i.itemname.split(' ')[0])).size },
  ], [categories]);

  // Search results
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return catalogData.filter(
      (item) =>
        item.itemname.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.itemprops.some(
          (p) =>
            p.label.toLowerCase().includes(q) ||
            p.value.toLowerCase().includes(q)
        )
    );
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <main className="home-page">
      {/* ── Hero ── */}
      <div className="home-hero">
        <div className="container">
          <div className="home-hero__noise" />
          <p className="home-hero__eyebrow">Multi-Category</p>
          <h1 className="home-hero__title">
            Product<br />
            <span className="home-hero__title-accent">Catalog</span>
          </h1>
          <p className="home-hero__sub">
            Explore cars, bikes, phones & computers — all in one place.
          </p>
          <HeroStats stats={stats} />
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="home-toolbar">
        <div className="container home-toolbar__inner">
          <SearchBar value={query} onChange={setQuery} placeholder="Search any item, brand, spec…" />
          {isSearching && (
            <span className="home-toolbar__result-count">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container home-content">
        {isSearching ? (
          searchResults.length > 0 ? (
            <div className="home-search-results">
              <p className="home-search-results__label">
                Showing results for <em>"{query}"</em>
              </p>
              <div className="home-search-results__grid">
                {searchResults.map((item, i) => (
                  <ItemCard key={item.itemname} item={item} index={i} />
                ))}
              </div>
            </div>
          ) : (
            <div className="home-empty">
              <span className="home-empty__icon">🔍</span>
              <p>No items found for <strong>"{query}"</strong></p>
              <button onClick={() => setQuery('')}>Clear Search</button>
            </div>
          )
        ) : (
          categories.map((cat) => (
            <CategorySection key={cat} category={cat} items={grouped[cat]} />
          ))
        )}
      </div>
    </main>
  );
}
