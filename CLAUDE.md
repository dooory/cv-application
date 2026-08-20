# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a working schema-driven CV builder: a form (left/top) that edits CV data, and a live preview (right/bottom) that renders only the saved, non-empty parts of it. The original Vite scaffold markup/counter has been fully replaced. There are no unresolved asset imports.

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

Vite + React 19 SPA, JavaScript (JSX) only, no TypeScript, no router, no state management library. `jsconfig.json` enables `checkJs` so editors still type-check via JSDoc/inference.

- `index.html` — Vite entry HTML; mounts to `#root`.
- `src/main.jsx` — creates the React root and renders `<App />` inside `<StrictMode>`.
- `src/App.jsx` — top-level component. Owns the two top-level pieces of state: `cv` (live, editable data) and `savedCV` (last-saved snapshot, what `Preview` renders). Defines the mutation callbacks (`addSubsection`, `saveSection`, `updateFormField`, `deleteSubsection`) and passes them down as props; state is not otherwise lifted or shared via context.
- `src/data/formSchema.js` — the single source of truth for CV structure: an array of section definitions (`id`, `legend`, optional `repeatable`, and a `template` array of field definitions — `id`, `label`, `type`, `placeholder`, `required`, `autoComplete`). Adding/editing a CV field means editing this file; `Form` and the CV data shape both derive from it.
- `src/utils.js` — pure helpers that build CV data from the schema (`createCVData`, `createSection`, `createSubsection`, `createField`) and query it (`fieldHasValue`, `subsectionHasValue`, `sectionHasValue`), plus the generic `updateCVSection(setter, sectionId, updater)` used by every mutation in `App.jsx` to immutably update one section's slice of state.
- `src/components/Form.jsx` — the editable builder. `Form` maps `formSchema` to one `FormSection` per section; each `FormSection` is its own `<form>` with local `editing` state, toggled between an "Edit" and "Save" (`InteractButton`) — saving calls `formRef.current.reportValidity()` first, so required-field validation gates the save. `repeatable` sections render an "Add" button that appends a subsection (`FormSubsection`), and any subsection past the first can be removed. `Input`/`FormInput` render the actual field, switching between `<input>` and `<textarea>` based on `type`.
- `src/components/Preview.jsx` — read-only rendering of `savedCV`. Sections/subsections/fields that have no value are filtered out (`sectionHasValue`/`subsectionHasValue`/`fieldHasValue` from `utils.js`), so the preview only ever shows what's actually been filled in and saved.
- `src/styles/` — plain CSS per component (`App.css`, `Form.css`, `Preview.css`) plus `index.css` for global/root styles. No CSS-in-JS or CSS modules.
- `vite.config.js` — just the `@vitejs/plugin-react` plugin, no aliases or custom config.
- `eslint.config.js` — flat ESLint config: `@eslint/js` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite variant), browser globals, `dist/` ignored.

### Data flow / conventions worth knowing before editing

- CV data shape mirrors the schema: `{ [sectionId]: { id, legend, subsections: [ { [fieldId]: { ...fieldSchema, value } } ] } }`. `cv` and `savedCV` are both this shape; `savedCV` is only ever replaced with a `structuredClone` of a section from `cv`, never mutated in place.
- Adding a new section or field is a schema-only change in `formSchema.js` — no changes needed in `Form.jsx`/`Preview.jsx`/`utils.js` unless the new field needs a new `type` (see `Input` in `Form.jsx`, which currently branches only on `"textarea"` vs. everything else being passed straight to `<input type>`).
- Per-section edit/save state lives inside `FormSection` (`useState`), not in `App.jsx` — `App.jsx` only tracks the data itself, not which sections are mid-edit.
