import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Category from "./pages/Category";
import UploadBook from "./pages/UploadBook";
import BookDashboard from "./pages/Discover";
import LikedBooks from "./pages/LikedBooks";
import UserList from "./pages/UserList";
import BookList from "./pages/Download";
import BooksByCategory from "./pages/BooksByCategory";
import AuthForm from "./pages/AuthForm";
import Profile from "./pages/Profile";

// Utility function to check login
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // or your auth logic
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route: redirect to /auth or /discover based on auth */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/discover" /> : <Navigate to="/auth" />
          }
        />

        {/* Auth page (login/signup combined) */}
        <Route path="/auth" element={<AuthForm />} />

        {/* Protected routes with layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            {/* Sidebar layout wraps these */}
            <Route path="/discover" element={<BookDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/category" element={<Category />} />
            <Route path="/uploadBook" element={<UploadBook />} />
            <Route path="/favourite" element={<LikedBooks />} />
            <Route path="/userList" element={<UserList />} />
            <Route path="/downloads" element={<BookList />} />
            <Route path="/books/:category" element={<BooksByCategory />} />
            <Route path="/profile" element={<Profile />} />
            {/* Optional: redirect /dashboard to /discover */}
            <Route path="/dashboard" element={<Navigate to="/discover" />} />
            <Route path="/admindashboard" element={<Navigate to="/" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
