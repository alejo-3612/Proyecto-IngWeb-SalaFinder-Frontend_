import { useEffect, useState } from "react";
import { getReservationsByUser, cancelReservation } from "../api/reservationService";
import type { AuthUser, Reservation } from "../types";
import ReservationRow from "../components/reservations/ReservationRow";
import { StateMessage } from "../components/ui/Feedback";
import { useNavigate } from "react-router-dom";

type Props = {
  user: AuthUser;
};

export default function ReservationsPage({ user }: Props) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  async function handleCancel(reservationId: string) {
    try {
      await cancelReservation(reservationId, user.token);
      setReservations((prev) =>
        prev.map((r) =>
          r.id_reservation === reservationId ? { ...r, status: "Cancelled" } : r
        )
      );
    } catch {
      alert("No se pudo cancelar la reserva.");
    }
  }

  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-4xl px-6 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">Mis Reservas</h1>
      <p className="mt-1 text-sm text-gray-500">
        Aquí puedes ver y gestionar tus reservas activas.
      </p>

      <div className="mt-6">
        {loading ? (
          <StateMessage type="loading" title="Cargando reservas..." />
        ) : error ? (
          <StateMessage
            type="error"
            title="Error al cargar"
            description={error}
            actionText="Reintentar"
            onAction={() => window.location.reload()}
          />
        ) : reservations.length === 0 ? (
          <StateMessage
            type="empty"
            title="No tienes reservas"
            description="Ve a la lista de espacios para crear una."
            actionText="Ver espacios"
            onAction={() => (navigate("/"))}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {reservations.map((r) => (
              <ReservationRow
                key={`reservation-row-${r.id_reservation}`}
                reservation={r}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
