# AGENTS.md

This document provides guidance for AI agents working on the `react-node-isomorphic-minimal` repository.

## Repository Overview

**Description:** A minimal isomorphic rendered node/react app template

**Language Composition:**
- TypeScript: 87.6%
- JavaScript: 7.4%
- SCSS: 5.0%

This is an isomorphic (universal) application that renders on both the server (Node.js) and client (React). The codebase is primarily TypeScript with styling in SCSS.

## Key Concepts

### Isomorphic Architecture
- Code runs on both server and client
- Initial render occurs on the server, then React hydrates on the client
- Careful handling of browser-only APIs and server-only code
- Single codebase serving both environments

### Tech Stack
- **Runtime:** Node.js (server-side)
- **Frontend:** React (TypeScript)
- **Styling:** SCSS
- **Language:** Primarily TypeScript (87.6%)

## Common Tasks

### Working with TypeScript Code
- Ensure strict TypeScript checking is enabled
- Define proper types for shared code between server and client
- Use proper imports/exports for isomorphic compatibility
- Check that types are available in both environments

### Server-Side Code
- Typically found in server-related directories (e.g., `server/`, `src/server/`)
- May use Node.js-specific APIs and modules
- Handles initial HTML rendering and route matching
- Should not reference browser APIs directly

### Client-Side Code
- React components and client-specific logic
- Browser APIs and DOM manipulation
- Should not reference server-only modules
- Hydration logic for React on the client

### Styling
- Written in SCSS (5% of codebase)
- May have separate server and client style handling
- Consider critical CSS for server-rendered HTML

## Common Pitfalls to Avoid

1. **Environment-Specific Code:** Don't use browser APIs in server code or server modules in client code
2. **Conditional Rendering:** Use proper checks (`typeof window !== 'undefined'`) for environment-specific logic
3. **Hydration Mismatches:** Ensure server-rendered HTML matches client-side React render
4. **Import Paths:** Be consistent with import paths across both environments
5. **Package Dependencies:** Verify dependencies are compatible with both Node.js and browser environments

## Project Structure Conventions

When working on this project:
- Look for separate `server` and `client` directories or similar structure
- Check for build configuration files (webpack, tsconfig, etc.)
- Review entry points for both server and client
- Identify shared utilities and components
- Note any environment-specific configuration

## Testing Considerations

- Unit tests should verify both server and client behavior
- Integration tests should validate isomorphic rendering
- Check hydration works correctly
- Test both development and production builds

## Build and Development

- Ensure TypeScript compilation is working correctly
- Verify both server and client build processes complete
- Check that styles are properly compiled from SCSS
- Validate that the application starts correctly

## Code Review Focus Areas

When reviewing PRs:
- Verify isomorphic compatibility
- Check for environment-specific API usage
- Ensure types are correctly shared
- Validate SCSS changes don't break styling
- Test hydration scenarios
- Confirm no hydration mismatches occur

## Resources

- **React SSR:** https://react.dev/reference/react-dom/server
- **Isomorphic JavaScript:** Understanding shared code patterns
- **TypeScript Configuration:** Check tsconfig for both environments
- **SCSS Compilation:** Verify style compilation pipeline

## Getting Started with Development

1. Review the package.json for scripts and dependencies
2. Check the build configuration for both environments
3. Understand the entry points for server and client
4. Set up development environment variables if needed
5. Test the full application flow locally

---

**Last Updated:** 2026-08-23

*This guide helps agents understand the structure and requirements for contributing to this isomorphic React/Node.js template.*
