# Helpdesk App Setup Guide

This guide describes how to set up the Helpdesk application on a different PC.

## 1. Prerequisites

Before starting, ensure the new PC has the following software installed:

*   **Node.js** (v18 or higher recommended): [Download Here](https://nodejs.org/)
*   **MongoDB Community Server**: [Download Here](https://www.mongodb.com/try/download/community)
    *   Make sure MongoDB is running as a service.
    *   Optionally install **MongoDB Compass** for a GUI to view your database.
*   **Git** (Optional, if cloning from a repository): [Download Here](https://git-scm.com/)

## 2. Project Structure

The project relies on two main folders:
*   `server/`: The backend API (Node.js/Express)
*   `client/`: The frontend application (React/Vite)

## 3. Server Setup

1.  **Navigate to the server directory**:
    Open a terminal and run:
    ```bash
    cd helpdesk-app/server
    ```

2.  **Install Dependencies**:
    Run the following command to install all required libraries:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a file named `.env` in the `server` folder (same level as `package.json`).
    Add the following content (adjust values if necessary):

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/helpdesk_db
    JWT_SECRET=your_secure_random_secret_here
    NODE_ENV=development
    ```
    *   `MONGO_URI`: This assumes a local MongoDB instance. If using a cloud database (like MongoDB Atlas), replace this with your connection string.
    *   `JWT_SECRET`: Change this to a random string for security.

4.  **Start the Server**:
    To start the server in development mode (auto-restarts on changes):
    ```bash
    npm run dev
    ```
    To start it normally:
    ```bash
    npm start
    ```
    You should see: `Server is running at port : 5000` and `MongoDB Connected`.

## 4. Client Setup

1.  **Navigate to the client directory**:
    Open a new terminal window (keep the server running) and run:
    ```bash
    cd helpdesk-app/client
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Client**:
    ```bash
    npm run dev
    ```
    This will start the Vite development server. Open the URL shown (usually `http://localhost:5173`) in your browser.

## 5. Troubleshooting & Notes

*   **API Connection**: The client connects to `http://localhost:5000/api/v1` by default (defined in `client/src/services/api.js`). Ensure your server is running on port 5000.
*   **Database**: If you want to transfer data from the old PC, you will need to export your MongoDB data using `mongodump` and import it on the new PC using `mongorestore`, or recreate the data manually.
