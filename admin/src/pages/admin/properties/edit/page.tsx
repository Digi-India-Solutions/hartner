import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/components/base/Toast';
import { ConfirmDialog } from '@/components/base/ConfirmDialog';
import { useProperties } from '@/hooks/PropertiesContext';
import type { Property, PropertyDetailFields, PropertyStatus, PropertyCategory } from '@/mocks/properties';
import { DetailFieldsGrid } from './components/DetailFieldsGrid';
import { CardPreviewFields } from './components/CardPreviewFields';
import { StatusPanel } from './components/StatusPanel';
import { ImageManager } from './components/ImageManager';

const emptyDetailFields: PropertyDetailFields = {
  wohnflaeche: '', nutzflaeche: '', widmung: '', grundflaeche: '',
  leerstand: '', befristungen: '', unbefristeteVermietung: '', bauPotenzial: '',
  balkonTerrassen: '', eigengaerten: '', abstellplatz: '', istErtragNetto: '',
  sollErtragNetto: '', durchschnittMietzins: '', rendite: '', baujahr: '',
  heizung: '', zustand: '', hwbFgee: '', kaufpreis: '', mieteMonatlich: '',
};

const categories: PropertyCategory[] = ['Zinshaus', 'Gewerbe & Investment', 'Haus & Wohnen', 'Mietobjekte'];

