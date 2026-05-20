import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpaceById } from "../api/spaceService";
import { createReservation } from "../api/reservationService";
import type { AuthUser, Space } from "../types";
import Button from "../components/ui/Button";
import { StateMessage } from "../components/ui/Feedback";

type Props = {
  user: AuthUser;
};

export default function ReservePage({ user }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [space, setSpace] = useState<Space | null>(null);
  const [loadingSpace, setLoadingSpace] = useState(true);
  const [spaceError, setSpaceError] = useState("");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [userProgram, setUserProgram] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    async function fetchSpace() {
      if (!id) return;
      try {
        const data = await getSpaceById(id);
        setSpace(data);
      } catch {
        setSpaceError("Espacio no encontrado.");
      } finally {
        setLoadingSpace(false);
      }
    }
    fetchSpace();
  }, [id]);

  const today = new Date().toISOString().slice(0, 10);

const isValid =
  date.trim() !== "" &&
  date >= today &&
  startTime.trim() !== "" &&
  endTime.trim() !== "" &&
  endTime > startTime &&
  purpose.trim().length > 0 &&
  attendeeCount >= 1 &&
  attendeeCount <= (space?.capacity ?? 1) &&
  userProgram.trim().length > 0;
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || !space) return;
    setSubmitError("");
    setSubmitting(true);
    try {
      await createReservation(
        { spaceId: space.id_space, date, startTime, endTime, purpose, attendeeCount, userProgram },
        user.token
      );
      navigate("/reservations");
    } catch (err: any) {
      setSubmitError(err.message || "Error al crear la reserva.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingSpace) return (
    <main className="mx-auto max-w-2xl p-6">
      <StateMessage type="loading" title="Cargando espacio..." />
    </main>
  );

  if (spaceError || !space) return (
    <main className="mx-auto max-w-2xl p-6">
      <StateMessage type="error" title="Error" description={spaceError} actionText="Volver" onAction={() => navigate("/")} />
    </main>
  );

  const fieldBase = "rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300 w-full";

  return (
    <main className="mx-auto max-w-2xl px-6 py-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1"
      >
        ← Volver a espacios
      </button>

      <h1 className="text-2xl font-semibold text-gray-900">Reservar espacio</h1>

      <section className="mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-800">{space.name}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {space.type} · {space.building} · Capacidad: {space.capacity} personas
        </p>
        {space.requiresApproval && (
          <p className="mt-2 text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded px-2 py-1">
            ⚠️ Este espacio requiere aprobación de un administrador.
          </p>
        )}
      </section>

      {submitError && (
        <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          ⚠️ {submitError}
        </div>
      )}

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-sm text-gray-700">Fecha</span>
              <input type="date" className={fieldBase} value={date} onChange={(e) => setDate(e.target.value)} required />{date && date < today && (<span className="text-xs text-red-500">La fecha no puede ser en el pasado</span>)}
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">Hora inicio</span>
              <input type="time" className={fieldBase} value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">Hora fin</span>
              <input type="time" className={fieldBase} value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
              {endTime && startTime && endTime <= startTime && (
                <span className="text-xs text-red-500">La hora fin debe ser mayor a la de inicio</span>
              )}
            </label>

            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-sm text-gray-700">Propósito</span>
              <input
                type="text"
                className={fieldBase}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Ej: Clase de Algoritmos, Reunión de proyecto..."
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">N° de asistentes</span>
              <input
                type="text"
               min={1}
               max={space?.capacity ?? 1}
               className={fieldBase}
               value={attendeeCount.toString()}
               onChange={(e) => setAttendeeCount(Number(e.target.value))}
               required
              />
              {attendeeCount > (space?.capacity ?? 1) && (<span className="text-xs text-red-500">Supera la capacidad máxima de {space?.capacity} personas </span>)}

            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">Tu programa académico</span>
              <select
                className={fieldBase}
                value={userProgram}
                onChange={(e) => setUserProgram(e.target.value)}
                required
                >
                <option value="">Selecciona tu programa</option>
                <option value="Ingenieria sistemas">Ingenieria sistemas</option>
                <option value="Ingenieria mecatronica">Ingenieria mecatronica</option>
                <option value="Ingenieria financiera">Ingenieria financiera</option>
                <option value="Ingenieria administrativa">Ingenieria administrativa</option>
                <option value="Ingenieria civil">Ingenieria civil</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            <Button type="submit" variant="primary" fullWidth disabled={!isValid || submitting}>
              {submitting ? "Creando reserva..." : "Confirmar reserva"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
