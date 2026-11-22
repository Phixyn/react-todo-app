<h1 align="center">
  React To-Do App
</h1>

<div align="center">
  <p>A to-do list application made with React.</p>

  <p>
    <a href="https://react-todo-phix.netlify.app/">
      <img alt="Netlify deploy status" src="https://api.netlify.com/api/v1/badges/d4c024ed-0cc2-46af-890b-1ef998289a17/deploy-status">
    </a>
    <a href="https://github.com/Phixyn/react-todo-app/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT badge" />
    </a>
  </p>

  ![Preview Screenshot](docs/screenshots/mobile_preview_cropped.png?raw=true)
</div>

***

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Building](#building)
- [Quality Checks](#quality-checks)
- [End-to-End Testing](#end-to-end-testing)
- [Usage](#usage)
- [License](#license)

***

## Overview

A simple to-do list application to demonstrate my React knowledge.

Front-end project only, no backend or database storage.

## Getting Started

1. Clone the repository and `cd` into its root directory.
2. Use `npm ci` to install the exact dependency versions recorded in `package-lock.json`.
3. Run `npm run dev` to start the development server.

The application is served at [http://localhost:5173](http://localhost:5173) by default.

## Building

Run `npm run build` to type-check the TypeScript project and build the static assets for hosting. The files are written to the `dist` folder.

## Quality Checks

Run the core checks from the repository root:

- `npm run lint` — run ESLint.
- `npm run test` — run the Vitest unit/integration suite with coverage.
- `npm run build` — run TypeScript project checks and the Vite production build.

## End-to-End Testing

1. Run `npm run dev` to start the Vite development server.
2. In a separate terminal, run `npm run cypress:run`.

Cypress requires a supported browser and display dependencies. On headless Linux, Xvfb may be required. The repository's GitHub Actions workflow runs Cypress in Chrome on `ubuntu-latest`. If Cypress cannot start locally, record the exact error and treat E2E as unverified rather than reporting a pass.

## Usage

Write task descriptions in the text field and press `Enter` to add them to the list. You can also click on the icon inside the text field to add the task.

Tasks can be marked as complete by ticking the checkbox. They can also be deleted by clicking the trash icon.

**Note:** Tasks are stored in your browser only, not in a database. This project is not intended for real use.

## License

**MIT License**. For more information see [LICENSE](https://github.com/Phixyn/react-todo-app/blob/master/LICENSE).
