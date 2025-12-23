# Development Guidelines

## Code Standards

### Language
- **All code must be written in English**
- Comments, variable names, function names, and documentation must be in English
- UI text can be in the target language, but code itself must be English

### Code Quality
- **No spaghetti code** - Keep code clean, organized, and maintainable
- **Clean Code principles** - Follow SOLID principles, DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid)
- **Best practices** - Follow React best practices, TypeScript best practices, and modern JavaScript patterns

### State Management
- **Prefer reducers over multiple useState hooks** - When managing complex state with multiple related values, use `useReducer` instead of multiple `useState` calls
- Use `useState` only for simple, independent state values
- Use context/reducer pattern for shared state across components

### Testing
- **Always write tests** - Every feature must have corresponding tests
- Write unit tests for utilities, reducers, and business logic
- Write component tests for React components
- Write E2E tests for critical user flows
- Tests must pass before committing code

### Git Workflow
- **Husky pre-commit hooks** - All tests (unit and E2E) and linting must run automatically before every commit
- The pre-commit hook executes in this order:
  1. Unit tests (`npm run test`)
  2. E2E tests (`npm run test:e2e`)
  3. Linting on staged files (`lint-staged`)
- If any tests fail or linting errors exist, the commit will be blocked
- Fix all issues before committing

### Code Structure
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Use TypeScript types and interfaces properly
- Avoid any type and use proper typing
- Organize imports: external libraries first, then internal modules

### Performance
- Avoid unnecessary re-renders
- Use React.memo, useMemo, and useCallback when appropriate
- Optimize bundle size
- Lazy load components when possible

### Documentation
- Write clear, concise comments for complex logic
- Document function parameters and return types
- Keep README updated with setup and usage instructions

