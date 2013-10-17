##Issues

- Report issues or feature requests on [GitHub Issues](https://github.com/grillermo/jquery-ventanita/issues).

##Pull requests
- Create a new topic branch for every separate change you make.
- Make sure the build runs successfully.

## Development

###Tools
We use the following tools for development:

- [NodeJS](http://nodejs.org/download/) required to run grunt and the test server only.
- [Grunt](http://gruntjs.com/getting-started) for task management.

###Getting started 
Install [NodeJS](http://nodejs.org/).  
Install globally grunt-cli using the following command:

    $ npm install -g grunt-cli

Browse to the project root directory and install the dev dependencies:

    $ npm install -d

To execute the build and tests run the following command in the root of the project:

    $ grunt

You should see a green message in the console:

    Done, without errors.

###Tests
You can also run the tests in the browser.  
Start a test server from the project root:

    $ node test/server.js

Open the following URL in a browser:

    $ open http://0.0.0.0:8124/test/index.html

_Note: we recommend cleaning all the browser cookies before running the tests, that can avoid false positive failures._

###Automatic build
You can build automatically after a file change using the following command:

    $ grunt watch
