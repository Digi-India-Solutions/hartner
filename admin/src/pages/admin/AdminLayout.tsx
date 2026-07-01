import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/feature/AdminSidebar';
import { AdminTopbar } from '@/components/feature/AdminTopbar';
import { ToastContainer } from '@/components/base/Toast';
import { useAuth } from '@/hooks/AuthContext';

export default function AdminLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <ToastContainer>
      <div className="min-h-screen bg-[#F9FAFB]">
        <AdminSidebar />
        <AdminTopbar />
        <main className="ml-[240px] pt-[60px]">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastContainer>
  );
}