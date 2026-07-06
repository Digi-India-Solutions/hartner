import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/AuthContext';

const pageTitleKeys: Record<string, string> = {
  '/admin/dashboard': 'title.dashboard',
  '/admin/properties': 'title.properties',
  '/admin/properties/new': 'title.newProperty',
  '/admin/pages': 'title.pages',
  '/admin/pages/impressum': 'title.editImpressum',
  '/admin/pages/datenschutz': 'title.editDatenschutz',
  '/admin/settings': 'title.settings',
};

export function AdminTopbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentTitle = (() => {
    if (location.pathname.startsWith('/admin/properties/edit/')) {
      return t('title.editProperty');
    }
    const key = pageTitleKeys[location.pathname];
    return key ? t(key) : 'Admin';
  })();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'de';

  return (
    <header className="fixed left-[240px] right-0 top-0 h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
      <h2 className="text-base font-bold text-gray-900">{currentTitle}</h2>

      <div className="flex items-center gap-2">
        {/*
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer" title={t('topbar.search')}>
          <i className="ri-search-line"></i>
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer" title={t('topbar.notifications')}>
          <i className="ri-notification-3-line"></i>
        </button>
        */}

        {/* Language Switcher */}
        <div className="flex items-center bg-gray-100 rounded-full p-0.5 mx-1">
          <button
            onClick={() => switchLanguage('de')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
              currentLang === 'de'
                ? 'bg-accent-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-[11px]">🇩🇪</span>
            {t('lang.de')}
          </button>
          <button
            onClick={() => switchLanguage('en')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
              currentLang === 'en'
                ? 'bg-accent-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-[11px]">🇬🇧</span>
            {t('lang.en')}
          </button>
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full bg-accent-100 flex items-center justify-center cursor-pointer ml-1"
          >
            <span className="text-xs font-semibold text-accent-700">HA</span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{t('sidebar.adminUser')}</p>
                <p className="text-xs text-gray-400">admin@haertner.at</p>
              </div>
              <button
                onClick={() => { setProfileOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <i className="ri-user-line"></i>
                {t('topbar.profile')}
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
              >
                <i className="ri-logout-box-r-line"></i>
                {t('topbar.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}