import { useTranslation } from 'react-i18next';
import type { PropertyStatus, PropertyCategory } from '@/mocks/properties';

const statusColorConfig: Record<PropertyStatus, { bg: string; text: string; dot: string }> = {
  Veröffentlicht: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  Offline: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    dot: 'bg-red-500',
  },
  Entwurf: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
};

const statusLabelKeys: Record<PropertyStatus, string> = {
  Veröffentlicht: 'status.published',
  Offline: 'status.offline',
  Entwurf: 'status.draft',
};

export function StatusBadge({ status }: { status: PropertyStatus }) {
  const { t } = useTranslation();
  const cfg = statusColorConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
      {t(statusLabelKeys[status])}
    </span>
  );
}

const categoryColors: Record<PropertyCategory, string> = {
  Zinshaus: 'bg-indigo-50 text-indigo-700',
  'Gewerbe & Investment': 'bg-sky-50 text-sky-700',
  'Haus & Wohnen': 'bg-emerald-50 text-emerald-700',
  Mietobjekte: 'bg-violet-50 text-violet-700',
};

export function CategoryBadge({ category }: { category: PropertyCategory }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
}