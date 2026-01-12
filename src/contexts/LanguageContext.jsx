import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Initialize language from localStorage synchronously to avoid re-render
const getInitialLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
      return savedLanguage;
    }
  } catch (e) {
    // localStorage may not be available (SSR, private browsing)
  }
  return 'zh';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const t = (translations) => {
    // If translations is a string, return it as-is
    if (typeof translations === 'string') {
      return translations;
    }
    // If translations is an object, return the appropriate language value
    return translations[language] || translations.en || '';
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 