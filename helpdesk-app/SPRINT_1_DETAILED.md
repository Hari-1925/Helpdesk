# Sprint 1: Architecture & UI Design - Detailed Report

**Goal:** Design systsem architecture and user interface, ensuring clear structure and scalability.
**Status:** Completed

---

## 1. System Architecture Design

### MERN Stack Architecture
- **Frontend (Client):** React 19 + Vite (Single Page Application).
- **Backend (Server):** Node.js + Express (RESTful API).
- **Database:** MongoDB Atlas (Document Store).

### Interaction Flow
- **Client-Side:** Redux Toolkit manages global state; Axios handles HTTP requests.
- **Server-Side:** modular architecture where Routes -> Controllers -> Services -> Models.

### API Structure
- **REST Standard:** Uses standard HTTP methods (GET, POST, PUT, DELETE).
- **Prefix:** `/api/v1` for all endpoints.
- **Response Format:** JSON Standard Response `{ success: boolean, data: any, message: string }`.

---

## 2. Database Schema Design (ERD)

### Core Entities & Relationships

#### **1. Users Collection**
- **Fields:** `name`, `email` (Unique), `password` (Hashed), `role` (Enum), `department`.
- **Relationships:**
    - `1:N` Tickets (CreatedBy / AssignedTo)
    - `1:N` Notes (Author)

#### **2. Tickets Collection**
- **Fields:** `subject`, `description`, `status` (Open/In Progress/Resolved/Closed), `priority`, `type`, `slaDueAt`.
- **Relationships:**
    - `N:1` User (CreatedBy)
    - `N:1` User (AssignedTo)
    - `1:N` Notes (Ticket Comments)

#### **3. Notes Collection**
- **Fields:** `text`, `isInternal` (Staff only), `isStaff` (Boolean).
- **Relationships:**
    - `N:1` User (Author)
    - `N:1` Ticket (Parent)

---

## 3. API Design & Endpoint Planning

### Auth Module
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Authenticate & Get Token
- `POST /api/v1/auth/verify-email` - Verify OTP

### User Module
- `GET /api/v1/users` - List all users (Admin/Manager)
- `GET /api/v1/users/profile` - Get current user profile

### Ticket Module
- `POST /api/v1/tickets` - Create Ticket
- `GET /api/v1/tickets` - Get All Tickets (Filtered by Role)
- `GET /api/v1/tickets/:id` - Get Ticket Details
- `PUT /api/v1/tickets/:id` - Update Ticket (Status/Assign)

---

## 4. Role-Based Access Control (RBAC) Design

| Role | Permissions |
| :--- | :--- |
| **User** | Create Tickets, View Own Tickets, Close Own Tickets. |
| **Agent** | View Assigned/Dept Tickets, Update Status, Add Internal Notes. |
| **Manager** | View All Dept Tickets, Reassign Tickets, View Reports. |
| **Admin** | Full Access to Users, Tickets, and System Settings. |

**Implementation:**
- Middleware `protect`: Verifies JWT Token.
- Middleware `authorize(roles)`: Checks `req.user.role` against allowed roles.

---

## 5. UI Wireframe / Final Design

### Key Screens
1.  **Login/Register:**
    - Clean, centered card layout with "Glassmorphism" styling.
    - Animated background (blobs/gradient).
2.  **Dashboard (Admin/Agent):**
    - KPI Cards at top (Open, Closed, SLA Breached).
    - Data Table for recent tickets.
3.  **Ticket Details:**
    - Three-pane layout: Ticket Info (Left), Communication/Notes (Center), Metadata/Actions (Right).
    - Tabs for "Conversation", "Internal Notes", and "History".

---

## 6. Navigation & Routing Plan

### Route Hierarchy
- **Public:** `/login`, `/register`, `/verify-email`
- **Private (All Authenticated):** `/dashboard`, `/profile`
- **Role Protected:**
    - `/users` (Admin/Manager)
    - `/reports` (Admin/Manager)
    - `/tickets` (All, but data filtered by role)

### Security
- `PrivateRoute` wrapper checks for valid Token.
- `RoleRoute` wrapper checks for specific Role permissions.

---

## 7. UI Component Planning

### Design System
- **Framework:** Tailwind CSS v4 containing custom `glass-panel` utilities.
- **Iconography:** Lucide React (consistent stroke width).
- **Utilities:** `clsx`, `tailwind-merge` (Dynamic class management).
- **Components:**
    - `StatusBadge` (Color-coded pills for Status/Priority).
    - `TicketCard` (Summary view).
    - `NoteItem` (Chat-bubble style comments).
    - `Modal` (Confirmation dialogs).

---

## 8. Validation & Design Review

- **Scalability:** Modular backend allows easy addition of new features (e.g., Knowledge Base added later).
- **Usability:** Dark mode reduces eye strain; "Glass" UI provides modern aesthetic.
- **Requirement Alignment:** Full RBAC and SLA support integrated into core schema.
