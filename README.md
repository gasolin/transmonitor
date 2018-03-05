[![dependencies Status](https://david-dm.org/gasolin/transmonitor/status.svg)](https://david-dm.org/gasolin/transmonitor) [![travis](https://travis-ci.org/gasolin/transmonitor.svg?branch=master)](https://travis-ci.org/gasolin/transmonitor) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Monitor recent blocks and its transactions with value.

## Folder Structure

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

The project structure look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    actions/
    components/
    epics/
    reducers/
    tests/
    App.js
    configureStore.js
    index.css
    index.js
    web3connection.js
```

* `components/` contain all react components and `src/App.js` is the entry point.
* `configureStore.js`, `actions` and `reducers` contain `redux` related codes.
* `epics/` contain `redux-observable/rxjs` codes to retrieve block information.
* `web3` connection is wrapped in `web3connection.js`
* `tests/` contain all related tests

The project also use

* Loading svg icon from https://github.com/jxnblk/loading/
* Bootstrap theme from [bootstrap](http://getbootstrap.com) and [reactstrap](https://reactstrap.github.io)
* **auto deploy** latest commits to github page via [ghpage-auto-deploy](https://github.com/gasolin/ghpage-auto-deploy) (my project).
* [EditorConfig](http://editorconfig.org/) to maintain consistent coding style
* [Applied Javascript Standard Style](https://standardjs.com)
* Follows [gitemoji](https://gitmoji.carloscuesta.me/) (meaningful commit emoji messages) commit log  for fun

## Project architecture

![Imgur](https://i.imgur.com/JXihfw2.png)

When windows onload (defined in `index.js`), Blocks data are fetched through `quicklyGetBlock` and `watchBlocks` functions (defined in `epics/`). Then, block data is processed and saved to redux store  (defined in `actions` and `reducers/`). `App.js` is monitoring the store change and update components accordingly.

![Imgur](https://i.imgur.com/yR7O0CE.png)

There are 3 components in `App.js`. `Header` shows project title and the latest Block number. `BlockList` lists recent 10 blocks, `TransactionList` shows transactions with value in the selected block.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `yarn test --coverage`

Launches the test runner and generate the test coverage

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

## Code quality / readability / testability concern

The project follow Javascript Standard Style and use ES6+ syntax. Folder stucture and Project architecture are documented in above sections.

`tests/` contain several kinds of testing
  - per component tests via snapshot testing
  - action and reducer unit test
  - redux-observable unit test

And continue integration via Travis CI is triggered per commit.

## UX / visual concern

Apply minimal Bootstrap theme with half size of table cell padding. The looks and feel is consistent on desktop and mobile device.

![Screenshot in Toshl](https://i.imgur.com/rX6PG73m.jpg)

(Screenshot in Toshl)

## Accessibility concern

* User can navigate up and down with `tab`/`shift-tab` key without mouse.
* `caption` is added to help users with screen readers to find a table and understand what it’s about ```<caption>List of blocks</caption>```
* `⬆` unicode arrow is wrapped with `<span aria-hidden="true">` tag so screen reader will ignore it.

## Percivable Performance concern

Do profiling with Chrome profiling tool and see no hard performance issue there.

Previously the transmonitor is designed to only watch the upcoming blocks, so user need to wait ~30s until the next block is mined.

![Imgur](https://i.imgur.com/UEhDU3V.gif)

First, loading svg is added to make waiting more pleasent.

To improve the fetching speed, `quicklyGetBlockEpic$` is added to quickly get the latest block and fetch block data via web3 `getBlock` api.

![Imgur](https://i.imgur.com/71qZjCh.gif)

Now user can see data more quickly, but there's no way to get other older blocks data.
To fetch specific blocks data, `getBlockEpic$` is added, so user can easier check previous blocks and now there's always a link for user to get the block data.

![Imgur](https://i.imgur.com/3OaIZt3.gif)
