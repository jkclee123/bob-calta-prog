import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { formatCodeForDisplay } from '../utils/symbolFormatter';
import './CodeViewer.css';

const CodeViewer = ({ program }) => {
  const { t } = useLanguage();

  // Calculate cumulative bytes for each line
  const linesWithCumulative = program.code.map((line, index) => {
    const cumulativeBytes = program.code
      .slice(0, index + 1)
      .reduce((total, currentLine) => total + currentLine.bytes, 0);
    return { ...line, calculatedCumulativeBytes: cumulativeBytes };
  });

  return (
    <div className="code-viewer">
      <div className="code-container">

        <div className="code-lines">
          {linesWithCumulative.map((line, index) => (
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
                  <span className="stat-label">{t({ en: 'BYTES', zh: '字節' })}</span>
                </div>
                <div className="line-cumulative">
                  <span className="stat-value cumulative-value">{line.calculatedCumulativeBytes}</span>
                  <span className="cumulative-label">{t({ en: 'SUBTOTAL', zh: '累計' })}</span>
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