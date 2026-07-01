import { useTranslation } from 'react-i18next';
import type { PropertyStatus } from '@/mocks/properties';

interface StatusPanelProps {
  status: PropertyStatus;
  onStatusChange: (status: PropertyStatus) => void;
  onSave: () => void;
  onPreview: () => void;
  hasUnsavedChanges: boolean;
}

const statusLabelKeys: Record<PropertyStatus, string> = {
  Veröffentlicht: 'status.published',
  Offline: 'status.offline',
  Entwurf: 'status.draft',
};

const statusOptions: PropertyStatus[] = ['Veröffentlicht', 'Offline', 'Entwurf'];

export function StatusPanel({
  status,
  onStatusChange,
  onSave,
  onPreview,
  hasUnsavedChanges,
}: StatusPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('panel.status')}</h3>

      {hasUnsavedChanges && (
        <div className="flex items-center gap-2 mb-4 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
          <i className="ri-alert-line text-amber-600 text-sm"></i>
          <p className="text-xs text-amber-700">{t('panel.unsavedChanges')}</p>
        </div>
      )}

      <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('panel.statusLabel')}</label>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as PropertyStatus)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300 cursor-pointer mb-4"
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {t(statusLabelKeys[opt])}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-2">
        <button
          onClick={onSave}
          className="w-full px-4 py-2.5 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          {t('panel.save')}
        </button>
        <button
          onClick={onPreview}
          className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span className="flex items-center justify-center gap-2">
            <i className="ri-external-link-line"></i>
            {t('panel.preview')}
          </span>
        </button>
      </div>
    </div>
  );
}