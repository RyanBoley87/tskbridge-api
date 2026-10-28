# TaskBridge API

A multi-service API for project coordination, notifications, and audit workflows.

## Tech stack
- Node.js 18+
- TypeScript 5.x
- SQLite for lightweight persistence in service-local storage
- Jest for automated tests
- Multi-service directory layout with `src/projects` and `src/notifications`

## Repository layout
```text
.
├── .github/
│   └── copilot-instructions.md
├── docs/
│   └── copilot-prompts.md
├── src/
│   ├── projects/
│   │   ├── project.model.ts
│   │   ├── project.service.ts
│   │   └── index.ts
│   └── notifications/
│       └── notification.service.ts
├── tests/
│   └── project.service.test.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Project Service status
The `src/projects` implementation is intentionally retained as a fast, unreviewed contractor-style AI generation to simulate inherited code. It includes the required CRUD behaviors with a database-backed service.

## Planned service expansion
The `src/notifications` service is reserved for future notification and audit workflows, including milestone change events and append-only audit history.

## Development
```bash
npm install
npm test
npm run build
```

## Security and review expectations
- Validate all input at service boundaries.
- Enforce team or tenant authorization before mutation.
- Treat any audit record or notification payload as sensitive data.
- Review and document any change request before code changes are made.
