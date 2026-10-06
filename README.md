# Blockchain Voting

A prototype voting application with a web frontend, an Express API, and an AI voting assistant.

## Run locally

Start each service in a separate terminal from the repository root:

```powershell
cd backend
npm start
```

```powershell
cd frontend
npm start
```

```powershell
cd ai-backend
npm start
```

The services use these local ports:

- Frontend: http://localhost:3000
- Voting API and EJS-rendered app: http://localhost:4000
- AI assistant API: http://localhost:5000

For the complete voting flow, open http://localhost:4000. The static frontend on port 3000 does not proxy API requests.

The AI backend requires `OPENROUTER_API_KEY` in `ai-backend/.env`. Keep this file local; do not commit or share the key.

## Demo voter

- Voter ID: `voter1`
- Password: `password123`

The backend seeds demo election data and this voter on startup when they do not already exist.
