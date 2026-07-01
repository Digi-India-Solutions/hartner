import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { PropertyDetailFields } from '@/mocks/properties';

interface CardPreviewFieldsProps {
  detailFields: PropertyDetailFields;
  selectedFields: string[];
  onChange: (selected: string[]) => void;
}

const fieldKeys: (keyof PropertyDetailFields)[] = [
  'wohnflaeche', 'nutzflaeche', 'widmung', 'grundflaeche',
  'leerstand', 'befristungen', 'unbefristeteVermietung', 'bauPotenzial',
  'balkonTerrassen', 'eigengaerten', 'abstellplatz', 'istErtragNetto',
  'sollErtragNetto', 'durchschnittMietzins', 'rendite', 'baujahr',
  'heizung', 'zustand', 'hwbFgee', 'kaufpreis', 'mieteMonatlich',
];

export function CardPreviewFields({ detailFields, selectedFields, onChange }: CardPreviewFieldsProps) {
  const { t } = useTranslation();
  const [showMaxWarning, setShowMaxWarning] = useState(false);

  const handleToggle = useCallback(
    (key: string) => {
      const hasValue = detailFields[key as keyof PropertyDetailFields]?.trim();
      if (!hasValue) return;

      const isSelected = selectedFields.includes(key);

      if (isSelected) {
        setShowMaxWarning(false);
        onChange(selectedFields.filter((f) => f !== key));
      } else {
        if (selectedFields.length >= 4) {
          setShowMaxWarning(true);
          setTimeout(() => setShowMaxWarning(false), 2800);
          return;
        }
        setShowMaxWarning(false);
        onChange([...selectedFields, key]);
      }
    },
    [detailFields, selectedFields, onChange],
  );

  const isFieldDisabled = (key: string): { disabled: boolean; reason: string } => {
    const hasValue = detailFields[key as keyof PropertyDetailFields]?.trim();
    if (!hasValue) {
      return { disabled: true, reason: t('cardPreview.enterValueFirst') };
    }
    if (!selectedFields.includes(key) && selectedFields.length >= 4) {
      return { disabled: true, reason: t('cardPreview.maxReached') };
    }
    return { disabled: false, reason: '' };
  };

  const getPreviewFields = () => {
    return selectedFields
      .map((key) => ({
        key,
        label: t(`field.${key}`),
        value: detailFields[key as keyof PropertyDetailFields] || '',
      }))
      .filter((f) => f.value);
  };

  const previewFields = getPreviewFields();

  return (
    <div className="mt-6">
      {/* Section label */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          {t('editor.sectionCardPreview')}
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          {t('cardPreview.subLabel')}
        </p>

        {/* Selected count indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium text-gray-500">
            {t('cardPreview.selectedCount', { count: selectedFields.length })}
          </span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-500 rounded-full transition-all duration-200"
              style={{ width: `${(selectedFields.length / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Max warning banner */}
        {showMaxWarning && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <i className="ri-error-warning-line text-amber-500 text-sm flex-shrink-0"></i>
            <span className="text-xs text-amber-700">{t('cardPreview.maxWarning')}</span>
          </div>
        )}

        {/* Checkbox grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-h-[400px] overflow-y-auto pr-1">
          {fieldKeys.map((key) => {
            const { disabled, reason } = isFieldDisabled(key);
            const isChecked = selectedFields.includes(key);

            return (
              <label
                key={key}
                className={`flex items-center gap-2.5 py-1.5 px-2 rounded-md -mx-2 transition-colors ${
                  disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-50'
                }`}
                title={disabled ? reason : ''}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => handleToggle(key)}
                  className="w-4 h-4 rounded border-gray-300 text-accent-500 focus:ring-accent-300 cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
                />
                <span className="text-sm text-gray-700 truncate select-none">
                  {t(`field.${key}`)}
                </span>
                {disabled && !isChecked && (
                  <span className="text-[10px] text-gray-300 ml-auto hidden sm:inline-block whitespace-nowrap flex-shrink-0">
                    {reason}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">
          {t('cardPreview.previewLabel')}
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-[340px]">
          {/* Preview image placeholder */}
          <div className="h-[140px] bg-gray-100 flex items-center justify-center">
            <i className="ri-image-line text-3xl text-gray-300"></i>
          </div>
          {/* Preview info */}
          <div className="p-4 space-y-3">
            {/* Title placeholder */}
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>

            {/* Selected fields preview */}
            {previewFields.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {previewFields.map((f) => (
                  <div key={f.key} className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-gray-400 leading-tight">{f.label}</span>
                    <span className="text-xs font-medium text-gray-800 leading-tight truncate">
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 py-2">
                <i className="ri-information-line text-gray-300 text-sm"></i>
                <span className="text-xs text-gray-300 italic">
                  {t('cardPreview.emptyState')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}