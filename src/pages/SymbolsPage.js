import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import symbolsData from '../data/symbols.json';
import { formatCodeForDisplay } from '../utils/symbolFormatter';
import './SymbolsPage.css';

const SymbolsPage = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Set document title for symbols page
  useDocumentTitle(null, { en: 'Symbols', zh: '符號' });

  const categories = symbolsData.categories;

  // Manage scroll position for SymbolsPage specifically
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('symbols-scroll-position');
    
    if (savedScrollPosition) {
      const scrollPosition = parseInt(savedScrollPosition, 10);
      
      // iOS-specific scroll restoration
      const restoreScroll = () => {
        window.scrollTo(0, scrollPosition);
        document.body.scrollTop = scrollPosition;
        document.documentElement.scrollTop = scrollPosition;
        
        setTimeout(() => {
          if (Math.abs(window.scrollY - scrollPosition) > 10) {
            window.scrollTo({
              top: scrollPosition,
              behavior: 'instant'
            });
          }
        }, 50);
        
        setTimeout(() => {
          if (Math.abs(window.scrollY - scrollPosition) > 10) {
            document.documentElement.scrollTop = scrollPosition;
            document.body.scrollTop = scrollPosition;
          }
        }, 150);
      };

      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 100);
      setTimeout(restoreScroll, 300);
      
      // Clear our own saved position after restoring
      setTimeout(() => {
        sessionStorage.removeItem('symbols-scroll-position');
      }, 500);
    } else {
      // If no saved position, start at top
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    // Save scroll position when leaving the page
    const saveScrollPosition = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      sessionStorage.setItem('symbols-scroll-position', scrollPosition.toString());
    };

    // Save position before page unload
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);

  const filterSymbols = () => {
    let filteredSymbols = [];
    
    Object.entries(categories).forEach(([categoryKey, category]) => {
      if (selectedCategory === 'all' || selectedCategory === categoryKey) {
        filteredSymbols.push({
          categoryKey,
          categoryName: t(category.name),
          symbols: category.symbols
        });
      }
    });
    
    return filteredSymbols;
  };

  const filteredData = filterSymbols();

  return (
    <div className="symbols-page">
      <div className="container">
        <div className="symbols-header">
          <h1>{t({ en: 'Symbols  ', zh: '符號' })}</h1>
          <p className="symbols-description">
            {t({ 
              en: 'Reference for symbols used in my collection of programs, including how to type each symbol on your calculator.',
              zh: '符號參考，包括如何在計數機上輸入每個符號。'
            })}
          </p>
        </div>

        <div className="symbols-controls">
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">{t({ en: 'All Categories', zh: '所有類別' })}</option>
              {Object.entries(categories).map(([key, category]) => (
                <option key={key} value={key}>
                  {t(category.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="symbols-content">
          {filteredData.length > 0 ? (
            filteredData.map((categoryData) => (
              <div key={categoryData.categoryKey} className="symbol-category">
                <h2 className="category-title">{categoryData.categoryName}</h2>
                <div className="symbols-grid">
                  {categoryData.symbols.map((symbol, index) => (
                    <div key={index} className="symbol-card">
                      <div className="symbol-header">
                        <span 
                          className="symbol-display"
                          dangerouslySetInnerHTML={{ 
                            __html: formatCodeForDisplay(symbol.symbol) 
                          }}
                        />
                      </div>
                      <div className="symbol-info">
                        <p className="symbol-description">
                          {t(symbol.description)}
                        </p>
                        <div className="symbol-typing">
                          <strong>{t({ en: 'How to type:', zh: '輸入方法:' })}</strong>
                          <code className="typing-instruction">
                            {t(symbol.howToType)}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>{t({ en: 'No symbols found in this category.', zh: '此類別中沒有找到符號。' })}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymbolsPage; 