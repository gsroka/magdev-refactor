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
- [ ] Run ESLint (Fix errors).
- [ ] Run Prettier (Format code).
- [ ] Type errors.
- [ ] Build errors.

### 🚧 Phase X: Core Refactoring
- [ ] Remove global DOM selectors (Tour engine).
- [ ] Fix Redux `initialHook` error.
- [ ] Refactor "Tour" steps logic.
- [ ] Fix broken UI actions (Bell, Avatar, User buttons).
- [ ] Implement active states for Navigation.

</details>
