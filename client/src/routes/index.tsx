import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Spinner } from "@/components/ui/spinner";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import DocumentListPage from "@/pages/Documents/DocumentListPage";
import DocumentDetailPage from "@/pages/Documents/DocumentDetailPage";
import FlashcardListPage from "@/pages/Flashcards/FlashcardListPage";
import FlashcardPage from "@/pages/Flashcards/FlashcardPage";
import QuizTakingPage from "@/pages/Quizes/QuizTakingPage";
import QuizResultPage from "@/pages/Quizes/QuizResultPage";
import ProfilePage from "@/pages/Profile/ProfilePage";

export default function Routes() {
  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return (
      <div className="h-screen flex-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Authenticate Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentListPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          <Route path="/flashcards" element={<FlashcardListPage />} />
          <Route path="/documents/:id/flashcards" element={<FlashcardPage />} />
          <Route path="/quizes/:id" element={<QuizTakingPage />} />
          <Route path="/quizes/:id/results" element={<QuizResultPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
