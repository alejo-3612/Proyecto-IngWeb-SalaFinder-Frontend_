import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReservations, approveReservation, rejectReservation } from "../api/reservationService";
import type { AuthUser, Reservation } from "../types";
 
type Props = {
  user: AuthUser;
};
 
export default function AdminPage({ user }: Props) {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (user.role !== "Admin") {
      navigate("/");
      return;
    }
    fetchReservations();
  }, []);
  async function fetchReservations() {
    const data = await getAllReservations(user.token);
    setReservations(data);
    setLoading(false);
  }
 
  async function handleApprove(id: string) {
    await approveReservation(id, user.token);
    fetchReservations();
  }
 
  async function handleReject(id: string) {
    await rejectReservation(id, user.token);
    fetchReservations();
  }
 
  const pending = reservations.filter((r) => r.status === "Pending");
  const others = reservations.filter((r) => r.status !== "Pending");
 
  if (loading) return <main className="p-6">Cargando reservas...</main>;
 
  return (
<main className="mx-auto max-w-4xl px-6 py-6">
<h1 className="text-2xl font-semibold text-gray-900 mb-6">Panel de administración</h1>
 
      <section className="mb-8">
<h2 className="text-lg font-semibold text-gray-800 mb-4">Reservas pendientes ({pending.length})</h2>
        {pending.length === 0 ? (
<p className="text-sm text-gray-500">No hay reservas pendientes.</p>
        ) : (
<div className="flex flex-col gap-4">
            {pending.map((r) => (
<div key={r.id_reservation} className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
<p className="text-sm font-medium text-gray-800">Espacio: {r.spaceId}</p>
<p className="text-sm text-gray-600">Fecha: {r.date} | {r.startTime} - {r.endTime}</p>
<p className="text-sm text-gray-600">Propósito: {r.purpose}</p>
<p className="text-sm text-gray-600">Asistentes: {r.attendeeCount}</p>
<div className="mt-3 flex gap-2">
<button
                    onClick={() => handleApprove(r.id_reservation)}
                    className="rounded-md bg-green-600 px-4 py-1.5 text-sm text-white hover:bg-green-700"
>
                    Aprobar
</button>
<button
                    onClick={() => handleReject(r.id_reservation)}
                    className="rounded-md bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
>
                    Rechazar
</button>
</div>
</div>
            ))}
</div>
        )}
</section>
 
      <section>
<h2 className="text-lg font-semibold text-gray-800 mb-4">Historial de reservas</h2>
        {others.length === 0 ? (
<p className="text-sm text-gray-500">No hay reservas.</p>
        ) : (
<div className="flex flex-col gap-4">
            {others.map((r) => (
<div key={r.id_reservation} className="rounded-lg border border-gray-200 bg-white p-4">
<p className="text-sm font-medium text-gray-800">Espacio: {r.spaceId}</p>
<p className="text-sm text-gray-600">Fecha: {r.date} | {r.startTime} - {r.endTime}</p>
<p className="text-sm text-gray-600">Propósito: {r.purpose}</p>
<span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  r.status === "Approved" ? "bg-green-100 text-green-700" :
                  r.status === "Rejected" ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {r.status}
</span>
</div>
            ))}
</div>
        )}
</section>
</main>
  );
}