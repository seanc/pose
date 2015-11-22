'use strict';
const fs = require('fs'),
      os = require('os');

module.exports = exports = {};

exports.getAppUsage = function() {
   return `
      Usage:
         pro -s <name> [-cp <directory>]
         pro -d [<file>...]
         pro -p <name> (-u|-us) <dir|save>
         pro -c <project-mame> -w <save>
         pro -l
         pro -h

      Options:
         -h --help   Show this screen
         -s --save   Generate a save
         -d --del    Delete a save
         -p --put    Update a save
         -c --create Create a save
         -l --list   List saves
         -cp         Copy from directory
         -u --use    Directory to update save with
         -us         Update save with existing save
         -w --with   Create project with save
   `;
};

exports.getAppHome = function() {
   return os.homedir() + '/.projector';
};

exports.saveExists = function(save) {
   let savesDir = os.homedir() + '/.projector/saves/' + save;
   return fs.existsSync(savesDir);
};
