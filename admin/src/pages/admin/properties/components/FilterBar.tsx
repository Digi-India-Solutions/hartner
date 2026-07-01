import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { PropertyStatus } from '@/mocks/properties';
import { useProperties } from '@/hooks/PropertiesContext';

interface FilterBarProps {
  activeFilter: PropertyStatus | 'Alle';
  onFilterChange: (filter: PropertyStatus | 'Alle') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  const { t } = useTranslation();
  const { properties } = useProperties();

  const filters: { key: PropertyStatus | 'Alle'; labelKey: string }[] = [
    { key: 'Alle', labelKey: 'props.filter.all' },
    { key: 'Veröffentlicht', labelKey: 'props.filter.published' },
    { key: 'Offline', labelKey: 'props.filter.offline' },
    { key: 'Entwurf', labelKey: 'props.filter.draft' },
  ];

  const counts = useMemo(() => {
    return {
      Alle: properties.length,
      Veröffentlicht: properties.filter((p) => p.status === 'Veröffentlicht').length,
      Offline: properties.filter((p) => p.status === 'Offline').length,
      Entwurf: properties.filter((p) => p.status === 'Entwurf').length,
    };
  }, [properties]);

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === f.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t(f.labelKey)}
            <span className="ml-1.5 text-xs text-gray-400">({counts[f.key]})</span>
          </button>
        ))}
      </div>
      <div className="relative">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
        <input
          type="text"
          placeholder={t('props.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400 bg-white"
        />
      </div>
    </div>
  );
}