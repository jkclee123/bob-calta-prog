import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import programsData from '../data/programs/index.js';
import './HomePage.css';

const HomePage = () => {
  const { t } = useLanguage();
  
  // Set document title for homepage
  useDocumentTitle("Bob's Calta");

  return (
    <div className="home-page">

      {/* Programs Grid */}
      <section className="programs-section">
        <div className="container">
          <div className="programs-grid">
            {Object.values(programsData).map((program, index) => (
              <Link
                key={program.id}
                to={`/program/${program.id}`}
                className="program-card-link"
              >
                <div className="program-card">
                  <img
                    src={program.image}
                    alt={`${t(program.name)} preview`}
                    className="program-card-image"
                  />
                  <div className="program-card-content">
                    <h3 className="program-card-title">{t(program.name)}</h3>
                    <p className="program-card-description">{t(program.description)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 