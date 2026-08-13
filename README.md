# FarmFlow - Frontend

React frontend for **FarmFlow**, a farm management app for tracking crop seasons, farm details, and income/expense transactions.

**Live app:** https://farmflow-shubham.vercel.app
**Backend repo:** [FarmFlow_Backend](https://github.com/Shubham-860/FarmFlow_Backend)

> The backend runs on Render's free tier, so the first request after inactivity may be delayed while the service wakes up.

---

## Features

- User authentication (register/login) with JWT
- Dashboard to manage multiple farms
- Crop season tracking with start/end dates and status
- Log income and expense transactions by category
- Reports and farm analytics
- Role-based admin tools for user management, crop analytics, and admin creation
- Clean, responsive UI

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router |
| Hosting | Vercel |

## Running Locally

### Prerequisites
- Node.js `20.19+` or `22.12+`
- The [backend](https://github.com/Shubham-860/FarmFlow_Backend) running locally or accessible remotely

### Setup

```bash
git clone https://github.com/Shubham-860/farm_flow_frontend.git
cd farm_flow_frontend
npm install
```

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:8080
```

Run the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |


## Build for Production

```bash
npm run build
```

Outputs a production-ready build to the `dist/` folder.

## Deployment

This frontend is deployed on **Vercel**, connecting to the FarmFlow backend hosted on Render. Configure `VITE_API_URL` in the Vercel project's environment variables with the deployed backend URL. CORS is configured on the backend to allow requests from this deployed domain and `localhost` during development.
