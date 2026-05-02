import { useNavigate } from "react-router-dom";
import type { Space } from "../../types";
import { Badge } from "../ui/Feedback";
import Button from "../ui/Button";

type Props = {
  space: Space;
};

export default function SpaceCard({ space }: Props) {
  const navigate = useNavigate();
  const isInactive = !space.isActive;

  function handleReserve() {
    navigate(`/reserve/${space.id_space}`);
  }

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="m-0 text-base font-semibold text-gray-900">{space.name}</h3>
          <span className="block mt-1 text-xs text-gray-500">{space.type}</span>
        </div>
        <Badge variant={isInactive ? "danger" : space.requiresApproval ? "warning" : "success"}>
          {isInactive ? "Inactivo" : space.requiresApproval ? "Con aprobación" : "Disponible"}
        </Badge>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-700">
        <p className="m-0">
          <span className="font-semibold">Edificio: </span>
          <span className="text-gray-500">{space.building}</span>
        </p>
        <p className="m-0">
          <span className="font-semibold">Capacidad: </span>
          <span className="text-gray-500">{space.capacity} personas</span>
        </p>
        <p className="m-0">
          <span className="font-semibold">Recursos: </span>
          <span className="text-gray-500">{space.resources}</span>
        </p>
      </div>

      <div className="mt-4">
        <Button
          disabled={isInactive}
          variant="primary"
          fullWidth
          onClick={handleReserve}
        >
          {isInactive ? "No disponible" : "Reservar"}
        </Button>
      </div>
    </article>
  );
}
