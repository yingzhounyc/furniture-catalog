# Furniture Catalog (React + Vite + TypeScript)

A lightweight app to browse and search furniture items like sofas, coffee tables and side tables. Includes text search and filters for manufacturer and color.

## Run locally

```bash
cd furniture-catalog
npm install
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

## Project structure

- `src/types.ts`: TypeScript models and helpers
- `src/data.ts`: Sample dataset and filter helpers
- `src/App.tsx`: Search UI and list rendering
- `src/App.css`: Minimal styling

## Next steps

- Add more filters (category, price range, materials)
- Persist filters to URL query params
- Connect to a backend or CMS for real data
