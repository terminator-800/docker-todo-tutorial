# Todo App — Frontend

A plain HTML/CSS/JavaScript frontend for the Docker Todo App. No frameworks,
no build tools, no bundler — just a static page that talks to the backend
API using `fetch`.

## Tech Stack

- **HTML5 / CSS3** — layout and styling, no external CSS frameworks
- **Vanilla JavaScript** — no React, Vue, or jQuery
- **`fetch` API** — communicates with the backend over HTTP

## Project Structure

```
frontend/
├── .gitignore
├── .dockerignore
├── Dockerfile
└── static/
    ├── index.html      # The entire app: markup, styles, and logic
    └── env.js          # Small config file holding the backend API URL
```

## Configuration — `env.js`

Browsers cannot read `.env` files directly (that's a server-side/build-tool
concept). Instead, this project uses a small `env.js` file that sets a
global variable, loaded via a `<script>` tag before the main app script:

**`static/env.js`**
```javascript
window.API_URL = "http://localhost:3000";
```

**`static/index.html`** (relevant excerpt)
```html
<script src="env.js"></script>
<script>
  const API_URL = window.API_URL || "http://localhost:3000";
  ...
</script>
```

If you need to point the frontend at a different backend (e.g. a deployed
API instead of localhost), just edit the URL in `env.js` — no rebuild step
required since there's no bundler involved.

> `env.js` **must** sit in the same folder as `index.html` (`static/`) since
> the script tag references it with a relative path.

## Running Locally

From the `frontend/static` folder, serve it with any static file server.
Using Python (built into most systems):

```bash
cd frontend/static
python -m http.server 5500
```

Then open your browser to:
```
http://localhost:5500
```

> Avoid port `3000` for the frontend — that's reserved for the backend
> server. Any other free port (`5500`, `8080`, `5050`, etc.) works fine.

**The backend must also be running** at the same time (see the backend
README) for the app to actually load, add, complete, or delete tasks —
this frontend has no local storage of its own; every action is a live API
call.

## App Behavior

- **On page load** — fetches all existing todos from `GET /todos` and
  renders them.
- **Add task** — sends `POST /todos` with the entered text; appends the
  new todo returned by the server to the list.
- **Complete/uncomplete** — sends `PUT /todos/:id` to toggle state; applies
  a strikethrough style via the `.completed` CSS class.
- **Delete** — sends `DELETE /todos/:id` and removes the item from the DOM.
- **Error handling** — if the backend is unreachable or a request fails,
  a short red error message appears below the input field.

## Docker

```dockerfile
FROM nginx:alpine
COPY static /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t todo-frontend .
docker run -p 8080:80 todo-frontend
```

Then visit `http://localhost:8080`. Note: if you containerize the backend
too and it's not on `localhost:3000` from the container's perspective,
you'll need to update `env.js` accordingly (e.g. point it at the backend
container's service name if using `docker-compose`).

## Notes / Gotchas

- No `.env` file is used on the frontend — `env.js` fills that role since
  browsers can't read `.env` directly.
- This is a static, single-page app with no routing, no state management
  library, and no persistence beyond what the backend provides.