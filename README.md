## Integrantes:
Alejandro Sánchez y Juan José Díaz

## SalaFinder:
Sala Finder es un programa web diseñado para la reserva de espacios dentro de la universidad. El sistema permite a los usuarios consultar la disponibilidad de espacios, realizar reservas y gestionar conflictos de horario. 

## Incluye:
Evita reservas en fechas pasadas

Registra todos las reservas del usuario

Calendario con información sobre eventos en cada día

## Cómo correr el proyecto

### 1. Clonar el repositorio

bash
git clone https://github.com/tu-usuario/Proyecto-IngWeb-SalaFinder-Frontend.git
cd Proyecto-IngWeb-SalaFinder-Frontend


### 2. Instalar dependencias

bash
npm install


### 3. Correr en desarrollo

bash
npm run dev


La app estará disponible en http://localhost:5173

> El backend debe estar corriendo en http://localhost:5293 para que la app funcione correctamente.

---

## Credenciales demo

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Estudiante | estudiante@universidad.edu.co | Password1 |
| Administrador | admin@universidad.edu.co | Admin123! |

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | Librería principal de UI |
| TypeScript | 5.x | Tipado estático |
| Vite | 6.x | Bundler y servidor de desarrollo |
| Tailwind CSS | 3.x | Estilos y diseño |
| React Router | 6.x | Navegación y rutas |

---

## Estructura de carpetas


src/
├── api/                  # Servicios para comunicarse con el backend
│   ├── authService.ts    # Registro y login
│   ├── reservationService.ts  # Reservas (crear, cancelar, aprobar, rechazar)
│   └── spaceService.ts   # Consulta de espacios
│
├── components/           # Componentes reutilizables
│   ├── global/
│   │   └── NavBar.tsx    # Barra de navegación con control por rol
│   ├── reservations/
│   │   └── ReservationRow.tsx  # Fila de reserva individual
│   ├── spaces/
│   │   ├── SpaceCard.tsx       # Tarjeta de espacio
│   │   ├── SpaceFilterBar.tsx  # Filtros de búsqueda
│   │   └── SpaceList.tsx       # Lista de espacios
│   └── ui/
│       ├── Button.tsx    # Botón reutilizable
│       └── Feedback.tsx  # Estados de carga, error y vacío
│
├── pages/                # Páginas principales
│   ├── AdminPage.tsx     # Panel de administrador (aprobar/rechazar reservas)
│   ├── CalendarPage.tsx  # Calendario semanal de reservas
│   ├── LoginPage.tsx     # Inicio de sesión
│   ├── NotFoundPage.tsx  # Página 404
│   ├── RegisterPage.tsx  # Registro de usuario
│   ├── ReservationsPage.tsx  # Mis reservas
│   ├── ReservePage.tsx   # Formulario de reserva
│   └── SpacesPage.tsx    # Lista de espacios disponibles
│
├── types.ts              # Tipos e interfaces de TypeScript
├── App.tsx               # Rutas y estado global del usuario
└── main.tsx              # Punto de entrada


---

## Roles del sistema

- *Student* — puede consultar espacios y hacer reservas
- *Staff* — docentes y personal, mismos permisos que Student
- *Admin* — puede ver todas las reservas y aprobarlas o rechazarlas

---

## Backend

El backend está desarrollado en ASP.NET Core con C# y SQL Server. Repositorio: [Proyecto-IngWeb-SalaFinder-Backend](https://github.com/tu-usuario/Proyecto-IngWeb-SalaFinder-Backend)
