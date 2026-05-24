# Hyrule - Context & Documentation

## Overview
Hyrule is a local-first Salesforce operations platform built as a VS Code extension. It relies heavily on the Salesforce CLI and provides a full browser-based UI for complex admin tasks like Query Building, Data Loading, and Permission Management.

## Architecture
- **VS Code Extension (`extension.js`)**: Uses `child_process.fork()` to spin up a background Node.js process without blocking the main VS Code thread. It opens the user's default browser to `http://localhost:3030`.
- **Backend (`server.js`)**: An Express server running in the background. It executes `sf` CLI commands and serves the built frontend files.
- **Frontend (`frontend/`)**: A React + Vite application. It builds into the root `public/` directory so the Express server can host it.
- **Color Framework (`HylianContext.jsx`)**: A React context that manages themes and Org color mappings. It updates CSS variables dynamically on the `<body>` tag.

## Dev & Packaging Scripts
We avoid bundling heavy Node.js runtimes. The footprint is extremely small (under 100KB).
- `npm run dev`: Runs `scripts/dev.js` which concurrently launches the Express server and the Vite dev server for seamless development.
- `npm run upgrade`: Runs `scripts/upgrade.js`. Copies all dev code into the `PackagedCopy/` directory, omitting anything listed in `ignore_dnb`.
- `npm run build`: Runs `scripts/build.js`. Syncs to `PackagedCopy/`, runs `vsce package` inside it, and moves the final `.vsix` file to `vsixBuilds/`.

## Theming
Themes are controlled via CSS variables in `themes.css`. Supported themes:
1. Gruvbox (Font: Fira Code)
2. Everforest (Font: Nunito)
3. Catppuccin (Font: Outfit)
4. Nord (Font: Roboto)

Each theme provides a palette (`--palette-red`, `--palette-green`, etc.) which users can map to specific Salesforce orgs to visually distinguish them across the app.

## Project Structure
```text
c:\ExtensionBuilds\Hyrule\
├── frontend/             # React App
├── scripts/              # Build & Dev Scripts
├── PackagedCopy/         # Staging ground for vsix build (Git Ignored)
├── vsixBuilds/           # VSIX output directory (Git Ignored)
├── public/               # Compiled React assets
├── extension.js          # VS Code Entry Point
├── server.js             # Express API
├── package.json          
├── ignore_dnb            # Exclusion rules for PackagedCopy
└── gemini.md             # This file (Context Memory)
```
