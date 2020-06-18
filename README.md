# digital-terrain-mc-js

## Getting Started
clone project into $directory
`cd` into $directory
`nvm use` to ensure the correct version of node and npm are being used

Node/npm version: lts/dubnium

### Installing dependencies
1. Run `npm install` to install required dependencies
2. Run `npm run build:development` to build for development
3. Navigate to http://localhost:8080/ in your browser
4. Modify and save /src/ files to hot load changes

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build:development`

Builds the app for development to the `dist` folder.<br />
It correctly bundles React in devlopment mode.

### `npm run build:production`

Builds the app for development to the `dist` folder.<br />
It correctly bundles React in devlopment mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs `npm run lint:js && npm run lint:css` which lints all files in the projects.

### `npm run test`
Runs entire test suite. See testing section for more information

### `npm run test:updateSnapshots`
Updates jest snapshots. Only use this *after* you've ensured that the updates that will be made are actually needed and intended

## Testing
This project should be unit tested. To run tests run `npm run test` which will run all tests using Jest in the `/tests/` directory. 

This project is using Jest for the testing Framework, and enzyme for the react rendering framework. [jestconfig.json](jestconfig.json) and [jestsetup.js](jestsetup.js) is where config and setup are handled for jest.

To view coverage after running tests open `tests/jest/reports/coverage/index.html` in a browser. At the very least try to keep coverage > 80%

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 
Ensure tests are updated and passing. Ensure you introduced no new linting errors or warnings without reason.

## License
[MIT](https://choosealicense.com/licenses/mit/)