![ClearScore](https://github.com/ClearScore/tech-screen/blob/master/assets/clearscore.png)

# Tech-screen

This repo contains multiple apps. The concept is to enable developers to pick and choose which tech problem(s) they would like to solve.

But first, a little bit about us...

## About ClearScore

At ClearScore we are not limited to the technology stack we can use. Our systems evolve quickly and choosing the right tools for the job is an important factor within our development cycle.

We are currently working with...

- ES6 and ES7 throughout the codebase
- React with Redux
- Isomorphic / Universal SPA
- PostCSS + CSS-modules for styling (legacy apps use SASS and BEM)
- MEN (Mongo, Express, Node) stack websites
- We build using the Webpack module bundler and Lerna package manager
- Jest + Enzyme for Unit testing
- We currently support the latest 2 versions of Edge, Chrome, Firefox and Safari (plus ie11)

## What we're looking for

- A stylish solution
- Clean, concise code
- Unit Tests
- Demonstration of CSS knowledge
- A detailed README explaining assumptions / decisions
- A live site we can see

## Apps

> Each app contains 1 (or more) tech challenge(s). Please pick and choose one or more to complete.

- [Carousel](/carousel) \[4 hours] \[Front-end] \[React]
  - A Front-end focused app which requires a new carousel
- [Idea Board](/idea-board) \[2-3 hours] \[Front-end] \[React]
  - Idea board app where you can create, update, delete and sort items.

# ClearScore FED Test

Thank you for applying for a front end developer role at [ClearScore](https://www.clearscore.com).

We hope that you find this task fun and not to worry, there are no trick questions; we want to see your solution to a simple problem with well structured and thought-out code. We love to see unique solutions so if you're a developer that has a flare for CSS animations or a penchant for procedural programming then feel free to incorporate these skills.

## Task

Build an idea board that allows a user to create new ideas, edit existing ideas or delete them. Each idea should be represented as a tile on the board that displays a title, description and created/updated time. The title and description should be editable inline. The description text should have a max length of 140 characters. There should also be a button on the tile that allows for it to be deleted.

When working through the task you should treat it as if you're writing real world production code. We're looking to see a test suite, comments where required and an attention to detail. In addition to this you may use whatever libraries or packages you wish. This should take you around two or three hours to complete fully but feel free to spend as much or as little time on the exercise as you like. Detail anything you didn't get around to completing in the `COMMENTS.md` file along with any other additonal information we should be aware of when reviewing the code.

### Required

- Page should be fully responsive.
- Each idea tile should contain a title and description, which is editable, as well as created/updated time.
- New ideas should have the title field focused to prompt user to begin typing.
- Add the ability to sort ideas by creation date or alphabetically.

### Stretch

- Utilise the localStorage API to persist current state when the page is refreshed.
- Add a character countdown as the user is approaching the limit of their description text.
- Add an unobtrusive notification when an update is made to a tile.

## Getting started

`yarn start` will run a development server on `http://localhost:3000`.  
`yarn test` will run the suite of tests created.

## Don't forget

[what we're looking for](https://github.com/ClearScore/tech-screen#what-were-looking-for)

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

# Testing:

- testing is used in applications to make sure software works as it should.
- you want to make sure that changes you make does not break functionality.
- having an automated testing suite can give you assurance of everything working well for you and your clients, without requiring a lot of work
- there are many layers of testing;
  --- unit testing (quick and easy, low coverage, easy to be plentiful)
  --- component/integration testing (relatively hard and slow, good coverage)
  --- end to end testing (slow, great coverage, only need a few - dont show you where the issue occurs)
- Cypress can provide in-browser unit / componenttesting
- Vitest can provide Unit testing (headless)
  --- Vitest can support partially implemented browser environments like jsdom; but there are limitations (e.g. no accesss to window.navigation)
- a combination of Cypress and Vitest is recommended by Vitest themselves: https://vitest.dev/guide/comparisons
-
