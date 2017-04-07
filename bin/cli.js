#!/usr/bin/env node
'use strict';
process.title = 'gatsby-utils';

const resolve = require('resolve');

resolve('gatsby-utils', {
  basedir: process.cwd()
}, function(err, projectLocalCli) {
  let cli;

  if (err) {
    // If there is an error, resolve could not find the gatsby-utils
    // library from a package.json. Instead, include it from a relative
    // path to this script file (which is likely a globally installed
    // npm package)
    cli = require('../lib/gatsby-utils.js').call(null);
  } else {
    // No error implies a projectLocalCli, which will load whatever
    // version of gatsby-utils you have installed in a local package.json
    cli = require(projectLocalCli).call(null);
  }

  const args = process.argv.slice(2);
  // get the first argument
  const command = args.shift();

  cli[command].call(null, Array.from(args));
});
