import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { formatCodeForDisplay } from '../utils/symbolFormatter';
import './CodeViewer.css';

const CodeViewer = ({ program }) => {
  const { t } = useLanguage();



  return (
    <div className="code-viewer">
      <div className="code-container">

        <div className="code-lines">
          {program.code.map((line, index) => (
            <div key={line.line} className={`code-line-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
              <div className="line-content">
                <div className="line-code-content">
                  <code 
                    className="code-text"
                    dangerouslySetInnerHTML={{ __html: formatCodeForDisplay(line.code) }}
                  />
                </div>
                {line.comment && (
                  <div className="line-comment">
                    <span className="comment-text">{t(line.comment)}</span>
                  </div>
                )}
              </div>
              <div className="line-stats">
                <div className="line-bytes">
                  <span className="stat-value">{line.bytes}</span>
                  <span className="stat-label">{t({ en: 'bytes', zh: '字節' })}</span>
                </div>
                <div className="line-cumulative">
                  <span className="stat-value cumulative-value">{line.cumulativeBytes}</span>
                  <span className="stat-label">{t({ en: 'total', zh: '累計' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeViewer; 