import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  useGetPropertyQuery, 
  useCreatePropertyMutation, 
  useUpdatePropertyMutation,
  useUploadPropertyImagesMutation,
  useDeletePropertyImageMutation,
  useDeletePropertyImagesBulkMutation,
  useUpdatePropertyImagesOrderMutation
} from "@/services/api";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Trash2, 
  Star, 
  GripHorizontal,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { IProperty, PropertyStatus, IPropertyDetails, IPropertyImage } from "../types";
import { toast } from "react-toastify";
import RichTextEditor from "../components/RichTextEditor";
import ConfirmationModal from "../components/ConfirmationModal";

export default function PropertyEditor() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: propData, isLoading: fetchLoading } = useGetPropertyQuery(id || "", {
    skip: !isEditMode,
  });
  const [createProperty] = useCreatePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();
  const [uploadPropertyImages] = useUploadPropertyImagesMutation();
  const [deletePropertyImage] = useDeletePropertyImageMutation();
  const [deletePropertyImagesBulk] = useDeletePropertyImagesBulkMutation();
  const [updatePropertyImagesOrder] = useUpdatePropertyImagesOrderMutation();

  // Component State
  const [activeTab, setActiveTab] = useState<"general" | "details" | "images" | "description" | "seo">("general");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<IProperty["category"]>("zinshaus");
  const [status, setStatus] = useState<PropertyStatus>("draft");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imagesState, setImagesState] = useState<IPropertyImage[]>([]);
  const [cardFields, setCardFields] = useState<string[]>([]);
  const [details, setDetails] = useState<IPropertyDetails>({
    wohnflaeche: "",
    nutzflaeche: "",
    widmung: "",
    grundflaeche: "",
    leerstand: false,
    befristungen: "",
    unbefristete_vermietung: false,
    bau_potenzial: "",
    balkon_terrassen: "",
    eigengareten: "",
    abstellplatz: "",
    ist_ertrag_netto: "",
    soll_ertrag_netto: "",
    ist_netto_mietzins: "",
    rendite: "",
    baujahr: "",
    heizung: "",
    zustand: "",
    hwb_fgee: "",
    kaufpreis: "",
    miete_monatlich: "",
  });

  // Image Manager Selection States
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imgToDelete, setImgToDelete] = useState<string | null>(null);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  // Sync data on Edit Mode load
  useEffect(() => {
    if (isEditMode && propData?.data) {
      const p = propData.data;
      setTitle(p.title);
      setSlug(p.slug);
      setCategory(p.category);
      setStatus(p.status);
      setAddress(p.address || "");
      setDescription(p.description || "");
      setImagesState(p.images || []);
      setCardFields(p.card_fields || []);
      setDetails({
        wohnflaeche: p.details?.wohnflaeche || "",
        nutzflaeche: p.details?.nutzflaeche || "",
        widmung: p.details?.widmung || "",
        grundflaeche: p.details?.grundflaeche || "",
        leerstand: p.details?.leerstand || false,
        befristungen: p.details?.befristungen || "",
        unbefristete_vermietung: p.details?.unbefristete_vermietung || false,
        bau_potenzial: p.details?.bau_potenzial || "",
        balkon_terrassen: p.details?.balkon_terrassen || "",
        eigengareten: p.details?.eigengareten || "",
        abstellplatz: p.details?.abstellplatz || "",
        ist_ertrag_netto: p.details?.ist_ertrag_netto || "",
        soll_ertrag_netto: p.details?.soll_ertrag_netto || "",
        ist_netto_mietzins: p.details?.ist_netto_mietzins || "",
        rendite: p.details?.rendite || "",
        baujahr: p.details?.baujahr || "",
        heizung: p.details?.heizung || "",
        zustand: p.details?.zustand || "",
        hwb_fgee: p.details?.hwb_fgee || "",
        kaufpreis: p.details?.kaufpreis || "",
        miete_monatlich: p.details?.miete_monatlich || "",
      });
    }
  }, [isEditMode, propData]);

  // Sync slug on title change in Create mode
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditMode) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-")
      );
    }
  };

  const handleDetailChange = (key: keyof IPropertyDetails, value: any) => {
    setDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Multipart Image Upload Zone
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) {
      toast.warning("Please save property details first to enable image upload.");
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((file) => {
        formData.append("images", file);
      });

      try {
        await uploadPropertyImages({ id: id!, formData }).unwrap();
        toast.success("Images uploaded successfully!");
      } catch (err) {
        toast.error("Failed to upload images.");
      }
    }
  };

  // HTML5 Drag & Drop sorting of images
  const handleImgDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("imageIndex", index.toString());
  };

  const handleImgDrop = async (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("imageIndex"));
    if (sourceIndex === targetIndex) return;

    const list = [...imagesState];
    const [movedItem] = list.splice(sourceIndex, 1);
    list.splice(targetIndex, 0, movedItem);
    setImagesState(list);

    const order = list.map((item) => item.id);
    try {
      await updatePropertyImagesOrder({ id: id!, order }).unwrap();
      toast.success("Image order saved!");
    } catch (err) {
      toast.error("Failed to save image order");
    }
  };

  // Image Selection (Ctrl / Click & Checkboxes)
  const toggleImageSelect = (imgId: string) => {
    if (selectedImages.includes(imgId)) {
      setSelectedImages((prev) => prev.filter((i) => i !== imgId));
    } else {
      setSelectedImages((prev) => [...prev, imgId]);
    }
  };

  // Bulk deletion
  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;
    try {
      await deletePropertyImagesBulk({ id: id!, imageIds: selectedImages }).unwrap();
      setSelectedImages([]);
      toast.success("Selected images deleted!");
    } catch (err) {
      toast.error("Failed to delete selected images.");
    }
  };

  // Delete Individual Image
  const triggerImageDelete = (imgId: string) => {
    setImgToDelete(imgId);
    setIsDeletingImage(true);
  };

  const confirmImageDelete = async () => {
    if (imgToDelete && isEditMode) {
      try {
        await deletePropertyImage({ id: id!, imageId: imgToDelete }).unwrap();
        setIsDeletingImage(false);
        setImgToDelete(null);
        toast.success("Image deleted successfully");
      } catch (err) {
        toast.error("Failed to delete image");
      }
    }
  };

  // Star Icon / Set featured (Moves image to index 0 and reorders)
  const handleSetFeatured = async (imgId: string) => {
    const list = [...imagesState];
    const idx = list.findIndex(img => img.id === imgId);
    if (idx === -1 || idx === 0) return; // already featured or not found

    const [moved] = list.splice(idx, 1);
    list.unshift(moved); // Put at top index for sort_order = 1
    setImagesState(list);

    const order = list.map((item) => item.id);
    try {
      await updatePropertyImagesOrder({ id: id!, order }).unwrap();
      toast.success("Featured thumbnail set successfully!");
    } catch (err) {
      toast.error("Failed to update featured image.");
    }
  };

  // Submit Handler
  const handleSave = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }

    const payload: Partial<IProperty> = {
      title,
      slug,
      category,
      status,
      address,
      description,
      details,
      card_fields: cardFields,
    };

    try {
      if (isEditMode) {
        await updateProperty({ id: id!, body: payload }).unwrap();
        toast.success("Property updated successfully!");
      } else {
        const created = await createProperty(payload).unwrap();
        toast.success("Property created successfully! Now redirecting to upload images.");
        navigate(`/admin/property/${created.data.id || created.data._id}`);
      }
    } catch (err) {
      toast.error("Failed to save property");
    }
  };

  if (isEditMode && fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-navy-400 gap-2">
        <RefreshCw className="h-8 w-8 animate-spin text-brand-500" />
        <span className="text-sm font-semibold">Fetching property data...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-navy-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin")}
            className="p-2 hover:bg-navy-50 text-navy-500 hover:text-navy-950 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-navy-900">
              {isEditMode ? `Edit Property: ${title}` : "Create New Property"}
            </h2>
            <p className="text-navy-500 text-sm mt-0.5">
              Fill in the property details and upload gallery items.
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 active:scale-[0.98] transition-all text-sm"
        >
          <Save className="h-4.5 w-4.5" />
          Save Property
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-navy-100 overflow-x-auto gap-2">
        {(["general", "details", "images", "description", "seo"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 border-b-2 font-bold text-sm transition-all whitespace-nowrap capitalize ${
              activeTab === tab
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-navy-500 hover:text-navy-900"
            }`}
          >
            {tab === "details" ? "Property Details" : tab}
          </button>
        ))}
      </div>

      {/* Form Content Cards */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-navy-100 min-h-[300px]">
        {/* Tab 1: General */}
        {activeTab === "general" && (
          <div className="max-w-2xl flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                Property Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Modernes Penthouse im Ersten Bezirk"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold text-navy-900"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                Slug (URL Parameter)
              </label>
              <input
                type="text"
                placeholder="generated-automatically-from-title"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-mono"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="e.g. Schubertring 6, 1010 Wien"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold text-navy-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold text-navy-900 capitalize"
                >
                  <option value="zinshaus">Zinshaus</option>
                  <option value="gewerbe">Gewerbe & Investment</option>
                  <option value="haus_wohnen">Haus & Wohnen</option>
                  <option value="mietobjekte">Mietobjekte</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold text-navy-900 capitalize"
                >
                  <option value="published">Published</option>
                  <option value="offline">Offline</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Property Details */}
        {activeTab === "details" && (
          <div className="flex flex-col gap-8">
            {/* Group 1: Flächen & Grundstücke */}
            <div className="bg-navy-50/50 p-6 rounded-2xl border border-navy-100/80 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider border-b border-navy-200 pb-2">
                Flächen & Grundstücke (Areas & Land)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: "wohnflaeche", label: "Wohnfläche (Wohnfläche)" },
                  { key: "nutzflaeche", label: "Nutzfläche (Nutzfläche)" },
                  { key: "grundflaeche", label: "Grundfläche (Grundfläche)" },
                  { key: "balkon_terrassen", label: "Balkon/Terrassen (Balkon / Terrassen)" },
                  { key: "eigengareten", label: "Eigengärten (Eigengärten)" },
                  { key: "abstellplatz", label: "Abstellplatz (Abstellplatz)" },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 240 m²"
                      value={(details as any)[field.key] || ""}
                      onChange={(e) => handleDetailChange(field.key as any, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Group 2: Finanzierung & Ertrag */}
            <div className="bg-navy-50/50 p-6 rounded-2xl border border-navy-100/80 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider border-b border-navy-200 pb-2">
                Finanzierung & Ertrag (Finance & Yield)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: "kaufpreis", label: "Kaufpreis (Kaufpreis)" },
                  { key: "ist_ertrag_netto", label: "Ist-Ertrag netto (Ist-Ertrag (netto))" },
                  { key: "soll_ertrag_netto", label: "Soll-Ertrag netto (Soll-Ertrag (netto))" },
                  { key: "ist_netto_mietzins", label: "Ø Ist-Netto-Mietzins (Ø Ist-Netto-Mietzins)" },
                  { key: "rendite", label: "Rendite (Rendite)" },
                  { key: "miete_monatlich", label: "Miete (monatlich) (Miete monatlich)" },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. € 1.200.000"
                      value={(details as any)[field.key] || ""}
                      onChange={(e) => handleDetailChange(field.key as any, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Group 3: Zustand & Energie */}
            <div className="bg-navy-50/50 p-6 rounded-2xl border border-navy-100/80 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider border-b border-navy-200 pb-2">
                Zustand & Energie (Condition & Energy)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: "baujahr", label: "Baujahr (Baujahr)" },
                  { key: "hwb_fgee", label: "HWB + fGEE" },
                  { key: "heizung", label: "Heizung (Heizung)" },
                  { key: "zustand", label: "Zustand (Zustand)" },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder="Not specified"
                      value={(details as any)[field.key] || ""}
                      onChange={(e) => handleDetailChange(field.key as any, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Group 4: Rechtliches & Vermietung */}
            <div className="bg-navy-50/50 p-6 rounded-2xl border border-navy-100/80 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider border-b border-navy-200 pb-2">
                Rechtliches & Vermietung (Legal & Lease)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: "widmung", label: "Widmung (Widmung)" },
                  { key: "befristungen", label: "Befristungen (Befristungen)" },
                  { key: "bau_potenzial", label: "Bau-Potenzial (Bau-Potenzial)" },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder="Not specified"
                      value={(details as any)[field.key] || ""}
                      onChange={(e) => handleDetailChange(field.key as any, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold"
                    />
                  </div>
                ))}
                
                {/* Checkboxes */}
                <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-navy-200 col-span-1 md:col-span-2 lg:col-span-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={details.leerstand || false}
                      onChange={(e) => handleDetailChange("leerstand", e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-navy-300 text-brand-500 focus:ring-brand-500/20"
                    />
                    <span className="text-sm font-semibold text-navy-700">Leerstand (Vacancy)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={details.unbefristete_vermietung || false}
                      onChange={(e) => handleDetailChange("unbefristete_vermietung", e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-navy-300 text-brand-500 focus:ring-brand-500/20"
                    />
                    <span className="text-sm font-semibold text-navy-700">Unbefristete Vermietung (Indefinite Rental)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Group 5: Karten-Vorschau Felder (Card Fields Select) */}
            <div className="bg-navy-50/50 p-6 rounded-2xl border border-navy-100/80 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider border-b border-navy-200 pb-2">
                Card Preview Fields (Select 1 to 4 fields to display on list preview)
              </h3>
              <p className="text-xs text-navy-500">
                Choose which of the filled spec fields below should show on the overview grid card. Max 4 items.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {Object.keys(details)
                  .filter((key) => key !== "leerstand" && key !== "unbefristete_vermietung" && (details as any)[key])
                  .map((key) => {
                    const isChecked = cardFields.includes(key);
                    return (
                      <label
                        key={key}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all duration-200 select-none ${
                          isChecked
                            ? "bg-navy-900 border-navy-900 text-white shadow"
                            : "bg-white border-navy-200 text-navy-600 hover:border-navy-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setCardFields((prev) => prev.filter((k) => k !== key));
                            } else {
                              if (cardFields.length >= 4) {
                                toast.warning("Maximum of 4 preview fields can be selected.");
                                return;
                              }
                              setCardFields((prev) => [...prev, key]);
                            }
                          }}
                          className="hidden"
                        />
                        <span className="capitalize">{key.replace(/_/g, " ")}</span>
                      </label>
                    );
                  })}
                {Object.keys(details).filter((key) => key !== "leerstand" && key !== "unbefristete_vermietung" && (details as any)[key]).length === 0 && (
                  <span className="text-xs text-navy-400 font-semibold italic">
                    Please fill out and enter values in some details fields above to select preview fields.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Images */}
        {activeTab === "images" && (
          <div className="flex flex-col gap-8">
            {!isEditMode ? (
              <div className="p-12 text-center text-navy-500 border-2 border-dashed border-navy-200 rounded-2xl bg-navy-50/30">
                <Upload className="h-10 w-10 mx-auto text-navy-300 mb-3" />
                <h4 className="font-bold text-sm text-navy-800">Unsaved Property</h4>
                <p className="text-xs text-navy-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Please click <strong>Save Property</strong> at the top right to save your details first. Once saved, you can upload and reorder images.
                </p>
              </div>
            ) : (
              <>
                {/* Drag & Drop Upload Zone */}
                <div className="border-2 border-dashed border-navy-200 hover:border-brand-500 bg-navy-50/50 hover:bg-navy-50 rounded-2xl p-8 transition-colors flex flex-col items-center justify-center text-center relative group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="h-10 w-10 text-navy-400 group-hover:text-brand-500 mb-3 transition-colors" />
                  <h4 className="text-navy-900 font-bold text-sm">Drag & Drop images here</h4>
                  <p className="text-navy-400 text-xs mt-1">or click to browse from files (PNG, JPG, WEBP)</p>
                </div>

                {/* Bulk Actions Header */}
                {imagesState.length > 0 && (
                  <div className="flex items-center justify-between bg-navy-50/80 p-4 rounded-xl border border-navy-100">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedImages.length === imagesState.length}
                        onChange={() => {
                          if (selectedImages.length === imagesState.length) {
                            setSelectedImages([]);
                          } else {
                            setSelectedImages(imagesState.map((img) => img.id));
                          }
                        }}
                        className="h-4 w-4 text-brand-500 border-navy-300 rounded"
                      />
                      <span className="text-xs font-semibold text-navy-600">
                        {selectedImages.length} of {imagesState.length} selected
                      </span>
                    </div>
                    {selectedImages.length > 0 && (
                      <button
                        onClick={handleBulkDelete}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Selected
                      </button>
                    )}
                  </div>
                )}

                {/* Images Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagesState.map((img, idx) => {
                    const isSelected = selectedImages.includes(img.id);
                    const isFeatured = img.sort_order === 1 || idx === 0;
                    return (
                      <div
                        key={img.id}
                        draggable
                        onDragStart={(e) => handleImgDragStart(e, idx)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleImgDrop(e, idx)}
                        className={`aspect-[4/3] rounded-xl overflow-hidden bg-navy-100 border relative group shadow-sm transition-all cursor-grab active:cursor-grabbing ${
                          isSelected ? "border-brand-500 ring-2 ring-brand-500/25" : "border-navy-200"
                        }`}
                      >
                        <img src={img.url} alt={`gallery ${idx}`} className="w-full h-full object-cover" />

                        {/* Star / Featured Icon */}
                        <button
                          type="button"
                          onClick={() => handleSetFeatured(img.id)}
                          className={`absolute top-2 left-2 p-1.5 rounded-lg backdrop-blur-sm transition-colors shadow ${
                            isFeatured
                              ? "bg-brand-500 text-white"
                              : "bg-white/70 hover:bg-white text-navy-400 hover:text-brand-500"
                          }`}
                          title={isFeatured ? "Featured Thumbnail" : "Set as Featured"}
                        >
                          <Star className={`h-3.5 w-3.5 ${isFeatured ? "fill-current" : ""}`} />
                        </button>

                        {/* Multi-select checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleImageSelect(img.id)}
                          className={`absolute top-2 right-2 h-6 w-6 rounded-lg flex items-center justify-center border shadow transition-all ${
                            isSelected
                              ? "bg-brand-500 border-brand-500 text-white"
                              : "bg-white/70 border-white text-transparent group-hover:text-navy-300"
                          }`}
                        >
                          <CheckIcon className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete individual */}
                        <button
                          type="button"
                          onClick={() => triggerImageDelete(img.id)}
                          className="absolute bottom-2 right-2 p-1.5 bg-red-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 shadow transition-opacity cursor-pointer"
                          title="Delete image"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>

                        {/* Drag Handle Grip hint */}
                        <div className="absolute bottom-2 left-2 p-1 bg-white/70 rounded text-navy-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                          <GripHorizontal className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 4: Description */}
        {activeTab === "description" && (
          <div className="max-w-4xl">
            <RichTextEditor
              label="Marketing & property description (Rich Text)"
              value={description}
              onChange={setDescription}
            />
          </div>
        )}

        {/* Tab 5: SEO */}
        {activeTab === "seo" && (
          <div className="max-w-2xl flex flex-col gap-5">
            <div className="bg-navy-50 p-6 rounded-2xl border border-navy-100 flex gap-4">
              <Sparkles className="h-6 w-6 text-brand-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-navy-900 font-bold text-sm">Automated Metadata Generation</h4>
                <p className="text-navy-500 text-xs mt-1 leading-relaxed">
                  Haertner Immobilien utilizes intelligent automated metadata templates. Titles, slugs, and keywords are dynamically compiled to maximize SEO rankings.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                Custom SEO Title (Optional)
              </label>
              <input
                type="text"
                placeholder={title || "Property title is used by default"}
                className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                Meta Description (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Sleek excerpt shown in search engines..."
                className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-semibold"
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Image Delete Modal */}
      <ConfirmationModal
        isOpen={isDeletingImage}
        title="Remove Image"
        message="Are you sure you want to remove this image from the property? This will erase it from the list."
        confirmText="Remove"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={confirmImageDelete}
        onCancel={() => setIsDeletingImage(false)}
      />
    </div>
  );
}

// Simple internal check icon helper
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
