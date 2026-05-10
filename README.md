# FileTree Explorer

An application to visualize the directory and file structure from an uploaded JSON, written in React.

## Getting Started

```bash
npm install
npm run dev
```

## Architectural Decisions

- **Framework and Tools**: Used React 19.2, TypeScript, and Vite for the fastest build times and HMR. Leveraged the latest version of Tailwind CSS (v4) for styling, following the request for a minimalist and clean design.
- **Routing**: Used `react-router-dom` v6. The `/` route handles file uploading, while the `/tree` route features a split layout with a Sidebar for the tree structure and main content displaying details (`/tree/:nodePath`).
- **State Management**: Used a simple React Context for the tree state (`TreeContext`), preventing "prop drilling".
- **Data Persistence**: The uploaded JSON object is saved in `localStorage`. This solves the issue of page refreshes on file details (e.g., at the path `/tree/src%2Fcomponents`), ensuring the tree state is not lost after a reload.
- **Search**: The search state is kept in the URL parameters (`?q=...`), making the search results fully resistant to page refreshes and allowing for link sharing if the tree file is properly initialized.

## What Could Be Done With More Time

- **List Virtualization**: Rendering a very deep and wide file tree with thousands of elements can negatively impact performance due to an excess of rendered DOM elements. Using `react-window` or `react-virtuoso` would significantly improve performance for extensive structures.
- **Unit Testing**: Adding a testing environment (e.g., Vitest + React Testing Library) to cover the logic in `treeUtils.ts` (e.g., correctly calculating file sizes) and the proper rendering of core components.
- **Large JSON File Management**: Adding a Web Worker to parse giant JSON files (e.g., +50 MB) to avoid blocking the main browser thread while reading and mapping them into an object structure.
- **Better Validation**: Using a library like `Zod` for thorough structure and consistency checking of the uploaded JSON object.

## Known Limitations

- Dependency on file size in `localStorage` (maximum around 5MB) due to browser limits. For extremely huge JSON structures (beyond standard needs), `localStorage` persistence could fail, throwing an exception (e.g., `QuotaExceededError`). In such cases, IndexedDB should be considered.
- Search is implemented synchronously for small/medium JSON sizes, which will be very fast, but is not optimized for millions of records.
