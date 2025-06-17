import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();

  // Save current page scroll position when navigating
  const handleNavLinkClick = (targetPath) => {
    const currentPath = location.pathname;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    
    // Save scroll position based on current page
    if (currentPath === '/') {
      sessionStorage.setItem('homepage-scroll-position', scrollPosition.toString());
    } else if (currentPath === '/symbols') {
      sessionStorage.setItem('symbols-scroll-position', scrollPosition.toString());
    }
    // Note: Program pages don't need scroll position saving as they always start from top
  };

  const navItems = [
    {
      path: '/',
      label: { en: 'Programs', zh: '程式' }
    },
    {
      path: '/symbols',
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
            onClick={() => handleNavLinkClick('/')}
          >
            <h1>{t({ en: 'Bob\'s Calta', zh: 'Bob\'s Calta' })}</h1>
          </Link>
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNavLinkClick(item.path)}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-right">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header; 