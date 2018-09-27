Instructions
============

## Runs the app in the development mode.

1. First install the depedancies `npm install`
2. Run application in web browser `npm start`
3. Run application inside electron wrapper `npm run electron-dev`

Open http://localhost:3000 to view it in the browser.

## Check for lint errors

```
npm run lint
```

## Generate electron package

```
npm run build
npm run electron-pack
```

## Build for other platforms

```
npm run electron-pack-all
```

## Configurations

src/constant/api.js

BASE_URL - Base URL for API


## User Details
After starting backend server and running test data generators, you can use this credentials to access the app with the role of your choice

Note: Manager and Director roles are not available because the integration of aggregate totals screen with API is not done yet 

**Leader**

username: user003
password: password

**Manager** 

username: user002
password: password

**Director**

username: user001
password: password


Note: Package.json Line 47: to skip the developer identity "-c.mac.identity=null"
