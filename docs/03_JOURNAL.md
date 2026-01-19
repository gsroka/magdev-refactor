# 📓 Development Journal

## 🕵️ Quick Findings & Bugs

> Raw notes from manual testing.

**Bugs:**

- ~~Tour: Step 2 is not working.~~
- ~~Build errors 10.~~
- ~~ESLint >50.~~

**UI/UX:**

- Cards have `cursor: pointer` but no hover state or action.
- Mobile view fix.
- spinner/skeleton loading.
- HTML/MUI verification. 

**Console/Technical:**

- ~~`tourSlice` has an unused `nextStep` action.~~
- ~~Redux error: `initialHook` failing.~~

**Architecture:**

- ProductTour
  - fallow tooltip.
  - document.querySelector.
  - addEventListener.
  - ~~setInterval~~.
  - ~~performance~~.
  - ~~complexity~~.
  - further tooltip improvements.
  - tests.
- type folder for interface TourState.
- ~~TourPropsWrapper.~~

**Modernization:**

- TODO list.
- Separate logic from views.
- Reduce complexity.
- Feature-Sliced Design.
- ~~configs update.~~
- ~~add tests deps.~~

**Further modernization:**

- StatCards->setCurrentTourStep
- setupTests.ts.
- knip install.
- React 19+.
- Testing framework setup (Vitest/Jest/Cypress/Playwright).
- Data mocking (MSW).
- routing.
- ~~better way for handling ProductTour tooltip (ResizeObserver/Floating UI).~~

**Information:**

- Buttons are static:
  - A notification bell does nothing.
  - Avatar doesn't open a menu.
  - "Add User" and "Edit User" only trigger `console.log`.
- Navigation: All sidebar links (Dashboard, Users, Settings) are static.

