import { NavLink, useNavigate } from "react-router-dom";
import type { AuthUser } from "../../types";

type Props = {
  user: AuthUser | null;
  onLogout: () => void;
};

export default function NavBar({ user, onLogout }: Props) {
  const navigate = useNavigate();
  const linkBase = "text-sm text-gray-500 hover:text-gray-800 transition";
  const active = "text-brand-700 font-semibold";

  function handleLogout() {
    onLogout();
    navigate("/login");
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏛️</span>
          <h2 className="text-lg font-semibold text-gray-900">SalaFinder</h2>
        </div>

        <nav className="flex items-center gap-4" aria-label="Navegación principal">
          {user && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${linkBase} ${active}` : linkBase
                }
              >
                Espacios
              </NavLink>
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  isActive ? `${linkBase} ${active}` : linkBase
                }
              >
                Calendario
              </NavLink>
              <NavLink
                to="/reservations"
                className={({ isActive }) =>
                  isActive ? `${linkBase} ${active}` : linkBase
                }
              >
                Mis Reservas
              </NavLink>
              {user.role === "Admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? `${linkBase} ${active}` : linkBase
                  }
                >
                  Panel Admin
                </NavLink>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-gray-500 hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 border border-red-200 rounded-md px-3 py-1 hover:bg-red-50 transition"
              >
                Salir
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="text-sm text-brand-600 border border-brand-300 rounded-md px-3 py-1 hover:bg-brand-50 transition"
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}