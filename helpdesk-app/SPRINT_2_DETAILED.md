# Sprint 2: Core Module Development - Detailed Report

**Goal:** Implement core functional modules (Auth, Users, Tickets) to make the system usable.
**Status:** Completed

---

## 1. Authentication & Authorization Implementation

### Secure Login System
- **JWT Implementation:** `auth.controller.js` generates secure HTTP-only cookies upon login.
- **Password Hasliing:** `bcryptjs` used to hash passwords before saving to MongoDB (`user.model.js`).
- **Route Protection:**
    - `protect` middleware verifies the JWT token.
    - `authorize` middleware restricts access based on role (e.g., Only Admins can delete users).
- **Session Control:** Tokens set to expire in 30 days; cookies are cleared on logout.

---

## 2. User & Role Management

### Features Implemented
- **Registration:** Users can self-register (`POST /register`).
- **Profile Management:** Users can view/update their own profile (`GET /profile`).
- **Admin Control:**
    - `GET /users`: List all users with filtering by role/dept.
    - `PUT /users/:id`: Promote/Demote users (e.g., User -> Agent).
    - **Status Control:** Deactivate users to revoke access instantly.

---

## 3. Ticket Management (Core Functionality)

### Lifecycle Handling
- **Creation:**
    - Customers create tickets via `POST /tickets`.
    - **Auto-Assignment:** System automatically assigns tickets to Agents based on Department (Round-robin/Random logic in `ticket.controller.js`).
- **Status Workflow:** `Open` -> `In Progress` -> `Resolved` -> `Closed`.
- **Prioritization:** Logic to auto-set priority based on Ticket Type (e.g., "Access Issue" = Critical).

### History Tracking
- **Audit Log:** Every action (Status change, Assignment) is recorded in `TicketLog` collection.
- **API:** `GET /tickets/:id/history` retrieves the full timeline.

---

## 4. Dashboard Development

### Real-time Data Rendering
- **Implementation:** `DashboardPage.jsx` uses Recharts for data visualization.
- **KPI Cards:**
    - Total Tickets
    - Open vs Resolved Count
    - High Priority Count
    - SLA Breached Count
- **Responsive Charts:** Bar chart showing ticket distribution by status.
- **Recent Activity:** Table showing the last 5 tickets with status badges.

---

## 5. Backend API Development

### REST API Endpoints
- **Users:**
    - `POST /register`, `POST /login`, `GET /logout`
    - `GET /users` (Admin), `GET /me`
- **Tickets:**
    - `POST /` (Create), `GET /` (List with filters)
    - `GET /:id` (Details), `PUT /:id` (Update)
    - `GET /:id/history` (Audit trail)

### Robust Error Handling
- **Middleware:** Centralized `error.middleware.js` catches all async errors.
- **Responses:** Standardized error format `{ success: false, message: "Error details" }`.

---

## 6. Frontend Integration

### Redux State Management
- **Auth Slice:** Manages user session and token persistence.
- **Ticket Slice:** Handles fetching, caching, and updating ticket state.

### UX Features
- **Loading States:** Skeleton loaders / Spinners during API calls.
- **Toast Notifications:** `react-toastify` gives instant feedback on success/failure.
- **Axios Interceptors:** Automatically attaches Token to requests and handles global 401 (Unauthorized) redirects.

---

## 7. Basic Testing & Debugging

- **Unit Testing:** Verified API endpoints (Login, Create Ticket) using Postman.
- **Flow Validation:**
    - Verified User -> creates ticket -> Agent sees it in dashboard.
    - Verified Admin -> promotes User to Agent.
- **Performance:** Verified Dashboard loads efficiently even with seeded data.
