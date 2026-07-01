import { useState, useCallback, type ReactNode } from 'react';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;
let globalAddToast: ((message: string, type: ToastData['type']) => void) | null = null;

export function showToast(message: string, type: ToastData['type'] = 'success') {
  globalAddToast?.(message, type);
}

export function ToastContainer({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: ToastData['type']) => {
    const id = String(++toastId);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  globalAddToast = addToast;

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-up min-w-[280px] ${
              toast.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : toast.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-accent-50 text-accent-800 border border-accent-200'
            }`}
          >
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => dismiss(toast.id)}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/5 flex-shrink-0 cursor-pointer"
            >
              <i className="ri-close-line text-sm"></i>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}