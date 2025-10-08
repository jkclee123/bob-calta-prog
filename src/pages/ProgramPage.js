import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import { formatCodeForDisplay } from '../utils/symbolFormatter';
import programsData from '../data/programs/index.js';
import CodeViewer from '../components/CodeViewer';
import './ProgramPage.css';

const ProgramPage = () => {
  const { programId } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('code');

  const program = programsData[programId];

  // Calculate the final cumulative bytes from the program code
  const finalCumulativeBytes = program ? program.code.reduce((total, line) => total + line.bytes, 0) : 0;

  // Set document title for program page
  useDocumentTitle(null, program ? program.name : { en: 'Program Not Found', zh: '找不到程式' });

  // Scroll to top when component mounts or programId changes
  useEffect(() => {
    // More robust scroll to top for mobile devices, especially iOS
    const scrollToTop = () => {
      // Method 1: Try scrolling the document body and documentElement
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      
      // Method 2: Use window.scrollTo with different approaches
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' // Use 'instant' for more reliable mobile behavior
        });
      } catch (e) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
      
      // Method 3: Force scroll for iOS by targeting specific elements
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.scrollTop = 0;
      }
      
      // Method 4: Additional check and retry for mobile
      setTimeout(() => {
        if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      }, 50);
    };

    // Use requestAnimationFrame for better timing on mobile
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // Additional delay for iOS Chrome
    setTimeout(scrollToTop, 150);
  }, [programId]);

  if (!program) {
    return (
      <div className="program-page">
        <div className="container">
          <div className="error-message">
            <h2>{t({ en: 'Program Not Found', zh: '找不到程式' })}</h2>
            <p>{t({ en: 'The requested program could not be found.', zh: '找不到請求的程式。' })}</p>
            <Link to="/" className="btn btn-primary">
              {t({ en: 'Back to Programs', zh: '返回程式列表' })}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'code', label: { en: 'Program', zh: '程式' } },
    { id: 'guide', label: { en: 'Guide', zh: '使用指南' } },
    ...(program.analysis && program.analysis.length > 0 ? [{ id: 'analysis', label: { en: 'Analysis', zh: '分析' } }] : [])
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'code':
        return <CodeViewer program={program} />;
      
      case 'guide':
        return (
          <div className="guide-content">
            <div className="usage-section">
              <h3>{t({ en: 'Parameters', zh: '參數' })}</h3>
              <ul className="parameter-list">
                {t(program.usage.parameters).map((param, index) => (
                  <li key={index} className="parameter-item">{param}</li>
                ))}
              </ul>

              <h3>{t({ en: 'Instructions', zh: '使用說明' })}</h3>
              <ol className="instruction-list">
                {t(program.usage.instructions).map((instruction, index) => (
                  <li key={index} className="instruction-item">{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="examples-section">
              <h3>{t({ en: 'Examples', zh: '示例' })}</h3>
              <div className="examples-grid">
                {program.examples.map((example, index) => (
                  <div key={index} className="example-card">
                    <h4 className="example-title">{t(example.title)}</h4>
                    <ol className="example-steps">
                      {example.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="example-step">{t(step)}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analysis':
        return (
          <div className="analysis-content">
            {program.analysis && program.analysis.length > 0 && (
              <div className="analysis-toc">
                <h3 className="toc-title">{t({ en: 'Table of Contents', zh: '目錄' })}</h3>
                <nav className="toc-nav">
                  <ol className="toc-list">
                    {program.analysis.map((analysis, index) => (
                      <li key={index} className="toc-item">
                        <a href={`#analysis-${index}`} className="toc-link">
                          {t(analysis.title)}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            )}
            
            {program.analysis && program.analysis.map((analysis, index) => (
              <div key={index} className="analysis-section" id={`analysis-${index}`}>
                <h1 className="analysis-title">{t(analysis.title)}</h1>
                
                <div className="analysis-problem">
                  <h2>{t({ en: 'Problem', zh: '問題' })}</h2>
                  <p>{t(analysis.problem)}</p>
                </div>


                <div className="analysis-solution">
                  <h2>{t({ en: 'Solution', zh: '解決方法' })}</h2>
                  <div className="analysis-graph">
                    {analysis.image && (
                      <img
                        src={analysis.image}
                        alt={t({ en: 'Analysis Image', zh: '解決方法圖表' })}
                        className="analysis-image"
                      />
                    )}
                  </div>
                  {analysis.solution && (
                    <p>{t(analysis.solution)}</p>
                  )}
                </div>

                <div className="analysis-steps">
                  <h2>{t({ en: 'Step-by-Step Explanation', zh: '解釋' })}</h2>
                  <div className="steps-container">
                    {analysis.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="step-card">
                        <div className="step-header">
                          <h5 className="step-title">{t(step.title)}</h5>
                        </div>
                        {step.formula && (
                          <div className="step-formula">
                            <code 
                              className="formula-code"
                              dangerouslySetInnerHTML={{ __html: formatCodeForDisplay(step.formula) }}
                            />
                          </div>
                        )}
                        <div className="step-explanation">
                          <p>{t(step.explanation)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="program-page">
      <div className="container">
        {/* Header */}
        <div
          className="program-header"
          style={{ '--program-bg-image': `url(${program.image})` }}
        >
          <div className="program-title-section">
            <h1 className="program-title">{t(program.name)}</h1>
            <div className="program-description">
              <p>{t(program.description)}</p>
            </div>
          </div>
          <div className="program-meta">
              <span className="meta-item">
                {t({ en: 'Mode', zh: '模式' })}: {program.mode}
              </span>
              <span className="meta-item">
                {t({ en: 'Bytes', zh: '字節' })}: {finalCumulativeBytes}
              </span>
            </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage; 