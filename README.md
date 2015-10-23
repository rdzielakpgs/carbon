# Carbon

A collection of [React](https://facebook.github.io/react/) components and utilities to help build modular user interfaces.

## Available Modules

### Components

`src/components` contains all of the available components.

### Utils

`src/utils` contains helpers for common tasks such as modifying immutable objects as well as class decorators for applying common functionality to components such as validation.

### Style

`src/style-config` contains Sass variables for sharing style attributes across components for a consistent look and feel. These variables are overridable on a per application basis.

## Devtools

[Carbon Factory](https://github.com/Sage/carbon-factory) is available to help you build components and user interfaces more easily and rapidly.

## Technologies

The following is a list of technologies Carbon utilises:

* [React](http://facebook.github.io/react/) ([JSX](https://facebook.github.io/jsx/)) - Components are written using React, as well as the useful JSX syntax.
* [Flux](https://facebook.github.io/flux/) - If your application requires a heavy use of data and interaction, Carbon provides utilities for easily integrating Flux based data stores.
* [Immutable.js](https://facebook.github.io/immutable-js/) - For better performance and data handling, the components rely on using immutable data.
* [Node](https://nodejs.org/) ([CommonJS](https://nodejs.org/docs/latest/api/modules.html)) - The components (or modules) are written using the CommonJS pattern. This allows for modularity and creating isolated/independent components.
* [Browserify](http://browserify.org/) - In order to consume the modular components in the browser, the code is compiled through Browserify. This also allows managing other dependencies such as stylesheets and images.
* [Gulp](http://gulpjs.com/) - To easily run tasks in development, the Gulp task runner is recommended.
* [Babel](https://babeljs.io/) ([ES6](https://github.com/lukehoban/es6features)) - To benefit from ES6 (and ES7) features, the code is compiled through Babel (this also compiles the JSX).
