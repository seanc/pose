'use strict';

const Utils = function() {};

Utils.prototype.getAppUsage = function() {
   return `
      Usage:
         pro -c <name> [-cp <directory>]
   `;
};

module.exports = new Utils();
