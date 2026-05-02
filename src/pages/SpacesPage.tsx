import { useEffect, useMemo, useState } from "react";
import { getAllSpaces } from "../api/spaceService";
import type { Space } from "../types";
import SpaceList from "../components/spaces/SpaceList";
import SpaceFilterBar from "../components/spaces/SpaceFilterBar";
import { StateMessage } from "../components/ui/Feedback";

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBuilding, setSelectedBuilding] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const data = await getAllSpaces();
        setSpaces(data);
      } catch {
        setError("No se pudieron cargar los espacios.");
      } finally {
        setLoading(false);
      }
    }
    fetchSpaces();
  }, []);

  const types = useMemo(() => {
    return Array.from(new Set(spaces.map((s) => s.type))).sort();
  }, [spaces]);

  const buildings = useMemo(() => {
    return Array.from(new Set(spaces.map((s) => s.building))).sort();
  }, [spaces]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return spaces.filter((s) => {
      const matchSearch =
        term.length === 0 ||
        s.name.toLowerCase().includes(term) ||
        s.building.toLowerCase().includes(term);
      const matchType = selectedType === "All" || s.type === selectedType;
      const matchBuilding = selectedBuilding === "All" || s.building === selectedBuilding;
      const matchAvail = !onlyAvailable || s.isActive;
      return matchSearch && matchType && matchBuilding && matchAvail;
    });
  }, [spaces, searchTerm, selectedType, selectedBuilding, onlyAvailable]);

  function handleReset() {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedBuilding("All");
    setOnlyAvailable(false);
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Espacios disponibles</h1>
      <p className="mt-1 text-sm text-gray-500">
        Encuentra y reserva el espacio que necesitas.
      </p>

      <SpaceFilterBar
        searchTerm={searchTerm}
        onChangeSearchTerm={setSearchTerm}
        selectedType={selectedType}
        types={types}
        onTypeChange={setSelectedType}
        selectedBuilding={selectedBuilding}
        buildings={buildings}
        onBuildingChange={setSelectedBuilding}
        onlyAvailable={onlyAvailable}
        onOnlyAvailableChange={setOnlyAvailable}
        onResetFilters={handleReset}
      />

      <div className="my-3 flex justify-end">
        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 shadow-sm">
          Resultados: {filtered.length}
        </span>
      </div>

      {loading ? (
        <StateMessage type="loading" title="Cargando espacios..." />
      ) : error ? (
        <StateMessage
          type="error"
          title="Error al cargar"
          description={error}
          actionText="Reintentar"
          onAction={() => window.location.reload()}
        />
      ) : filtered.length === 0 ? (
        <StateMessage
          type="empty"
          title="Sin resultados"
          description="Intenta cambiar los filtros de búsqueda."
          actionText="Limpiar filtros"
          onAction={handleReset}
        />
      ) : (
        <SpaceList spaces={filtered} />
      )}
    </main>
  );
}
