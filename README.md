
# CSS Sandbox Tool
The CSS Sandbox Tool is an interactive web application that allows users to dynamically style HTML elements using CSS. This tool is perfect for designers, developers, and anyone interested in learning CSS in a hands-on environment.

## Features
**Real-time CSS Editing:** See your CSS changes applied instantly.
**Theme Selection:** Switch between different CSS themes.
**Layout Selection:** Choose from various HTML layouts.
**Color Picker:** Easily pick and apply colors to your CSS.
**Export Functionality:** Export your CSS, HTML, or both with the click of a button.




## How to Use


### Online Demo
You can try the CSS Sandbox Tool online at: https://playground.leumas.tech/styled/sandbox


### Usage in Your Own Application
If you want to integrate this tool into your own application, you can follow these steps:

Clone the Repository, copy the file, create a new file, copy paste te code. Whatever is easiest for you. Its just one page

You might need to npm install react icons npm install react-ace react-colo

```
npm i react-ace react-icons react-color
```

Include the Component

Simply import and include the CssSandbox component in your application:
```jsx
import React from 'react';
import CssSandbox from './Path/to/Your/CssSandbox'; // Adjust the path as necessary

const App = () => {
  return (
    <div>
      <CssSandbox />
    </div>
  );
};

export default App;
```


### Run Your Application

Run your application to see the CSS Sandbox Tool in action:

```
npm start
```


### Development
#### Prerequisites
Node.js
npm
#### Installation
Clone the repo
Run npm install to install dependencies
Run npm start to start the development server
Build
To build the project for production, run:


npm run build

And you are ready to deploy


