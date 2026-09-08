# Frontend

UI sencilla en React Vite para consumir las apis del backend.

## Cómo Correr

```
npm install
npm run dev
```

Abre en `http://localhost:5173`. Por defecto apunta al backend en `http://localhost:8080`.

Necesita un `.env` (ejemplo en `.env.example`) con `VITE_API_TOKEN`. Ese valor sale de correr `go run ./cmd/mint-token` en `api-go`, el token que imprime se utiliza como `VITE_API_TOKEN` valor.

Sitio en vivo: https://interseguro-reto-tecnico-2.web.app
