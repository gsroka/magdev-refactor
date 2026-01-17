# 📓 Development Journal

## 🕵️ Quick Findings & Bugs
> Raw notes from manual testing.

**Bugs:**
- Tour: Step 2 is not working.
- Buttons: 
  - A notification bell does nothing.
  - Avatar doesn't open a menu.
  - "Add User" and "Edit User" only trigger `console.log`.
- Navigation: All sidebar links (Dashboard, Users, Settings) are static.

**UI/UX:**
  - Cards have `cursor: pointer` but no hover state or action.
  - Mobile view.

**Console/Technical:**
  - Redux error: `initialHook` failing.
  - `tourSlice` has an unused `nextStep` action.
