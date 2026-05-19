import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authService";
import type { AuthUser } from "../types";
import Button from "../components/ui/Button";

type Props = {
  onLogin: (user: AuthUser) => void;
};

export default function LoginPage({ onLogin }: Props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = email.trim().length > 0 && password.length >= 8;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setError("");
    setLoading(true);
    try {
      const user = await login({ Email: email, Password: password });
      onLogin(user);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl">🏛️</span>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">SalaFinder</h1>
          <p className="mt-1 text-sm text-gray-500">Reserva espacios universitarios</p>
        </div>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Iniciar sesión</h2>

          {error && (
            <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700">Correo institucional</span>
                <input
                  type="email"
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@universidad.edu.co"
                  required
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700">Contraseña</span>
                <input
                  type="password"
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </label>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={!isValid || loading}
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
            </div>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-brand-600 hover:underline">
              Regístrate
            </Link>
          </p>

          <p className="mt-3 text-center text-xs text-gray-400">
            Demo: estudiante@universidad.edu.co / Password1
          </p>
        </section>
      </div>
    </main>
  );
}
