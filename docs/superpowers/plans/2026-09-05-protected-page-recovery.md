# Protected Page Recovery Implementation Plan

**Goal:** Restore original Markdown after failed builds and show an actionable wrong-password message.

**Architecture:** A Node entry point runs encryption and VitePress in child processes, restoring in `finally` and returning nonzero on failure. Existing backups must never be overwritten. The Vue form uses a separate password error so it remains available for retry.

**Tech Stack:** Node.js child processes and native test runner; Vue compiler and renderer already supplied by the project.

## Tasks

- [x] Add filesystem regression tests in `tests/build-recovery.test.mjs`. Copy scripts into temporary fixtures, substitute a failing VitePress CLI, and verify byte-identical restoration, backup cleanup, and failure status. Cover successful builds, leftover backups, encryption failure, restoration failure, and nested pages.
- [x] Run `node --test tests/build-recovery.test.mjs` against the existing build command to demonstrate the recovery failure.
- [x] Add `scripts/build-docs.mjs`, update `package.json`, make encryption backups exclusive, and make restoration recursive. Ensure the generated JSON parent directory matches the full page path.
- [x] Add a Vue component regression in `tests/protected-content.test.mjs`, using real Web Crypto and an in-memory renderer. Verify wrong-password feedback, cleared input, focus, and subsequent successful decryption.
- [x] Run the component regression before changing `ProtectedContent.vue`, then add its independent password-error state and inline alert in `protected.css`.
- [x] Run all tests and an actual production build. Compare source file hashes before/after, confirm encrypted artifacts remain in dist and no protected plaintext appears in generated HTML, JS, or llms output.
- [x] Review the final diff and report verification results. Do not publish or deploy.
