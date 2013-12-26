// Karma configuration
// Generated on Tue Nov 19 2013 11:40:49 GMT+0100 (CET)
//
'use strict';

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test/build.js'
    ],


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // global config for SauceLabs
    sauceLabs: {
      username: 'avetisk-ak-delegate',
      accessKey: 'bf559cce-ce26-4e0a-b020-4836571c95c8',
      startConnect: false,
      testName: 'unit test'
    },

    // define SL browsers
    customLaunchers: {
      'SauceLabs Windows 7 IE 10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '10',
        platform: 'Windows 7'
      }
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome', 'Firefox', 'Safari', 'SauceLabs Windows 7 IE 10'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
