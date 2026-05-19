import Button from "../ui/Button";

type Props = {
  searchTerm: string;
  onChangeSearchTerm: (v: string) => void;
  selectedType: string;
  types: string[];
  onTypeChange: (v: string) => void;
  selectedBuilding: string;
  buildings: string[];
  onBuildingChange: (v: string) => void;
  onlyAvailable: boolean;
  onOnlyAvailableChange: (v: boolean) => void;
  onResetFilters: () => void;
};

export default function SpaceFilterBar({
  searchTerm,
  onChangeSearchTerm,
  selectedType,
  types,
  onTypeChange,
  selectedBuilding,
  buildings,
  onBuildingChange,
  onlyAvailable,
  onOnlyAvailableChange,
  onResetFilters,
}: Props) {
  const fieldBase =
    "rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-brand-300";
  const inputBase = "w-full bg-transparent text-sm outline-none placeholder:text-gray-400";

  return (
    <section className="mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Buscar</span>
          <div className={`flex items-center gap-2 ${fieldBase}`}>
            <input
              className={inputBase}
              type="text"
              value={searchTerm}
              placeholder="Nombre, edificio..."
              onChange={(e) => onChangeSearchTerm(e.target.value)}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Tipo</span>
          <select
            className={`cursor-pointer ${fieldBase}`}
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="All">Todos</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Edificio</span>
          <select
            className={`cursor-pointer ${fieldBase}`}
            value={selectedBuilding}
            onChange={(e) => onBuildingChange(e.target.value)}
          >
            <option value="All">Todos</option>
            {buildings.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onOnlyAvailableChange(e.target.checked)}
          />
          Solo disponibles
        </label>
        <Button variant="secondary" onClick={onResetFilters}>
          Limpiar filtros
        </Button>
      </div>
    </section>
  );
}
