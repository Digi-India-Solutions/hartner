import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import type { Property, PropertyStatus, PropertyCategory } from '@/mocks/properties';

const mapCategoryToBackend = (cat: PropertyCategory): string => {
  switch (cat) {
    case 'Zinshaus': return 'zinshaus';
    case 'Gewerbe & Investment': return 'gewerbe';
    case 'Haus & Wohnen': return 'haus_wohnen';
    case 'Mietobjekte': return 'mietobjekte';
    default: return 'zinshaus';
  }
};

const mapCategoryToFrontend = (cat: string): PropertyCategory => {
  switch (cat) {
    case 'zinshaus': return 'Zinshaus';
    case 'gewerbe': return 'Gewerbe & Investment';
    case 'haus_wohnen': return 'Haus & Wohnen';
    case 'mietobjekte': return 'Mietobjekte';
    default: return 'Zinshaus';
  }
};

const mapStatusToBackend = (status: PropertyStatus): string => {
  switch (status) {
    case 'Veröffentlicht': return 'published';
    case 'Offline': return 'offline';
    case 'Entwurf': return 'draft';
    default: return 'draft';
  }
};

const mapStatusToFrontend = (status: string): PropertyStatus => {
  switch (status) {
    case 'published': return 'Veröffentlicht';
    case 'offline': return 'Offline';
    case 'draft': return 'Entwurf';
    default: return 'Entwurf';
  }
};

const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/uploads')) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    return `${apiUrl}${url}`;
  }
  return url;
};

const mapToFrontendProperty = (backendProp: any): Property => {
  const details = backendProp.details || {};
  return {
    id: backendProp.id || backendProp._id,
    title: backendProp.title || '',
    category: mapCategoryToFrontend(backendProp.category),
    address: backendProp.address || '',
    status: mapStatusToFrontend(backendProp.status),
    createdAt: backendProp.created_at || backendProp.createdAt || new Date().toISOString(),
    thumbnail: (backendProp.images && backendProp.images.length > 0) ? resolveImageUrl(backendProp.images[0].url) : '',
    detailFields: {
      wohnflaeche: details.wohnflaeche || '',
      nutzflaeche: details.nutzflaeche || '',
      widmung: details.widmung || '',
      grundflaeche: details.grundflaeche || '',
      leerstand: details.leerstand || '',
      befristungen: details.befristungen || '',
      unbefristeteVermietung: details.unbefristete_vermietung || '',
      bauPotenzial: details.bau_potenzial || '',
      balkonTerrassen: details.balkon_terrassen || '',
      eigengaerten: details.eigengareten || '',
      abstellplatz: details.abstellplatz || '',
      istErtragNetto: details.ist_ertrag_netto || '',
      sollErtragNetto: details.soll_ertrag_netto || '',
      durchschnittMietzins: details.ist_netto_mietzins || '',
      rendite: details.rendite || '',
      baujahr: details.baujahr || '',
      heizung: details.heizung || '',
      zustand: details.zustand || '',
      hwbFgee: details.hwb_fgee || '',
      kaufpreis: details.kaufpreis || '',
      mieteMonatlich: details.miete_monatlich || '',
    },
    cardFields: backendProp.card_fields || [],
    description: backendProp.description || '',
    images: (backendProp.images || []).map((img: any) => resolveImageUrl(img.url)),
  };
};

