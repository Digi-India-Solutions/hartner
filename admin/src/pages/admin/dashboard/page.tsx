import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProperties } from '@/hooks/PropertiesContext';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { properties } = useProperties();

  const published = properties.filter((p) => p.status === 'Veröffentlicht').length;
  const offline = properties.filter((p) => p.status === 'Offline').length;
  const drafts = properties.filter((p) => p.status === 'Entwurf').length;

  const stats = [
    { label: t('dash.totalProperties'), value: properties.length, icon: 'ri-building-line', color: 'bg-accent-500' },
    { label: t('dash.published'), value: published, icon: 'ri-eye-line', color: 'bg-green-500' },
    { label: t('dash.offline'), value: offline, icon: 'ri-eye-off-line', color: 'bg-red-500' },
    { label: t('dash.drafts'), value: drafts, icon: 'ri-draft-line', color: 'bg-amber-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('dash.heading')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-sm`}></i>
              </div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('dash.recentProperties')}</h3>
          <div className="space-y-3">
            {properties.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                to={`/admin/properties/edit/${p.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-8 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {p.thumbnail && (
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover object-top" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.address}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  p.status === 'Veröffentlicht' ? 'bg-green-50 text-green-700'
                  : p.status === 'Offline' ? 'bg-red-50 text-red-600'
                  : 'bg-amber-50 text-amber-700'
                }`}>
                  {p.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('dash.quickAccess')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/properties/new"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-accent-300 hover:bg-accent-50/30 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-add-line text-accent-600 text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">{t('dash.newProperty')}</span>
            </Link>
            <Link
              to="/admin/properties"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-accent-300 hover:bg-accent-50/30 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-building-line text-accent-600 text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">{t('dash.allProperties')}</span>
            </Link>
            <Link
              to="/admin/pages/impressum"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-accent-300 hover:bg-accent-50/30 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-file-text-line text-accent-600 text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">{t('dash.impressum')}</span>
            </Link>
            <Link
              to="/admin/pages/datenschutz"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-accent-300 hover:bg-accent-50/30 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-shield-check-line text-accent-600 text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">{t('dash.datenschutz')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}