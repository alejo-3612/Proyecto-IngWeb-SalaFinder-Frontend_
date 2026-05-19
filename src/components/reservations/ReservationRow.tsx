import type { Reservation } from "../../types";
import { Badge } from "../ui/Feedback";
import Button from "../ui/Button";

type Props = {
  reservation: Reservation;
  onCancel: (id: string) => void;
};

function getStatusVariant(status: string) {
  switch (status) {
    case "Approved": return "success";
    case "Pending": return "warning";
    case "Rejected": return "danger";
    case "Cancelled": return "neutral";
    default: return "neutral";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "Approved": return "Aprobada";
    case "Pending": return "Pendiente";
    case "Rejected": return "Rechazada";
    case "Cancelled": return "Cancelada";
    default: return status;
  }
}

export default function ReservationRow({ reservation, onCancel }: Props) {
  const canCancel = reservation.status === "Pending" || reservation.status === "Approved";

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="m-0 font-semibold text-gray-900 truncate">
            {reservation.spaceName || "Espacio reservado"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {reservation.date} · {reservation.startTime} – {reservation.endTime}
          </p>
        </div>
        <Badge variant={getStatusVariant(reservation.status) as any}>
          {getStatusLabel(reservation.status)}
        </Badge>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p className="m-0">
          <span className="font-semibold">Propósito: </span>
          {reservation.purpose}
        </p>
        <p className="m-0">
          <span className="font-semibold">Asistentes: </span>
          {reservation.attendeeCount}
        </p>
      </div>

      {canCancel && (
        <div className="mt-3">
          <Button variant="danger" onClick={() => onCancel(reservation.id_reservation)}>
            Cancelar reserva
          </Button>
        </div>
      )}
    </article>
  );
}
