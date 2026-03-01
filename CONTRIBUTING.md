# Contributing to BuilderLog

Thank you for your interest in contributing to BuilderLog! This guide will help you get up and running locally and outline the process for submitting contributions.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Running the App](#running-the-app)
- [Submitting a PR](#submitting-a-pr)
- [Code Style](#code-style)

---

## Project Structure

```
builder-proof/
├── builder-log-client/   # Next.js 14 frontend
└── builder-log-server/   # Node.js / Express backend (TypeScript)
```

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18+ |
| npm | 9+ |
| MongoDB | Local instance or Atlas URI |
| Upstash Redis | Free account at [upstash.com](https://upstash.com) |
| GitHub OAuth App | See setup below |

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/shubGupta10/builder-log.git
cd builder-log
```

### 2. Create a GitHub OAuth App

Go to **GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App** and fill in:

| Field | Value |
|---|---|
| Homepage URL | `http://localhost:3000` |
| Authorization callback URL | `http://localhost:5000/auth/github/callback` |

Copy the **Client ID** and **Client Secret**.

### 3. Configure the server

```bash
cd builder-log-server
cp .env.example .env
```

Open `.env` and fill in all values. For secrets, use the generation commands shown in the comments.

### 4. Configure the client

```bash
cd ../builder-log-client
cp .env.example .env
```

The default `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000` works for local development.

### 5. Install dependencies

```bash
# In builder-log-server
cd builder-log-server && npm install

# In builder-log-client
cd ../builder-log-client && npm install
```

---

## Running the App

Open two terminal windows:

**Terminal 1 — Backend**
```bash
cd builder-log-server
npm run dev
```
Server runs at `http://localhost:5000`

**Terminal 2 — Frontend**
```bash
cd builder-log-client
npm run dev
```
App runs at `http://localhost:3000`

---

## Submitting a PR

1. **Fork** the repo and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes.** Keep commits small and focused.

3. **Test your changes** locally before opening a PR.

4. **Open a Pull Request** against the `main` branch with:
   - A clear description of what changed and why
   - Screenshots or a short video if there are UI changes
   - Any relevant issue numbers (e.g. `Closes #42`)

5. A maintainer will review and merge your PR. We may ask for small revisions.

---

## Code Style

- **TypeScript** is used throughout both the client and server — avoid `any` where possible.
- **Server**: Express route handlers are wrapped with `errorWrapper` — follow this pattern for new routes.
- **Client**: Components live in `app/modules/<feature>/` — keep each component focused on a single responsibility.
- **No console.log** in committed code — use proper error handling patterns.
- **Formatting** — the project uses default TypeScript/ESLint settings. Run `npm run lint` before submitting.

---

If you have questions, feel free to open a [GitHub Discussion](https://github.com/shubGupta10/builder-log/discussions) or an issue. We're happy to help!
