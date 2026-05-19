// Página de calendario semanal con vista por hora y esquinas cuadradas
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getReservationsByUser } from "../api/reservationService";
import type { AuthUser, Reservation } from "../types";
import { StateMessage } from "../components/ui/Feedback";

type Props = {
  user: AuthUser;
};

// Nombres cortos de los días de la semana en español
const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Horas visibles en el calendario de 7am a 6pm
const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const SLOT_H = 48;
const GRID_START = 7 * 60;

// Convierte un Date a string YYYY-MM-DD
function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Retorna los 7 días de la semana según el offset dado
function getWeekDays(offset: number): Date[] {
  const today = new Date();
  const dow = today.getDay();
  const sun = new Date(today);
  sun.setDate(today.getDate() - dow + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sun);
    d.setDate(sun.getDate() + i);
    return d;
  });
}

// Mapea el status de la reserva a clases de color
function getEventStyle(status: string): React.CSSProperties {
  switch (status) {
    case "Approved": return { background: "#dbeafe", color: "#1e40af", borderLeft: "2px solid #2563eb" };
    case "Pending":  return { background: "#fef9c3", color: "#854d0e", borderLeft: "2px solid #ca8a04" };
    case "Rejected": return { background: "#fee2e2", color: "#991b1b", borderLeft: "2px solid #dc2626" };
    default:         return { background: "#f3f4f6", color: "#6b7280", borderLeft: "2px solid #9ca3af" };
  }
}

// Renderiza el calendario semanal con posicionamiento de eventos por hora
export default function CalendarPage({ user }: Props) {
  const navigate = useNavigate();

  // Estado de las reservas y el offset de semana actual
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  // Carga las reservas del usuario al montar el componente
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
  }, [user.id, user.token]);

  // Calcula los 7 días de la semana visible
  const weekDays = useMemo(() => getWeekDays(weekOffset), [weekOffset]);

  // Genera el label del rango de fechas del header
  const weekLabel = useMemo(() => {
    const first = weekDays[0];
    const last = weekDays[6];
    const month = last.toLocaleString("es-CO", { month: "long" });
    return `${first.getDate()} – ${last.getDate()} de ${month} ${last.getFullYear()}`;
  }, [weekDays]);

  const today = toDateStr(new Date());

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Calendario semanal</h1>
          <p className="text-sm text-gray-500 mt-0.5">{weekLabel}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setWeekOffset((p) => p - 1)}
            className="text-sm border border-gray-200 px-3 py-1 hover:bg-gray-50 transition"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setWeekOffset(0)}
            className="text-sm border border-gray-200 px-3 py-1 hover:bg-gray-50 transition"
          >
            Hoy
          </button>
          <button
            onClick={() => setWeekOffset((p) => p + 1)}
            className="text-sm border border-gray-200 px-3 py-1 hover:bg-gray-50 transition"
          >
            Siguiente →
          </button>
        </div>
      </div>

      {loading ? (
        <StateMessage type="loading" title="Cargando calendario..." />
      ) : error ? (
        <StateMessage type="error" title="Error" description={error} actionText="Reintentar" onAction={() => window.location.reload()} />
      ) : (
        <>
          <div className="overflow-auto border border-gray-200">
            <div style={{ display: "grid", gridTemplateColumns: "56px repeat(7, minmax(0, 1fr))", minWidth: 600 }}>

              <div style={{ height: 52, borderRight: "0.5px solid #e5e7eb", borderBottom: "0.5px solid #e5e7eb", background: "#f9fafb" }} />

              {weekDays.map((d) => {
                const ds = toDateStr(d);
                const isToday = ds === today;
                return (
                  <div key={ds} style={{ borderRight: "0.5px solid #e5e7eb", borderBottom: "0.5px solid #e5e7eb", background: "#f9fafb", padding: "8px 6px", textAlign: "center" }}>
                    <p style={{ fontSize: 10, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                      {DAY_NAMES[d.getDay()]}
                    </p>
                    <p style={{ fontSize: 18, fontWeight: 500, margin: "2px 0 0", color: isToday ? "#2563eb" : "#111827" }}>
                      {d.getDate()}
                    </p>
                  </div>
                );
              })}

              <div style={{ borderRight: "0.5px solid #e5e7eb", background: "#f9fafb" }}>
                {HOURS.map((h) => (
                  <div key={h} style={{ height: SLOT_H, borderBottom: "0.5px solid #e5e7eb", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: "4px 8px 0 0", fontSize: 10, color: "#9ca3af" }}>
                    {h}:00
                  </div>
                ))}
              </div>

              {weekDays.map((d) => {
                const ds = toDateStr(d);
                const dayEvents = reservations.filter((r) => r.date === ds);
                return (
                  <div key={ds} style={{ position: "relative", borderRight: "0.5px solid #e5e7eb" }}>
                    {HOURS.map((h) => (
                      <div key={h} style={{ height: SLOT_H, borderBottom: "0.5px solid #e5e7eb" }} />
                    ))}
                    {dayEvents.map((ev) => {
                      const [sh, sm] = ev.startTime.split(":").map(Number);
                      const [eh, em] = ev.endTime.split(":").map(Number);
                      const top = ((sh * 60 + sm - GRID_START) / 60) * SLOT_H;
                      const height = Math.max(((eh * 60 + em - sh * 60 - sm) / 60) * SLOT_H - 2, 18);
                      return (
                        <div
                          key={ev.id_reservation}
                          title={ev.purpose || ev.spaceName}
                          onClick={() => navigate("/reservations")}
                          style={{ position: "absolute", top, left: 2, right: 2, height, padding: "3px 5px", fontSize: 10, fontWeight: 500, overflow: "hidden", cursor: "pointer", zIndex: 1, ...getEventStyle(ev.status) }}
                        >
                          <p style={{ margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {ev.spaceName || "Reserva"}
                          </p>
                          <p style={{ margin: 0, fontSize: 9, opacity: 0.75 }}>
                            {ev.startTime}–{ev.endTime}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex gap-4 flex-wrap">
            {[
              { label: "Aprobada",  bg: "#dbeafe", border: "#2563eb" },
              { label: "Pendiente", bg: "#fef9c3", border: "#ca8a04" },
              { label: "Rechazada", bg: "#fee2e2", border: "#dc2626" },
              { label: "Cancelada", bg: "#f3f4f6", border: "#9ca3af" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span style={{ width: 10, height: 10, background: item.bg, borderLeft: `2px solid ${item.border}`, display: "inline-block" }} />
                {item.label}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}