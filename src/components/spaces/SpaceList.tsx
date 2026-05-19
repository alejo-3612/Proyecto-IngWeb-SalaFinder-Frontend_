import type { Space } from "../../types";
import SpaceCard from "./SpaceCard";

type Props = {
  spaces: Space[];
};

export default function SpaceList({ spaces }: Props) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {spaces.map((space) => (
        <SpaceCard key={`space-card-${space.id_space}`} space={space} />
      ))}
    </section>
  );
}
