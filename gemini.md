# Hyrule - Context & Documentation

## Overview
Hyrule is a local-first Salesforce operations platform built as a VS Code extension. It relies heavily on the Salesforce CLI and provides a full browser-based UI for complex admin tasks like Query Building, Data Loading, and Permission Management.

## Architecture
- **VS Code Extension (`extension.js`)**: Uses `child_process.fork()` to spin up a background Node.js process without blocking the main VS Code thread. It opens the user's default browser to `http://localhost:3030`.
- **Backend (`server.js`)**: An Express server running in the background. It executes `sf org list --all --json` to fetch all authenticated orgs, including expired ones.
- **Frontend (`frontend/`)**: A React + Vite application. It builds into the root `public/` directory so the Express server can serve it.
- **Top Bar UI (`OrgSelector.jsx`)**: The primary navigation component. It features a broad dropdown for selecting orgs (which prominently displays `username` over alias). Expired orgs are greyed out and unselectable.
- **Color Framework (`HylianContext.jsx`)**: A React context that manages UI themes and custom Org color mappings.
  - Users can click a gear icon (⚙️) on the left of any valid org to open a native hex color picker modal. The exact hex code is saved and mapped to that org.

## VS Code Integration & Launch
- **Command Palette (`Ctrl+Shift+P`)**: The user can run the `Launch Hyrule` command (registered as `hyrule.launch`).
- **Auto-Open**: Once the command is run, `extension.js` forks the Node process. When `server.js` finishes starting on port `3030`, it sends a standard Node IPC message (`process.send('SERVER_READY')`) back to the Extension Host. The extension then automatically launches the user's default browser to `http://localhost:3030`.

## Dev & Packaging Scripts
We avoid bundling heavy Node.js runtimes. The footprint is extremely small (under 100KB).
- `npm run dev`: Runs `scripts/dev.js` which concurrently launches the Express server and the Vite dev server for seamless development (with `shell: true` to support Windows environments).
- `npm run upgrade`: Runs `scripts/upgrade.js`. Copies all dev code into the `PackagedCopy/` directory, omitting anything listed in `ignore_dnb`.
- `npm run build`: Runs `scripts/build.js`. Syncs to `PackagedCopy/`, runs `vsce package` inside it, and moves the final `.vsix` file to `vsixBuilds/`.

## Theming
Themes are controlled via CSS variables in `themes.css`. Supported themes:
1. Gruvbox (Font: Fira Code)
2. Everforest (Font: Nunito)
3. Catppuccin (Font: Outfit)
4. Nord (Font: Roboto)

*Note: Theme palettes are used for the UI background/foreground styling, but individual Org mappings use literal hex values chosen by the user.*

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
