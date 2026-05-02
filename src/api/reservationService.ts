import type { Reservation, ReservationDTO } from "../types";
import reservationsData from "../data/reservations.json";

const BASE_URL = "http://localhost:5000/api";

let mockReservations: Reservation[] = reservationsData as Reservation[];

export async function getReservationsByUser(userId: string): Promise<Reservation[]> {


  await new Promise((r) => setTimeout(r, 600));
  return mockReservations.filter((r) => r.userId === userId);
}

export async function createReservation(
  dto: ReservationDTO,
  userId: string,
  spaceName: string): Promise<Reservation> {
 

  await new Promise((r) => setTimeout(r, 800));
  const newReservation: Reservation = {
    id_reservation: `r-mock-${Date.now()}`,
    spaceId: dto.spaceId,
    spaceName,
    userId,
    date: dto.date,
    startTime: dto.startTime,
    endTime: dto.endTime,
    purpose: dto.purpose,
    attendeeCount: dto.attendeeCount,
    status: "Pending",
  };
  mockReservations = [...mockReservations, newReservation];
  return newReservation;
}

export async function cancelReservation(reservationId: string): Promise<boolean> {

  await new Promise((r) => setTimeout(r, 500));
  mockReservations = mockReservations.map((r) =>    r.id_reservation === reservationId ? { ...r, status: "Cancelled" } : r  );
  return true;
}
