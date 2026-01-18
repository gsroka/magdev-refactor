# 🛠️ List of Issues Found

## 📊 Summary of Findings

TODO

---

## 🛡️ Type Safety & Code Quality

### **Modernization of Build Tooling & Static Analysis Configuration**

- **Issue:** The repository relied on outdated `package.json` dependencies and lacked strict, standardized configurations for linting and formatting.
- **Why:** Inconsistent development environments increase technical debt, allow solvable bugs to merge, and slow down onboarding. Legacy build configurations can also introduce security vulnerabilities.
- **Fix:** Updated core dependencies to stable versions, implemented strict `ESLint` and `Prettier` rulesets for consistency, and refactored `vite.config.ts` to align with current ecosystem standards.
- **Trade-offs:** Stricter linting rules may require a significant initial investment to fix existing violations across the legacy codebase.

---

### **Enforcement of Explicit Type Imports**

- **Issue:** Runtime `SyntaxError` exceptions occurred because the bundler attempted to import TypeScript interfaces and types as JavaScript values.
- **Why:** Modern transpilers (like esbuild used by Vite) operate in `isolatedModules` mode. They strip types during compilation but leave the `import` statements intact if they look like value imports. This results in the browser trying to import a named export that no longer exists in the compiled output.
- **Fix:** Updated all type-only imports to use the explicit `import type { ... }` or `import { type ... }` syntax.
- **Trade-offs:** Slightly increased verbosity in import statements, but ensures safe transpilation and prevents runtime crashes in modern build environments.

---

### **Fixing Type Visibility in Redux Inference (TS4023)**

- **Issue:** The build failed with error `TS4023` in `store.ts` and `hooks.ts`. TypeScript could not generate the type definition for the Redux `store` because it relied on `TourState`, which was not exported.
- **Why:** The `configureStore` function infers the root state type automatically. If a slice (like `tourSlice`) uses a local, non-exported interface (`TourState`), the resulting RootState becomes "unnameable" outside that module. TypeScript requires all types exposed via a public API (the store) to be exported as well.
- **Fix:** Added the `export` keyword to the `TourState` interface in `src/store/tourSlice.ts`.
- **Trade-offs:** None. This is a requirement for inferred types in TypeScript.

---

### **Elimination of `any` & Fix of Stale Closures in ProductTour**

- **Issue:** The `ProductTour` component used the explicit `any` type for step definitions and violated the `react-hooks/exhaustive-deps` rule in `useCallback`.
- **Why:**
  1.  **`any`:** Disables TypeScript's protection, making it impossible to catch missing properties (e.g., a typo in `selector`) at compile time.
  2.  **Missing Deps:** Ignoring dependencies in `useCallback` creates "stale closures," where the function fails to see the updated values of `currentTourStep` or `dispatch`, leading to potential logic bugs where the tour gets stuck.
- **Fix:** Defined a strict `TourStep` interface to replace `any` and updated the `useCallback` dependency array to include all referenced variables.
- **Trade-offs:** We must strictly adhere to the `TourStep` shape; adding arbitrary properties to tour steps is no longer possible without updating the interface.

---

### **Strict Typing for Material UI Theme Configuration**

- **Issue:** The `src/theme/theme.ts` file utilized `any` types for theme configuration objects, triggering ESLint violations.
- **Why:** Using `any` in the central theme configuration breaks TypeScript's ability to validate the design system. It allows developers to define invalid palette colors or misspelled component overrides without any build-time warnings, leading to potential runtime UI inconsistencies.
- **Fix:** Replaced `any` with specific Material UI types: `PaletteOptions` for color definitions and `Components` for component style overrides, imported directly from `@mui/material/styles`.
- **Trade-offs:** Requires precise knowledge of the Material UI type hierarchy (`Options` types vs. runtime types), but guarantees IntelliSense support across the application.

## 🏗️ Architecture & Data Flow

### **Context Architecture Restructuring for Fast Refresh Support**

- **Issue:** The `AppSettingsContext.tsx` file triggered a `react-refresh/only-export-components` warning because it mixed component exports (Provider) with non-component exports (Hooks, Types).
- **Why:** Modern React tooling (Vite/Fast Refresh) cannot reliably preserve component state during Hot Module Replacement (HMR) if a file contains mixed exports. This forces full page reloads during development, significantly degrading the Developer Experience (DX).
- **Fix:** Decomposed the monolithic file into dedicated modules: types, the custom hook, and the context definition, adhering to the Single Responsibility Principle.
- **Trade-offs:** Increases the total file count in the project structure but guarantees instant state preservation during code edits.

## ⚛️ React Patterns & State Management

### **Removal of "Derived State" Anti-Pattern in Custom Hooks**

- **Issue:** The `useTourStep` hook copied the Redux state into a local `useState` variable: `const [localStep] = useState(step)`.
- **Why:** This breaks the "Single Source of Truth" principle. The `localStep` is initialized only once (on mount). If the Redux store updates `currentStep` later, the component using this hook **will not reflect the change**, leading to stale UI ("stuck" tour steps).
- **Fix:** Removed the intermediate `useState`. The hook now returns the Redux selector result directly.
- **Trade-offs:** None. This restores the reactive data flow expected in React applications.

## ⚡ Performance

- ### **Fixing Unmemoized Redux Selectors (Reference Equality Issue)**

* **Issue:** The console reported "Selector unknown returned a different result when called with the same parameters". This occurred in `DashboardSection` and `UserSection`.
* **Why:** Redux relies on strict equality checks (`===`). If a selector returns a new object or array literal (e.g., `state => ({ data: state.data })`) on every execution, Redux considers the state "changed" even if the values are identical. This triggers infinite re-render loops or unnecessary updates.
* **Fix:**
  1. Select only primitive values (strings, numbers) where possible.
  2. For derived complex data, use `createSelector` (from Reselect/Redux Toolkit) to memoize the result.
  3. Alternatively, use `shallowEqual` as the second argument to `useSelector` (though strict selectors are preferred).
* **Trade-offs:** Writing memoized selectors requires slightly more boilerplate code but ensures referential integrity and prevents performance regressions.

## 🛡️ Type Safety (TypeScript)

- **XXX**
- **Issue:** XXX.
- **Why:** XXX.
- **Fix** XXX.
- **Trade-offs** XXX.

## 🚨 Error Handling

- **XXX**
- **Issue:** XXX.
- **Why:** XXX.
- **Fix** XXX.
- **Trade-offs** XXX.
