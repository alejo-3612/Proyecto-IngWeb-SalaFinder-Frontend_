import type { Space } from "../types";
import spacesData from "../data/spaces.json";

const BASE_URL = "http://localhost:5000/api";

export async function getAllSpaces(): Promise<Space[]> {
  await new Promise((r) => setTimeout(r, 600));
  return spacesData as Space[];
}

export async function getSpaceById(id: string): Promise<Space> {

  await new Promise((r) => setTimeout(r, 400));
  const space = (spacesData as Space[]).find((s) => s.id_space === id);
  if (!space) throw new Error("Espacio no encontrado");
  return space;
}

export async function filterSpaces(
  type: string,
  capacity: number,
  building: string,
  resource: string): 
  Promise<Space[]> {
  

  await new Promise((r) => setTimeout(r, 500));
  return (spacesData as Space[]).filter((s) => {
    const matchType = !type || type === "All" || s.type === type;
    const matchCap = !capacity || s.capacity >= capacity;
    const matchBuilding = !building || building === "All" || s.building === building;
    const matchResource = !resource || s.resources.toLowerCase().includes(resource.toLowerCase());
    return matchType && matchCap && matchBuilding && matchResource && s.isActive;
  });
}
