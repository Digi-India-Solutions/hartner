import { AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-navy-100 p-6 overflow-hidden transform transition-all duration-300 scale-100 z-10">
        <div className="flex gap-4">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDanger ? "bg-red-100 text-red-600" : "bg-brand-100 text-brand-700"
            }`}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-navy-900 leading-6">{title}</h3>
            <p className="text-sm text-navy-500 mt-2 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 border-t border-navy-100 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-navy-200 hover:border-navy-300 text-navy-600 hover:text-navy-800 font-semibold rounded-lg text-sm transition-all duration-200 active:scale-[0.98]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-white font-semibold rounded-lg text-sm shadow-md transition-all duration-200 active:scale-[0.98] ${
              isDanger
                ? "bg-red-600 hover:bg-red-700 shadow-red-600/20 hover:shadow-red-700/30"
                : "bg-brand-500 hover:bg-brand-600 shadow-brand-500/20 hover:shadow-brand-600/30"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
