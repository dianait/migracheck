# Migracheck Agent Guidelines

## Core Principles
1. **English Only**: All code, comments, and commit messages must be in English.
2. **Clean Code**:
    - No spaghetti code.
    - Keep functions small and focused.
    - DRY (Don't Repeat Yourself).
    - Use clear and descriptive variable/function names.
3. **State Management**:
    - Avoid `useEffect` abuse.
    - Prefer `useReducer` for complex state or `context` for global state.
    - Derived state should be calculated during render, not synced in `useEffect`.
4. **Testing**:
    - **Zero Tolerance**: Features are not done until tested.
    - Unit tests with Vitest + React Testing Library.
    - E2E tests with Playwright for user flows.
    - If a test fails 3 times, reassess the approach, do not blindly retry.
5. **Performance**:
    - Monitor bundle size.
    - Use `React.memo` and `useCallback` judiciously where it makes sense (not prematurely).

## Architecture
- **Tech Stack**: React, TypeScript, TailwindCSS, Vite.
- **Directory Structure**:
    - `src/components`: UI Components.
    - `src/context`: Global state (Context + Reducer).
    - `src/hooks`: Custom hooks.
    - `src/utils`: Helper functions.
    - `src/types`: TypeScript definitions.

## Workflow
- **Commit**: Ensure specific message format? (Standard Conventional Commits recommended: `feat:`, `fix:`, `chore:`).
- **Husky**: Pre-commit hooks must pass (linting, testing).
