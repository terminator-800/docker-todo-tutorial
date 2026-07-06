# Todo App — Backend

A minimal Node.js backend for the Docker Todo App. No frameworks, no external
database — just Node's built-in `http` module and a plain `.txt` file acting
as the "database."

## Tech Stack

- **Node.js** (built-in `http`, `fs`, and `path` modules only)
- **dotenv** — loads configuration from a `.env` file
- **Flat-file storage** — todos are persisted as JSON inside `todos.txt`

## Project Structure

```
backend/
├── .env                # Environment config (PORT, DB_FILE) — not committed
├── .gitignore
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json
├── node_modules/
└── src/
    ├── server.js        # Main server file
    └── todos.txt        # Auto-generated "database" file (JSON array)
```

> **Note:** `.env` lives one level above `src/`, next to `package.json`.
> `server.js` is configured to look for it there:
> ```js
> require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
> ```

## Environment Variables

Create a `.env` file in the `backend/` root with:

```dotenv
PORT=3000
DB_FILE=todos.txt
```

| Variable  | Description                                   | Default      |
|-----------|------------------------------------------------|--------------|
| `PORT`    | Port the server listens on                     | `3000`       |
| `DB_FILE` | Filename for the flat-file todo database       | `todos.txt`  |

## Installation

```bash
cd backend
npm install
```

## Running Locally

```bash
cd src
node server.js
```

You should see:
```
Running on 3000
```

The server will auto-create `todos.txt` (inside `src/`) on first run if it
doesn't already exist, starting as an empty array `[]`.

## API Reference

Base URL: `http://localhost:3000`

### `GET /todos`
Returns all todos.

**Response** `200 OK`
```json
[
  { "id": 1783328116951, "text": "yawa", "completed": false }
]
```

### `POST /todos`
Creates a new todo.

**Request body**
```json
{ "text": "Buy groceries" }
```

**Response** `201 Created`
```json
{ "id": 1783328116951, "text": "Buy groceries", "completed": false }
```

**Response** `400 Bad Request` — if `text` is missing or empty.

### `PUT /todos/:id`
Toggles the `completed` state of a todo by its `id`.

**Response** `200 OK` — returns the updated todo.
**Response** `404 Not Found` — if no todo matches the given `id`.

### `DELETE /todos/:id`
Deletes a todo by its `id`.

**Response** `204 No Content`

## CORS

CORS is enabled for all origins (`Access-Control-Allow-Origin: *`) so the
frontend can be served from a different port/domain during development.

## Docker

Build and run with Docker (variables passed in at runtime, not baked into
the image):

```bash
docker build -t todo-backend .
docker run -p 3000:3000 --env-file .env todo-backend
```

## Notes / Gotchas

- The `.txt` "database" is just a JSON array serialized to disk — it is
  **not** a real database, has no locking, and isn't safe for concurrent
  writes at scale. It's intentionally simple for learning/demo purposes.
- `todos.txt` is created relative to `server.js`'s location (`src/`), not the
  `backend/` root.
- `.env` and `node_modules/` are intentionally excluded from Git and Docker
  builds (see `.gitignore` / `.dockerignore`).