import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">◈</span>
          <span className="navbar__logo-text">KATALOG</span>
        </Link>

        <nav className="navbar__nav">
          <Link to="/" className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}>
            Catalog
          </Link>
        </nav>

        <div className="navbar__badge">
          <span className="navbar__badge-dot" />
          Live
        </div>
      </div>
    </header>
  );
}
