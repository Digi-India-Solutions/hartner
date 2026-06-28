import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  useGetPropertiesQuery, 
  useDeletePropertyMutation, 
  useUpdatePropertyStatusMutation,
  useUpdatePropertiesOrderMutation,
  useCreatePropertyMutation
} from "@/services/api";
import { 
  Plus, 
  Search, 
  Edit, 
  Copy, 
  Trash2, 
  GripVertical,
  RefreshCw,
  Building
} from "lucide-react";
import { IProperty, PropertyStatus } from "../types";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Queries & Mutations
  const { data, isLoading, refetch } = useGetPropertiesQuery({
    status: activeStatus === "All" ? undefined : activeStatus.toLowerCase(),
    search: debouncedSearch || undefined,
  });

  const [deleteProperty] = useDeletePropertyMutation();
  const [updatePropertyStatus] = useUpdatePropertyStatusMutation();
  const [updatePropertiesOrder] = useUpdatePropertiesOrderMutation();
  const [createProperty] = useCreatePropertyMutation();

  // Local state to support dragging
  const [propertiesState, setPropertiesState] = useState<IProperty[]>([]);

  useEffect(() => {
    if (data?.data) {
      setPropertiesState(data.data);
    }
  }, [data]);

  // Handle Search Input Debounce / Submit
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchVal);
    }, 400); // 400ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(searchVal);
  };

  // Quick Action: Status updates
  const handleStatusChange = async (id: string, status: PropertyStatus) => {
    try {
      await updatePropertyStatus({ id, status }).unwrap();
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Quick Action: Duplicate property
  const handleDuplicate = async (prop: IProperty) => {
    try {
      const duplicatedData = {
        title: `${prop.title} (Copy)`,
        category: prop.category,
        status: "draft" as PropertyStatus, // Always duplicate as Draft
        description: prop.description,
        address: prop.address || "",
        images: prop.images || [],
        details: prop.details || {},
        card_fields: prop.card_fields || [],
      };

      await createProperty(duplicatedData).unwrap();
      toast.success("Property duplicated successfully as Draft!");
      refetch();
    } catch (err) {
      toast.error("Failed to duplicate property");
    }
  };

  // Trigger Delete confirmation Modal
  const openDeleteModal = (id: string) => {
    setPropertyToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const id = propertyToDelete || "";
    if (id) {
      try {
        await deleteProperty(id).unwrap();
        toast.success("Property deleted successfully");
        setDeleteModalOpen(false);
        setPropertyToDelete(null);
      } catch (err) {
        toast.error("Failed to delete property");
      }
    }
  };

  // HTML5 Drag & Drop reordering by ID lookup
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    const sourceId = e.dataTransfer.getData("text/plain");
    if (sourceId === targetId) return;

    const list = [...propertiesState];
    const sourceIndex = list.findIndex(p => (p.id || p._id) === sourceId);
    const targetIndex = list.findIndex(p => (p.id || p._id) === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const [movedItem] = list.splice(sourceIndex, 1);
    list.splice(targetIndex, 0, movedItem);

    // Swap UI state immediately for responsive feel
    setPropertiesState(list);

    // Build order mapping array (IDs only)
    const order = list.map((item) => item.id || item._id!);

    try {
      await updatePropertiesOrder({ order }).unwrap();
      toast.success("Display order saved automatically!");
    } catch (err) {
      toast.error("Failed to save display order.");
      refetch();
    }
  };

  const categoryMap: { [key: string]: string } = {
    "Zinshaus": "zinshaus",
    "Gewerbe & Investment": "gewerbe",
    "Haus & Wohnen": "haus_wohnen",
    "Mietobjekte": "mietobjekte"
  };

  // Client side filtering for category
  const filteredProperties = propertiesState.filter((prop) => {
    if (activeCategory === "All") return true;
    return prop.category === categoryMap[activeCategory];
  });

  // Helper: Find thumbnail (first image, or image with sort_order === 1)
  const getThumbnailUrl = (prop: IProperty) => {
    if (prop.images && prop.images.length > 0) {
      const featured = prop.images.find(img => img.sort_order === 1) || prop.images[0];
      return featured?.url;
    }
    return null;
  };

  const categories = ["All", "Zinshaus", "Gewerbe & Investment", "Haus & Wohnen", "Mietobjekte"];
  const statuses = ["All", "Published", "Offline", "Draft"];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-navy-100">
        <div>
          <h2 className="text-xl font-bold text-navy-900">Manage Properties</h2>
          <p className="text-navy-500 text-sm mt-0.5">Add, edit, duplicate, and sort properties.</p>
        </div>
        <Link
          to="/admin/property/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 active:scale-[0.98] transition-all text-sm"
        >
          <Plus className="h-4.5 w-4.5" />
          Add Property
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-navy-100 flex flex-col gap-6">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy-400">Search</span>
          <form onSubmit={handleSearchSubmit} className="flex flex-row items-center gap-3 w-full max-w-md">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 text-navy-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-navy-50 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md shadow-brand-500/10 active:scale-[0.98] shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Categories and Status filters (Stacked vertically with proper gap) */}
        <div className="flex flex-col gap-5 pt-6 border-t border-navy-100">
          {/* Status Tabs */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-400">Status</span>
            <div className="flex flex-wrap gap-1.5 bg-navy-50 p-1.5 rounded-xl self-start w-fit">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => { setActiveStatus(st); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                    activeStatus === st
                      ? "bg-white text-navy-900 shadow-sm"
                      : "text-navy-500 hover:text-navy-900"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-400">Category</span>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-navy-900 border-navy-900 text-white shadow-sm"
                      : "bg-white border-navy-200 text-navy-500 hover:border-navy-400 hover:text-navy-700"
                  }`}
                >
                  {cat === "All" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-navy-400 flex flex-col items-center gap-2">
            <RefreshCw className="h-8 w-8 animate-spin text-brand-500" />
            <span className="text-sm font-semibold">Loading properties...</span>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="p-12 text-center text-navy-400">
            <Building className="h-10 w-10 mx-auto mb-3 text-navy-300" />
            <span className="text-sm font-semibold">No properties found.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-50/50 border-b border-navy-100 text-xs font-bold uppercase tracking-wider text-navy-400">
                  <th className="py-4 px-6 w-12">Sort</th>
                  <th className="py-4 px-6">Thumbnail</th>
                  <th className="py-4 px-6">Property Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {filteredProperties.map((prop) => {
                  const propId = prop.id || prop._id || "";
                  const thumbnailUrl = getThumbnailUrl(prop);
                  return (
                    <tr
                      key={propId}
                      draggable={activeCategory === "All"}
                      onDragStart={(e) => handleDragStart(e, propId)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, propId)}
                      className="hover:bg-navy-50/30 transition-colors group"
                    >
                      {/* Drag Handle */}
                      <td className="py-4 px-6 cursor-grab active:cursor-grabbing text-navy-300 hover:text-navy-600 transition-colors">
                        <GripVertical className="h-5 w-5" />
                      </td>

                      {/* Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="h-14 w-20 bg-navy-50 border border-navy-100 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                          {thumbnailUrl ? (
                            <img src={thumbnailUrl} alt="thumbnail" className="h-full w-full object-cover" />
                          ) : (
                            <Building className="h-6 w-6 text-navy-300" />
                          )}
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-bold text-navy-900 block text-sm group-hover:text-brand-600 transition-colors">
                            {prop.title}
                          </span>
                          <span className="text-xs text-navy-400 font-medium">
                            Created {prop.created_at ? new Date(prop.created_at).toLocaleDateString("de-DE") : "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold text-navy-600 bg-navy-100/60 px-2.5 py-1 rounded-md capitalize">
                          {prop.category.replace("_", " ")}
                        </span>
                      </td>

                      {/* Status Badge Dropdown */}
                      <td className="py-4 px-6">
                        <select
                          value={prop.status}
                          onChange={(e) => handleStatusChange(propId, e.target.value as PropertyStatus)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 focus:ring-2 focus:ring-brand-500/20 cursor-pointer shadow-sm capitalize ${
                            prop.status === "published"
                              ? "bg-green-100 text-green-700"
                              : prop.status === "draft"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <option value="published">Published</option>
                          <option value="offline">Offline</option>
                          <option value="draft">Draft</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigate(`/admin/property/${propId}`)}
                            title="Edit"
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => handleDuplicate(prop)}
                            title="Duplicate"
                            className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                          >
                            <Copy className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(propId)}
                            title="Delete"
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Property"
        message="Are you sure you want to permanently delete this property? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}
