# Student template

## Purpose of this repository

This is a project template for students participating in Software Testing course
at Tampere University.

The repository only contains the source code that is under testing, `package.json` skeleton
and LICENSE file.

Source code folder contains a separate license file that must **NOT** be removed under any circumstances!
Removing this license file directly violates terms and conditions of the software under testing.
Individuals who remove or modify the license file will also carry the consequences.

## Instructions

Install required dependencies (run in the project root):  
Command: npm install

## Test and lint reports

### Local

- **Run unit tests with HTML report**  
  - **Command**: `npm test`  
  - **HTML report location**: open `test-report/report.html` in a browser after the tests finish.

- **Run Prettier check**  
  - **Command**: `npm run format`  
  - This only checks formatting; it does not write changes.

- **Run ESLint**  
  - **Command**: `npm run lint`

### GitHub Actions (CI)

On each push/PR to `main`/`master`, GitHub Actions runs:

- **Prettier and ESLint**  
  - Their outputs are saved under the `code-quality-reports` artifact as:
    - `prettier.log`
    - `lint.log`

- **Jest unit tests with HTML report**  
  - The Jest HTML report is uploaded as the `jest-html-report` artifact.
  - Download the artifact from the workflow run and open `report.html` inside `test-report` to view the results.


You can find the artifacts in GitHub by going to the project page -> Actions -> Select a finished workflow -> Scroll down to Artifacts.
Note: Only the most recent commits have artifacts available

[![Coverage Status](https://coveralls.io/repos/github/Neppari/COMP.SE.200-2024-2025-1/badge.svg?branch=main)](https://coveralls.io/github/Neppari/COMP.SE.200-2024-2025-1?branch=main)