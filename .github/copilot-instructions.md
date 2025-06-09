# GitHub Copilot Project Instructions

## Project Overview

This project is a full-stack web application with a React/TypeScript frontend and a FastAPI/Python backend. The repository is organized into two main directories:

- `client/`: Contains the frontend codebase, built with React, TypeScript, and Mantine UI components. Uses Vite for development and build tooling.
- `server/`: Contains the backend codebase, built with FastAPI (Python). Uses Poetry for dependency management.

## Frontend Details
- Located in the `client/` directory.
- Built with React and TypeScript.
- Uses Mantine as the primary UI component library.
- Entry point: `src/main.tsx`.
- Main app component: `src/components/App.tsx`.
- Styling is managed with CSS files in `public/` and `src/components/`.
- Data types are defined in `src/types/`.
- Data examples are in `src/data/`.
- Uses Vite for development and build (`vite.config.ts`).

## Backend Details
- Located in the `server/` directory.
- Built with FastAPI (Python 3).
- Main entry point: `app/main.py`.
- Uses Poetry for dependency management (`pyproject.toml`, `poetry.lock`).
- Tests are in `server/app/tests/`.

## General Instructions for Copilot and Agentic Coding AI
- **Do not mix frontend and backend code.**
  - All React/TypeScript code belongs in `client/`.
  - All FastAPI/Python code belongs in `server/`.
- **Frontend:** Use React, TypeScript, and Mantine for all UI components and logic.
- **Backend:** Use FastAPI for API endpoints and Python for all backend logic.
- **Respect the existing project structure.**
- **When adding dependencies:**
  - Use `npm` or `yarn` in `client/` for frontend packages.
  - Use Poetry in `server/` for backend packages.
- **When creating new features:**
  - Place frontend features/components in `client/src/components/`.
  - Place backend endpoints or logic in `server/app/`.
- **Keep code and configuration files in their respective directories.**
- **Follow best practices for both React/TypeScript and FastAPI/Python.**

## Example Directory Structure
```
client/
  src/
    components/
    data/
    types/
  public/
  ...
server/
  app/
  tests/
  ...
```

## Summary
- **Frontend:** React + TypeScript + Mantine (in `client/`)
- **Backend:** FastAPI + Python (in `server/`)
- **Keep codebases separate and follow the conventions above.**
