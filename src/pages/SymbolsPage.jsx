import React, { useState } from 'react';
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
                          <strong>{t({ en: 'How to input:', zh: '輸入說明:' })}</strong>
                          <code 
                            className="typing-instruction"
                            dangerouslySetInnerHTML={{ 
                              __html: formatCodeForDisplay(t(symbol.howToType)) 
                            }}
                          />
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