export default function PropertyEditorPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProperty, updateProperty, addProperty, uploadPropertyImages, deletePropertyImage } = useProperties();

  const isNew = id === 'new' || !id;

  const existing = !isNew && id ? getProperty(id) : undefined;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('Zinshaus');
  const [address, setAddress] = useState('');
  const [detailFields, setDetailFields] = useState<PropertyDetailFields>({ ...emptyDetailFields });
  const [cardFields, setCardFields] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<PropertyStatus>('Entwurf');
  const [images, setImages] = useState<string[]>([]);
  const [pendingFiles, setPendingFiles] = useState<{ file: File; url: string }[]>([]);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setCategory(existing.category);
      setAddress(existing.address);
      setDetailFields({ ...existing.detailFields });
      setCardFields([...(existing.cardFields || [])]);
      setDescription(existing.description);
      setStatus(existing.status);
      setImages([...existing.images]);
    }
    setInitialized(true);
  }, [existing]);

  const markDirty = useCallback(() => {
    if (initialized) setHasUnsaved(true);
  }, [initialized]);

  const handleSave = async () => {
    if (!title.trim()) {
      showToast(t('toast.titleRequired'), 'error');
      return;
    }

    const propertyData = {
      title: title.trim(),
      category,
      address: address.trim(),
      detailFields,
      cardFields,
      description: description.trim(),
      status,
      images: images.filter(url => !url.startsWith('blob:')),
    };

    try {
      if (isNew) {
        const newProperty = await addProperty(propertyData);
        if (pendingFiles.length > 0) {
          const files = pendingFiles.map((item) => item.file);
          await uploadPropertyImages(newProperty.id, files);
          pendingFiles.forEach((item) => URL.revokeObjectURL(item.url));
        }
        showToast(t('toast.propertyCreated'));
        setHasUnsaved(false);
        navigate(`/admin/properties/edit/${newProperty.id}`, { replace: true });
      } else if (id) {
        await updateProperty(id, propertyData);
        showToast(t('toast.propertySaved'));
        setHasUnsaved(false);
      }
    } catch (err: any) {
      showToast(err.message || 'Fehler beim Speichern', 'error');
    }
  };

  const handleFilesAdded = async (files: File[]) => {
    markDirty();
    if (isNew) {
      const newPending = files.map((file) => {
        const url = URL.createObjectURL(file);
        return { file, url };
      });
      setPendingFiles((prev) => [...prev, ...newPending]);
      setImages((prev) => [...prev, ...newPending.map((item) => item.url)]);
    } else if (id) {
      try {
        showToast(t('images.uploading') || 'Bilder werden hochgeladen...', 'info');
        const uploaded = await uploadPropertyImages(id, files);
        const uploadedUrls = uploaded.map((img: any) => {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
          return img.url.startsWith('/uploads') ? `${apiUrl}${img.url}` : img.url;
        });
        setImages((prev) => [...prev, ...uploadedUrls]);
        showToast(t('images.uploaded') || 'Bilder erfolgreich hochgeladen');
      } catch (err: any) {
        showToast(err.message || 'Fehler beim Hochladen der Bilder', 'error');
      }
    }
  };

  const handleImageRemoved = async (imageUrl: string) => {
    markDirty();
    if (imageUrl.startsWith('blob:')) {
      const matched = pendingFiles.find((item) => item.url === imageUrl);
      if (matched) {
        URL.revokeObjectURL(matched.url);
        setPendingFiles((prev) => prev.filter((item) => item.url !== imageUrl));
      }
      setImages((prev) => prev.filter((url) => url !== imageUrl));
    } else if (id) {
      try {
        await deletePropertyImage(id, imageUrl);
        setImages((prev) => prev.filter((url) => url !== imageUrl));
        showToast(t('images.deleted') || 'Bild gelöscht');
      } catch (err: any) {
        showToast(err.message || 'Fehler beim Löschen des Bildes', 'error');
      }
    }
  };

  const handlePreview = () => {
    showToast(t('toast.previewOpen'), 'info');
  };

  const handleNavigateAway = (to: string) => {
    if (hasUnsaved) {
      setPendingNavigation(to);
      setShowLeaveConfirm(true);
    } else {
      navigate(to);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => handleNavigateAway('/admin/properties')}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <i className="ri-arrow-left-line text-lg"></i>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? t('editor.headingNew') : t('editor.headingEdit')}
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Section 1: Grundinformationen */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">{t('editor.sectionBasic')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('editor.titleLabel')}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); markDirty(); }}
                  placeholder={t('editor.titlePlaceholder')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('editor.categoryLabel')}</label>
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value as PropertyCategory); markDirty(); }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('editor.addressLabel')}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); markDirty(); }}
                  placeholder={t('editor.addressPlaceholder')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Immobiliendetails */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">{t('editor.sectionDetails')}</h2>
            <DetailFieldsGrid
              fields={detailFields}
              onChange={(f) => { setDetailFields(f); markDirty(); }}
            />

            {/* Card preview field selector */}
            <CardPreviewFields
              detailFields={detailFields}
              selectedFields={cardFields}
              onChange={(fields) => { setCardFields(fields); markDirty(); }}
            />
          </div>

          {/* Section 3: Beschreibung */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">{t('editor.sectionDescription')}</h2>
            <textarea
              value={description}
              onChange={(e) => { setDescription(e.target.value); markDirty(); }}
              placeholder={t('editor.descriptionPlaceholder')}
              rows={8}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400 resize-y"
              style={{ minHeight: '200px' }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:w-[340px] flex-shrink-0 space-y-6">
          <StatusPanel
            status={status}
            onStatusChange={(s) => { setStatus(s); markDirty(); }}
            onSave={handleSave}
            onPreview={handlePreview}
            hasUnsavedChanges={hasUnsaved}
          />
          <ImageManager
            images={images}
            onImagesChange={(imgs) => { setImages(imgs); markDirty(); }}
            onFilesAdded={handleFilesAdded}
            onImageRemoved={handleImageRemoved}
          />
        </div>
      </div>

      <ConfirmDialog
        open={showLeaveConfirm}
        title={t('confirm.unsavedTitle')}
        message={t('confirm.unsavedMessage')}
        confirmLabel={t('confirm.leave')}
        danger
        onConfirm={() => {
          setShowLeaveConfirm(false);
          setHasUnsaved(false);
          if (pendingNavigation) navigate(pendingNavigation);
        }}
        onCancel={() => {
          setShowLeaveConfirm(false);
          setPendingNavigation(null);
        }}
      />
    </div>
  );
}