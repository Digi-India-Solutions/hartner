import { useTranslation } from 'react-i18next';
import type { PropertyDetailFields } from '@/mocks/properties';

interface DetailFieldsGridProps {
  fields: PropertyDetailFields;
  onChange: (fields: PropertyDetailFields) => void;
}

const fieldKeys: (keyof PropertyDetailFields)[] = [
  'wohnflaeche', 'nutzflaeche', 'widmung', 'grundflaeche',
  'leerstand', 'befristungen', 'unbefristeteVermietung', 'bauPotenzial',
  'balkonTerrassen', 'eigengaerten', 'abstellplatz', 'istErtragNetto',
  'sollErtragNetto', 'durchschnittMietzins', 'rendite', 'baujahr',
  'heizung', 'zustand', 'hwbFgee', 'kaufpreis', 'mieteMonatlich',
];

export function DetailFieldsGrid({ fields, onChange }: DetailFieldsGridProps) {
  const { t } = useTranslation();

  const handleChange = (key: keyof PropertyDetailFields, value: string) => {
    onChange({ ...fields, [key]: value });
  };

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-accent-50/50 border border-accent-100 rounded-lg">
        <i className="ri-information-line text-accent-500 mt-0.5 flex-shrink-0"></i>
        <p className="text-xs text-accent-700">
          {t('fields.infoBanner')}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fieldKeys.map((key) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              {t(`field.${key}`)}
            </label>
            <input
              type="text"
              value={fields[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={t('fields.emptyPlaceholder')}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400 placeholder:text-gray-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}