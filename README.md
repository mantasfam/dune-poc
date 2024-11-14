# Chart API Project

## Overview

This project provides a backend API for generating chart data and serving it via configurable endpoints. You can also test the endpoints in the frontend running on `localhost:3001/`.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js installed on your system
- npm installed (comes with Node.js)

---

### Installation

1. Clone the repository and navigate into the project directory.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file based on `.env.dist`:

   ```bash
   cp .env.dist .env
   ```

4. Set your `DUNE_API_KEY` in the `.env` file.

5. (Optional) If needed, add new configurations in `chart-configurations.ts`.

---

### Endpoints

The API provides the following endpoints:

#### 1. Health Check

**GET** `/ping`

Returns a status check for the API.

#### 2. Get Chart Data for Vega-Lite

**GET** `/chart/:chartId`

Fetch chart data for a specific `chartId`. This endpoint is designed to serve data in a format suitable for Vega-Lite visualization. It uses the `getChartMiddleware`.

#### 3. Get Chart.js compatible Data

**GET** `/chartJs/:chartId`

Fetch chart data in a format compatible with Chart.js. This endpoint uses the `getChartJsMiddleware`.

#### 4. Not Found

Handles all unmatched routes.

---

### Testing the Frontend

To test the API on the frontend, navigate to:

[http://localhost:3001/](http://localhost:3001/)

---

## Running the Application

The application listens on port **3001**. To start the server, use:

```bash
ts-node src/server/server.ts
```
