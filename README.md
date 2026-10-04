# aibot_server

Express-based proxy server that forwards chat requests to an Anthropic-compatible API.

## Requirements

- Node.js

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your values:

- `ANTHROPIC_BASE_URL` — base URL of the Anthropic-compatible API (required)
- `ANTHROPIC_AUTH_TOKEN` — bearer token for the Authorization header (required)
- `ANTHROPIC_MODEL` — default model used if a request doesn't specify one (optional)
- `PORT` — port to listen on (default `3000`)
- `URL` — base URL used in the startup log / `HTTP-Referer` header (default `http://localhost`)

## Running locally

```bash
npm run dev   # nodemon, auto-reload
# or
npm start     # plain node
```

The server starts on `http://localhost:$PORT` (default `http://localhost:3000`).

## API

- `GET /` — health check, returns `{ "status": "ok", "message": "Server is running" }`
- `POST /api/chat` — body `{ "messages": [], "model"?: string }`, returns `{ "reply": string }`

## Deployment

Deployed to Vercel via `vercel.json`. On Vercel, `NODE_ENV=production` is set, which disables the local `app.listen()` call since Vercel invokes the exported Express app directly.
