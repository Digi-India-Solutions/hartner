import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ConfirmDialog } from '@/components/base/ConfirmDialog';
import { showToast } from '@/components/base/Toast';

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ImageManagerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onFilesAdded?: (files: File[]) => void;
  onImageRemoved?: (url: string) => void;
}

function SortableImage({
  url,
  index,
  isSelected,
  isFirst,
  onToggleSelect,
  onRemove,
}: {
  url: string;
  index: number;
  isSelected: boolean;
  isFirst: boolean;
  onToggleSelect: (index: number, shiftKey: boolean) => void;
  onRemove: (index: number) => void;
}) {
  const { t } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `img-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-lg overflow-hidden border-2 transition-colors ${
        isSelected ? 'border-accent-500' : 'border-gray-200 hover:border-gray-300'
      } ${isDragging ? 'z-50 shadow-lg' : ''}`}
    >
      <div className="aspect-[4/3] bg-gray-100">
        <img src={url} alt={`${t('images.title')} ${index + 1}`} className="w-full h-full object-cover object-top" />
      </div>

      {/* Checkbox */}
      <div className="absolute top-2 left-2">
        <label
          className="w-5 h-5 flex items-center justify-center rounded bg-white/90 border border-gray-300 cursor-pointer hover:border-accent-400 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(index, (e as unknown as MouseEvent).shiftKey);
          }}
        >
          {isSelected && (
            <i className="ri-check-line text-accent-600 text-xs"></i>
          )}
        </label>
      </div>

      {/* Delete button */}
      <button
        onClick={() => setShowDelete(true)}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white cursor-pointer transition-colors opacity-0 group-hover:opacity-100"
      >
        <i className="ri-close-line text-sm"></i>
      </button>

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center rounded bg-white/90 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition-colors opacity-0 group-hover:opacity-100"
      >
        <i className="ri-draggable text-sm"></i>
      </div>

      {/* Featured badge */}
      {isFirst && (
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-accent-500 text-white text-[10px] font-medium rounded">
          {t('images.featured')}
        </div>
      )}

      <ConfirmDialog
        open={showDelete}
        title={t('confirm.deletePhotoTitle')}
        message={t('confirm.deletePhotoMessage')}
        confirmLabel={t('confirm.delete')}
        danger
        onConfirm={() => {
          onRemove(index);
          setShowDelete(false);
        }}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}

