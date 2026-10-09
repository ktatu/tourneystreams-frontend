[![Build](https://github.com/ktatu/apextourneystreams-frontend/actions/workflows/build.yml/badge.svg)](https://github.com/ktatu/apextourneystreams-frontend/actions/workflows/build.yml)

# tourneystreams-frontend

## https://tourneystreams.com

### [Use of time documentation](https://github.com/ktatu/tourneystreams-frontend/docs/useoftime.md)

The app exists to make watching and switching between multiple livestreams a convenient experience. The two major livestreaming platforms, Twitch and YouTube, have no native support for this.

The app's landing page has a brief site guide. It's probably enough to get you started if Twitch as a platform is already familiar to you. If not, check out user instructions.

## Local development

These instructions are for the frontend only. For backend, read its [README](https://github.com/ktatu/tourneystreams-backend).

The expected version of node is 24.21.0.

1. Insert the backend url into env variable `VITE_BACKEND_URL` in .env
    - There's a .env_example in root, you can rename that and use it
    - The default url for backend is http://localhost:3001

2. Install dependencies with `npm ci`
3. Start the frontend, two options:
    - You have backend running and set up: `npm start`
    - If not, you can use mocks: `npm run start:mock`. Do note that the streams themselves are not being mocked; this only gives some data so that "Followed" and "Presets" tabs are not empty

The frontend should start in http://localhost:3000

### AI Notice

The project contains AI generated code. Files with AI generated code include a description of AI use and model at the start of the file. I've been using auto model on Copilot, which has mainly been defaulting to Claude Sonnet model 5.5. The biggest AI use case has been migrating the frontend from create-react-app to Vite, and upgrading the project's core dependencies alongside the migration. This is why most modules in the frontend include an AI notice, as the AI was tasked with fixing breaking changes. Other use cases have included CSS animations, code refactoring and creating helper functions.

### Known issues

- Streams sometimes not autoplaying in Chrome
- Streams pausing when the user interacts with some page elements in Chrome
- Site doesn't adjust well to rarer viewport dimensions
- Browsers that put elements on top of (e.g. Opera) video players will cause streams to pause. This is seemingly unfixable: browser does it automatically, while it is against Twitch's embed requirements. See: 1.3 in [https://dev.twitch.tv/docs/embed/](Embedded Experiences Requirements)

### Planned features / improvements

- More visual feedback to users, e.g., alert user when they attempt to add a typoed Twitch stream via the app bar
- Grid display for swapping positions of streams (both preset and opened livestreams)
- Esports tournaments streams (see explanation below)
- Supporting more than 9 streams with pagination
- Custom player controls (mute all, remove all)

### Misc

The project's name might be a bit confusing. It's related to the originally intended main feature of the site, which was displaying esports tournament information and providing convenience of watching multiple PoVs. This had to eventually be dropped to keep the scope manageable. The name remains unchanged because I didn't want to change the domain, and hopefully I get back to working on the feature in the future.
