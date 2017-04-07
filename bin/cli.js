#!/usr/bin/env node
'use strict';
process.title = 'gatsby-utils';

const resolve = require('resolve');

resolve('gatsby-utils', {
  basedir: process.cwd()
}, function(err, projectLocalCli) {
  let cli;

  if (err) {
    // If there is an error, resolve could not find the ember-cli
    // library from a package.json. Instead, include it from a relative
    // path to this script file (which is likely a globally installed
    // npm package). Most common cause for hitting this is `ember new`
    cli = require('../lib/gatsby-utils.js');
  } else {
    // No error implies a projectLocalCli, which will load whatever
    // version of ember-cli you have installed in a local package.json
    cli = require(projectLocalCli);
  }

  const args = process.argv.slice(2);
  
  cli.call(null)[args.shift()].call(null, Array.from(args));
});
0