export function ImageManager({ images, onImagesChange, onFilesAdded, onImageRemoved }: ImageManagerProps) {
  const { t } = useTranslation();
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastClickedRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt(String(active.id).replace('img-', ''));
    const newIndex = parseInt(String(over.id).replace('img-', ''));
    if (isNaN(oldIndex) || isNaN(newIndex)) return;

    const next = [...images];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved);
    onImagesChange(next);
  };

  const handleToggleSelect = useCallback(
    (index: number, shiftKey: boolean) => {
      setSelectedIndices((prev) => {
        const next = new Set(prev);

        if (shiftKey && lastClickedRef.current !== null) {
          const start = Math.min(lastClickedRef.current, index);
          const end = Math.max(lastClickedRef.current, index);
          for (let i = start; i <= end; i++) next.add(i);
        } else {
          if (next.has(index)) next.delete(index);
          else next.add(index);
        }

        lastClickedRef.current = index;
        return next;
      });
    },
    []
  );

  const handleSelectAll = () => {
    if (selectedIndices.size === images.length) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(images.map((_, i) => i)));
    }
  };

  const handleBulkDelete = () => {
    const sorted = [...selectedIndices].sort((a, b) => b - a);
    let next = [...images];
    sorted.forEach((i) => {
      const url = images[i];
      onImageRemoved?.(url);
      next = next.filter((_, idx) => idx !== i);
    });
    onImagesChange(next);
    setSelectedIndices(new Set());
    setShowBulkDelete(false);
  };

  const handleRemoveSingle = (index: number) => {
    const url = images[index];
    onImageRemoved?.(url);
    onImagesChange(images.filter((_, i) => i !== index));
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return new Set([...next].map((i) => (i > index ? i - 1 : i)));
    });
  };

  const handleFiles = useCallback(
    (files: File[]) => {
      const validFiles = files.filter((f) => VALID_IMAGE_TYPES.includes(f.type));

      if (validFiles.length === 0 && files.length > 0) {
        showToast(t('images.invalidFileType'), 'error');
        return;
      }

      if (validFiles.length < files.length) {
        showToast(t('images.invalidFileType'), 'error');
      }

      if (onFilesAdded) {
        onFilesAdded(validFiles);
      } else {
        const newUrls = validFiles.map((f) => URL.createObjectURL(f));
        onImagesChange([...images, ...newUrls]);
      }
    },
    [images, onImagesChange, onFilesAdded, t]
  );

  // ---- Drag-and-drop handlers for the upload drop zone ----

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(Array.from(droppedFiles));
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(Array.from(selectedFiles));
    }
    // Reset so the same file can be re-uploaded if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const selectedCount = selectedIndices.size;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('images.title')}</h3>

      {/* Hidden file input for click-to-upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        aria-hidden="true"
      />

      {/* Upload drop zone */}
      <div
        onClick={handleClickUpload}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 rounded-lg p-6 text-center cursor-pointer mb-4 transition-all duration-150 ${
          isDragging
            ? 'border-solid border-accent-500 bg-accent-50/40'
            : 'border-dashed border-gray-300 hover:border-accent-400 hover:bg-accent-50/20'
        }`}
      >
        <div
          className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center transition-colors duration-150 ${
            isDragging ? 'bg-accent-100' : 'bg-accent-50'
          }`}
        >
          <i
            className={`text-lg transition-colors duration-150 ${
              isDragging ? 'ri-upload-cloud-fill text-accent-500' : 'ri-upload-cloud-2-line text-accent-500'
            }`}
          ></i>
        </div>
        {isDragging ? (
          <p className="text-sm font-medium text-accent-600">{t('images.dropHere')}</p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">{t('images.upload')}</p>
            <p className="text-xs text-gray-400 mt-1">{t('images.uploadHint')}</p>
          </>
        )}
      </div>

      {/* Bulk action bar */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between mb-4 p-3 bg-accent-50/50 border border-accent-100 rounded-lg">
          <span className="text-xs font-medium text-accent-700">
            {selectedCount}{' '}
            {selectedCount === 1 ? t('images.selected_one') : t('images.selected_other')}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectAll}
              className="text-xs text-accent-600 hover:text-accent-700 cursor-pointer whitespace-nowrap"
            >
              {selectedCount === images.length ? t('images.deselectAll') : t('images.selectAll')}
            </button>
            <button
              onClick={() => setShowBulkDelete(true)}
              className="text-xs text-red-500 hover:text-red-600 cursor-pointer whitespace-nowrap"
            >
              {t('images.deleteSelected')}
            </button>
          </div>
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((_, i) => `img-${i}`)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-3 gap-3">
              {images.map((url, i) => (
                <SortableImage
                  key={`img-${i}`}
                  url={url}
                  index={i}
                  isSelected={selectedIndices.has(i)}
                  isFirst={i === 0}
                  onToggleSelect={handleToggleSelect}
                  onRemove={handleRemoveSingle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="py-8 text-center text-sm text-gray-300">
          <i className="ri-image-line text-2xl block mb-2"></i>
          {t('images.noImages')}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
          <i className="ri-information-line"></i>
          {t('images.featuredHint')}
        </p>
      )}

      <ConfirmDialog
        open={showBulkDelete}
        title={t('confirm.deletePhotosTitle')}
        message={t('confirm.deletePhotosMessage', { count: selectedCount, plural: selectedCount !== 1 ? 's' : '' })}
        confirmLabel={t('confirm.delete')}
        danger
        onConfirm={handleBulkDelete}
        onCancel={() => setShowBulkDelete(false)}
      />
    </div>
  );
}