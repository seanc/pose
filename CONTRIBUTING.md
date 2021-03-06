# Contributing
We welcome and encourage contributions into Pose.  However there is a few things we would like you to follow if you decide to do so:
 - You cannot relicense your contributions.
 - Lint your code.
 - Follow our style.

Simple enough.

## Getting Started
Before you contribute to Pose, you should be familiar with Git and GitHub.  Throughout this file we will assume you are.

 1. Fork and clone pose.
 2. `npm install` dependencies.

## Commit Style
 1. Present tense. ("Create foo", not "Created foo")
 2. Imperative. ("Move foo", not "Moves foo")

## Finalizing Changes
 1. `eslint` (`npm run lint`) lint your code. (if you use [Atom](https://github.com/atom/atom), consider [`linter-eslint`](https://atom.io/packages/linter-eslint))
 2. If it's a new feature, create tests for it in [`test`](test).
 3. `npm test`.

## Pull Requests
Provide an example if necessary.  Wait for a contributor or owner to review it.

## _You're done._
Your fixes and features will be implemented in the next release.
