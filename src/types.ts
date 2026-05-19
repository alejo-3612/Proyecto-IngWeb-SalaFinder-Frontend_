
export type SpaceType = "Salón" | "Laboratorio" | "Auditorio" | "Sala de Reuniones" | "Sala de Estudio";

export type ReservationStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";

export interface Space {
  id_space: string;
  name: string;
  type: string;
  capacity: number;
  building: string;
  resources: string;
  allowedPrograms: string;
  requiresApproval: boolean;
  isActive: boolean;
}

export interface Reservation {
  id_reservation: string;
  spaceId: string;
  spaceName?: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendeeCount: number;
  status: ReservationStatus;
}

export interface LoginDTO {
  Email: string;
  Password: string;
}

export interface RegisterDTO {
  Email: string;
  Password: string;
  Role: string;
}

export interface ReservationDTO {
  spaceId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendeeCount: number;
  userProgram: string;
}
  
export interface AuthUser {
  id: string;
  email: string;
  role: string;
  token: string;
}
