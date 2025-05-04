import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Brain, Menu, X, Settings, Globe } from 'lucide-react';
import useUIStore from '../../stores/uiStore';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const { isMobileMenuOpen, toggleMobileMenu, language, setLanguage } = useUIStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-dark-900 text-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-lg font-bold text-primary-400">
              <Brain className="h-6 w-6" />
              <span>{t('appTitle')}</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <nav className="flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-800 hover:text-primary-300 transition-colors">
                {t('navigation.dashboard')}
              </Link>
              <Link to="/analysis" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-800 hover:text-primary-300 transition-colors">
                {t('navigation.analysis')}
              </Link>
              <Link to="/signals" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-800 hover:text-primary-300 transition-colors">
                {t('navigation.signals')}
              </Link>
              <Link to="/performance" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-800 hover:text-primary-300 transition-colors">
                {t('navigation.performance')}
              </Link>
              <Link to="/evolution" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-dark-800 hover:text-primary-300 transition-colors">
                {t('navigation.evolution')}
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-dark-800 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </button>
            <Link to="/settings" className="p-2 rounded-full hover:bg-dark-800 transition-colors">
              <Settings className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-800 hover:text-primary-300"
              onClick={toggleMobileMenu}
            >
              {t('navigation.dashboard')}
            </Link>
            <Link 
              to="/analysis" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-800 hover:text-primary-300"
              onClick={toggleMobileMenu}
            >
              {t('navigation.analysis')}
            </Link>
            <Link 
              to="/signals" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-800 hover:text-primary-300"
              onClick={toggleMobileMenu}
            >
              {t('navigation.signals')}
            </Link>
            <Link 
              to="/performance" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-800 hover:text-primary-300"
              onClick={toggleMobileMenu}
            >
              {t('navigation.performance')}
            </Link>
            <Link 
              to="/evolution" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-800 hover:text-primary-300"
              onClick={toggleMobileMenu}
            >
              {t('navigation.evolution')}
            </Link>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={() => {
                  toggleLanguage();
                  toggleMobileMenu();
                }}
                className="flex items-center space-x-2 text-white hover:text-primary-300"
              >
                <Globe className="h-5 w-5" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <Link 
                to="/settings" 
                className="flex items-center space-x-2 text-white hover:text-primary-300"
                onClick={toggleMobileMenu}
              >
                <Settings className="h-5 w-5" />
                <span>{t('navigation.settings')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;