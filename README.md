# OmniGuide v1 - Legacy Refactoring Challenge

A Material UI dashboard application featuring a product tour system. This project represents a legacy codebase that needs refactoring.

## Setup

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

To build for production:

```bash
npm run build
npm run preview
```

## Getting Started

1. **Fork this repository** to your own GitHub account
2. **Clone your fork** to your local machine
3. **Create a new branch** for your work (e.g., `refactoring` or `your-name-refactor`)
4. **Complete the task** as described below
5. **Push your changes** to your fork
6. **Submit the link** to your forked repository for review

## Your Task

You've inherited this codebase from a previous developer. While the application works, there are several technical issues that need to be addressed. Your goal is to:

1. **Identify** all technical issues and bugs in the codebase
2. **Refactor** the code to fix these issues while maintaining feature parity
3. **Document** your findings and the changes you made

### What to Focus On

Please review the entire codebase and address issues related to:

- **React Patterns**: Review component structure and React best practices
- **Performance**: Identify optimization opportunities and potential bottlenecks
- **State Management**: Evaluate how state is managed and passed through the application
- **Type Safety**: Review TypeScript usage and type definitions
- **Error Handling**: Assess how errors are handled throughout the application
- **Code Architecture**: Evaluate component structure, data flow, and code organization
- **Testing**: Consider adding tests for critical functionality

### Deliverables

1. **List of Issues Found**: Document all issues you identified, categorized by type (performance, React patterns, TypeScript, etc.)

2. **Refactored Code**: Fix the issues you identified. You may:
   - Refactor components
   - Add new files/components if needed
   - Update dependencies if necessary (but explain why)
   - Add error handling where appropriate
   - Add tests if you think they would be valuable

3. **Brief Explanation**: For each major change, explain:
   - What the issue was
   - Why it was a problem
   - How you fixed it
   - Any trade-offs you considered

### Submission

Once you've completed your refactoring:

1. Ensure all your changes are committed and pushed to your fork
2. Make sure your repository is public (or grant access to the reviewers)
3. Submit the link to your forked repository
4. Include a brief summary of the main issues you found and how you addressed them

### Guidelines

- **Maintain Feature Parity**: The application should work exactly the same from a user perspective
- **Follow React Best Practices**: Use modern React patterns and hooks correctly
- **Type Safety**: Ensure proper TypeScript usage throughout
- **Performance**: Optimize where possible without over-engineering
- **Code Quality**: Write clean, maintainable code

---

## Handover Note from Previous Lead

> Hey! I've finished the OmniGuide v1. It's built with Material UI, so it looks great and follows the brand guidelines. I optimized the tour engine to use global DOM selectors so we don't have to clutter our UI components with Refs. It's super fast, and I used standard event listeners for the resize logic. Just refactor the types if you have time, but otherwise, it's production-ready.

---

## Tech Stack

- React 18 + TypeScript
- Vite
- Material UI v6
- Emotion (CSS-in-JS)
- Redux Toolkit (for state management)

Good luck!
