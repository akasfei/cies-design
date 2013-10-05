# Web-Essentials-Bootstrap [![Build Status](https://travis-ci.org/akasfei/Web-Essentials-Bootstrap.png?branch=master)](https://travis-ci.org/akasfei/Web-Essentials-Bootstrap) [![devDependency Status](https://david-dm.org/akasfei/Web-Essentials-Bootstrap/dev-status.png)](https://david-dm.org/akasfei/Web-Essentials-Bootstrap#info=devDependencies)

> Essential components to start a static website using Bootstrap

## Quick Start

This templage uses [Grunt](http://gruntjs.com/) with convenient methods for working with the framework. It's how we compile our code, run tests, and more. To use it, install the required dependencies as directed and then run some Grunt commands.

### Install Grunt

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Install the [necessary local dependencies](package.json) via `npm install`

When completed, you'll be able to run the various Grunt commands provided from the command line.

**Unfamiliar with `npm`? Don't have node installed?** That's a-okay. npm stands for [node packaged modules](http://npmjs.org/) and is a way to manage development dependencies through node.js. [Download and install node.js](http://nodejs.org/download/) before proceeding.

### Available Grunt commands

#### Build - `grunt`
Run `grunt` to run tests locally and compile the CSS and JavaScript into `/dist`. **Requires [recess](https://github.com/twitter/recess) and [uglify-js](https://github.com/mishoo/UglifyJS).**

#### Only compile CSS and JavaScript - `grunt dist`
`grunt dist` creates the `/dist` directory with compiled files. **Requires [recess](https://github.com/twitter/recess) and [uglify-js](https://github.com/mishoo/UglifyJS).**

#### Tests - `grunt test`
Runs jshint and qunit tests headlessly in [phantomjs](https://github.com/ariya/phantomjs/) (used for CI). **Requires [phantomjs](https://github.com/ariya/phantomjs/).**

#### Watch - `grunt watch`
This is a convenience method for watching just Less files and automatically building them whenever you save.