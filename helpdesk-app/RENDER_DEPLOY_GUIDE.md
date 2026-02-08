# Render Deployment Guide (Split Service)

This guide explains how to deploy your MERN stack application on Render as two separate services:
1.  **Backend:** Node.js/Express as a **Web Service**.
2.  **Frontend:** React/Vite as a **Static Site**.
3.  **Database:** MongoDB Atlas connecting to the Backend.

## Part 1: MongoDB Atlas Setup
*Follow the steps in [MONGODB_SETUP.md](file:///h:/Project/IBM Internship/Helpdesk App/helpdesk-app/MONGODB_SETUP.md) first to create your cluster and get your connection string.*

---

## Part 2: Backend Deployment (Web Service)

1.  **Push to GitHub:** Ensure your latest code is pushed.
2.  **Create Service:**
    - Log in to [Render](https://dashboard.render.com/).
    - Click **New +** and select **Web Service**.
    - Connect your repository.
3.  **Configure Service:**
    - **Name:** `helpdesk-backend` (or similar)
    - **Root Directory:** `server` (Important: This tells Render to run from the server folder)
    - **Runtime:** `Node`
    - **Build Command:** `npm install`
    - **Start Command:** `npm start`
4.  **Environment Variables:**
    - Scroll down to **Environment Variables** and add:
        - `MONGO_URI`: *Paste your connection string from Part 1*
        - `JWT_SECRET`: *Your secret key*
        - `NODE_ENV`: `production`
        - `CORS_ORIGIN`: *Leave this empty for now, we will update it after deploying the frontend.*
5.  **Deploy:** Click **Create Web Service**.
    - Wait for the deployment to finish.
    - **Copy the Backend URL** (e.g., `https://helpdesk-backend.onrender.com`). You will need this for the frontend.

---

## Part 3: Frontend Deployment (Static Site)

1.  **Create Service:**
    - On Render Dashboard, click **New +** and select **Static Site**.
    - Connect the **same** repository.
2.  **Configure Service:**
    - **Name:** `helpdesk-frontend`
    - **Root Directory:** `client` (Important: This tells Render to run from the client folder)
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`
3.  **Environment Variables:**
    - Add the following variable:
        - `VITE_API_BASE_URL`: *Paste your Backend URL* + `/api/v1`
          - Example: `https://helpdesk-backend.onrender.com/api/v1`
4.  **Deploy:** Click **Create Static Site**.
    - Wait for the deployment to finish.
    - **Copy the Frontend URL** (e.g., `https://helpdesk-frontend.onrender.com`).

---

## Part 4: Final Configuration (Connecting them)

Now that both are deployed, we need to tell the backend to accept requests from the frontend.

1.  Go back to your **Backend Service** on Render.
2.  Go to **Environment**.
3.  Add/Update the `CORS_ORIGIN` variable:
    - **Key:** `CORS_ORIGIN`
    - **Value:** *Your Frontend URL* (e.g., `https://helpdesk-frontend.onrender.com`)
      - *Note: Do not include trailing slash.*
4.  **Save Changes.** Render will automatically redeploy the backend.

## Troubleshooting

### Common Error: `net::ERR_BLOCKED_BY_CLIENT`
If you see this error when logging in or making requests, it means the browser is blocking the request before it reaches the server.

**Causes & Solutions:**
1.  **Ad Blockers / Extensions:**
    - Privacy extensions (like uBlock Origin, AdGuard, Privacy Badger) may block requests to "tracker-like" URLs.
    - **Fix:** Disable ad blockers for your Render URL or try opening the app in **Incognito Mode**.

2.  **Mixed Content (HTTP vs HTTPS):**
    - Your frontend is on `https://`, but you might have set `VITE_API_BASE_URL` to `http://`. Browsers block HTTP requests from HTTPS pages (Mixed Content).
    - **Fix:** Check your Frontend Environment Variables in Render. Ensure `VITE_API_BASE_URL` starts with `https://`.

3.  **Strict Browser Privacy:**
    - Some browsers (Brave, Firefox Strict Mode) block cross-site cookies/requests (triggered by `withCredentials: true`).
    - **Fix:** Try a standard browser (Chrome/Edge) with default settings to verify.

### Common Error: CORS / Localhost Connection
**Error:** `Access to XMLHttpRequest at 'http://localhost:5000...' from origin 'https://...' has been blocked by CORS policy`

This determines **two** missing configurations:

1.  **Frontend is hitting Localhost:**
    - The error says it's trying to connect to `http://localhost:5000`. This means your Frontend doesn't know where the deployed Backend is.
    - **Fix:** Go to **Frontend Service > Environment** on Render.
    - Add/Update `VITE_API_BASE_URL` with your **Backend URL** (e.g., `https://helpdesk-backend.onrender.com/api/v1`).
    - **Redeploy** the Frontend for this change to take effect.

2.  **Backend is blocking Frontend:**
    - The error says `Access-Control-Allow-Origin` is `http://localhost:5173`.
    - **Fix:** Go to **Backend Service > Environment** on Render.
    - Update `CORS_ORIGIN` to match your **Frontend URL** exactly (e.g., `https://helpdesk-1-nrev.onrender.com`).
    - **Do not** add a trailing slash (`/`) at the end of the URL.
