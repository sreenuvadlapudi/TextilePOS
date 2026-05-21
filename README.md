# Textile Business Web App

This repository is organized as a full-stack textile business website with separate frontend and backend codebases.

## Recommended folder structure

- `frontend/`
  - `public/` - static files, favicon, index.html, etc.
  - `src/`
    - `assets/` - images, fonts, icons
    - `components/` - reusable UI components
    - `features/` - domain-specific feature modules (e.g. products, sales, purchase)
    - `pages/` - top-level page views
    - `layouts/` - page layouts, wrappers, navigation
    - `services/` - API clients, HTTP services
    - `store/` - Redux or global state management
    - `hooks/` - custom React hooks
    - `utils/` - shared utility functions

- `backend/`
  - `app/`
    - `controllers/` - business logic handlers
    - `models/` - database models
    - `routes/` - API route definitions
    - `services/` - backend services, helpers, integrations
    - `middleware/` - request middleware, auth, validation
    - `utils/` - common backend utilities
  - `tests/` - backend tests

- `docs/` - documentation, architecture notes
- `scripts/` - setup, deployment and utility scripts

## Next steps

1. Move existing frontend app into `frontend/`.
2. Move existing backend app into `backend/`.
3. Keep `docs/` and `scripts/` for project-level assets.

