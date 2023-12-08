# react-node-isomorphic-minimal

A minimal isomorphic rendered node/react app template

## What is this?

This is a fairly minimal isomorphic react and node app that functions as a basic example or template to start. It can be cloned, sample code removed and replaced in order to be a proof of concept for specific cases. It contains a basic react component structure, styling with [sass](https://sass-lang.com/), application state through [redux](https://redux.js.org/) with async fetch middleware to connect API calls with state.

## Why use isomorphic rendering?

While generally only required for specific use cases, doing the initial app render and DOM population on the server and then running a single page app client-side is better for initial load-time (FMP/FCP) and search engine optimization (SEO). This is done by rendering the react components and HTML structure (also a component) in node and serving up both the markup and static assets with [Express](https://expressjs.com/). Once the page is rendered and the bundles are downloaded the app is re-rendered on the client and all interactions continue there. Initial application state can be set using the redux store which is shipped to the client through a dynamic header script.

## How do I set it up?

- Get the source:

```shell
git clone git@github.com:pearces/react-node-isomorphic-minimal.git
```

- Enter the repo directory and download the build and runtime dependencies:

```shell
cd react-node-isomorphic-minimal && npm ci
```

## How do I run it?

It can be built and run in production mode with:

```shell
npm run start
```

Or in development mode using the [nodemon](https://nodemon.io/) filesystem watcher with:

```shell
npm run start:dev
```

In either case the app defaults to listening on port `3000`

## How can I test it?

There are configurations included for [eslint](https://eslint.org/) (code linter), [jest](https://jestjs.io/) and [react testing library](https://testing-library.com/docs/react-testing-library/intro/) (unit/snapshot testing) and both can be run with:

```shell
npm run test
```

Alternatively, you can run lint `npm run lint` or unit tests run with `npm run unit`
