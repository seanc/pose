#!/usr/bin/env node
'use strict';

const lib = require('./lib'),
      user = lib.User,
      utils = lib.Utils,
      path = require('path'),
      argv = process.argv.slice(2),
      os = require('os'),
      fs = require('fs'),
      rl = require('readline').createInterface(process.stdin, process.stdout);

let create = (argv.indexOf('--create') === -1) ? argv.indexOf('-c') : argv.indexOf('--create');
if(create !== -1) {
   if(!user.appDirExists()) {
      let ask = function() {
         rl.question('Projector directory does not exist, would you like to create one? [y/n] ', function(ans) {
            if(ans === 'n') {
               console.log('Okay, exiting...');
               process.exit(0);
            }
            if(ans === 'y') {
               fs.mkdir(os.homedir() + '/.projector', '0777', function(err) {
                  if(err) {
                     console.log(err);
                     return;
                  }
                  console.log('Projector application directory created, please run again.');
                  process.exit(0);
               });
            }
            if(ans !== 'y' && ans !== 'n') {
               console.log('Please enter y or n', ans);
               ask();
            }
         });
      };
      ask();
      return;
   }
   if(!argv[1]) {
      console.log(utils.getAppUsage());
      process.exit(0);
   }
}
