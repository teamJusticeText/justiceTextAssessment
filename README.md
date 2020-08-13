# Write Up: Approach to Technical Assessment 
In this application, each word is a separate component which has separate calculations to determin if a piece of associated data with the word and current state of the application means that the word should be highlighted. With a total of 90 paragraphs, each paragraph was fetched from a data file on the backend with it's own individual request, adding up to a total of 90 requests when the web page loaded. 

The technical assessment asked me to improve the user experience of the application by reducing the initial load time of the page, only rendering and executing the highlight calculation on content visible to the user, and applying styling to the page and content to make it more engaging and welcoming. While completing the assignment, we were asked not to change the fact that each paragraph was delivered to the frontend with it's own request and to not change the word highlighting and editing behavior of the application. 

## Initial Analysis of Application
Before making changes in the code, I went into Google dev tools to analyze the current performance of the application. In addition to testing online performance, I ran performance tests across fast and slow 3G. 

### Memory 
* Code - 1, 129 kb
* Strings - 3,670 kb
* JS Arrays - 34,777 kb
* Typed Arrays - 2,746 kb
* System Objects - 608 kb
* Total - 140,809 kb

### Network

__Slow 3G:__ 
* 100 requests, 473 kb transferred, 5.0 mb requests, DOMContent Loaded in 4.21 s, Loaded in 4.50 s
* Mapped fetches taking up 152b and 2.02s
```
  let dataItems = await Promise.all(
    list.map(async id => {
    return (await fetch("/api/dataItem/ + id)).json()}))
    setData(dataItems)
    }
    fetchData()
  }, [])
```
__Fast 3G:__ DOMContent Loaded in 3.38s, Loaded in 3.78s
__Online:__ DOMContent Loaded in 172 ms, Loaded in 578 ms 

### LightHouse
Lighthouse gave the unoptimized application a performance score of 24. 

__Metrics:__
* First Contentful Paint .7s
* Speed Index 4.9s
* Largest Contentful Paint 4.1s
* Time to Interactive 18.2 s
* Total Blocking Time 16,450 ms
* Cumulative Layout Shift .002

__Issues:__
* Excessive DOM Size: 33,543 total DOM elements with max DOM depth of 5 and max child elements of 385. 
* 97 request served over HTTP/1 protocal rather than HTTP/2
* Time spent parsing, compiling, and executing JS: script evaluation 16,644 ms, style/layout 967 ms, garbage collection 533 ms
* 98 request have 2,433 kb transfer size

--------------------
# Technical Assessment Instructions

# JusticeText Full Stack Technical Assessment

Thank you so much for your interest in joining JusticeText. Please read the instructions below before you start the assessment.

To begin the assessment, you will need to download the associated files in this repo and ensure you have node installed on your machine. This repo contains code for a starter application that you will be improving as part of this assessment. The server file is written in Node.js and the frontend utilizies React.js.

## Install Node

Follow the instructions on the [Node.js official site](https://nodejs.org/en/download/) to download Node.js and NPM. We use yarn as our package manager and if you wish to do the same, you can follow the instructions on the [Yarn official site](https://classic.yarnpkg.com/en/docs/install) to install it.

## Clone or download this repo

Get the starter code for this assessment on your machine by cloning or downloading the contents of this repository. From there, if you are using yarn, you can run the following command to load the dependencies you need to run the starter application. Run the following command for both the server and the client.

### `yarn install`
  
## Starting the application

Once you have all of the dependencies loaded, you can run both the server and frontend simultaneously by running:

### `yarn dev`

Alternatively, you may run the server and the front end independently. The frontend will fail to fetch its data if the backend is not running. You can use the following command to run just the server before you run the frontend:

### `yarn server`

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can use the following commands in the client directory.
The server runs at [http://localhost:8080](http://localhost:8080)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
