import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import useUIStore from '../../stores/uiStore';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Layout: React.FC = () => {
  const { theme, language } = useUIStore();
  const { i18n } = useTranslation();

  // Set the HTML dir attribute based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Set theme class on body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-900 text-white' : 'bg-gray-50 text-dark-900'}`}>
      <Header />
      <main className="pt-16 pb-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;