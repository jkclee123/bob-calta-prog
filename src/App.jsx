import React, { useRef, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage';
import SymbolsPage from './pages/SymbolsPage';
import './App.css';

// Separate component to use useLocation inside Router
function AppContent() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isHomePage = location.pathname === '/';
  
  // Refs to track scroll position and previous path
  const homeScrollPos = useRef(0);
  const prevPath = useRef(location.pathname);

  // Handle scroll separation and restoration
  useLayoutEffect(() => {
    // 1. If we are leaving HomePage, save current scroll position
    if (prevPath.current === '/' && location.pathname !== '/') {
      homeScrollPos.current = window.scrollY;
    }

    // 2. If we are returning to HomePage, restore saved scroll position
    if (location.pathname === '/' && prevPath.current !== '/') {
      const scrollPos = homeScrollPos.current;
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPos);
      });
    }

    // 3. If we are navigating TO a new page (not Home) via PUSH, scroll to top
    // This handles SymbolsPage and other new routes
    if (location.pathname !== '/' && navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    }

    prevPath.current = location.pathname;
  }, [location.pathname, navigationType]);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {/* Keep HomePage always mounted, hide with CSS when not active */}
        <div style={{ display: isHomePage ? 'block' : 'none' }}>
          <HomePage />
        </div>
        {/* Other routes render/unmount normally */}
        <Routes>
          <Route path="/program/:programId" element={<ProgramPage />} />
          <Route path="/symbols" element={<SymbolsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
