# 🗺️ Development Roadmap

<details open>
<summary><strong>Project Analysis & Quality Standards</strong></summary>

### 🎯 Refactoring Focus Areas

1. Identify all technical issues and bugs in the codebase
2. Refactor the code to fix these issues while maintaining feature parity
3. Document your findings and the changes you made

- **React Patterns**: Review component structure and React best practices
- **Performance**: Identify optimization opportunities and potential bottlenecks
- **State Management**: Evaluate how the state is managed and passed through the application
- **Type Safety**: Review TypeScript usage and type definitions
- **Error Handling**: Assess how errors are handled throughout the application
- **Code Architecture**: Evaluate component structure, data flow, and code organization
- **Testing**: Consider adding tests for critical functionality

</details>

<details open>
<summary><strong>View Implementation Roadmap</strong></summary>

### ✅ Phase 1: Environment & Tooling

- [x] Repository initialization and dependency audit.
- [x] Initial bug discovery and technical debt assessment.
- [x] Dependency minor upgrades.
- [x] Setup ESLint, Prettier.
- [x] Configure `vite.config.ts` alias and plugins.
- [x] Fix Type errors.
- [x] Fix Build errors.
- [x] Run Prettier (Format code).
- [x] Run ESLint (Fix errors).

### 🚧 Phase 2: Core Refactoring

**Critical Fixes & Cleanup:**
- [x] Fix Redux `initialHook` error.
- [x] Implement `ErrorBoundary` (currently unused).
- [x] Remove redundant `DashboardPage` wrapper (simplify to `DashboardView`).

**Product Tour Modernization:**
- [x] Refactor "ProductTour" steps logic, part 1.
- [x] Separate logic from view.
- [x] Fix memory leak in `ProductTour` resize listener (missing cleanup).
- [x] Replace `setInterval` polling with `ResizeObserver`.

### 🎨 Phase 3: UI/UX & Architecture Polish

**@mui:**
- [x] RWD fix.

  **Code Quality & Logic:** 
- [~] Dead Code Elimination: Verify and remove unused files, functions, and variables.
- [~] Logic Separation: Extract business logic into custom hooks (e.g., `useTour`, `useUserActions`).
- [~] Performance Audit: Optimize re-renders (verify `useCallback`, `useMemo` usage).

### 🧪 Phase 4: Quality Assurance & Testing

- [ ] Unit Tests: Setup Vitest/Jest and write tests for utilities/hooks.
- [ ] E2E Tests: Setup Cypress/Playwright for critical user flows.
- [ ] DevTools Check: Verify React DevTools & Redux DevTools integration (no unnecessary updates).
- [ ] Cross-Device: Perform mobile emulation and Chrome DevTools audits.

### 🚀 Phase 5: Production Readiness

- [ ] Clean up: Remove all development `console.log` statements.
- [ ] Build: Final bundle optimization and dependency check.
- [ ] Docs: Final documentation update and handover notes.

### Phase X: Interface Improvements

- [ ] UI Fixes: Repair broken actions (Notification Bell, Avatar menu, User CRUD buttons).
- [ ] Navigation: Implement active/hover states for Sidebar links.
- [ ] Responsiveness: Fix layout overflows and check Mobile view.
- [ ] Feedback: Replace `console.log` placeholders with meaningful UI notifications (Toasts/Snackbars).

</details>
