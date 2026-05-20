import type { LoginDTO, RegisterDTO, AuthUser } from "../types";

const BASE_URL = "http://localhost:5293/api";

export async function register(dto: RegisterDTO): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al registrar");
  return res.json();
}

export async function login(dto: LoginDTO): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Credenciales incorrectas.");
  const data = await res.json();
  return {
    id: data.id,
    email: dto.Email,
    role: data.role,
    token: data.token,
  };
}