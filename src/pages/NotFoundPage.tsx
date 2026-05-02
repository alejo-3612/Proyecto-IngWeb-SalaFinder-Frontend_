import { Link } from "react-router-dom";
import { StateMessage } from "../components/ui/Feedback";
export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <StateMessage
        type="error"
        title="Página no encontrada"
        description="La ruta a la que intentas acceder no existe."
        actionText="Ir al inicio"
        onAction={() => (window.location.href = "/")}
      />
      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-brand-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
