'use strict';

let os = require('os'),
   path = require('path'),
   fs = require('fs-extra-promise');

module.exports = function(pose) {

   pose.close = function() {
      process.exit();
   };

   pose.getPoseHome = function() {
      return path.join(os.homedir(), '.pose');
   };

   pose.getUserHome = function() {
      return os.homedir();
   };

   pose.saveExists = function(save) {
      return fs.existsSync(path.join('.pose', 'saves', save));
   };

   return pose;
};
