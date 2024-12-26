# Developer Comments

Planning

- Review readMe's and key files in the project (✔)
- Listing all project requirements (✔)
- Listing all assumptions made (✔)
- Clarify tech requirements and priorities (✔)

Basic Milestones

- setting up new project with Vite (✔)
- create basic dummyData for initial load (✔)
- create basic card grid UI with responsiveness (✔)
- adding Create functionality (✔)
- adding Edit functionality with input fields (✔)
- adding Delete functionality (✔)
- improve UI (✔)
- refactor code for clarity (✔)
- add comments for readability (✔)
- deploy site (✔)

Stretch milestones

- add character limits for title and details (✔)
- store session data in local storage (✔)

PRIORITIES NOW

- test suite with unit tests / other
- check responsiveness,
- focus title field when pressed,
- unobtrusive notifcation when update is made to a tile

Learnings

- don't try to use old projects
- clarify with assessor what to prioritise

Keeping the code clean / maintainable

- implemented a single object state for editing card title and details, supporting scalability by simplifying the process of adding more fields later if needed.
- added reusable components (e.g for text areas and buttons) to improve readability where they are conditionally rendered.
- using consistent naming and declaration conventions, such as:
  --- declaring reusable components with arrow functions (const = () => ...)
  --- declaring functions with standard syntax (function name() {...})
  --- declaring const variables (e.g. for conditional length class names) to avoid 'magic values' causing accidental typo-errors

# Questions:

- what is procedural programming?
