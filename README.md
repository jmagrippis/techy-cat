# Techy Cat 😸

![CI](https://github.com/jmagrippis/techy-cat/actions/workflows/main.yaml/badge.svg)
![E2E](https://github.com/jmagrippis/techy-cat/actions/workflows/playwright.yaml/badge.svg)

Ideas should be free, here's some for you to get you started 😄

Watch [livestreams where we build this app, as well as "distilled" tutorial videos / guides](https://www.youtube.com/c/jmagrippis)!

Discuss, suggest features and get support on the [Discord](https://discord.gg/eR5Q52Sfm3)!

And also, feel free to treat this as a regular repo, so raise issues and PRs here on GitHub, as you see fit 🙌

## Testing

This repo is covered by two types of tests: Unit -> Integration tests with [Vitest](https://vitest.dev/) and Integration -> End 2 End tests with [Playwright](https://playwright.dev/).

Most of the code is made during livestreams and for videos, where we're just figuring stuff out and make up the requirements as we go along! In "real life" I would be TDDing and covering way more stuff. Not many real specs -> no many tests 😅

### Vitest

Here's how we originally set up [Vitest with SvelteKit](https://www.youtube.com/watch?v=5bQD3dCoyHA)! There's less setup needed nowadays, since the `vite.config.js` has been extracted out to root in latest versions of SvelteKit, as it should have been from the get go 😄 But I go over Vitest, why we'd use it, and my favourite, realistic, Test-Driven Development challenge I still use on candidates this day! So people have still been finding the video helpful 😄

Run the Vitest tests with

```sh
npm test
```

### Playwright

Some things are much harder or outright impossible to test in a meaningful way using a simulated browser environment. Responsive design, drag'n'Drop, side-effects in response scrolling / elements getting in and out of view... This is where Playwright comes in!

No "stream-lined" video yet, but I've done streams covering it, for now here are the suggested commands to run:

```sh
npx playwright test # Runs playwright tests

npx playwright test --project=chromium # Runs tests only on Desktop Chrome.

npx playwright test --debug # Runs tests in debug mode.

npx playwright codegen # Interactively generate tests with Codegen.
```
