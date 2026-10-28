# GitHub Copilot Instructions

## Technology stack
- Node.js 18+
- TypeScript 5.x
- SQLite for local persistence in service-level storage
- Jest for unit/integration tests
- Express-compatible service interfaces for API boundaries
- Multi-service repository layout with clear service ownership

## Architecture conventions
- Keep service boundaries explicit: `src/projects`, `src/notifications`, and future shared modules.
- Prefer domain-focused modules and thin API adapters.
- Store persistence logic in service classes, not directly in controllers or route handlers.
- Do not place cross-service logic in the project model.
- Keep contracts between services typed and documented.
- Use dependency injection for database and external clients where practical.

## Security and multi-tenant SaaS rules
- Validate all inputs at API boundaries.
- Enforce authorization and role checks before any project mutation.
- Use `team_id`, `tenant_id`, or equivalent isolation keys to enforce data boundaries.
- Never trust client-side state for permission decisions.
- Treat audit logs and notifications as security-sensitive data.
- Do not log secrets, connection strings, or tokens.
- Prefer explicit error handling over leaking stack traces in production responses.

## Coding standards
- Use TypeScript types for all request/response and model contracts.
- Prefer descriptive names over abbreviations.
- Keep functions small and single-purpose.
- Avoid hidden side effects inside model constructors or setters.
- Document public behavior for service APIs using comments when needed.
- Keep tests deterministic and isolated from environment state.

## Change management
- Before implementation, assess impact on APIs, storage, events, auth, and audit behavior.
- Record any change request impact in a short impact-analysis document.
- Keep pull requests small, reviewable, and scoped to one concern.

## Pull request expectations
- Include tests for core behaviors and failure paths.
- Validate security-sensitive flows before merging.
- Explain architectural decisions in code comments or design notes when pattern changes are introduced.
