import { useTranslation } from 'react-i18next';
import type { PropertyDetailFields } from '@/mocks/properties';

interface PropertyCardPreviewProps {
  detailFields: PropertyDetailFields;
  selectedFields: string[];
  title?: string;
  address?: string;
  images?: string[];
}

export function PropertyCardPreview({
  detailFields,
  selectedFields,
  title,
  address,
  images,
}: PropertyCardPreviewProps) {
  const { t } = useTranslation();

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
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
        {t('cardPreview.previewLabel')}
      </p>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-[340px] shadow-sm hover:shadow-md transition-shadow">
        {/* Preview image */}
        <div className="h-[180px] bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
          {images && images.length > 0 ? (
            <img
              src={images[0]}
              alt={title || "Property Preview"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-1 bg-gray-100">
              <i className="ri-image-line text-3xl"></i>
              <span className="text-xs">Kein Bild hochgeladen</span>
            </div>
          )}
        </div>
        {/* Preview info */}
        <div className="p-4 space-y-3">
          {/* Title + Price */}
          <div className="space-y-1.5">
            {title ? (
              <h4 className="font-semibold text-gray-900 text-sm truncate leading-snug" title={title}>
                {title}
              </h4>
            ) : (
              <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
            )}
            
            <div className="flex justify-between items-center gap-2">
              {address ? (
                <div className="flex items-center gap-1 text-gray-500 min-w-0">
                  <i className="ri-map-pin-line text-xs flex-shrink-0 text-gray-400"></i>
                  <span className="text-xs truncate" title={address}>{address}</span>
                </div>
              ) : (
                <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse"></div>
              )}
              
              <span className="text-xs font-bold text-accent-600 whitespace-nowrap flex-shrink-0">
                {detailFields.kaufpreis ? `${detailFields.kaufpreis}` : (detailFields.mieteMonatlich ? `${detailFields.mieteMonatlich}` : "Preis auf Anfrage")}
              </span>
            </div>
          </div>

          {/* Selected fields preview */}
          {previewFields.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3 border-t border-gray-100">
              {previewFields.map((f) => (
                <div key={f.key} className="flex items-start gap-1 min-w-0">
                  <i className="ri-arrow-right-double-line text-accent-500 text-sm flex-shrink-0 mt-0.5"></i>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">{f.label}</span>
                    <span className="text-xs font-semibold text-gray-700 leading-tight truncate" title={f.value}>
                      {f.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 py-2 border-t border-gray-100">
              <i className="ri-information-line text-gray-300 text-sm"></i>
              <span className="text-xs text-gray-300 italic">
                {t('cardPreview.emptyState')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