const mapToBackendProperty = (frontendProp: any): any => {
  const detailFields = frontendProp.detailFields || {};
  return {
    title: frontendProp.title,
    category: mapCategoryToBackend(frontendProp.category),
    address: frontendProp.address,
    status: mapStatusToBackend(frontendProp.status),
    description: frontendProp.description,
    images: (frontendProp.images || []).map((url: string, idx: number) => ({
      id: String(idx),
      url,
      sort_order: idx,
    })),
    card_fields: frontendProp.cardFields || [],
    details: {
      wohnflaeche: detailFields.wohnflaeche,
      nutzflaeche: detailFields.nutzflaeche,
      widmung: detailFields.widmung,
      grundflaeche: detailFields.grundflaeche,
      leerstand: detailFields.leerstand,
      befristungen: detailFields.befristungen,
      unbefristete_vermietung: detailFields.unbefristeteVermietung,
      bau_potenzial: detailFields.bauPotenzial,
      balkon_terrassen: detailFields.balkonTerrassen,
      eigengareten: detailFields.eigengaerten,
      abstellplatz: detailFields.abstellplatz,
      ist_ertrag_netto: detailFields.istErtragNetto,
      soll_ertrag_netto: detailFields.sollErtragNetto,
      ist_netto_mietzins: detailFields.durchschnittMietzins,
      rendite: detailFields.rendite,
      baujahr: detailFields.baujahr,
      heizung: detailFields.heizung,
      zustand: detailFields.zustand,
      hwb_fgee: detailFields.hwbFgee,
      kaufpreis: detailFields.kaufpreis,
      miete_monatlich: detailFields.mieteMonatlich,
    },
  };
};

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('haertner_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    sessionStorage.removeItem('haertner_auth');
    sessionStorage.removeItem('haertner_token');
    sessionStorage.removeItem('haertner_refresh_token');
    sessionStorage.removeItem('haertner_user');
    window.location.href = '/admin/login';
    throw new Error('Sitzung abgelaufen. Bitte melden Sie sich erneut an.');
  }
  if (!response.ok) {
    let errorMessage = `HTTP-Fehler! Status: ${response.status}`;
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } else {
        const textData = await response.text();
        errorMessage = textData || errorMessage;
      }
    } catch (e) {
      // Ignore parsing error and use default message
    }
    throw new Error(errorMessage);
  }
  return response;
};

