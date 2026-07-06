import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/AuthContext';

interface NavItem {
  icon: string;
  labelKey: string;
  path: string;
  children?: { icon: string; labelKey: string; path: string }[];
}

export function AdminSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems: NavItem[] = [
    { icon: 'ri-dashboard-line', labelKey: 'sidebar.dashboard', path: '/admin/dashboard' },
    { icon: 'ri-building-line', labelKey: 'sidebar.properties', path: '/admin/properties' },
    { icon: 'ri-mail-line', labelKey: 'sidebar.inquiries', path: '/admin/inquiries' },
    {
      icon: 'ri-file-text-line',
      labelKey: 'sidebar.pages',
      path: '/admin/pages',
      children: [
        { icon: 'ri-information-line', labelKey: 'sidebar.impressum', path: '/admin/pages/impressum' },
        { icon: 'ri-shield-check-line', labelKey: 'sidebar.datenschutz', path: '/admin/pages/datenschutz' },
      ],
    },
    { icon: 'ri-settings-3-line', labelKey: 'sidebar.settings', path: '/admin/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: NavItem) => {
    if (isActive(item.path)) return true;
    return item.children?.some((c) => location.pathname.startsWith(c.path)) ?? false;
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-[#1E1B4B] flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 py-5">
        <Link to="/admin/dashboard" className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0">
            <i className="ri-building-line text-white text-sm"></i>
          </div>
          <span className="text-base font-bold text-white leading-tight">{t('sidebar.company')}</span>
        </Link>
      </div>
      <div className="mx-5 border-b border-white/10"></div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isParentActive(item);
            const hasChildren = !!item.children;

            return (
              <li key={item.path}>
                {hasChildren ? (
                  <div>
                    <Link
                      to={item.children?.[0]?.path || item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        active
                          ? 'bg-accent-500 text-white border-l-[3px] border-white pl-[9px]'
                          : 'text-indigo-200 hover:bg-white/10'
                      }`}
                    >
                      <i className={`${item.icon} text-base w-5 text-center`}></i>
                      {t(item.labelKey)}
                    </Link>
                    {item.children && (
                      <ul className="ml-7 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <Link
                              to={child.path}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                                isActive(child.path)
                                  ? 'text-white font-medium'
                                  : 'text-indigo-200/70 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <i className={`${child.icon} text-sm w-4 text-center`}></i>
                              {t(child.labelKey)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-accent-500 text-white border-l-[3px] border-white pl-[9px]'
                        : 'text-indigo-200 hover:bg-white/10'
                    }`}
                  >
                    <i className={`${item.icon} text-base w-5 text-center`}></i>
                    {t(item.labelKey)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mx-3 border-t border-white/10"></div>
      <div className="px-4 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent-500/30 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-semibold text-white">HA</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{t('sidebar.adminUser')}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-7 h-7 flex items-center justify-center rounded-md text-indigo-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={t('sidebar.logout')}
        >
          <i className="ri-logout-box-r-line text-sm"></i>
        </button>
      </div>
    </aside>
  );
}