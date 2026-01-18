# 📓 Development Journal

## 🕵️ Quick Findings & Bugs

> Raw notes from manual testing.

**Bugs:**

- Buttons:
  - A notification bell does nothing.
  - Avatar doesn't open a menu.
  - "Add User" and "Edit User" only trigger `console.log`.
- Navigation: All sidebar links (Dashboard, Users, Settings) are static.
- ~~Tour: Step 2 is not working.~~
- ~~Build errors 10~~
- ~~ESLint >50~~

**UI/UX:**

- Cards have `cursor: pointer` but no hover state or action.
- Mobile view fix.

**Console/Technical:**

- `tourSlice` has an unused `nextStep` action.
- ~~Redux error: `initialHook` failing.~~

**Modernization:**

- Separate logic from views
- Reduce complexity
- ~~configs update.~~
- ~~add tests deps.~~

**Further modernization:**

- setupTests.ts
- knip install
- React 19+
- Testing framework setup (Vitest/Jest/Cypress/Playwright)
- Data mocking (MSW)
