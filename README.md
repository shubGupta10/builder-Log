# BuilderLog

> Proof-of-work for developers. Turn your GitHub activity into a timeline, insights, and a living resume — based on what you actually build.

---

## What is BuilderLog?

BuilderLog connects to your GitHub account (read-only) and transforms raw activity into a structured, meaningful view of your work. No fluff, no vanity metrics — just a honest record of what you ship.

---

## Features

### 📅 Timeline
A chronological log of your development activity:
- Commits and pull requests
- Grouped into real coding sessions
- Organized by day and repository
- Distraction-free and readable

### 📊 Insights
Understand your work patterns:
- Consistency and active days
- Current and past streaks
- Sessions over time
- Activity mix (commits vs PRs)
- Focus distribution across projects
- Momentum trends

### 🗂️ Projects
See what you're actually working on:
- Active, stalled, and shipped projects
- Session count per repo
- Last activity timestamp
- No task management, no planning — just context

### 🌐 Public Profile *(opt-in)*
A shareable, read-only page that acts like a living resume:
- Profile summary
- Key projects
- Recent activity
- Consistency strip
- Real data backed by GitHub

You control whether your profile is public or private.

### 🌟 Contributions
Showcase your development activity and open-source impact:
- Split into "Your Projects" and "Open Source" contributions
- Visible on your public profile
- Filter by date range
- Summary statistics for PRs and Commits
- Activity breakdown per repository

### ⚙️ Settings
Control your integration and preferences:
- Manage your GitHub connection and manually resync data
- Toggle your Public Profile visibility
- Disconnect your account at any time

---

## Tech Stack

### Backend — `builder-log-server`
| Tech | Role |
|------|------|
| Node.js + Express | API server |
| TypeScript | Type safety |
| MongoDB | Data persistence |
| GitHub REST + GraphQL APIs | Data source |
| JWT (cookie-based) | Authentication |
| Redis *(optional)* | Caching |

### Frontend — `builder-log-client`
| Tech | Role |
|------|------|
| Next.js (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Server + Client Components | Rendering strategy |
| SWR / `apiFetch` | API layer |

---

## Project Structure

```text
builder-log/
├── builder-log-server/   # Node.js backend
└── builder-log-client/   # Next.js frontend
```

---

## Authentication & Privacy

- GitHub OAuth with **read-only scopes** — BuilderLog never writes to GitHub
- Access tokens stored securely
- Public profile is **opt-in**
- You can disconnect GitHub at any time

---

## Current Status

BuilderLog is under **active development**.

**Done:**
- [x] Auth
- [x] Timeline
- [x] Insights
- [x] Projects
- [x] Public profile
- [x] Contributions page
- [x] Settings

**Coming next:**
- [ ] Weekly review mode
- [ ] Better caching & performance
- [ ] UI/UX polish
- [ ] Docs & contributor guide

---

## Running Locally

> Full docs coming soon. High-level steps:

1. Clone the repo
   ```bash
   git clone https://github.com/your-username/builder-log.git
   cd builder-log
   ```

2. Set up environment variables for GitHub OAuth in both `builder-log-server` and `builder-log-client`

3. Start the backend
   ```bash
   cd builder-log-server
   npm install
   npm run dev
   ```

4. Start the frontend
   ```bash
   cd builder-log-client
   npm install
   npm run dev
   ```

5. Connect your GitHub account and explore your data

---

## Contributing

BuilderLog is open source and builder-focused. Feel free to open issues, suggest ideas, or submit PRs.

---

## License

[MIT](./LICENSE)