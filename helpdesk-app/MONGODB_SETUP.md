# MongoDB Atlas Setup Guide for Render Deployment

This guide details how to set up a MongoDB Atlas cloud database and connect it to your application deployed on Render.

## Step 1: Create an Account & Cluster
1.  **Sign Up/Login:** Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign in.
2.  **Create a Project:** Name your project (e.g., "Helpdesk App").
3.  **Build a Database:**
    - Click **+ Create**.
    - Select **M0 Free** (Shared Tier).
    - Choose a provider (AWS) and region closest to your users.
    - Click **Create Deployment**.

## Step 2: Configure Security (User & Network)
### Database Access (Create User)
1.  On the **Security Quickstart** page:
    - **Username:** `admin` (or your choice).
    - **Password:** Generate a strong password. **Copy this password immediately**, you will need it later.
    - Click **Create Database User**.

### Network Access (Allow Render to Connect)
1.  Go to **Network Access** in the sidebar.
2.  Click **+ Add IP Address**.
3.  Select **Allow Access from Anywhere** (`0.0.0.0/0`).
    - *Note:* Render uses dynamic IPs, so whitelisting specific IPs is difficult. For M0 free clusters, allowing all IPs is the standard method.
    - Click **Confirm**.

## Step 3: Get Connection String
1.  Go to **Database** in the sidebar.
2.  Click **Connect** on your cluster.
3.  Select **Drivers**.
4.  Copy the connection string. It looks like:
    ```
    mongodb+srv://<username>:<password>@cluster0.p8q8e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    ```

## Step 4: Configure in Application
1.  Replace `<password>` with the password you generated in Step 2.
2.  Replace `<username>` if you changed it.
3.  This full string is your `MONGO_URI`.

### Adding to Render
1.  In your Render Dashboard, go to your Web Service.
2.  Navigate to **Environment**.
3.  Add a new Environment Variable:
    - **Key:** `MONGO_URI`
    - **Value:** Your full connection string.
