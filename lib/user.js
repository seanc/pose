'use strict';
const fs = require('fs'),
      os = require('os');

const User = function() {};

User.prototype.appDirExists = function() {
   let homeDir = os.homedir();
   return fs.existsSync(homeDir + '/.projector');
};

module.exports = new User();
