# FarmFlow — Frontend

React frontend for **FarmFlow**, a farm management app for tracking crop seasons, farm details, and income/expense transactions.

**Live app:** https://farmflow-shubham.vercel.app
**Backend repo:** [FarmFlow_Backend](https://github.com/Shubham-860/FarmFlow_Backend)

> The backend runs on Render's free tier — the first request after inactivity may take up to a minute while the server wakes up. Please be patient on first load!

---

## Features

- User authentication (register/login) with JWT
- Dashboard to manage multiple farms
- Crop season tracking with start/end dates and status
- Log income and expense transactions by category
- Clean, responsive UI

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router|
| Hosting | Vercel |

## Running Locally

### Prerequisites
- Node.js (v25+)
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

This frontend is deployed on **Vercel**, connecting to the FarmFlow backend hosted on Render. CORS is configured on the backend to allow requests from this deployed domain and `localhost` during development.
