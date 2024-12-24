# Developer Comments

Planning

- Review readMe's and key files in the project (Y)
- Listing all project requirements (Y)
- Listing all assumptions made (Y)
- Clarify tech requirements and priorities (Y)

Basic Milestones

- setting up new project with Vite (Y)
- create basic dummyData for initial load (Y)
- create basic card grid UI with responsiveness (Y)
- adding Create functionality (Y)
- adding Edit functionality with input fields (Y)
- adding Delete functionality (Y)
- improve UI (Y)
- refactor code for clarity (Y)
- add comments for readability (Y)

Stretch milestones

- add character limits for title and details (Y)
- store session data in local storage (Y)

PRIORITIES NOW

- deploy
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
