# House Price Prediction — Frontend

A single-page React application that collects property details, sends
them to an existing FastAPI backend, and displays the predicted house
price. Built as the client for an ITI Machine Learning graduation
project.

This project **only** implements the frontend. It talks to a backend
that must already be running separately — it does not include, modify,
or replace any backend code.

## Technologies

- React 18 + TypeScript
- Vite
- Axios
- Plain CSS with CSS Modules (no UI framework)

## Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx                  # Application entry point
    ├── App.tsx                    # Page layout and top-level state
    ├── App.module.css
    ├── components/
    │   ├── Layout/                # Header, Footer
    │   ├── PredictionForm/        # Form + SelectField/NumberField
    │   ├── PredictionResult/      # Result card
    │   ├── ErrorBanner/           # Error messaging
    │   ├── Toast/                 # Success notification
    │   └── LoadingSpinner/
    ├── services/
    │   └── api.ts                 # Axios instance + backend calls
    ├── hooks/
    │   ├── usePrediction.ts       # Predict request lifecycle
    │   └── useBackendHealth.ts    # /health polling for the status pill
    ├── constants/
    │   └── formOptions.ts         # Location + enum options (mirrors backend)
    ├── utils/
    │   ├── validation.ts          # Client-side field validation
    │   └── formatCurrency.ts      # ₹ formatting helpers
    ├── types/
    │   └── index.ts               # Types mirroring the backend schema
    └── styles/
        ├── variables.css          # Design tokens
        └── global.css
```

## Installation

Requires Node.js 18+.

```bash
npm install
```

## Configuring the Backend URL

The backend base URL is read from an environment variable at build
time. Copy the example file and adjust it if your backend runs
somewhere other than `http://127.0.0.1:8000`:

```bash
cp .env.example .env
```

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Running the Application

Start the FastAPI backend first (see the backend's own README), then:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Building for Production

```bash
npm run build
npm run preview
```

## Notes on Backend Integration

- The request body sent to `POST /predict` matches the backend's
  `HouseFeatures` schema exactly: `location`, `area_sqft`,
  `Transaction`, `Furnishing`, `facing`, `Ownership`, `Bathroom`,
  `Balcony`, `car_parking_count`, `current_floor`, `total_floors`.
- Dropdown options (locations, transaction types, furnishing status,
  facing directions, ownership types) mirror `locations.json` and the
  categories the backend's model was trained on. If the backend's
  accepted values ever change, update `src/constants/formOptions.ts`
  to match.
- The header's status pill calls `GET /health` once on load to show
  whether the backend is reachable.
