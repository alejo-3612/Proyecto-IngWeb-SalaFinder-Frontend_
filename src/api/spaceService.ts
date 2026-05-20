import type { Reservation, Space } from "../types";

const BASE_URL = "http://localhost:5293/api";

export async function getAllSpaces(): Promise<Space[]> {
  const res = await fetch(`${BASE_URL}/space`);
  if (!res.ok) throw new Error("Error al obtener espacios");
  return res.json();
}

export async function getSpaceById(id: string): Promise<Space> {
  const res = await fetch(`${BASE_URL}/space/${id}`);
  if (!res.ok) throw new Error("Espacio no encontrado");
  return res.json();
}

export async function filterSpaces(
  type: string,
  capacity: number,
  building: string,
  resource: string
): Promise<Space[]> {
  const params = new URLSearchParams({
    type,
    capacity: String(capacity),
    building,
    resource,
  });
  const res = await fetch(`${BASE_URL}/space/filter?${params}`);
  if (!res.ok) throw new Error("Error al filtrar espacios");
  return res.json();
}

export async function getAllReservations(
  token: string
): Promise<Reservation[]> {
  const res = await fetch(`${BASE_URL}/reservation`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return res.json();
}
 
export async function approveReservation(
  reservationId: string,
  token: string
): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/reservation/approve/${reservationId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}
 
export async function rejectReservation(
  reservationId: string,
  token: string
): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/reservation/reject/${reservationId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}