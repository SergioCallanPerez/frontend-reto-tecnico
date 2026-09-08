# Frontend

UI básica en React Vite para consumir la API Go del challenge.

## Correr

```
npm install
npm run dev
```

Abre en `http://localhost:5173`. Por defecto apunta a `http://localhost:8080`.

Necesita un `.env`con `VITE_API_TOKEN` — un JWT generado con `go run ./cmd/mint-token` en `api-go`, usando el mismo `JWT_SECRET` que la API.
