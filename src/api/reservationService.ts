import type { Reservation, ReservationDTO } from "../types";

const BASE_URL = "http://localhost:5293/api";

export async function getReservationsByUser(
  userId: string,
  token: string
): Promise<Reservation[]> {
  const res = await fetch(`${BASE_URL}/reservation/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function createReservation(
  dto: ReservationDTO,
  token: string
): Promise<Reservation> {
  const res = await fetch(`${BASE_URL}/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al crear la reserva");
  return res.json();
}

export async function cancelReservation(
  reservationId: string,
  token: string
): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/reservation/cancel/${reservationId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}