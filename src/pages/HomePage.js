import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import programsData from '../data/programs/index.js';
import './HomePage.css';

const HomePage = () => {
  const { t } = useLanguage();
  
  // Set document title for homepage
  useDocumentTitle("Bob's Calta");

  // Restore scroll position when returning to homepage (especially for iOS)
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('homepage-scroll-position');
    
    if (savedScrollPosition) {
      const scrollPosition = parseInt(savedScrollPosition, 10);
      
      // iOS-specific scroll restoration with multiple attempts
      const restoreScroll = () => {
        // Method 1: Direct scroll
        window.scrollTo(0, scrollPosition);
        document.body.scrollTop = scrollPosition;
        document.documentElement.scrollTop = scrollPosition;
        
        // Method 2: Check if it worked and retry
        setTimeout(() => {
          if (Math.abs(window.scrollY - scrollPosition) > 10) {
            window.scrollTo({
              top: scrollPosition,
              behavior: 'instant'
            });
          }
        }, 50);
        
        // Method 3: Final attempt for iOS
        setTimeout(() => {
          if (Math.abs(window.scrollY - scrollPosition) > 10) {
            document.documentElement.scrollTop = scrollPosition;
            document.body.scrollTop = scrollPosition;
          }
        }, 150);
      };

      // Use multiple timing approaches for iOS compatibility
      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 100);
      setTimeout(restoreScroll, 300);
      
      // Clear our own saved position after restoring
      setTimeout(() => {
        sessionStorage.removeItem('homepage-scroll-position');
      }, 500);
    } else {
      // If no saved position, start at top
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, []);

  // Save scroll position when clicking a program link
  const handleProgramLinkClick = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    sessionStorage.setItem('homepage-scroll-position', scrollPosition.toString());
  };

  const heroContent = {
    title: {
      en: "Bob's Calta",
      zh: "Bob's Calta"
    },
    subtitle: {
      en: 'Casio fx-50FH II Calculator Program Collection by Bob.',
      zh: 'Casio fx-50FH II 程式集'
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="homepage-header">
          <h1>{t(heroContent.title)}</h1>
          <p className="homepage-description">{t(heroContent.subtitle)}</p>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="programs-section">
        <div className="container">
          <div className="programs-grid">
            {Object.values(programsData).map((program, index) => (
              program.status === 'completed' ? (
                <Link 
                  key={program.id} 
                  to={`/program/${program.id}`} 
                  className="program-card-link" 
                  onClick={handleProgramLinkClick}
                  style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                >
                  <div className="program-card">
                    <img
                      src={program.image}
                      alt={`${t(program.name)} preview`}
                      className="program-card-image"
                      loading="lazy"
                    />
                    <div className="program-card-content">
                      <h3 className="program-card-title">{t(program.name)}</h3>
                      <p className="program-card-description">{t(program.description)}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  key={program.id}
                  className="program-card program-card-disabled"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <img
                    src={program.image}
                    alt={`${t(program.name)} preview`}
                    className="program-card-image program-card-image-disabled"
                    loading="lazy"
                  />
                  <div className="program-card-content">
                    <h3 className="program-card-title program-card-title-disabled">{t(program.name)}</h3>
                    <p className="program-card-description program-card-description-disabled">{t(program.description)}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 