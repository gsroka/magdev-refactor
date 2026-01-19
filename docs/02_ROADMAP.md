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
- [x] Type errors.
- [x] Build errors.
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

### 👷🏻 Phase X: Polishing

- [ ] Verify unused files, functions, and variables (Dead Code Elimination).
- [ ] ProductTour: Replace global `document.querySelector`.
- [ ] UI: Fix broken UI actions (Bell, Avatar, User buttons).
- [ ] UI: Implement active states for Navigation.

</details>
