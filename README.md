## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Todo

The list is long. And unprioritized. Project maintenance todo:

- sensible styling
- husky + lint-staged
- LeafletMap would probably be nicer to use if markers and paths were its children

Subdstance todo:

- hide error handling implementation details from component level
- hide effectful code from component level in general
- introduce io-ts for handling incoming data
- make inputs for query parameters
- State handling, pref. immutable (optics?)
- Reader monad for handling params etc
- StateReaderTaskEither to combine both?
