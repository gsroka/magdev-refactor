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

<details>
<summary><strong>✅ Completed: Phase 1 (Environment)</strong></summary>

- [x] Repository initialization and dependency audit.
- [x] Initial bug discovery and technical debt assessment.
- [x] Dependency minor upgrades.
- [x] Setup ESLint, Prettier.
- [x] Configure `vite.config.ts` alias and plugins.
- [x] Fix Type errors.
- [x] Fix Build errors.
- [x] Run Prettier (Format code).
- [x] Run ESLint (Fix errors).
</details>

<details open>
<summary><strong>🚀 Active Development Roadmap</strong></summary>

### 🔥 Priority 1: Core Mechanics & Critical Fixes
*Fixing what is broken and establishing a stable baseline.*

- [x] Fix Redux `initialHook` error.
- [x] Fix memory leak in `ProductTour` (resize listener).
- [ ] **UI Fixes**: Repair broken actions (Notification Bell, Avatar menu, User CRUD buttons).
- [ ] **Navigation**: Implement active/hover states for Sidebar links.
- [ ] **Tour Engine Logic**:
    - [ ] Decide on Overlay UX (prevent clicking vs allow interaction? "Start Tour" always clickable).
    - [ ] Replace global selectors with Ref Registry or Attribute-based lookup (`data-tour-step`).
    - [ ] Verify if external library is needed vs. Pure JS (Bundle size consideration).
- [ ] **Error Handling**:
    - [x] Implement `ErrorBoundary` component logic.
    - [ ] Wrap components in ErrorBoundary.
    - [ ] Improve ErrorBoundary UI (UX polish).

### 🏗️ Priority 2: Architecture & Refactoring
*Long-term code health and maintainability.*

- [ ] **Directory Structure**: Migrate from Component-based to **Feature-based** architecture.
- [ ] **Logic Separation**:
    - [ ] Continue separating logic from View (custom hooks).
    - [ ] Identify and label "Dumb Components" (Pure UI).
- [ ] **Code Quality**:
    - [ ] `index.ts` files for better export hermetization.
    - [ ] Add JSDoc for complex logic.
    - [ ] Verify Naming Conventions (Sections vs Pages, clear separation).
    - [ ] Check and resolve all `TODO` comments in code.
    - [ ] Dead Code Elimination (unused files/vars/CSS).
- [ ] **Data Fetching**:
    - [ ] Implement `AbortController` + `signal` for fetch.
    - [ ] Strategy: Move API state to RTK Query or TanStack Query (Keep global state for App UI only).

### ♿ Priority 3: Accessibility (a11y)
*Making the app usable for everyone.*

- [ ] **Audit**: Verify "Non-mouse user" experience (Keyboard navigation).
- [ ] **Tooling**: Install `eslint-plugin-jsx-a11y` and verify ARIA.
- [ ] **Implementation**:
    - [ ] Add missing `aria-labels`.
    - [ ] Manage Focus (especially in Modals/Tour).
    - [ ] Ensure ProductTour is accessible.

### 🎨 Priority 4: Design System & UX
*Visual consistency and polish.*

- [ ] **Theming**:
    - [ ] Find & Replace hardcoded HEX/RGB values with `theme.palette`.
    - [ ] Use `theme.spacing` instead of pixels.
- [ ] **UX Improvements**:
    - [ ] Add Skeletons for loading states.
    - [ ] Replace `console.log` feedback with UI Toasts/Snackbars.
    - [ ] Mobile view fixes (overflows).

### 🧪 Priority 5: Testing & Performance
*Validation and Optimization.*

- [ ] **Testing Strategy**:
    - [ ] Unit Tests (Vitest/Jest).
    - [ ] E2E (Cypress/Playwright) - ProductTour.
    - [ ] Decide: Test `data-tour-step` attributes?
    - [ ] Redux DevTools & React Profiler testing.
- [ ] **Performance**:
    - [ ] React Profiler audit.
    - [ ] Optimization: `useMemo`/`useCallback` (Avoid premature optimization/overengineering).
    - [ ] Bundle size analysis.

### 🔮 Future / Modernization
- [ ] Upgrade to **React 19**.
- [ ] Knip (tool for finding unused files).
- [ ] Full migration to TypeScript strict mode (if not already).

</details>
