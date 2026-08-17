# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repo is currently the unmodified Vite + React scaffold (see git log: "Initial commit", "scaffold project"). `src/App.jsx` is still the default Vite starter markup/counter, not CV-application-specific content yet, and it references `./assets/react.svg`, `./assets/vite.svg`, and `./assets/hero.png`, none of which exist in `src/` — expect a broken image/dev-server error until those assets are added or the imports are replaced.

## Commands

Package manager is **bun** (`bun.lock` is the lockfile — use `bun`, not `npm`/`yarn`, to keep the lockfile consistent).

- `bun install` — install dependencies
- `bun run dev` — start the Vite dev server with HMR
- `bun run build` — production build (output to `dist/`)
- `bun run preview` — preview the production build locally
- `bun run lint` — run ESLint over the whole project

There is no test setup in this repo yet (no test runner in `package.json`).

A user-level `/commit` Claude Code command (`~/.claude/commands/commit.md`) generates a Conventional Commits-formatted message for the currently staged diff.

## Architecture

Minimal Vite + React 19 SPA, JavaScript (JSX) only, no TypeScript, no router, no state management library:

- `index.html` — Vite entry HTML; mounts to `#root`.
- `src/main.jsx` — creates the React root and renders `<App />` inside `<StrictMode>`.
- `src/App.jsx` — single top-level component; all UI currently lives here (no component directory structure exists yet).
- `src/App.css` / `src/index.css` — plain CSS, no CSS-in-JS or CSS modules.
- `vite.config.js` — just the `@vitejs/plugin-react` plugin, no aliases or custom config.
- `eslint.config.js` — flat ESLint config: `@eslint/js` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite variant), browser globals, `dist/` ignored.

Since the app is a single-file scaffold, expect that adding real CV-application features (sections, forms, data model) will involve introducing a component structure that doesn't exist yet — check with the user on how they want components/state organized before assuming a convention.
