# 📓 Development Journal

## 🕵️ Quick Findings & Bugs

> Raw notes from manual testing.

**Bugs:**

- ESLint ~150
- Tour: Step 2 is not working.
- Buttons:
  - A notification bell does nothing.
  - Avatar doesn't open a menu.
  - "Add User" and "Edit User" only trigger `console.log`.
- Navigation: All sidebar links (Dashboard, Users, Settings) are static.
- ~~Build errors ~10~~

**UI/UX:**

- Cards have `cursor: pointer` but no hover state or action.
- Mobile view fix.

**Console/Technical:**

- Redux error: `initialHook` failing.
- `tourSlice` has an unused `nextStep` action.

**Modernization:**

- ~~configs update.~~
- ~~add tests deps.~~

**Further modernization:**

- setupTests.ts
- knip install
- React 19+
- Testing framework setup (Vitest/Jest/Cypress/Playwright)
- Data mocking (MSW)
