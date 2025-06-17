import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useDocumentTitle = (titleKey, baseTitleTranslations = null) => {
  const { t } = useLanguage();

  useEffect(() => {
    let title;
    
    if (baseTitleTranslations) {
      // Use provided translations (for custom titles)
      const baseTitle = t(baseTitleTranslations);
      title = `${baseTitle} - Bob's Calta`;
    } else if (titleKey) {
      // Use simple key (for homepage)
      title = titleKey;
    } else {
      // Default fallback
      title = "Bob's Calta";
    }

    document.title = title;
  }, [titleKey, baseTitleTranslations, t]);
}; 