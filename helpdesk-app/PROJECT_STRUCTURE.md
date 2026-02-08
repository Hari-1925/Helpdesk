# Project Structure & Data Flow Documentation

This document provides a comprehensive overview of the Helpdesk Application's file structure and how the different components interact.

---

## 1. Project Directory Structure

The project follows a **Monorepo-style** structure with separate directories for Client and Server.

```
/helpdesk-app
├── /client                 # React Frontend (Vite)
│   ├── /public             # Static assets (favicon, manifest)
│   ├── /src
│   │   ├── /app            # Redux Store configuration (store.js)
│   │   ├── /assets         # Images and global styles
│   │   ├── /modules        # Feature-based Modules
│   │   │   ├── /auth       # Login, Register, Profile, Verification
│   │   │   ├── /tickets    # Dashboard, Ticket List, Details, Create
│   │   │   ├── /users      # User Management (Admin)
│   │   │   ├── /reports    # Analytics Dashboard
│   │   │   └── /knowledgeBase # Self-service articles
│   │   ├── /services       # API Service (Axios Setup)
│   │   ├── /shared         # Shared Components (Layout, Navbar, PrivateRoute)
│   │   ├── App.jsx         # Main Component & Routing Logic
│   │   └── main.jsx        # Entry Point (DOM Rendering)
│   ├── index.html          # HTML Template
│   ├── package.json        # Frontend Dependencies
│   └── vite.config.js      # Vite Configuration
│
├── /server                 # Node.js Express Backend
│   ├── /src
│   │   ├── /config         # Configuration (DB Connection, Env Vars)
│   │   ├── /controllers    # Request Logic (Req/Res handling)
│   │   ├── /jobs           # Cron Jobs (SLA Scheduler)
│   │   ├── /middlewares    # Auth, Error, Upload, Validation
│   │   ├── /models         # Mongoose Schemas (User, Ticket, Note)
│   │   ├── /modules        # Feature Modules (Service Layer)
│   │   │   ├── /auth       # Auth Logic
│   │   │   ├── /tickets    # Ticket Logic
│   │   │   └── ...         # (Matches Frontend Modules)
│   │   ├── /routes         # API Route definitions
│   │   ├── /utils          # Helpers (Email, APIResponse, Logger)
│   │   ├── app.js          # Express App Setup (Middleware, CORS)
│   │   └── server.js       # Server Entry Point (Port Listen)
│   ├── .env                # Environment Variables (Secrets)
│   └── package.json        # Backend Dependencies
```

---

## 2. System Usage Flow

### A. Authentication Flow (Login)
1.  **User** enters credentials on `LoginPage.jsx`.
2.  **Frontend** calls `authService.login()` -> `POST /api/v1/auth/login`.
3.  **Backend** (`auth.controller.js`):
    - Validates input.
    - Checks credentials against MongoDB (`User` model).
    - Generates **JWT** (JSON Web Token).
    - Sends JWT as an **HTTP-Only Cookie**.
4.  **Frontend** updates Redux state (`authSlice`) with user info.
5.  **Router** redirects user to `/dashboard`.

### B. Ticket Creation Flow
1.  **User** fills form on `CreateTicketPage.jsx`.
2.  **Frontend** calls `ticketService.createTicket()` -> `POST /api/v1/tickets`.
3.  **Backend** (`ticket.controller.js`):
    - Verifies JWT via `protect` middleware.
    - Validates ticket data.
    - **Auto-Assigns** agent based on Department.
    - Saves to MongoDB (`Ticket` model).
    - Triggers Email Notification via `emailService.js`.
4.  **Frontend** receives success response and redirects to `TicketDetailsPage.jsx`.

### C. Dashboard & Analytics Flow
1.  **Admin** navigates to `/reports`.
2.  **Frontend** calls `reportService.getStats()` -> `GET /api/v1/reports/dashboard`.
3.  **Backend** (`report.service.js`):
    - Runs **MongoDB Aggregation Pipeline** to calculate:
        - Ticket Volume (Daily)
        - Priority Distribution
        - SLA Compliance
4.  **Frontend** receives JSON data and renders Charts using **Recharts**.

### D. SLA Monitoring (Background Job)
1.  **Server** starts `slaScheduler.js` on boot.
2.  **Cron Job** runs every minute.
3.  **Logic:**
    - Checks DB for "Open" tickets where `slaDueAt` < `Now`.
    - Marks them as `Breached`.
    - Creates **In-App Notification** for the assigned Agent.

---

## 3. Key Technologies

-   **Frontend:** React 19, Redux Toolkit, Tailwind CSS v4, Vite.
-   **Backend:** Node.js, Express, MongoDB Mongoose.
-   **Security:** JWT (Cookies), Helmet, Bcrypt.
-   **Tools:** Nodemailer (Email), Multer (Uploads), Recharts (Analytics).
