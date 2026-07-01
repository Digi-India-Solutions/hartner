import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/components/base/Toast';
import RichTextEditor from './components/RichTextEditor';

const impressumSample = `<h2>Impressum</h2><p><strong>Haertner Immobilien GmbH</strong></p><p>Josefstädter Straße 45<br>1080 Wien<br>Österreich</p><p><strong>Vertretungsberechtigte Geschäftsführer:</strong><br>Mag. Alexander Haertner</p><p><strong>Kontakt:</strong><br>Telefon: +43 1 234 56 78<br>E-Mail: office@haertner.at</p><p><strong>Firmenbuchnummer:</strong><br>FN 123456a</p><p><strong>Firmenbuchgericht:</strong><br>Handelsgericht Wien</p><p><strong>UID-Nummer:</strong><br>ATU12345678</p><p><strong>Aufsichtsbehörde:</strong><br>Bezirkshauptmannschaft Wien</p><p><strong>Berufsbezeichnung:</strong><br>Immobilientreuhänder (Immobilienmakler)</p><p><strong>Staat der Zulassung:</strong><br>Österreich</p>`;

const datenschutzSample = `<h2>Datenschutzerklärung</h2><p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).</p><h3>1. Verantwortlicher</h3><p><strong>Haertner Immobilien GmbH</strong><br>Josefstädter Straße 45, 1080 Wien<br>E-Mail: office@haertner.at</p><h3>2. Datenerfassung auf unserer Website</h3><p>Wenn Sie unsere Website besuchen, werden automatisch technische Zugriffsdaten (IP-Adresse, Browsertyp, Betriebssystem, Referrer URL) vom Webserver erfasst. Diese Daten werden ausschließlich zu statistischen Zwecken und zur Verbesserung unseres Angebots verwendet.</p><h3>3. Cookies</h3><p>Unsere Website verwendet technisch notwendige Cookies, um die ordnungsgemäße Funktion der Website zu gewährleisten. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben.</p><h3>4. Ihre Rechte</h3><p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, wenden Sie sich an uns oder die Datenschutzbehörde.</p>`;

export default function LegalPagesPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const activeTab = location.pathname.includes('datenschutz') ? 'datenschutz' : 'impressum';

  const [hasUnsaved, setHasUnsaved] = useState(false);

  const handleSave = () => {
    showToast(t('toast.pageSaved'));
    setHasUnsaved(false);
  };

  const handlePreview = () => {
    showToast(t('toast.previewOpen'), 'info');
  };

  const handleContentChange = () => {
    setHasUnsaved(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {activeTab === 'impressum' ? t('legal.headingImpressum') : t('legal.headingDatenschutz')}
      </h1>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <Link
          to="/admin/pages/impressum"
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'impressum'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('legal.tabImpressum')}
        </Link>
        <Link
          to="/admin/pages/datenschutz"
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'datenschutz'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('legal.tabDatenschutz')}
        </Link>
      </div>

      {/* Unsaved banner */}
      {hasUnsaved && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <i className="ri-alert-line text-amber-600 text-sm"></i>
          <p className="text-xs text-amber-700">{t('legal.unsavedChanges')}</p>
        </div>
      )}

      {/* Editor */}
      <div className="mb-6">
        <RichTextEditor
          initialContent={activeTab === 'impressum' ? impressumSample : datenschutzSample}
          onChange={handleContentChange}
        />
      </div>

      {/* Save controls */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handlePreview}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <i className="ri-external-link-line"></i>
          {t('legal.preview')}
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2.5 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          {t('legal.saveChanges')}
        </button>
      </div>
    </div>
  );
}