[![Build](https://github.com/ktatu/apextourneystreams-frontend/actions/workflows/build.yml/badge.svg)](https://github.com/ktatu/apextourneystreams-frontend/actions/workflows/build.yml)

# tourneystreams-frontend

## https://tourneystreams.com

## Use of time documentation

Note: the name "Tourneystreams" is a bit misleading in the app's current state. The original, planned main features of the site were displaying information about esports tournaments, and making watching livestreams of them convenient. These had to be dropped for now to keep the scope of the project manageable.

### Local development

These instructions are for the frontend only. For backend, read its README.

### AI Notice

The project contains AI generated content. I've been using auto model on Copilot, which mainly has been defaulting to claude sonnet models. Use cases include CSS animations, code refactoring and creating helper functions. Files with AI generated content include a description of AI use and model at the start of the file

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