interface PropertiesContextType {
  properties: Property[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  resetAndFetch: (filterVal: string, searchVal: string) => Promise<void>;
  reorderProperties: (fromIndex: number, toIndex: number) => Promise<void>;
  updatePropertyStatus: (id: string, status: PropertyStatus) => Promise<void>;
  updateProperty: (id: string, data: Partial<Property>) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
  addProperty: (property: Partial<Property>) => Promise<Property>;
  getProperty: (id: string) => Property | undefined;
  uploadPropertyImages: (id: string, files: File[]) => Promise<any[]>;
  deletePropertyImage: (id: string, imageUrl: string) => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | null>(null);

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('Alle');
  const [currentSearch, setCurrentSearch] = useState('');

  const isFetchingRef = useRef(false);

  const fetchProperties = useCallback(async (pageNum: number, filterVal: string, searchVal: string, append = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const params = new URLSearchParams();
      params.append('page', String(pageNum));
      params.append('limit', '15');

      if (filterVal && filterVal !== 'Alle') {
        params.append('status', mapStatusToBackend(filterVal as PropertyStatus));
      }
      if (searchVal) {
        params.append('search', searchVal);
      }

      const response = await handleResponse(await fetch(`${apiUrl}/api/properties?${params.toString()}`, {
        headers: getAuthHeaders(),
      }));
      const data = await response.json();
      if (response.ok && data.success) {
        const newProps = (data.data || []).map(mapToFrontendProperty);
        if (append) {
          setProperties((prev) => {
            const existingIds = new Set(prev.map(p => p.id));
            const filteredNew = newProps.filter((p: any) => !existingIds.has(p.id));
            return [...prev, ...filteredNew];
          });
        } else {
          setProperties(newProps);
        }

        if (data.pagination) {
          setHasMore(pageNum < data.pagination.totalPages);
        } else {
          setHasMore(newProps.length >= 15);
        }
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchProperties(1, 'Alle', '', false);
  }, [fetchProperties]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchProperties(nextPage, currentFilter, currentSearch, true);
  }, [page, loadingMore, hasMore, currentFilter, currentSearch, fetchProperties]);

  const resetAndFetch = useCallback(async (filterVal: string, searchVal: string) => {
    setPage(1);
    setHasMore(true);
    setCurrentFilter(filterVal);
    setCurrentSearch(searchVal);
    await fetchProperties(1, filterVal, searchVal, false);
  }, [fetchProperties]);

  const refresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchProperties(1, currentFilter, currentSearch, false);
  }, [currentFilter, currentSearch, fetchProperties]);

  const reorderProperties = useCallback(async (fromIndex: number, toIndex: number) => {
    let updatedList: Property[] = [];
    setProperties((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      updatedList = next;
      return next;
    });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const ids = updatedList.map((p) => p.id);
      const response = await handleResponse(await fetch(`${apiUrl}/api/properties/reorder`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids }),
      }));
      const data = await response.json();
      if (!response.ok || !data.success) {
        refresh();
        throw new Error(data.message || 'Failed to update order on server');
      }
    } catch (error) {
      console.error('Error reordering properties:', error);
      refresh();
    }
  }, [refresh]);

  const updatePropertyStatus = useCallback(async (id: string, status: PropertyStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await handleResponse(await fetch(`${apiUrl}/api/properties/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: mapStatusToBackend(status) }),
      }));
      const data = await response.json();
      if (response.ok && data.success) {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status } : p))
        );
      } else {
        throw new Error(data.message || 'Failed to update property status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }, []);

  const updateProperty = useCallback(async (id: string, propertyData: Partial<Property>) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await handleResponse(await fetch(`${apiUrl}/api/properties/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(mapToBackendProperty(propertyData)),
      }));
      const data = await response.json();
      if (response.ok && data.success) {
        const updated = mapToFrontendProperty(data.data);
        setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      } else {
        throw new Error(data.message || 'Failed to update property');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  }, []);

  const deleteProperty = useCallback(async (id: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await handleResponse(await fetch(`${apiUrl}/api/properties/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }));
      const data = await response.json();
      if (response.ok && data.success) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  }, []);

  const addProperty = useCallback(async (propertyData: Partial<Property>) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await handleResponse(await fetch(`${apiUrl}/api/properties`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(mapToBackendProperty(propertyData)),
      }));
      const data = await response.json();
      if (response.ok && data.success) {
        const newProp = mapToFrontendProperty(data.data);
        setProperties((prev) => [newProp, ...prev]);
        return newProp;
      } else {
        throw new Error(data.message || 'Failed to create property');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      throw error;
    }
  }, []);

  const getProperty = useCallback(
    (id: string) => properties.find((p) => p.id === id),
    [properties]
  );

  const uploadPropertyImages = useCallback(async (id: string, files: File[]) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));

      const token = sessionStorage.getItem('haertner_token');
      const response = await handleResponse(await fetch(`${apiUrl}/api/properties/${id}/images`, {
        method: 'POST',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: formData,
      }));

      const data = await response.json();
      if (response.ok && data.success) {
        refresh();
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }, [refresh]);

  const deletePropertyImage = useCallback(async (id: string, imageUrl: string) => {
    try {
      const prop = properties.find((p) => p.id === id);
      if (!prop) return;

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const responseProp = await handleResponse(await fetch(`${apiUrl}/api/properties/${id}`, {
        headers: getAuthHeaders(),
      }));
      const dataProp = await responseProp.json();
      if (!responseProp.ok || !dataProp.success) {
        throw new Error('Failed to fetch property details for image deletion');
      }

      const backendImages = dataProp.data.images || [];
      const matchedImg = backendImages.find((img: any) => img.url === imageUrl);
      if (!matchedImg) return;

      const response = await handleResponse(await fetch(`${apiUrl}/api/properties/${id}/images/${matchedImg.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }));
      const data = await response.json();
      if (response.ok && data.success) {
        refresh();
      } else {
        throw new Error(data.message || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }, [properties, refresh]);

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        loading,
        loadingMore,
        hasMore,
        loadMore,
        resetAndFetch,
        reorderProperties,
        updatePropertyStatus,
        updateProperty,
        deleteProperty,
        addProperty,
        getProperty,
        uploadPropertyImages,
        deletePropertyImage,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const ctx = useContext(PropertiesContext);
  if (!ctx) throw new Error('useProperties must be inside PropertiesProvider');
  return ctx;
}