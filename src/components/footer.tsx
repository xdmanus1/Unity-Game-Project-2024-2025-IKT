import { t } from "i18next";
import { Link } from "react-router-dom";
const { t, i18n } = useTranslation("landingPage");
  
      const toggleLanguage = () => {
          const newLang = i18n.language === 'en' ? 'hu' : 'en';
          i18n.changeLanguage(newLang);
        };

        
<footer className="w-full py-6 bg-gray-900 border-t border-gray-800 relative z-20">
        <div className="container flex flex-col gap-2 sm:flex-row items-center px-4 md:px-6">
          <p className="text-xs text-gray-400">{t('footer.copyright')}</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link to="/terms" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
              {t('footer.privacy')}
            </Link>
            <button
            onClick={toggleLanguage}
            className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
          >
            {i18n.language === 'en' ? 'Magyar' : 'English'}
          </button>
          </nav>
        </div>
      </footer>