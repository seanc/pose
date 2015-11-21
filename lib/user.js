'use strict';
const fs = require('fs'),
      os = require('os');

module.exports = exports = {};

exports.appDirExists = function() {
   let homeDir = os.homedir();
   return fs.existsSync(homeDir + '/.projector');
};
