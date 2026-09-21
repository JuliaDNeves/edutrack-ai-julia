# Design

## Context

EduTrack AI uses XanoScript for backend schema definitions. Database tables are located in the `tables/` directory.

## Goals / Non-Goals

**Goals:**
- Define the `subjects` table schema in XanoScript (`tables/subjects.xs`).
- Specify fields: `id` (auto-increment primary key), `name` (text), `teacher` (text), `hours` (integer), and `user_id` (foreign key to Xano user authentication table).

**Non-Goals:**
- Creating CRUD API endpoints or functions for subjects at this stage.
- Creating tests or frontend components (out of scope per prompt and task scope rules in `AGENTS.md`).

## Decisions

### Decision 1: XanoScript File Location
Place the table definition in `tables/subjects.xs` following standard Xano project structure.

### Decision 2: Field Types and Naming
- `id`: Auto-increment integer primary key.
- `name`: Text field for subject title.
- `teacher`: Text field for instructor name.
- `hours`: Integer field for class hours.
- `user_id`: Reference to Xano user authentication table (`user`/`users`).

## Risks / Trade-offs

- [Risk] Missing foreign key table reference if authentication table name differs (`user` vs `users`). → Mitigation: Document reference to standard Xano auth user table.
