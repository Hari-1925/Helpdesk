# Sprint 3: Advanced Features - Detailed Report

**Goal:** Enhance the application with SLA management, notifications, and analytics.
**Status:** Completed

---

## 1. SLA & Escalation Management

### Automated Monitoring
- **Scheduler:** Implemented `node-cron` job running every minute (`* * * * *`).
- **Logic:** `slaScheduler.js` calls `checkSlaStatus()` which:
    1.  Finds non-closed tickets where `slaDueAt` < `now`.
    2.  Marks them as `isSlaBreached = true`.
    3.  Triggers an `SLA_BREACH` notification to the assigned agent and manager.

### Escalation Rules
- **Priority-Based Deadlines:**
    - Critical: 4 Hours
    - High: 24 Hours
    - Medium: 3 Days
    - Low: 5 Days
- **Action:** Breached tickets are visually flagged (Red Border/Badge) on the dashboard.

---

## 2. Notification System

### Multi-Channel Alerts
- **In-App Notifications:**
    - Stored in MongoDB `Notifications` collection.
    - Real-time fetching via `NotificationBell` component.
    - Types: `TICKET_ASSIGNED`, `TICKET_UPDATED`, `SLA_BREACH`.
- **Email Notifications:**
    - Powered by `Nodemailer` (Gmail SMTP).
    - Triggered on: Registration, Ticket Creation, Password Reset.
    - **Fix:** Forced IPv4 to prevent `ENETUNREACH` errors.

---

## 3. Reports & Analytics Module

### Aggregation Framework
- **Implementation:** `report.service.js` uses MongoDB Aggregation Pipelines for high performance.
- **Key Metrics:**
    1.  **Status Distribution:** Pie chart data (Open vs Closed).
    2.  **Priority Breakdown:** Bar chart (Count of High/Critical tickets).
    3.  **Volume Over Time:** Daily ticket creation trend (Last 30 days).
    4.  **SLA Compliance:** Count of Met vs Breached SLAs.
    5.  **Agent Performance:** Leaderboard of Tickets Assigned vs Resolved.

### Visualization
- **Library:** Recharts.
- **Dashboard:** Interactive charts on `/reports` route (Admin/Manager only).

---

## 4. Knowledge Base Implementation

### Self-Service Portal
- **Structure:** Articles categorized by topic (e.g., "Login Issues", "Hardware").
- **Visibility:** 
    - Public articles accessible to all users.
    - Internal articles restricted to Staff (Agents/Admins).
- **Search:** Full-text search on Article Title and Content.
- **Editor:** Rich text editing for Article creation (`ArticleEditorPage.jsx`).

---

## 5. System Optimization

### Performance Improvements
- **Database Indexing:** Added indexes on `status`, `priority`, `assignedTo`, and `createdAt` in `ticket.model.js` to speed up dashboard queries.
- **Pagination:** API endpoints support `page` and `limit` query parameters.
- **Code Splitting:** Vite build automatically chunks vendor libraries for faster frontend load.

---

## 6. Security & Stability

### Key Enhancements
### Key Enhancements
- **Helmet:** Secure HTTP headers.
- **Error Handling:** Global Error Handler catches async errors to prevent server chrashes.

### Knowledge Base Utilities
- **Slug generation:** `slugify` for SEO-friendly URLs.
