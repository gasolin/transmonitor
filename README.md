[![travis](https://travis-ci.org/gasolin/transmonitor.svg?branch=master)](https://travis-ci.org/gasolin/transmonitor) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

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
    App.css
    App.js
    configureStore.js
    index.css
    index.js
    logo.svg
```

`components/` contain all react components.
`configureStore.js`, `actions` and `reducers` contain redux related codes.
`epics/` contain redux-observable/rxjs codes to retrieve block information.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
