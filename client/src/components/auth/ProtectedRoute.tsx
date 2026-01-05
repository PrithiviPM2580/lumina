import { Spinner } from "../ui/spinner";
import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

const ProtectedRoute = () => {
  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return (
      <div className="h-scree flex-center">
        <Spinner />
      </div>
    );
  }
  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
