import { ConfirmDialog } from '@/components/base/ConfirmDialog';
import { showToast } from '@/components/base/Toast';
import { useProperties } from '@/hooks/PropertiesContext';
import type { Property, PropertyStatus } from '@/mocks/properties';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FilterBar } from './components/FilterBar';
import { CategoryBadge, StatusBadge } from './components/StatusBadge';
import { StatusDropdown } from './components/StatusDropdown';

function DraggableRow({ property, index }: { property: Property; index: number }) {
  const { t } = useTranslation();
  const { updatePropertyStatus, deleteProperty } = useProperties();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: property.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleStatusChange = async (newStatus: PropertyStatus) => {
    try {
      await updatePropertyStatus(property.id, newStatus);
      const statusTexts: Record<PropertyStatus, string> = {
        Veröffentlicht: t('toast.statusVeröffentlicht'),
        Offline: t('toast.statusOffline'),
        Entwurf: t('toast.statusEntwurf'),
      };
      showToast(t('toast.propertyStatusChanged', { title: property.title, status: statusTexts[newStatus] }));
    } catch (err: any) {
      showToast(err.message || 'Status konnte nicht geändert werden', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProperty(property.id);
      setDeleteConfirmOpen(false);
      showToast(t('toast.propertyDeleted', { title: property.title }));
    } catch (err: any) {
      showToast(err.message || 'Löschen fehlgeschlagen', 'error');
    }
  };

  return (
    <>
      <tr
        ref={setNodeRef}
        style={style}
        className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors group ${
          isDragging ? 'bg-accent-50/50' : ''
        }`}
      >
        <td className="pl-4 pr-1 py-3 w-10">
          <button
            {...attributes}
            {...listeners}
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-300 hover:text-gray-500 hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
          >
            <i className="ri-draggable text-lg"></i>
          </button>
        </td>
        <td className="px-2 py-3 w-[76px]">
          <div className="w-[60px] h-[45px] rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
            {property.thumbnail ? (
              <img
                src={property.thumbnail}
                alt={property.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <i className="ri-building-line text-gray-400 text-lg"></i>
            )}
          </div>
        </td>
        <td className="px-3 py-3">
          <Link
            to={`/admin/properties/edit/${property.id}`}
            className="text-sm font-medium text-gray-900 hover:text-accent-600 transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </Link>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{property.address}</p>
        </td>
        <td className="px-3 py-3">
          <CategoryBadge category={property.category} />
        </td>
        <td className="px-3 py-3">
          <StatusBadge status={property.status} />
        </td>
        <td className="px-3 py-3 text-sm text-gray-500 whitespace-nowrap">
          {new Date(property.createdAt).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </td>
        <td className="px-3 py-3">
          <div className="flex items-center gap-1">
            <Link
              to={`/admin/properties/edit/${property.id}`}
              className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors cursor-pointer"
              title={t('status.edit')}
            >
              <i className="ri-pencil-line"></i>
            </Link>
            <StatusDropdown
              currentStatus={property.status}
              onStatusChange={handleStatusChange}
              onDelete={() => setDeleteConfirmOpen(true)}
            />
          </div>
        </td>
      </tr>
      <ConfirmDialog
        open={deleteConfirmOpen}
        title={t('confirm.deletePropertyTitle')}
        message={t('confirm.deletePropertyMessage', { title: property.title })}
        confirmLabel={t('confirm.delete')}
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </>
  );
}

export default function PropertiesListPage() {
  const { t } = useTranslation();
  const {
  properties,
  loading,
  loadingMore,
  hasMore,
  loadMore,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  resetAndFetch,
  reorderProperties,
} = useProperties();
  const [activeFilter, setActiveFilter] = useState<PropertyStatus | 'Alle'>('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  const isFirstMount = useRef(true);
  // const sentinelRef = useRef<HTMLTableRowElement | null>(null);

  // Debounce search query changes by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch properties from server when search or filter changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    resetAndFetch(activeFilter, debouncedSearch);
  }, [activeFilter, debouncedSearch, resetAndFetch]);

  // Infinite scroll using IntersectionObserver on sentinel element
  // useEffect(() => {
  //   if (loading || loadingMore || !hasMore) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         loadMore();
  //       }
  //     },
  //     { threshold: 0.1 }
  //   );

  //   const currentSentinel = sentinelRef.current;
  //   if (currentSentinel) {
  //     observer.observe(currentSentinel);
  //   }

  //   return () => {
  //     if (currentSentinel) {
  //       observer.unobserve(currentSentinel);
  //     }
  //   };
  // }, [loading, loadingMore, hasMore, loadMore]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Data is filtered on server, so filtered list is just the properties list
  const filtered = properties;

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = filtered.findIndex((p) => p.id === active.id);
    const newIndex = filtered.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const globalOldIndex = properties.findIndex((p) => p.id === active.id);
    const globalNewIndex = properties.findIndex((p) => p.id === over.id);
    
    try {
      await reorderProperties(globalOldIndex, globalNewIndex);
      showToast(t('toast.orderSaved'));
    } catch (err: any) {
      showToast(err.message || 'Reihenfolge konnte nicht gespeichert werden', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <i className="ri-loader-4-line animate-spin text-3xl text-accent-500"></i>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('props.heading')}</h1>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-add-line text-lg"></i>
          {t('props.newProperty')}
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pl-4 pr-1 py-3 w-10"></th>
                  <th className="px-2 py-3 w-[76px]"></th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t('props.table.title')}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t('props.table.category')}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t('props.table.status')}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t('props.table.created')}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-[100px]">
                    {t('props.table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <SortableContext
                  items={filtered.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filtered.map((property, index) => (
                    <DraggableRow
                      key={property.id}
                      property={property}
                      index={index}
                    />
                  ))}
                </SortableContext>

                {/* Sentinel row for infinite scroll observer */}
                {/* {hasMore && (
                  <tr ref={sentinelRef}>
                    <td colSpan={7} className="h-4"></td>
                  </tr>
                )} */}

                {/* Spinner inside the table when loading more */}
                {/* {loadingMore && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center">
                      <div className="flex items-center justify-center bg-gray-50/10">
                        <i className="ri-loader-4-line animate-spin text-2xl text-accent-500"></i>
                      </div>
                    </td>
                  </tr>
                )} */}
              </tbody>
            </table>
          </div>
        </DndContext>

        {filtered.length === 0 && !loading && !loadingMore && (
          <div className="py-16 text-center text-sm text-gray-400">
            {t('props.noResults')}
          </div>
        )}

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
  <button
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
  >
    Previous
  </button>

  <span className="text-sm font-medium text-gray-700">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
  >
    Next
  </button>
</div>

        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <i className="ri-information-line"></i>
            {t('props.dragHintBefore')}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-200">
              <i className="ri-draggable text-xs text-gray-400"></i>
            </span>
            {t('props.dragHintAfter')}
          </p>
        </div>
      </div>
    </div>
  );
}