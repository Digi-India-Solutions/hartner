import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('settings.heading')}</h1>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('settings.general')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('settings.companyName')}</label>
              <input
                type="text"
                defaultValue="Haertner Immobilien"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('settings.adminEmail')}</label>
              <input
                type="email"
                defaultValue="admin@haertner.at"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('settings.language')}</label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300 cursor-pointer">
                <option>Deutsch</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('settings.changePassword')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('settings.currentPassword')}</label>
              <input type="password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('settings.newPassword')}</label>
              <input type="password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('settings.confirmPassword')}</label>
              <input type="password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300" />
            </div>
            <button className="px-4 py-2 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
              {t('settings.passwordBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}