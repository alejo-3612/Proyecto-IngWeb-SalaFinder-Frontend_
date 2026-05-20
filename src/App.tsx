
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import type { AuthUser } from "./types";
import NavBar from "./components/global/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SpacesPage from "./pages/SpacesPage";
import ReservePage from "./pages/ReservePage";
import ReservationsPage from "./pages/ReservationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CalendarPage from "./pages/CalendarPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);

  function handleLogin(loggedUser: AuthUser) {
    setUser(loggedUser);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={user ? <SpacesPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/reserve/:id"
          element={user ? <ReservePage user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={user?.role === "Admin" ? <AdminPage user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/reservations"
          element={user ? <ReservationsPage user={user} /> : <Navigate to="/login" replace />}
        />

        <Route  path="/calendar"  element={user ? <CalendarPage user={user} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
