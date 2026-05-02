import type { LoginDTO, RegisterDTO, AuthUser } from "../types";

const BASE_URL = "http://localhost:5000/api";

const MOCK_USER: AuthUser = {
  id: "user-001",
  email: "estudiante@universidad.edu.co",
  role: "Student",
  token: "mock-jwt-token-abc123",
};

export async function register(dto: RegisterDTO): Promise<{ message: string }> {
 
 await new Promise((r) => setTimeout(r, 800));
  return { message: `Usuario ${dto.Email} creado con éxito.` };
}

export async function login(dto: LoginDTO): Promise<AuthUser> {

  await new Promise((r) => setTimeout(r, 800));
  if (dto.Email === "estudiante@universidad.edu.co" && dto.Password === "Password1") {
    return MOCK_USER;
  }
  throw new Error("Credenciales incorrectas.");
}
