import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import './Header.css';

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();

  // Check if current path matches any of the nav item's paths
  const isNavItemActive = (currentPath, paths) => {
    return paths.some(path => {
      if (path === '/') {
        return currentPath === '/';
      }
      if (path === '/program/:programId') {
        return currentPath.startsWith('/program/');
      }
      return currentPath === path;
    });
  };

  const navItems = [
    {
      paths: ['/', '/program/:programId'],
      label: { en: 'Programs', zh: '程式' }
    },
    {
      paths: ['/symbols'],
      label: { en: 'Symbols', zh: '符號' }
    }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link 
            to="/" 
            className="logo"
          >
            <img src="/logo.png" alt="Bob's Calta Logo" className="logo-image" />
            <h1>{t({ en: "Bob's Calta", zh: "Bob's Calta" })}</h1>
          </Link>
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.paths[0]}
                to={item.paths[0]}
                className={`nav-link ${isNavItemActive(location.pathname, item.paths) ? 'active' : ''}`}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-right">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header; 