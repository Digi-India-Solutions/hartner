import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  property?: {
    id: string;
    title: string;
    address: string;
    kaufpreis: string;
    slug: string;
  };
  created_at: string;
}

export default function InquiriesListPage() {
  const { t } = useTranslation();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const token = sessionStorage.getItem('haertner_token');
      
      const res = await fetch(`${apiUrl}/api/inquiries`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        sessionStorage.removeItem('haertner_auth');
        sessionStorage.removeItem('haertner_token');
        window.location.href = '/admin/login';
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.data || []);
      } else {
        throw new Error(data.message || 'Fehler beim Laden der Anfragen.');
      }
    } catch (err: any) {
      setError(err.message || 'Verbindung zum Server fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Möchten Sie diese Anfrage wirklich löschen?')) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const token = sessionStorage.getItem('haertner_token');

      const res = await fetch(`${apiUrl}/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      } else {
        alert(data.message || 'Fehler beim Löschen.');
      }
    } catch (err: any) {
      alert(err.message || 'Serverfehler beim Löschen.');
    }
  };

  const filteredInquiries = useMemo(() => {
    if (!searchQuery.trim()) return inquiries;
    const query = searchQuery.toLowerCase();
    return inquiries.filter(
      (inq) =>
        inq.name.toLowerCase().includes(query) ||
        inq.email.toLowerCase().includes(query) ||
        inq.subject.toLowerCase().includes(query) ||
        inq.message.toLowerCase().includes(query) ||
        (inq.property && inq.property.title.toLowerCase().includes(query))
    );
  }, [inquiries, searchQuery]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('de-AT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kontaktanfragen</h1>
          <p className="text-sm text-gray-500 mt-1">
            Alle über das Kontaktformular der Website eingegangenen Anfragen
          </p>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Search filter bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center gap-4 flex-wrap">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Anfragen durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400 bg-white"
            />
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {filteredInquiries.length} {filteredInquiries.length === 1 ? 'Anfrage' : 'Anfragen'} gefunden
          </span>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <i className="ri-loader-4-line animate-spin text-3xl text-accent-500"></i>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            <i className="ri-error-warning-line text-4xl mb-2 block"></i>
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchInquiries}
              className="mt-4 px-4 py-2 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 cursor-pointer"
            >
              Erneut versuchen
            </button>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            Keine Kontaktanfragen gefunden.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-50/70 select-none">
                  <th className="px-6 py-4">Datum</th>
                  <th className="px-6 py-4">Absender</th>
                  <th className="px-6 py-4">Betreff</th>
                  <th className="px-6 py-4">Nachricht</th>
                  <th className="px-6 py-4">Bezugsobjekt</th>
                  <th className="px-6 py-4 text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(inq.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{inq.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{inq.email}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{inq.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-[200px] truncate">
                      {inq.subject}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[300px] truncate">
                      {inq.message}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      {inq.property ? (
                        <Link
                          to={`/admin/properties/edit/${inq.property.id}`}
                          className="inline-flex flex-col text-sm text-accent-600 hover:text-accent-700 hover:underline"
                        >
                          <span className="font-medium truncate max-w-[200px]">{inq.property.title}</span>
                          <span className="text-xs text-gray-400 mt-0.5">{inq.property.address}</span>
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-400">Allgemeine Anfrage</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleDelete(inq.id, e)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Löschen"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-150 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Anfragedetails</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Eingegangen am {formatDate(selectedInquiry.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-200 transition cursor-pointer text-xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-sm text-gray-700">
              {/* Absender */}
              <div className="grid grid-cols-3 border-b border-gray-100 pb-4">
                <div className="font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Absender</div>
                <div className="col-span-2 space-y-1">
                  <div className="font-semibold text-gray-900">{selectedInquiry.name}</div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <i className="ri-mail-line text-gray-400"></i>
                    <a href={`mailto:${selectedInquiry.email}`} className="hover:underline hover:text-accent-500">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <i className="ri-phone-line text-gray-400"></i>
                    <a href={`tel:${selectedInquiry.phone}`} className="hover:underline hover:text-accent-500">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Bezugsobjekt */}
              <div className="grid grid-cols-3 border-b border-gray-100 pb-4">
                <div className="font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Bezugsobjekt</div>
                <div className="col-span-2">
                  {selectedInquiry.property ? (
                    <div className="space-y-1.5">
                      <div className="font-semibold text-gray-900">{selectedInquiry.property.title}</div>
                      <div className="text-xs text-gray-400">{selectedInquiry.property.address}</div>
                      {selectedInquiry.property.kaufpreis && (
                        <div className="text-xs font-semibold text-gray-700">
                          Preis: {selectedInquiry.property.kaufpreis}
                        </div>
                      )}
                      <Link
                        to={`/admin/properties/edit/${selectedInquiry.property.id}`}
                        onClick={() => setSelectedInquiry(null)}
                        className="inline-flex items-center gap-1 text-xs text-accent-600 hover:text-accent-700 hover:underline font-semibold mt-1"
                      >
                        <i className="ri-edit-line"></i>
                        Objekt im Admin bearbeiten
                      </Link>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Allgemeine Anfrage (Kein spezifisches Objekt)</span>
                  )}
                </div>
              </div>

              {/* Betreff */}
              <div className="grid grid-cols-3 border-b border-gray-100 pb-4">
                <div className="font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Betreff</div>
                <div className="col-span-2 font-semibold text-gray-900">{selectedInquiry.subject}</div>
              </div>

              {/* Nachricht */}
              <div className="space-y-2">
                <div className="font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Nachricht</div>
                <div className="bg-gray-50 p-4 rounded-xl text-gray-800 leading-relaxed font-sans whitespace-pre-wrap min-h-[100px] border border-gray-150">
                  {selectedInquiry.message || <span className="text-gray-400 italic">Keine Nachricht eingegeben.</span>}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-150 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition cursor-pointer text-sm"
              >
                Schließen
              </button>
              <button
                onClick={(e) => {
                  handleDelete(selectedInquiry.id, e);
                }}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition cursor-pointer text-sm"
              >
                Anfrage löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
