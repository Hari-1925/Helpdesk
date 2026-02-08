# Project Roadmap

## Sprint 0
**Goal:** Setup & Orientation
**Deliverable:** Environment setup + Git setup

### Detailed Breakdown
#### 1. Environment Setup
- **Tools Installed:**
  - Node.js (Runtime environment)
  - MongoDB (Database)
  - VS Code (Code Editor) with extensions (ESLint, Prettier)
  - Git (Version Control)

#### 2. Project Structure Setup
- **Architecture:** MERN Stack (MongoDB, Express, React, Node.js)
- **Folder Structure:**
  - `client/`: Frontend application using Vite + React
  - `server/`: Backend application using Express

#### 3. Git Setup
- Initialized Git repository
- Configured `.gitignore` for both `client` and `server` to exclude:
  - `node_modules/`
  - `.env` files
  - Build artifacts (`dist/`)
  - Logs
- Staged and committed initial codebase
- Pushed to remote repository

**Technologies & Tools Used:**
- **Core:** Node.js, MongoDB, Git
- **Dev Tools:** VS Code, Postman (API Testing)
- **Configuration:** `.gitignore`, `package.json`

## Sprint 1
**Goal:** Architecture & UI Design
**Deliverable:** Wireframes + Navigation

### Detailed Breakdown
#### 1. Architecture Design
- **Frontend Architecture:** Component-based architecture using React.
- **State Management:** Implemented Redux Toolkit for global state (Auth, Tickets).
- **Routing:** Configured `react-router-dom` with:
  - Public Routes (Login, Register, Knowledge Base)
  - Private Routes (Dashboard, Tickets)
  - Role-Based Routes (Admin/Manager specific access)

#### 2. UI/UX Implementation
- **Design System:** Implemented "Glassmorphism" aesthetic using Tailwind CSS.
  - Dark mode centered design
  - Translucent panels (`backdrop-blur`)
  - Gradient accents and animated backgrounds
- **Navigation:** Created `MainLayout` featuring:
  - Responsive Sidebar with navigation links
  - Header with User Profile and Notification Bell
  - Mobile-responsive menu interaction

**Technologies & Tools Used:**
- **Frontend Framework:** React 19, Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer, clsx, tailwind-merge
- **State Management:** Redux Toolkit, React-Redux
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Linting:** ESLint
## Sprint 2
**Goal:** Core Module Development
**Deliverable:** Working Dashboards

### Detailed Breakdown
#### 1. Authentication Module
- Implemented secure Login & Registration forms.
- Integrated JWT-based authentication flow.
- Added Password Reset & Email Verification context.

#### 2. Ticket Management Module
- **Dashboard:** Created `DashboardPage` displaying:
  - Real-time statistics (Total, Open, Resolved tickets)
  - Visual distribution charts
  - Recent activity feed
- **Ticket Operations:**
  - Create Ticket interface with priority and category selection.
  - Ticket Details view for conversation history and status updates.

#### 3. User Management
- Implemented `UsersPage` for admins to manage staff and customers.
- Created `ProfilePage` for user settings.

**Technologies & Tools Used:**
- **Backend:** Express, Mongoose, Dotenv
- **Auth:** JSONWebToken (JWT), Bcrypt.js (Hashing)
- **API Client:** Axios (Frontend)
- **Notifications:** React-Toastify
- **Utilities:** Slugify

## Sprint 3
**Goal:** Advanced Features
**Deliverable:** Analytics + Notifications

### Detailed Breakdown
#### 1. Analytics Module
- Developed `ReportsDashboard` using `recharts` library.
- **Visualizations:**
  - KPI Cards (Total Tickets, SLA Breached, SLA Met)
  - Status Distribution (Pie Chart)
  - Priority Breakdown (Bar Chart)
  - Daily Ticket Volume (Area Chart)
  - Agent Performance Leaderboard

#### 2. Notification System
- **Frontend:** Integrated `NotificationBell` component in the main header.
- **Backend:** Implemented notification service to trigger alerts for:
  - New ticket creation
  - Status changes
  - Assignment updates
- **Real-time:** Polling/Update mechanism for fresh alerts.

**Technologies & Tools Used:**
- **Data Visualization:** Recharts
- **Scheduling:** Node-Cron (SLA Monitoring)
- **Email:** Nodemailer (Email Notifications)
- **File Handling:** Multer (Upload Management)

## Sprint 4
**Goal:** Integration & Deployment
**Deliverable:** Final System + Presentation

### Detailed Breakdown
#### 1. System Integration
- **API Integration:** Connected React frontend to Express backend using Axios.
- **Data Flow:** Established seamless data synchronization for tickets and users.
- **Security:** Configured CORS and Helmet for secure API communication.

#### 2. Background Services
- **SLA Scheduler:** Implemented background jobs (`startSlaScheduler`) to monitor and auto-escalate tickets breaching SLA.

#### 3. Deployment Readiness
- **Frontend:** Configured Vite for optimized production build.
- **Backend:** Environment variable configuration for production ports and database connections.
- **Error Handling:** Centralized error middleware for robust failure management.

**Technologies & Tools Used:**
- **Security:** Helmet, CORS, Cookie-Parser
- **Logging:** Morgan
- **Deployment:** Vite Build, ESLint
