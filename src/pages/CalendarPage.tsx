import { useEffect, useState } from "react";
import { getReservationsByUser } from "../api/reservationService";
import type { AuthUser, Reservation } from "../types";
import { StateMessage } from "../components/ui/Feedback";

type Props = {
  user: AuthUser;
};

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function getWeekDays(): Date[] {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "Approved": return "Aprobada";
    case "Pending": return "Pendiente";
    case "Rejected": return "Rechazada";
    case "Cancelled": return "Cancelada";
    default: return status;
  }
}

function getStatusClass(status: string): string {
  switch (status) {
    case "Approved": return "bg-blue-50 text-blue-700 border border-blue-200";
    case "Pending": return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    case "Rejected": return "bg-red-50 text-red-700 border border-red-200";
    default: return "bg-gray-50 text-gray-600 border border-gray-200";
  }
}

export default function CalendarPage({ user }: Props) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const weekDays = getWeekDays();
  const today = toDateStr(new Date());

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await getReservationsByUser(user.id, user.token);
        setReservations(data);
      } catch {
        setError("No se pudieron cargar las reservas.");
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, [user.id]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">Calendario semanal</h1>
      <p className="mt-1 text-sm text-gray-500">Reservas de la semana actual.</p>

      <div className="mt-6">
        {loading ? (
          <StateMessage type="loading" title="Cargando calendario..." />
        ) : error ? (
          <StateMessage type="error" title="Error" description={error} actionText="Reintentar" onAction={() => window.location.reload()} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {weekDays.map((day) => {
              const ds = toDateStr(day);
              const isToday = ds === today;
              const dayReservations = reservations.filter((r) => r.date === ds);

              return (
                <section
                  key={ds}
                  className={`rounded-lg border p-3 ${isToday ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"}`}
                >
                  <div className="mb-2">
                    <p className={`text-xs font-medium uppercase tracking-wide ${isToday ? "text-blue-600" : "text-gray-400"}`}>
                      {DAY_NAMES[day.getDay()]}
                    </p>
                    <p className={`text-lg font-semibold ${isToday ? "text-blue-700" : "text-gray-800"}`}>
                      {day.getDate()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {dayReservations.length === 0 ? (
                      <p className="text-xs text-gray-400">Sin reservas</p>
                    ) : (
                      dayReservations.map((r) => (
                        <div
                          key={r.id_reservation}
                          className={`rounded p-2 text-xs ${getStatusClass(r.status)}`}
                        >
                          <p className="font-medium truncate">{r.spaceName}</p>
                          <p className="mt-0.5 opacity-80">{r.startTime} – {r.endTime}</p>
                          <p className="mt-0.5 opacity-70">{getStatusLabel(r.status)}</p>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}