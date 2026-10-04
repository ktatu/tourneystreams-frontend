[![Build](https://github.com/ktatu/apextourneystreams-frontend/actions/workflows/build.yml/badge.svg)](https://github.com/ktatu/apextourneystreams-frontend/actions/workflows/build.yml)

# tourneystreams-frontend

## https://tourneystreams.com

## Use of time documentation

Note: the name "Tourneystreams" is a bit misleading in the app's current state. The original, planned main features of the site were displaying information about esports tournaments, and making watching livestreams of them convenient. These had to be dropped for now to keep the scope of the project manageable.

### Local development

These instructions are for the frontend only. For backend, read its README.

### AI Notice

The project contains AI generated code. Files with AI generated code include a description of AI use and model at the start of the file. I've been using auto model on Copilot, which has mainly been defaulting to Claude Sonnet models 4.5 and 5.5. The biggest AI use case has been migrating the frontend from create-react-app to Vite, and upgrading the project's core dependencies alongside the migration. This is why most modules in the frontend include an AI notice, as the AI was tasked with fixing breaking changes. Other use cases have included CSS animations, code refactoring and creating helper functions.

### Known issues

- Streams sometimes not autoplaying in Chrome
- Streams pausing when the user interacts with some page elements in Chrome
- Opening a chat on Firefox with the 7tv extension installed will freeze the browser
- Site doesn't adjust well to rarer viewport dimensions

### Planned features / improvements

- More visual feedback to users, e.g., alert user when they attempt to add a typoed Twitch stream via the app bar
- Grid display for swapping positions of streams (both preset and opened livestreams)
- Esports tournaments streams (see the note at the start of README)
- Supporting more than 9 streams with pagination
- Custom player controls (mute all, remove all)
