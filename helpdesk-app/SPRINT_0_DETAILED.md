# Sprint 0: Setup & Orientation - Detailed Report

**Goal:** Project initialization, requirement clarity, and environment setup to ensure smooth development.
**Status:** Completed

---

## 1. Requirement Analysis & Understanding

### Problem Statement
An internship project to build a robust Helpdesk Ticketing System for managing customer support requests efficiently.

### User Roles & Stakeholders
- **Admin:** Full system control, user management (promote/demote), view all reports.
- **Agent:** Manage assigned tickets, update status (Open -> In Progress -> Resolved), modify priority.
- **Customer (User):** Create tickets, view own history, close own tickets.
- **Manager:** Oversight role (similar to Admin but focused on reporting/operations).

### Core Features (Scope)
- **Authentication:** JWT-based login/register, email verification, password reset.
- **Ticket Management:** CRUD operations, priority levels (Low/Medium/High/Critical), status workflow.
- **Dashboard:** Role-specific views (User: My Tickets; Agent: Assigned Work; Admin: Global Stats).
- **Communication:** Commenting system on tickets, file attachments.
- **Notifications:** In-app alerts and Email notifications.
- **Analytics:** Charts and graphs for SLA breaches, ticket volume, and agent performance.

---

## 2. Technology Stack Finalization

### Frontend
- **Framework:** **React 19** (via **Vite**) - Chosen for performance and modern hooks.
- **Styling:** **Tailwind CSS v4** - "Glassmorphism" design system for premium UI.
- **State Management:** **Redux Toolkit** - Centralized store for Auth, Tickets, and Notes.
- **Icons:** **Lucide React**.

### Backend
- **Runtime:** **Node.js**.
- **Framework:** **Express.js** - RESTful API architecture.
- **Deployment:** Render (Web Service).

### Database
- **Database:** **MongoDB Atlas** (Cloud) - Scalable NoSQL document store.
- **ODM:** **Mongoose** - Schema-based modeling.

### Core Libraries
- **Auth:** `jsonwebtoken` (JWT), `bcryptjs` (Hashing).
- **Validation:** `express-validator` (optional), custom middleware.
- **Email:** `nodemailer` (Gmail SMTP).
- **Scheduler:** `node-cron` (SLA checking).
- **File Upload:** `multer` (Local storage/uploads).
- **Utilities:** `cookie-parser` (Cookies), `morgan` (Logging), `dotenv` (Config).

---

## 3. System Planning & Architecture Prep

### Architecture Pattern
- **MVC (Model-View-Controller):** Adapted for API (Routes serving as Controllers).
- **Modular Structure:** Feature-based organization (Auth, Tickets, Users modules).

### Data Flow
1.  **Client** sends Request (Axios) -> **Express Middleware** (CORS/Helmet/Auth) -> **Route Handler** -> **Controller Logic** -> **Mongoose Model** -> **MongoDB**.
2.  Response flows back to Client -> **Redux Slice** updates State -> **UI Component** re-renders.

### API Strategy
- **Base URL:** `/api/v1`
- **Auth:** `Bearer <token>` in Headers.

---

## 4. Development Environment Setup

### Tools Installed & Configured
- **Node.js:** Runtime environment verified.
- **Postman:** tailored for API testing.
- **VS Code:** Configured with ESLint/Prettier.

### Environment Variables (.env)
- **Server:** `PORT`, `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `CORS_ORIGIN`.
- **Client:** `VITE_API_BASE_URL`.

---

## 5. Project Folder Structure

### Structure Overview
```
/helpdesk-app
├── /client             # React Frontend
│   ├── /src
│   │   ├── /modules    # Feature-based (auth, tickets, reports)
│   │   ├── /shared     # Shared components (Layout, UI)
│   │   ├── /services   # API calls (axios instances)
│   │   └── /app        # Redux store
└── /server             # Express Backend
    ├── /src
    │   ├── /config     # DB, Env config
    │   ├── /controllers# Logic layer
    │   ├── /models     # Database Schemas
    │   ├── /routes     # API Endpoints
    │   ├── /middleware # Auth, Error handling
    │   └── /utils      # Email, Helpers
```

---

## 6. Version Control Setup

- **Repository:** Git initialized.
- **Branching Strategy:** Main branch for stable releases; Feature branches for development.
- **Conventions:**
    - `.gitignore` configured to exclude `node_modules`, `.env`, `dist`.
    - Commit messages follow descriptive pattern (e.g., "Fix: Force IPv4 for email").

---

## 7. Role Assignment & Team Coordination

- **Developer:** Harishankar (Full Stack Implementation).
- **AI Assistant:** Google DeepMind Assistant (Code generation, debugging, documentation).

---

## 8. UI/UX Preparation

### Theme Direction
- **Style:** "Cyberpunk Lite" / "Glassmorphism".
- **Palette:** Dark Mode default.
    - Background: Deep Slate/Navy.
    - Accents: Neon Blue (Primary), Neon Purple (Secondary).
    - Panels: Translucent white/black with blur (`backdrop-filter`).
- **Interaction:** Smooth transitions, hover glows, gamified inputs (OTP).
