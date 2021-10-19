# Air Quality Monitor
- This app is built using Create-react-app
- This app uses React on the Frontend for application development and webpack for bundling the application
- Using highcharts for displaying the comparison

## Steps to start (prerequisites)
- Make sure you have Node.js installed
- Install dependencies
`npm install`
- Run the server (Using webpack-dev-server)
`npm start`


## Available Scripts
In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Approach
- Select a country (As cities with same name can exist in different countries)
- Select a City to get the list of locations
(One City can have multiple data points - locations)
- Select a location to see the details regarding air quality

## Things to improve on this project
- Use TypeScript for development of this application
- Use caching of data (for countries, cities and locations)
- Use location from navigator API to prefill the Country
- Provide suggestions to the user based on previously searched locations