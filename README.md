# cat-list

Alphabetical Cat Lister

## Description

Fetch a dataset containing basic information on people and their pets, filter this to group the people by gender and petType (Cat, Dog, Fish). Sort the pets in these groups into ascending order, and display to the user.

- Show ability to fetch content from a web service when a component mounts
- Show ability to use native esnext features, such as `map`, `reduce`, and `filter` without having to rely on Lodash (I understand that this could be very short and less verbose using Lodash)
- Show ability to write immutable functions
- Show understanding of global state frameworks; in this case React's `Context API` - however, Redux or MobX can be easily used. (This challenge doesn't require global state management of course; it's in here purely for demonstration purposes)
- Show an understanding of the importance of unit tests for testing the core business logic of a feature; split into testable files, yet self-contained solely in the component it's responsible for
- Show a data-driven UI approach; components should render dynamic content based on the data from the web service - There is no hard-coded approach looking for only Male and Female genders for display purposes, or just Cats for filtering. A dropdown has been added for the latter

## Getting started

In the project directory, you can run:

### `npm install`

then

### `npm start`

This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
