# Taste

## Workflow & verification

- Expects write/mutation flows to be verified end-to-end — actually submitting (e.g. saving an edit) and confirming persistence — not just that the UI renders or a dialog opens. Follows up ("Have you test update role?") when verification was superficial. Confidence: 0.6

## Code organization

- Prefers feature-based folder structure: co-locates a feature's related code under `src/features/<feature>/` (split into `components/`, `hooks/`, `server/`, `validators/`) instead of loose modules in `src/lib`, keeping `app/` route/page files as thin re-exports into the feature. Confidence: 0.6

## Code quality & scope

- Wants production-grade implementations, not UI demos: pushes back on in-memory/seed state and client-only checks, expecting real database persistence and server-side authorization (permissions re-checked in API routes, not just hidden buttons). Confidence: 0.55
