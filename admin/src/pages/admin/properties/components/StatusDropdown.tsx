import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PropertyStatus } from '@/mocks/properties';

interface StatusDropdownProps {
  currentStatus: PropertyStatus;
  onStatusChange: (newStatus: PropertyStatus) => void;
  onDelete: () => void;
}

export function StatusDropdown({ currentStatus, onStatusChange, onDelete }: StatusDropdownProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isPublished = currentStatus === 'Veröffentlicht';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <i className={isPublished ? 'ri-eye-line' : 'ri-eye-off-line'}></i>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
          {isPublished ? (
            <>
              <button
                onClick={() => { onStatusChange('Offline'); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
              >
                <i className="ri-eye-off-line"></i>
                {t('status.markOffline')}
              </button>
              <button
                onClick={() => { onStatusChange('Entwurf'); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2 cursor-pointer"
              >
                <i className="ri-draft-line"></i>
                {t('status.saveDraft')}
              </button>
            </>
          ) : (
            <button
              onClick={() => { onStatusChange('Veröffentlicht'); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2 cursor-pointer"
            >
              <i className="ri-eye-line"></i>
              {t('status.republish')}
            </button>
          )}
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
          >
            <i className="ri-delete-bin-line"></i>
            {t('status.delete')}
          </button>
        </div>
      )}
    </div>
  );
}